export const SESSION_COOKIE = 'ipa_cms_session';

const encoder = new TextEncoder();

function base64urlEncode(data: Uint8Array | ArrayBuffer): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(input: string): Uint8Array {
  const rest = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = rest + '='.repeat((4 - (rest.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getSecretKey(): Promise<CryptoKey> {
  const secret = process.env.CMS_AUTH_SECRET || process.env.CMS_PASSWORD || '';
  const keyData = await crypto.subtle.importKey(
    'raw',
    encoder.encode(`ipa-cms:${secret}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  return keyData;
}

export async function signSessionToken(): Promise<string> {
  const maxAgeSeconds = Number(process.env.CMS_SESSION_MAX_AGE_SECONDS || 60 * 60 * 24 * 7);
  const payload = { exp: Math.floor(Date.now() / 1000) + maxAgeSeconds };
  const payloadEncoded = base64urlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await getSecretKey();
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadEncoded));
  return `${payloadEncoded}.${base64urlEncode(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payloadEncoded, sigEncoded] = parts;
  const key = await getSecretKey();
  let valid: boolean;
  try {
    valid = await crypto.subtle.verify('HMAC', key, base64urlDecode(sigEncoded), encoder.encode(payloadEncoded));
  } catch {
    return false;
  }
  if (!valid) return false;
  let payload: { exp?: number };
  try {
    payload = JSON.parse(new TextDecoder().decode(base64urlDecode(payloadEncoded)));
  } catch {
    return false;
  }
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return false;
  return true;
}

export function getCmsCredentials(): { username: string; password: string } {
  return {
    username: process.env.CMS_USERNAME || '',
    password: process.env.CMS_PASSWORD || '',
  };
}