'use client';


import { useEffect, useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Modal from '../ui/Modal';
import ImageField from './ImageField';

export default function ResourceManager({ resource, title, columns, fields, datasets = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const endpoint = `/api/${resource}`;

  useEffect(() => { fetchList(); }, [resource]);

  function resetForm() {
    const initial = {};
    fields.forEach(f => initial[f.name] = f.default ?? '');
    setForm(initial);
  }

  async function fetchList() {
    setLoading(true);
    const res = await fetch(endpoint, { cache: 'no-store' });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    resetForm();
    setOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm(fields.reduce((acc, f) => ({...acc, [f.name]: item[f.name] ?? ''}), {}));
    setOpen(true);
  }

  async function save(addAnother = false) {
    try {
      setSaving(true);
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `${endpoint}/${editing.id}` : endpoint;
      const res = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if (!res.ok) { alert('Failed to save'); return; }
      await fetchList();
      if (!editing && addAnother) { resetForm(); setEditing(null); } else { setOpen(false); }
    } finally { setSaving(false); }
  }

  async function remove(item) {
    if (!confirm(`Delete "${item.title || item.slug}"?`)) return;
    const res = await fetch(`${endpoint}/${item.id}`, { method: 'DELETE' });
    if (!res.ok) { alert('Failed to delete'); return; }
    await fetchList();
  }

  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter(i => Object.values(i).some(v => String(v).toLowerCase().includes(query.toLowerCase())));
  }, [items, query]);

  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b p-4 bg-white">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Input placeholder="Search..." value={query} onChange={(e)=>setQuery(e.target.value)} />
          <Button onClick={openCreate}>Add New</Button>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-600">No items found.</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-gray-50 text-left text-sm">
                  <tr>
                    {columns.map(c => <th key={c.key} className="border-b px-3 py-2">{c.label}</th>)}
                    <th className="border-b px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filtered.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {columns.map(c => (
                        <td key={c.key} className="border-b px-3 py-2 align-top">
                          {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? '')}
                        </td>
                      ))}
                      <td className="border-b px-3 py-2">
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={()=>openEdit(item)}>Edit</Button>
                          <Button variant="danger" onClick={()=>remove(item)}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden grid grid-cols-1 gap-3">
              {filtered.map(item => (
                <div key={item.id} className="rounded-xl border p-3 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.title || item.slug}</div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={()=>openEdit(item)}>Edit</Button>
                      <Button variant="danger" onClick={()=>remove(item)}>Delete</Button>
                    </div>
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {columns.map(c => (
                      <div key={c.key}>
                        <dt className="uppercase">{c.label}</dt>
                        <dd className="text-gray-800">
                          {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? '')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        title={editing ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}
        size="xl"
        mobileFull
        maxHeight="92vh"
        footer={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="secondary" onClick={()=>setOpen(false)} disabled={saving}>Cancel</Button>
            {!editing && <Button variant="secondary" onClick={()=>save(true)} disabled={saving}>{saving?'Saving...':'Create & Add Another'}</Button>}
            <Button onClick={()=>save(false)} disabled={saving}>{saving?'Saving...':editing?'Save Changes':'Create'}</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => {
            const value = form[f.name] ?? '';
            const handleChange = (e) => setForm(prev => ({...prev, [f.name]: e && e.target ? e.target.value : e}));

            const opts = typeof f.options === 'function' ? f.options({form, datasets}) : (f.options || []);

            return (
              <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                <label htmlFor={f.name} className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
                {f.type === 'select' ? (
                  <Select id={f.name} value={value} onChange={handleChange} required={Boolean(f.required)}>
                    <option value="">Select...</option>
                    {opts.map(opt => <option key={String(opt)} value={String(opt)}>{String(opt)}</option>)}
                  </Select>
                ) : f.type === 'textarea' ? (
                  <Textarea id={f.name} value={value} onChange={handleChange} required={Boolean(f.required)} />
                ) : f.type === 'number' ? (
                  <Input id={f.name} type="number" value={value} onChange={handleChange} required={Boolean(f.required)} />
                ) : f.type === 'image' ? (
                  <ImageField resource={resource} value={value || ''} onChange={(val)=>setForm(prev=>({...prev,[f.name]:val}))} label={f.label} />
                ) : (
                  <Input id={f.name} type="text" value={value} onChange={handleChange} required={Boolean(f.required)} />
                )}
                {f.hint && <p className="mt-1 text-xs text-gray-500">{f.hint}</p>}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}