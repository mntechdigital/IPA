import { NextResponse } from 'next/server';
import { getResearchPage, updateResearchPage } from '../../../../lib/cms-store';

export async function GET() {
  const data = await getResearchPage();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await updateResearchPage(body);
  return NextResponse.json({ ok: true });
}
