import { NextResponse } from 'next/server';
import { getAboutPage, updateAboutPage } from '../../../../lib/cms-store';

export async function GET() {
  const data = await getAboutPage();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await updateAboutPage(body);
  return NextResponse.json({ ok: true });
}
