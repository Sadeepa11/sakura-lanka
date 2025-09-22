import {NextResponse} from 'next/server';
import {readJSON, writeJSON} from '../../../../lib/fsdb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(_req, {params: {id}}) {
  const list = await readJSON('subcategories');
  const item = list.find(i => i.id === id);
  if (!item) return NextResponse.json({error: 'Not found'}, {status: 404});
  return NextResponse.json(item);
}

export async function PUT(req, {params: {id}}) {
  const body = await req.json().catch(() => ({}));
  const list = await readJSON('subcategories');
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({error: 'Not found'}, {status: 404});
  const updated = {
    ...list[idx],
    ...body,
    enabled: body.enabled === true || body.enabled === 'true' || list[idx].enabled,
    order: body.order != null ? Number(body.order) : list[idx].order,
    updatedAt: new Date().toISOString()
  };
  list[idx] = updated;
  await writeJSON('subcategories', list);
  return NextResponse.json(updated);
}

export async function DELETE(_req, {params: {id}}) {
  const list = await readJSON('subcategories');
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({error: 'Not found'}, {status: 404});
  const removed = list.splice(idx, 1)[0];
  await writeJSON('subcategories', list);
  return NextResponse.json(removed);
}