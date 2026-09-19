'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Login failed');
        return;
      }
      router.push('/cms');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A20]/60 mb-1.5">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          className="w-full rounded-xl bg-white border border-[#0B2A20]/15 px-4 py-3 text-sm text-[#0B2A20] placeholder-[#0B2A20]/40 outline-none focus:border-[#0B2A20]/50 focus:ring-2 focus:ring-[#D2F843]/60 transition"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A20]/60 mb-1.5">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="w-full rounded-xl bg-white border border-[#0B2A20]/15 px-4 py-3 text-sm text-[#0B2A20] placeholder-[#0B2A20]/40 outline-none focus:border-[#0B2A20]/50 focus:ring-2 focus:ring-[#D2F843]/60 transition"
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D2F843] text-[#0B2A20] px-4 py-3 text-sm font-extrabold tracking-wide hover:brightness-105 active:scale-[0.99] transition disabled:opacity-60 disabled:pointer-events-none"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        {submitting ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
};