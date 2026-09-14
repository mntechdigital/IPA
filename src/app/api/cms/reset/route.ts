import { NextResponse } from 'next/server';
import { resetCmsData, getCmsStateSnapshot } from '../../../../lib/cms-store';

export async function POST() {
  await resetCmsData();
  const snapshot = await getCmsStateSnapshot();
  return NextResponse.json({ ok: true, snapshot });
}
