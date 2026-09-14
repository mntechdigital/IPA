import { NextResponse } from 'next/server';
import { updateInquiry } from '../../../../../lib/cms-store';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const item = await updateInquiry(id, body);
  return NextResponse.json(item);
}
