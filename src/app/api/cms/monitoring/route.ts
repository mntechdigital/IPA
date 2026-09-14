import { NextResponse } from 'next/server';
import { getMonitoring, updateMonitoring } from '../../../../lib/cms-store';

export async function GET() {
  const data = await getMonitoring();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await updateMonitoring(body);
  return NextResponse.json({ ok: true });
}
