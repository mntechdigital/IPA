'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageId, ResearchBeat, ResearchPageData, WorkCategory, WorkProcessPillar } from '../../../types';
import { PageTransition } from '../PageTransition';
import { Layers, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHero } from '../../../components/PageHero';
import { WorkCard } from '../../../components/WorkCard';
import { CTASection } from '../../../components/CTASection';
import { WorkCardSkeleton, PillarCardSkeleton } from '../../../components/Skeleton';
import { useLanguage } from '../../../context/LanguageContext';
import { INITIAL_CMS_STATE } from '../../../data/initialData';

interface WorkViewProps {
  researchPage?: ResearchPageData | null;
  researchBeats?: ResearchBeat[];
  workProcessPillars?: WorkProcessPillar[];
}

export default function WorkView({
  researchPage: initialResearchPage,
  researchBeats: initialResearchBeats = [],
  workProcessPillars: initialWorkProcessPillars = []
}: WorkViewProps) {
  const router = useRouter();
  const { isBn, t } = useLanguage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'journalism' | 'platforms' | 'public'>('all');

  // Perceived initial loading simulation (matching Vite 1:1)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filter: 'all' | 'journalism' | 'platforms' | 'public') => {
    if (filter === selectedFilter) return;
    setIsFilterLoading(true);
    setSelectedFilter(filter);
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

  const onNavigate = (page: PageId) => {
    if (page === 'investigation') return;
    const routes: Record<string, string> = { home: '/', about: '/about', work: '/work', team: '/team', contact: '/contact' };
    router.push(routes[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSelectInvestigation = (id: string) => {
    router.push(`/investigation/${encodeURIComponent(id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CMS state from server component with static defaults fallback
  const researchPage = initialResearchPage || INITIAL_CMS_STATE.researchPage;
  const heroData = researchPage?.hero || INITIAL_CMS_STATE.researchPage.hero;
  const areasData = researchPage?.areasSection || INITIAL_CMS_STATE.researchPage.areasSection;
  const filterPills = researchPage?.filterPills || INITIAL_CMS_STATE.researchPage.filterPills;
  const ctaData = researchPage?.cta || INITIAL_CMS_STATE.researchPage.cta;
  const workLooksLike = researchPage?.whatOurWorkLooksLike || INITIAL_CMS_STATE.researchPage.whatOurWorkLooksLike;

  const beatsSource: ResearchBeat[] = initialResearchBeats.length > 0
    ? initialResearchBeats
    : Object.values(INITIAL_CMS_STATE.researchBeats);

  const sortedBeats = [...beatsSource].sort((a, b) => (a.beatNumber || '').localeCompare(b.beatNumber || ''));

  const pillarsSource: WorkProcessPillar[] = initialWorkProcessPillars.length > 0
    ? initialWorkProcessPillars
    : INITIAL_CMS_STATE.workProcessPillars;

  // Map ResearchBeats into WorkCategory structure
  const worksList: WorkCategory[] = sortedBeats.map(beat => ({
    id: beat.id,
    name: beat.name,
    nameBn: beat.nameBn,
    tagline: beat.tagline,
    taglineBn: beat.taglineBn,
    description: beat.description,
    descriptionBn: beat.descriptionBn,
    methods: beat.primaryMethodologies || [],
    methodsBn: beat.primaryMethodologiesBn || [],
    sampleInquiries: beat.sampleInquiries || [],
    sampleInquiriesBn: beat.sampleInquiriesBn || [],
    image: beat.image,
    imageBn: beat.imageBn,
    outputsCount: beat.outputsCount || '',
    outputsCountBn: beat.outputsCountBn || '',
  }));

  const filteredWorks = worksList.filter((work) => {
    if (selectedFilter === 'journalism') {
      return work.id === 'media-journalism' || work.id === 'media-monitoring';
    }
    if (selectedFilter === 'platforms') {
      return work.id === 'digital-media' || work.id === 'technology-ai';
    }
    if (selectedFilter === 'public') {
      return work.id === 'public-opinion' || work.id === 'media-democracy';
    }
    return true;
  });

  return (
    <PageTransition>
      <div className="bg-[#F6F9F4] text-[#0D1F18]">
        {/* 21. HERO */}
        <PageHero
          backgroundImage={heroData.backgroundImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85'}
          label={isBn ? (heroData.labelBn || heroData.label || 'গবেষণাসমূহ') : (heroData.label || 'RESEARCHES')}
          title={isBn ? (heroData.titleBn || heroData.title || 'গণমাধ্যম ও সমাজের পারস্পরিক গতিশীলতা নিয়ে গবেষণা।') : (heroData.title || 'Exploring the Forces Shaping Media.')}
          description={isBn ? (heroData.descriptionBn || heroData.description || 'আমাদের গবেষণাসমূহ গণমাধ্যম, প্রযুক্তি, সাংবাদিকতা এবং সমাজের আন্তঃসম্পর্ককে তথ্য-প্রমাণের ভিত্তিতে বিশ্লেষণ করে।') : (heroData.description || 'Our work examines the changing relationships between media, technology, journalism, information, and society.')}
          metadata={isBn ? (heroData.metadataBn || heroData.metadata || 'গবেষণা পোর্টফোলিও ও অনুসন্ধানী ক্ষেত্রসমূহ') : (heroData.metadata || 'Research Portfolio & Inquiry Areas')}
        />

        {/* 23. WHAT OUR WORK LOOKS LIKE (4 VISUAL CATEGORIES - hidden matching Vite 1:1) */}
        <section className="hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{isBn ? (workLooksLike?.badgeBn || 'মূল কর্মপদ্ধতি') : (workLooksLike?.badge || 'CORE MODALITIES')}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? (workLooksLike?.titleBn || 'আমাদের কাজের রূপরেখা') : (workLooksLike?.title || 'What Our Work Looks Like')}
              </h2>
              <p className="text-base sm:text-lg text-[#556B62] font-sans font-normal">
                {isBn ? (workLooksLike?.descriptionBn || 'আমরা চারটি পৃথক স্তম্ভের মাধ্যমে গবেষণা পরিচালনা করি—দীর্ঘমেয়াদী বৈজ্ঞানিক অনুসন্ধান থেকে শুরু করে রিয়েল-টাইম সম্প্রচার পর্যবেক্ষণ।') : (workLooksLike?.description || 'We execute research through four distinct operational pillars, spanning long-term scientific inquiry to real-time broadcast monitoring.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <PillarCardSkeleton key={`pillar-skel-${idx}`} />
                  ))
                : pillarsSource.map((pillar, pIdx) => {
                    const number = pillar.step || String(pIdx + 1).padStart(2, '0');
                    const title = isBn && pillar.titleBn ? pillar.titleBn : pillar.title;
                    const subtitle = isBn && pillar.subtitleBn ? pillar.subtitleBn : pillar.subtitle;
                    const description = isBn && pillar.descriptionBn ? pillar.descriptionBn : pillar.description;
                    const highlights = isBn && pillar.highlightsBn && pillar.highlightsBn.length > 0 ? pillar.highlightsBn : pillar.highlights;
                    return (
                      <div
                        key={pillar.id}
                        className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#0B2A20] transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-[#0B2A20] mb-4 font-bold">
                            <span className="px-2.5 py-1 rounded-full bg-[#0B2A20] text-[#D2F843]">
                              {isBn ? `স্তম্ভ ০${number}` : `PILLAR ${number}`}
                            </span>
                            <span className="text-[#556B62] uppercase">{pillar.id}</span>
                          </div>

                          <h3 className="font-sans text-2xl sm:text-3xl text-[#0B2A20] font-extrabold mb-1">
                            {title}
                          </h3>

                          <div className="text-xs font-mono uppercase text-[#556B62] font-semibold mb-3">
                            {subtitle}
                          </div>

                          <p className="font-sans text-xs sm:text-sm text-[#556B62] leading-relaxed mb-6 font-normal">
                            {description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E2EAE4] space-y-2">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-[#556B62] font-semibold block">
                            {t('Core Outputs', 'মূল ফলাফল')}
                          </span>
                          {highlights.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs font-sans text-[#0D1F18]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A20]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </section>

        {/* 22. WORK AREAS */}
        <section className="py-24 sm:py-32 border-b border-[#E2EAE4] bg-[#F6F9F4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section Header with Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                  <span>{isBn ? (areasData.badgeBn || 'ছয়টি প্রধান গবেষণা ক্ষেত্র') : (areasData.badge || 'SIX RESEARCH AREAS')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight">
                    {isBn ? (areasData.titleBn || 'অনুসন্ধানের ক্ষেত্রসমূহ') : (areasData.title || 'Areas of Investigation')}
                  </h2>
                  <button
                    onClick={handleReload}
                    title={isBn ? (areasData.refreshTooltipBn || 'গবেষণা তালিকা রিফ্রেশ করুন') : (areasData.refreshTooltip || 'Refresh Research Catalog')}
                    className="p-2 rounded-full border border-[#E2EAE4] bg-white text-[#556B62] hover:text-[#0B2A20] hover:border-[#0B2A20] transition-colors cursor-pointer text-xs"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isFilterLoading || isLoading ? 'animate-spin text-[#0B2A20]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Filter Pills (Strictly One Line) */}
              <div className="flex items-center gap-2 text-xs font-mono overflow-x-auto no-scrollbar py-1 flex-nowrap whitespace-nowrap max-w-full">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                    selectedFilter === 'all'
                      ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                  }`}
                >
                  {isBn ? (filterPills.allLabelBn || 'সকল গবেষণা ক্ষেত্র (৬)') : (filterPills.allLabel || 'All Research Areas (6)')}
                </button>
                <button
                  onClick={() => handleFilterChange('journalism')}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                    selectedFilter === 'journalism'
                      ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                  }`}
                >
                  {isBn ? (filterPills.journalismLabelBn || 'সাংবাদিকতা ও নিউজরুম') : (filterPills.journalismLabel || 'Journalism & Newsrooms')}
                </button>
                <button
                  onClick={() => handleFilterChange('platforms')}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                    selectedFilter === 'platforms'
                      ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                  }`}
                >
                  {isBn ? (filterPills.platformsLabelBn || 'প্ল্যাটফর্ম ও এআই') : (filterPills.platformsLabel || 'Platforms & AI')}
                </button>
                <button
                  onClick={() => handleFilterChange('public')}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                    selectedFilter === 'public'
                      ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
                  }`}
                >
                  {isBn ? (filterPills.publicLabelBn || 'জনমত ও গণতন্ত্র') : (filterPills.publicLabel || 'Public & Democracy')}
                </button>
              </div>
            </div>

            {/* Cards with alternating layouts and subtle skeleton loading */}
            {isLoading || isFilterLoading ? (
              <div className="space-y-10 sm:space-y-14">
                {Array.from({ length: selectedFilter === 'all' ? 3 : 2 }).map((_, idx) => (
                  <WorkCardSkeleton key={`work-skel-${idx}`} index={idx} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-10 sm:space-y-14"
              >
                {filteredWorks.map((work, idx) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    index={idx}
                    onExplore={(w) => {
                      onSelectInvestigation(w.id);
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title={ctaData.title}
          titleBn={ctaData.titleBn}
          narrative={ctaData.narrative}
          narrativeBn={ctaData.narrativeBn}
          primaryText={ctaData.primaryText}
          primaryTextBn={ctaData.primaryTextBn}
          primaryUrl={ctaData.primaryUrl}
          secondaryText={ctaData.secondaryText}
          secondaryTextBn={ctaData.secondaryTextBn}
          secondaryUrl={ctaData.secondaryUrl}
        />
      </div>
    </PageTransition>
  );
}
