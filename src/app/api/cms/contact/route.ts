import { NextResponse } from 'next/server';
import { getContactPage, updateContactPage } from '../../../../lib/cms-store';

export async function GET() {
  const data = await getContactPage();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await updateContactPage(body);
  return NextResponse.json({ ok: true });
}
