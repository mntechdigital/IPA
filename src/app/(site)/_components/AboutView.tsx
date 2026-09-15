'use client';

import React from 'react';
import { AboutPageData, SiteSettings } from '../../../types';
import { PageTransition } from '../PageTransition';
import { CTASection } from '../../../components/CTASection';
import { useLanguage } from '../../../context/LanguageContext';
import { PageHero } from '../../../components/PageHero';
import { INITIAL_CMS_STATE } from '../../../data/initialData';

const STATIC_ABOUT = INITIAL_CMS_STATE.aboutPage as AboutPageData;

export default function AboutView({ aboutPage, siteSettings }: { aboutPage: AboutPageData | null | undefined; siteSettings: Partial<SiteSettings> | null | undefined }) {
  const { isBn } = useLanguage();

  const data: AboutPageData = {
    ...STATIC_ABOUT,
    ...(aboutPage || {}),
  };

  const heroBanner = data.heroBanner || STATIC_ABOUT.heroBanner!;
  const whoWeAre = data.whoWeAre || STATIC_ABOUT.whoWeAre!;
  const missionPillars = data.missionPillars?.length ? data.missionPillars : STATIC_ABOUT.missionPillars!;
  const fromQuestionsToInsight = data.fromQuestionsToInsight || STATIC_ABOUT.fromQuestionsToInsight!;

  return (
    <PageTransition>
      <div className="bg-canvas text-ink">
        <PageHero
          backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85"
          label={isBn ? (heroBanner.badgeTextBn || heroBanner.badgeText) : heroBanner.badgeText}
          title={isBn ? (heroBanner.titleBn || heroBanner.title) : heroBanner.title}
          description={isBn ? (heroBanner.subtextBn || heroBanner.subtext) : heroBanner.subtext}
          metadata="Institutional Profile"
        />

        <section className="py-24 sm:py-32 border-b border-border bg-paper">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10">
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#D2F843]" />
                  <span>{isBn ? (whoWeAre.badgeTextBn || whoWeAre.badgeText || 'Institutional Foundation') : (whoWeAre.badgeText || 'Institutional Foundation')}</span>
                </div>

                <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold leading-[1.08] tracking-tight">
                  {isBn ? (whoWeAre.headingBn || whoWeAre.heading || 'Who We Are') : (whoWeAre.heading || 'Who We Are')}
                </h2>

                <div className="space-y-5 text-base sm:text-lg text-ink font-sans font-normal leading-relaxed">
                  <p>
                    <strong>{siteSettings?.siteName || 'IPA'}</strong>{' '}
                    {whoWeAre.descriptionBn || whoWeAre.description}
                  </p>
                  {whoWeAre.narrativeBn && whoWeAre.narrativeBn.length > 0 && whoWeAre.narrativeBn[0] && (
                    <p className="text-[#556B62]">{whoWeAre.narrativeBn[0]}</p>
                  )}
                  {whoWeAre.narrative && whoWeAre.narrative.length > 1 && (
                    <p className="text-[#556B62]">{whoWeAre.narrative[1]}</p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-[#E2EAE4] bg-[#0B2A20] p-4 shadow-2xl relative overflow-hidden">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 z-0">
                    <img
                      src={isBn ? (whoWeAre.mainPhotoBn || whoWeAre.mainPhoto) : whoWeAre.mainPhoto}
                      alt="Research discussion and archival examination"
                      className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A20] via-[#0B2A20]/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#D2F843] text-[#0B2A20] text-[10px] font-bold uppercase tracking-wider mb-2">
                        Founded Year — {whoWeAre.foundedYear || '2019'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4] bg-[#F6F9F4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-8 sm:p-12 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A20]" />
                      <span>{isBn ? 'আমাদের লক্ষ্য' : 'Our Mission'}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-[#556B62]">
                      {isBn ? '০১ / মূল লক্ষ্য' : '01 / PURPOSE'}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[#0B2A20] font-extrabold leading-snug mb-6">
                    {isBn ? (data.missionTitleBn || data.missionTitle) : data.missionTitle}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm font-sans text-[#556B62] leading-relaxed pt-6 border-t border-[#E2EAE4]">
                  {(isBn ? (data.missionStoryBn || data.missionStory) : data.missionStory).map((story, i) => (
                    <p key={i}>{story}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#144234] bg-[#0B2A20] text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D2F843]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D2F843] text-xs font-bold uppercase tracking-wider border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                      <span>{isBn ? 'আমাদের রূপকল্প' : 'Our Vision'}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/60">
                      {isBn ? '০২ / রূপকল্প' : '02 / OUTLOOK'}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold leading-snug mb-6">
                    {isBn ? (data.missionTitleBn || data.missionTitle) : data.missionTitle}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm font-sans text-white/80 leading-relaxed pt-6 border-t border-white/15 relative z-10">
                  {(isBn ? (data.missionStoryBn || data.missionStory) : data.missionStory).map((story, i) => (
                    <p key={i}>{story}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{isBn ? 'নৈতিক মূল্যবোধ' : 'ETHICAL FOUNDATIONS'}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? 'আমাদের কাজের মূলনীতি' : 'What Guides Our Work'}
              </h2>
              <p className="text-base sm:text-lg text-[#556B62] font-sans font-normal">
                {isBn
                  ? 'আমাদের মাঠপর্যায়ের সমীক্ষা, তথ্য পদ্ধতি ও উন্মুক্ত প্রতিবেদন প্রকাশকে নৈতিক মূল্যবোধ পরিচালিত করে।'
                  : 'Five institutional principles govern our fieldwork, data methodology, and public reporting.'}
              </p>
            </div>

            <div className="space-y-4">
              {data.principles.map((val, idx) => (
                <div
                  key={val.id}
                  className="p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] hover:border-[#0B2A20] hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start"
                >
                  <div className="md:col-span-2">
                    <span className="w-10 h-10 rounded-2xl bg-[#0B2A20] text-[#D2F843] flex items-center justify-center font-mono text-sm font-bold">
                      {isBn ? `০${idx + 1}` : val.number}
                    </span>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-sans text-2xl sm:text-3xl text-[#0B2A20] font-extrabold mb-2">
                      {isBn ? (val.titleBn || val.title) : val.title}
                    </h3>
                    <p className="font-sans text-base text-[#195642] font-medium">
                      {isBn ? (val.descriptionBn || val.description) : val.description}
                    </p>
                  </div>

                  <div className="md:col-span-6 font-sans text-xs sm:text-sm text-[#556B62] leading-relaxed pt-1 font-normal">
                    {isBn ? (val.detailBn || val.detail) : val.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4] bg-[#F6F9F4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-bold tracking-widest uppercase text-[#0B2A20] mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 border border-[#0B2A20]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                {isBn ? 'গবেষণা পদ্ধতি ও প্রক্রিয়া' : 'METHODOLOGICAL PIPELINE'}
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? (fromQuestionsToInsight.headingBn || fromQuestionsToInsight.heading) : fromQuestionsToInsight.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#556B62] font-sans font-normal">
                {isBn ? (fromQuestionsToInsight.subheadingBn || fromQuestionsToInsight.subheading) : fromQuestionsToInsight.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {data.methodologySteps.map((item, idx) => (
                <div
                  key={item.step}
                  className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0B2A20] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#0B2A20] font-bold mb-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#0B2A20]/5">
                        {isBn ? `পর্যায় ০${idx + 1}` : `STAGE 0${idx + 1}`}
                      </span>
                      {idx < 4 && <span className="hidden md:inline font-mono text-[#556B62]">→</span>}
                    </div>

                    <h3 className="font-sans text-xl text-[#0B2A20] mb-2 font-extrabold">
                      {item.step}
                    </h3>

                    <div className="text-xs font-mono uppercase text-[#556B62] font-semibold mb-3">
                      {isBn ? (item.labelBn || item.label) : item.label}
                    </div>

                    <p className="text-xs font-sans text-[#556B62] leading-relaxed">
                      {isBn ? (item.summaryBn || item.summary) : item.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E2EAE4] text-[10px] font-mono text-[#0B2A20] font-bold">
                    {isBn ? 'যাচাইকৃত পর্যায়' : 'VERIFIED PHASE'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{isBn ? 'পরিচালনা ও নৈতিকতা' : 'GOVERNANCE & ETHICS'}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? 'প্রতিষ্ঠানের নৈতিক গ্যারান্টি' : 'Institutional Governance Guarantees'}
              </h2>
            </div>

            <div className="space-y-4">
              {(isBn ? (data.governanceEthicsBn || data.governanceEthics) : data.governanceEthics).map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl border border-[#E2EAE4] bg-[#FFFFFF]">
                  <span className="w-8 h-8 rounded-full bg-[#0B2A20] text-[#D2F843] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    {isBn ? `০${idx + 1}` : `0${idx + 1}`}
                  </span>
                  <p className="text-sm sm:text-base text-[#556B62] font-sans leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4] bg-[#F6F9F4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{isBn ? 'গবেষণা কেন্দ্রসমূহ' : 'RESEARCH OBSERVATORIES'}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? 'আমাদের গবেষণা কেন্দ্রসমূহ' : 'Our Observatories'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.observatories.map((obs, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] hover:border-[#0B2A20] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_#D2F843]" />
                    <h3 className="font-sans text-xl text-[#0B2A20] font-extrabold">
                      {isBn ? (obs.nameBn || obs.name) : obs.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[#195642] font-medium mb-2">
                    {isBn ? (obs.roleBn || obs.role) : obs.role}
                  </p>
                  <p className="text-sm text-[#556B62] font-sans">{isBn ? (obs.addressBn || obs.address) : obs.address}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{isBn ? 'আমাদের মূল স্তম্ভ' : 'MISSION PILLARS'}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? 'প্রতিষ্ঠানের মূল স্তম্ভসমূহ' : 'The Pillars That Ground Our Work'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {missionPillars.map((pillar) => (
                <div key={pillar.id} className="p-8 sm:p-10 rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] hover:border-[#0B2A20] hover:shadow-md transition-all">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A20]" />
                    <span>{isBn ? (pillar.badgeBn || pillar.badge) : pillar.badge}</span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl text-[#0B2A20] font-extrabold mb-3">
                    {isBn ? (pillar.titleBn || pillar.title) : pillar.title}
                  </h3>
                  <p className="text-sm text-[#195642] font-medium italic mb-4">
                    {isBn ? (pillar.quoteBn || pillar.quote) : pillar.quote}
                  </p>
                  <p className="text-sm text-[#556B62] font-sans leading-relaxed">
                    {isBn ? (pillar.descriptionBn || pillar.description) : pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4] bg-[#F6F9F4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                <span>{isBn ? 'গবেষণা পদ্ধতি' : 'RESEARCH APPROACH'}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {isBn ? (fromQuestionsToInsight.headingBn || fromQuestionsToInsight.heading) : fromQuestionsToInsight.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#556B62] font-sans font-normal">
                {isBn ? (fromQuestionsToInsight.subheadingBn || fromQuestionsToInsight.subheading) : fromQuestionsToInsight.subheading}
              </p>
            </div>
            <div className="text-center">
              <a
                href={fromQuestionsToInsight.destinationUrl}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0B2A20] text-[#D2F843] text-sm font-bold uppercase tracking-wider hover:bg-[#0B2A20]/90 transition-colors"
              >
                {isBn ? (fromQuestionsToInsight.ctaTextBn || fromQuestionsToInsight.ctaText) : fromQuestionsToInsight.ctaText}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </PageTransition>
  );
}
