import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://poetrydb.org/random/30'); // Server-side fetch works fine
    if (!res.ok) throw new Error('Failed to fetch poems');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
