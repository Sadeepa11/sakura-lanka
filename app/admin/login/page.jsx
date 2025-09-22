'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setErr(data?.error || 'Login failed');
        setLoading(false);
        return;
      }
      router.replace('/admin');
    } catch {
      setErr('Network error');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm border rounded-xl p-5 space-y-3">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
          required
        />
        <Button type="submit" loading={loading}>Sign in</Button>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </form>
    </div>
  );
}