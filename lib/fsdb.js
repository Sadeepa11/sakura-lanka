import fs from 'fs/promises';
import path from 'path';

const allowed = ['products', 'visas', 'jobs', 'categories', 'subcategories', 'banners'];

function fileFor(resource) {
  if (!allowed.includes(resource)) throw new Error('Invalid resource');
  const dataDir = path.join(process.cwd(), 'data');
  return {dataDir, filePath: path.join(dataDir, `${resource}.json`)};
}

export async function readJSON(resource) {
  const {dataDir, filePath} = fileFor(resource);
  try {
    await fs.mkdir(dataDir, {recursive: true});
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]', 'utf8');
      return [];
    }
    throw e;
  }
}

export async function writeJSON(resource, data) {
  const {dataDir, filePath} = fileFor(resource);
  await fs.mkdir(dataDir, {recursive: true});
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return true;
}