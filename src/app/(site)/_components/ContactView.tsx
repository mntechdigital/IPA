'use client';

import React from 'react';
import { PageTransition } from '../PageTransition';
import { FAQSection } from '../../../components/FAQSection';
import { Mail, Phone, MapPin, Clock, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ORGANIZATION } from '../../../data/navigation';
import { PageHero } from '../../../components/PageHero';
import { ContactForm } from '../../../components/ContactForm';
import { useLanguage } from '../../../context/LanguageContext';
import type { ContactPageData, SiteSettings } from '../../../types';

export default function ContactPage({
  contactPage,
  siteSettings,
}: {
  contactPage: ContactPageData | null;
  siteSettings: Partial<SiteSettings> | null;
}) {
  const { isBn } = useLanguage();

  const cp = contactPage ?? null;
  const fallback = ORGANIZATION.contact;

  const heroHeading = isBn ? (cp?.hero?.headingBn || cp?.hero?.heading || 'আমাদের সাথে যোগাযোগ করুন') : (cp?.hero?.heading || 'Let’s Start a Conversation.');
  const heroSubtitle = isBn ? (cp?.hero?.subtitleBn || cp?.hero?.subtitle || 'গবেষক, সাংবাদিক ও অংশীদারদের জন্য আমাদের যোগাযোগের দরজা সর্বদা উন্মুক্ত।') : (cp?.hero?.subtitle || 'Direct communication channels for academic researchers, investigative journalists, policy institutions, and public dataset requests.');
  const heroBadge = isBn ? (cp?.hero?.badgeBn || cp?.hero?.badge || 'যোগাযোগ ও অনুসন্ধান') : (cp?.hero?.badge || 'CONTACT');
  const heroBgImage = cp?.hero?.bgImage || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85';

  const phone = cp?.directDetails?.phone ?? fallback.phone;
  const phoneLabel = isBn
    ? cp?.directDetails?.phoneLabelBn || cp?.directDetails?.phoneLabel
    : cp?.directDetails?.phoneLabel;
  const tollFreePhone = cp?.directDetails?.tollFreePhone ?? fallback.secondaryPhone;
  const tollFreePhoneLabel = isBn
    ? cp?.directDetails?.tollFreePhoneLabelBn || cp?.directDetails?.tollFreePhoneLabel
    : cp?.directDetails?.tollFreePhoneLabel;
  const supportEmail = cp?.directDetails?.supportEmail ?? fallback.generalEmail;
  const researchDeskEmail = cp?.directDetails?.researchDeskEmail ?? fallback.researchEmail;
  const pressEmail = cp?.directDetails?.pressEmail ?? fallback.mediaEmail;
  const officeLocation = isBn
    ? (cp?.directDetails?.officeLocationBn || cp?.directDetails?.officeLocation || fallback.addressBn)
    : (cp?.directDetails?.officeLocation || fallback.address);
  const workingHours = isBn
    ? (cp?.directDetails?.workingHoursBn || cp?.directDetails?.workingHours || 'রবি - বৃহঃ, সকাল ৯:০০ - বিকাল ৫:০০ (বিএসটি)')
    : (cp?.directDetails?.workingHours || fallback.hours);

  const faqs = cp?.faqs && cp.faqs.length > 0 ? cp.faqs : undefined;

  return (
    <PageTransition>
      <div className="bg-[#F6F9F4] text-[#0D1F18]">
      {/* HERO */}
      <PageHero
        backgroundImage={heroBgImage}
        label={heroBadge}
        title={heroHeading}
        description={heroSubtitle}
        metadata={isBn ? (cp?.hero?.metadataBn || cp?.hero?.metadata || 'সরাসরি যোগাযোগ ও সচিবালয়') : (cp?.hero?.metadata || 'Direct Communications & Field Office')}
      />

      {/* CONTACT INFORMATION & CONTACT FORM */}
      <section id="contact-form-section" className="py-16 sm:py-24 border-b border-[#E2EAE4] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Contact Information & Map Column (Left Side) */}
            <div className="lg:col-span-5 space-y-6">
              {/* UNIFIED CONTACT CARD: 2 PHONES, 1 EMAIL, 1 ADDRESS */}
              <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-6 sm:p-7 shadow-sm hover:border-[#0B2A20]/40 transition-all space-y-5">
                {/* Header badge */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E2EAE4]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_6px_#D2F843]" />
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#0B2A20]">
                      {isBn ? 'সরাসরি যোগাযোগের তথ্য' : 'DIRECT CONTACT INFO'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] font-bold uppercase border border-[#0B2A20]/10">
                    {isBn ? 'ঢাকা প্রধান কার্যালয়' : 'DHAKA HQ'}
                  </span>
                </div>

                {/* 2 Phone Numbers */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0B2A20] text-[#D2F843] flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#556B62]">
                      {isBn ? 'টেলিফোন (২টি লাইন)' : 'TELEPHONE (2 LINES)'}
                    </span>
                  </div>

                  <div className="pl-1 space-y-2">
                    {/* Line 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-sans font-extrabold text-base sm:text-lg text-[#0B2A20] hover:text-[#195642] transition-colors tracking-tight"
                      >
                        {phone}
                      </a>
                      <span className="text-xs font-mono text-[#556B62]">
                        {isBn ? 'প্রধান সচিবালয়' : (phoneLabel || 'Main Secretariat')}
                      </span>
                    </div>

                    {/* Line 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <a
                        href={`tel:${tollFreePhone.replace(/\s+/g, '')}`}
                        className="font-sans font-extrabold text-base sm:text-lg text-[#0B2A20] hover:text-[#195642] transition-colors tracking-tight"
                      >
                        {tollFreePhone}
                      </a>
                      <span className="text-xs font-mono text-[#556B62]">
                        {isBn ? 'গবেষণা ও গণমাধ্যম শাখা' : (tollFreePhoneLabel || 'Research Desk & Media')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#556B62] pt-1">
                      <Clock className="w-3.5 h-3.5 text-[#195642] shrink-0" />
                      <span>{workingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E2EAE4]" />

                {/* 1 Email Address */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0B2A20] text-[#D2F843] flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#556B62]">
                      {isBn ? 'অফিসিয়াল ইমেইল' : 'OFFICIAL EMAIL'}
                    </span>
                  </div>

                  <div className="pl-1 space-y-0.5">
                    <a
                      href={`mailto:${supportEmail}`}
                      className="font-sans font-extrabold text-base sm:text-lg text-[#0B2A20] hover:text-[#195642] transition-colors break-all block tracking-tight"
                    >
                      {supportEmail}
                    </a>
                    <p className="text-xs font-sans text-[#556B62]">
                      {isBn
                        ? 'গবেষণা অনুসন্ধান, প্রেস মন্তব্য ও সাধারণ যোগাযোগ।'
                        : 'Inquiries, press commentary requests, and research correspondence.'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E2EAE4]" />

                {/* 1 Address */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0B2A20] text-[#D2F843] flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#556B62]">
                      {isBn ? 'সচিবালয়ের ঠিকানা' : 'SECRETARIAT ADDRESS'}
                    </span>
                  </div>

                  <div className="pl-1 space-y-1.5">
                    <p className="font-sans text-sm text-[#0D1F18] font-medium leading-relaxed">
                      {officeLocation}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <a
                        href="https://maps.google.com/?q=42+Gulshan+Avenue,+Dhaka+1212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B2A20] hover:text-[#195642] uppercase tracking-wider transition-colors group"
                      >
                        <span>{isBn ? 'গুগল ম্যাপে দেখুন' : 'Open in Google Maps'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <span className="text-[11px] font-mono text-[#556B62]">
                        {isBn ? 'ঢাকা ১২১২' : 'Dhaka 1212'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* UNDER THE CARD: INTERACTIVE MAP */}
              <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] overflow-hidden shadow-sm hover:border-[#0B2A20]/40 transition-all">
                <div className="px-5 py-3.5 border-b border-[#E2EAE4] bg-[#F6F9F4] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_6px_#D2F843]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                      {isBn ? 'সচিবালয়ের অবস্থান মানচিত্র' : 'Secretariat Location Map'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#556B62] uppercase">
                    {isBn ? 'ইন্টারেক্টিভ ভিউ' : 'Interactive View'}
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-72 bg-[#E7EEE9]">
                  <iframe
                    title="IPA Secretariat Location Map"
                    src="https://maps.google.com/maps?q=42+Gulshan+Avenue,+Dhaka+1212&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="px-5 py-3.5 bg-white flex items-center justify-between text-xs text-[#556B62]">
                  <span className="font-sans flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#195642] shrink-0" />
                    <span>{isBn ? '৪২ গুলশান অ্যাভিনিউ, ঢাকা' : '42 Gulshan Avenue, Dhaka'}</span>
                  </span>
                  <a
                    href="https://maps.google.com/?q=42+Gulshan+Avenue,+Dhaka+1212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-[#0B2A20] hover:text-[#195642] transition-colors inline-flex items-center gap-1"
                  >
                    <span>{isBn ? 'দিকনির্দেশনা পান' : 'Get Directions'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Column (Right Side) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (ACCORDION INTERFACE) */}
      <FAQSection faqs={faqs} />
      </div>
    </PageTransition>
  );
}
