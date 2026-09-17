import React, { useState } from 'react';
import {
  Globe,
  SlidersHorizontal,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Users,
  FileText,
  Radio,
  Mail,
  Building,
  GraduationCap,
  Download,
  Search,
  CheckCircle,
  Menu,
  X,
  Send,
  ArrowLeft,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Award,
  Database,
  Cpu,
  Newspaper,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ResearchBeat, TeamMember, FaqItem } from '../../types';

export const LiveSitePreview: React.FC = () => {
  const {
    state,
    setViewMode,
    previewLanguage,
    setPreviewLanguage,
    addInquiry,
    recordResearchView,
    setSelectedSectionAppId
  } = useCms();

  const [activePage, setActivePage] = useState<'home' | 'about' | 'research' | 'team' | 'contact'>('home');
  const [activeBeatId, setActiveBeatId] = useState<string | null>(null);
  const [activeTabInvestigation, setActiveTabInvestigation] = useState<'brief' | 'protocols' | 'cases' | 'publications'>('brief');
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string>('faq-datasets');
  const [researchFilter, setResearchFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: 'Research Collaboration',
    subject: '',
    message: '',
    requestedDataset: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const isBn = previewLanguage === 'bn';

  const t = (enText: string, bnText?: string) => {
    if (isBn && bnText) return bnText;
    return enText;
  };

  const beatsList = Object.values(state.researchBeats).sort((a, b) =>
    (a.beatNumber || '').localeCompare(b.beatNumber || '')
  );
  const configuredAreaCards = state.homePage.areasOfInvestigation?.cards;
  const homeAreaCards = configuredAreaCards?.length
    ? configuredAreaCards.map((card, index) => ({
        id: card.id,
        beatNumber: String(index + 1).padStart(2, '0'),
        name: card.heading,
        tagline: card.description,
        category: 'INVESTIGATION',
        outputsCount: '',
        image: card.image
      }))
    : beatsList.map(beat => ({ ...beat, image: undefined }));

  const teamList = state.team;
  const teamHero = state.settings.teamHero;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.email || !contactForm.message) return;
    addInquiry({
      name: contactForm.fullName,
      organization: contactForm.organization || 'Independent Researcher',
      email: contactForm.email,
      topic: `${contactForm.inquiryType}: ${contactForm.subject || 'Inquiry'}`,
      requestedDataset: contactForm.requestedDataset || undefined,
      message: contactForm.message,
      status: 'new'
    });
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        inquiryType: 'Research Collaboration',
        subject: '',
        message: '',
        requestedDataset: ''
      });
      setContactSubmitted(false);
    }, 4000);
  };

  const handleOpenBeat = (beatId: string) => {
    recordResearchView(beatId);
    setActiveBeatId(beatId);
    setActiveTabInvestigation('brief');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestDataset = (datasetName: string) => {
    setContactForm(prev => ({
      ...prev,
      inquiryType: 'Dataset Access Request',
      subject: `Dataset Request: ${datasetName}`,
      requestedDataset: datasetName
    }));
    setActiveBeatId(null);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedBeat: ResearchBeat | null = activeBeatId ? state.researchBeats[activeBeatId] || null : null;

  // Filter research beats
  const filteredBeats = beatsList.filter(beat => {
    if (researchFilter === 'all') return true;
    if (researchFilter === 'journalism') return beat.category === 'journalism';
    if (researchFilter === 'platforms') return beat.category === 'platforms';
    if (researchFilter === 'public') return beat.category === 'public';
    return true;
  });

  // Filter team
  const filteredTeam = teamList.filter(member => {
    if (teamFilter === 'all') return true;
    return member.category === teamFilter;
  });

  // FAQs
  const allFaqs: FaqItem[] = state.contactPage?.faqs || [];
  const filteredFaqs = allFaqs.filter(faq => {
    if (activeFaqCategory === 'all') return true;
    return faq.category.toLowerCase() === activeFaqCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#F6F9F4] text-[#0D1F18] font-sans selection:bg-[#D2F843] selection:text-[#0B2A20] flex flex-col">
      {/* Top CMS Synchronizer Bar */}
      <div className="sticky top-0 z-50 bg-[#0B2A20] text-[#E2EAE4] px-4 py-2 flex items-center justify-between text-xs border-b border-[#143325]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D2F843] animate-pulse" />
            <span className="font-mono text-[#D2F843] text-[11px] font-bold tracking-wider uppercase">
              Live Preview
            </span>
          </div>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300 text-xs">
            https://ipa-mediaresearch.vercel.app
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#195642]/60 rounded-lg p-0.5 border border-[#256c54]">
            <button
              onClick={() => setPreviewLanguage('en')}
              className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                previewLanguage === 'en'
                  ? 'bg-[#D2F843] text-[#0B2A20] shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setPreviewLanguage('bn')}
              className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                previewLanguage === 'bn'
                  ? 'bg-[#D2F843] text-[#0B2A20] shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              বাংলা
            </button>
          </div>

          <button
            onClick={() => setViewMode('cms')}
            className="flex items-center gap-1.5 px-3 py-1 bg-white text-[#0B2A20] hover:bg-slate-100 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open CMS Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Website Header */}
      <header className="sticky top-[37px] z-40 bg-white/95 backdrop-blur-md border-b border-[#E2EAE4] px-6 lg:px-12 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => {
              setActivePage('home');
              setActiveBeatId(null);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {state.settings.headerBranding?.logoUrl ? (
              <img src={state.settings.headerBranding.logoUrl} alt="Header logo" className="w-10 h-10 rounded-xl object-contain shadow-sm group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#0B2A20] flex items-center justify-center font-serif text-[#D2F843] font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                IPA
              </div>
            )}
            <div>
              <div className="font-bold text-sm text-[#0B2A20] tracking-tight leading-none font-serif">
                {state.settings.headerBranding?.lightLogoText || state.settings.siteName || 'IPA — Institute of Public Accountability'}
              </div>
              <div className="text-[11px] text-[#556B62] font-mono uppercase tracking-wider mt-0.5">
                {t('Independent Media Research Observatory', 'স্বাধীন গণমাধ্যম গবেষণা মানমন্দির')}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => {
                setActivePage('home');
                setActiveBeatId(null);
              }}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'home' && !activeBeatId
                  ? 'text-[#0B2A20] font-bold border-b-2 border-[#0B2A20] pb-1'
                  : 'text-[#556B62] hover:text-[#0B2A20]'
              }`}
            >
              {t('Home', 'হোম')}
            </button>
            <button
              onClick={() => {
                setActivePage('about');
                setActiveBeatId(null);
              }}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'about' && !activeBeatId
                  ? 'text-[#0B2A20] font-bold border-b-2 border-[#0B2A20] pb-1'
                  : 'text-[#556B62] hover:text-[#0B2A20]'
              }`}
            >
              {t('About Us', 'আমাদের সম্পর্কে')}
            </button>
            <button
              onClick={() => {
                setActivePage('research');
                setActiveBeatId(null);
              }}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'research' || activeBeatId
                  ? 'text-[#0B2A20] font-bold border-b-2 border-[#0B2A20] pb-1'
                  : 'text-[#556B62] hover:text-[#0B2A20]'
              }`}
            >
              {t('Researches', 'গবেষণাসমূহ')}
            </button>
            <button
              onClick={() => {
                setActivePage('team');
                setActiveBeatId(null);
              }}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'team'
                  ? 'text-[#0B2A20] font-bold border-b-2 border-[#0B2A20] pb-1'
                  : 'text-[#556B62] hover:text-[#0B2A20]'
              }`}
            >
              {t('Our Team', 'আমাদের টিম')}
            </button>
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                setActivePage('contact');
                setActiveBeatId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePage === 'contact'
                  ? 'bg-[#0B2A20] text-[#D2F843] shadow-md'
                  : 'bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] shadow-sm hover:shadow'
              }`}
            >
              {t('Contact', 'যোগাযোগ')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0B2A20] hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#E2EAE4] space-y-2 pb-2">
            <button
              onClick={() => {
                setActivePage('home');
                setActiveBeatId(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#0D1F18] hover:bg-[#F6F9F4]"
            >
              {t('Home', 'হোম')}
            </button>
            <button
              onClick={() => {
                setActivePage('about');
                setActiveBeatId(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#0D1F18] hover:bg-[#F6F9F4]"
            >
              {t('About Us', 'আমাদের সম্পর্কে')}
            </button>
            <button
              onClick={() => {
                setActivePage('research');
                setActiveBeatId(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#0D1F18] hover:bg-[#F6F9F4]"
            >
              {t('Researches', 'গবেষণাসমূহ')}
            </button>
            <button
              onClick={() => {
                setActivePage('team');
                setActiveBeatId(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#0D1F18] hover:bg-[#F6F9F4]"
            >
              {t('Our Team', 'আমাদের টিম')}
            </button>
            <button
              onClick={() => {
                setActivePage('contact');
                setActiveBeatId(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#0B2A20] bg-[#D2F843]/30"
            >
              {t('Contact Desk', 'যোগাযোগ')}
            </button>
          </div>
        )}
      </header>

      {/* PAGE 1: INVESTIGATION DETAIL VIEW (When a Beat is active) */}
      {activeBeatId && selectedBeat && (
        <main className="flex-1 max-w-6xl mx-auto px-6 lg:px-12 py-10 w-full">
          {/* Breadcrumb & Back */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2EAE4]">
            <button
              onClick={() => setActiveBeatId(null)}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#556B62] hover:text-[#0B2A20] font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back to Researches', 'গবেষণাসমূহে ফিরে যান')}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#E2EAE4] text-[#0B2A20] uppercase">
                {selectedBeat.status}
              </span>
            </div>
          </div>

          {/* Investigation Header */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                {t('Investigation Beat', 'গবেষণা ক্ষেত্র')} {selectedBeat.beatNumber}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#D2F843] text-[#0B2A20] font-bold uppercase">
                {selectedBeat.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#0B2A20] tracking-tight">
              {selectedBeat.name}
            </h1>

            <p className="text-lg md:text-xl text-[#556B62] font-serif italic max-w-3xl leading-relaxed">
              "{selectedBeat.tagline}"
            </p>

            {/* Quick Metadata Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#556B62] font-mono border-t border-[#E2EAE4]">
              <div>
                <span className="text-slate-400">{t('Timeframe:', 'সময়কাল:')}</span>{' '}
                <span className="font-bold text-[#0B2A20]">{selectedBeat.timeframe}</span>
              </div>
              <div>
                <span className="text-slate-400">{t('Outputs:', 'প্রকাশনা:')}</span>{' '}
                <span className="font-bold text-[#0B2A20]">{selectedBeat.outputsCount}</span>
              </div>
              <div>
                <span className="text-slate-400">{t('Lead Fellows:', 'প্রধান গবেষক:')}</span>{' '}
                <span className="font-bold text-[#0B2A20]">{selectedBeat.leadFellows?.join(', ')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleRequestDataset(selectedBeat.name)}
                className="px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                <span>{t('Request Full Dataset', 'সম্পূর্ণ ডেটাসেট অনুরোধ করুন')}</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert(t('Link copied to clipboard!', 'লিংক কপি করা হয়েছে!'));
                }}
                className="px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-[#E2EAE4] text-[#0B2A20] hover:bg-slate-50 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{t('Share Beat', 'শেয়ার করুন')}</span>
              </button>
            </div>
          </div>

          {/* 4 Investigation Tabs */}
          <div className="border-b border-[#E2EAE4] mb-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTabInvestigation('brief')}
                className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTabInvestigation === 'brief'
                    ? 'border-[#0B2A20] text-[#0B2A20]'
                    : 'border-transparent text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                {t('1. Executive Brief & Scope', '১. নির্বাহী বিবরণ ও পরিধি')}
              </button>
              <button
                onClick={() => setActiveTabInvestigation('protocols')}
                className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTabInvestigation === 'protocols'
                    ? 'border-[#0B2A20] text-[#0B2A20]'
                    : 'border-transparent text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                {t('2. Methodological Protocols', '২. মেথডলজিকাল প্রোটোকল')}
              </button>
              <button
                onClick={() => setActiveTabInvestigation('cases')}
                className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTabInvestigation === 'cases'
                    ? 'border-[#0B2A20] text-[#0B2A20]'
                    : 'border-transparent text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                {t('3. Case Studies & Field Notes', '৩. কেস স্টাডি ও ফিল্ড নোট')}
              </button>
              <button
                onClick={() => setActiveTabInvestigation('publications')}
                className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTabInvestigation === 'publications'
                    ? 'border-[#0B2A20] text-[#0B2A20]'
                    : 'border-transparent text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                {t('4. Monographs & Datasets', '৪. মনোগ্রাফ ও ডেটাসেট')}
              </button>
            </div>
          </div>

          {/* TAB 1: EXECUTIVE BRIEF */}
          {activeTabInvestigation === 'brief' && (
            <div className="space-y-10">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedBeat.metrics?.map((m, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2EAE4] shadow-sm">
                    <div className="text-2xl lg:text-3xl font-serif font-bold text-[#0B2A20]">
                      {m.value}
                    </div>
                    <div className="text-xs font-mono font-semibold text-[#556B62] uppercase tracking-wider mt-1">
                      {m.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {m.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Research Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-lg font-serif font-bold text-[#0B2A20]">
                    {t('Observatory Research Narrative', 'গবেষণার পটভূমি ও বিস্তৃতি')}
                  </h3>
                  {selectedBeat.overview?.map((para, idx) => (
                    <p key={idx} className="text-sm text-[#556B62] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-[#E2EAE4] shadow-sm">
                    <img
                      src={selectedBeat.image}
                      alt={selectedBeat.imageTitle || selectedBeat.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4 bg-white text-xs text-[#556B62] font-mono">
                      {t('Visual Archive: Empirical monitoring sample for', 'দৃশ্যমান আর্কাইভ:')} {selectedBeat.name}
                    </div>
                  </div>

                  {/* Guiding Empirical Inquiries */}
                  <div className="bg-[#F8F9FD] p-6 rounded-2xl border border-[#E2EAE4]">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-3">
                      {t('Guiding Empirical Inquiries', 'মূল অনুসন্ধানী প্রশ্নসমূহ')}
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedBeat.keyQuestions?.map((q, idx) => (
                        <li key={idx} className="text-xs text-[#556B62] flex items-start gap-2 leading-relaxed">
                          <span className="text-[#0B2A20] font-bold font-mono">0{idx + 1}.</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: METHODOLOGICAL PROTOCOLS */}
          {activeTabInvestigation === 'protocols' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E2EAE4]">
                <h3 className="text-base font-serif font-bold text-[#0B2A20] mb-2">
                  {t('Standardized Data Protocols & Reliability Benchmarks', 'স্ট্যান্ডার্ডাইজড ডেটা প্রোটোকল')}
                </h3>
                <p className="text-xs text-[#556B62] leading-relaxed">
                  {t(
                    'All investigative activities conducted under this beat comply with pre-registered methodology standards and double-blind inter-coder verification pipelines.',
                    'এই গবেষণার অধীনে পরিচালিত সমস্ত অনুসন্ধান পদ্ধতি ডাবল-ব্লাইন্ড ভেরিফিকেশন ও প্রি-রেজিস্টার্ড স্ট্যান্ডার্ড মেনে সম্পন্ন হয়।'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedBeat.methodologyDetails?.map((proto, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2EAE4] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#0B2A20] bg-[#E2EAE4] px-2.5 py-0.5 rounded">
                        Protocol 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-[#556B62]">{proto.frequency}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0B2A20]">{proto.title}</h4>
                    <p className="text-xs text-[#556B62] leading-relaxed">{proto.description}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-[#195642] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#195642]" />
                      <span>{t('Audited for Replicability', 'যাচাইকৃত ও নির্ভরযোগ্য')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CASE STUDIES */}
          {activeTabInvestigation === 'cases' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedBeat.caseStudies?.map((cs, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2EAE4] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#0B2A20] bg-[#D2F843] px-2.5 py-0.5 rounded">
                        Case Study 0{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-[#556B62]">{cs.year}</span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-[#0B2A20]">{cs.title}</h4>
                    <p className="text-xs text-[#556B62] leading-relaxed">{cs.summary}</p>

                    <div className="p-3 bg-[#F6F9F4] rounded-xl border border-[#E2EAE4] text-xs text-[#0B2A20]">
                      <span className="font-mono font-bold uppercase tracking-wider block mb-1 text-[10px] text-[#556B62]">
                        {t('Empirical Impact & Citations', 'প্রভাব ও উদ্ধৃতি')}
                      </span>
                      {cs.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MONOGRAPHS & DATASETS */}
          {activeTabInvestigation === 'publications' && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-[#E2EAE4] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#0B2A20]">
                    {t('Published Research Outputs & Datasets', 'প্রকাশিত গবেষণা ও ডেটাসেট')}
                  </h3>
                  <p className="text-xs text-[#556B62]">
                    {t('Open-access distribution under Creative Commons CC BY-NC 4.0.', 'ক্রিয়েটিভ কমন্স লাইসেন্সের অধীনে উন্মুক্ত।')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {selectedBeat.publications?.map((pub, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-[#E2EAE4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#E2EAE4] text-[#0B2A20] font-mono text-[10px] font-bold uppercase">
                          {pub.type}
                        </span>
                        <span className="text-xs font-mono text-[#556B62]">{pub.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0B2A20]">{pub.title}</h4>
                      <p className="text-xs text-[#556B62] font-mono">{pub.pagesOrSize}</p>
                    </div>

                    <button
                      onClick={() => handleRequestDataset(pub.title)}
                      className="px-4 py-2 rounded-xl bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap self-start sm:self-center inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('Access File', 'ফাইল দেখুন')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Beat Switcher */}
          <div className="mt-14 pt-8 border-t border-[#E2EAE4] flex items-center justify-between">
            <button
              onClick={() => setActiveBeatId(null)}
              className="text-xs font-mono font-bold text-[#556B62] hover:text-[#0B2A20] uppercase cursor-pointer"
            >
              {t('All Research Programs', 'সকল গবেষণা ক্ষেত্র')}
            </button>
            <button
              onClick={() => {
                const curIdx = beatsList.findIndex(b => b.id === selectedBeat.id);
                const nextBeat = beatsList[(curIdx + 1) % beatsList.length];
                handleOpenBeat(nextBeat.id);
              }}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B2A20] hover:text-[#195642] uppercase cursor-pointer"
            >
              <span>{t('Next Beat Investigation', 'পরবর্তী গবেষণা ক্ষেত্র')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      )}

      {/* PAGE 2: HOME PAGE */}
      {!activeBeatId && activePage === 'home' && (
        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className="px-6 lg:px-12 pt-12 pb-16 max-w-7xl mx-auto" style={state.homePage.heroImage ? { backgroundImage: `linear-gradient(rgba(246,249,244,.94), rgba(246,249,244,.94)), url(${state.homePage.heroImage})`, backgroundSize: 'cover' } : undefined}>
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2EAE4] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#195642]" />
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#0B2A20] uppercase">
                  {t(state.homePage.badge, state.homePage.badgeBn)}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#0B2A20] tracking-tight leading-[1.08]">
                {t(state.homePage.heroHeadline, state.homePage.heroHeadlineBn)}
              </h1>

              <p className="text-lg sm:text-xl text-[#556B62] leading-relaxed max-w-3xl font-sans">
                {t(state.homePage.heroSubtitle, state.homePage.heroSubtitleBn)}
              </p>

              {false && <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('research')}
                  className="px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{t(state.homePage.primaryCtaText, 'গবেষণাসমূহ দেখুন')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>}
            </div>

            {/* 4 Stats Counters */}
            <div className="mt-14">
              {state.homePage.countersBadge && <div className="mb-3 text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">{state.homePage.countersBadge}</div>}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {state.homePage.homeMetrics?.map((metric, idx) => (
                <div
                  key={metric.id || idx}
                  className="bg-white p-6 rounded-3xl border border-[#E2EAE4] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl lg:text-4xl font-serif font-bold text-[#0B2A20]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {metric.detail}
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>

          {/* Built for Public Interest Banner */}
          <section className="px-6 lg:px-12 py-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl border border-[#E2EAE4] p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono font-bold text-[#195642] uppercase tracking-wider">
                  {state.homePage.publicInterestBanner?.badge || 'BUILT FOR PUBLIC INTEREST'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2A20]">
                  {state.homePage.publicInterestBanner?.title || 'Empirical Research For Transparent Institutions'}
                </h2>
                <p className="text-sm text-[#556B62] leading-relaxed">
                  {state.homePage.publicInterestBanner?.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-[#0B2A20]">
                  {(state.homePage.publicInterestBanner?.keyPoints || []).slice(0, 4).map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />{point}</li>
                  ))}
                </ul>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('about')}
                    className="text-xs font-mono font-bold text-[#0B2A20] hover:underline uppercase inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t('Learn about our governance and funding firewall', 'আমাদের পরিচালনা নীতি জানুন')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E2EAE4] shadow-inner">
                <img
                  src={state.homePage.publicInterestBanner?.mediaUrl || state.homePage.heroImage}
                  alt="Public Interest Research"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </section>

          {/* What We Do (4 Core Pillars) */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto">
            <div className="mb-10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                {t('OBSERVATORY DISCIPLINE', 'আমাদের গবেষণা ক্ষেত্র')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2A20]">
                {t(state.homePage.whatWeDo.header, 'আমরা যা করি')}
              </h2>
              <p className="text-sm text-[#556B62] max-w-2xl">
                {t(state.homePage.whatWeDo.subheader, 'তথ্যপ্রমাণ ও নিরপেক্ষ বিশ্লেষণের মাধ্যমে গণমাধ্যমের কাঠামো অনুধাবন')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.homePage.whatWeDo.cards?.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className={`p-7 rounded-3xl border border-[#E2EAE4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden ${card.theme === 'accent' || (!card.theme && idx === 2) ? 'bg-[#D2F843]' : card.theme === 'image' || card.cardType === 'image' || (!card.theme && idx === 1) ? 'bg-[#0B2A20] text-white' : 'bg-white'}`}
                >
                  {(card.theme === 'image' || card.cardType === 'image' || (!card.theme && idx === 1)) && card.image && <><img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" /><div className="absolute inset-0 bg-gradient-to-t from-[#061A13] via-[#061A13]/30 to-transparent" /></>}
                  <div className="space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6F9F4] border border-[#E2EAE4] flex items-center justify-center text-[#0B2A20]">
                      {card.iconImage ? <img src={card.iconImage} alt="" className="w-7 h-7 object-contain" /> : <span className="font-mono text-sm font-bold">0{idx + 1}</span>}
                    </div>
                    <h3 className={`text-xl font-serif font-bold ${card.theme === 'image' || card.cardType === 'image' || (!card.theme && idx === 1) ? 'text-white' : 'text-[#0B2A20]'}`}>{card.title}</h3>
                    <p className={`text-xs leading-relaxed ${card.theme === 'image' || card.cardType === 'image' || (!card.theme && idx === 1) ? 'text-white/80' : 'text-[#556B62]'}`}>{card.description}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <button
                      onClick={() => setActivePage('research')}
                      className="text-xs font-mono font-bold text-[#0B2A20] hover:text-[#195642] uppercase inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t('View Inquiries', 'গবেষণা দেখুন')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Areas of Investigation (6 Beats List & Interactive Preview) */}
          <section className="px-6 lg:px-12 py-16 bg-white border-y border-[#E2EAE4]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                    {t('LONGITUDINAL TRACKS', 'চলমান গবেষণা')}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2A20] mt-1">
                    {t(state.homePage.areasOfInvestigation.title, 'অনুসন্ধানের প্রধান ক্ষেত্রসমূহ')}
                  </h2>
                </div>
                <button
                  onClick={() => setActivePage('research')}
                  className="text-xs font-mono font-bold text-[#0B2A20] hover:underline uppercase inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t('Browse All 6 Beats', 'সকল ৬টি ক্ষেত্র দেখুন')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homeAreaCards.map(beat => (
                  <div
                    key={beat.id}
                    onClick={() => !configuredAreaCards?.length && handleOpenBeat(beat.id)}
                    className="p-7 rounded-3xl bg-[#F6F9F4] border border-[#E2EAE4] hover:bg-white hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    {beat.image && <img src={beat.image} alt={beat.name} className="w-full h-40 object-cover rounded-2xl mb-5" />}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#556B62]">Beat {beat.beatNumber}</span>
                        <span className="px-2.5 py-0.5 rounded bg-white border border-[#E2EAE4] text-[10px] font-bold text-[#0B2A20] uppercase">
                          {beat.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#0B2A20] group-hover:text-[#195642] transition-colors">
                        {beat.name}
                      </h3>
                      <p className="text-xs text-[#556B62] leading-relaxed line-clamp-2">
                        {beat.tagline}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#E2EAE4] flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 text-[11px]">{beat.outputsCount}</span>
                      <span className="font-bold text-[#0B2A20] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>{t('Explore Beat', 'বিস্তারিত')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Core Quote Banner */}
          <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto text-center rounded-3xl overflow-hidden" style={state.homePage.tenetImage ? { backgroundImage: `linear-gradient(rgba(11,42,32,.84), rgba(11,42,32,.84)), url(${state.homePage.tenetImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                {t('INSTITUTIONAL CREED', 'আমাদের মূল নীতি')}
              </span>
              <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B2A20] leading-tight">
                {state.homePage.tenetQuote}
              </blockquote>
              <p className="text-sm sm:text-base text-[#556B62] max-w-2xl mx-auto pt-2">
                {state.homePage.tenetSubtitle}
              </p>
            </div>
          </section>

          {/* How We Work (5 Process Steps) */}
          <section className="px-6 lg:px-12 py-16 bg-white border-t border-[#E2EAE4]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2A20]">
                  {state.homePage.howWeWork.title}
                </h2>
                <p className="text-xs text-[#556B62]">{state.homePage.howWeWork.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {state.homePage.howWeWork.steps?.slice(0, 4).map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#F6F9F4] border border-[#E2EAE4] space-y-3"
                  >
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#0B2A20] text-[#D2F843]">
                      {idx + 1}
                    </span>
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <h4 className="text-sm font-bold text-[#0B2A20]">{step.title}</h4>
                      <span className="text-[10px] font-mono text-[#556B62] uppercase">{step.subheading || step.step}</span>
                    </div>
                    <p className="text-xs text-[#556B62] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Researchers Preview */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                  {t('DIRECTORATE SPOTLIGHT', 'গবেষকবৃন্দ')}
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#0B2A20] mt-1">
                  {t('Featured Researchers', 'প্রধান গবেষক ও নেতৃত্ব')}
                </h2>
              </div>
              <button
                onClick={() => setActivePage('team')}
                className="text-xs font-mono font-bold text-[#0B2A20] hover:underline uppercase inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t('View Full Directorate (8)', 'সকল গবেষক দেখুন (৮)')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamList.slice(0, 4).map(member => (
                <div
                  key={member.id}
                  onClick={() => setSelectedTeamMember(member)}
                  className="bg-white rounded-3xl border border-[#E2EAE4] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F6F9F4] border border-[#E2EAE4] text-[#0B2A20]">
                      {member.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#0B2A20] group-hover:text-[#195642]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#556B62] font-mono">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Call to Action Card */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto">
            <div className="bg-[#0B2A20] text-white rounded-3xl p-10 lg:p-16 shadow-lg space-y-6 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-mono font-bold text-[#D2F843] uppercase tracking-wider">
                  {t('INSTITUTIONAL COLLABORATION & INQUIRY', 'প্রাতিষ্ঠানিক যোগাযোগ ও অংশীদারিত্ব')}
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
                  {t(state.homePage.bottomCta.title, 'আসুন একসাথে গণমাধ্যমের পরিমণ্ডলকে অনুধাবন করি।')}
                </h2>
                <p className="text-sm sm:text-base text-[#E2EAE4] leading-relaxed">
                  {t(
                    state.homePage.bottomCta.narrative,
                    'আপনি আমাদের গবেষণায় আগ্রহী হোন, যৌথ গবেষণার সুযোগ খুঁজুন বা সংস্থা সম্পর্কে আরও জানতে চান—আমরা আপনার মতামতকে স্বাগত জানাই।'
                  )}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActivePage('contact')}
                    className="px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#D2F843] text-[#0B2A20] hover:bg-[#bce630] shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{t(state.homePage.bottomCta.primaryCtaText, 'যোগাযোগ করুন')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActivePage('research')}
                    className="px-6 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#195642] text-white hover:bg-[#256c54] border border-[#256c54] transition-all cursor-pointer"
                  >
                    <span>{t(state.homePage.bottomCta.secondaryCtaText, 'সকল গবেষণা দেখুন')}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* PAGE 3: ABOUT US PAGE */}
      {!activeBeatId && activePage === 'about' && (
        <main className="flex-1 w-full">
          {/* About Hero */}
          <section className="px-6 lg:px-12 pt-12 pb-16 max-w-7xl mx-auto" style={state.aboutPage.heroBanner?.bgImage ? { backgroundImage: `linear-gradient(rgba(246,249,244,.88), rgba(246,249,244,.88)), url(${state.aboutPage.heroBanner.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                {state.aboutPage.heroBanner?.badgeText || 'ABOUT THE ORGANIZATION'}
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#0B2A20] tracking-tight">
                {state.aboutPage.heroBanner?.title || 'Independent Research for a Changing Media World.'}
              </h1>
              <p className="text-lg text-[#556B62] leading-relaxed">
                {state.aboutPage.heroBanner?.subtext || "We research the systems, technologies, institutions, and behaviors shaping today's media and information environment."}
              </p>
            </div>
          </section>

          {/* Who We Are & Narrative */}
          <section className="px-6 lg:px-12 py-12 max-w-7xl mx-auto bg-white rounded-3xl border border-[#E2EAE4] shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono font-bold text-[#195642] uppercase tracking-wider">
                  {t('INSTITUTIONAL PROFILE', 'প্রতিষ্ঠান পরিচিতি')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2A20]">
                  {state.aboutPage.whoWeAre?.heading || 'Who We Are'}
                </h2>
                <span className="inline-flex w-fit px-3 py-1 rounded-full bg-[#F6F9F4] border border-[#E2EAE4] text-[10px] font-mono font-bold text-[#195642] uppercase tracking-wider">
                  {state.aboutPage.whoWeAre?.badgeText || 'Institutional Foundation'}
                </span>
                <div className="space-y-3 text-sm text-[#556B62] leading-relaxed">
                  {state.aboutPage.whoWeAre?.description ? <p>{state.aboutPage.whoWeAre.description}</p> : (state.aboutPage.whoWeAre?.narrative || []).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-[#E2EAE4]">
                  <img
                    src={state.aboutPage.whoWeAre?.mainPhoto || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80'}
                    alt="IPA Newsroom Archiving"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 bg-[#F6F9F4] rounded-2xl border border-[#E2EAE4]">
                    <div className="text-xl font-serif font-bold text-[#0B2A20]">
                      {state.aboutPage.whoWeAre?.foundedYear || '2019'}
                    </div>
                    <div className="text-[10px] font-mono text-[#556B62] uppercase">Founded</div>
                  </div>
                  <div className="p-4 bg-[#F6F9F4] rounded-2xl border border-[#E2EAE4]">
                    <div className="text-xl font-serif font-bold text-[#0B2A20]">Dhaka</div>
                    <div className="text-[10px] font-mono text-[#556B62] uppercase">Secretariat</div>
                  </div>
                  <div className="p-4 bg-[#F6F9F4] rounded-2xl border border-[#E2EAE4]">
                    <div className="text-xl font-serif font-bold text-[#0B2A20]">100%</div>
                    <div className="text-[10px] font-mono text-[#556B62] uppercase">Open Access</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Pillars */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto">
            <div className="mb-10 space-y-1">
              <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                CORE ORIENTATION
              </span>
                <h2 className="text-3xl font-serif font-bold text-[#0B2A20]">Mission & Vision</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {state.aboutPage.missionPillars?.slice(0, 4).map((pillar, idx) => (
                <div key={idx} className={`p-6 rounded-3xl border border-[#E2EAE4] shadow-sm space-y-3 ${idx === 1 ? 'bg-[#0B2A20] text-white' : idx === 2 ? 'bg-[#D2F843]' : idx === 3 && pillar.image ? 'bg-[#0B2A20] text-white bg-cover bg-center' : 'bg-white'}`} style={idx === 3 && pillar.image ? { backgroundImage: `linear-gradient(rgba(11,42,32,.7), rgba(11,42,32,.7)), url(${pillar.image})` } : undefined}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#556B62]">{pillar.indexLabel || `0${idx + 1}`}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{pillar.badge}</span>
                  </div>
                  <h3 className={`text-lg font-serif font-bold ${idx === 1 || idx === 3 ? 'text-white' : 'text-[#0B2A20]'}`}>{pillar.title}</h3>
                  <p className={`text-xs leading-relaxed ${idx === 1 || idx === 3 ? 'text-white/80' : 'text-[#556B62]'}`}>{pillar.description}</p>
                </div>
              ))}
            </div>
          </section>

        </main>
      )}

      {/* PAGE 4: RESEARCHES DIRECTORY PAGE */}
      {!activeBeatId && activePage === 'research' && (
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
          <div className="mb-10 space-y-4 rounded-3xl p-8 lg:p-12 bg-[#F6F9F4] border border-[#E2EAE4] bg-cover bg-center" style={teamHero?.image ? { backgroundImage: `linear-gradient(rgba(246,249,244,.88), rgba(246,249,244,.88)), url(${teamHero.image})` } : undefined}>
            <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
              {t('RESEARCH PROGRAMMES', 'গবেষণা কর্মসূচি')}
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#0B2A20] tracking-tight">
              {t('Core Lines of Investigation', 'মূল অনুসন্ধানের ক্ষেত্রসমূহ')}
            </h1>
            <p className="text-sm sm:text-base text-[#556B62] max-w-2xl">
              {t(
                'Six specialized observational beats monitoring media systems, algorithmic systems, newsroom stability, and public discourse.',
                'গণমাধ্যমের স্বাধীনতা, অ্যালগরিদমিক প্রভাব ও জনমত পর্যবেক্ষণে আমাদের ৬টি বিশেষ গবেষণা ক্ষেত্র।'
              )}
            </p>

            {/* Filter Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setResearchFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  researchFilter === 'all'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                All Beats ({beatsList.length})
              </button>
              <button
                onClick={() => setResearchFilter('journalism')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  researchFilter === 'journalism'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                Journalism & Newsrooms
              </button>
              <button
                onClick={() => setResearchFilter('platforms')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  researchFilter === 'platforms'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                Digital Media & AI
              </button>
              <button
                onClick={() => setResearchFilter('public')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  researchFilter === 'public'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62] hover:text-[#0B2A20]'
                }`}
              >
                Public Opinion & Democracy
              </button>
            </div>
          </div>

          {/* Beats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBeats.map(beat => (
              <div
                key={beat.id}
                onClick={() => handleOpenBeat(beat.id)}
                className="bg-white rounded-3xl border border-[#E2EAE4] overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={beat.image}
                      alt={beat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#0B2A20] text-[#D2F843] uppercase shadow">
                        Beat {beat.beatNumber}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#556B62]">
                      {beat.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#0B2A20] group-hover:text-[#195642]">
                      {beat.name}
                    </h3>
                    <p className="text-xs text-[#556B62] leading-relaxed line-clamp-3">
                      {beat.description}
                    </p>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px]">{beat.outputsCount}</span>
                    <span className="font-bold text-[#0B2A20] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>{t('Explore Beat Investigation', 'অনুসন্ধান দেখুন')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* PAGE 5: OUR TEAM DIRECTORY PAGE */}
      {!activeBeatId && activePage === 'team' && (
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
          <div className="mb-10 space-y-4">
            <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
              {t('RESEARCHERS & FELLOWS', 'গবেষক ও ফেলোবৃন্দ')}
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#0B2A20] tracking-tight">
              {t('Our Research Team', 'আমাদের গবেষণা দল')}
            </h1>
            <p className="text-sm sm:text-base text-[#556B62] max-w-2xl">
              {t(
                'Interdisciplinary directors, computational data scientists, and investigative fellows shaping our open-access media observatory.',
                'আমাদের গণমাধ্যম মানমন্দির পরিচালনাকারী গবেষক, শিক্ষাবিদ ও ডেটা সায়েন্টিস্ট দল।'
              )}
            </p>

            {/* Filter Tabs */}
            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={() => setTeamFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer ${
                  teamFilter === 'all'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                All Team ({teamList.length})
              </button>
              <button
                onClick={() => setTeamFilter('leadership')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer ${
                  teamFilter === 'leadership'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                Leadership & Directorate
              </button>
              <button
                onClick={() => setTeamFilter('research')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer ${
                  teamFilter === 'research'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                Research Directorate
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeam.map(member => (
              <div
                key={member.id}
                onClick={() => setSelectedTeamMember(member)}
                className="bg-white rounded-3xl border border-[#E2EAE4] overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F6F9F4] border border-[#E2EAE4] text-[#0B2A20]">
                      {member.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0B2A20] group-hover:text-[#195642]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#556B62] font-mono leading-tight">{member.role}</p>
                    <p className="text-xs text-slate-500 pt-2 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-[#0B2A20]">
                    <span className="font-bold">{t('View Full Dossier', 'পূর্ণ বিবরণী')}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TEAM MEMBER DOSSIER MODAL */}
      {selectedTeamMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-[#E2EAE4] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-[#E2EAE4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0B2A20] text-[#D2F843]">
                  {selectedTeamMember.category}
                </span>
                <span className="text-xs font-mono text-[#556B62]">{selectedTeamMember.email}</span>
              </div>
              <button
                onClick={() => setSelectedTeamMember(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 lg:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={selectedTeamMember.image}
                  alt={selectedTeamMember.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shadow border border-[#E2EAE4] shrink-0"
                />
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-[#0B2A20]">
                    {selectedTeamMember.name}
                  </h2>
                  <p className="text-xs font-mono text-[#556B62] font-semibold">{selectedTeamMember.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {selectedTeamMember.fullBio || selectedTeamMember.bio}
                  </p>
                </div>
              </div>

              {/* Research Interests */}
              {selectedTeamMember.researchInterests && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                    {t('Specialized Research Domains', 'গবেষণার বিষয়সমূহ')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeamMember.researchInterests.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs bg-[#F6F9F4] border border-[#E2EAE4] text-[#0B2A20]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {selectedTeamMember.education && (
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                    {t('Academic Credentials', 'শিক্ষাগত যোগ্যতা')}
                  </h4>
                  <p className="text-xs text-[#556B62] font-mono">{selectedTeamMember.education}</p>
                </div>
              )}

              {/* Publications */}
              {selectedTeamMember.recentPublications && selectedTeamMember.recentPublications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                    {t('Recent Scholarly Outputs', 'সাম্প্রতিক প্রকাশনা')}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#556B62]">
                    {selectedTeamMember.recentPublications.map((pub, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A20] mt-1.5 shrink-0" />
                        <span>{pub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#F6F9F4] border-t border-[#E2EAE4] flex justify-end">
              <button
                onClick={() => setSelectedTeamMember(null)}
                className="px-5 py-2 rounded-xl bg-[#0B2A20] text-white text-xs font-mono uppercase font-bold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 6: CONTACT PAGE */}
      {!activeBeatId && activePage === 'contact' && (
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full space-y-16">
          {/* Contact Hero */}
          <div className="space-y-3 max-w-2xl rounded-3xl p-8 bg-cover bg-center" style={state.contactPage.hero.bgImage ? { backgroundImage: `linear-gradient(rgba(246,249,244,.9), rgba(246,249,244,.9)), url(${state.contactPage.hero.bgImage})` } : undefined}>
            <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
              {t(state.contactPage.hero.badge, state.contactPage.hero.badgeBn)}
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#0B2A20] tracking-tight">
              {t(state.contactPage.hero.heading, state.contactPage.hero.headingBn)}
            </h1>
            <p className="text-sm sm:text-base text-[#556B62]">
              {t(state.contactPage.hero.subtitle, state.contactPage.hero.subtitleBn)}
            </p>
          </div>

          {/* 2-Column Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Communication Lines */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-[#E2EAE4] shadow-sm space-y-6">
                <h3 className="text-lg font-serif font-bold text-[#0B2A20]">
                  {t('Direct Communications Desk', 'যোগাযোগের মাধ্যম')}
                </h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F6F9F4] border border-[#E2EAE4] flex items-center justify-center text-[#0B2A20] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#556B62]">
                        {t('Headquarters', 'হেডকোয়ার্টার্স')}
                      </div>
                      <p className="text-xs text-[#0B2A20] leading-relaxed">
                        {t(
                          state.contactPage.directDetails.officeLocation,
                          state.contactPage.directDetails.officeLocationBn
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Telephones */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F6F9F4] border border-[#E2EAE4] flex items-center justify-center text-[#0B2A20] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#556B62]">
                        {t('Telephone Lines', 'টেলিফোন')}
                      </div>
                      <p className="text-[#0B2A20] font-mono">
                        {state.contactPage.directDetails.phoneLabel || 'Main Secretariat'}: {state.contactPage.directDetails.phone}
                      </p>
                      <p className="text-[#0B2A20] font-mono">
                        {state.contactPage.directDetails.tollFreePhoneLabel || 'Research Desk & Media'}: {state.contactPage.directDetails.tollFreePhone}
                      </p>
                    </div>
                  </div>

                  {/* Emails */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F6F9F4] border border-[#E2EAE4] flex items-center justify-center text-[#0B2A20] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#556B62]">
                        {t('Official Email Desks', 'ইমেইল')}
                      </div>
                      <p className="text-[#0B2A20] font-mono">{state.contactPage.directDetails.supportEmail}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F6F9F4] border border-[#E2EAE4] flex items-center justify-center text-[#0B2A20] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#556B62]">
                        {t('Working Hours', 'কার্যকাল')}
                      </div>
                      <p className="text-xs text-[#0B2A20]">
                        {t(
                          state.contactPage.directDetails.workingHours,
                          state.contactPage.directDetails.workingHoursBn
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Directions Map Card */}
              <div className="bg-[#0B2A20] text-white p-7 rounded-3xl space-y-3">
                <span className="text-xs font-mono font-bold text-[#D2F843] uppercase tracking-wider">
                  {t('VISITING THE OBSERVATORY', 'মানমন্দির পরিদর্শন')}
                </span>
                <h4 className="text-base font-serif font-bold">
                  {t('Research Desk Appointments', 'গবেষণা ডেস্কে সরাসরি সাক্ষাৎ')}
                </h4>
                <p className="text-xs text-[#E2EAE4] leading-relaxed">
                  {t(
                    'Embedded researchers, journalists, and academic fellows are welcomed during scheduled observatory visiting hours.',
                    'গবেষক এবং সাংবাদিকদের জন্য অ্যাপয়েন্টমেন্টের ভিত্তিতে গবেষণা ডেস্কে ভিজিটের সুযোগ রয়েছে।'
                  )}
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 lg:p-10 rounded-3xl border border-[#E2EAE4] shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-[#0B2A20] mb-2">
                  {t('Submit an Inquiry or Dataset Request', 'অনুসন্ধান বা ডেটাসেটের জন্য বার্তা পাঠান')}
                </h3>
                <p className="text-xs text-[#556B62] mb-6">
                  {t(
                    'Our research secretariat typically reviews and acknowledges inquiries within one business day.',
                    'আমাদের গবেষণা দল ১ কার্যদিবসের মধ্যে আপনার বার্তার উত্তর দেবে।'
                  )}
                </p>

                {contactSubmitted ? (
                  <div className="p-8 rounded-2xl bg-[#DCFCE7] border border-green-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                    <h4 className="text-lg font-bold text-green-900">
                      {t('Inquiry Received Successfully', 'বার্তাটি সফলভাবে গৃহীত হয়েছে')}
                    </h4>
                    <p className="text-xs text-green-800 max-w-md mx-auto">
                      {t(
                        'Your request has been routed to the IPA Research Secretariat and registered in the inquiries inbox.',
                        'আপনার বার্তাটি আইপিএ গবেষণা ডেস্কে সংরক্ষিত হয়েছে।'
                      )}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    {/* Row 1: Name and Affiliation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-1.5">
                          {t('Full Name', 'পুরো নাম')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.fullName}
                          onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })}
                          placeholder="Dr. Tariq / Sarah Jenkins"
                          className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl px-4 py-3 text-xs text-[#0D1F18] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-1.5">
                          {t('Institutional Affiliation', 'প্রতিষ্ঠান বা সংস্থা')}
                        </label>
                        <input
                          type="text"
                          value={contactForm.organization}
                          onChange={e => setContactForm({ ...contactForm, organization: e.target.value })}
                          placeholder="University / Media House / Think Tank"
                          className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl px-4 py-3 text-xs text-[#0D1F18] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-1.5">
                          {t('Official Email', 'অফিসিয়াল ইমেইল')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="scholar@university.edu"
                          className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl px-4 py-3 text-xs text-[#0D1F18] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-1.5">
                          {t('Contact Number', 'ফোন নম্বর')}
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+880 171 0000000"
                          className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl px-4 py-3 text-xs text-[#0D1F18] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3: Inquiry Focus */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-1.5">
                          {t('Inquiry Focus', 'অনুসন্ধানের ধরন')}
                        </label>
                        <select
                          value={contactForm.inquiryType}
                          onChange={e => setContactForm({ ...contactForm, inquiryType: e.target.value })}
                          className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl px-4 py-3 text-xs text-[#0D1F18] outline-none transition-colors"
                        >
                          <option value="Research Collaboration">Research Collaboration</option>
                          <option value="Dataset Access Request">Dataset Access Request</option>
                          <option value="Press Commentary / Interview">Press Commentary / Interview</option>
                          <option value="Methodology Consultation">Methodology Consultation</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20] mb-1.5">
                          {t('Subject', 'বিষয়')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.subject}
                          onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Research Inquiry / Media Request"
                          className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl px-4 py-3 text-xs text-[#0D1F18] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Pre-filled dataset if available */}
                    {contactForm.requestedDataset && (
                      <div className="p-3 bg-[#E8E5FF] rounded-xl border border-purple-200 text-xs text-[#1E1B4B] flex items-center justify-between">
                        <span>
                          <strong>Requested Dataset:</strong> {contactForm.requestedDataset}
                        </span>
                        <button
                          type="button"
                          onClick={() => setContactForm({ ...contactForm, requestedDataset: '' })}
                          className="text-purple-700 hover:text-purple-900 font-bold"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B2A20]">
                          {t('Message', 'বার্তা')} <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-[#556B62]">
                          {contactForm.message.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        required
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder={t(
                          'Please describe your inquiry, institutional background, or requested datasets...',
                          'আপনার বার্তা বা অনুসন্ধানের বিবরণ লিখুন...'
                        )}
                        className="w-full bg-[#F6F9F4] border border-[#E2EAE4] focus:border-[#0B2A20] rounded-xl p-4 text-xs text-[#0D1F18] outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-[11px] text-[#556B62] max-w-sm">
                        {t(
                          'All communications are held under strict non-disclosure institutional protocols.',
                          'সকল তথ্য প্রাতিষ্ঠানিক গোপনীয়তা নীতি অনুসারে সংরক্ষিত থাকবে।'
                        )}
                      </p>
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        <span>{t('Send Message', 'বার্তা পাঠান')}</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions (FAQ Accordion) */}
          <div className="pt-10 border-t border-[#E2EAE4] space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#556B62] uppercase tracking-wider">
                {t('PUBLIC INQUIRIES & PROTOCOLS', 'সাধারণ প্রশ্নাবলী')}
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#0B2A20]">
                {t('Frequently Asked Questions', 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী')}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFaqCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFaqCategory === 'all'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setActiveFaqCategory('resources')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFaqCategory === 'resources'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                Public Resources
              </button>
              <button
                onClick={() => setActiveFaqCategory('methodology')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFaqCategory === 'methodology'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                Methodology & Audits
              </button>
              <button
                onClick={() => setActiveFaqCategory('ethics')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFaqCategory === 'ethics'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                Ethics & Confidentiality
              </button>
              <button
                onClick={() => setActiveFaqCategory('partnerships')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFaqCategory === 'partnerships'
                    ? 'bg-[#0B2A20] text-[#D2F843]'
                    : 'bg-white border border-[#E2EAE4] text-[#556B62]'
                }`}
              >
                Partnerships
              </button>
            </div>

            {/* Accordion Items */}
            <div className="space-y-4">
              {filteredFaqs.map(faq => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#E2EAE4] overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? '' : faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6E56CF] bg-purple-50 px-2.5 py-0.5 rounded">
                          {faq.categoryLabel || faq.category}
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#0B2A20] pt-1">
                          {faq.question}
                        </h4>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-[#556B62] shrink-0 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4">
                        <p className="text-xs text-[#556B62] leading-relaxed font-sans">
                          {faq.answer}
                        </p>

                        {faq.highlights && faq.highlights.length > 0 && (
                          <div className="bg-[#F6F9F4] p-4 rounded-xl border border-[#E2EAE4] space-y-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B2A20] block">
                              Key Highlights
                            </span>
                            <ul className="space-y-1.5">
                              {faq.highlights.map((hl, hIdx) => (
                                <li
                                  key={hIdx}
                                  className="text-xs text-[#556B62] flex items-start gap-2 leading-snug"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#195642] mt-1.5 shrink-0" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* Main Website Footer */}
      <footer className="bg-[#061A13] text-[#E2EAE4] border-t border-[#143325] mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Column 1: Institutional Identity */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                {state.settings.footerBranding?.logoUrl ? (
                  <img src={state.settings.footerBranding.logoUrl} alt="Footer logo" className="w-9 h-9 rounded-xl object-contain" />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-[#D2F843] flex items-center justify-center font-serif text-[#0B2A20] font-bold text-lg">
                    IPA
                  </div>
                )}
                <div className="font-bold text-sm text-white font-serif">
                  {state.settings.footerBranding?.footerLogoText || state.settings.siteName}
                </div>
              </div>
              <p className="text-xs text-[#556B62] leading-relaxed max-w-sm">
                {state.settings.footerBranding?.tagline ||
                  'Rigorous empirical research observing media ecosystems, newsroom autonomy, algorithmic governance, and democratic public spheres.'}
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#556B62]">
                {state.settings.footerBranding?.copyrightNotice}
              </div>
            </div>

            {/* Column 2: Observatory Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#D2F843] uppercase tracking-wider">
                Observatory
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button
                    onClick={() => {
                      setActivePage('home');
                      setActiveBeatId(null);
                    }}
                    className="hover:text-white cursor-pointer"
                  >
                    Home Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('about');
                      setActiveBeatId(null);
                    }}
                    className="hover:text-white cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('research');
                      setActiveBeatId(null);
                    }}
                    className="hover:text-white cursor-pointer"
                  >
                    Research Beats
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('team');
                      setActiveBeatId(null);
                    }}
                    className="hover:text-white cursor-pointer"
                  >
                    Our Team
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Research Beats */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#D2F843] uppercase tracking-wider">
                Active Beats
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {beatsList.slice(0, 4).map(b => (
                  <li key={b.id}>
                    <button
                      onClick={() => handleOpenBeat(b.id)}
                      className="hover:text-white cursor-pointer text-left"
                    >
                      {b.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Communications Desk */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#D2F843] uppercase tracking-wider">
                Secretariat
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {state.settings.officeAddress || 'Level 7, Press & Research Tower, Gulshan, Dhaka'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActivePage('contact');
                    setActiveBeatId(null);
                  }}
                  className="text-xs font-mono font-bold text-[#D2F843] hover:underline uppercase inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Contact Desk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#143325] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#556B62] font-mono">
            <div>{state.settings.footerBranding?.licenseNotice}</div>
            <div className="flex items-center gap-4">
              <span
                onClick={() => setViewMode('cms')}
                className="text-[#D2F843] hover:underline cursor-pointer font-bold"
              >
                CMS Admin Dashboard
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
