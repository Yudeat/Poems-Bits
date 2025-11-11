export const runtime = "nodejs"; // important!

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

interface PoemBody { title: string; content: string; published?: boolean; }

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); 
    console.log("Authenticated userId:", userId);

    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body: PoemBody = await req.json();
    if (!body.title || !body.content) 
      return NextResponse.json({ error: "Title and content required" }, { status: 400 });

    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(userId);
    } catch {
      console.warn("Clerk user not found, using fallback");
      clerkUser = { emailAddresses: [], firstName: "" };
    }

    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || `unknown-${userId}`,
        name: clerkUser.firstName || "",
      },
    });

    const poem = await prisma.poem.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        authorId: user.id,
      },
    });

    return NextResponse.json({ success: true, poem }, { status: 201 });

  } catch (err) {
    console.error("Poem route error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
