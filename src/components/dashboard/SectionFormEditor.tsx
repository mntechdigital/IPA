import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Eye,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Layers,
  ChevronRight,
  Info,
  Sliders,
  Globe,
  UploadCloud,
  FileText,
  Loader2
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { useImageUpload } from '../../lib/image/hooks/useImageUpload';
import { APP_GRID_PAGES, SectionAppTileDef } from '../../data/appGridDefinitions';
import { INITIAL_CMS_STATE } from '../../data/initialData';
import {
  HomePageData,
  AboutPageData,
  ContactPageData,
  ResearchBeat,
  TeamMember,
  MetricItem,
  WhatWeDoCard,
  ProcessStep,
  FaqItem,
  FooterColumn,
  CoreTenet,
  InvestigationCard,
  ResearchPageData,
  WorkProcessPillar
} from '../../types';

interface SectionFormEditorProps {
  appId: string;
}

export const SectionFormEditor: React.FC<SectionFormEditorProps> = ({ appId }) => {
  const {
    state,
    setSelectedSectionAppId,
    updateHomePage,
    updateAboutPage,
    updateContactPage,
    updateResearchPage,
    updateWorkProcessPillars,
    updateResearchBeat,
    updateSettings,
    updateTeamMember,
    addTeamMember,
    deleteTeamMember,
    setNotification
  } = useCms();

  const [activeTabLang, setActiveTabLang] = useState<'en' | 'bn'>('en');
  const [hasSaved, setHasSaved] = useState<boolean>(false);
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [draftHome, setDraftHome] = useState<HomePageData>(() => JSON.parse(JSON.stringify(state.homePage)));
  const [draftAbout, setDraftAbout] = useState<AboutPageData>(() => JSON.parse(JSON.stringify(state.aboutPage)));
  const [draftContact, setDraftContact] = useState<ContactPageData | null>(() => state.contactPage ? JSON.parse(JSON.stringify(state.contactPage)) : null);
  const [draftResearchPage, setDraftResearchPage] = useState<ResearchPageData>(() =>
    state.researchPage ? JSON.parse(JSON.stringify(state.researchPage)) : JSON.parse(JSON.stringify(INITIAL_CMS_STATE.researchPage))
  );
  const [draftPillars, setDraftPillars] = useState<WorkProcessPillar[]>(() =>
    state.workProcessPillars?.length ? JSON.parse(JSON.stringify(state.workProcessPillars)) : JSON.parse(JSON.stringify(INITIAL_CMS_STATE.workProcessPillars))
  );
  const [draftSettings, setDraftSettings] = useState(() => JSON.parse(JSON.stringify(state.settings)));

  useEffect(() => {
    if (!isDirty) {
      setDraftHome(JSON.parse(JSON.stringify(state.homePage)));
      setDraftAbout(JSON.parse(JSON.stringify(state.aboutPage)));
      if (state.contactPage) setDraftContact(JSON.parse(JSON.stringify(state.contactPage)));
      if (state.researchPage) setDraftResearchPage(JSON.parse(JSON.stringify(state.researchPage)));
      if (state.workProcessPillars) setDraftPillars(JSON.parse(JSON.stringify(state.workProcessPillars)));
      setDraftSettings(JSON.parse(JSON.stringify(state.settings)));
    }
  }, [state.homePage, state.aboutPage, state.contactPage, state.researchPage, state.workProcessPillars, state.settings]);

  const markDirty = () => setIsDirty(true);

  // Find app definition across all pages
  let currentApp: SectionAppTileDef | undefined;
  let currentPageTitle = 'Section Apps';

  for (const pageKey of Object.keys(APP_GRID_PAGES)) {
    const page = APP_GRID_PAGES[pageKey];
    const found = page.apps.find(a => a.id === appId);
    if (found) {
      currentApp = found;
      currentPageTitle = page.pageTitle;
      break;
    }
  }

  const handleSaveNotification = (msg = 'Section parameters saved successfully.') => {
    setHasSaved(true);
    setNotification({ message: msg, type: 'success' });
    setTimeout(() => setHasSaved(false), 3000);
  };

  const handleSave = () => {
    if (appId.startsWith('home-') || appId === 'home-hero' || appId.startsWith('home')) {
      updateHomePage(draftHome);
    } else if (appId.startsWith('about-') || appId.startsWith('about')) {
      updateAboutPage(draftAbout);
    } else if (appId.startsWith('contact-') || appId.startsWith('contact')) {
      if (draftContact) updateContactPage(draftContact!);
    } else if (appId.startsWith('branding')) {
      updateSettings(draftSettings);
    } else if (appId === 'research-pillars') {
      updateWorkProcessPillars(draftPillars);
      if (draftResearchPage) updateResearchPage(draftResearchPage);
    } else if (appId.startsWith('research-') || appId.startsWith('research')) {
      if (draftResearchPage) updateResearchPage(draftResearchPage);
    }
    setIsDirty(false);
    handleSaveNotification();
  };

  const { upload: uploadFile, isUploading: isImageUploading, error: uploadError } = useImageUpload({ folder: 'cms' });

  const handleImageUpload = async (file: File, onUrl: (url: string) => void) => {
    const result = await uploadFile(file);
    if (result) onUrl(result.url);
  };

  const patchHome = (partial: Partial<HomePageData>) => { setDraftHome(prev => ({ ...prev, ...partial })); markDirty(); };
  const patchAbout = (partial: Partial<AboutPageData>) => { setDraftAbout(prev => ({ ...prev, ...partial })); markDirty(); };
  const patchContact = (partial: Partial<ContactPageData>) => { setDraftContact(prev => prev ? ({ ...prev, ...partial } as ContactPageData) : prev); markDirty(); };
  const patchSettings = (partial: any) => { setDraftSettings((prev: any) => ({ ...prev, ...partial })); markDirty(); };
  const patchResearchPage = (partial: Partial<ResearchPageData>) => {
    setDraftResearchPage(prev => ({
      ...prev,
      ...partial,
      hero: { ...prev.hero, ...(partial.hero || {}) },
      areasSection: { ...prev.areasSection, ...(partial.areasSection || {}) },
      filterPills: { ...prev.filterPills, ...(partial.filterPills || {}) },
      cta: { ...prev.cta, ...(partial.cta || {}) },
      whatOurWorkLooksLike: { ...prev.whatOurWorkLooksLike, ...(partial.whatOurWorkLooksLike || {}) },
    }));
    markDirty();
  };
  const patchPillars = (updated: WorkProcessPillar[]) => {
    setDraftPillars(updated);
    markDirty();
  };

  if (!currentApp) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 m-6">
        <p className="text-slate-500">Section App not found.</p>
        <button
          onClick={() => setSelectedSectionAppId(null)}
          className="mt-4 px-4 py-2 bg-[#6E56CF] text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Return to App Grid
        </button>
      </div>
    );
  }

  // Quick fallback data objects — use buffered draft for editing
  const home = draftHome;
  const about = draftAbout;
  const contact = draftContact || {
    hero: {
      badge: 'COMMUNICATIONS & INQUIRIES',
      heading: "Let's Start a Conversation",
      subtitle: 'Direct communication channels for researchers and inquiries.',
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
    },
    directDetails: {
      phone: '+880 2 988 4120',
      phoneLabel: 'Phone',
      tollFreePhone: '+880 1800 472 633',
      tollFreePhoneLabel: 'Toll-Free',
      supportEmail: 'info@mediaresearch.org',
      researchDeskEmail: 'research@mediaresearch.org',
      pressEmail: 'media@mediaresearch.org',
      officeLocation: 'Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212',
      workingHours: 'Sunday – Thursday: 09:00 – 18:00 BST',
      officeLocationBn: '',
      workingHoursBn: '',
      phoneLabelBn: '',
      tollFreePhoneLabelBn: '',
      supportEmailBn: '',
      supportEmailLabelBn: '',
      researchDeskEmailBn: '',
      researchDeskEmailLabelBn: '',
      pressEmailBn: '',
      pressEmailLabelBn: ''
    },
    messageSettings: {
      targetEmail: 'inquiries@mediaresearch.org',
      autoReply: true,
      subjectPrefix: '[IPA Research Inquiry]',
      requireAffiliation: true
    },
    faqs: []
  };
  const settings = draftSettings;

  // --------------------------------------------------------------------------------
  // RENDER DEDICATED FORM BASED ON APP ID
  // --------------------------------------------------------------------------------

  const renderFormContent = () => {
    switch (appId) {
      // -------------------------------------------------------
      // HOME PAGE APPS
      // -------------------------------------------------------
      case 'home-hero':
        return (
          <div className="space-y-6">
            {/* Top Language Switcher */}
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Content Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTabLang('en')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  English (Primary)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabLang('bn')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Eyebrow Badge</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? home.badge : home.badgeBn || ''}
                  onChange={e =>
                    patchHome(
                      activeTabLang === 'en' ? { badge: e.target.value } : { badgeBn: e.target.value }
                    )
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Headline</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? home.heroHeadline : home.heroHeadlineBn || ''}
                  onChange={e =>
                    patchHome(
                      activeTabLang === 'en' ? { heroHeadline: e.target.value } : { heroHeadlineBn: e.target.value }
                    )
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Subtitle Narrative</label>
                <textarea
                  rows={3}
                  value={activeTabLang === 'en' ? home.heroSubtitle : home.heroSubtitleBn || ''}
                  onChange={e =>
                    patchHome(
                      activeTabLang === 'en' ? { heroSubtitle: e.target.value } : { heroSubtitleBn: e.target.value }
                    )
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Background Image</label>
                <div className="flex items-center gap-3">
                  <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                    <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, heroImage => patchHome({ heroImage }));
                    }} disabled={isImageUploading} />
                  </label>
                  {home.heroImage && (
                    <div className="flex items-center gap-2 shrink-0">
                      <img src={home.heroImage} alt="Hero preview" className="w-12 h-10 object-cover rounded-xl border border-slate-200" />
                      <button type="button" onClick={() => patchHome({ heroImage: '' })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Stat Counters */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#1E1B4B]">4 Stat Counters Bar</h3>
                  <p className="text-xs text-slate-500">Live quantitative indicators displayed below hero</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {home.homeMetrics.map((metric, idx) => (
                  <div key={metric.id || idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6E56CF]">Counter {idx + 1}</span>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Display Value ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                      <input
                        type="text"
                        value={activeTabLang === 'en' ? metric.value : (metric.valueBn || '')}
                        onChange={e => {
                          const updated = [...home.homeMetrics];
                          updated[idx] = { ...updated[idx], ...(activeTabLang === 'en' ? { value: e.target.value } : { valueBn: e.target.value }) };
                          patchHome({ homeMetrics: updated });
                        }}
                        placeholder={activeTabLang === 'en' ? '12+ Years' : '১২+ বছর'}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-[#6E56CF] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Label ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                      <input
                        type="text"
                        value={activeTabLang === 'en' ? metric.label : (metric.labelBn || '')}
                        onChange={e => {
                          const updated = [...home.homeMetrics];
                          updated[idx] = { ...updated[idx], ...(activeTabLang === 'en' ? { label: e.target.value } : { labelBn: e.target.value }) };
                          patchHome({ homeMetrics: updated });
                        }}
                        placeholder={activeTabLang === 'en' ? 'Experience' : 'অভিজ্ঞতা'}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:border-[#6E56CF] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Supporting Detail ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                      <input
                        type="text"
                        value={activeTabLang === 'en' ? metric.detail : (metric.detailBn || '')}
                        onChange={e => {
                          const updated = [...home.homeMetrics];
                          updated[idx] = { ...updated[idx], ...(activeTabLang === 'en' ? { detail: e.target.value } : { detailBn: e.target.value }) };
                          patchHome({ homeMetrics: updated });
                        }}
                        placeholder={activeTabLang === 'en' ? 'Empirical media research...' : 'তথ্যভিত্তিক গবেষণা...'}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500 focus:border-[#6E56CF] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'home-public-interest':
        const pib = home.publicInterestBanner || {
          badge: 'BUILT FOR PUBLIC INTEREST',
          badgeBn: 'জনস্বার্থে নিবেদিত',
          title: 'Empirical Research For Transparent Institutions',
          titleBn: 'স্বচ্ছ প্রতিষ্ঠানের জন্য তথ্যভিত্তিক গবেষণা',
          description: 'Conducting independent research into newsrooms and media ecosystems.',
          descriptionBn: 'ইনস্টিটিউট অব পাবলিক অ্যাফেয়ার্স সংবাদ ইকোসিস্টেম নিয়ে স্বাধীন গবেষণা করে।',
          mediaUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
          keyPoints: ["Independent research", "Open-access evidence", "Public-interest methods", "Transparent institutions"],
          keyPointsBn: ["স্বাধীন গবেষণা", "উন্মুক্ত প্রমাণ", "জনস্বার্থ পদ্ধতি", "স্বচ্ছ প্রতিষ্ঠান"],
          ctaText: 'Explore Research Beats',
          ctaTextBn: 'গবেষণা ক্ষেত্র দেখুন'
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Banner Language</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Eyebrow Badge</label>
                <input type="text" value={activeTabLang === 'en' ? pib.badge : (pib.badgeBn || '')} onChange={e => patchHome({ publicInterestBanner: activeTabLang === 'en' ? { ...pib, badge: e.target.value } : { ...pib, badgeBn: e.target.value } })} placeholder="BUILT FOR PUBLIC INTEREST" className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all" />
                <p className="text-[11px] text-slate-500">Shows above title with lime dot</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">CTA Button</label>
                <input type="text" value={activeTabLang === 'en' ? (pib.ctaText || '') : (pib.ctaTextBn || '')} onChange={e => patchHome({ publicInterestBanner: activeTabLang === 'en' ? { ...pib, ctaText: e.target.value } : { ...pib, ctaTextBn: e.target.value } })} placeholder="Explore Research Beats" className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3 py-2 text-sm text-slate-800 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Banner Headline</label>
              <input type="text" value={activeTabLang === 'en' ? pib.title : (pib.titleBn || '')} onChange={e => patchHome({ publicInterestBanner: activeTabLang === 'en' ? { ...pib, title: e.target.value } : { ...pib, titleBn: e.target.value } })} placeholder="Empirical Research For Transparent Institutions" className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description Narrative</label>
              <textarea rows={4} value={activeTabLang === 'en' ? pib.description : (pib.descriptionBn || '')} onChange={e => patchHome({ publicInterestBanner: activeTabLang === 'en' ? { ...pib, description: e.target.value } : { ...pib, descriptionBn: e.target.value } })} placeholder="Independent research into news ecosystems..." className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed" />
              <p className="text-[11px] text-slate-500 text-right">{(activeTabLang === 'en' ? pib.description : pib.descriptionBn || '').length} chars</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Highlight Image</label>
              <div className="flex items-center gap-3">
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                  <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, mediaUrl => patchHome({ publicInterestBanner: { ...pib, mediaUrl } })); }} disabled={isImageUploading} />
                </label>
                {pib.mediaUrl && (
                  <div className="flex items-center gap-2 shrink-0">
                    <img src={pib.mediaUrl} alt="Preview" className="w-20 h-14 object-cover rounded-xl border border-slate-200 shadow-sm" />
                    <button type="button" onClick={() => patchHome({ publicInterestBanner: { ...pib, mediaUrl: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Recommended 1600×900, &lt;500KB, rounded-3xl on site</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Points ( {activeTabLang === 'en' ? 'English' : 'Bangla'} )</label>
                <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border">4 ideal</span>
              </div>
              {(activeTabLang === 'en' ? (pib.keyPoints || []) : (pib.keyPointsBn || [])).map((pt: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E56CF] shrink-0 mt-3" />
                  <input type="text" value={pt} placeholder={`Key point ${idx + 1}`} onChange={e => {
                    if (activeTabLang === 'en') {
                      const keyPoints = [...(pib.keyPoints || [])]; keyPoints[idx] = e.target.value; patchHome({ publicInterestBanner: { ...pib, keyPoints } });
                    } else {
                      const keyPointsBn = [...(pib.keyPointsBn || pib.keyPoints || [])]; keyPointsBn[idx] = e.target.value; patchHome({ publicInterestBanner: { ...pib, keyPointsBn } });
                    }
                  }} className="flex-1 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3 py-2 text-sm text-slate-800 outline-none transition-all" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'home-what-we-do-v2':
      case 'home-what-we-do':
        const wwd = home.whatWeDo || {
          header: 'What We Do',
          headerBn: 'আমরা যা করি',
          subheader: 'Independent inquiry across the digital and broadcast media landscape',
          subheaderBn: 'ডিজিটাল ও সম্প্রচার গণমাধ্যম জুড়ে স্বাধীন অনুসন্ধান',
          cards: []
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Section Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Section Header ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? wwd.header : (wwd.headerBn || '')} onChange={e => patchHome({ whatWeDo: activeTabLang === 'en' ? { ...wwd, header: e.target.value } : { ...wwd, headerBn: e.target.value } })} placeholder="What We Do" className="w-full bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subheader ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? wwd.subheader : (wwd.subheaderBn || '')} onChange={e => patchHome({ whatWeDo: activeTabLang === 'en' ? { ...wwd, subheader: e.target.value } : { ...wwd, subheaderBn: e.target.value } })} placeholder="Independent inquiry..." className="w-full bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3 py-2 text-sm text-slate-800 outline-none transition-all" />
              </div>
            </div>

            {/* Cards Repeater */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1E1B4B]">Three Content Cards — Fixed Layout</h3>
                <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border">Card 1 Light • 2 Image • 3 Accent</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wwd.cards.slice(0, 3).map((card, idx) => (
                  <div key={card.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#6E56CF] bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">Card {idx + 1}</span>
                      <span className="text-[10px] font-mono text-slate-400">{card.id}</span>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Heading ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                      <input
                        type="text"
                        value={activeTabLang === 'en' ? card.title : (card.titleBn || '')}
                        onChange={e => {
                          const updated = [...wwd.cards];
                          updated[idx] = { ...updated[idx], ...(activeTabLang === 'en' ? { title: e.target.value } : { titleBn: e.target.value }) };
                          patchHome({ whatWeDo: { ...wwd, cards: updated } });
                        }}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Card {idx + 1} Icon</label>
                      <div className="flex items-center gap-2">
                        <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isImageUploading ? <Loader2 className="w-3 h-3 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-3 h-3" />}
                          <span>{isImageUploading ? '...' : 'Upload'}</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, iconImage => {
                              const updated = [...wwd.cards];
                              updated[idx] = { ...updated[idx], iconImage };
                              patchHome({ whatWeDo: { ...wwd, cards: updated } });
                            });
                          }} disabled={isImageUploading} />
                        </label>
                        {card.iconImage && (
                          <div className="flex items-center gap-1">
                            <img src={card.iconImage} alt="Icon preview" className="w-10 h-10 object-contain rounded-lg border border-slate-200" />
                            <button type="button" onClick={() => { const updated = [...wwd.cards]; updated[idx] = { ...updated[idx], iconImage: '' }; patchHome({ whatWeDo: { ...wwd, cards: updated } }); }} disabled={isImageUploading} className="p-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove icon">
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Description ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                      <textarea
                        rows={2}
                        value={activeTabLang === 'en' ? card.description : (card.descriptionBn || '')}
                        onChange={e => {
                          const updated = [...wwd.cards];
                          updated[idx] = { ...updated[idx], ...(activeTabLang === 'en' ? { description: e.target.value } : { descriptionBn: e.target.value }) };
                          patchHome({ whatWeDo: { ...wwd, cards: updated } });
                        }}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-lg p-2 text-xs text-slate-600 outline-none transition-all"
                      />
                    </div>

                    {idx === 1 && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Card Image</label>
                        <div className="flex items-center gap-2">
                          <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isImageUploading ? <Loader2 className="w-3 h-3 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-3 h-3" />}
                            <span>{isImageUploading ? '...' : 'Upload'}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, image => {
                                const updated = [...wwd.cards];
                                updated[idx] = { ...updated[idx], image };
                                patchHome({ whatWeDo: { ...wwd, cards: updated } });
                              });
                            }} disabled={isImageUploading} />
                          </label>
                          {card.image && (
                            <div className="flex items-center gap-1">
                              <img src={card.image} alt="Card preview" className="mt-2 w-full h-28 object-cover rounded-lg" />
                              <button type="button" onClick={() => { const updated = [...wwd.cards]; updated[idx] = { ...updated[idx], image: '' }; patchHome({ whatWeDo: { ...wwd, cards: updated } }); }} disabled={isImageUploading} className="p-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'home-who-we-are': {
        const wwa = about.whoWeAre || {
          heading: 'Institute of Public Affairs',
          description: 'An independent media research organization focused on understanding journalism, information, and public trust.',
          badgeText: 'INDEPENDENT RESEARCH · EVIDENCE-DRIVEN',
          foundedYear: '2021',
          mainPhoto: '',
          narrative: []
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading</label>
              <input type="text" value={wwa.heading || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, heading: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
              <textarea rows={4} value={wwa.description || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, description: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Moto</label>
              <input type="text" value={wwa.badgeText || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, badgeText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
            </div>
          </div>
        );
      }

      case 'home-areas':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <h3 className="text-sm font-bold text-amber-800">Deprecated Section</h3>
              <p className="text-xs text-amber-700 mt-1">This Areas of Investigation editor is deprecated. Please use <strong>Focus Areas (App 12)</strong> — the new canonical Areas of Focus manager with full EN/BN support.</p>
              <p className="text-[11px] text-amber-600 mt-2">Existing data is kept for fallback but no longer editable here.</p>
            </div>
          </div>
        );
      case '__deprecated_home_areas_original':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <h3 className="text-sm font-bold text-amber-800">Deprecated Section</h3>
              <p className="text-xs text-amber-700 mt-1">This Areas of Investigation editor is deprecated. Please use <strong>Focus Areas (App 12)</strong> — the new canonical Areas of Focus manager with full EN/BN support.</p>
              <p className="text-[11px] text-amber-600 mt-2">Existing data is kept for fallback but no longer editable here.</p>
            </div>
          </div>
        );
      case '__deprecated_home_areas_original':
        const areas = home.areasOfInvestigation || {
          title: 'Areas of Investigation',
          subtitle: 'Explore our six active longitudinal research programs',
          filterLabel: 'All Research Tracks',
          activeCategoryIds: Object.keys(state.researchBeats),
          cards: undefined
        };
        const areaCards: InvestigationCard[] = areas.cards || Object.values(state.researchBeats).map(beat => ({
          id: beat.id,
          heading: beat.name,
          description: beat.tagline,
          image: ''
        }));
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={areas.title}
                onChange={e => patchHome({ areasOfInvestigation: { ...areas, title: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Section Subtitle</label>
              <input
                type="text"
                value={areas.subtitle}
                onChange={e => patchHome({ areasOfInvestigation: { ...areas, subtitle: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Investigation Cards</label>
                <button
                  type="button"
                  onClick={() => patchHome({ areasOfInvestigation: { ...areas, cards: [...areaCards, { id: `area-${Date.now()}`, heading: 'New Investigation', description: 'Short description for this investigation area.', image: '' }] } })}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 text-[#6E56CF] text-xs font-semibold border border-purple-100"
                >
                  + Add More Card
                </button>
              </div>
              {areaCards.map((card, idx) => (
                <div key={card.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#6E56CF]">Card {idx + 1}</span>
                    {areaCards.length > 1 && <button type="button" onClick={() => patchHome({ areasOfInvestigation: { ...areas, cards: areaCards.filter((_, i) => i !== idx) } })} className="text-xs text-red-500">Remove</button>}
                  </div>
                  <input type="text" value={card.heading} onChange={e => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], heading: e.target.value }; patchHome({ areasOfInvestigation: { ...areas, cards } }); }} placeholder="Card Heading" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold" />
                  <textarea rows={3} value={card.description} onChange={e => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], description: e.target.value }; patchHome({ areasOfInvestigation: { ...areas, cards } }); }} placeholder="Short Description" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm" />
                  <div className="flex items-center gap-2">
                    <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isImageUploading ? <Loader2 className="w-3 h-3 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-3 h-3" />}
                      <span>{isImageUploading ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, image => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], image }; patchHome({ areasOfInvestigation: { ...areas, cards } }); }); }} disabled={isImageUploading} />
                    </label>
                    {card.image && (
                      <div className="flex items-center gap-1">
                        <img src={card.image} alt="Card preview" className="w-full h-32 object-cover rounded-lg" />
                        <button type="button" onClick={() => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], image: '' }; patchHome({ areasOfInvestigation: { ...areas, cards } }); }} disabled={isImageUploading} className="p-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'home-quote':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Quote Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Badge ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <input type="text" value={activeTabLang === 'en' ? home.tenetBadge : (home.tenetBadgeBn || '')} onChange={e => patchHome(activeTabLang === 'en' ? { tenetBadge: e.target.value } : { tenetBadgeBn: e.target.value })} placeholder="INSTITUTIONAL CORE TENET" className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Core Institutional Quote ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <input type="text" value={activeTabLang === 'en' ? home.tenetQuote : (home.tenetQuoteBn || '')} onChange={e => patchHome(activeTabLang === 'en' ? { tenetQuote: e.target.value } : { tenetQuoteBn: e.target.value })} placeholder="Better understanding begins with better research." className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-base font-serif italic text-slate-800 outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quote Explanation ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <textarea rows={3} value={activeTabLang === 'en' ? home.tenetSubtitle : (home.tenetSubtitleBn || '')} onChange={e => patchHome(activeTabLang === 'en' ? { tenetSubtitle: e.target.value } : { tenetSubtitleBn: e.target.value })} placeholder="Our work seeks to make..." className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quote Background Image</label>
              <div className="flex items-center gap-3">
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                  <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, tenetImage => patchHome({ tenetImage })); }} disabled={isImageUploading} />
                </label>
                {home.tenetImage && (
                  <div className="flex items-center gap-2 shrink-0">
                    <img src={home.tenetImage} alt="Quote preview" className="w-full h-40 object-cover rounded-xl border border-slate-200" />
                    <button type="button" onClick={() => patchHome({ tenetImage: '' })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'home-how-we-work':
        const hww = home.howWeWork || {
          badge: 'OUR METHODOLOGICAL DISCIPLINE',
          badgeBn: 'আমাদের পদ্ধতিগত শৃঙ্খলা',
          title: 'How We Work',
          titleBn: 'আমরা যেভাবে কাজ করি',
          subtitle: 'From urgent inquiries to open-access public knowledge',
          subtitleBn: 'জরুরি অনুসন্ধান থেকে উন্মুক্ত জ্ঞান',
          steps: []
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Methodology Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Eyebrow Badge ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                  <input type="text" value={activeTabLang === 'en' ? hww.badge : (hww.badgeBn || '')} onChange={e => patchHome({ howWeWork: activeTabLang === 'en' ? { ...hww, badge: e.target.value } : { ...hww, badgeBn: e.target.value } })} placeholder="OUR METHODOLOGICAL DISCIPLINE" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Heading ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                  <input type="text" value={activeTabLang === 'en' ? hww.title : (hww.titleBn || '')} onChange={e => patchHome({ howWeWork: activeTabLang === 'en' ? { ...hww, title: e.target.value } : { ...hww, titleBn: e.target.value } })} placeholder="How We Work" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Subheading ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                  <input type="text" value={activeTabLang === 'en' ? hww.subtitle : (hww.subtitleBn || '')} onChange={e => patchHome({ howWeWork: activeTabLang === 'en' ? { ...hww, subtitle: e.target.value } : { ...hww, subtitleBn: e.target.value } })} placeholder="From urgent inquiries..." className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-[#1E1B4B]">4-Step Process Sequence</h3>
              <div className="space-y-3">
                {hww.steps.slice(0, 4).map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6E56CF] font-bold flex items-center justify-center shrink-0 border border-purple-100">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={activeTabLang === 'en' ? step.title : (step.titleBn || '')}
                        onChange={e => {
                          const nextSteps = [...hww.steps];
                          nextSteps[idx] = { ...nextSteps[idx], ...(activeTabLang === 'en' ? { title: e.target.value } : { titleBn: e.target.value }) };
                          patchHome({ howWeWork: { ...hww, steps: nextSteps } });
                        }}
                        placeholder={activeTabLang === 'en' ? 'Card Heading' : 'কার্ড শিরোনাম'}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-[#6E56CF] outline-none"
                      />
                      <input
                        type="text"
                        value={activeTabLang === 'en' ? (step.subheading || step.step) : (step.subheadingBn || step.subheading || step.step)}
                        onChange={e => {
                          const nextSteps = [...hww.steps];
                          nextSteps[idx] = { ...nextSteps[idx], ...(activeTabLang === 'en' ? { subheading: e.target.value } : { subheadingBn: e.target.value }) };
                          patchHome({ howWeWork: { ...hww, steps: nextSteps } });
                        }}
                        placeholder={activeTabLang === 'en' ? 'Card Subheading' : 'কার্ড উপ-শিরোনাম'}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-700 focus:border-[#6E56CF] outline-none"
                      />
                      <textarea
                        rows={2}
                        value={activeTabLang === 'en' ? step.description : (step.descriptionBn || '')}
                        onChange={e => {
                          const nextSteps = [...hww.steps];
                          nextSteps[idx] = { ...nextSteps[idx], ...(activeTabLang === 'en' ? { description: e.target.value } : { descriptionBn: e.target.value }) };
                          patchHome({ howWeWork: { ...hww, steps: nextSteps } });
                        }}
                        placeholder={activeTabLang === 'en' ? 'Short Description' : 'সংক্ষিপ্ত বিবরণ'}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-600 focus:border-[#6E56CF] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'home-featured-team':
        const ft = home.featuredTeam || {
          title: 'Featured Researchers',
          titleBn: 'বৈশিষ্ট্যযুক্ত গবেষকবৃন্দ',
          subtitle: 'Scholars leading our empirical research tracks',
          subtitleBn: 'আন্তঃশৃঙ্খলা গবেষক ও অনুসন্ধানী সাংবাদিকরা',
          showOnHome: true,
          featuredMemberIds: ['tm-1', 'tm-2', 'tm-3', 'tm-4']
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div>
                <div className="text-xs font-bold text-[#1E1B4B]">Display Team on Home Page</div>
                <div className="text-[11px] text-slate-500">Enable or disable researcher spotlight • Banner group below</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={ft.showOnHome} onChange={e => patchHome({ featuredTeam: { ...ft, showOnHome: e.target.checked } })} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6E56CF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Section Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Section Title ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? ft.title : (ft.titleBn || '')} onChange={e => patchHome({ featuredTeam: activeTabLang === 'en' ? { ...ft, title: e.target.value } : { ...ft, titleBn: e.target.value } })} placeholder="Featured Researchers" className="w-full bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3 py-2 text-sm font-semibold outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtitle ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <textarea rows={2} value={activeTabLang === 'en' ? ft.subtitle : (ft.subtitleBn || '')} onChange={e => patchHome({ featuredTeam: activeTabLang === 'en' ? { ...ft, subtitle: e.target.value } : { ...ft, subtitleBn: e.target.value } })} placeholder="Scholars leading our empirical tracks" className="w-full bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Featured Researchers</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.team.map(member => {
                  const isChecked = (ft.featuredMemberIds || []).includes(member.id);
                  return (
                    <label
                      key={member.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked ? 'bg-purple-50/70 border-purple-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={e => {
                          const current = ft.featuredMemberIds || [];
                          const next = e.target.checked
                            ? [...current, member.id]
                            : current.filter(id => id !== member.id);
                          patchHome({ featuredTeam: { ...ft, featuredMemberIds: next } });
                        }}
                        className="rounded text-[#6E56CF] focus:ring-[#6E56CF] w-4 h-4 cursor-pointer"
                      />
                      <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{member.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{member.role}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'home-bottom-cta':
        const bcta = home.bottomCta || {
          title: 'Support Independent Media Research',
          titleBn: 'স্বাধীন গণমাধ্যম গবেষণায় সহায়তা করুন',
          narrative: 'Explore open datasets or collaborate with our empirical fellows.',
          narrativeBn: 'উন্মুক্ত ডেটাসেট দেখুন বা আমাদের গবেষক দলের সাথে সহযোগিতা করুন।',
          primaryCtaText: 'Request Dataset Access',
          primaryCtaTextBn: 'ডেটাসেট অ্যাক্সেস অনুরোধ',
          primaryCtaUrl: '/contact',
          secondaryCtaText: 'Download Annual Report',
          secondaryCtaTextBn: 'বার্ষিক প্রতিবেদন ডাউনলোড',
          secondaryCtaUrl: '/publications'
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">CTA Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="space-y-2 lg:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Headline ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? bcta.title : (bcta.titleBn || '')} onChange={e => patchHome({ bottomCta: activeTabLang === 'en' ? { ...bcta, title: e.target.value } : { ...bcta, titleBn: e.target.value } })} placeholder="Support Independent Media Research" className="w-full bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none transition-all" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Narrative ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <textarea rows={3} value={activeTabLang === 'en' ? bcta.narrative : (bcta.narrativeBn || '')} onChange={e => patchHome({ bottomCta: activeTabLang === 'en' ? { ...bcta, narrative: e.target.value } : { ...bcta, narrativeBn: e.target.value } })} placeholder="Explore open datasets..." className="w-full bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm leading-relaxed outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button Text ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? bcta.primaryCtaText : (bcta.primaryCtaTextBn || '')} onChange={e => patchHome({ bottomCta: activeTabLang === 'en' ? { ...bcta, primaryCtaText: e.target.value } : { ...bcta, primaryCtaTextBn: e.target.value } })} placeholder="Request Dataset Access" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#6E56CF]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary URL</label>
                <input type="text" value={bcta.primaryCtaUrl} onChange={e => patchHome({ bottomCta: { ...bcta, primaryCtaUrl: e.target.value } })} placeholder="/contact" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-[#6E56CF]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button Text ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? bcta.secondaryCtaText : (bcta.secondaryCtaTextBn || '')} onChange={e => patchHome({ bottomCta: activeTabLang === 'en' ? { ...bcta, secondaryCtaText: e.target.value } : { ...bcta, secondaryCtaTextBn: e.target.value } })} placeholder="Download Annual Report" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#6E56CF]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary URL</label>
                <input type="text" value={bcta.secondaryCtaUrl} onChange={e => patchHome({ bottomCta: { ...bcta, secondaryCtaUrl: e.target.value } })} placeholder="/publications" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-[#6E56CF]" />
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------
      // ABOUT US APPS
      // -------------------------------------------------------
      case 'about-hero':
        const abHero = about.heroBanner || { title: '', subtext: '', badgeText: '', metadata: '', bgStyle: 'gradient' };
        const heroBnMode = activeTabLang === 'bn';
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg text-xs font-bold ${!heroBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>EN</button>
              <button onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg text-xs font-bold ${heroBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>বাং</button>
            </div>
            {heroBnMode ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Badge Text (BN)</label>
                  <input type="text" value={abHero.badgeTextBn || ''} onChange={e => patchAbout({ heroBanner: { ...abHero, badgeTextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Main Heading (BN)</label>
                  <input type="text" value={abHero.titleBn || ''} onChange={e => patchAbout({ heroBanner: { ...abHero, titleBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtext Narrative (BN)</label>
                  <textarea rows={3} value={abHero.subtextBn || ''} onChange={e => patchAbout({ heroBanner: { ...abHero, subtextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Metadata Tag (BN)</label>
                  <input type="text" value={abHero.metadataBn || ''} onChange={e => patchAbout({ heroBanner: { ...abHero, metadataBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Badge Text</label>
                  <input type="text" value={abHero.badgeText} onChange={e => patchAbout({ heroBanner: { ...abHero, badgeText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Main Heading</label>
                  <input type="text" value={abHero.title} onChange={e => patchAbout({ heroBanner: { ...abHero, title: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtext Narrative</label>
                  <textarea rows={3} value={abHero.subtext} onChange={e => patchAbout({ heroBanner: { ...abHero, subtext: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Metadata Tag</label>
                  <input type="text" value={abHero.metadata || ''} onChange={e => patchAbout({ heroBanner: { ...abHero, metadata: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm" />
                </div>
              </>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Background Image</label>
              <div className="flex items-center gap-3">
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                  <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, bgImage => patchAbout({ heroBanner: { ...abHero, bgImage } })); }} disabled={isImageUploading} />
                </label>
                {abHero.bgImage && (
                  <div className="flex items-center gap-2 shrink-0">
                    <img src={abHero.bgImage} alt="About hero preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                    <button type="button" onClick={() => patchAbout({ heroBanner: { ...abHero, bgImage: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'about-who-we-are':
        const wwa = about.whoWeAre || { foundedYear: '2019', mainPhoto: '', narrative: [] };
        const wwaBnMode = activeTabLang === 'bn';
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg text-xs font-bold ${!wwaBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>EN</button>
              <button onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg text-xs font-bold ${wwaBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>বাং</button>
            </div>
            {wwaBnMode ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Badge Text (BN)</label>
                  <input type="text" value={wwa.badgeTextBn || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, badgeTextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading (BN)</label>
                  <input type="text" value={wwa.headingBn || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, headingBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description (BN)</label>
                  <textarea rows={3} value={wwa.descriptionBn || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, descriptionBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Narrative Paragraphs (BN) — one per line</label>
                  <textarea rows={4} value={(wwa.narrativeBn || []).join('\n')} onChange={e => patchAbout({ whoWeAre: { ...wwa, narrativeBn: e.target.value.split('\n') } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Badge Text</label>
                  <input type="text" value={wwa.badgeText || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, badgeText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
                  <textarea rows={3} value={wwa.description || ''} onChange={e => patchAbout({ whoWeAre: { ...wwa, description: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Narrative Paragraphs — one per line</label>
                  <textarea rows={4} value={(wwa.narrative || []).join('\n')} onChange={e => patchAbout({ whoWeAre: { ...wwa, narrative: e.target.value.split('\n') } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
              </>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Founded Year</label>
                <input type="text" value={wwa.foundedYear} onChange={e => patchAbout({ whoWeAre: { ...wwa, foundedYear: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Main Image</label>
              <div className="flex items-center gap-3">
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                  <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, mainPhoto => patchAbout({ whoWeAre: { ...wwa, mainPhoto } })); }} disabled={isImageUploading} />
                </label>
                {wwa.mainPhoto && (
                  <div className="flex items-center gap-2 shrink-0">
                    <img src={wwa.mainPhoto} alt="Who we are" className="w-full h-40 object-cover rounded-xl border border-slate-200" />
                    <button type="button" onClick={() => patchAbout({ whoWeAre: { ...wwa, mainPhoto: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'about-pillars':
        const pillars = about.missionPillars || [];
        const pillarBnMode = activeTabLang === 'bn';
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Mission & Vision Grid (4 Cards)</h3>
                <p className="text-xs text-slate-500">Our Mission, Our Vision, Our Goal, and Our Practice</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg text-xs font-bold ${!pillarBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>EN</button>
              <button onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg text-xs font-bold ${pillarBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>বাং</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.slice(0, 4).map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-[#6E56CF]">{pillarBnMode ? (pillar.badgeBn || pillar.badge) : pillar.badge}</span>
                  </div>
                  {pillarBnMode ? (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Badge (BN)</label>
                        <input type="text" value={pillar.badgeBn || ''} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], badgeBn: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Index Label (BN)</label>
                        <input type="text" value={pillar.indexLabelBn || ''} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], indexLabelBn: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Heading (BN)</label>
                        <input type="text" value={pillar.titleBn || ''} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], titleBn: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Subheading (BN)</label>
                        <textarea rows={3} value={pillar.descriptionBn || ''} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], descriptionBn: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Badge</label>
                        <input type="text" value={pillar.badge} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], badge: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Index Label</label>
                        <input type="text" value={pillar.indexLabel} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], indexLabel: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Heading</label>
                        <input type="text" value={pillar.title} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], title: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Subheading</label>
                        <textarea rows={3} value={pillar.description} onChange={e => { const next = [...pillars]; next[idx] = { ...next[idx], description: e.target.value }; patchAbout({ missionPillars: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600" />
                      </div>
                    </>
                  )}
                  {idx === 3 && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Practice Image</label>
                      <div className="flex items-center gap-2">
                        <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isImageUploading ? <Loader2 className="w-3 h-3 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-3 h-3" />}
                          <span>{isImageUploading ? '...' : 'Upload'}</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, image => { const next = [...pillars]; next[idx] = { ...next[idx], image }; patchAbout({ missionPillars: next }); }); }} disabled={isImageUploading} />
                        </label>
                        {pillar.image && (
                          <div className="flex items-center gap-1">
                            <img src={pillar.image} alt="Practice preview" className="mt-2 w-full h-28 object-cover rounded-lg" />
                            <button type="button" onClick={() => { const next = [...pillars]; next[idx] = { ...next[idx], image: '' }; patchAbout({ missionPillars: next }); }} disabled={isImageUploading} className="p-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-principles':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Methodological Principles & Protocols</h3>
                <p className="text-xs text-slate-500">Guides our researchers, fellows, and codebook standards</p>
              </div>
            </div>

            <div className="space-y-4">
              {about.principles.map((pr, idx) => (
                <div key={pr.id || idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-purple-50 text-[#6E56CF] font-bold flex items-center justify-center text-xs">
                      {pr.number}
                    </span>
                    <input
                      type="text"
                      value={pr.title}
                      onChange={e => {
                        const next = [...about.principles];
                        next[idx] = { ...next[idx], title: e.target.value };
                        patchAbout({ principles: next });
                      }}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Short Summary</label>
                    <input
                      type="text"
                      value={pr.description}
                      onChange={e => {
                        const next = [...about.principles];
                        next[idx] = { ...next[idx], description: e.target.value };
                        patchAbout({ principles: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Protocol Detail</label>
                    <textarea
                      rows={2}
                      value={pr.detail}
                      onChange={e => {
                        const next = [...about.principles];
                        next[idx] = { ...next[idx], detail: e.target.value };
                        patchAbout({ principles: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-cta':
        const abCta = about.cta || {};
        const ctaBnMode = activeTabLang === 'bn';
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Call to Action Section</h3>
                <p className="text-xs text-slate-500">Footer CTA with badge, title, narrative, and action buttons</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg text-xs font-bold ${!ctaBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>EN</button>
              <button onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg text-xs font-bold ${ctaBnMode ? 'bg-[#6E56CF] text-white' : 'bg-slate-100 text-slate-500'}`}>বাং</button>
            </div>
            {ctaBnMode ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Title (BN)</label>
                  <input type="text" value={abCta.titleBn || ''} onChange={e => patchAbout({ cta: { ...abCta, titleBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Narrative (BN)</label>
                  <textarea rows={3} value={abCta.narrativeBn || ''} onChange={e => patchAbout({ cta: { ...abCta, narrativeBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button (BN)</label>
                    <input type="text" value={abCta.primaryTextBn || ''} onChange={e => patchAbout({ cta: { ...abCta, primaryTextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button (BN)</label>
                    <input type="text" value={abCta.secondaryTextBn || ''} onChange={e => patchAbout({ cta: { ...abCta, secondaryTextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Title</label>
                  <input type="text" value={abCta.title || ''} onChange={e => patchAbout({ cta: { ...abCta, title: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Narrative</label>
                  <textarea rows={3} value={abCta.narrative || ''} onChange={e => patchAbout({ cta: { ...abCta, narrative: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button</label>
                    <input type="text" value={abCta.primaryText || ''} onChange={e => patchAbout({ cta: { ...abCta, primaryText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary URL</label>
                    <input type="text" value={abCta.primaryUrl || ''} onChange={e => patchAbout({ cta: { ...abCta, primaryUrl: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button</label>
                    <input type="text" value={abCta.secondaryText || ''} onChange={e => patchAbout({ cta: { ...abCta, secondaryText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary URL</label>
                    <input type="text" value={abCta.secondaryUrl || ''} onChange={e => patchAbout({ cta: { ...abCta, secondaryUrl: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      // -------------------------------------------------------
      // RESEARCH APPS & DEDICATED BEAT APPS
      // -------------------------------------------------------
      case 'research-hero': {
        const hero = draftResearchPage.hero || INITIAL_CMS_STATE.researchPage.hero;
        return (
          <div className="space-y-6">
            {/* Top Language Switcher */}
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Content Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTabLang('en')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  English (Primary)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabLang('bn')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Eyebrow Badge</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? hero.label : hero.labelBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      hero: { ...hero, [activeTabLang === 'en' ? 'label' : 'labelBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Metadata Subtitle Tag</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? hero.metadata : hero.metadataBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      hero: { ...hero, [activeTabLang === 'en' ? 'metadata' : 'metadataBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Headline</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? hero.title : hero.titleBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      hero: { ...hero, [activeTabLang === 'en' ? 'title' : 'titleBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Description Narrative</label>
                <textarea
                  rows={3}
                  value={activeTabLang === 'en' ? hero.description : hero.descriptionBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      hero: { ...hero, [activeTabLang === 'en' ? 'description' : 'descriptionBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Background Imagery (Hero)</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={hero.backgroundImage || ''}
                    onChange={e =>
                      patchResearchPage({
                        hero: { ...hero, backgroundImage: e.target.value }
                      })
                    }
                    placeholder="https://..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                  <div className="flex items-center gap-2">
                    <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                      <span>{isImageUploading ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, backgroundImage => patchResearchPage({ hero: { ...hero, backgroundImage } }));
                      }} disabled={isImageUploading} />
                    </label>
                    {hero.backgroundImage && (
                      <div className="flex items-center gap-1 shrink-0">
                        <img src={hero.backgroundImage} alt="Hero preview" className="w-16 h-12 object-cover rounded-xl border border-slate-200" />
                        <button type="button" onClick={() => patchResearchPage({ hero: { ...hero, backgroundImage: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'research-areas': {
        const areas = draftResearchPage.areasSection || INITIAL_CMS_STATE.researchPage.areasSection;
        const pills = draftResearchPage.filterPills || INITIAL_CMS_STATE.researchPage.filterPills;
        return (
          <div className="space-y-6">
            {/* Top Language Switcher */}
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Content Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTabLang('en')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  English (Primary)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabLang('bn')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Section Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Section Badge</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? areas.badge : areas.badgeBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        areasSection: { ...areas, [activeTabLang === 'en' ? 'badge' : 'badgeBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Refresh Catalog Button Tooltip</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? areas.refreshTooltip : areas.refreshTooltipBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        areasSection: { ...areas, [activeTabLang === 'en' ? 'refreshTooltip' : 'refreshTooltipBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Main Section Title</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? areas.title : areas.titleBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        areasSection: { ...areas, [activeTabLang === 'en' ? 'title' : 'titleBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Filter Pills Labels</h3>
                <p className="text-xs text-slate-500">Labels rendered inside the horizontal filter button pill bar</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">All Areas Pill (All 6)</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? pills.allLabel : pills.allLabelBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        filterPills: { ...pills, [activeTabLang === 'en' ? 'allLabel' : 'allLabelBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Journalism & Newsrooms Pill</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? pills.journalismLabel : pills.journalismLabelBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        filterPills: { ...pills, [activeTabLang === 'en' ? 'journalismLabel' : 'journalismLabelBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Platforms & AI Pill</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? pills.platformsLabel : pills.platformsLabelBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        filterPills: { ...pills, [activeTabLang === 'en' ? 'platformsLabel' : 'platformsLabelBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Public & Democracy Pill</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? pills.publicLabel : pills.publicLabelBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        filterPills: { ...pills, [activeTabLang === 'en' ? 'publicLabel' : 'publicLabelBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'research-cta': {
        const cta = draftResearchPage.cta || INITIAL_CMS_STATE.researchPage.cta;
        return (
          <div className="space-y-6">
            {/* Top Language Switcher */}
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Content Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTabLang('en')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  English (Primary)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabLang('bn')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">CTA Eyebrow Badge</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? cta.badge : cta.badgeBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, [activeTabLang === 'en' ? 'badge' : 'badgeBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Headline</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? cta.title : cta.titleBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, [activeTabLang === 'en' ? 'title' : 'titleBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description Narrative</label>
                <textarea
                  rows={3}
                  value={activeTabLang === 'en' ? cta.narrative : cta.narrativeBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, [activeTabLang === 'en' ? 'narrative' : 'narrativeBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button Text</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? cta.primaryText : cta.primaryTextBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, [activeTabLang === 'en' ? 'primaryText' : 'primaryTextBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button URL</label>
                <input
                  type="text"
                  value={cta.primaryUrl || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, primaryUrl: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button Text</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? cta.secondaryText : cta.secondaryTextBn || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, [activeTabLang === 'en' ? 'secondaryText' : 'secondaryTextBn']: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button URL</label>
                <input
                  type="text"
                  value={cta.secondaryUrl || ''}
                  onChange={e =>
                    patchResearchPage({
                      cta: { ...cta, secondaryUrl: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        );
      }

      case 'research-pillars':
      case 'research-framework': {
        const header = draftResearchPage.whatOurWorkLooksLike || INITIAL_CMS_STATE.researchPage.whatOurWorkLooksLike;
        return (
          <div className="space-y-6">
            {/* Top Language Switcher */}
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Content Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTabLang('en')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  English (Primary)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabLang('bn')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Operational Modalities Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Eyebrow Badge</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? header.badge : header.badgeBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        whatOurWorkLooksLike: { ...header, [activeTabLang === 'en' ? 'badge' : 'badgeBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Section Title</label>
                  <input
                    type="text"
                    value={activeTabLang === 'en' ? header.title : header.titleBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        whatOurWorkLooksLike: { ...header, [activeTabLang === 'en' ? 'title' : 'titleBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Section Description</label>
                  <textarea
                    rows={2}
                    value={activeTabLang === 'en' ? header.description : header.descriptionBn || ''}
                    onChange={e =>
                      patchResearchPage({
                        whatOurWorkLooksLike: { ...header, [activeTabLang === 'en' ? 'description' : 'descriptionBn']: e.target.value }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">4 Operational Pillars</h3>
                  <p className="text-xs text-slate-500">Research, Analysis, Monitoring, Insights process pillars</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draftPillars.map((pillar, idx) => (
                  <div key={pillar.id || idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#0B2A20] text-[#D2F843]">
                        PILLAR {pillar.step}
                      </span>
                      <span className="text-xs font-mono text-slate-400 uppercase">{pillar.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Title</label>
                        <input
                          type="text"
                          value={activeTabLang === 'en' ? pillar.title : pillar.titleBn || ''}
                          onChange={e => {
                            const updated = [...draftPillars];
                            updated[idx] = {
                              ...pillar,
                              [activeTabLang === 'en' ? 'title' : 'titleBn']: e.target.value
                            };
                            patchPillars(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={activeTabLang === 'en' ? pillar.subtitle : pillar.subtitleBn || ''}
                          onChange={e => {
                            const updated = [...draftPillars];
                            updated[idx] = {
                              ...pillar,
                              [activeTabLang === 'en' ? 'subtitle' : 'subtitleBn']: e.target.value
                            };
                            patchPillars(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={activeTabLang === 'en' ? pillar.description : pillar.descriptionBn || ''}
                        onChange={e => {
                          const updated = [...draftPillars];
                          updated[idx] = {
                            ...pillar,
                            [activeTabLang === 'en' ? 'description' : 'descriptionBn']: e.target.value
                          };
                          patchPillars(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Core Outputs (Highlights, comma-separated)
                      </label>
                      <input
                        type="text"
                        value={
                          activeTabLang === 'en'
                            ? (pillar.highlights || []).join(', ')
                            : (pillar.highlightsBn || []).join(', ')
                        }
                        onChange={e => {
                          const updated = [...draftPillars];
                          const items = e.target.value.split(',').map(s => s.trim());
                          updated[idx] = {
                            ...pillar,
                            [activeTabLang === 'en' ? 'highlights' : 'highlightsBn']: items
                          };
                          patchPillars(updated);
                        }}
                        placeholder="Comma-separated items"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Dedicated Research Beat App Editor
      case 'beat-media-journalism':
      case 'beat-digital-media':
      case 'beat-media-monitoring':
      case 'beat-public-opinion':
      case 'beat-media-democracy':
      case 'beat-technology-ai':
        const beatSlug = appId.replace('beat-', '');
        const beat = state.researchBeats[beatSlug];
        if (!beat) {
          return <div className="p-4 text-slate-500">Research Beat not found.</div>;
        }

        return (
          <div className="space-y-8">
            {/* Beat Top Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Beat Name</label>
                <input
                  type="text"
                  value={beat.name}
                  onChange={e => updateResearchBeat(beat.id, { ...beat, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Status Tag</label>
                <input
                  type="text"
                  value={beat.status}
                  onChange={e => updateResearchBeat(beat.id, { ...beat, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Tagline</label>
                <input
                  type="text"
                  value={beat.tagline}
                  onChange={e => updateResearchBeat(beat.id, { ...beat, tagline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Image Asset URL</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={beat.image}
                    onChange={e => updateResearchBeat(beat.id, { ...beat, image: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                  {beat.image && (
                    <img src={beat.image} alt={beat.name} className="w-16 h-12 object-cover rounded-xl border border-slate-200" />
                  )}
                </div>
              </div>
            </div>

            {/* 4 Beat Metrics */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-[#1E1B4B] mb-3">Beat Telemetry Metrics Bar ({beat.metrics.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {beat.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={m.value}
                        onChange={e => {
                          const next = [...beat.metrics];
                          next[idx] = { ...next[idx], value: e.target.value };
                          updateResearchBeat(beat.id, { ...beat, metrics: next });
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold"
                        placeholder="Value (e.g. 48 Outlets)"
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={e => {
                          const next = [...beat.metrics];
                          next[idx] = { ...next[idx], label: e.target.value };
                          updateResearchBeat(beat.id, { ...beat, metrics: next });
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold"
                        placeholder="Metric Label"
                      />
                    </div>
                    <input
                      type="text"
                      value={m.detail}
                      onChange={e => {
                        const next = [...beat.metrics];
                        next[idx] = { ...next[idx], detail: e.target.value };
                        updateResearchBeat(beat.id, { ...beat, metrics: next });
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-500"
                      placeholder="Detail"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Brief & Overview */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Executive Brief & Scope</h3>
              {beat.overview.map((para, idx) => (
                <textarea
                  key={idx}
                  rows={3}
                  value={para}
                  onChange={e => {
                    const next = [...beat.overview];
                    next[idx] = e.target.value;
                    updateResearchBeat(beat.id, { ...beat, overview: next });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed text-slate-800"
                />
              ))}
            </div>

            {/* Methodology Details */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Methodological Protocols ({beat.methodologyDetails.length})</h3>
              <div className="space-y-3">
                {beat.methodologyDetails.map((proto, idx) => (
                  <div key={proto.id || idx} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                    <input
                      type="text"
                      value={proto.title}
                      onChange={e => {
                        const next = [...beat.methodologyDetails];
                        next[idx] = { ...next[idx], title: e.target.value };
                        updateResearchBeat(beat.id, { ...beat, methodologyDetails: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                    />
                    <textarea
                      rows={2}
                      value={proto.description}
                      onChange={e => {
                        const next = [...beat.methodologyDetails];
                        next[idx] = { ...next[idx], description: e.target.value };
                        updateResearchBeat(beat.id, { ...beat, methodologyDetails: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------
      // TEAMS PAGE APPS
      // -------------------------------------------------------
      case 'teams-hero':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Headline</label>
              <input
                type="text"
                defaultValue="Research Fellows & Observatory Directorate"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Introductory Statement</label>
              <textarea
                rows={3}
                defaultValue="An interdisciplinary institute uniting quantitative data scientists, investigative reporters, and legal scholars tracking media autonomy."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed"
              />
            </div>
          </div>
        );

      case 'teams-leadership':
      case 'teams-researchers':
      case 'teams-advisory':
        const targetCategory =
          appId === 'teams-leadership' ? 'leadership' : appId === 'teams-researchers' ? 'research' : 'advisory';
        const members = state.team.filter(m => {
          if (targetCategory === 'leadership') return m.category.toLowerCase().includes('leadership') || m.role.toLowerCase().includes('director');
          if (targetCategory === 'advisory') return m.category.toLowerCase().includes('advisory');
          return !m.category.toLowerCase().includes('leadership') && !m.category.toLowerCase().includes('advisory');
        });

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">
                  {targetCategory === 'leadership' ? 'Executive Directorate' : targetCategory === 'advisory' ? 'Scientific Advisory Board' : 'Researchers & Fellows'} ({members.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newMember: TeamMember = {
                    id: crypto.randomUUID(),
                    name: 'Dr. New Scholar',
                    role: targetCategory === 'leadership' ? 'Director of Research' : 'Investigative Fellow',
                    category: targetCategory,
                    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                    bio: 'Empirical researcher focusing on media verification.',
                    email: 'scholar@mediaresearch.org'
                  };
                  addTeamMember(newMember);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-[#6E56CF] hover:bg-purple-100 text-xs font-semibold cursor-pointer border border-purple-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map(member => (
                <div key={member.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => deleteTeamMember(member.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={member.name}
                        onChange={e => updateTeamMember({ ...member, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                        placeholder="Full Name"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={e => updateTeamMember({ ...member, role: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-600"
                        placeholder="Designation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={e => updateTeamMember({ ...member, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Photo URL</label>
                      <input
                        type="text"
                        value={member.image}
                        onChange={e => updateTeamMember({ ...member, image: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Bio Summary</label>
                    <textarea
                      rows={2}
                      value={member.bio}
                      onChange={e => updateTeamMember({ ...member, bio: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // -------------------------------------------------------
      // CONTACT US APPS
      // -------------------------------------------------------
      case 'contact-hero':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Content Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'}`}>বাংলা</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Badge ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <input type="text" value={activeTabLang === 'en' ? contact.hero.badge || '' : (contact.hero.badgeBn || '')} onChange={e => patchContact({ hero: { ...contact.hero, [activeTabLang === 'en' ? 'badge' : 'badgeBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" placeholder={activeTabLang === 'en' ? 'CONTACT' : 'যোগাযোগ ও অনুসন্ধান'} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <input type="text" value={activeTabLang === 'en' ? contact.hero.heading : (contact.hero.headingBn || '')} onChange={e => patchContact({ hero: { ...contact.hero, [activeTabLang === 'en' ? 'heading' : 'headingBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" placeholder={activeTabLang === 'en' ? "Let's Start a Conversation." : 'আমাদের সাথে যোগাযোগ করুন'} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtitle ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <textarea rows={3} value={activeTabLang === 'en' ? contact.hero.subtitle : (contact.hero.subtitleBn || '')} onChange={e => patchContact({ hero: { ...contact.hero, [activeTabLang === 'en' ? 'subtitle' : 'subtitleBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" placeholder={activeTabLang === 'en' ? 'Direct communication channels for academic researchers...' : 'গবেষক, সাংবাদিক ও অংশীদারদের জন্য আমাদের যোগাযোগের দরজা সর্বদা উন্মুক্ত।'} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Image</label>
              <div className="flex items-center gap-3">
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                  <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, bgImage => patchContact({ hero: { ...contact.hero, bgImage } }));
                  }} disabled={isImageUploading} />
                </label>
                {contact.hero.bgImage && (
                  <div className="flex items-center gap-2 shrink-0">
                    <img src={contact.hero.bgImage} alt="Contact hero preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                    <button type="button" onClick={() => patchContact({ hero: { ...contact.hero, bgImage: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Metadata ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
              <input type="text" value={activeTabLang === 'en' ? contact.hero.metadata || '' : (contact.hero.metadataBn || '')} onChange={e => patchContact({ hero: { ...contact.hero, [activeTabLang === 'en' ? 'metadata' : 'metadataBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Direct Communications & Field Office' : 'সরাসরি যোগাযোগ ও সচিবালয়'} />
            </div>
          </div>
        );

      case 'contact-details':
        const cd = contact.directDetails;
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Contact Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'}`}>বাংলা</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Telephone Line 1 ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? (cd.phoneLabel || 'Main Secretariat') : (cd.phoneLabelBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'phoneLabel' : 'phoneLabelBn']: e.target.value } })} className="w-full mb-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Line title' : 'লাইনের নাম'} />
                <input type="text" value={activeTabLang === 'en' ? cd.phone : (cd.phoneBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'phone' : 'phoneBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? '+880 2 984 5512' : '+৮৮০ ২ ৯৮৪ ৫৫১২'} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Telephone Line 2 ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? (cd.tollFreePhoneLabel || 'Research Desk & Media') : (cd.tollFreePhoneLabelBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'tollFreePhoneLabel' : 'tollFreePhoneLabelBn']: e.target.value } })} className="w-full mb-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Line title' : 'লাইনের নাম'} />
                <input type="text" value={activeTabLang === 'en' ? cd.tollFreePhone : (cd.tollFreePhoneBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'tollFreePhone' : 'tollFreePhoneBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? '+880 171 000 9821' : '+৮৮০ ১৭১ ০০০ ৯৮২১'} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="email" value={activeTabLang === 'en' ? cd.supportEmail : (cd.supportEmailBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'supportEmail' : 'supportEmailBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'info@mediaresearch.org' : 'info@mediaresearch.org'} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Working Hours ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? cd.workingHours : (cd.workingHoursBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'workingHours' : 'workingHoursBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Sunday – Thursday: 09:00 – 17:30 BST' : 'রবিবার – বৃহস্পতিবার: সকাল ০৯:০০ – বিকাল ১৭:৩০ (বিএসটি)'} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secretariat Address ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? cd.officeLocation : (cd.officeLocationBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'officeLocation' : 'officeLocationBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212' : 'লেভেল ৭, প্রেস অ্যান্ড রিসার্চ টাওয়ার, ৪২ গুলশান অ্যাভিনিউ, ঢাকা ১২১২'} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Google Maps / Directions Link</label>
              <input type="text" value={cd.googleMapsUrl || ''} onChange={e => patchContact({ directDetails: { ...cd, googleMapsUrl: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="https://maps.google.com/?q=Gulshan+Avenue+Dhaka" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Support Email Label ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? cd.supportEmailLabel || '' : (cd.supportEmailLabelBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'supportEmailLabel' : 'supportEmailLabelBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Official Email' : 'অফিসিয়াল ইমেইল'} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Research Desk Email ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="email" value={activeTabLang === 'en' ? cd.researchDeskEmail || '' : (cd.researchDeskEmailBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'researchDeskEmail' : 'researchDeskEmailBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'research@mediaresearch.org' : 'রিসার্চ ডেস্ক ইমেইল'} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Research Desk Email Label ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? cd.researchDeskEmailLabel || '' : (cd.researchDeskEmailLabelBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'researchDeskEmailLabel' : 'researchDeskEmailLabelBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Research Desk' : 'গবেষণা ডেস্ক'} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Press Email ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="email" value={activeTabLang === 'en' ? cd.pressEmail || '' : (cd.pressEmailBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'pressEmail' : 'pressEmailBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'press@mediaresearch.org' : 'প্রেস ইমেইল'} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Press Email Label ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? cd.pressEmailLabel || '' : (cd.pressEmailLabelBn || '')} onChange={e => patchContact({ directDetails: { ...cd, [activeTabLang === 'en' ? 'pressEmailLabel' : 'pressEmailLabelBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Press Desk' : 'প্রেস ডেস্ক'} />
              </div>
            </div>
          </div>
        );

      case 'contact-messages':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Contact Messages ({state.inquiries.length})</h3>
                <p className="text-xs text-slate-500">Messages submitted from the website Contact Us page</p>
              </div>
            </div>
            <div className="space-y-3">
              {state.inquiries.length === 0 && <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">No contact messages have been received yet.</div>}
              {state.inquiries.map(inq => (
                <div key={inq.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-slate-800">{inq.name}</div>
                      <div className="text-xs text-slate-500">{inq.organization || 'No organization'} · {inq.email}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-400">{inq.date}</span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#6E56CF] font-semibold uppercase">{inq.status}</span>
                      <button
                        type="button"
                        onClick={() => setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#6E56CF] hover:bg-purple-50"
                        title="View message details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-700">{inq.topic}</div>
                  {expandedInquiryId === inq.id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div><span className="font-semibold text-slate-700">Email:</span> {inq.email}</div>
                      <div><span className="font-semibold text-slate-700">Organization:</span> {inq.organization || 'Not provided'}</div>
                      <div><span className="font-semibold text-slate-700">Message:</span></div>
                      <p className="leading-relaxed whitespace-pre-wrap bg-slate-50 rounded-lg p-3">{inq.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

        /*
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1E1B4B]">Recent Inquiries Received ({state.inquiries.length})</h3>
              </div>
              <div className="space-y-2">
                {state.inquiries.map(inq => (
                  <div key={inq.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        <span>{inq.name}</span>
                        <span className="text-slate-400 font-normal">({inq.organization})</span>
                      </div>
                      <div className="text-slate-600 mt-1">{inq.topic}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400">{inq.date}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-50 text-[#6E56CF] uppercase">
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */

      case 'contact-faqs':
        const faqs = contact.faqs || [];
        const fqs = contact.faqSection || { badge: 'KNOWLEDGE BASE & PROTOCOLS', badgeBn: 'উন্মুক্ত প্রশ্নোত্তর ও তথ্যভাণ্ডার', title: 'Frequently Asked Questions', titleBn: 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)', subtitle: 'Essential guidelines regarding our research standards, open datasets, peer review protocols, and public inquiry workflows.', subtitleBn: '' };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">FAQ Language Mode</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500 hover:text-slate-800'}`}>বাংলা</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Badge ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? fqs.badge || '' : (fqs.badgeBn || '')} onChange={e => patchContact({ faqSection: { ...fqs, [activeTabLang === 'en' ? 'badge' : 'badgeBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'KNOWLEDGE BASE & PROTOCOLS' : 'উন্মুক্ত প্রশ্নোত্তর ও তথ্যভাণ্ডার'} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Title ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? fqs.title || '' : (fqs.titleBn || '')} onChange={e => patchContact({ faqSection: { ...fqs, [activeTabLang === 'en' ? 'title' : 'titleBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" placeholder={activeTabLang === 'en' ? 'Frequently Asked Questions' : 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)'} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Subtitle ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                <input type="text" value={activeTabLang === 'en' ? fqs.subtitle || '' : (fqs.subtitleBn || '')} onChange={e => patchContact({ faqSection: { ...fqs, [activeTabLang === 'en' ? 'subtitle' : 'subtitleBn']: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder={activeTabLang === 'en' ? 'Essential guidelines regarding our research standards...' : ''} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">FAQ Accordion Items ({faqs.length})</h3>
                <p className="text-xs text-slate-500">Frequently answered inquiries on datasets, methodology, licensing, ethics & partnerships</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newFaq: FaqItem = {
                    id: 'faq-' + Date.now(),
                    category: 'resources',
                    categoryLabel: 'Public Resources',
                    question: 'New Inquiry Question?',
                    answer: 'Explanation and answering protocol text here.',
                    highlights: ['100% open-access resource', 'Methodological audit log available']
                  };
                  patchContact({ faqs: [...faqs, newFaq] });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-[#6E56CF] hover:bg-purple-100 text-xs font-semibold cursor-pointer border border-purple-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={faq.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Category Label ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                    <input type="text" value={activeTabLang === 'en' ? faq.categoryLabel || '' : (faq.categoryLabelBn || '')} onChange={e => { const next = [...faqs]; next[idx] = { ...next[idx], [activeTabLang === 'en' ? 'categoryLabel' : 'categoryLabelBn']: e.target.value }; patchContact({ faqs: next }); }} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800" placeholder={activeTabLang === 'en' ? 'Resources' : 'রিসোর্স'} />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = faqs.filter((_, i) => i !== idx);
                      patchContact({ faqs: next });
                    }}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Question ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                    <input
                      type="text"
                      value={activeTabLang === 'en' ? faq.question : (faq.questionBn || '')}
                      onChange={e => {
                        const next = [...faqs];
                        next[idx] = { ...next[idx], [activeTabLang === 'en' ? 'question' : 'questionBn']: e.target.value };
                        patchContact({ faqs: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                      placeholder={activeTabLang === 'en' ? 'Question Text' : 'প্রশ্নের বাংলা রূপ'}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Detailed Answer ({activeTabLang === 'en' ? 'EN' : 'BN'})</label>
                    <textarea
                      rows={3}
                      value={activeTabLang === 'en' ? faq.answer : (faq.answerBn || '')}
                      onChange={e => {
                        const next = [...faqs];
                        next[idx] = { ...next[idx], [activeTabLang === 'en' ? 'answer' : 'answerBn']: e.target.value };
                        patchContact({ faqs: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 leading-relaxed"
                      placeholder={activeTabLang === 'en' ? 'Answer Text' : 'বাংলা বিস্তারিত উত্তর'}
                    />
                  </div>

                  {activeTabLang === 'en' ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Highlights / Bullets</label>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...faqs];
                            const curH = next[idx].highlights || [];
                            next[idx] = { ...next[idx], highlights: [...curH, 'New highlight key point'] };
                            patchContact({ faqs: next });
                          }}
                          className="text-[11px] text-[#6E56CF] hover:underline font-semibold cursor-pointer"
                        >
                          + Add Bullet
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(faq.highlights || []).map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6E56CF] shrink-0" />
                            <input
                              type="text"
                              value={hl}
                              onChange={e => {
                                const next = [...faqs];
                                const curH = [...(next[idx].highlights || [])];
                                curH[hIdx] = e.target.value;
                                next[idx] = { ...next[idx], highlights: curH };
                                patchContact({ faqs: next });
                              }}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700"
                              placeholder="Key highlight bullet..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...faqs];
                                const curH = (next[idx].highlights || []).filter((_, i) => i !== hIdx);
                                next[idx] = { ...next[idx], highlights: curH };
                                patchContact({ faqs: next });
                              }}
                              className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Highlights / Bullets (বাংলা)</label>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...faqs];
                            const curH = next[idx].highlightsBn || [];
                            next[idx] = { ...next[idx], highlightsBn: [...curH, 'নতুন বুলেট পয়েন্ট'] };
                            patchContact({ faqs: next });
                          }}
                          className="text-[11px] text-[#6E56CF] hover:underline font-semibold cursor-pointer"
                        >
                          + Add Bullet
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(faq.highlightsBn || []).map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6E56CF] shrink-0" />
                            <input
                              type="text"
                              value={hl}
                              onChange={e => {
                                const next = [...faqs];
                                const curH = [...(next[idx].highlightsBn || [])];
                                curH[hIdx] = e.target.value;
                                next[idx] = { ...next[idx], highlightsBn: curH };
                                patchContact({ faqs: next });
                              }}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700"
                              placeholder="বাংলা হাইলাইট বুলেট..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...faqs];
                                const curH = (next[idx].highlightsBn || []).filter((_, i) => i !== hIdx);
                                next[idx] = { ...next[idx], highlightsBn: curH };
                                patchContact({ faqs: next });
                              }}
                              className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      // -------------------------------------------------------
      // FOOTER & GLOBAL BRANDING APPS
      // -------------------------------------------------------
      case 'branding-header':
        const hb = settings.headerBranding || {
          lightLogoText: settings.siteName,
          tagline: settings.siteSubtitle,
          navCtaText: 'Explore Research',
          navCtaUrl: '/research',
          announcementBannerText: 'New 2026 National Media Trust Barometer Published',
          enableBanner: true
        };
        const footerBrand = settings.footerBranding || {
          footerLogoText: settings.siteName,
          tagline: 'Short description about the institute and its work.',
          copyrightNotice: 'Established 2019 · Dhaka & Global Partner Observatories',
          licenseNotice: 'All research content is licensed under a Creative Commons Attribution 4.0 International License.'
        };
        const updateBrandingImage = (file: File | undefined, target: 'header' | 'footer') => {
          if (!file) return;
          handleImageUpload(file, image => {
            if (target === 'header') {
              patchSettings({ headerBranding: { ...hb, logoUrl: image } });
            } else {
              patchSettings({ footerBranding: { ...footerBrand, logoUrl: image } });
            }
          });
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Header Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Header Branding</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Header Logo Image</label>
                <div className="flex items-center gap-3">
                  <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                    <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => updateBrandingImage(e.target.files?.[0], 'header')} disabled={isImageUploading} />
                  </label>
                  {hb.logoUrl && (
                    <div className="flex items-center gap-2 shrink-0">
                      <img src={hb.logoUrl} alt="Header logo preview" className="h-14 max-w-xs object-contain border border-slate-200 rounded-lg p-2 bg-white" />
                      <button type="button" onClick={() => patchSettings({ headerBranding: { ...hb, logoUrl: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove logo">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Header Logo Text ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
                <input type="text" value={activeTabLang === 'en' ? (hb.lightLogoText || '') : (hb.lightLogoTextBn || '')} onChange={e => patchSettings({ headerBranding: { ...hb, ...(activeTabLang === 'en' ? { lightLogoText: e.target.value } : { lightLogoTextBn: e.target.value }) } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="space-y-4 pt-5 border-t border-slate-100">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Footer Branding</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Logo Image</label>
                <div className="flex items-center gap-3">
                  <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isImageUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-4 h-4" />}
                    <span>{isImageUploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => updateBrandingImage(e.target.files?.[0], 'footer')} disabled={isImageUploading} />
                  </label>
                  {footerBrand.logoUrl && (
                    <div className="flex items-center gap-2 shrink-0">
                      <img src={footerBrand.logoUrl} alt="Footer logo preview" className="h-14 max-w-xs object-contain border border-slate-200 rounded-lg p-2 bg-white" />
                      <button type="button" onClick={() => patchSettings({ footerBranding: { ...footerBrand, logoUrl: '' } })} disabled={isImageUploading} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove logo">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Logo Text ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
                <input type="text" value={activeTabLang === 'en' ? (footerBrand.footerLogoText || '') : (footerBrand.footerLogoTextBn || '')} onChange={e => patchSettings({ footerBranding: { ...footerBrand, ...(activeTabLang === 'en' ? { footerLogoText: e.target.value } : { footerLogoTextBn: e.target.value }) } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Short Description ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
                <textarea rows={3} value={activeTabLang === 'en' ? (footerBrand.tagline || '') : (footerBrand.taglineBn || '')} onChange={e => patchSettings({ footerBranding: { ...footerBrand, ...(activeTabLang === 'en' ? { tagline: e.target.value } : { taglineBn: e.target.value }) } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Copyright Text ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
                <input type="text" value={activeTabLang === 'en' ? (footerBrand.copyrightNotice || '') : (footerBrand.copyrightNoticeBn || '')} onChange={e => patchSettings({ footerBranding: { ...footerBrand, ...(activeTabLang === 'en' ? { copyrightNotice: e.target.value } : { copyrightNoticeBn: e.target.value }) } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="Established 2019 · Dhaka & Global Partner Observatories" />
              </div>
            </div>
            <div className="hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Header Logo Text</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? (hb.lightLogoText || '') : (hb.lightLogoTextBn || '')}
                  onChange={e => patchSettings({ headerBranding: { ...hb, ...(activeTabLang === 'en' ? { lightLogoText: e.target.value } : { lightLogoTextBn: e.target.value }) } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Tagline</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? (hb.tagline || '') : (hb.taglineBn || '')}
                  onChange={e => patchSettings({ headerBranding: { ...hb, ...(activeTabLang === 'en' ? { tagline: e.target.value } : { taglineBn: e.target.value }) } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Navbar CTA Button Text</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? (hb.navCtaText || '') : (hb.navCtaTextBn || '')}
                  onChange={e => patchSettings({ headerBranding: { ...hb, ...(activeTabLang === 'en' ? { navCtaText: e.target.value } : { navCtaTextBn: e.target.value }) } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Navbar CTA URL</label>
                <input
                  type="text"
                  value={hb.navCtaUrl}
                  onChange={e => patchSettings({ headerBranding: { ...hb, navCtaUrl: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Announcement Banner</label>
              <input
                type="text"
                value={activeTabLang === 'en' ? (hb.announcementBannerText || '') : (hb.announcementBannerTextBn || '')}
                onChange={e => patchSettings({ headerBranding: { ...hb, ...(activeTabLang === 'en' ? { announcementBannerText: e.target.value } : { announcementBannerTextBn: e.target.value }) } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            </div>
          </div>
        );

      case 'branding-footer': {
        const fb = settings.footerBranding || {};
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Footer Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Logo / Title ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
              <input
                type="text"
                value={activeTabLang === 'en' ? (fb.footerLogoText || '') : (fb.footerLogoTextBn || '')}
                onChange={e => patchSettings({ footerBranding: { ...fb, ...(activeTabLang === 'en' ? { footerLogoText: e.target.value } : { footerLogoTextBn: e.target.value }) } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Mission Statement ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
              <textarea
                rows={3}
                value={activeTabLang === 'en' ? (fb.tagline || '') : (fb.taglineBn || '')}
                onChange={e => patchSettings({ footerBranding: { ...fb, ...(activeTabLang === 'en' ? { tagline: e.target.value } : { taglineBn: e.target.value }) } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Copyright Statement ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? (fb.copyrightNotice || '') : (fb.copyrightNoticeBn || '')}
                  onChange={e => patchSettings({ footerBranding: { ...fb, ...(activeTabLang === 'en' ? { copyrightNotice: e.target.value } : { copyrightNoticeBn: e.target.value }) } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Open Access License ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
                <input
                  type="text"
                  value={activeTabLang === 'en' ? (fb.licenseNotice || '') : (fb.licenseNoticeBn || '')}
                  onChange={e => patchSettings({ footerBranding: { ...fb, ...(activeTabLang === 'en' ? { licenseNotice: e.target.value } : { licenseNoticeBn: e.target.value }) } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          </div>
        );
      }

      case 'branding-links':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-[#1E1B4B]">Social Media Handles</h3>
                <button
                  type="button"
                  onClick={() => {
                    const name = window.prompt('Enter the social network name');
                    if (!name?.trim()) return;
                    const key = name.trim().toLowerCase().replace(/\s+/g, '-');
                    patchSettings({ socialLinks: { ...settings.socialLinks, [key]: '' } });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-[#6E56CF] hover:bg-purple-100 text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Social Link
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(settings.socialLinks || {}).map(([network, url]) => (
                  <div key={network} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{network}</label>
                    <input
                      type="text"
                      value={(url as string) || ''}
                      onChange={e => {
                        patchSettings({
                          socialLinks: { ...settings.socialLinks, [network]: e.target.value }
                        });
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        );

      case 'home-ticker': {
        const ticker = home.ticker || { items: ['MEDIA RESEARCH', 'JOURNALISM RECOVERY'], itemsBn: [], speedSec: 25 };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#6E56CF]" />
                <span className="text-xs font-semibold text-slate-700">Ticker Language</span>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Marquee Speed (seconds for 50% scroll)</label>
              <input type="number" value={ticker.speedSec || 25} onChange={e => patchHome({ ticker: { ...ticker, speedSec: Number(e.target.value) } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ticker Items ({activeTabLang === 'en' ? 'English' : 'Bangla'})</label>
              {(activeTabLang === 'en' ? ticker.items : (ticker.itemsBn || [])).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" value={item} onChange={e => {
                    const arr = [...(activeTabLang === 'en' ? ticker.items : (ticker.itemsBn || []))];
                    arr[idx] = e.target.value;
                    if (activeTabLang === 'en') patchHome({ ticker: { ...ticker, items: arr } });
                    else patchHome({ ticker: { ...ticker, itemsBn: arr } });
                  }} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
                  <button type="button" onClick={() => {
                    if (activeTabLang === 'en') patchHome({ ticker: { ...ticker, items: ticker.items.filter((_, i) => i !== idx) } });
                    else patchHome({ ticker: { ...ticker, itemsBn: (ticker.itemsBn || []).filter((_, i) => i !== idx) } });
                  }} className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button type="button" onClick={() => {
                if (activeTabLang === 'en') patchHome({ ticker: { ...ticker, items: [...ticker.items, 'New Item'] } });
                else patchHome({ ticker: { ...ticker, itemsBn: [...(ticker.itemsBn || []), 'নতুন আইটেম'] } });
              }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-[#6E56CF] text-xs font-bold border border-purple-100 cursor-pointer"><Plus className="w-4 h-4" /> Add Item</button>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-800">Tip: Keep 6-8 items for smooth infinite scroll. Bangla items will be shown when language is BN, otherwise English.</div>
          </div>
        );
      }

      case 'home-who-we-are-home': {
        const wwh = home.whoWeAreHome || {
          badge: 'WHO WE ARE',
          badgeBn: 'আমাদের পরিচিতি',
          indexLabel: '01 / 05',
          indexLabelBn: '০১ / ০৫',
          heading: 'Researching the Media.',
          headingBn: 'গণমাধ্যম নিয়ে গবেষণা।',
          headingAccent: 'Understanding Its Impact.',
          headingAccentBn: 'সামাজিক প্রভাবের বিশ্লেষণ।',
          description: 'is an independent media research organization focused on understanding the changing landscape of media, journalism, and information.',
          descriptionBn: 'একটি স্বাধীন গণমাধ্যম গবেষণা প্রতিষ্ঠান যা গণমাধ্যম, সাংবাদিকতা ও তথ্য ব্যবস্থার পরিবর্তনশীল গতিশীলতা নিয়ে কাজ করে।',
          secondaryDescription: 'Through research, monitoring, and analysis, we examine how information is produced, distributed, consumed, and understood in a rapidly changing digital environment.',
          secondaryDescriptionBn: 'গবেষণা, নিবিড় নিরীক্ষণ ও বিশ্লেষণের মাধ্যমে আমরা খতিয়ে দেখি কীভাবে দ্রুত পরিবর্তনশীল ডিজিটাল বিশ্বে তথ্য উৎপাদিত, পরিবেশিত ও জনমানসে গৃহীত হয়।',
          badgeText: 'INDEPENDENT RESEARCH · EVIDENCE-DRIVEN',
          badgeTextBn: 'স্বাধীন গবেষণা · তথ্য-প্রমাণ নির্ভর',
          ctaText: 'Discover Our Organization',
          ctaTextBn: 'আমাদের সম্পর্কে জানুন',
          ctaUrl: '/about'
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Content Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Badge</label><input type="text" value={activeTabLang === 'en' ? wwh.badge : (wwh.badgeBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, badge: e.target.value } : { ...wwh, badgeBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Index Label</label><input type="text" value={activeTabLang === 'en' ? wwh.indexLabel : (wwh.indexLabelBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, indexLabel: e.target.value } : { ...wwh, indexLabelBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Heading</label><input type="text" value={activeTabLang === 'en' ? wwh.heading : (wwh.headingBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, heading: e.target.value } : { ...wwh, headingBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Heading Accent</label><input type="text" value={activeTabLang === 'en' ? wwh.headingAccent : (wwh.headingAccentBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, headingAccent: e.target.value } : { ...wwh, headingAccentBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#195642]" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold text-slate-700 uppercase">Primary Description (after IPA name)</label><textarea rows={2} value={activeTabLang === 'en' ? wwh.description : (wwh.descriptionBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, description: e.target.value } : { ...wwh, descriptionBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold text-slate-700 uppercase">Secondary Description</label><textarea rows={3} value={activeTabLang === 'en' ? wwh.secondaryDescription : (wwh.secondaryDescriptionBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, secondaryDescription: e.target.value } : { ...wwh, secondaryDescriptionBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Badge Text</label><input type="text" value={activeTabLang === 'en' ? wwh.badgeText : (wwh.badgeTextBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, badgeText: e.target.value } : { ...wwh, badgeTextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">CTA Text</label><input type="text" value={activeTabLang === 'en' ? wwh.ctaText : (wwh.ctaTextBn || '')} onChange={e => patchHome({ whoWeAreHome: activeTabLang === 'en' ? { ...wwh, ctaText: e.target.value } : { ...wwh, ctaTextBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold text-slate-700 uppercase">CTA URL</label><input type="text" value={wwh.ctaUrl} onChange={e => patchHome({ whoWeAreHome: { ...wwh, ctaUrl: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" /></div>
            </div>
          </div>
        );
      }

      case 'home-focus-areas': {
        const fa = home.focusAreas || { label: 'AREAS OF FOCUS', labelBn: 'গবেষণার ক্ষেত্রসমূহ', indexLabel: '03 / 05', title: 'Areas We Explore', titleBn: 'আমরা যেসব ক্ষেত্রে কাজ করি', subtitle: 'Six specialized research domains', subtitleBn: 'সংবাদের বস্তুনিষ্ঠতা নিয়ে নিবেদিত ৬টি ক্ষেত্র', items: [] };
        const items = fa.items && fa.items.length ? fa.items : [];
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Label</label><input type="text" value={activeTabLang === 'en' ? (fa.label || '') : (fa.labelBn || '')} onChange={e => patchHome({ focusAreas: activeTabLang === 'en' ? { ...fa, label: e.target.value } : { ...fa, labelBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-700 uppercase">Index</label><input type="text" value={fa.indexLabel || ''} onChange={e => patchHome({ focusAreas: { ...fa, indexLabel: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold text-slate-700 uppercase">Title</label><input type="text" value={activeTabLang === 'en' ? (fa.title || '') : (fa.titleBn || '')} onChange={e => patchHome({ focusAreas: activeTabLang === 'en' ? { ...fa, title: e.target.value } : { ...fa, titleBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold text-slate-700 uppercase">Subtitle</label><textarea rows={2} value={activeTabLang === 'en' ? (fa.subtitle || '') : (fa.subtitleBn || '')} onChange={e => patchHome({ focusAreas: activeTabLang === 'en' ? { ...fa, subtitle: e.target.value } : { ...fa, subtitleBn: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" /></div>
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-[#1E1B4B]">Focus Area Cards ({items.length})</h3><button type="button" onClick={() => patchHome({ focusAreas: { ...fa, items: [...items, { number: String(items.length + 1).padStart(2, '0'), topic: 'New Focus', topicBn: 'নতুন ক্ষেত্র', description: 'Description', descriptionBn: 'বিবরণ', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', expandedDetails: ['Detail 1'], expandedDetailsBn: ['বিস্তারিত ১'] }] } })} className="px-3 py-1.5 rounded-lg bg-purple-50 text-[#6E56CF] text-xs font-semibold border border-purple-100 cursor-pointer"><Plus className="w-4 h-4 inline mr-1" />Add Card</button></div>
              {items.map((it, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold text-[#6E56CF]">Card {idx + 1} — {it.number}</span><button type="button" onClick={() => patchHome({ focusAreas: { ...fa, items: items.filter((_, i) => i !== idx) } })} className="text-xs text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="text-[10px] font-bold text-slate-500 uppercase">Number</label><input type="text" value={it.number} onChange={e => { const n=[...items]; n[idx]={...n[idx], number:e.target.value}; patchHome({ focusAreas: { ...fa, items: n } }); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs" /></div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Image</label>
                      <div className="flex items-center gap-2">
                        <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isImageUploading ? <Loader2 className="w-3 h-3 animate-spin text-[#6E56CF]" /> : <UploadCloud className="w-3 h-3" />}
                          <span>{isImageUploading ? '...' : 'Upload'}</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => { const f=e.target.files?.[0]; if(f) handleImageUpload(f, img => { const n=[...items]; n[idx]={...n[idx], image:img}; patchHome({ focusAreas: { ...fa, items: n } }); }); }} disabled={isImageUploading} />
                        </label>
                        {it.image && (
                          <button type="button" onClick={() => { const n=[...items]; n[idx]={...n[idx], image:''}; patchHome({ focusAreas: { ...fa, items: n } }); }} disabled={isImageUploading} className="p-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Remove image">
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {it.image && <img src={it.image} alt="Preview" className="w-full h-28 object-cover rounded-lg border" />}
                  <div><label className="text-[10px] font-bold text-slate-500 uppercase">Topic ({activeTabLang})</label><input type="text" value={activeTabLang === 'en' ? it.topic : (it.topicBn || '')} onChange={e => { const n=[...items]; n[idx]={...n[idx], ...(activeTabLang==='en'?{topic:e.target.value}:{topicBn:e.target.value})}; patchHome({ focusAreas: { ...fa, items: n } }); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold" /></div>
                  <div><label className="text-[10px] font-bold text-slate-500 uppercase">Description ({activeTabLang})</label><textarea rows={2} value={activeTabLang === 'en' ? it.description : (it.descriptionBn || '')} onChange={e => { const n=[...items]; n[idx]={...n[idx], ...(activeTabLang==='en'?{description:e.target.value}:{descriptionBn:e.target.value})}; patchHome({ focusAreas: { ...fa, items: n } }); }} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs" /></div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Expanded Details ({activeTabLang})</label>
                    {((activeTabLang === 'en' ? it.expandedDetails : it.expandedDetailsBn) || []).map((d, di) => (
                      <div key={di} className="flex gap-2"><input type="text" value={d} onChange={e => { const n=[...items]; const cur = [...(activeTabLang==='en' ? (n[idx].expandedDetails||[]) : (n[idx].expandedDetailsBn||[]))]; cur[di]=e.target.value; n[idx]={...n[idx], ...(activeTabLang==='en'?{expandedDetails:cur}:{expandedDetailsBn:cur})}; patchHome({ focusAreas: { ...fa, items: n } }); }} className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs" /><button type="button" onClick={() => { const n=[...items]; const cur=(activeTabLang==='en' ? (n[idx].expandedDetails||[]) : (n[idx].expandedDetailsBn||[])).filter((_,i)=>i!==di); n[idx]={...n[idx], ...(activeTabLang==='en'?{expandedDetails:cur}:{expandedDetailsBn:cur})}; patchHome({ focusAreas: { ...fa, items: n } }); }} className="text-red-400"><Trash2 className="w-3 h-3" /></button></div>
                    ))}
                    <button type="button" onClick={() => { const n=[...items]; const cur=[...(activeTabLang==='en' ? (n[idx].expandedDetails||[]) : (n[idx].expandedDetailsBn||[])), activeTabLang==='en'?'New detail':'নতুন বিস্তারিত']; n[idx]={...n[idx], ...(activeTabLang==='en'?{expandedDetails:cur}:{expandedDetailsBn:cur})}; patchHome({ focusAreas: { ...fa, items: n } }); }} className="text-xs text-[#6E56CF] font-semibold cursor-pointer">+ Add Detail</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'branding-navigation': {
        const nav = (settings.navigation && settings.navigation.length ? settings.navigation : [
          { id: 'home', label: 'Home', labelBn: 'হোম', url: '/', order: 1 },
          { id: 'about', label: 'About Us', labelBn: 'আমাদের সম্পর্কে', url: '/about', order: 2 },
          { id: 'work', label: 'Researches', labelBn: 'গবেষণাসমূহ', url: '/work', order: 3 },
          { id: 'team', label: 'Our Team', labelBn: 'আমাদের টিম', url: '/team', order: 4 },
          { id: 'contact', label: 'Contact', labelBn: 'যোগাযোগ', url: '/contact', order: 5 },
        ]);
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#6E56CF]" /><span className="text-xs font-semibold text-slate-700">Navigation Language</span></div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button type="button" onClick={() => setActiveTabLang('en')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>English</button>
                <button type="button" onClick={() => setActiveTabLang('bn')} className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${activeTabLang === 'bn' ? 'bg-[#6E56CF] text-white' : 'text-slate-500'}`}>বাংলা</button>
              </div>
            </div>
            <div className="space-y-3">
              {nav.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold text-[#6E56CF]">Item {idx + 1} — {item.id}</span><button type="button" onClick={() => patchSettings({ navigation: nav.filter((_, i)=>i!==idx) })} className="text-xs text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div><label className="text-[10px] font-bold text-slate-500 uppercase">ID</label><input type="text" value={item.id} onChange={e => { const n=[...nav]; n[idx]={...n[idx], id:e.target.value}; patchSettings({ navigation: n }); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono" /></div>
                    <div><label className="text-[10px] font-bold text-slate-500 uppercase">Label ({activeTabLang})</label><input type="text" value={activeTabLang==='en'?item.label:(item.labelBn||'')} onChange={e => { const n=[...nav]; n[idx]={...n[idx], ...(activeTabLang==='en'?{label:e.target.value}:{labelBn:e.target.value})}; patchSettings({ navigation: n }); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs" /></div>
                    <div><label className="text-[10px] font-bold text-slate-500 uppercase">URL</label><input type="text" value={item.url} onChange={e => { const n=[...nav]; n[idx]={...n[idx], url:e.target.value}; patchSettings({ navigation: n }); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono" /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => patchSettings({ navigation: [...nav, { id: 'new-'+Date.now(), label: 'New Item', labelBn: 'নতুন', url: '/', order: nav.length+1 }] })} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-[#6E56CF] text-xs font-bold border border-purple-100 cursor-pointer"><Plus className="w-4 h-4" />Add Nav Item</button>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Header CTA Button (EN/BN)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" value={activeTabLang==='en' ? (settings.headerBranding?.navCtaText||'') : (settings.headerBranding?.navCtaTextBn||'')} placeholder={activeTabLang==='en'?'CTA Text EN':'CTA Text BN'} onChange={e => patchSettings({ headerBranding: { ...(settings.headerBranding as any), ...(activeTabLang==='en'?{navCtaText:e.target.value}:{navCtaTextBn:e.target.value}) } as any })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
                <input type="text" value={settings.headerBranding?.navCtaUrl||''} placeholder="CTA URL" onChange={e => patchSettings({ headerBranding: { ...(settings.headerBranding as any), navCtaUrl:e.target.value } as any })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" />
              </div>
            </div>
          </div>
        );
      }


      default:
        return (
          <div className="p-6 text-center text-slate-500">
            Form controls for {currentApp.title} are fully active.
          </div>
        );
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto space-y-6">
      {uploadError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700 font-semibold">Upload Error: {uploadError}</p>
        </div>
      )}
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setSelectedSectionAppId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E56CF] hover:text-[#5842B0] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {currentPageTitle}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6E56CF] hover:bg-[#5C45BD] text-white text-xs font-bold transition-all shadow-sm shadow-purple-200 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{hasSaved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Section Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-purple-50 text-[#6E56CF] border border-purple-100">
                {currentApp.appNumber}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live on Website</span>
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight">{currentApp.title}</h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">{currentApp.tagline}</p>
          </div>
        </div>
      </div>

      {/* Dynamic Form Body */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
        {renderFormContent()}
      </div>

    </div>
  );
};
