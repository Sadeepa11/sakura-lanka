import {NextResponse} from 'next/server';
import {readJSON, writeJSON} from '../../../../lib/fsdb';
import {cookies} from 'next/headers';
import {verifySession} from '../../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function isAdmin() {
  const token = (await cookies()).get('admin_session')?.value || '';
  return Boolean(verifySession(token));
}

export async function GET(_req, context) {
  const {id} = await context.params;
  const list = await readJSON('banners');
  const item = list.find(i => i.id === id);
  if (!item) return NextResponse.json({error: 'Not found'}, {status: 404});
  return NextResponse.json(item);
}

export async function PUT(req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {id} = await context.params;
  const body = await req.json().catch(() => ({}));
  const list = await readJSON('banners');
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({error: 'Not found'}, {status: 404});
  const updated = {...list[idx], ...body, order: body.order != null ? Number(body.order) : list[idx].order, updatedAt: new Date().toISOString()};
  list[idx] = updated;
  await writeJSON('banners', list);
  return NextResponse.json(updated);
}

export async function DELETE(_req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {id} = await context.params;
  const list = await readJSON('banners');
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({error: 'Not found'}, {status: 404});
  const removed = list.splice(idx, 1)[0];
  await writeJSON('banners', list);
  return NextResponse.json(removed);
}