import {NextResponse} from 'next/server';
import {randomUUID} from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import {cookies} from 'next/headers';
import {verifySession} from '../../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const allowed = new Set(['products','visas','jobs','categories','subcategories','banners']);

async function isAdmin() {
  const token = (await cookies()).get('admin_session')?.value || '';
  return Boolean(verifySession(token));
}

function getExt(name, type) {
  const extFromName = path.extname(name || '').toLowerCase();
  if (extFromName) return extFromName;
  if (type && type.includes('/')) return '.' + type.split('/')[1];
  return '.bin';
}

export async function POST(req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {resource} = await context.params; // await params
  if (!allowed.has(resource)) return NextResponse.json({error: 'Invalid resource'}, {status: 400});

  try {
    const form = await req.formData();
    const file = form.get('file');
    const oldPath = String(form.get('oldPath') || '');
    if (!file || typeof file === 'string') {
      return NextResponse.json({error: 'file is required'}, {status: 400});
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = getExt(file.name, file.type);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', resource);
    await fs.mkdir(uploadsDir, {recursive: true});

    const filename = `${Date.now()}-${randomUUID()}${ext}`;
    await fs.writeFile(path.join(uploadsDir, filename), buffer);

    if (oldPath && oldPath.startsWith('/uploads/')) {
      try { await fs.unlink(path.join(process.cwd(), 'public', oldPath)); } catch {}
    }

    return NextResponse.json({ok: true, path: `/uploads/${resource}/${filename}`});
  } catch (e) {
    console.error('Upload error', e);
    return NextResponse.json({error: 'Upload failed'}, {status: 500});
  }
}

export async function DELETE(req, context) {
  if (!await isAdmin()) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const {resource} = await context.params; // await params
  if (!allowed.has(resource)) return NextResponse.json({error: 'Invalid resource'}, {status: 400});

  try {
    const body = await req.json().catch(() => ({}));
    const relPath = body?.path;
    if (!relPath || typeof relPath !== 'string' || !relPath.startsWith(`/uploads/${resource}/`)) {
      return NextResponse.json({error: 'Invalid path'}, {status: 400});
    }
    await fs.unlink(path.join(process.cwd(), 'public', relPath)).catch(() => {});
    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json({error: 'Delete failed'}, {status: 500});
  }
}