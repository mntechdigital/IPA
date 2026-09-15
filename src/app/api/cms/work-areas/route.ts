import { NextResponse } from 'next/server';
import { listWorkAreas, upsertWorkAreas } from '../../../../lib/cms-store';

export async function GET() {
  const data = await listWorkAreas();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertWorkAreas(body);
  return NextResponse.json(data);
}
