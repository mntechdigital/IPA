'use client';

import React from 'react';
import { motion } from 'motion/react';
import { AboutPageData, SiteSettings } from '../../../types';
import { PageTransition } from '../PageTransition';
import { CTASection } from '../../../components/CTASection';
import { useLanguage } from '../../../context/LanguageContext';
import { PageHero } from '../../../components/PageHero';
import { INITIAL_CMS_STATE } from '../../../data/initialData';

const STATIC_ABOUT = INITIAL_CMS_STATE.aboutPage as AboutPageData;

const HERO_BG_FALLBACK = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85';
const WHOWEARE_PHOTO_FALLBACK = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80';
const PRACTICE_IMG_FALLBACK = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85';

export default function AboutView({ aboutPage, siteSettings }: { aboutPage: AboutPageData | null | undefined; siteSettings: Partial<SiteSettings> | null | undefined }) {
  const { isBn, t } = useLanguage();

  const data: AboutPageData = {
    ...STATIC_ABOUT,
    ...(aboutPage || {}),
  };

  const heroBanner = data.heroBanner || STATIC_ABOUT.heroBanner!;
  const whoWeAre = data.whoWeAre || STATIC_ABOUT.whoWeAre!;
  const pillars = data.missionPillars || STATIC_ABOUT.missionPillars!;

  const mission = pillars[0];
  const vision = pillars[1];
  const goal = pillars[2];
  const practice = pillars[3];

  return (
    <PageTransition>
      <div className="bg-[#F6F9F4] text-[#0D1F18]">
        <PageHero
          backgroundImage={isBn ? (heroBanner.bgImageBn || heroBanner.bgImage || HERO_BG_FALLBACK) : (heroBanner.bgImage || HERO_BG_FALLBACK)}
          label={isBn ? (heroBanner.badgeTextBn || heroBanner.badgeText || t('ABOUT THE ORGANIZATION', 'আমাদের পরিচিতি')) : (heroBanner.badgeText || t('ABOUT THE ORGANIZATION', 'আমাদের পরিচিতি'))}
          title={isBn ? (heroBanner.titleBn || heroBanner.title || t('Independent Research for a Changing Media World.', 'পরিবর্তনশীল গণমাধ্যমের জন্য স্বাধীন গবেষণা')) : (heroBanner.title || t('Independent Research for a Changing Media World.', 'পরিবর্তনশীল গণমাধ্যমের জন্য স্বাধীন গবেষণা'))}
          description={isBn ? (heroBanner.subtextBn || heroBanner.subtext || t("We research the systems, technologies, institutions, and behaviors shaping today's media and information environment.", 'আমরা সমকালীন তথ্য ও গণমাধ্যম জগৎকে রূপদানকারী ব্যবস্থা, প্রযুক্তি, প্রতিষ্ঠান এবং আচরণ নিয়ে গবেষণা করি।')) : (heroBanner.subtext || t("We research the systems, technologies, institutions, and behaviors shaping today's media and information environment.", 'আমরা সমকালীন তথ্য ও গণমাধ্যম জগৎকে রূপদানকারী ব্যবস্থা, প্রযুক্তি, প্রতিষ্ঠান এবং আচরণ নিয়ে গবেষণা করি।'))}
          metadata={isBn ? (heroBanner.metadataBn || heroBanner.metadata || t('Institutional Profile', 'প্রাতিষ্ঠানিক পরিচিতি')) : (heroBanner.metadata || t('Institutional Profile', 'প্রাতিষ্ঠানিক পরিচিতি'))}
        />

        <section className="py-24 sm:py-32 border-b border-[#E2EAE4] bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10">
                  <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
                  <span>{isBn ? (whoWeAre.badgeTextBn || whoWeAre.badgeText || t('Institutional Foundation', 'প্রাতিষ্ঠানিক ভিত্তি')) : (whoWeAre.badgeText || t('Institutional Foundation', 'প্রাতিষ্ঠানিক ভিত্তি'))}</span>
                </div>

                <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold leading-[1.08] tracking-tight">
                  {isBn ? (whoWeAre.headingBn || whoWeAre.heading || t('Who We Are', 'আমরা কারা')) : (whoWeAre.heading || t('Who We Are', 'আমরা কারা'))}
                </h2>

                <div className="space-y-5 text-base sm:text-lg text-[#0D1F18] font-sans font-normal leading-relaxed">
                  <p>
                    <strong>{isBn ? (siteSettings?.siteName ? siteSettings.siteName : t('Institute of Public Affairs', 'ইনস্টিটিউট অব পাবলিক অ্যাফেয়ার্স')) : (siteSettings?.siteName || 'Institute of Public Affairs')}</strong>{' '}
                    {isBn ? (whoWeAre.descriptionBn || whoWeAre.description || t('is an independent media research organization dedicated to developing a deeper understanding of media, journalism, and information.', 'একটি স্বাধীন গণমাধ্যম গবেষণা সংস্থা, যা গণমাধ্যম, সাংবাদিকতা ও তথ্য ব্যবস্থা অনুধাবনে নিবেদিত।')) : (whoWeAre.description || t('is an independent media research organization dedicated to developing a deeper understanding of media, journalism, and information.', 'একটি স্বাধীন গণমাধ্যম গবেষণা সংস্থা, যা গণমাধ্যম, সাংবাদিকতা ও তথ্য ব্যবস্থা অনুধাবনে নিবেদিত।'))}
                  </p>
                  <p className="text-[#556B62]">
                    {isBn ? (whoWeAre.narrativeBn?.[0] || whoWeAre.narrative?.[0] || t('We examine how traditional and digital media operate, how audiences interact with information, and how technological and social changes are reshaping the media environment.', 'আমরা অনুসন্ধান করি কীভাবে ঐতিহ্যবাহী ও ডিজিটাল মিডিয়া পরিচালিত হয়, দর্শকরা তথ্যের সাথে কীভাবে যুক্ত হন এবং প্রযুক্তিগত ও সামাজিক রূপান্তর কীভাবে মিডিয়া পরিবেশকে প্রভাবিত করছে।')) : (whoWeAre.narrative?.[0] || t('We examine how traditional and digital media operate, how audiences interact with information, and how technological and social changes are reshaping the media environment.', 'আমরা অনুসন্ধান করি কীভাবে ঐতিহ্যবাহী ও ডিজিটাল মিডিয়া পরিচালিত হয়, দর্শকরা তথ্যের সাথে কীভাবে যুক্ত হন এবং প্রযুক্তিগত ও সামাজিক রূপান্তর কীভাবে মিডিয়া পরিবেশকে প্রভাবিত করছে।'))}
                  </p>
                  <p className="text-[#556B62]">
                    {isBn ? (whoWeAre.narrativeBn?.[1] || whoWeAre.narrative?.[1] || t('Through independent research and analysis, we aim to make complex developments easier to understand and contribute meaningful knowledge to public discussion.', 'নিরপেক্ষ গবেষণা ও তথ্যভিত্তিক বিশ্লেষণের মাধ্যমে আমরা জটিল বিষয়গুলোকে সহজবোধ্য করে তুলি এবং নাগরিক আলোচনায় বস্তুনিষ্ঠ অবদান রাখি।')) : (whoWeAre.narrative?.[1] || t('Through independent research and analysis, we aim to make complex developments easier to understand and contribute meaningful knowledge to public discussion.', 'নিরপেক্ষ গবেষণা ও তথ্যভিত্তিক বিশ্লেষণের মাধ্যমে আমরা জটিল বিষয়গুলোকে সহজবোধ্য করে তুলি এবং নাগরিক আলোচনায় বস্তুনিষ্ঠ অবদান রাখি।'))}
                  </p>
                </div>

                <div className="hidden">
                  <div className="p-4 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4]">
                    <span className="text-[10px] font-bold tracking-widest text-[#556B62] block mb-1 uppercase">
                      {t('FOUNDATION', 'ভিত্তি')}
                    </span>
                    <span className="font-sans font-bold text-sm text-[#0B2A20]">
                      {t('Non-Profit & Evidence-Based', 'অলাভজনক ও তথ্যপ্রমাণ-ভিত্তিক')}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4]">
                    <span className="text-[10px] font-bold tracking-widest text-[#556B62] block mb-1 uppercase">
                      {t('GOVERNANCE', 'পরিচালনা')}
                    </span>
                    <span className="font-sans font-bold text-sm text-[#0B2A20]">
                      {t('Independent Scientific Board', 'স্বাধীন বৈজ্ঞানিক পর্ষদ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-[#E2EAE4] bg-[#0B2A20] p-4 shadow-2xl relative overflow-hidden">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 z-0">
                    <img
                      src={isBn ? (whoWeAre.mainPhotoBn || whoWeAre.mainPhoto || WHOWEARE_PHOTO_FALLBACK) : (whoWeAre.mainPhoto || WHOWEARE_PHOTO_FALLBACK)}
                      alt="Research discussion and archival examination"
                      className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A20] via-[#0B2A20]/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="hidden">
                        {t('Observatory Fieldwork', 'গবেষণা ও ক্ষেত্রসমীক্ষা')}
                      </span>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#D2F843] text-[#0B2A20] text-[10px] font-bold uppercase tracking-wider mb-2">
                        Founded Year — {whoWeAre.foundedYear || '2019'}
                      </span>
                      <p className="hidden">
                        {t(
                          'Systematic documentation of broadcast and print newsroom practices across South Asia.',
                          'দক্ষিণ এশিয়াজুড়ে টেলিভিশন সম্প্রচার ও মুদ্রিত নিউজরুমের কার্যপ্রণালীর পদ্ধতিগত দলিলপত্র সংকলন।'
                        )}
                      </p>
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
                      <span>{isBn ? (mission.badgeBn || mission.badge) : mission.badge}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-[#556B62]">
                      {isBn ? (mission.indexLabelBn || mission.indexLabel) : mission.indexLabel}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[#0B2A20] font-extrabold leading-snug mb-6">
                    {isBn ? (mission.titleBn || mission.title) : mission.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#556B62] leading-relaxed pt-6 border-t border-[#E2EAE4]">
                  {isBn ? (mission.descriptionBn || mission.description) : mission.description}
                </p>
              </div>

              <div className="rounded-3xl border border-[#144234] bg-[#0B2A20] text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D2F843]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D2F843] text-xs font-bold uppercase tracking-wider border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                      <span>{isBn ? (vision.badgeBn || vision.badge) : vision.badge}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/60">
                      {isBn ? (vision.indexLabelBn || vision.indexLabel) : vision.indexLabel}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold leading-snug mb-6">
                    {isBn ? (vision.titleBn || vision.title) : vision.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-sans text-white/80 leading-relaxed pt-6 border-t border-white/15 relative z-10">
                  {isBn ? (vision.descriptionBn || vision.description) : vision.description}
                </p>
              </div>

              <div className="rounded-3xl border border-[#D2F843] bg-[#D2F843] text-[#0B2A20] p-8 sm:p-12 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A20]/10 text-[#0B2A20] text-xs font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A20]" />
                      <span>{isBn ? (goal.badgeBn || goal.badge) : goal.badge}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-[#0B2A20]/60">
                      {isBn ? (goal.indexLabelBn || goal.indexLabel) : goal.indexLabel}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug mb-6">
                    {isBn ? (goal.titleBn || goal.title) : goal.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#0B2A20]/75 leading-relaxed pt-6 border-t border-[#0B2A20]/15">
                  {isBn ? (goal.descriptionBn || goal.description) : goal.description}
                </p>
              </div>

              <div className="min-h-[360px] rounded-3xl border border-[#144234] relative overflow-hidden shadow-2xl flex flex-col justify-end text-white">
                <img
                  src={isBn ? (practice.imageBn || practice.image || PRACTICE_IMG_FALLBACK) : (practice.image || PRACTICE_IMG_FALLBACK)}
                  alt="Researchers working with data and digital information"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A13] via-[#0B2A20]/65 to-transparent" />
                <div className="relative z-10 p-8 sm:p-12">
                  <div className="flex items-center justify-between text-xs font-mono mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D2F843] text-xs font-bold uppercase tracking-wider border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                      <span>{isBn ? (practice.badgeBn || practice.badge) : practice.badge}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/70">
                      {isBn ? (practice.indexLabelBn || practice.indexLabel) : practice.indexLabel}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold leading-snug mb-3">
                    {isBn ? (practice.titleBn || practice.title) : practice.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {isBn ? (practice.descriptionBn || practice.description) : practice.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                <span>{t('ETHICAL FOUNDATIONS', 'নৈতিক মূল্যবোধ')}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {t('What Guides Our Work', 'আমাদের কাজের মূলনীতি')}
              </h2>
              <p className="text-base sm:text-lg text-[#556B62] font-sans font-normal">
                {t(
                  'Five institutional principles govern our fieldwork, computational auditing, data transparency, and public reporting.',
                  'পাঁচটি মৌলিক প্রাতিষ্ঠানিক নীতিমালা আমাদের মাঠপর্যায়ের সমীক্ষা, কম্পিউটেশনাল অডিট এবং উন্মুক্ত প্রতিবেদন প্রকাশকে পরিচালিত করে।'
                )}
              </p>
            </div>

            <div className="space-y-4">
              {(data.principles || []).map((val, idx) => (
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

        <section className="hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-bold tracking-widest uppercase text-[#0B2A20] mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 border border-[#0B2A20]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                {t('METHODOLOGICAL PIPELINE', 'গবেষণা পদ্ধতি ও প্রক্রিয়া')}
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
                {t('From Questions to Insight', 'প্রশ্ন থেকে অন্তর্দৃষ্টি')}
              </h2>
              <p className="text-base sm:text-lg text-[#556B62] font-sans font-normal">
                {t(
                  'How an inquiry transforms from an urgent societal question into verified public knowledge.',
                  'কীভাবে একটি জরুরি সামাজিক প্রশ্ন পর্যায়ক্রমে যাচাইকৃত তথ্যে ও জনকল্যাণমুখী জ্ঞানে রূপ নেয়।'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {data.methodologySteps.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0B2A20] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#0B2A20] font-bold mb-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#0B2A20]/5">
                        {isBn ? `পর্যায় ০${idx + 1}` : `STAGE 0${idx + 1}`}
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
                    {t('VERIFIED PHASE', 'যাচাইকৃত পর্যায়')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection {...(data.cta || {})} />
      </div>
    </PageTransition>
  );
}
