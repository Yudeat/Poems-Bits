import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { content, tags } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const tagArray: string[] = Array.isArray(tags) ? tags : [];

    const poem = await prisma.poem.create({
      data: {
        content,
        tags: {
          connectOrCreate: tagArray.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json(poem);
  } catch (err: any) {
    console.error("Prisma POST error:", err);
    return NextResponse.json({ error: err.message || "Failed to save poem" }, { status: 500 });
  }
}
