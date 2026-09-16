'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CTASection: React.FC<{ title?: string; titleBn?: string; narrative?: string; narrativeBn?: string; primaryText?: string; primaryTextBn?: string; primaryUrl?: string; secondaryText?: string; secondaryTextBn?: string; secondaryUrl?: string }> = ({ title, titleBn, narrative, narrativeBn, primaryText, primaryTextBn, primaryUrl, secondaryText, secondaryTextBn, secondaryUrl }) => {
  const router = useRouter();
  const { t, isBn } = useLanguage();
  const displayTitle = isBn ? (titleBn || title) : title;
  const displayNarrative = isBn ? (narrativeBn || narrative) : narrative;
  const displayPrimary = isBn ? (primaryTextBn || primaryText) : primaryText;
  const displaySecondary = isBn ? (secondaryTextBn || secondaryText) : secondaryText;

  return (
    <section className="py-20 sm:py-28 bg-[#F6F9F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-[2.5rem] bg-[#0B2A20] text-white p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl border border-[#174837]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16513E]/50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#D2F843]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
          <div className="absolute inset-0 bg-[radial-gradient(#1B4E3E_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#D2F843] border border-white/15 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{t('Institutional Collaboration & Inquiry', 'প্রাতিষ্ঠানিক সহযোগিতা ও অনুসন্ধান')}</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-5xl lg:text-[52px] text-white font-extrabold leading-[1.08] tracking-tight">
                {displayTitle || t('Let’s Understand the Media Landscape Together.', 'আসুন একসাথে গণমাধ্যমের পরিমণ্ডলকে অনুধাবন করি।')}
              </h2>

              <p className="text-base sm:text-lg lg:text-xl font-sans text-white/80 leading-relaxed max-w-2xl font-normal">
                {displayNarrative || t('Whether you’re interested in our work, exploring a research collaboration, or simply want to learn more about the organization, we’d be happy to hear from you.', 'আপনি আমাদের গবেষণায় আগ্রহী হোন, যৌথ গবেষণার সুযোগ খুঁজুন বা সংস্থা সম্পর্কে আরও জানতে চান—আমরা আপনার মতামতকে স্বাগত জানাই।')}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 items-start lg:items-end justify-center">
              <button
                onClick={() => {
                  router.push(primaryUrl || '/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D2F843] text-[#0B2A20] hover:bg-[#bef024] hover:shadow-xl hover:shadow-[#D2F843]/30 hover:scale-105 transition-all cursor-pointer shadow-lg"
              >
                <span>{displayPrimary || t('Get in Touch', 'যোগাযোগ করুন')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  router.push(secondaryUrl || '/work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>{displaySecondary || t('Browse All Research Areas', 'সকল গবেষণা ক্ষেত্র দেখুন')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
