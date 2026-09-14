import { NextResponse } from 'next/server';
import { listPublications, createPublication } from '../../../../lib/cms-store';

export async function GET() {
  const items = await listPublications();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await createPublication(body);
  return NextResponse.json(item, { status: 201 });
}
