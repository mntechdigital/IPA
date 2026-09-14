'use client';

import React from 'react';
import { CmsProvider } from '../../../../context/CmsContext';
import { Sidebar } from '../../../../components/Sidebar';
import { CmsHeader } from '../../../../components/CmsHeader';

export const CmsShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CmsProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FD] text-slate-800">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <CmsHeader />
          <main className="flex-1 overflow-y-auto bg-[#F8F9FD]" id="cms-main-scroll-area">
            {children}
          </main>
        </div>
      </div>
    </CmsProvider>
  );
};