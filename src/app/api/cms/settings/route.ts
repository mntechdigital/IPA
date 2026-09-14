import { NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '../../../../lib/cms-store';

export async function GET() {
  const data = await getSiteSettings();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await updateSiteSettings(body);
  return NextResponse.json({ ok: true });
}
