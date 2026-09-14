import { NextResponse } from 'next/server';
import { importCmsState, getCmsStateSnapshot } from '../../../../lib/cms-store';

export async function POST(request: Request) {
  const body = await request.json();
  await importCmsState(body);
  const snapshot = await getCmsStateSnapshot();
  return NextResponse.json({ ok: true, snapshot });
}
