import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { writing, request } = await req.json();

    const prompt = `
User is writing this poem/text:

"${writing}"

They asked the AI to help with: "${request}"

Give a helpful, creative improvement or continuation.
`;

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt
    });

    return NextResponse.json({
      reply: completion.output_text,
    });
  } catch (err) {
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
