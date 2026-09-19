import { NextResponse } from 'next/server';
import { SESSION_COOKIE, getCmsCredentials, signSessionToken } from '../../../../lib/auth';

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body?.username === 'string' ? body.username : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const { username: expectedUser, password: expectedPass } = getCmsCredentials();

    if (!expectedUser || !expectedPass) {
      return NextResponse.json({ error: 'CMS credentials are not configured' }, { status: 500 });
    }

    const userOk = timingSafeEqual(username, expectedUser);
    const passOk = timingSafeEqual(password, expectedPass);

    if (!userOk || !passOk) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = await signSessionToken();
    const maxAgeSeconds = Number(process.env.CMS_SESSION_MAX_AGE_SECONDS || 60 * 60 * 24 * 7);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: maxAgeSeconds,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}