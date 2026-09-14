import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollProgress } from '../../components/ScrollProgress';
import { LanguageProvider } from '../../context/LanguageContext';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F9F4] text-[#0D1F18] font-sans selection:bg-[#0B2A20] selection:text-[#D2F843]">
        <ScrollProgress />
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}