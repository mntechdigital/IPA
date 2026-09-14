import { NextResponse } from 'next/server';
import { listTeamMembers, createTeamMember } from '../../../../lib/cms-store';

export async function GET() {
  const items = await listTeamMembers();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id && String(body.id).trim() ? String(body.id) : `team-${Date.now()}`;
  const item = await createTeamMember({ ...body, id });
  return NextResponse.json(item, { status: 201 });
}
