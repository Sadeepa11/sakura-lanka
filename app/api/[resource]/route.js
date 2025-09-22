import {NextResponse} from 'next/server';
import {readJSON, writeJSON} from '../../../lib/fsdb';
import {randomUUID} from 'crypto';
import {cookies} from 'next/headers';
import {verifySession} from '../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const allowed = new Set(['products','visas','jobs','categories','subcategories']);

async function isAdmin() {
  const token = (await cookies()).get('admin_session')?.value || '';
  return Boolean(verifySession(token));
}

export async function GET(_req, context) {
  const {resource} = await context.params; // await params
  if (!allowed.has(resource)) {
    return NextResponse.json({error: 'Invalid resource'}, {status: 400});
  }
  const list = await readJSON(resource);
  return NextResponse.json(list, {status: 200});
}

export async function POST(req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {resource} = await context.params; // await params
  if (!allowed.has(resource)) {
    return NextResponse.json({error: 'Invalid resource'}, {status: 400});
  }

  const body = await req.json().catch(() => ({}));
  if (!body.title) return NextResponse.json({error: 'title is required'}, {status: 400});

  const list = await readJSON(resource);
  const now = new Date().toISOString();
  const item = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...body
  };

  list.push(item);
  await writeJSON(resource, list);
  return NextResponse.json(item, {status: 201});
}