import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'running',
    uptime: 3600,
    tradesExecuted: 12,
    currentPnL: 2500
  });
}
