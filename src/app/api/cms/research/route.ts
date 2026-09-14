import { NextResponse } from 'next/server';
import { listResearchBeats, createResearchBeat } from '../../../../lib/cms-store';

export async function GET() {
  const items = await listResearchBeats();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await createResearchBeat(body);
  return NextResponse.json(item, { status: 201 });
}
