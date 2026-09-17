import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '../../../lib/image';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || undefined;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await uploadImage(file, { folder });

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      filename: result.url.split('/').pop(),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Upload failed' }, { status: 500 });
  }
}
