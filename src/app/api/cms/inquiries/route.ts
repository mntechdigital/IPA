import { NextResponse } from 'next/server';
import { listInquiries, createInquiry } from '../../../../lib/cms-store';

export async function GET() {
  const items = await listInquiries();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await createInquiry(body);
  return NextResponse.json(item, { status: 201 });
}
