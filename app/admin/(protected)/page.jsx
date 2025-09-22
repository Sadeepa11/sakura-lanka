'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import ResourceManager from '../../../components/admin/ResourceManager';
export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState('banners');
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch('/api/categories', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setCats)
      .catch(() => setCats([]));

    fetch('/api/subcategories', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setSubs)
      .catch(() => setSubs([]));
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  }

  const tabs = [
    { key: 'banners', label: 'Home Banners' },
    { key: 'categories', label: 'Categories' },
    { key: 'subcategories', label: 'Subcategories' },
    { key: 'products', label: 'Products' },
    { key: 'visas', label: 'Visas' },
    { key: 'jobs', label: 'Jobs' }
  ];

  // Configs
  const bannersConfig = {
    resource: 'banners',
    title: 'Home Banners',
    columns: [
      { key: 'image', label: 'Image', render: (v) => (v ? <img src={v} alt="" className="w-14 h-10 object-cover rounded" /> : '-') },
      { key: 'title', label: 'Title' },
      { key: 'order', label: 'Order' },
      { key: 'enabled', label: 'Enabled' }
    ],
    fields: [
      { name: 'title', label: 'Title', required: true, type: 'text', full: true },
      { name: 'title_ja', label: 'Title (Japanese)', type: 'text', full: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text', full: true },
      { name: 'subtitle_ja', label: 'Subtitle (Japanese)', type: 'text', full: true },
      { name: 'link', label: 'Link (optional)', type: 'text', hint: 'e.g., /vehicles or https://...' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      { name: 'enabled', label: 'Enabled', type: 'select', options: ['true', 'false'], default: 'true' },
      { name: 'image', label: 'Slide Image', type: 'image', full: true, required: true }
    ]
  };

  const categoriesConfig = {
    resource: 'categories',
    title: 'Categories',
    columns: [
      { key: 'image', label: 'Image', render: (v) => (v ? <img src={v} alt="" className="w-10 h-10 object-cover rounded" /> : '-') },
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'order', label: 'Order' },
      { key: 'enabled', label: 'Enabled' }
    ],
    fields: [
      { name: 'title', label: 'Title', required: true, type: 'text' },
      { name: 'title_ja', label: 'Title (Japanese)', type: 'text' },
      { name: 'slug', label: 'Slug', required: true, type: 'text', hint: 'Route segment e.g., vehicles, bikes, electronics' },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      { name: 'enabled', label: 'Enabled', type: 'select', options: ['true', 'false'], default: 'true' },
      { name: 'image', label: 'Category Image', type: 'image', full: true }
    ]
  };

  const subcategoriesConfig = {
    resource: 'subcategories',
    title: 'Subcategories',
    columns: [
      { key: 'image', label: 'Image', render: (v) => (v ? <img src={v} alt="" className="w-10 h-10 object-cover rounded" /> : '-') },
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'category', label: 'Category' },
      { key: 'order', label: 'Order' },
      { key: 'enabled', label: 'Enabled' }
    ],
    fields: [
      { name: 'title', label: 'Title', required: true, type: 'text' },
      { name: 'title_ja', label: 'Title (Japanese)', type: 'text' },
      { name: 'slug', label: 'Slug', required: true, type: 'text', hint: 'URL segment under category' },
      { name: 'category', label: 'Category', type: 'select', required: true, options: cats.map((c) => c.slug) },
      { name: 'order', label: 'Order', type: 'number', default: 0 },
      { name: 'enabled', label: 'Enabled', type: 'select', options: ['true', 'false'], default: 'true' },
      { name: 'image', label: 'Subcategory Image', type: 'image', full: true }
    ]
  };

  const productsConfig = {
    resource: 'products',
    title: 'Products',
    columns: [
      { key: 'image', label: 'Image', render: (v) => (v ? <img src={v} alt="" className="w-10 h-10 object-cover rounded" /> : '-') },
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'subCategory', label: 'Sub Category' },
      { key: 'type', label: 'Type' },
      { key: 'price', label: 'Price', render: (v, row) => `${row.currency || 'USD'} ${Number(v || 0).toLocaleString()}` }
    ],
    fields: [
      { name: 'title', label: 'Title', required: true, type: 'text', full: true },
      { name: 'title_ja', label: 'Title (Japanese)', type: 'text', full: true },
      { name: 'category', label: 'Category', type: 'select', options: cats.map((c) => c.slug), required: true },
      {
        name: 'subCategory',
        label: 'Sub Category',
        type: 'select',
        required: true,
        options: ({ form }) => subs.filter((s) => s.category === form.category).map((s) => s.slug),
        hint: 'Select category first to filter options'
      },
      { name: 'type', label: 'Type', type: 'select', options: ['new', 'used', 'spare'], required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', default: 'USD' },
      { name: 'image', label: 'Main Image', type: 'image', full: true },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
      { name: 'description_ja', label: 'Description (Japanese)', type: 'textarea', full: true }
    ]
  };

  const visasConfig = {
    resource: 'visas',
    title: 'Visas',
    columns: [
      { key: 'image', label: 'Image', render: (v) => (v ? <img src={v} alt="" className="w-10 h-10 object-cover rounded" /> : '-') },
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'priceFrom', label: 'From', render: (v, row) => `${row.currency || 'USD'} ${Number(v || 0).toLocaleString()}` }
    ],
    fields: [
      { name: 'title', label: 'Title', required: true, type: 'text' },
      { name: 'title_ja', label: 'Title (Japanese)', type: 'text' },
      { name: 'type', label: 'Type', type: 'select', options: ['job-visa', 'student-visa', 'tourist-visa'], required: true },
      { name: 'priceFrom', label: 'Price From', type: 'number' },
      { name: 'currency', label: 'Currency', type: 'text', default: 'USD' },
      { name: 'image', label: 'Image', type: 'image', full: true },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
      { name: 'description_ja', label: 'Description (Japanese)', type: 'textarea', full: true }
    ]
  };

  const jobsConfig = {
    resource: 'jobs',
    title: 'Jobs',
    columns: [
      { key: 'image', label: 'Image', render: (v) => (v ? <img src={v} alt="" className="w-10 h-10 object-cover rounded" /> : '-') },
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'location', label: 'Location (EN)' },
      { key: 'location_ja', label: 'Location (JP)' },
      { key: 'salary', label: 'Salary' }
    ],
    fields: [
      { name: 'title', label: 'Title', required: true, type: 'text' },
      { name: 'title_ja', label: 'Title (Japanese)', type: 'text' },
      { name: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time'], required: true },
      { name: 'location', label: 'Location (EN)', type: 'text', required: true },
      { name: 'location_ja', label: 'Location (JP)', type: 'text' },
      { name: 'salary', label: 'Salary', type: 'text' },
      { name: 'image', label: 'Image', type: 'image', full: true },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
      { name: 'description_ja', label: 'Description (Japanese)', type: 'textarea', full: true }
    ]
  };

  const config =
    tab === 'banners' ? bannersConfig :
    tab === 'categories' ? categoriesConfig :
    tab === 'subcategories' ? subcategoriesConfig :
    tab === 'products' ? productsConfig :
    tab === 'visas' ? visasConfig :
    jobsConfig;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader tabs={tabs} activeKey={tab} onChangeTab={setTab} onLogout={logout} />
      <main className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6">
        <ResourceManager datasets={{ categories: cats, subcategories: subs }} {...config} />
      </main>
    </div>
  );
}