import React from 'react';
import { Metadata } from 'next';
import { LoginForm } from '../../../components/dashboard/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In — IPA CMS',
  description: 'Sign in to the IPA CMS dashboard',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-[#0B2A20] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(210,248,67,0.18),transparent_45%),radial-gradient(circle_at_75%_80%,rgba(11,42,32,0.05),transparent_45%)]" />
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-3xl bg-white border border-[#0B2A20]/10 shadow-xl shadow-[#0B2A20]/5 p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D2F843] text-[#0B2A20] font-black text-xl shadow-lg mb-4">
              IPA
            </div>
            <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#0B2A20]">CMS Dashboard</h1>
            <p className="mt-2 text-sm text-[#0B2A20]/60">Sign in to manage site content.</p>
          </div>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-[#0B2A20]/40">
          Credentials are provided by the site administrator.
        </p>
      </div>
    </div>
  );
}