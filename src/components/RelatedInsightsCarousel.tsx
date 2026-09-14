'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INVESTIGATIONS_DETAIL } from '../data/investigationsDetail';
import { INVESTIGATIONS_DETAIL_BN } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { InvestigationDetailData } from '../types';

interface RelatedInsightsCarouselProps {
  currentId: string;
}

interface SuggestedTopicMeta {
  topicId: string;
  relationshipBadge: string;
  relevanceRationale: string;
  sharedFocus: string;
}

// Curated pairwise relevance mapping for each of the 6 research beats
const RELATED_TOPICS_MAP: Record<string, SuggestedTopicMeta[]> = {
  'media-journalism': [
    {
      topicId: 'media-monitoring',
      relationshipBadge: 'Auditing Partner Research',
      relevanceRationale:
        'Cross-references newsroom field ethnographies against 24/7 broadcast coverage records and front-page archival indices.',
      sharedFocus: 'Newsroom verification standards & framing objectivity',
    },
    {
      topicId: 'media-democracy',
      relationshipBadge: 'Legal & Policy Sister Research',
      relevanceRationale:
        'Investigates the statutory speech restrictions, advertising withholding, and judicial pressures conditioning newsroom independence.',
      sharedFocus: 'Editorial autonomy, legal safeguards & press freedom',
    },
  ],
  'digital-media': [
    {
      topicId: 'technology-ai',
      relationshipBadge: 'Computational Sister Research',
      relevanceRationale:
        'Examines how foundation models, automated synthetic content, and algorithmic curation accelerate viral information velocity.',
      sharedFocus: 'Algorithmic curation, provenance & synthetic media',
    },
    {
      topicId: 'media-journalism',
      relationshipBadge: 'Content Production Hub',
      relevanceRationale:
        'Maps how platform monetization collapse forces traditional newsrooms to pivot toward short-form video and algorithmic formats.',
      sharedFocus: 'Platform dependency & editorial revenue viability',
    },
  ],
  'media-monitoring': [
    {
      topicId: 'media-journalism',
      relationshipBadge: 'Editorial Source Research',
      relevanceRationale:
        'Grounds our broadcast transcription observatory in qualitative newsroom observations and reporter interviews.',
      sharedFocus: 'Comparative framing across print, television & digital',
    },
    {
      topicId: 'public-opinion',
      relationshipBadge: 'Audience Reception Cohort',
      relevanceRationale:
        'Correlates prime-time television salience spikes directly with citizen misperception patterns and institutional trust swings.',
      sharedFocus: 'Media agenda-setting & citizen belief formation',
    },
  ],
  'public-opinion': [
    {
      topicId: 'media-democracy',
      relationshipBadge: 'Democratic Health Counterpart',
      relevanceRationale:
        'Measures whether declining citizen institutional trust aligns with civic disenfranchisement and regulatory crackdowns.',
      sharedFocus: 'Civic literacy, election verification & institutional trust',
    },
    {
      topicId: 'media-monitoring',
      relationshipBadge: 'Observatory Validation Track',
      relevanceRationale:
        'Compares empirical broadcast airtime allotments against citizen perception of crisis severity and national priorities.',
      sharedFocus: 'Information gaps, rural reach & rumor vulnerability',
    },
  ],
  'media-democracy': [
    {
      topicId: 'public-opinion',
      relationshipBadge: 'Citizen Sentiment Track',
      relevanceRationale:
        'Evaluates public defense of press freedom and citizen willingness to support public service media trusts.',
      sharedFocus: 'Public interest journalism & constitutional speech rights',
    },
    {
      topicId: 'media-journalism',
      relationshipBadge: 'Press Independence Hub',
      relevanceRationale:
        'Provides empirical case studies of newsroom self-censorship for constitutional court interventions and media reform bills.',
      sharedFocus: 'Journalist safety, ownership transparency & editorial bylaws',
    },
  ],
  'technology-ai': [
    {
      topicId: 'digital-media',
      relationshipBadge: 'Platform Distribution Track',
      relevanceRationale:
        'Tests whether synthetic generation watermarks (C2PA) survive viral redistribution across closed and open digital feeds.',
      sharedFocus: 'Algorithmic amplification & generative provenance',
    },
    {
      topicId: 'media-monitoring',
      relationshipBadge: 'Signal Ingestion Partner',
      relevanceRationale:
        'Deploys multimodal deepfake and audio cloning detectors directly onto the 24/7 broadcast satellite recording stream.',
      sharedFocus: 'Real-time forensic verification & adversarial detection',
    },
  ],
};

export const RelatedInsightsCarousel: React.FC<RelatedInsightsCarouselProps> = ({
  currentId,
}) => {
  const router = useRouter();
  const { isBn, t } = useLanguage();

  const suggestionsMeta =
    RELATED_TOPICS_MAP[currentId] || RELATED_TOPICS_MAP['media-journalism'];

  // Resolve investigation objects
  const suggestedTopics: (SuggestedTopicMeta & { details: InvestigationDetailData })[] =
    suggestionsMeta
      .map((meta) => {
        const details = INVESTIGATIONS_DETAIL[meta.topicId];
        if (!details) return null;
        const bnData = INVESTIGATIONS_DETAIL_BN[meta.topicId];
        const localizedDetails: InvestigationDetailData = {
          ...details,
          name: isBn && bnData?.nameBn ? bnData.nameBn : details.name,
          tagline: isBn && bnData?.taglineBn ? bnData.taglineBn : details.tagline,
          status: isBn && bnData?.statusBn ? bnData.statusBn : details.status,
          outputsCount: isBn && bnData?.publicationsBn
            ? `${bnData.publicationsBn.length}টি গবেষণাপত্র ও ডেটাসেট`
            : details.outputsCount,
        };
        return { ...meta, details: localizedDetails };
      })
      .filter(Boolean) as (SuggestedTopicMeta & { details: InvestigationDetailData })[];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Reset to index 0 whenever currentId changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [currentId]);

  const handlePrev = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? suggestedTopics.length - 1 : prev - 1));
  }, [suggestedTopics.length]);

  const handleNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === suggestedTopics.length - 1 ? 0 : prev + 1));
  }, [suggestedTopics.length]);

  const handleSelectTopic = (id: string) => {
    router.push(`/investigation/${encodeURIComponent(id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (suggestedTopics.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#E2EAE4]" id="related-insights">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-mono font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-3">
            <Compass className="w-3.5 h-3.5 text-[#195642]" />
            <span>{t('CROSS-DISCIPLINARY DISCOVERY', 'আন্তঃবিষয়ক গবেষণা অন্বেষণ')}</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B2A20] tracking-tight">
            {t('Related Insights', 'সম্পর্কিত গবেষণাসমূহ')}
          </h2>
          <p className="text-sm font-sans text-[#556B62] mt-1 max-w-2xl">
            {t(
              'Two highly relevant research beats with intersecting methodology, shared data registries, and complementary empirical findings.',
              'পারস্পরিক সম্পর্কযুক্ত দুটি প্রধান গবেষণা ক্ষেত্র যা একই ধরনের ডেটাসেট ও পদ্ধতির সাথে সম্পৃক্ত।'
            )}
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3 self-start md:self-end">
          {/* Slide Indicator Badge */}
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#E2EAE4] text-xs font-mono font-bold text-[#0B2A20] shadow-2xs">
            <span className="text-[#195642]">{t('Insight', 'গবেষণা')} 0{currentIndex + 1}</span>
            <span className="text-[#556B62]/50 mx-1.5">/</span>
            <span className="text-[#556B62]">0{suggestedTopics.length}</span>
          </div>

          {/* Prev / Next Carousel Navigation */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#E2EAE4] shadow-2xs">
            <button
              onClick={handlePrev}
              aria-label="Previous related insight"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#0B2A20] hover:bg-[#0B2A20] hover:text-[#D2F843] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-[#E2EAE4]" />
            <button
              onClick={handleNext}
              aria-label="Next related insight"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#0B2A20] hover:bg-[#0B2A20] hover:text-[#D2F843] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View: Interactive 2-Card Carousel Grid with Highlight Synchronization */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch">
        {suggestedTopics.map((item, idx) => {
          const isFeatured = idx === currentIndex;
          const { details } = item;

          return (
            <div
              key={details.id}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                isFeatured
                  ? 'bg-white border-[#0B2A20] shadow-md ring-1 ring-[#0B2A20]/20'
                  : 'bg-white/80 border-[#E2EAE4] hover:border-[#0B2A20]/50 hover:bg-white'
              }`}
            >
              {/* Subtle Active Corner Accent */}
              {isFeatured && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                  <div className="absolute transform rotate-45 bg-[#0B2A20] text-[#D2F843] text-[9px] font-mono font-bold py-0.5 right-[-35px] top-[18px] w-[120px] text-center tracking-widest uppercase shadow-xs">
                    ACTIVE
                  </div>
                </div>
              )}

              <div>
                {/* Image & Badges */}
                <div className="relative rounded-2xl overflow-hidden aspect-16/9 mb-5 bg-[#0B2A20]/10 border border-[#E2EAE4]">
                  <img
                    src={details.image}
                    alt={details.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A20]/80 via-[#0B2A20]/20 to-transparent" />

                  {/* Research Pill & Relationship Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#0B2A20]/90 backdrop-blur-xs text-[#D2F843] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#D2F843]/30">
                      Research {details.beatNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#0B2A20] text-[10px] font-mono font-bold uppercase tracking-wider border border-white">
                      {item.relationshipBadge}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B2A20]/70 backdrop-blur-xs text-[10px] font-mono text-white/90 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                    <span>{details.status}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-sans text-xl font-bold text-[#0B2A20] group-hover:text-[#195642] transition-colors flex items-center justify-between gap-2 mb-2">
                  <span>{details.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#556B62] group-hover:text-[#0B2A20] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[#556B62] line-clamp-2 mb-4 leading-relaxed">
                  {details.tagline}
                </p>

                {/* Relevance Rationale Card */}
                <div className="p-3.5 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4] space-y-1.5 mb-5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                    <Sparkles className="w-3 h-3 text-[#195642]" />
                    <span>Why This Insight Matters:</span>
                  </div>
                  <p className="text-xs font-sans text-[#0D1F18] leading-relaxed">
                    {item.relevanceRationale}
                  </p>
                </div>
              </div>

              {/* Footer Meta & Button */}
              <div className="pt-4 border-t border-[#E2EAE4] flex items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#556B62] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#195642]" />
                  <span>{details.outputsCount}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTopic(details.id);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B2A20] text-[#D2F843] group-hover:bg-[#195642] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <span>{t('Explore Research', 'গবেষণাটি দেখুন')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet Carousel View: Single Card with Slide Animation */}
      <div className="lg:hidden relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {(() => {
            const currentItem = suggestedTopics[currentIndex];
            if (!currentItem) return null;
            const { details } = currentItem;

            return (
              <motion.div
                key={details.id}
                initial={{ opacity: 0, x: direction === 'right' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 'right' ? -30 : 30 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="rounded-3xl border border-[#0B2A20] bg-white p-6 shadow-md"
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-16/9 mb-5 bg-[#0B2A20]/10 border border-[#E2EAE4]">
                  <img
                    src={details.image}
                    alt={details.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A20]/80 via-transparent to-transparent" />

                  {/* Research Pill & Relationship Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#0B2A20]/90 backdrop-blur-xs text-[#D2F843] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#D2F843]/30">
                      Research {details.beatNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#0B2A20] text-[10px] font-mono font-bold uppercase tracking-wider border border-white">
                      {currentItem.relationshipBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B2A20]/70 backdrop-blur-xs text-[10px] font-mono text-white/90 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                    <span>{details.status}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-sans text-xl font-bold text-[#0B2A20] mb-2">
                  {details.name}
                </h3>
                <p className="text-xs font-sans text-[#556B62] mb-4 leading-relaxed">
                  {details.tagline}
                </p>

                {/* Relevance Rationale Card */}
                <div className="p-3.5 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4] space-y-1.5 mb-5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                    <Sparkles className="w-3 h-3 text-[#195642]" />
                    <span>Cross-Disciplinary Rationale:</span>
                  </div>
                  <p className="text-xs font-sans text-[#0D1F18] leading-relaxed">
                    {currentItem.relevanceRationale}
                  </p>
                </div>

                {/* Footer Meta & Button */}
                <div className="pt-4 border-t border-[#E2EAE4] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs font-mono text-[#556B62] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#195642]" />
                    <span>{details.outputsCount}</span>
                  </div>

                  <button
                    onClick={() => handleSelectTopic(details.id)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0B2A20] text-[#D2F843] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer hover:bg-[#195642]"
                  >
                    <span>{t('Explore Investigation', 'গবেষণা অন্বেষণ করুন')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {suggestedTopics.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 'right' : 'left');
                setCurrentIndex(idx);
              }}
              aria-label={`Jump to related insight ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-[#0B2A20]'
                  : 'w-2 bg-[#E2EAE4] hover:bg-[#0B2A20]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
