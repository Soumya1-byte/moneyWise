import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    score: 75, 
    grade: 'B',
    breakdown: { savings: 20, learning: 30, quiz: 15, badges: 10 }
  });
}
