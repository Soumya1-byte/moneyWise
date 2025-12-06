import { NextResponse } from 'next/server';

export async function GET() {
  const sentiment = {
    fearGreedIndex: Math.floor(Math.random() * 100),
    volatility: Math.random() * 50,
    trend: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)],
    volume: Math.random() * 1000000
  };

  return NextResponse.json(sentiment);
}
