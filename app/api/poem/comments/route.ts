import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { poemId, content } = await req.json();
    if (!poemId || !content) return NextResponse.json({ error: "Poem ID and content required" }, { status: 400 });

    const poem = await prisma.poem.findUnique({ where: { id: poemId } });
    if (!poem) return NextResponse.json({ error: "Poem not found" }, { status: 404 });

    const comment = await prisma.comment.create({
      data: {
        poemId,
        content,
        authorId: userId,
      },
      include: { author: { select: { name: true } } },
    });

    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (err) {
    console.error("Comment POST error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const poemId = parseInt(searchParams.get("poemId") || "", 10);
    if (!poemId) return NextResponse.json({ error: "Poem ID required" }, { status: 400 });

    const comments = await prisma.comment.findMany({
      where: { poemId },
      orderBy: { createdAt: "asc" },
      include: { author: { select: { name: true } } },
    });

    return NextResponse.json({ comments });
  } catch (err) {
    console.error("Comment GET error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
