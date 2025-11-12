// app/api/like/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // ✅ Authenticate user
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );

    // ✅ Get poemId from request
    const { poemId } = await req.json();
    if (!poemId)
      return NextResponse.json(
        { error: "Poem ID required" },
        { status: 400 }
      );

    // ✅ Check if user already liked this poem
    const existing = await prisma.poemLike.findUnique({
      where: { userId_poemId: { userId, poemId } },
    });

    let likes: number;

    if (existing) {
      // ✅ Unlike the poem
      await prisma.poemLike.delete({
        where: { userId_poemId: { userId, poemId } },
      });

      const updated = await prisma.poem.update({
        where: { id: poemId },
        data: { likes: { decrement: 1 } },
      });

      likes = updated.likes;
    } else {
      // ✅ Like the poem
      await prisma.poemLike.create({ data: { userId, poemId } });

      const updated = await prisma.poem.update({
        where: { id: poemId },
        data: { likes: { increment: 1 } },
      });

      likes = updated.likes;
    }

    // ✅ Return success with updated likes and current liked state
    return NextResponse.json({
      success: true,
      likes,
      liked: !existing,
    });
  } catch (err) {
    console.error("Like/Unlike error:", err);
    return NextResponse.json(
      { error: "Failed to like/unlike poem" },
      { status: 500 }
    );
  }
}
