import { NextResponse } from 'next/server';
import { getResearchBeat, updateResearchBeat, deleteResearchBeat } from '../../../../../lib/cms-store';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const item = await getResearchBeat(id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const item = await updateResearchBeat(id, body);
  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  await deleteResearchBeat(id);
  return NextResponse.json({ ok: true });
}
