import {NextResponse} from 'next/server';
import {createSessionPayload, signSession} from '../../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    let body = {};
    const ct = req.headers.get('content-type') || '';
    if (ct.includes('application/json')) body = await req.json();
    else if (ct.includes('application/x-www-form-urlencoded')) {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries());
    }
    const email = (body.email || '').trim();
    const password = String(body.password || '');

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ok: false, error: 'Invalid credentials'}, {status: 401});
    }

    const payload = createSessionPayload(email);
    const token = signSession(payload);

    const ttlHours = Number(process.env.ADMIN_SESSION_TTL_HOURS || 8);
    const res = NextResponse.json({ok: true});
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ttlHours * 3600
    });
    return res;
  } catch (e) {
    return NextResponse.json({ok: false, error: 'Server error'}, {status: 500});
  }
}