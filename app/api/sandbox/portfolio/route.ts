import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ holdings: [], balance: 100000 });
}

export async function POST(req: Request) {
  const { symbol, quantity, price } = await req.json();
  return NextResponse.json({ success: true, holding: { symbol, quantity, price } });
}
