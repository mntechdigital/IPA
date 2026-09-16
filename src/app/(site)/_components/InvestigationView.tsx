'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageId } from '../../../types';
import { ResearchBeat } from '../../../types';
import { PageTransition } from '../PageTransition';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  ExternalLink,
  HelpCircle,
  Database,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WORK_AREAS } from '../../../data/work';
import { INITIAL_CMS_STATE } from '../../../data/initialData';
import { useLanguage } from '../../../context/LanguageContext';
import { RelatedInsightsCarousel } from '../../../components/RelatedInsightsCarousel';
import { RequestDatasetModal } from '../../../components/RequestDatasetModal';

interface InvestigationViewProps {
  beat: ResearchBeat | null | undefined;
  id: string;
  allBeats?: ResearchBeat[];
}

export default function InvestigationView({ beat, id, allBeats = [] }: InvestigationViewProps) {
  const router = useRouter();
  const investigationId = id;
  const { isBn, t } = useLanguage();

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

  const base = beat;
  const currentWorkArea = WORK_AREAS.find((area) => area.id === (beat?.category || investigationId));

  const currentInvestigation = {
    ...base,
    name: isBn && base?.nameBn ? base.nameBn : base?.name ?? '',
    tagline: isBn && base?.taglineBn ? base.taglineBn : base?.tagline ?? '',
    status: isBn && base?.statusBn ? base.statusBn : base?.status ?? '',
    timeframe: isBn && base?.timeframeBn ? base.timeframeBn : base?.timeframe ?? '',
    leadFellows: isBn && base?.leadFellowsBn && base.leadFellowsBn.length > 0 ? base.leadFellowsBn : base?.leadFellows ?? [],
    metrics: isBn && base?.metricsBn && base.metricsBn.length > 0
      ? base.metricsBn.map((m) => ({ label: m.label || '', value: m.value || '', detail: m.detail || '' }))
      : base?.metrics ?? [],
    overview: isBn && base?.overviewBn && base.overviewBn.length > 0 ? base.overviewBn : base?.overview ?? [],
    keyQuestions: isBn && base?.keyQuestionsBn && base.keyQuestionsBn.length > 0 ? base.keyQuestionsBn : base?.keyQuestions ?? [],
    methodologyDetails: isBn && base?.methodologyDetailsBn && base.methodologyDetailsBn.length > 0
      ? base.methodologyDetailsBn.map((m) => ({
          title: m.title || '',
          protocol: m.protocol || '',
          frequency: m.frequency || '',
          description: m.description || '',
        }))
      : base?.methodologyDetails ?? [],
    caseStudies: isBn && base?.caseStudiesBn && base.caseStudiesBn.length > 0
      ? base.caseStudiesBn.map((c) => ({
          title: c.title || '',
          year: c.year || '',
          summary: c.summary || '',
          impact: c.impact || '',
        }))
      : base?.caseStudies ?? [],
    publications: isBn && base?.publicationsBn && base.publicationsBn.length > 0
      ? base.publicationsBn.map((p, idx) => ({
          ...base?.publications[idx] ?? { title: '', type: '', date: '', pagesOrSize: '' },
          title: p.title || '',
          type: p.type || '',
          date: p.date || '',
          pagesOrSize: p.pagesOrSize || '',
        }))
      : base?.publications ?? [],
    id: base?.id ?? '',
    beatNumber: base?.beatNumber ?? '',
    category: base?.category ?? '',
    description: isBn && base?.descriptionBn ? base.descriptionBn : (base?.description ?? ''),
    image: isBn && base?.imageBn ? base.imageBn : (base?.image ?? ''),
    outputsCount: isBn && base?.outputsCountBn ? base.outputsCountBn : (base?.outputsCount ?? ''),
    summary: isBn && base?.summaryBn ? base.summaryBn : (base?.summary ?? ''),
    methodology: isBn && base?.methodologyBn ? base.methodologyBn : (base?.methodology ?? ''),
    primaryMethodologies: isBn && base?.primaryMethodologiesBn && base.primaryMethodologiesBn.length > 0
      ? base.primaryMethodologiesBn
      : (base?.primaryMethodologies && base.primaryMethodologies.length > 0 ? base.primaryMethodologies : (currentWorkArea?.methods ?? [])),
    imageTitle: isBn && base?.imageTitleBn ? base.imageTitleBn : (base?.imageTitle ?? ''),
    imageSubtitle: isBn && base?.imageSubtitleBn ? base.imageSubtitleBn : (base?.imageSubtitle ?? ''),
    researchNarrative: isBn && base?.researchNarrativeBn ? base.researchNarrativeBn : (base?.researchNarrative ?? ''),
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'methodology' | 'cases' | 'publications'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://ipa-research.org');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const allResearch = allBeats && allBeats.length > 0
    ? allBeats
    : Object.values(INITIAL_CMS_STATE.researchBeats);

  const shareTitle = `${currentInvestigation.name} — Institute of Public Accountability (IPA)`;
  const shareSummary = `Empirical research insight: "${currentInvestigation.tagline}" via IPA Research #${currentInvestigation.beatNumber}.`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareTitle}\n\n${shareSummary}`)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <PageTransition>
      <div className="bg-[#F6F9F4] text-[#0D1F18] min-h-screen">
      {/* Top Header & Breadcrumbs Bar */}
      <div className="bg-[#0B2A20] text-white border-b border-[#144234] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => {
                  onNavigate('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/60 hover:text-[#D2F843] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('All Investigations', 'সকল গবেষণাসমূহ')}</span>
              </button>
              <span className="text-white/30">/</span>
              <span className="text-[#D2F843] font-bold">
                {t('Research', 'গবেষণা')} {currentInvestigation.beatNumber}: {currentInvestigation.name}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#D2F843] border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] animate-pulse" />
              <span>{currentInvestigation.status}</span>
            </div>
          </div>

          {/* Research Selector Pill Bar (One Line, smooth horizontal scroll) */}
          <div className="hidden">
            {allResearch.map((b) => {
              const isCurrent = b.id === currentInvestigation.id;
              const beatName = isBn && b.nameBn ? b.nameBn : b.name;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    onSelectInvestigation(b.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-[#D2F843] text-[#0B2A20] shadow-md scale-[1.02]'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10'
                  }`}
                >
                  <span className={isCurrent ? 'text-[#0B2A20]' : 'text-[#D2F843]'}>
                    {b.beatNumber}
                  </span>
                  <span>{beatName}</span>
                </button>
              );
            })}
          </div>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-4 pb-6">
            <div className="lg:col-span-8">
              <div className="hidden">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>
                  {t(
                    `Empirical Inquiry Research · #${currentInvestigation.beatNumber}`,
                    `তথ্যভিত্তিক গবেষণা ক্ষেত্র · #${currentInvestigation.beatNumber}`
                  )}
                </span>
              </div>

              <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                {currentInvestigation.name}
              </h1>

              <p className="font-sans text-lg sm:text-2xl text-[#D2F843] font-medium leading-relaxed mb-6">
                “{currentInvestigation.tagline}”
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D2F843]" />
                  <span>
                    {t('Timeframe', 'সময়কাল')}: {currentInvestigation.timeframe}
                  </span>
                </div>
                <div className="hidden">
                  <BookOpen className="w-4 h-4 text-[#D2F843]" />
                  <span>{currentInvestigation.outputsCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D2F843]" />
                  <span>
                    {t('Lead Fellows', 'প্রধান গবেষকবৃন্দ')}: {currentInvestigation.leadFellows.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="hidden">
                <button
                  onClick={() => setIsDatasetModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D2F843] text-[#0B2A20] hover:bg-[#bef024] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[#D2F843]/30"
                >
                  <span>{t('Request Full Dataset', 'সম্পূর্ণ ডেটাসেটের জন্য আবেদন')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Social Media Sharing Group */}
              <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-[#D2F843]">
                    <Share2 className="w-3 h-3 text-[#D2F843]" />
                    {t('Share Insights', 'গবেষণা শেয়ার করুন')}
                  </span>
                  {copiedLink && (
                    <span className="text-[#D2F843] text-[10px] font-bold">
                      {t('Link Copied!', 'লিংক কপি হয়েছে!')}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share research on X"
                    aria-label="Share research on X"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#D2F843] border border-white/15 text-xs font-mono font-bold transition-all text-white/90"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X</span>
                  </a>
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share research on LinkedIn"
                    aria-label="Share research on LinkedIn"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#D2F843] border border-white/15 text-xs font-mono font-bold transition-all text-white/90"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LI</span>
                  </a>
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share research on Facebook"
                    aria-label="Share research on Facebook"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#D2F843] border border-white/15 text-xs font-mono font-bold transition-all text-white/90"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>FB</span>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    title="Copy direct link to research"
                    aria-label="Copy direct link to research"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full bg-white/10 hover:bg-white/20 hover:text-[#D2F843] border border-white/15 text-xs font-mono font-bold transition-all text-white/90 cursor-pointer"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-[#D2F843]" /> : <Link2 className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Investigation Content Tabs & Panels */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Tab Navigation Pill Bar */}
          <div className="hidden">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-[#0B2A20] text-[#D2F843] shadow-md'
                  : 'bg-white text-[#556B62] border border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('Executive Brief & Scope', 'মূল সারসংক্ষেপ ও পরিধি')}</span>
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'methodology'
                  ? 'bg-[#0B2A20] text-[#D2F843] shadow-md'
                  : 'bg-white text-[#556B62] border border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('Methodological Protocols', 'গবেষণার কার্যপদ্ধতি ও প্রটোকল')}</span>
            </button>

            <button
              onClick={() => setActiveTab('cases')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'cases'
                  ? 'bg-[#0B2A20] text-[#D2F843] shadow-md'
                  : 'bg-white text-[#556B62] border border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('Case Studies & Field Notes', 'কেস স্টাডি ও মাঠপর্যায়ের পর্যবেক্ষণ')}</span>
            </button>

            <button
              onClick={() => setActiveTab('publications')}
              className={`hidden px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'publications'
                  ? 'bg-[#0B2A20] text-[#D2F843] shadow-md'
                  : 'bg-white text-[#556B62] border border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {t('Monographs & Datasets', 'গবেষণাপত্র ও ডেটাসেট')} ({currentInvestigation.publications.length})
              </span>
            </button>
          </div>

          {/* TAB 1: EXECUTIVE BRIEF */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#0B2A20] mb-5 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#195642]" />
                    {t('Primary Methodologies', 'প্রধান গবেষণা পদ্ধতি')}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {(currentInvestigation.primaryMethodologies.length > 0
                      ? currentInvestigation.primaryMethodologies
                      : (currentWorkArea?.methods ?? [])
                    ).map((method) => (
                      <span
                        key={method}
                        className="px-3.5 py-2 rounded-xl bg-[#F6F9F4] border border-[#E2EAE4] text-sm text-[#0D1F18] font-medium"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#0B2A20] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                    {t('Research Narrative & Institutional Rationale', 'গবেষণার প্রেক্ষিত ও প্রাতিষ্ঠানিক উদ্দেশ্য')}
                  </h2>
                  <div className="space-y-4 text-base sm:text-lg text-[#0D1F18] leading-relaxed font-normal">
                    {currentInvestigation.overview.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                    <p>
                      {t(
                        `This research follows the evidence beyond isolated events, tracing how institutional decisions, professional routines, and changing technologies shape the information people encounter every day. The work brings together field observations, documented records, and comparative analysis so that individual findings can be read as part of a larger public pattern.`,
                        `এই গবেষণা বিচ্ছিন্ন ঘটনার বাইরে গিয়ে প্রাতিষ্ঠানিক সিদ্ধান্ত, পেশাগত চর্চা এবং পরিবর্তনশীল প্রযুক্তি কীভাবে মানুষের প্রতিদিনের তথ্যজগতকে প্রভাবিত করে তা অনুসরণ করে। মাঠপর্যায়ের পর্যবেক্ষণ, নথিভুক্ত রেকর্ড এবং তুলনামূলক বিশ্লেষণের মাধ্যমে পৃথক ফলাফলকে বৃহত্তর সামাজিক প্রবণতার অংশ হিসেবে উপস্থাপন করা হয়।`
                      )}
                    </p>
                    <p>
                      {t(
                        `Rather than presenting a single conclusion, the research documents the conditions under which evidence is produced, circulated, and interpreted. This article-style account makes the reasoning transparent, connects observations to their wider civic consequences, and identifies the questions that should guide future reporting, policy, and public discussion.`,
                        `একটি মাত্র সিদ্ধান্ত উপস্থাপনের বদলে এই গবেষণা দেখায় কোন পরিস্থিতিতে প্রমাণ তৈরি, প্রচার এবং ব্যাখ্যা করা হয়। এই নিবন্ধধর্মী বিবরণ গবেষণার যুক্তিকে স্বচ্ছ রাখে, পর্যবেক্ষণকে নাগরিক জীবনের বৃহত্তর প্রভাবের সঙ্গে যুক্ত করে এবং ভবিষ্যৎ সংবাদ, নীতি ও জনআলোচনার জন্য প্রয়োজনীয় প্রশ্নগুলো চিহ্নিত করে।`
                      )}
                    </p>
                  </div>
                </div>

                {/* Core Research Questions */}
                <div className="hidden">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#0B2A20] mb-6 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#195642]" />
                    {t('Guiding Empirical Inquiries', 'মূল গবেষণামূলক প্রশ্নসমূহ')}
                  </h3>
                  <div className="space-y-4">
                    {currentInvestigation.keyQuestions.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-4 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4] flex items-start gap-3.5"
                      >
                        <span className="w-7 h-7 rounded-xl bg-[#0B2A20] text-[#D2F843] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          Q{qIdx + 1}
                        </span>
                        <p className="font-sans text-sm sm:text-base font-semibold text-[#0B2A20] leading-snug">
                          {q}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar with Image & Fellows */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-3xl overflow-hidden border border-[#E2EAE4] shadow-md bg-white">
                  <img
                    src={currentInvestigation.image}
                    alt={currentInvestigation.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#556B62] block mb-1">
                      {t('Visual Archive Reference', 'ভিজ্যুয়াল আর্কাইভ রেফারেন্স')}
                    </span>
                    <h4 className="font-sans text-base font-bold text-[#0B2A20]">
                      {t('Field Photography & Observational Records', 'মাঠপর্যায়ের আলোকচিত্র ও তথ্য নথি')}
                    </h4>
                    <p className="text-xs text-[#556B62] mt-2">
                      {t(
                        'All photographic and evidentiary materials are cataloged under institutional open research licenses.',
                        'সকল আলোকচিত্র ও প্রামাণ্য নথি উন্মুক্ত গবেষণা লাইসেন্সের অধীনে সংরক্ষিত।'
                      )}
                    </p>
                  </div>
                </div>

                <div className="hidden">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D2F843]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t('Academic Standards', 'একাডেমিক মানদণ্ড')}</span>
                  </div>
                  <h4 className="font-sans text-lg font-bold text-white">
                    {t('Replication & Transparency', 'পুনরাবৃত্তিযোগ্যতা ও স্বচ্ছতা')}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {t(
                      'All datasets are subjected to double-blind inter-coder reliability testing and made available via encrypted repositories for verified academic institutions.',
                      'সকল ডেটাসেট ডাবল-ব্লাইন্ড নির্ভরযোগ্যতা পরীক্ষার মধ্য দিয়ে যাচাই করা হয় এবং অনুমোদিত গবেষকদের জন্য উন্মুক্ত রাখা হয়।'
                    )}
                  </p>
                  <button
                    onClick={() => onNavigate('team')}
                    className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors cursor-pointer border border-white/20 flex items-center justify-center gap-2"
                  >
                    <span>{t('View Research Directorate', 'গবেষক পরিষদ দেখুন')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D2F843]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: METHODOLOGY */}
          {activeTab === 'methodology' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] shadow-sm mb-8">
                <div className="max-w-3xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#195642] font-bold block mb-2">
                    {t('Systematic Framework', 'পদ্ধতিগত কাঠামো')}
                  </span>
                  <h2 className="font-sans text-3xl font-extrabold text-[#0B2A20] tracking-tight mb-4">
                    {t('Data Collection & Validation Protocols', 'উপাত্ত সংগ্রহ ও যাচাইকরণ প্রটোকল')}
                  </h2>
                  <p className="text-sm sm:text-base text-[#556B62] leading-relaxed">
                    {t(
                      'Our methodological frameworks combine computational data harvesting, psychometric citizen panels, and ethnographic newsroom field audits to prevent systemic bias.',
                      'আমাদের গবেষণাপদ্ধতি কম্পিউটারাইজড ডেটা আহরণ, নাগরিক প্যানেল এবং নিউজরুম অডিটের সমন্বয়ে পরিচালিত।'
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentInvestigation.methodologyDetails.map((method, mIdx) => (
                  <div
                    key={mIdx}
                    className="bg-white p-7 rounded-3xl border border-[#E2EAE4] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 rounded-xl bg-[#0B2A20] text-[#D2F843] font-mono text-xs font-bold flex items-center justify-center">
                          0{mIdx + 1}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F6F9F4] text-[#0B2A20] font-bold border border-[#E2EAE4]">
                          {method.frequency}
                        </span>
                      </div>

                      <h3 className="font-sans text-xl font-bold text-[#0B2A20] mb-2">
                        {method.title}
                      </h3>

                      <div className="mb-4 text-xs font-mono text-[#195642] font-semibold">
                        {t('Protocol', 'প্রটোকল')}: {method.protocol}
                      </div>

                      <p className="text-xs sm:text-sm text-[#556B62] leading-relaxed">
                        {method.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E2EAE4] flex items-center gap-2 text-xs font-mono text-[#0B2A20]">
                      <CheckCircle2 className="w-4 h-4 text-[#195642]" />
                      <span>{t('Audited for Replicability', 'যাচাইকৃত ও বিজ্ঞানসম্মত')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CASE STUDIES */}
          {activeTab === 'cases' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentInvestigation.caseStudies.map((cs, cIdx) => (
                  <div
                    key={cIdx}
                    className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-[#195642]" />
                          {t('Case Study', 'কেস স্টাডি')} 0{cIdx + 1}
                        </span>
                        <span className="font-mono text-xs text-[#556B62] font-bold">
                          {cs.year}
                        </span>
                      </div>

                      <h3 className="font-sans text-2xl font-extrabold text-[#0B2A20] tracking-tight mb-4">
                        {cs.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#556B62] leading-relaxed mb-6">
                        {cs.summary}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A20] block mb-1">
                        {t('Empirical Impact & Citations:', 'গবেষণার প্রভাব ও তথ্যসূত্র:')}
                      </span>
                      <p className="text-xs text-[#195642] font-semibold leading-relaxed">
                        {cs.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: PUBLICATIONS & DATASETS */}
          {activeTab === 'publications' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden"
            >
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] shadow-sm mb-6">
                <h2 className="font-sans text-2xl font-extrabold text-[#0B2A20] mb-2">
                  {t('Open Research Archive & Datasets', 'উন্মুক্ত গবেষণা আর্কাইভ ও ডেটাসেট')}
                </h2>
                <p className="text-sm text-[#556B62]">
                  {t(
                    'IPA releases monographs, peer-reviewed methodology guidelines, and raw microdata under Creative Commons Attribution 4.0 International Licenses.',
                    'আইপিএ তার মনোগ্রাফ, নির্দেশিকা এবং মূল ডেটাসেট ক্রিয়েটিভ কমন্স অ্যাট্রিবিউশন লাইসেন্সের অধীনে উন্মুক্ত করে।'
                  )}
                </p>
              </div>

              {currentInvestigation.publications.map((pub, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2EAE4] shadow-sm hover:border-[#0B2A20] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#0B2A20] text-[#D2F843] text-[10px] font-mono font-bold uppercase tracking-wider">
                        {pub.type}
                      </span>
                      <span className="text-xs font-mono text-[#556B62]">
                        {pub.date} · {pub.pagesOrSize}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl font-bold text-[#0B2A20]">
                      {pub.title}
                    </h3>
                  </div>

                  <div className="hidden">
                    <button
                      onClick={() => setIsDatasetModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('Access File', 'ফাইল দেখুন')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Social Media Sharing Banner */}
          <div className="my-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAE4] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-mono font-bold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5 text-[#0B2A20]" />
                <span>{t('Disseminate Research Findings', 'গবেষণার ফলাফল ছড়িয়ে দিন')}</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0B2A20] tracking-tight">
                {t('Share this Research on Social Media', 'সোশ্যাল মিডিয়ায় এই গবেষণাটি শেয়ার করুন')}
              </h3>
              <p className="text-xs sm:text-sm text-[#556B62] leading-relaxed">
                {t(
                  'Help circulate empirical insights on media resilience, newsroom autonomy, and information ecosystems across your networks on X, LinkedIn, and Facebook.',
                  'গণমাধ্যমের স্বাধীনতা, স্থায়িত্ব ও তথ্যের সত্যতা সম্পর্কিত এই গবেষণাটি আপনার পরিচিত মহলে ছড়িয়ে দিয়ে সচেতনতা সৃষ্টি করুন।'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#000000] text-white hover:bg-neutral-800 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>{t('Share on X', 'X-এ শেয়ার')}</span>
              </a>

              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A66C2] text-white hover:bg-[#084e96] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1877F2] text-white hover:bg-[#125ec2] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F9F4] hover:bg-[#E2EAE4] border border-[#E2EAE4] text-[#0B2A20] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B2A20]" />
                    <span>{t('Link Copied!', 'লিংক কপি হয়েছে!')}</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" />
                    <span>{t('Copy Link', 'লিংক কপি')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Related Insights Carousel */}
          <RelatedInsightsCarousel currentId={currentInvestigation.id} />

          {/* Bottom Navigation Strip */}
          <div className="mt-16 pt-12 border-t border-[#E2EAE4] flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => {
                onNavigate('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] hover:text-[#195642] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back to All Areas of Investigation', 'সকল গবেষণা ক্ষেত্রে ফিরে যান')}</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#556B62]">{t('Next Research:', 'পরবর্তী গবেষণা:')}</span>
              {(() => {
                if (!allResearch || allResearch.length === 0) return null;
                const currentIndex = allResearch.findIndex((b) => b.id === currentInvestigation.id);
                const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % allResearch.length : 0;
                const nextResearch = allResearch[nextIndex];
                if (!nextResearch) return null;
                const nextName = isBn && nextResearch.nameBn ? nextResearch.nameBn : nextResearch.name;
                return (
                  <button
                    onClick={() => {
                      onSelectInvestigation(nextResearch.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <span>{nextName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Request Modal Popup with Rich Text Editor */}
      <RequestDatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        investigationName={currentInvestigation.name}
        beatNumber={currentInvestigation.beatNumber}
        tagline={currentInvestigation.tagline}
      />
      </div>
    </PageTransition>
  );
}
