import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '../../../../lib/image';

export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json();
    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 });
    }
    await deleteImage(publicId);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Delete failed' }, { status: 500 });
  }
}
