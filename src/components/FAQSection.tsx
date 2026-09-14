import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, Database, ShieldCheck, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FAQS_BN } from '../data/translations';

export interface FAQItem {
  id: string;
  category: 'methodology' | 'resources' | 'ethics' | 'partnerships';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-datasets',
    category: 'resources',
    categoryLabel: 'Public Resources',
    question: 'How can academic researchers and institutions request access to IPA datasets?',
    answer:
      'We provide open access to anonymized survey microdata, platform audit logs, and longitudinal media tracking corpora to accredited researchers, universities, and civil society investigators under open academic data agreements. Dataset requests can be submitted via the contact form above or sent directly to research@mediaresearch.org with a brief outline of the research intent and institutional affiliation.',
    highlights: [
      'Accessible via Open Academic License',
      'Longitudinal newsroom tracking archives (2019–present)',
      'Algorithmic recommendation scrape logs with full provenance metadata',
    ],
  },
  {
    id: 'faq-methodology',
    category: 'methodology',
    categoryLabel: 'Methodology & Audits',
    question: 'What scientific standards and peer-review protocols govern IPA published studies?',
    answer:
      'Every investigation published by IPA follows rigorous pre-registered methodologies, statistical validation checks, and reproducible open-science protocols. Primary empirical briefs undergo double-blind peer review by external methodologists from affiliated universities before publication. All computational pipelines and audit models are benchmarked against standardized algorithmic ethics guidelines.',
    highlights: [
      'Pre-registered research designs & transparency registries',
      'Dual-analyst independent qualitative and quantitative verification',
      'Open-source computational codebooks hosted on public research repos',
    ],
  },
  {
    id: 'faq-licensing',
    category: 'resources',
    categoryLabel: 'Public Resources',
    question: 'Are IPA publications, policy frameworks, and monitors freely accessible to the public?',
    answer:
      'Yes. In accordance with our public interest mission, all research reports, quarterly monitors, whitepapers, and pedagogical toolkits are published free of paywalls under Creative Commons licensing (CC BY-NC 4.0). Academic institutions, civil society organizations, and civic journalists are encouraged to read, cite, and redistribute our findings with appropriate attribution.',
    highlights: [
      '100% open-access without subscription or paywall tiers',
      'Complete citation bibliographies & DOIs provided for scholarly indexation',
      'High-resolution charts and infographics available for classroom instruction',
    ],
  },
  {
    id: 'faq-ethics-sources',
    category: 'ethics',
    categoryLabel: 'Ethics & Confidentiality',
    question: 'How does the institute safeguard whistleblower sources and interview respondent privacy?',
    answer:
      'IPA conducts research under Institutional Review Board (IRB) ethical approval and strict cryptographic source-protection protocols. Respondent survey identifiers are cryptographically salted and anonymized before analytical ingestion. Qualitative interview notes and whistleblower submissions are maintained in air-gapped, encrypted volumes accessible exclusively to principal investigators.',
    highlights: [
      'Institutional Review Board (IRB) compliance for human-subject research',
      'Cryptographic identity stripping and differential privacy mechanisms',
      'Strict non-disclosure commitments for institutional source interviews',
    ],
  },
  {
    id: 'faq-newsroom-collabs',
    category: 'partnerships',
    categoryLabel: 'Partnerships',
    question: 'How can newsrooms and civic organizations partner with IPA on investigative audits?',
    answer:
      'We regularly partner with regional, national, and community newsrooms to perform computational data investigations, verify digital platform amplification anomalies, and map disinformation ecosystems. We provide newsrooms with computational tool training, specialized data journalism workshops, and collaborative forensic assistance on public interest investigations.',
    highlights: [
      'Tailored newsroom data audit clinics and investigative tooling',
      'Joint investigation syndication across public media channels',
      'Data verification assistance for contested computational claims',
    ],
  },
  {
    id: 'faq-press-commentary',
    category: 'partnerships',
    categoryLabel: 'Partnerships',
    question: 'Can journalists quote IPA fellows or request broadcast commentary on breaking developments?',
    answer:
      'Yes. Our resident researchers, directors, and methodology fellows regularly provide expert commentary, background briefings, and television analysis on media policy, algorithmic accountability, and civic information trends. Urgent broadcast or press inquiries submitted to media@mediaresearch.org or our hotline are typically addressed within two hours.',
    highlights: [
      'Rapid response desk for breaking media & platform policy developments',
      'Bilingual expert spokespersons for broadcast, radio, and print outlets',
      'Embargoed advance research briefings for credentialed science reporters',
    ],
  },
];

export const FAQSection: React.FC = () => {
  const { isBn, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-datasets');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const localizedFaqs = FAQ_DATA.map((faq) => {
    const bnItem = FAQS_BN[faq.id];
    if (isBn && bnItem) {
      return {
        ...faq,
        categoryLabel: bnItem.categoryLabelBn,
        question: bnItem.questionBn,
        answer: bnItem.answerBn,
        highlights: bnItem.highlightsBn,
      };
    }
    return faq;
  });

  const filteredFaqs = localizedFaqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.highlights && faq.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 sm:py-28 border-b border-[#E2EAE4] bg-[#F6F9F4]" id="faqs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_6px_#D2F843]" />
            <span>{t('KNOWLEDGE BASE & PROTOCOLS', 'উন্মুক্ত প্রশ্নোত্তর ও তথ্যভাণ্ডার')}</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl text-[#0B2A20] font-extrabold tracking-tight mb-4">
            {t('Frequently Asked Questions', 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)')}
          </h2>
          <p className="text-sm sm:text-base text-[#556B62] font-sans leading-relaxed">
            {t(
              'Essential guidelines regarding our research standards, open datasets, peer review protocols, and public inquiry workflows.',
              'আমাদের গবেষণার মানদণ্ড, উন্মুক্ত ডেটাসেট ব্যবহার, পিয়ার-রিভিউ প্রোটোকল ও তথ্য অনুসন্ধানের নির্দেশিকা।'
            )}
          </p>
        </div>

        {/* Controls: Category Filter + Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="hidden">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                  : 'bg-white text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              {t('All Topics', 'সকল বিষয়')} ({FAQ_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('resources')}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap ${
                activeCategory === 'resources'
                  ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                  : 'bg-white text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              {t('Public Resources', 'উন্মুক্ত রিসোর্স')}
            </button>
            <button
              onClick={() => setActiveCategory('methodology')}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap ${
                activeCategory === 'methodology'
                  ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                  : 'bg-white text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              {t('Methodology & Audits', 'পদ্ধতি ও অডিট')}
            </button>
            <button
              onClick={() => setActiveCategory('ethics')}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap ${
                activeCategory === 'ethics'
                  ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                  : 'bg-white text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              {t('Ethics & Sources', 'নৈতিকতা ও গোপনীয়তা')}
            </button>
            <button
              onClick={() => setActiveCategory('partnerships')}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap ${
                activeCategory === 'partnerships'
                  ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20] shadow-sm'
                  : 'bg-white text-[#556B62] border-[#E2EAE4] hover:border-[#0B2A20]'
              }`}
            >
              {t('Partnerships', 'প্রাতিষ্ঠানিক অংশীদারিত্ব')}
            </button>
          </div>

          {/* Search Input */}
          <div className="hidden">
            <Search className="w-4 h-4 text-[#556B62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search methodology or datasets...', 'পদ্ধতি বা ডেটাসেট অনুসন্ধান...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E2EAE4] text-xs font-sans text-[#0D1F18] placeholder:text-[#556B62]/60 focus:border-[#0B2A20] outline-none transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#556B62] hover:text-[#0B2A20] cursor-pointer"
              >
                {t('Clear', 'মুছুন')}
              </button>
            )}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E2EAE4] p-10 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-[#556B62] mx-auto opacity-50" />
              <h4 className="font-sans font-bold text-lg text-[#0B2A20]">
                {t('No matching inquiries found', 'কোনো প্রাসঙ্গিক প্রশ্ন পাওয়া যায়নি')}
              </h4>
              <p className="text-xs font-sans text-[#556B62] max-w-md mx-auto">
                {t(
                  `We couldn't find questions matching "${searchQuery}". Try a different keyword or contact our research desk directly.`,
                  `"${searchQuery}" এর সাথে সম্পর্কিত কোনো তথ্য পাওয়া যায়নি। অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা আমাদের সাথে সরাসরি যোগাযোগ করুন।`
                )}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-[#0B2A20] text-[#D2F843] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#195642] transition-colors cursor-pointer"
              >
                {t('Reset Filters', 'ফিল্টার রিসেট')}
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#0B2A20] shadow-md'
                      : 'bg-white/90 border-[#E2EAE4] hover:border-[#0B2A20]/40 hover:bg-white'
                  }`}
                >
                  {/* Question Button Trigger */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      <span className="w-7 h-7 rounded-xl bg-[#0B2A20]/5 text-[#0B2A20] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 group-hover:bg-[#0B2A20] group-hover:text-[#D2F843] transition-colors">
                        0{index + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="hidden">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-[#556B62] font-semibold">
                            {faq.categoryLabel}
                          </span>
                        </div>
                        <h3 className="font-sans font-bold text-base sm:text-lg text-[#0B2A20] group-hover:text-[#195642] transition-colors leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'bg-[#0B2A20] text-[#D2F843] border-[#0B2A20]'
                          : 'bg-[#F6F9F4] text-[#556B62] border-[#E2EAE4] group-hover:border-[#0B2A20]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#D2F843]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content Collapse */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-[#E2EAE4]/60 ml-0 sm:ml-11">
                          <p className="font-sans text-sm sm:text-base text-[#556B62] leading-relaxed mb-5">
                            {faq.answer}
                          </p>

                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="p-4 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4] space-y-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B2A20] block">
                                {t('Key Institutional Protocol:', 'মূল প্রাতিষ্ঠানিক প্রটোকল:')}
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#0D1F18]">
                                {faq.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#195642] shrink-0" />
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Banner */}
        <div className="hidden">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#0B2A20] text-[#D2F843] flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-lg text-[#0B2A20]">
                {t('Need custom methodology advice or dataset access?', 'নির্দিষ্ট পদ্ধতিগত পরামর্শ বা ডেটাসেট প্রয়োজন?')}
              </h4>
              <p className="text-xs sm:text-sm font-sans text-[#556B62] mt-0.5">
                {t(
                  'Our methodology desk responds to peer researchers and investigative proposals within two business days.',
                  'আমাদের গবেষণা ডেস্ক দুই কর্মদিবসের মধ্যে গবেষক ও অনুসন্ধানী প্রস্তাবসমূহের উত্তর প্রদান করে থাকে।'
                )}
              </p>
            </div>
          </div>

          <a
            href="#contact-form-section"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact-form-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 rounded-full bg-[#0B2A20] text-[#D2F843] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#195642] transition-colors whitespace-nowrap shadow-sm cursor-pointer shrink-0"
          >
            {t('Submit Research Inquiry ↑', 'গবেষণার তথ্য পাঠান ↑')}
          </a>
        </div>
      </div>
    </section>
  );
};
