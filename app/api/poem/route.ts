export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface PoemBody {
  title: string;
  content: string;
  published?: boolean;
  name?: string; // optional display name for the user
}

// ✅ POST: Save a poem
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body: PoemBody = await req.json();
    if (!body.title || !body.content)
      return NextResponse.json({ error: "Title and content required" }, { status: 400 });

    // Fetch Clerk user info
    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(userId);
    } catch {
      clerkUser = { firstName: "", emailAddresses: [] };
    }

    const displayName = body.name || clerkUser.firstName || "Anonymous";

    // Upsert user to store display name if provided
    await prisma.user.upsert({
      where: { id: userId },
      update: { name: displayName },
      create: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || `unknown-${userId}`,
        name: displayName,
      },
    });

    // Create poem
    const poem = await prisma.poem.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? true,
        authorId: userId,
      },
      include: { author: { select: { name: true } } }, // get author name
    });

    return NextResponse.json({ success: true, poem }, { status: 201 });
  } catch (err) {
    console.error("Poem route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch poems with liked info
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const skip = (page - 1) * limit;
    const sortBy = searchParams.get("sort") || "createdAt";

    const orderBy =
      sortBy === "likes"
        ? { likes: "desc" as const }
        : { createdAt: "desc" as const };

    let userId: string | null = null;
    try {
      const authRes = await auth();
      userId = authRes.userId || null;
    } catch {
      userId = null;
    }

    const [poems, totalCount] = await Promise.all([
      prisma.poem.findMany({
        skip,
        take: limit,
        where: { published: true },
        orderBy,
        include: { author: { select: { name: true } } }, // fetch author's name
      }),
      prisma.poem.count({ where: { published: true } }),
    ]);

    let likedPoems: number[] = [];
    if (userId) {
      const likes = await prisma.poemLike.findMany({
        where: { userId, poemId: { in: poems.map((p) => p.id) } },
        select: { poemId: true },
      });
      likedPoems = likes.map((l) => l.poemId);
    }

    // Ensure every poem has an author name
    const formattedPoems = poems.map((p) => ({
      ...p,
      author: { name: p.author?.name || "Anonymous" },
    }));

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ poems: formattedPoems, totalPages, likedPoems });
  } catch (err) {
    console.error("Error fetching poems:", err);
    return NextResponse.json(
      { poems: [], totalPages: 1, likedPoems: [], error: "Failed to fetch poems" },
      { status: 200 }
    );
  }
}
