'use client';

import {useMemo, useState} from 'react';
import Input from './ui/Input';
import Select from './ui/Select';
import ProductCard from './ProductCard';

export default function ProductGrid({items, showSubFilter = true}) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [sub, setSub] = useState('all');

  const subs = useMemo(() => Array.from(new Set(items.map(i => i.subCategory))).filter(Boolean), [items]);

  const filtered = useMemo(() => {
    return items.filter(p => {
      const q = query.toLowerCase();
      const matchesQuery = p.title.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q) || (p.subCategory||'').toLowerCase().includes(q);
      const matchesType = type === 'all' ? true : p.type === type;
      const matchesSub = sub === 'all' ? true : p.subCategory === sub;
      return matchesQuery && matchesType && matchesSub;
    });
  }, [items, query, type, sub]);

  return (
    <>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input placeholder="Search products..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        <Select value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="all">All types</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="spare">Spare Parts</option>
        </Select>
        {showSubFilter ? (
          <Select value={sub} onChange={(e)=>setSub(e.target.value)}>
            <option value="all">All sub categories</option>
            {subs.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        ) : (
          <div className="text-sm text-gray-600 flex items-center">Showing {filtered.length} items</div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(item => <ProductCard key={item.id} item={item} />)}
      </div>
    </>
  );
}