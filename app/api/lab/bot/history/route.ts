import { NextResponse } from 'next/server';

export async function GET() {
  const trades = [
    { id: '1', symbol: 'BTC', side: 'buy', price: 45000, quantity: 0.1, pnl: 500, timestamp: Date.now() },
    { id: '2', symbol: 'ETH', side: 'sell', price: 2800, quantity: 1, pnl: -200, timestamp: Date.now() }
  ];

  return NextResponse.json({ trades });
}
