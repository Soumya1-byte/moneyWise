import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { answers } = await req.json();
  
  const profile = {
    type: 'analyzer',
    score: 75,
    biases: ['Overthinking'],
    strengths: ['Research-driven'],
    weaknesses: ['Slow decisions'],
    learningPath: ['Risk Management']
  };

  return NextResponse.json(profile);
}
