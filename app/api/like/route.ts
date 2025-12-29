// app/api/like/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // 1. Authenticate user via Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2. Parse and validate Poem ID
    const { poemId: rawPoemId } = await req.json();
    const poemId = parseInt(rawPoemId);

    if (isNaN(poemId)) {
      return NextResponse.json(
        { error: "A valid Poem ID is required" },
        { status: 400 }
      );
    }

    // 3. Check if the like already exists
    // Uses the @@unique([userId, poemId]) constraint from your schema
    const existing = await prisma.poemLike.findUnique({
      where: {
        userId_poemId: {
          userId: userId,
          poemId: poemId,
        },
      },
    });

    let updatedLikesCount: number;

    if (existing) {
      // 4a. UNLIKE: Use a transaction to ensure both operations succeed together
      const [_, updatedPoem] = await prisma.$transaction([
        prisma.poemLike.delete({
          where: {
            userId_poemId: { userId, poemId },
          },
        }),
        prisma.poem.update({
          where: { id: poemId },
          data: { likes: { decrement: 1 } },
        }),
      ]);
      updatedLikesCount = updatedPoem.likes;
    } else {
      // 4b. LIKE: Use a transaction to ensure both operations succeed together
      const [_, updatedPoem] = await prisma.$transaction([
        prisma.poemLike.create({
          data: { userId, poemId },
        }),
        prisma.poem.update({
          where: { id: poemId },
          data: { likes: { increment: 1 } },
        }),
      ]);
      updatedLikesCount = updatedPoem.likes;
    }

    // 5. Return success state to update the UI
    return NextResponse.json({
      success: true,
      likes: updatedLikesCount,
      liked: !existing, // If it existed before, it's now unliked (false), and vice versa
    });

  } catch (err) {
    console.error("Like/Unlike Error:", err);
    return NextResponse.json(
      { error: "Failed to process like action" },
      { status: 500 }
    );
  }
}