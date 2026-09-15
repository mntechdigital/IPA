import { NextResponse } from 'next/server';
import { listWorkProcessPillars, upsertWorkProcessPillars } from '../../../../lib/cms-store';

export async function GET() {
  const data = await listWorkProcessPillars();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertWorkProcessPillars(body);
  return NextResponse.json(data);
}
