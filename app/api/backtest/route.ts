import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { asset, startDate, endDate, strategy } = await req.json();
  
  const result = {
    pnl: 15000,
    winRate: 65,
    maxDrawdown: -8.5,
    profitFactor: 2.1,
    trades: 45
  };

  return NextResponse.json(result);
}
