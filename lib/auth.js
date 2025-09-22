import crypto from 'crypto';

const SECRET = process.env.ADMIN_SECRET || 'change-me-super-secret';
const TTL_HOURS = Number(process.env.ADMIN_SESSION_TTL_HOURS || 8);

function b64urlEncode(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64url');
}
function b64urlDecode(str) {
  return JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));
}

export function signSession(payload = {}) {
  const body = b64urlEncode(payload);
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifySession(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!ok) return null;
  const payload = b64urlDecode(body);
  if (payload.exp && Date.now() > payload.exp) return null;
  return payload;
}

export function createSessionPayload(email = 'admin') {
  const now = Date.now();
  const exp = now + TTL_HOURS * 3600 * 1000;
  return { sub: 'admin', email, iat: now, exp };
}