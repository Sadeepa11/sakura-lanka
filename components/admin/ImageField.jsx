'use client';

import {useRef, useState} from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ImageField({resource, value, onChange, label = 'Image'}) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  async function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      if (value && value.startsWith('/uploads/')) form.append('oldPath', value);
      const res = await fetch(`/api/upload/${resource}`, {method: 'POST', body: form});
      const data = await res.json();
      if (!res.ok || !data?.path) throw new Error(data?.error || 'Upload failed');
      onChange(data.path);
    } catch (e) {
      setErr(e.message || 'Upload error');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function removeLocal() {
    if (!value?.startsWith('/uploads/')) {
      onChange('');
      return;
    }
    try {
      await fetch(`/api/upload/${resource}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({path: value})
      });
    } catch {}
    onChange('');
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>

      {value ? (
        <div className="flex items-center gap-3">
          <div className="relative w-28 h-20 overflow-hidden rounded border">
            <Image src={value} alt="preview" fill className="object-cover" />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Change'}
            </Button>
            <Button variant="danger" onClick={removeLocal} disabled={uploading}>Remove</Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Select image'}
          </Button>
          <span className="text-xs text-gray-500">or paste URL:</span>
          <Input placeholder="https://..." onChange={(e) => onChange(e.target.value)} />
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileSelected} />
      {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
    </div>
  );
}