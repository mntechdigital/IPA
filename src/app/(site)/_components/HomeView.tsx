'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageId, TeamMember } from '../../../types';
import { PageTransition } from '../PageTransition';
import {
  ArrowRight,
  CheckCircle,
  Radio,
  Search,
  Calendar,
  FileText,
  Database,
  ShieldCheck,
  Tv,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ORGANIZATION } from '../../../data/navigation';
import { SectionHeading } from '../../../components/SectionHeading';
import { FocusAreaList } from '../../../components/FocusAreaList';
import { TEAM_MEMBERS } from '../../../data/team';
import { APPROACH_STEPS } from '../../../data/approach';
import { CTASection } from '../../../components/CTASection';
import { useLanguage } from '../../../context/LanguageContext';
import { APPROACH_STEPS_BN, TEAM_MEMBERS_BN } from '../../../data/translations';

export default function HomePage() {
  const router = useRouter();
  const onNavigate = (page: PageId) => {
    if (page === 'investigation') return;
    const routes: Record<string, string> = { home: '/', about: '/about', work: '/work', team: '/team', contact: '/contact' };
    router.push(routes[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const onSelectTeamMember = (member: TeamMember) => {
    router.push(`/team?member=${encodeURIComponent(member.id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const onSelectInvestigation = (id: string) => {
    router.push(`/investigation/${encodeURIComponent(id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { isBn, t } = useLanguage();
  const previewTeam = TEAM_MEMBERS.slice(0, 4);

  const currentApproachSteps = isBn
    ? APPROACH_STEPS.map((step, idx) => {
        const bn = APPROACH_STEPS_BN[idx];
        return bn
          ? {
              ...step,
              number: bn.number,
              title: bn.title,
              subtitle: bn.subtitle,
              description: bn.description,
            }
          : step;
      })
    : APPROACH_STEPS;

  const TICKER_ITEMS = isBn
    ? [
        'গণমাধ্যম গবেষণা',
        'সাংবাদিকতার সুরক্ষা',
        'ডিজিটাল প্ল্যাটফর্ম ও এআই',
        'জনমত ও বিশ্বাসযোগ্যতা',
        'তথ্যপ্রবাহের স্থিতিস্থাপকতা',
        'কম্পিউটেশনাল অডিট',
        'নৈতিকতা ও নীতিমালা',
        'মিডিয়া মনিটরিং',
      ]
    : [
        'MEDIA RESEARCH',
        'JOURNALISM RECOVERY',
        'DIGITAL PLATFORMS & AI',
        'PUBLIC OPINION & TRUST',
        'INFORMATION RESILIENCE',
        'COMPUTATIONAL AUDITS',
        'ETHICS & GOVERNANCE',
        'MEDIA MONITORING',
      ];

  return (
    <PageTransition>
      <div className="bg-[#F6F9F4] text-[#0D1F18]">
      {/* FULL-WIDTH HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#061A13] text-white border-b border-[#144234]">
        {/* Full-Bleed Background Photography (Media observatory & journalism research center) */}
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2400&q=85"
          alt="Media observatory and journalism research center"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.65] contrast-[1.05]"
        />

        {/* Atmospheric Emerald & Deep Forest Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2A20]/90 via-[#0B2A20]/65 to-[#061A13]/95 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[at_center_top] from-transparent via-[#061A13]/25 to-[#061A13]/85 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-between text-center items-center">
          {/* Top Block: Badges & Headings */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center mb-6 sm:mb-8"
          >
            {/* Pill Badge matching Greenset style */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#D2F843] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
              <span>
                {t(
                  `Independent Observatory · Est. ${ORGANIZATION.established}`,
                  `স্বাধীন গবেষণা মানমন্দির · প্রতিষ্ঠিত ${ORGANIZATION.established}`
                )}
              </span>
            </div>

            {/* Big Centered Headline with Electric Lime Emphasis */}
            <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.08] sm:leading-[1.02] font-black tracking-tight text-white mb-4 sm:mb-6">
              {isBn ? (
                <>
                  গণমাধ্যম নিয়ে গবেষণা। <br className="hidden xs:inline" />
                  <span className="text-[#D2F843]">সমাজের গভীর</span> অনুধাবন।
                </>
              ) : (
                <>
                  Researching Media.<br className="hidden xs:inline" />
                  <span className="text-[#D2F843]">Understanding</span> Society.
                </>
              )}
            </h1>

            {/* Centered Subtitle */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-white/80 font-sans font-normal leading-relaxed mb-6 sm:mb-8">
              {t(
                'We conduct evidence-driven analysis to understand how journalism, technology, and information environments shape the public sphere.',
                'সাংবাদিকতা, প্রযুক্তি এবং তথ্য প্রবাহ কীভাবে সমাজ ও জনপরিসরকে প্রভাবিত করে তা বুঝতে আমরা তথ্য-প্রমাণ নির্ভর গবেষণা পরিচালনা করি।'
              )}
            </p>

            {/* Centered Pill Button with Circular Arrow Icon */}
            <button
              onClick={() => {
                onNavigate('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-white text-[#0B2A20] hover:bg-[#D2F843] hover:scale-105 font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl transition-all cursor-pointer group"
            >
              <span>{t('Explore Researches', 'গবেষণাসমূহ দেখুন')}</span>
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>

          {/* Bottom Row: Metric & Research Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mt-12 sm:mt-16 lg:mt-20 text-left"
          >
            {/* Card 1: Years of Experience */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0B2A20]/90 backdrop-blur-md border border-white/20 p-3 sm:p-5 lg:p-6 flex flex-col justify-between shadow-xl hover:border-[#D2F843]/50 transition-all group">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 text-[#D2F843] flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:bg-[#D2F843] group-hover:text-[#0B2A20] transition-all">
                  <Calendar className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                  Est. {ORGANIZATION.established}
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 group-hover:text-[#D2F843] transition-colors">
                  {t('12+ Years', '১২+ বছর')}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D2F843] mb-0.5 sm:mb-1">
                  {t('Experience', 'অভিজ্ঞতা')}
                </div>
                <p className="text-[10px] sm:text-xs text-white/75 leading-tight sm:leading-relaxed line-clamp-2">
                  {t(
                    `Longitudinal observation since ${ORGANIZATION.established}.`,
                    `${ORGANIZATION.established} থেকে ধারাবাহিক নিবিড় পর্যবেক্ষণ।`
                  )}
                </p>
              </div>
            </div>

            {/* Card 2: Total Inquiries */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0B2A20]/90 backdrop-blur-md border border-white/20 p-3 sm:p-5 lg:p-6 flex flex-col justify-between shadow-xl hover:border-[#D2F843]/50 transition-all group">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 text-[#D2F843] flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:bg-[#D2F843] group-hover:text-[#0B2A20] transition-all">
                  <FileText className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                  {t('6 Research Areas', '৬টি গবেষণা ক্ষেত্র')}
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 group-hover:text-[#D2F843] transition-colors">
                  160+
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D2F843] mb-0.5 sm:mb-1">
                  {t('Total Inquiries', 'গবেষণা ও প্রতিবেদন')}
                </div>
                <p className="text-[10px] sm:text-xs text-white/75 leading-tight sm:leading-relaxed line-clamp-2">
                  {t('Empirical inquiries & published studies.', 'তথ্যভিত্তিক অনুসন্ধান ও প্রকাশিত গবেষণা।')}
                </p>
              </div>
            </div>

            {/* Card 3: Datasets Monitored */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0B2A20]/90 backdrop-blur-md border border-white/20 p-3 sm:p-5 lg:p-6 flex flex-col justify-between shadow-xl hover:border-[#D2F843]/50 transition-all group">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 text-[#D2F843] flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:bg-[#D2F843] group-hover:text-[#0B2A20] transition-all">
                  <Database className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#D2F843]/20 text-[#D2F843] border border-[#D2F843]/30">
                  {t('Live Logging', 'লাইভ লগিং')}
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 group-hover:text-[#D2F843] transition-colors">
                  12.4k+
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D2F843] mb-0.5 sm:mb-1">
                  {t('Datasets', 'ডেটাসেট')}
                </div>
                <p className="text-[10px] sm:text-xs text-white/75 leading-tight sm:leading-relaxed line-clamp-2">
                  {t('Broadcast streams, archives & digital feeds.', 'সম্প্রচার স্ট্রিম ও ডিজিটাল ফিডের তথ্য।')}
                </p>
              </div>
            </div>

            {/* Card 4: Verification Rigor */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0B2A20]/90 backdrop-blur-md border border-white/20 p-3 sm:p-5 lg:p-6 flex flex-col justify-between shadow-xl hover:border-[#D2F843]/50 transition-all group">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 text-[#D2F843] flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:bg-[#D2F843] group-hover:text-[#0B2A20] transition-all">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                  {t('Audited', 'যাচাইকৃত')}
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 group-hover:text-[#D2F843] transition-colors">
                  98.4%
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D2F843] mb-0.5 sm:mb-1">
                  {t('Verification', 'নির্ভুলতা')}
                </div>
                <p className="text-[10px] sm:text-xs text-white/75 leading-tight sm:leading-relaxed line-clamp-2">
                  {t('Methodological validity & accuracy rate.', 'পদ্ধতিগত বৈধতা ও তথ্য যাচাইয়ের মানদণ্ড।')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BUILT FOR PUBLIC INTEREST SECTION WITH CONTEXTUAL IMAGE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F6F9F4] border-b border-[#E2EAE4]" id="public-interest">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Mission Narrative and Methodological Safeguards */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] border border-[#0B2A20]/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
                <span>{t('Built for Public Interest', 'জনস্বার্থে নিবেদিত')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2A20] leading-snug sm:leading-tight tracking-tight">
                {t(
                  'Started as an independent research observatory, now monitoring across 6 key inquiry beats for society.',
                  'একটি স্বাধীন গবেষণা মানমন্দির হিসেবে যাত্রা শুরু করে বর্তমানে সমাজের জন্য ৬টি গুরুত্বপূর্ণ ক্ষেত্রে নিয়োজিত।'
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#556B62] leading-relaxed max-w-2xl font-normal">
                {t(
                  'We investigate information integrity, algorithmic amplification, and press sustainability. All investigative findings and microdata are released open-access to empower journalists, policymakers, and civic institutions with verified evidence.',
                  'আমরা তথ্যের বস্তুনিষ্ঠতা, অ্যালগরিদম বিস্তার এবং গণমাধ্যমের টেকসই রূপান্তর নিরীক্ষণ করি। আমাদের সকল গবেষণা প্রতিবেদন ও ডেটাসেট উন্মুক্তভাবে প্রকাশিত হয় যাতে সাংবাদিক ও নাগরিক প্রতিষ্ঠানগুলো যাচাইকৃত প্রমাণাদি ব্যবহার করতে পারে।'
                )}
              </p>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2EAE4] text-xs font-medium text-[#0B2A20] shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#195642]" />
                  <span>{t('100% Non-Partisan & Open-Access', '১০০% নিরপেক্ষ ও উন্মুক্ত গবেষণা')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2EAE4] text-xs font-medium text-[#0B2A20] shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#195642]" />
                  <span>{t('IRB-Approved Scientific Ethics', 'আইআরবি-স্বীকৃত বৈজ্ঞানিক নীতিমালা')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2EAE4] text-xs font-medium text-[#0B2A20] shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#195642]" />
                  <span>{t('Open Microdata Standards', 'উন্মুক্ত মাইক্রোডেটা মানদণ্ড')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2EAE4] text-xs font-medium text-[#0B2A20] shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#195642]" />
                  <span>{t('Independent Editorial Oversight', 'স্বাধীন সম্পাদকীয় তদারকি')}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contextual Image Feature */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E2EAE4] bg-white group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"
                  alt="Public interest media researchers analyzing datasets and societal impact"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Floating Image Badges */}
                <div className="hidden">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2A20]/90 backdrop-blur-md text-[#D2F843] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#D2F843]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843] animate-pulse" />
                    <span>{t('PUBLIC REPOSITORY', 'উন্মুক্ত সংগ্রহশালা')}</span>
                  </span>
                </div>

                <div className="hidden">
                  <div className="font-sans font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                    {t('Evidence-Driven Civic Accountability', 'তথ্য-প্রমাণ নির্ভর নাগরিক দায়বদ্ধতা')}
                  </div>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                    {t(
                      'Observatory microdata accessible to civic researchers, newsrooms, and citizens.',
                      'গবেষক, সংবাদকর্মী ও নাগরিকদের জন্য উন্মুক্ত মাইক্রোউপাত্ত।'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED CONTINUOUS SCROLLING TICKER BANNER (Infinite Marquee) */}
      <div className="bg-[#D2F843] text-[#0B2A20] py-3.5 overflow-hidden border-b border-[#c0e82c] select-none flex shadow-inner">
        <motion.div
          className="flex whitespace-nowrap items-center flex-shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          {/* First set of marquee items */}
          <div className="flex items-center gap-8 sm:gap-14 pr-8 sm:pr-14 flex-shrink-0">
            {TICKER_ITEMS.map((item, idx) => (
              <span
                key={`t1-${idx}`}
                className="flex items-center gap-3 text-xs sm:text-sm font-black tracking-widest uppercase"
              >
                <span className="text-[#0B2A20] text-sm">✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>

          {/* Duplicate set for seamless continuous infinite loop */}
          <div
            className="flex items-center gap-8 sm:gap-14 pr-8 sm:pr-14 flex-shrink-0"
            aria-hidden="true"
          >
            {TICKER_ITEMS.map((item, idx) => (
              <span
                key={`t2-${idx}`}
                className="flex items-center gap-3 text-xs sm:text-sm font-black tracking-widest uppercase"
              >
                <span className="text-[#0B2A20] text-sm">✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 9. INTRODUCTION: WHO WE ARE */}
      <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Large Heading & Label */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between text-xs font-bold tracking-widest uppercase text-[#0B2A20]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] border border-[#0B2A20]/10">
                  <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
                  <span>{t('WHO WE ARE', 'আমাদের পরিচিতি')}</span>
                </div>
                <span className="font-mono text-[#556B62]">01 / 05</span>
              </div>

              <h2 className="font-sans text-4xl sm:text-5xl lg:text-[54px] text-[#0B2A20] font-extrabold leading-[1.08] tracking-tight">
                {isBn ? (
                  <>
                    গণমাধ্যম নিয়ে গবেষণা। <br />
                    <span className="text-[#195642]">সামাজিক প্রভাবের বিশ্লেষণ।</span>
                  </>
                ) : (
                  <>
                    Researching the Media. <br />
                    <span className="text-[#195642]">Understanding Its Impact.</span>
                  </>
                )}
              </h2>

              <div className="pt-2">
                <div className="inline-block px-4 py-2 bg-[#F6F9F4] rounded-xl border border-[#E2EAE4] font-mono text-xs text-[#556B62] tracking-wider uppercase font-bold">
                  {t(
                    'INDEPENDENT RESEARCH · EVIDENCE-DRIVEN',
                    'স্বাধীন গবেষণা · তথ্য-প্রমাণ নির্ভর'
                  )}
                </div>
              </div>
            </div>

            {/* Right: Description & CTA */}
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#0D1F18] font-sans font-normal leading-relaxed pt-2">
              <p>
                <strong>{t(ORGANIZATION.name, ORGANIZATION.nameBn)}</strong>{' '}
                {t(
                  'is an independent media research organization focused on understanding the changing landscape of media, journalism, and information.',
                  'একটি স্বাধীন গণমাধ্যম গবেষণা প্রতিষ্ঠান যা গণমাধ্যম, সাংবাদিকতা ও তথ্য ব্যবস্থার পরিবর্তনশীল গতিশীলতা নিয়ে কাজ করে।'
                )}
              </p>

              <p className="text-[#556B62]">
                {t(
                  'Through research, monitoring, and analysis, we examine how information is produced, distributed, consumed, and understood in a rapidly changing digital environment.',
                  'গবেষণা, নিবিড় নিরীক্ষণ ও বিশ্লেষণের মাধ্যমে আমরা খতিয়ে দেখি কীভাবে দ্রুত পরিবর্তনশীল ডিজিটাল বিশ্বে তথ্য উৎপাদিত, পরিবেশিত ও জনমানসে গৃহীত হয়।'
                )}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B2A20] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#144234] transition-all cursor-pointer"
                >
                  <span>{t('Discover Our Organization', 'আমাদের সম্পর্কে জানুন')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#D2F843]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHAT WE DO: EXACTLY 3 KEY BOXES, WHERE ONE IS A DEDICATED IMAGE BOX */}
      <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#F6F9F4]" id="what-we-do">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            label={t('WHAT WE DO', 'আমাদের কার্যক্রম')}
            index="02 / 05"
            title={t('What We Do', 'আমরা যা করি')}
            description={t(
              "We explore the forces shaping today's media and information environment through research, analysis, and continuous monitoring.",
              'আমরা গবেষণা, নিবিড় বিশ্লেষণ ও নিরবচ্ছিন্ন নিরীক্ষার মাধ্যমে গণমাধ্যম ও তথ্য ব্যবস্থার গতিশীলতা অনুধাবন করি।'
            )}
          />

          {/* 3 Key Boxes Grid (Content Box 1 + Dedicated Visual Image Box + Content Box 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Key Box 1: Media Research & Investigative Inquiry (Content Box) */}
            <div className="rounded-3xl border border-[#E2EAE4] bg-white text-[#0D1F18] p-8 sm:p-9 transition-all duration-300 hover:shadow-md hover:border-[#0B2A20] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E2EAE4]">
                  <span className="font-mono text-3xl font-extrabold text-[#0B2A20]">
                    01
                  </span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#F6F9F4] text-[#0B2A20] group-hover:bg-[#0B2A20] group-hover:text-[#D2F843] transition-colors">
                    <Search className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-sans text-2xl font-extrabold tracking-tight mb-3 text-[#0B2A20]">
                  {t('MEDIA RESEARCH & INQUIRY', 'গণমাধ্যম গবেষণা ও অনুসন্ধান')}
                </h3>

                <p className="font-sans text-sm leading-relaxed mb-6 text-[#556B62]">
                  {t(
                    'We study emerging trends, newsroom editorial autonomy, and structural pressures through rigorous qualitative fieldwork, ethnography, and structured academic inquiry.',
                    'আমরা মাঠপর্যায়ের সমীক্ষা, গবেষণামূলক সাক্ষাৎকার এবং কাঠামোগত পর্যালোচনার মাধ্যমে গণমাধ্যমের স্বাধীনতা ও রূপান্তর বিশ্লেষণ করি।'
                  )}
                </p>
              </div>

            </div>

            {/* Key Box 2: Visual 24/7 Media Observatory (DEDICATED IMAGE BOX) */}
            <div className="rounded-3xl border border-[#E2EAE4] overflow-hidden relative group min-h-[380px] sm:min-h-[420px] flex flex-col justify-between shadow-md">
              {/* Full-Bleed High-Definition Observatory Image */}
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85"
                alt="24/7 Media observatory laboratory and broadcast recording facility"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Contrast Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A13]/95 via-[#0B2A20]/45 to-black/30 pointer-events-none" />

              {/* Top Bar of Image Box */}
              <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20">
                  <Tv className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Content of Image Box */}
              <div className="relative z-10 p-6 sm:p-7 text-white space-y-2">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold leading-snug drop-shadow-sm text-white">
                  {t(
                    'Continuous Multi-Channel Signal Archival',
                    'নিরবচ্ছিন্ন সম্প্রচার ও ডিজিটাল আর্কাইভাল'
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-3 leading-relaxed">
                  {t(
                    'Operating continuous recording facilities across 18 broadcast television channels, 32 national daily newspapers, and 120+ digital portals.',
                    '১৮টি স্যাটেলাইট টিভি চ্যানেল, ৩২টি জাতীয় দৈনিক ও ১২০টির বেশি ডিজিটাল পোর্টাল সার্বক্ষণিক সংরক্ষণ ও নিরীক্ষণ।'
                  )}
                </p>

              </div>
            </div>

            {/* Key Box 3: Monitoring & Public Insights (Content Box with Bold Theme) */}
            <div className="rounded-3xl border border-[#c0e82c] bg-[#D2F843] text-[#0B2A20] p-8 sm:p-9 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#0B2A20]/20">
                  <span className="font-mono text-3xl font-extrabold text-[#0B2A20]">
                    02
                  </span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0B2A20] text-[#D2F843] shadow-sm">
                    <Radio className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-sans text-2xl font-extrabold tracking-tight mb-3 text-[#0B2A20]">
                  {t('MONITORING & PUBLIC INSIGHTS', 'মনিটরিং ও জনস্বার্থ ইনসাইট')}
                </h3>

                <p className="font-sans text-sm leading-relaxed mb-6 text-[#0B2A20]/85">
                  {t(
                    'We monitor news narratives, algorithmic distribution, and audience perception across broadcast and digital platforms, producing reproducible open datasets for civic accountability.',
                    'আমরা প্রচার মাধ্যম ও প্ল্যাটফর্ম অ্যালগরিদম নিরীক্ষণ করে নাগরিক দায়বদ্ধতার জন্য উন্মুক্ত ও নির্ভরযোগ্য তথ্য-উপাত্ত তৈরি করি।'
                  )}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 11. AREAS OF FOCUS */}
      <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            label={t('AREAS OF FOCUS', 'গবেষণার ক্ষেত্রসমূহ')}
            index="03 / 05"
            title={t('Areas We Explore', 'আমরা যেসব ক্ষেত্রে কাজ করি')}
            description={t(
              'Six specialized research domains addressing the systemic questions of news integrity, platform dynamics, and civic reception.',
              'সংবাদের বস্তুনিষ্ঠতা, প্ল্যাটফর্মের প্রভাব এবং নাগরিক প্রতিক্রিয়ার মূল প্রশ্নসমূহ নিয়ে নিবেদিত ৬টি বিশেষ গবেষণা ক্ষেত্র।'
            )}
          />

          <FocusAreaList
            onSelectArea={(area) => {
              if (onSelectInvestigation) {
                const beatMap: Record<string, string> = {
                  '01': 'media-journalism',
                  '02': 'digital-media',
                  '03': 'media-monitoring',
                  '04': 'public-opinion',
                  '05': 'media-democracy',
                  '06': 'technology-ai',
                };
                const targetId = beatMap[area.number] || 'media-journalism';
                onSelectInvestigation(targetId);
                onNavigate('investigation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
              }
              onNavigate('work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* 12. LARGE STATEMENT (Deep Green with Electric Lime accents) */}
      <section className="py-24 sm:py-32 bg-[#0B2A20] text-white border-b border-[#144234] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2200&q=85"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-[#0B2A20]/60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16513E]/40 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#D2F843]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#D2F843] text-xs font-bold uppercase tracking-widest border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
            {t('INSTITUTIONAL CORE TENET', 'প্রতিষ্ঠানের মূল দর্শন')}
          </div>

          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.06] tracking-tight text-white">
            {t(
              '“Better understanding begins with better research.”',
              '“সঠিক অনুধাবনের ভিত্তি হলো নির্ভুল ও নির্মোহ গবেষণা।”'
            )}
          </h2>

          <p className="text-base sm:text-xl font-sans text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {t(
              'Our work seeks to make the changing media environment easier to understand through independent research and thoughtful analysis.',
              'আমাদের কাজ স্বাধীন গবেষণা ও গঠনমূলক বিশ্লেষণের মাধ্যমে পরিবর্তনশীল গণমাধ্যম ব্যবস্থাকে আরো সুস্পষ্টভাবে অনুধাবন করতে সাহায্য করে।'
            )}
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D2F843] text-[#0B2A20] text-xs font-extrabold uppercase tracking-widest hover:bg-[#bef024] transition-all cursor-pointer shadow-lg"
            >
              <span>{t('Explore Our Methodological Commitments →', 'আমাদের গবেষণা পদ্ধতি ও প্রতিশ্রুতিসমূহ →')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 13. OUR APPROACH */}
      <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#F6F9F4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeading
            label={t('OUR APPROACH', 'আমাদের কর্মপদ্ধতি')}
            index="04 / 05"
            title={t('How We Work', 'আমরা যেভাবে কাজ করি')}
            description={t(
              "We combine research, evidence, monitoring, and analysis to develop a clearer understanding of the issues shaping today's information environment.",
              'তথ্য ও গণমাধ্যম পরিবেশকে সুস্পষ্টভাবে অনুধাবন করতে আমরা গবেষণা, প্রমাণাদি, নিরীক্ষণ ও গভীর বিশ্লেষণের সমন্বয় ঘটাই।'
            )}
          />

          {/* Modern 4-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {currentApproachSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0B2A20] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0B2A20] mb-4">
                    <span className="w-8 h-8 rounded-xl bg-[#0B2A20] text-[#D2F843] flex items-center justify-center font-mono text-xs font-bold">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#556B62]">
                      {t('PIPELINE', 'পর্যায়')}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl text-[#0B2A20] font-extrabold mb-1">
                    {step.title}
                  </h3>

                  <div className="text-xs font-mono uppercase text-[#556B62] font-semibold mb-3">
                    {step.subtitle}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#556B62] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2EAE4] flex items-center gap-1.5 text-[11px] font-mono text-[#0B2A20] font-bold">
                  <CheckCircle className="w-4 h-4 text-[#195642]" />
                  <span>{t('Standardized Review', 'মানসম্মত পর্যালোচনা')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. TEAM PREVIEW */}
      <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              label={t('THE TEAM', 'আমাদের টিম')}
              index="05 / 05"
              title={t('The People Behind the Research', 'গবেষণার নেপথ্যের গবেষক দল')}
              description={t(
                "Our team brings together researchers, analysts, media professionals, and experts committed to understanding today's rapidly changing information environment.",
                'আমাদের দলে রয়েছেন অভিজ্ঞ গবেষক, ডেটা অ্যানালিস্ট এবং গণমাধ্যম বিশেষজ্ঞ।'
              )}
              className="mb-0!"
            />

            <div className="mt-6 md:mt-0">
              <button
                onClick={() => {
                  onNavigate('team');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F6F9F4] hover:bg-[#E2EAE4] text-xs font-bold uppercase tracking-wider text-[#0B2A20] transition-colors cursor-pointer border border-[#E2EAE4]"
              >
                <span className="font-bold">{t('Meet Our Entire Team', 'সম্পূর্ণ টিম দেখুন')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0B2A20]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewTeam.map((member) => {
              const bnMember = TEAM_MEMBERS_BN[member.id];
              const displayName = isBn && bnMember ? bnMember.nameBn : member.name;
              const displayRole = isBn && bnMember ? bnMember.roleBn : member.role;
              const displayBio = isBn && bnMember ? bnMember.bioBn : member.bio;

              return (
                <div
                  key={member.id}
                  className="group rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#0B2A20] overflow-hidden"
                >
                  <div>
                    <div className="aspect-[4/5] overflow-hidden bg-neutral-100 border-b border-[#E2EAE4]">
                      <img
                        src={member.image}
                        alt={displayName}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#0B2A20]/5 text-[10px] font-bold uppercase tracking-wider text-[#0B2A20] mb-2">
                        {displayRole}
                      </span>
                      <h3 className="font-sans text-xl sm:text-2xl text-[#0B2A20] font-extrabold mb-2">
                        {displayName}
                      </h3>
                      <p className="text-xs text-[#556B62] font-sans leading-relaxed line-clamp-2">
                        {displayBio}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => onSelectTeamMember(member)}
                      className="w-full pt-3 border-t border-[#E2EAE4] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#0B2A20] font-bold group-hover:text-[#195642] transition-colors cursor-pointer"
                    >
                      <span>{t('View Profile', 'প্রোফাইল দেখুন')}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA */}
      <CTASection />
      </div>
    </PageTransition>
  );
}
