import { NextResponse } from 'next/server';
import { listTeamMembers, createTeamMember } from '../../../../lib/cms-store';

export async function GET() {
  const items = await listTeamMembers();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await createTeamMember(body);
  return NextResponse.json(item, { status: 201 });
}
