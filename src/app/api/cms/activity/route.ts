import { NextResponse } from 'next/server';
import { listActivityLogs } from '../../../../lib/cms-store';

export async function GET() {
  const items = await listActivityLogs();
  return NextResponse.json(items);
}
