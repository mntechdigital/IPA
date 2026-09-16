'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Sparkles, Send, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import { PageId, SiteSettings } from '../types';
import { ORGANIZATION } from '../data/navigation';
import { useLanguage } from '../context/LanguageContext';
import { BackToTop } from './BackToTop';

const PAGE_ROUTES: Record<Exclude<PageId, 'investigation'>, string> = {
  home: '/',
  about: '/about',
  work: '/work',
  team: '/team',
  contact: '/contact',
};

const SOCIAL_COMPONENTS: Record<string, React.ElementType> = {
  LinkedIn: Linkedin,
  'X / Twitter': Twitter,
  Facebook: Facebook,
  YouTube: Youtube,
};

export const Footer: React.FC<{ settings?: Partial<SiteSettings> }> = ({ settings }) => {
  const router = useRouter();
  const { t, isBn } = useLanguage();

  const orgName = settings?.siteName || ORGANIZATION.name;
  const orgNameBn = (settings as any)?.siteNameBn || ORGANIZATION.nameBn;
  const tagline = isBn
    ? (settings?.footerBranding?.taglineBn || settings?.headerBranding?.taglineBn || 'গণমাধ্যম গবেষণা। সমাজ অনুধাবন।')
    : (settings?.footerBranding?.tagline || settings?.headerBranding?.tagline || 'Researching Media. Understanding Society.');
  const establishedYear = settings?.establishedYear || ORGANIZATION.established;
  const footerCols = settings?.footerNavigation && settings.footerNavigation.length ? settings.footerNavigation : null;
  const bottomLinks = (settings as any)?.footerBottomLinks as { label: string; labelBn?: string; url?: string }[] | undefined;
  const footerSocials = settings?.socialLinks
    ? Object.entries(settings.socialLinks)
        .filter((entry): entry is [string, string] => Boolean(entry[1]))
        .map(([name, url]) => ({ name, url }))
    : [];
  const socials = footerSocials.length
    ? footerSocials.map((s) => ({
        name: s.name === 'x' || s.name === 'X' ? 'X / Twitter' : s.name === 'fb' || s.name === 'facebook' ? 'Facebook' : s.name,
        url: s.url,
      }))
    : ORGANIZATION.socials;
  const contactEmail = settings?.contactEmail || ORGANIZATION.contact.generalEmail;
  const researchEmail = settings?.researchDeskEmail || ORGANIZATION.contact.researchEmail;
  const officeAddress = settings?.officeAddress || ORGANIZATION.contact.address;

  const handleNavClick = (page: PageId) => {
    if (page !== 'investigation') router.push(PAGE_ROUTES[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#061A13] text-[#F6F9F4] border-t border-[#144234]">
      {/* Modern 4-Column Summary Strip with Lime Highlights */}
      <div className="hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <div className="p-4 rounded-2xl bg-white border border-[#E2EAE4] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A20]">
                {t('01 — Analytics', '০১ — বিশ্লেষণ')}
              </span>
            </div>
            <p className="text-[14px] text-[#556B62] leading-relaxed">
              {t(
                'Tracking information flows across fragmented digital ecosystems.',
                'খণ্ডিত ডিজিটাল তথ্যপ্রবাহ নিবিড়ভাবে পর্যবেক্ষণ।'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2EAE4] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A20]">
                {t('02 — Sovereignty', '০২ — তথ্যের সার্বভৌমত্ব')}
              </span>
            </div>
            <p className="text-[14px] text-[#556B62] leading-relaxed">
              {t(
                'Investigating the intersection of data, power, and discourse.',
                'ডেটা, ক্ষমতা ও জনমত বিনিময়ের মিথস্ক্রিয়া নিয়ে অনুসন্ধান।'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2EAE4] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A20]">
                {t('03 — Integrity', '০৩ — সততা ও বস্তুনিষ্ঠতা')}
              </span>
            </div>
            <p className="text-[14px] text-[#556B62] leading-relaxed">
              {t(
                'Measuring the resilience of journalism in the age of automation.',
                'কৃত্রিম বুদ্ধিমত্তা ও স্বয়ংক্রিয়তার যুগে সাংবাদিকতার শক্তি পরিমাপ।'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B2A20] text-white border border-[#144234] shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D2F843]">
                {t('04 — Registry', '০৪ — গবেষণাপত্র')}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D2F843] animate-pulse" />
            </div>
            <span className="text-[12px] text-white/80 font-medium">
              © 2026 {isBn ? ORGANIZATION.nameBn : orgName}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#144234]">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D2F843] flex items-center justify-center text-[#0B2A20] shadow-md font-bold">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl text-white font-extrabold tracking-tight">
                  {isBn ? (settings?.footerBranding?.footerLogoTextBn || orgNameBn) : (settings?.footerBranding?.footerLogoText || orgName)}
                </h3>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#D2F843] block mt-0.5">
                  {t('Independent Research Observatory', 'স্বাধীন গবেষণা মানমন্দির')}
                </span>
              </div>
            </div>

            <p className="text-lg font-bold text-[#D2F843]">
              {isBn ? `“${tagline}”` : `“${tagline}”`}
            </p>

            <p className="text-sm text-white/70 font-sans leading-relaxed max-w-sm font-normal">
              {t(
                'We conduct evidence-driven analysis to understand how journalism, technology, and information environments shape the public sphere.',
                'সাংবাদিকতা, প্রযুক্তি ও তথ্যপ্রবাহ কীভাবে নাগরিক সমাজকে রূপ দেয় তা বুঝতে আমরা তথ্যভিত্তিক বিশ্লেষণ করি।'
              )}
            </p>

            <div className="hidden">
              {t(
                `Established ${establishedYear} · Dhaka & Global Partner Observatories`,
                `স্থাপিত ${establishedYear} · ঢাকা ও বৈশ্বিক সহযোগী গবেষণা কেন্দ্র`
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerCols ? (
              footerCols.map((col) => (
                <div key={col.title}>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                    {isBn && col.titleBn ? col.titleBn : col.title}
                  </h4>
                  <ul className="space-y-3.5 text-sm">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.url}
                          className="text-white/70 hover:text-[#D2F843] transition-colors cursor-pointer text-left"
                        >
                          {isBn && link.labelBn ? link.labelBn : link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <>
            {/* About Column */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                {t('About', 'পরিচিতি')}
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="text-white/70 hover:text-[#D2F843] transition-colors cursor-pointer text-left"
                  >
                    {t('About Us', 'আমাদের পরিচিতি')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('work')}
                    className="text-white/70 hover:text-[#D2F843] transition-colors cursor-pointer text-left"
                  >
                    {t('Researches', 'গবেষণাসমূহ')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('team')}
                    className="text-white/70 hover:text-[#D2F843] transition-colors cursor-pointer text-left"
                  >
                    {t('Our Team', 'আমাদের দল')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                {t('Connect', 'সংযোগ')}
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="text-white/70 hover:text-[#D2F843] transition-colors cursor-pointer text-left"
                  >
                    {t('Contact Office', 'যোগাযোগ দপ্তর')}
                  </button>
                </li>
                {socials.map((social) => {
                  const Icon = SOCIAL_COMPONENTS[social.name];
                  return (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        title={social.name}
                        className="group inline-flex items-center text-white/70 hover:text-[#D2F843] transition-colors"
                      >
                        {Icon ? <Icon className="w-4 h-4" /> : null}
                        <span className="ml-1">{social.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                {t('Contact', 'যোগাযোগ')}
              </h4>
              <div className="space-y-4 text-xs font-sans text-white/80">
                <div>
                  <span className="block text-[11px] font-mono uppercase text-white/50">
                    {t('General Enquiries', 'সাধারণ অনুসন্ধান')}
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-white hover:text-[#D2F843] underline underline-offset-2 transition-colors font-medium"
                  >
                    {contactEmail}
                  </a>
                </div>

                <div>
                  <span className="block text-[11px] font-mono uppercase text-white/50">
                    {t('Telephone', 'টেলিফোন')}
                  </span>
                  <span className="text-white/90">{ORGANIZATION.contact.phone}</span>
                </div>

                <div>
                  <span className="block text-[11px] font-mono uppercase text-white/50">
                    {t('Headquarters', 'সদর দপ্তর')}
                  </span>
                  <p className="text-white/70 text-xs leading-relaxed mt-1">
                    {isBn
                      ? ORGANIZATION.contact.addressBn
                      : officeAddress}
                  </p>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            © 2026 {isBn ? orgNameBn : orgName}. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
          </div>

          <div className="flex items-center gap-6 [&>span:last-child]:hidden">
            {(bottomLinks && bottomLinks.length ? bottomLinks : [
              { label: 'Privacy Policy', labelBn: 'গোপনীয়তা নীতি' },
              { label: 'Terms of Use', labelBn: 'ব্যবহারের শর্তাবলী' },
              { label: 'Research Ethics', labelBn: 'গবেষণা নীতিমালা' },
            ]).map((l) => (
              <span key={l.label} className="hover:text-[#D2F843] transition-colors cursor-pointer">
                {isBn && l.labelBn ? l.labelBn : l.label}
              </span>
            ))}
          </div>

          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
