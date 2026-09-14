import { NextResponse } from 'next/server';
import { getHomePage, updateHomePage } from '../../../../lib/cms-store';

export async function GET() {
  const data = await getHomePage();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await updateHomePage(body);
  return NextResponse.json({ ok: true });
}
