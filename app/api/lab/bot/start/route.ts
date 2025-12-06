import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const config = await req.json();
  
  return NextResponse.json({ 
    status: 'started',
    sessionId: Date.now().toString()
  });
}
