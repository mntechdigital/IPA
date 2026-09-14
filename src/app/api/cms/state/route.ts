import { NextResponse } from 'next/server';
import { getCmsStateSnapshot } from '../../../../lib/cms-store';

export async function GET() {
  const state = await getCmsStateSnapshot();
  return NextResponse.json(state);
}
