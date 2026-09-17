import React from 'react';
import { Metadata } from 'next';
import { CmsShell } from './_components/CmsShell';

export const metadata: Metadata = {
  title: 'IPA',
  description: 'CMS Dashboard',
};

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cms-shell antialiased selection:bg-[#E8E5FF] selection:text-[#6E56CF]">
      <CmsShell>{children}</CmsShell>
    </div>
  );
}
