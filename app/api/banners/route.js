import {NextResponse} from 'next/server';
import {readJSON, writeJSON} from '../../../lib/fsdb';
import {randomUUID} from 'crypto';
import {cookies} from 'next/headers';
import {verifySession} from '../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function isAdmin() {
  const token = (await cookies()).get('admin_session')?.value || '';
  return Boolean(verifySession(token));
}

export async function GET() {
  const list = await readJSON('banners');
  return NextResponse.json(list);
}

export async function POST(req) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const body = await req.json().catch(() => ({}));
  if (!body.title || !body.image) return NextResponse.json({error: 'title and image are required'}, {status: 400});
  const list = await readJSON('banners');
  const now = new Date().toISOString();
  const item = {id: body.id || randomUUID(), createdAt: now, updatedAt: now, enabled: body.enabled ?? true, order: Number(body.order ?? 0), ...body};
  list.push(item);
  await writeJSON('banners', list);
  return NextResponse.json(item, {status: 201});
}