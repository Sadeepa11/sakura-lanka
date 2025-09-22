import {NextResponse} from 'next/server';
import {readJSON, writeJSON} from '../../../../lib/fsdb';
import {cookies} from 'next/headers';
import {verifySession} from '../../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const allowed = new Set(['products','visas','jobs','categories','subcategories']);

async function isAdmin() {
  const token = (await cookies()).get('admin_session')?.value || '';
  return Boolean(verifySession(token));
}

export async function GET(_req, context) {
  const {resource, id} = await context.params; // await params
  if (!allowed.has(resource)) return NextResponse.json({error: 'Invalid resource'}, {status: 400});
  const list = await readJSON(resource);
  const item = list.find(i => i.id === id);
  if (!item) return NextResponse.json({error: 'Not found'}, {status: 404});
  return NextResponse.json(item, {status: 200});
}

export async function PUT(req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {resource, id} = await context.params; // await params
  if (!allowed.has(resource)) return NextResponse.json({error: 'Invalid resource'}, {status: 400});

  const list = await readJSON(resource);
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({error: 'Not found'}, {status: 404});

  const body = await req.json().catch(() => ({}));
  const updated = {...list[idx], ...body, updatedAt: new Date().toISOString()};
  list[idx] = updated;
  await writeJSON(resource, list);
  return NextResponse.json(updated, {status: 200});
}

export async function DELETE(_req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {resource, id} = await context.params; // await params
  if (!allowed.has(resource)) return NextResponse.json({error: 'Invalid resource'}, {status: 400});

  const list = await readJSON(resource);
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({error: 'Not found'}, {status: 404});

  const removed = list.splice(idx, 1)[0];
  await writeJSON(resource, list);
  return NextResponse.json(removed, {status: 200});
}