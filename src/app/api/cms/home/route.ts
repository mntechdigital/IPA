import { NextResponse } from 'next/server';
import { getHomePage, updateHomePage } from '../../../../lib/cms-store';

export async function GET() {
  try {
    const data = await getHomePage();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: `Failed to load home page: ${(e as Error).message}` }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await updateHomePage(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: `Failed to save home page: ${(e as Error).message}` }, { status: 500 });
  }
}
