import {NextResponse} from 'next/server';
import {readJSON, writeJSON} from '../../../lib/fsdb';
import {randomUUID} from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const list = await readJSON('categories');
  return NextResponse.json(list);
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!body.title || !body.slug) {
      return NextResponse.json({error: 'title and slug are required'}, {status: 400});
    }
    const list = await readJSON('categories');
    const now = new Date().toISOString();
    const item = {
      id: body.id || randomUUID(),
      createdAt: now,
      updatedAt: now,
      enabled: body.enabled === true || body.enabled === 'true',
      order: Number(body.order ?? 0),
      ...body
    };
    list.push(item);
    await writeJSON('categories', list);
    return NextResponse.json(item, {status: 201});
  } catch (e) {
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}