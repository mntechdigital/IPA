import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { APP_GRID_PAGES, SectionAppTileDef } from '../../data/appGridDefinitions';
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
  InvestigationCard
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

  const readImageFile = (file: File, onLoad: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result || ''));
    reader.readAsDataURL(file);
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

  // Quick fallback data objects
  const home = state.homePage;
  const about = state.aboutPage;
  const contact = state.contactPage || {
    hero: {
      badge: 'COMMUNICATIONS & INQUIRIES',
      heading: "Let's Start a Conversation",
      subtitle: 'Direct communication channels for researchers and inquiries.',
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
    },
    directDetails: {
      phone: '+880 2 988 4120',
      tollFreePhone: '+880 1800 472 633',
      supportEmail: 'info@mediaresearch.org',
      researchDeskEmail: 'research@mediaresearch.org',
      officeLocation: 'Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212',
      workingHours: 'Sunday – Thursday: 09:00 – 18:00 BST'
    },
    messageSettings: {
      targetEmail: 'inquiries@mediaresearch.org',
      autoReply: true,
      subjectPrefix: '[IPA Research Inquiry]',
      requireAffiliation: true
    },
    faqs: []
  };
  const settings = state.settings;

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
                    updateHomePage(
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
                    updateHomePage(
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
                    updateHomePage(
                      activeTabLang === 'en' ? { heroSubtitle: e.target.value } : { heroSubtitleBn: e.target.value }
                    )
                  }
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Background Image</label>
                <div className="flex gap-3">
                  <input type="file" accept="image/*" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) readImageFile(file, heroImage => updateHomePage({ heroImage }));
                  }} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800" />
                  {home.heroImage && (
                    <img
                      src={home.heroImage}
                      alt="Hero preview"
                      className="w-12 h-10 object-cover rounded-xl border border-slate-200 shrink-0"
                    />
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
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Display Value</label>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={e => {
                          const updated = [...home.homeMetrics];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          updateHomePage({ homeMetrics: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Label</label>
                      <input
                        type="text"
                        value={metric.label}
                        onChange={e => {
                          const updated = [...home.homeMetrics];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          updateHomePage({ homeMetrics: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Supporting Detail</label>
                      <input
                        type="text"
                        value={metric.detail}
                        onChange={e => {
                          const updated = [...home.homeMetrics];
                          updated[idx] = { ...updated[idx], detail: e.target.value };
                          updateHomePage({ homeMetrics: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500"
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
          title: 'Empirical Research For Transparent Institutions',
          description: 'Conducting independent research into newsrooms and media ecosystems.',
          mediaUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
          ctaText: 'Explore Research Beats'
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Banner Headline</label>
              <input
                type="text"
                value={pib.title}
                onChange={e => updateHomePage({ publicInterestBanner: { ...pib, title: e.target.value } })}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description Narrative</label>
              <textarea
                rows={4}
                value={pib.description}
                onChange={e => updateHomePage({ publicInterestBanner: { ...pib, description: e.target.value } })}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-sm text-slate-800 outline-none transition-all leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Highlight Image</label>
              <div className="flex gap-3">
                <input type="file" accept="image/*" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) readImageFile(file, mediaUrl => updateHomePage({ publicInterestBanner: { ...pib, mediaUrl } }));
                }} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800" />
                {pib.mediaUrl && (
                  <img src={pib.mediaUrl} alt="Preview" className="w-16 h-12 object-cover rounded-xl border border-slate-200" />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Four Key Points</label>
              {Array.from({ length: 4 }, (_, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={(pib.keyPoints || [])[idx] || ''}
                  placeholder={`Key point ${idx + 1}`}
                  onChange={e => {
                    const keyPoints = [...(pib.keyPoints || [])];
                    keyPoints[idx] = e.target.value;
                    updateHomePage({ publicInterestBanner: { ...pib, keyPoints } });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800"
                />
              ))}
            </div>
          </div>
        );

      case 'home-what-we-do':
        const wwd = home.whatWeDo || {
          header: 'What We Do',
          subheader: 'Independent inquiry across the digital and broadcast media landscape',
          cards: []
        };
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Section Header</label>
                <input
                  type="text"
                  value={wwd.header}
                  onChange={e => updateHomePage({ whatWeDo: { ...wwd, header: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subheader</label>
                <input
                  type="text"
                  value={wwd.subheader}
                  onChange={e => updateHomePage({ whatWeDo: { ...wwd, subheader: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800"
                />
              </div>
            </div>

            {/* Cards Repeater */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Three Content Cards</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wwd.cards.slice(0, 3).map((card, idx) => (
                  <div key={card.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3 relative">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Card {idx + 1} Heading</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={e => {
                          const updated = [...wwd.cards];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateHomePage({ whatWeDo: { ...wwd, cards: updated } });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Card {idx + 1} Icon</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) readImageFile(file, iconImage => {
                            const updated = [...wwd.cards];
                            updated[idx] = { ...updated[idx], iconImage };
                            updateHomePage({ whatWeDo: { ...wwd, cards: updated } });
                          });
                        }}
                        className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
                      />
                      {card.iconImage && <img src={card.iconImage} alt="Icon preview" className="mt-2 w-10 h-10 object-contain rounded-lg border border-slate-200" />}
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Card {idx + 1} Subheading</label>
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={e => {
                          const updated = [...wwd.cards];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          updateHomePage({ whatWeDo: { ...wwd, cards: updated } });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                      />
                    </div>

                    {idx === 1 && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Card Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) readImageFile(file, image => {
                              const updated = [...wwd.cards];
                              updated[idx] = { ...updated[idx], image };
                              updateHomePage({ whatWeDo: { ...wwd, cards: updated } });
                            });
                          }}
                          className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                        {card.image && <img src={card.image} alt="Card preview" className="mt-2 w-full h-28 object-cover rounded-lg" />}
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
          heading: 'Institute of Public Accountability',
          description: 'An independent media research organization focused on understanding journalism, information, and public trust.',
          badgeText: 'INDEPENDENT RESEARCH · EVIDENCE-DRIVEN',
          foundedYear: '2021',
          mainPhoto: '',
          highlightCardText: '',
          narrative: []
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading</label>
              <input type="text" value={wwa.heading || ''} onChange={e => updateAboutPage({ whoWeAre: { ...wwa, heading: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
              <textarea rows={4} value={wwa.description || ''} onChange={e => updateAboutPage({ whoWeAre: { ...wwa, description: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Moto</label>
              <input type="text" value={wwa.badgeText || ''} onChange={e => updateAboutPage({ whoWeAre: { ...wwa, badgeText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
            </div>
          </div>
        );
      }

      case 'home-areas':
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
                onChange={e => updateHomePage({ areasOfInvestigation: { ...areas, title: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Section Subtitle</label>
              <input
                type="text"
                value={areas.subtitle}
                onChange={e => updateHomePage({ areasOfInvestigation: { ...areas, subtitle: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Investigation Cards</label>
                <button
                  type="button"
                  onClick={() => updateHomePage({ areasOfInvestigation: { ...areas, cards: [...areaCards, { id: `area-${Date.now()}`, heading: 'New Investigation', description: 'Short description for this investigation area.', image: '' }] } })}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 text-[#6E56CF] text-xs font-semibold border border-purple-100"
                >
                  + Add More Card
                </button>
              </div>
              {areaCards.map((card, idx) => (
                <div key={card.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#6E56CF]">Card {idx + 1}</span>
                    {areaCards.length > 1 && <button type="button" onClick={() => updateHomePage({ areasOfInvestigation: { ...areas, cards: areaCards.filter((_, i) => i !== idx) } })} className="text-xs text-red-500">Remove</button>}
                  </div>
                  <input type="text" value={card.heading} onChange={e => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], heading: e.target.value }; updateHomePage({ areasOfInvestigation: { ...areas, cards } }); }} placeholder="Card Heading" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold" />
                  <textarea rows={3} value={card.description} onChange={e => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], description: e.target.value }; updateHomePage({ areasOfInvestigation: { ...areas, cards } }); }} placeholder="Short Description" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm" />
                  <input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file) readImageFile(file, image => { const cards = [...areaCards]; cards[idx] = { ...cards[idx], image }; updateHomePage({ areasOfInvestigation: { ...areas, cards } }); }); }} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs" />
                  {card.image && <img src={card.image} alt="Card preview" className="w-full h-32 object-cover rounded-lg" />}
                </div>
              ))}
            </div>
          </div>
        );

      case 'home-quote':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Core Institutional Quote</label>
              <input
                type="text"
                value={home.tenetQuote}
                onChange={e => updateHomePage({ tenetQuote: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base font-serif italic text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quote Explanation</label>
              <textarea
                rows={3}
                value={home.tenetSubtitle}
                onChange={e => updateHomePage({ tenetSubtitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quote Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) readImageFile(file, tenetImage => updateHomePage({ tenetImage }));
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
              {home.tenetImage && <img src={home.tenetImage} alt="Quote preview" className="w-full h-40 object-cover rounded-xl border border-slate-200" />}
            </div>
          </div>
        );

      case 'home-how-we-work':
        const hww = home.howWeWork || {
          badge: 'OUR METHODOLOGICAL DISCIPLINE',
          title: 'How We Work',
          subtitle: 'From urgent inquiries to open-access public knowledge',
          steps: []
        };
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Heading</label>
                <input
                  type="text"
                  value={hww.title}
                  onChange={e => updateHomePage({ howWeWork: { ...hww, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Subheading</label>
                <input
                  type="text"
                  value={hww.subtitle}
                  onChange={e => updateHomePage({ howWeWork: { ...hww, subtitle: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
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
                        value={step.title}
                        onChange={e => {
                          const nextSteps = [...hww.steps];
                          nextSteps[idx] = { ...nextSteps[idx], title: e.target.value };
                          updateHomePage({ howWeWork: { ...hww, steps: nextSteps } });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                        placeholder="Card Heading"
                      />
                      <input
                        type="text"
                        value={step.subheading || step.step}
                        onChange={e => {
                          const nextSteps = [...hww.steps];
                          nextSteps[idx] = { ...nextSteps[idx], subheading: e.target.value };
                          updateHomePage({ howWeWork: { ...hww, steps: nextSteps } });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-700"
                        placeholder="Card Subheading"
                      />
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={e => {
                          const nextSteps = [...hww.steps];
                          nextSteps[idx] = { ...nextSteps[idx], description: e.target.value };
                          updateHomePage({ howWeWork: { ...hww, steps: nextSteps } });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                        placeholder="Short Description"
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
          subtitle: 'Scholars leading our empirical research tracks',
          showOnHome: true,
          featuredMemberIds: ['tm-1', 'tm-2', 'tm-3', 'tm-4']
        };
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div>
                <div className="text-xs font-bold text-[#1E1B4B]">Display Team on Home Page</div>
                <div className="text-[11px] text-slate-500">Enable or disable the researcher spotlight section</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={ft.showOnHome}
                  onChange={e => updateHomePage({ featuredTeam: { ...ft, showOnHome: e.target.checked } })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6E56CF]"></div>
              </label>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Section Title</label>
                <input
                  type="text"
                  value={ft.title}
                  onChange={e => updateHomePage({ featuredTeam: { ...ft, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={ft.subtitle}
                  onChange={e => updateHomePage({ featuredTeam: { ...ft, subtitle: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
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
                          updateHomePage({ featuredTeam: { ...ft, featuredMemberIds: next } });
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
          narrative: 'Explore open datasets or collaborate with our empirical fellows.',
          primaryCtaText: 'Request Dataset Access',
          primaryCtaUrl: '/contact',
          secondaryCtaText: 'Download Annual Report',
          secondaryCtaUrl: '/publications'
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Headline</label>
              <input
                type="text"
                value={bcta.title}
                onChange={e => updateHomePage({ bottomCta: { ...bcta, title: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Narrative Text</label>
              <textarea
                rows={3}
                value={bcta.narrative}
                onChange={e => updateHomePage({ bottomCta: { ...bcta, narrative: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button Text</label>
                <input
                  type="text"
                  value={bcta.primaryCtaText}
                  onChange={e => updateHomePage({ bottomCta: { ...bcta, primaryCtaText: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Button Target URL</label>
                <input
                  type="text"
                  value={bcta.primaryCtaUrl}
                  onChange={e => updateHomePage({ bottomCta: { ...bcta, primaryCtaUrl: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button Text</label>
                <input
                  type="text"
                  value={bcta.secondaryCtaText}
                  onChange={e => updateHomePage({ bottomCta: { ...bcta, secondaryCtaText: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secondary Button Target URL</label>
                <input
                  type="text"
                  value={bcta.secondaryCtaUrl}
                  onChange={e => updateHomePage({ bottomCta: { ...bcta, secondaryCtaUrl: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------
      // ABOUT US APPS
      // -------------------------------------------------------
      case 'about-hero':
        const abHero = about.heroBanner || {
          title: about.missionTitle || 'Researching Media. Understanding Society.',
          subtext: 'An independent empirical research institute observing newsrooms.',
          badgeText: about.missionBadge || 'ABOUT THE ORGANIZATION',
          bgStyle: 'gradient'
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Main Heading</label>
              <input
                type="text"
                value={abHero.title}
                onChange={e => updateAboutPage({ heroBanner: { ...abHero, title: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtext Narrative</label>
              <textarea
                rows={3}
                value={abHero.subtext}
                onChange={e => updateAboutPage({ heroBanner: { ...abHero, subtext: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Background Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) readImageFile(file, bgImage => updateAboutPage({ heroBanner: { ...abHero, bgImage } }));
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
              {abHero.bgImage && <img src={abHero.bgImage} alt="About hero preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />}
            </div>
          </div>
        );

      case 'about-who-we-are':
        const wwa = about.whoWeAre || {
          foundedYear: '2021',
          mainPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
          highlightCardText: 'Operating empirical observatories tracking media and trust.',
          narrative: about.missionStory || []
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading</label>
              <input
                type="text"
                value={wwa.heading || ''}
                onChange={e => updateAboutPage({ whoWeAre: { ...wwa, heading: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
              <textarea
                rows={3}
                value={wwa.description || ''}
                onChange={e => updateAboutPage({ whoWeAre: { ...wwa, description: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Founded Year</label>
                <input
                  type="text"
                  value={wwa.foundedYear}
                  onChange={e => updateAboutPage({ whoWeAre: { ...wwa, foundedYear: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Main Image</label>
              <input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file) readImageFile(file, mainPhoto => updateAboutPage({ whoWeAre: { ...wwa, mainPhoto } })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
              {wwa.mainPhoto && <img src={wwa.mainPhoto} alt="Who we are" className="w-full h-40 object-cover rounded-xl border border-slate-200" />}
            </div>
          </div>
        );

      case 'about-pillars':
        const pillars = about.missionPillars || [];
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Mission & Vision Grid (4 Cards)</h3>
                <p className="text-xs text-slate-500">Our Mission, Our Vision, Our Goal, and Our Practice</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.slice(0, 4).map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-[#6E56CF]">{['Our Mission', 'Our Vision', 'Our Goal', 'Our Practice'][idx]}</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Heading</label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={e => {
                        const next = [...pillars];
                        next[idx] = { ...next[idx], title: e.target.value };
                        updateAboutPage({ missionPillars: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Subheading</label>
                    <textarea
                      rows={3}
                      value={pillar.description}
                      onChange={e => {
                        const next = [...pillars];
                        next[idx] = { ...next[idx], description: e.target.value };
                        updateAboutPage({ missionPillars: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                    />
                  </div>
                  {idx === 3 && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Practice Image</label>
                      <input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file) readImageFile(file, image => { const next = [...pillars]; next[idx] = { ...next[idx], image }; updateAboutPage({ missionPillars: next }); }); }} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs" />
                      {pillar.image && <img src={pillar.image} alt="Practice preview" className="mt-2 w-full h-28 object-cover rounded-lg" />}
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
                        updateAboutPage({ principles: next });
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
                        updateAboutPage({ principles: next });
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
                        updateAboutPage({ principles: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-questions':
        const fqi = about.fromQuestionsToInsight || {
          heading: 'From Questions to Empirical Insight',
          subheading: 'How IPA designs longitudinal research studies to defend the public sphere',
          ctaText: 'Explore Research Beats',
          destinationUrl: '/research'
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading</label>
              <input
                type="text"
                value={fqi.heading}
                onChange={e => updateAboutPage({ fromQuestionsToInsight: { ...fqi, heading: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subheading</label>
              <input
                type="text"
                value={fqi.subheading}
                onChange={e => updateAboutPage({ fromQuestionsToInsight: { ...fqi, subheading: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">CTA Button Label</label>
                <input
                  type="text"
                  value={fqi.ctaText}
                  onChange={e => updateAboutPage({ fromQuestionsToInsight: { ...fqi, ctaText: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Destination URL</label>
                <input
                  type="text"
                  value={fqi.destinationUrl}
                  onChange={e => updateAboutPage({ fromQuestionsToInsight: { ...fqi, destinationUrl: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------
      // RESEARCH APPS & DEDICATED BEAT APPS
      // -------------------------------------------------------
      case 'research-hero':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Main Page Title</label>
              <input
                type="text"
                defaultValue="Empirical Research Observatories"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Search Filter Placeholder</label>
              <input
                type="text"
                defaultValue="Search 18+ research papers, datasets & monographs..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Research Desk Overview Narrative</label>
              <textarea
                rows={4}
                defaultValue="The Institute of Public Accountability operates six empirical research beats tracking newsrooms, broadcast streams, digital platform algorithms, public opinion, and democratic governance."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed"
              />
            </div>
          </div>
        );

      case 'research-framework':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Framework Section Header</label>
              <input
                type="text"
                defaultValue="What Our Work Looks Like"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tag: 'Executive Brief', desc: 'Concise, high-level policy summaries for editorial directors and regulators.' },
                { tag: 'Empirical Analysis', desc: 'Quantitative data evaluations with statistical modeling and confidence intervals.' },
                { tag: 'Field Investigation', desc: 'On-the-ground ethnographic newsroom observation and journalist interviews.' },
                { tag: 'Emerging Inquiries', desc: 'Active exploratory tracks testing novel NLP scrapers and AI forensic tools.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-[#6E56CF] border border-purple-100">
                    {item.tag}
                  </span>
                  <p className="text-xs text-slate-600 mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

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
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Heading</label>
              <input
                type="text"
                value={contact.hero.heading}
                onChange={e => updateContactPage({ hero: { ...contact.hero, heading: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subtitle</label>
              <textarea
                rows={3}
                value={contact.hero.subtitle}
                onChange={e => updateContactPage({ hero: { ...contact.hero, subtitle: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) readImageFile(file, bgImage => updateContactPage({ hero: { ...contact.hero, bgImage } }));
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
              {contact.hero.bgImage && <img src={contact.hero.bgImage} alt="Contact hero preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />}
            </div>
          </div>
        );

      case 'contact-details':
        const cd = contact.directDetails;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Telephone Line 1</label>
                <input type="text" value={cd.phoneLabel || 'Main Secretariat'} onChange={e => updateContactPage({ directDetails: { ...cd, phoneLabel: e.target.value } })} className="w-full mb-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="Line title" />
                <input
                  type="text"
                  value={cd.phone}
                  onChange={e => updateContactPage({ directDetails: { ...cd, phone: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="+880 2 984 5512"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Telephone Line 2</label>
                <input type="text" value={cd.tollFreePhoneLabel || 'Research Desk & Media'} onChange={e => updateContactPage({ directDetails: { ...cd, tollFreePhoneLabel: e.target.value } })} className="w-full mb-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="Line title" />
                <input
                  type="text"
                  value={cd.tollFreePhone}
                  onChange={e => updateContactPage({ directDetails: { ...cd, tollFreePhone: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="+880 171 000 9821"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email</label>
                <input type="email" value={cd.supportEmail} onChange={e => updateContactPage({ directDetails: { ...cd, supportEmail: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="info@mediaresearch.org" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Working Hours</label>
                <input type="text" value={cd.workingHours} onChange={e => updateContactPage({ directDetails: { ...cd, workingHours: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="Sunday – Thursday: 09:00 – 17:30 BST" />
              </div>
            </div>

            <div className="hidden">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email</label>
              <input type="email" value={cd.supportEmail} onChange={e => updateContactPage({ directDetails: { ...cd, supportEmail: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="info@mediaresearch.org" />
            </div>

            <div className="grid grid-cols-1 gap-4 [&>div:nth-child(2)]:hidden">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secretariat Address</label>
                <input
                  type="text"
                  value={cd.officeLocation}
                  onChange={e => updateContactPage({ directDetails: { ...cd, officeLocation: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secretariat Headquarters (বাংলা)</label>
                <input
                  type="text"
                  value={cd.officeLocationBn || ''}
                  onChange={e => updateContactPage({ directDetails: { ...cd, officeLocationBn: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="লেভেল ৭, প্রেস অ্যান্ড রিসার্চ টাওয়ার, ৪২ গুলশান অ্যাভিনিউ, ঢাকা ১২১২"
                />
              </div>
            </div>

            <div className="hidden">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Working Hours</label>
                <input
                  type="text"
                  value={cd.workingHours}
                  onChange={e => updateContactPage({ directDetails: { ...cd, workingHours: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="Sunday – Thursday: 09:00 – 17:30 BST"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Working Hours (বাংলা)</label>
                <input
                  type="text"
                  value={cd.workingHoursBn || ''}
                  onChange={e => updateContactPage({ directDetails: { ...cd, workingHoursBn: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  placeholder="রবিবার – বৃহস্পতিবার: সকাল ০৯:০০ – বিকাল ১৭:৩০ (বিএসটি)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Google Maps / Directions Link</label>
              <input
                type="text"
                value={cd.googleMapsUrl || ''}
                onChange={e => updateContactPage({ directDetails: { ...cd, googleMapsUrl: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                placeholder="https://maps.google.com/?q=Gulshan+Avenue+Dhaka"
              />
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
        return (
          <div className="space-y-6">
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
                  updateContactPage({ faqs: [...faqs, newFaq] });
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
                  <button
                    type="button"
                    onClick={() => {
                      const next = faqs.filter((_, i) => i !== idx);
                      updateContactPage({ faqs: next });
                    }}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => {
                        const next = [...faqs];
                        next[idx] = { ...next[idx], question: e.target.value };
                        updateContactPage({ faqs: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                      placeholder="Question Text"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Detailed Answer</label>
                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={e => {
                        const next = [...faqs];
                        next[idx] = { ...next[idx], answer: e.target.value };
                        updateContactPage({ faqs: next });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 leading-relaxed"
                      placeholder="Answer Text"
                    />
                  </div>

                  {/* Highlights Bullet List */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Highlights / Bullets</label>
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...faqs];
                          const curH = next[idx].highlights || [];
                          next[idx] = { ...next[idx], highlights: [...curH, 'New highlight key point'] };
                          updateContactPage({ faqs: next });
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
                              updateContactPage({ faqs: next });
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
                              updateContactPage({ faqs: next });
                            }}
                            className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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
          readImageFile(file, image => {
            if (target === 'header') {
              updateSettings({ headerBranding: { ...hb, logoUrl: image } });
            } else {
              updateSettings({ footerBranding: { ...footerBrand, logoUrl: image } });
            }
          });
        };
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Header Branding</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Header Logo Image</label>
                <input type="file" accept="image/*" onChange={e => updateBrandingImage(e.target.files?.[0], 'header')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                {hb.logoUrl && <img src={hb.logoUrl} alt="Header logo preview" className="h-14 max-w-xs object-contain border border-slate-200 rounded-lg p-2 bg-white" />}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Header Logo Text (Optional)</label>
                <input type="text" value={hb.lightLogoText || ''} onChange={e => updateSettings({ headerBranding: { ...hb, lightLogoText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="space-y-4 pt-5 border-t border-slate-100">
              <h3 className="text-sm font-bold text-[#1E1B4B]">Footer Branding</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Logo Image</label>
                <input type="file" accept="image/*" onChange={e => updateBrandingImage(e.target.files?.[0], 'footer')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                {footerBrand.logoUrl && <img src={footerBrand.logoUrl} alt="Footer logo preview" className="h-14 max-w-xs object-contain border border-slate-200 rounded-lg p-2 bg-white" />}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Logo Text (Optional)</label>
                <input type="text" value={footerBrand.footerLogoText || ''} onChange={e => updateSettings({ footerBranding: { ...footerBrand, footerLogoText: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Short Description</label>
                <textarea rows={3} value={footerBrand.tagline || ''} onChange={e => updateSettings({ footerBranding: { ...footerBrand, tagline: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Copyright Text</label>
                <input type="text" value={footerBrand.copyrightNotice || 'Established 2019 · Dhaka & Global Partner Observatories'} onChange={e => updateSettings({ footerBranding: { ...footerBrand, copyrightNotice: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="Established 2019 · Dhaka & Global Partner Observatories" />
              </div>
            </div>
            <div className="hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Header Logo Text</label>
                <input
                  type="text"
                  value={hb.lightLogoText}
                  onChange={e => updateSettings({ headerBranding: { ...hb, lightLogoText: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Tagline</label>
                <input
                  type="text"
                  value={hb.tagline}
                  onChange={e => updateSettings({ headerBranding: { ...hb, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Navbar CTA Button Text</label>
                <input
                  type="text"
                  value={hb.navCtaText}
                  onChange={e => updateSettings({ headerBranding: { ...hb, navCtaText: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Navbar CTA URL</label>
                <input
                  type="text"
                  value={hb.navCtaUrl}
                  onChange={e => updateSettings({ headerBranding: { ...hb, navCtaUrl: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Announcement Banner</label>
              <input
                type="text"
                value={hb.announcementBannerText || ''}
                onChange={e => updateSettings({ headerBranding: { ...hb, announcementBannerText: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            </div>
          </div>
        );

      case 'branding-footer':
        const fb = settings.footerBranding || {
          footerLogoText: 'IPA Media Research Observatory',
          tagline: 'Rigorous empirical research observing media ecosystems.',
          copyrightNotice: '© 2021–2026 Institute of Public Accountability. Open Access Research.',
          licenseNotice: 'All data distributed under Creative Commons Attribution 4.0 International.'
        };
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Logo / Title</label>
              <input
                type="text"
                value={fb.footerLogoText}
                onChange={e => updateSettings({ footerBranding: { ...fb, footerLogoText: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Footer Mission Statement</label>
              <textarea
                rows={3}
                value={fb.tagline}
                onChange={e => updateSettings({ footerBranding: { ...fb, tagline: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Copyright Statement</label>
                <input
                  type="text"
                  value={fb.copyrightNotice}
                  onChange={e => updateSettings({ footerBranding: { ...fb, copyrightNotice: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Open Access License</label>
                <input
                  type="text"
                  value={fb.licenseNotice}
                  onChange={e => updateSettings({ footerBranding: { ...fb, licenseNotice: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          </div>
        );

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
                    updateSettings({ socialLinks: { ...settings.socialLinks, [key]: '' } });
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
                      value={url}
                      onChange={e => {
                        updateSettings({
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
            onClick={() => handleSaveNotification()}
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
