'use client';

import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageTransition } from '../PageTransition';
import { RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId, TeamMember } from '../../../types';
import { PageHero } from '../../../components/PageHero';
import { TEAM_MEMBERS } from '../../../data/team';
import { TeamCard, TeamMemberModal } from '../../../components/TeamCard';
import { CTASection } from '../../../components/CTASection';
import { TeamCardSkeleton } from '../../../components/Skeleton';
import { useLanguage } from '../../../context/LanguageContext';

export default function TeamPage() {
  return (
    <Suspense fallback={null}>
      <TeamPageContent />
    </Suspense>
  );
}

function TeamPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const memberId = params.get('member');
  const selectedMember = TEAM_MEMBERS.find((m) => m.id === memberId) ?? null;
  const onNavigate = (page: PageId) => {
    if (page === 'investigation') return;
    const routes: Record<string, string> = { home: '/', about: '/about', work: '/work', team: '/team', contact: '/contact' };
    router.push(routes[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSelectMember = (member: TeamMember | null) => {
    if (member) {
      router.replace(`/team?member=${encodeURIComponent(member.id)}`, { scroll: false });
    } else {
      router.replace('/team', { scroll: false });
    }
  };
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
  const [filterRole, setFilterRole] = useState<'all' | 'leadership' | 'research'>('all');

  // Simulated perceived data fetching on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (role: 'all' | 'leadership' | 'research') => {
    if (role === filterRole) return;
    setIsFilterLoading(true);
    setFilterRole(role);
    setTimeout(() => {
      setIsFilterLoading(false);
    }, 300);
  };

  const handleReload = () => {
    setIsFilterLoading(true);
    setTimeout(() => {
      setIsFilterLoading(false);
    }, 400);
  };

  const leadership = TEAM_MEMBERS.filter((m) => m.category === 'leadership');
  const researchers = TEAM_MEMBERS.filter((m) => m.category === 'research');

  return (
    <PageTransition>
      <div className="bg-[#F6F9F4] text-[#0D1F18]">
      {/* 24. HERO */}
      <PageHero
        backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85"
        label={t('OUR TEAM', 'আমাদের টিম')}
        title={t('The People Behind Our Work.', 'আমাদের কাজের পেছনের গবেষক দল')}
        description={t(
          'Our team brings together researchers, analysts, and professionals with diverse experience across media, journalism, research, technology, and communications.',
          'আমাদের দলে রয়েছেন গণমাধ্যম, সাংবাদিকতা, প্রযুক্তি ও যোগাযোগ খাতের অভিজ্ঞ গবেষক ও বিশ্লেষকবৃন্দ।'
        )}
        metadata={t('Fellows, Directors & Methodologists', 'ফেলো, পরিচালক ও গবেষকবৃন্দ')}
      />

      {/* FILTER BAR */}
      <div className="border-b border-[#E2EAE4] bg-[#FFFFFF] py-4 sticky top-16 sm:top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#556B62] font-semibold">
              {t('Filter Corps:', 'ফিল্টার করুন:')}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider ${
                  filterRole === 'all'
                    ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                    : 'bg-[#F6F9F4] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                }`}
              >
                {t('All Fellows (8)', 'সকল ফেলো (৮)')}
              </button>
              <button
                onClick={() => handleFilterChange('leadership')}
                className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider ${
                  filterRole === 'leadership'
                    ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                    : 'bg-[#F6F9F4] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                }`}
              >
                {t('Leadership (3)', 'পরিচালনা পরিষদ (৩)')}
              </button>
              <button
                onClick={() => handleFilterChange('research')}
                className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider ${
                  filterRole === 'research'
                    ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                    : 'bg-[#F6F9F4] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                }`}
              >
                {t('Researchers (5)', 'গবেষকবৃন্দ (৫)')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#556B62]">
              <span className={`w-2 h-2 rounded-full ${isLoading || isFilterLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
              {isLoading || isFilterLoading
                ? t('Synchronizing directory...', 'ডিরেক্টরি সিনক্রোনাইজ হচ্ছে...')
                : t('Active Resident Directory', 'সক্রিয় ফেলো ডিরেক্টরি')}
            </span>
            <button
              onClick={handleReload}
              title={t('Refresh Directory Roster', 'রোস্টার রিফ্রেশ করুন')}
              className="p-1.5 rounded-full border border-[#E2EAE4] bg-[#F6F9F4] text-[#556B62] hover:text-[#0B2A20] hover:border-[#0B2A20] transition-colors cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading || isFilterLoading ? 'animate-spin text-[#0B2A20]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 25. TEAM LAYOUT: LEADERSHIP */}
      {(filterRole === 'all' || filterRole === 'leadership') && (
        <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{t('INSTITUTE GOVERNANCE', 'প্রাতিষ্ঠানিক পরিচালনা')}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[#0B2A20] font-extrabold tracking-tight mb-3">
                {t('Directorate & Leadership', 'পরিচালনা পরিষদ ও নেতৃত্ব')}
              </h2>
              <p className="text-sm sm:text-base text-[#556B62] font-sans font-normal">
                {t(
                  'Guiding institutional strategy, methodological standards, and collaborative scientific governance.',
                  'প্রাতিষ্ঠানিক কৌশল, গবেষণা পদ্ধতি এবং বৈজ্ঞানিক মান নিশ্চিতকরণে নিবেদিত নেতৃত্ব।'
                )}
              </p>
            </div>

            {isLoading || isFilterLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <TeamCardSkeleton key={`lead-skel-${idx}`} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {leadership.map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    onSelect={(m) => onSelectMember(m)}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* RESEARCHERS & ANALYSTS */}
      {(filterRole === 'all' || filterRole === 'research') && (
        <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#F6F9F4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{t('INVESTIGATIVE CORPS', 'গবেষক ও বিশ্লেষক দল')}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[#0B2A20] font-extrabold tracking-tight mb-3">
                {t('Researchers & Analysts', 'গবেষক ও বিশ্লেষকবৃন্দ')}
              </h2>
              <p className="text-sm sm:text-base text-[#556B62] font-sans font-normal">
                {t(
                  'Specialists conducting continuous multi-channel monitoring, computational audits, and representative survey analyses.',
                  'সার্বক্ষণিক সম্প্রচার ও ডিজিটাল মনিটরিং, কম্পিউটেশনাল অডিট এবং জনমত জরিপে নিয়োজিত বিশেষজ্ঞবৃন্দ।'
                )}
              </p>
            </div>

            {isLoading || isFilterLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <TeamCardSkeleton key={`res-skel-${idx}`} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {researchers.map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    onSelect={(m) => onSelectMember(m)}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* VISITING FELLOWSHIPS & SCIENTIFIC ADVISORY */}
      <section className="hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-[#144234] bg-[#0B2A20] p-8 sm:p-12 relative overflow-hidden text-white shadow-xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D2F843]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D2F843] text-xs font-bold uppercase tracking-wider border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                  <span>{t('Visiting Scholar Programme', 'ভিজিটিং স্কলার প্রোগ্রাম')}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
                  {t(
                    'Independent Scientific Advisory & Visiting Fellows',
                    'স্বাধীন বৈজ্ঞানিক উপদেষ্টা ও ভিজিটিং ফেলো'
                  )}
                </h3>
                <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed max-w-2xl">
                  {t(
                    'In addition to our resident fellows, IPA hosts residential visiting researchers, data journalists, and computational fellows each academic term. We also maintain a non-executive scientific ethics board representing independent universities and civil society.',
                    'আমাদের নিয়মিত ফেলোদের পাশাপাশি আইপিএ প্রতি শিক্ষাবর্ষে ভিজিটিং গবেষক, ডেটা জার্নালিস্ট ও ফেলোদের আমন্ত্রণ জানায়। এছাড়াও একটি স্বাধীন বৈজ্ঞানিক নীতিমালা বোর্ড আমাদের গবেষণা পর্যবেক্ষণ করে।'
                  )}
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-4 rounded-full bg-[#D2F843] text-[#0B2A20] hover:bg-white transition-all text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {t('Inquire About Fellowships', 'ফেলোশিপ সম্পর্কে জানতে যোগাযোগ করুন')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Profile Viewer */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => onSelectMember(null)}
      />

      {/* CTA */}
      <CTASection />
      </div>
    </PageTransition>
  );
}
