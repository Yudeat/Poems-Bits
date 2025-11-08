import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { content, tags } = await req.json();

    const poem = await prisma.poem.create({
      data: { content, tags },
    });

    return NextResponse.json(poem);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save poem" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const poems = await prisma.poem.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(poems);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch poems" }, { status: 500 });
  }
}
