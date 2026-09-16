import React, { useEffect, useRef, useState } from 'react';
import {
  Layers,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Search,
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Filter,
  BarChart3,
  Sparkles,
  Save,
  Tag,
  Globe,
  Upload,
  Loader2
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ResearchBeat } from '../../types';

export const ResearchManagerView: React.FC = () => {
  const { state, updateResearchBeat, addResearchBeat, deleteResearchBeat, setNotification, setSelectedSectionAppId } = useCms();

  // In 'research-tracks': 'table' view or 'editor' view
  const [subView, setSubView] = useState<'table' | 'editor'>('table');
  const [editingBeatId, setEditingBeatId] = useState<string | null>(null);
  const [isNewBeat, setIsNewBeat] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLeadFellowsOpen, setIsLeadFellowsOpen] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'en' | 'bn'>('en');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const richTextRef = useRef<HTMLDivElement>(null);

  // Dedicated Research Form State
  const [formBeat, setFormBeat] = useState<ResearchBeat>({
    id: '',
    beatNumber: '07',
    name: '',
    tagline: '',
    category: 'journalism',
    description: '',
    image: '',
    timeframe: '2024 – Present',
    leadFellows: ['Dr. Sabrina Farhana'],
    status: 'active',
    summary: '',
    outputsCount: '4 Monograph Reports',
    methodology: 'Empirical cross-sectional surveys, broadcast archiving, NLP analysis.',
    primaryMethodologies: [],
    primaryMethodologiesBn: [],
    sampleInquiries: [],
    sampleInquiriesBn: [],
    imageTitle: '',
    imageSubtitle: '',
    researchNarrative: '',
    metrics: [
      { label: 'Audited Entities', value: '45 Newsrooms', detail: 'Verified entities under continuous audit coverage.' },
      { label: 'Corpus Size', value: '12,000 Articles', detail: 'Articles indexed across 30+ national outlets.' }
    ],
    overview: [],
    keyQuestions: [],
    methodologyDetails: [],
    caseStudies: [],
    publications: []
  });

  // Sync rich text editor when editing record or switching language
  useEffect(() => {
    if (richTextRef.current) {
      richTextRef.current.innerHTML =
        activeLang === 'bn'
          ? (formBeat.researchNarrativeBn || formBeat.summaryBn || '')
          : (formBeat.researchNarrative || formBeat.summary || '');
    }
  }, [formBeat.id, activeLang]);

  const beatsList = Object.values(state.researchBeats).sort((a, b) =>
    (a.beatNumber || '').localeCompare(b.beatNumber || '')
  );

  const filteredBeats = beatsList.filter(beat => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      beat.name.toLowerCase().includes(q) ||
      (beat.nameBn && beat.nameBn.toLowerCase().includes(q)) ||
      (beat.tagline && beat.tagline.toLowerCase().includes(q)) ||
      (beat.leadFellows || []).some(f => f.toLowerCase().includes(q)) ||
      (beat.beatNumber || '').toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || beat.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleStartCreateResearch = () => {
    const nextNum = (beatsList.length + 1).toString().padStart(2, '0');
    setFormBeat({
      id: crypto.randomUUID(),
      beatNumber: nextNum,
      name: '',
      tagline: '',
      category: 'journalism',
      description: '',
      image: '',
      timeframe: '2024 – Present',
      leadFellows: ['Dr. Sabrina Farhana'],
      status: 'active',
      summary: '',
      outputsCount: '2 Published Monographs',
      methodology: 'Triangulated empirical methodology combining qualitative newsroom interviews, open web corpus indexing, and statistical modeling.',
      primaryMethodologies: [],
      primaryMethodologiesBn: [],
      sampleInquiries: [],
      sampleInquiriesBn: [],
      imageTitle: '',
      imageSubtitle: '',
      researchNarrative: '',
      metrics: [
        { label: 'Active Dataset Rows', value: '8,400', detail: 'Live rows across archived corpora.' },
        { label: 'Peer Reviews', value: '12', detail: 'Double-blind methodological reviews to date.' },
        { label: 'Citations', value: '38', detail: 'Times cited by academic and civic studies.' }
      ],
      overview: [],
      keyQuestions: [],
      methodologyDetails: [],
      caseStudies: [],
      publications: []
    });
    setEditingBeatId(null);
    setIsNewBeat(true);
    setActiveLang('en');
    setSubView('editor');
  };

  const handleStartEditResearch = (beat: ResearchBeat) => {
    setFormBeat({
      ...beat,
      leadFellows: [...(beat.leadFellows || [])],
      leadFellowsBn: [...(beat.leadFellowsBn || [])],
      metrics: (beat.metrics || []).map(m => ({ ...m })),
      metricsBn: (beat.metricsBn || []).map(m => ({ ...m })),
      overview: [...(beat.overview || [])],
      overviewBn: [...(beat.overviewBn || [])],
      keyQuestions: [...(beat.keyQuestions || [])],
      keyQuestionsBn: [...(beat.keyQuestionsBn || [])],
      primaryMethodologies: [...(beat.primaryMethodologies || [])],
      primaryMethodologiesBn: [...(beat.primaryMethodologiesBn || [])],
      sampleInquiries: [...(beat.sampleInquiries || [])],
      sampleInquiriesBn: [...(beat.sampleInquiriesBn || [])],
      methodologyDetails: (beat.methodologyDetails || []).map(m => ({ ...m })),
      caseStudies: (beat.caseStudies || []).map(c => ({ ...c })),
      publications: (beat.publications || []).map(p => ({ ...p }))
    });
    setEditingBeatId(beat.id);
    setIsNewBeat(false);
    setActiveLang('en');
    setSubView('editor');
  };

  const handleSaveResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBeat.name.trim()) {
      alert('Please enter a research program title.');
      return;
    }

    const narrativeEn = formBeat.researchNarrative || formBeat.summary || '';
    const narrativeBn = formBeat.researchNarrativeBn || formBeat.summaryBn || '';

    const researchToSave: ResearchBeat = {
      ...formBeat,
      description: formBeat.description || narrativeEn,
      descriptionBn: formBeat.descriptionBn || narrativeBn,
      summary: narrativeEn,
      summaryBn: narrativeBn,
      overview: (formBeat.overview && formBeat.overview.length > 0)
        ? formBeat.overview
        : (narrativeEn ? [narrativeEn] : []),
      overviewBn: (formBeat.overviewBn && formBeat.overviewBn.length > 0)
        ? formBeat.overviewBn
        : (narrativeBn ? [narrativeBn] : []),
    };

    if (isNewBeat) {
      addResearchBeat(researchToSave);
      setNotification({ message: `Research track "${formBeat.name}" created successfully.`, type: 'success' });
    } else {
      updateResearchBeat(formBeat.id, researchToSave);
      setNotification({ message: `Research track "${formBeat.name}" updated successfully.`, type: 'success' });
    }

    setSubView('table');
  };

  const applyRichTextCommand = (command: string, value?: string) => {
    richTextRef.current?.focus();
    document.execCommand(command, false, value);
    if (richTextRef.current) {
      const narrative = richTextRef.current.innerHTML;
      if (activeLang === 'bn') {
        setFormBeat(prev => ({ ...prev, researchNarrativeBn: narrative, summaryBn: narrative }));
      } else {
        setFormBeat(prev => ({ ...prev, researchNarrative: narrative, summary: narrative }));
      }
    }
  };

  const handleResearchImageUpload = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (data.url) {
        setFormBeat(prev => ({
          ...prev,
          image: activeLang === 'en' ? data.url : (prev.image || data.url),
          imageBn: activeLang === 'bn' ? data.url : prev.imageBn,
        }));
        setNotification({ message: 'Research image uploaded successfully.', type: 'success' });
      }
    } catch {
      setNotification({ message: 'Failed to upload image.', type: 'warning' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResearch = (beat: ResearchBeat) => {
    if (window.confirm(`Are you sure you want to delete research track "${beat.name}"?`)) {
      deleteResearchBeat(beat.id);
      setNotification({ message: `Research track "${beat.name}" deleted.`, type: 'success' });
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#6E56CF]"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E56CF]">
              Research Architecture Hub
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Research Tracks</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure empirical research programs, investigation topics, methodologies, and findings.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSelectedSectionAppId(null)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Apps Grid</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUBVIEW 1: RESEARCHES MASTER TABLE                       */}
      {/* ======================================================== */}
      {subView === 'table' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search research by title, beat #, or lead fellow..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 outline-none transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="bg-transparent border-none text-slate-700 text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="journalism">Journalism & Newsrooms</option>
                  <option value="platforms">Platforms & Algorithms</option>
                  <option value="monitoring">Media Monitoring</option>
                  <option value="public">Public Opinion & Trust</option>
                  <option value="democracy">Media & Democracy</option>
                  <option value="ai">Technology & AI</option>
                </select>
              </div>
            </div>

            <button
              id="create-research-btn"
              onClick={handleStartCreateResearch}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E56CF] hover:bg-[#5842c3] text-white text-xs font-bold transition-all shadow-sm shadow-purple-200 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Research Track</span>
            </button>
          </div>

          {/* Researches Master Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="created-research-table">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16">Beat #</th>
                    <th className="py-3.5 px-4">Research Investigation</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Lead Fellows</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Timeframe</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Status</th>
                    <th className="py-3.5 px-4 text-right w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredBeats.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-600">No research investigations found</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Click "Create Research Track" to configure and launch a new empirical investigation.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredBeats.map(beat => (
                      <tr key={beat.id} className="hover:bg-purple-50/20 transition-colors group">
                        {/* Beat Code */}
                        <td className="py-3.5 px-4 font-mono font-bold text-[#6E56CF]">
                          <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-100">
                            {beat.beatNumber}
                          </span>
                        </td>

                        {/* Title & Tagline */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#1E1B4B] group-hover:text-[#6E56CF] transition-colors">
                            {beat.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md">
                            {beat.tagline}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize border border-slate-200/60">
                            {beat.category}
                          </span>
                        </td>

                        {/* Lead Fellows */}
                        <td className="py-3.5 px-4 hidden md:table-cell text-slate-600">
                          {beat.leadFellows?.join(', ') || '—'}
                        </td>

                        {/* Timeframe */}
                        <td className="py-3.5 px-4 hidden lg:table-cell text-slate-500 font-mono text-[11px]">
                          {beat.timeframe || 'Active'}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 hidden lg:table-cell">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{beat.status || 'Active'}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleStartEditResearch(beat)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#6E56CF] hover:bg-purple-50 transition-colors cursor-pointer"
                              title="Edit in Dedicated Page"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteResearch(beat)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Research Track"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBVIEW 2: DEDICATED FULL-PAGE CREATE / EDIT VIEW        */}
      {/* ======================================================== */}
      {subView === 'editor' && (
        <div className="space-y-6 animate-fade-in" id="dedicated-research-create-page">
          {/* Back Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setSubView('table')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#6E56CF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Researches Table</span>
            </button>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-50 text-[#6E56CF] font-bold border border-purple-100">
              {isNewBeat ? 'New Research Track' : `Editing Beat ${formBeat.beatNumber}`}
            </span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#6E56CF]" />
              <span className="text-xs font-semibold text-slate-700">Content Language</span>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveLang('en')}
                className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                  activeLang === 'en' ? 'bg-[#6E56CF] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('bn')}
                className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                  activeLang === 'bn' ? 'bg-[#6E56CF] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Main Full-Page Form */}
          <form onSubmit={handleSaveResearch} className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-[#1E1B4B] border-b border-slate-100 pb-3">
                Core Investigation Identity
              </h3>

              <div className="grid grid-cols-1 gap-5">
                {/* Program Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {activeLang === 'bn' ? 'Research Program Title (বাংলা)' : 'Research Program Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={activeLang === 'bn' ? (formBeat.nameBn || '') : formBeat.name}
                    onChange={e => setFormBeat({
                      ...formBeat,
                      nameBn: activeLang === 'bn' ? e.target.value : formBeat.nameBn,
                      name: activeLang === 'en' ? e.target.value : formBeat.name
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all"
                    placeholder={activeLang === 'bn' ? 'যেমন: মিডিয়া কেন্দ্রীকরণ ও ক্রস-বর্ডার পুঁজি প্রবাহ' : 'e.g. Media Concentration & Cross-Border Capital Flows'}
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {activeLang === 'bn' ? 'Focus Thesis / Tagline (বাংলা)' : 'Focus Thesis / Tagline'}
                  </label>
                  <input
                    type="text"
                    value={activeLang === 'bn' ? (formBeat.taglineBn || '') : formBeat.tagline}
                    onChange={e => setFormBeat({
                      ...formBeat,
                      taglineBn: activeLang === 'bn' ? e.target.value : formBeat.taglineBn,
                      tagline: activeLang === 'en' ? e.target.value : formBeat.tagline
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-serif italic focus:bg-white focus:border-[#6E56CF] outline-none transition-all"
                    placeholder={activeLang === 'bn' ? 'মালিকানা স্বচ্ছতা ও সম্পাদকীয় স্বায়ত্তশাসনের নীতিমূলক নিরীক্ষণ।' : 'Empirical auditing of ownership transparency and editorial autonomy.'}
                  />
                </div>

                {/* Card Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {activeLang === 'bn' ? 'Card Description (বাংলা)' : 'Card Description'}
                    <span className="text-slate-400 font-normal ml-1">(Shown on the Research Portfolio card)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={activeLang === 'bn' ? (formBeat.descriptionBn || '') : formBeat.description}
                    onChange={e => setFormBeat({
                      ...formBeat,
                      descriptionBn: activeLang === 'bn' ? e.target.value : formBeat.descriptionBn,
                      description: activeLang === 'en' ? e.target.value : formBeat.description
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all"
                    placeholder={activeLang === 'bn' ? 'গবেষণার সারসংক্ষেপ বর্ণনা লিখুন...' : 'Brief summary description for the research card...'}
                  />
                </div>
              </div>

              {/* Timeframe and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {activeLang === 'bn' ? 'Investigation Timeframe (বাংলা)' : 'Investigation Timeframe'}
                  </label>
                  <input
                    type="text"
                    value={activeLang === 'bn' ? (formBeat.timeframeBn || '') : formBeat.timeframe}
                    onChange={e => setFormBeat({
                      ...formBeat,
                      timeframeBn: activeLang === 'bn' ? e.target.value : formBeat.timeframeBn,
                      timeframe: activeLang === 'en' ? e.target.value : formBeat.timeframe
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all"
                    placeholder="2024 – Present"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={formBeat.category}
                    onChange={e => setFormBeat({ ...formBeat, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all cursor-pointer"
                  >
                    <option value="journalism">Journalism & Newsrooms</option>
                    <option value="platforms">Platforms & Algorithms</option>
                    <option value="monitoring">Media Monitoring</option>
                    <option value="public">Public Opinion & Trust</option>
                    <option value="democracy">Media & Democracy</option>
                    <option value="ai">Technology & AI</option>
                  </select>
                </div>
              </div>

              {/* Primary Methodologies */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {activeLang === 'bn' ? 'Primary Methodologies (বাংলা)' : 'Primary Methodologies'}
                  <span className="text-slate-400 font-normal ml-1">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={activeLang === 'bn' ? (formBeat.primaryMethodologiesBn || []).join(', ') : (formBeat.primaryMethodologies || []).join(', ')}
                  onChange={e => {
                    const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setFormBeat({
                      ...formBeat,
                      primaryMethodologiesBn: activeLang === 'bn' ? val : formBeat.primaryMethodologiesBn,
                      primaryMethodologies: activeLang === 'en' ? val : formBeat.primaryMethodologies,
                      methodology: activeLang === 'en' ? e.target.value : formBeat.methodology,
                      methodologyBn: activeLang === 'bn' ? e.target.value : formBeat.methodologyBn
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all"
                  placeholder={activeLang === 'bn' ? 'নৃগবেষণা, কর্পাস বিশ্লেষণ, নেটওয়ার্ক ম্যাপিং' : 'Newsroom Field Audits, Cross-border Financial Tracking, Regulatory Filing Analysis'}
                />
              </div>

              {/* Sample Inquiries */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {activeLang === 'bn' ? 'Sample Inquiries & Datasets (বাংলা)' : 'Sample Inquiries & Datasets'}
                  <span className="text-slate-400 font-normal ml-1">(one per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={activeLang === 'bn' ? (formBeat.sampleInquiriesBn || []).join('\n') : (formBeat.sampleInquiries || []).join('\n')}
                  onChange={e => {
                    const lines = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                    setFormBeat({
                      ...formBeat,
                      sampleInquiriesBn: activeLang === 'bn' ? lines : formBeat.sampleInquiriesBn,
                      sampleInquiries: activeLang === 'en' ? lines : formBeat.sampleInquiries,
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all"
                  placeholder={activeLang === 'bn' ? '১. মালিকানা স্বচ্ছতা নিরীক্ষণ...\n২. ক্রস-বর্ডার ফাইন্যান্সিয়াল ট্রেসিং...' : '1. Cross-border media holding structures in South Asia\n2. Private equity concentration across broadcast channels\n3. Editorial board independence during state advertising cycles'}
                />
              </div>

              {/* Lead Fellows */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Lead Fellows</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLeadFellowsOpen(open => !open)}
                    className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-left text-slate-800 focus:bg-white focus:border-[#6E56CF] outline-none transition-all cursor-pointer"
                  >
                    <span className="truncate">
                      {formBeat.leadFellows?.length ? formBeat.leadFellows.join(', ') : 'Select lead fellows'}
                    </span>
                    <span className="text-slate-400">▾</span>
                  </button>
                  {isLeadFellowsOpen && (
                    <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                      {state.team.map(member => {
                        const selected = (formBeat.leadFellows || []).includes(member.name);
                        return (
                          <label key={member.id} className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-700 hover:bg-purple-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => setFormBeat({
                                ...formBeat,
                                leadFellows: selected
                                  ? (formBeat.leadFellows || []).filter(name => name !== member.name)
                                  : [...(formBeat.leadFellows || []), member.name]
                              })}
                              className="accent-[#6E56CF]"
                            />
                            <span>{member.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Select one or more fellows from the team directory.</p>
              </div>

              {/* Research Image */}
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Research Image</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" /> : <Upload className="w-4 h-4" />}
                      <span>{isUploading ? 'Uploading...' : 'Choose File to Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleResearchImageUpload(e.target.files?.[0])}
                        disabled={isUploading}
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">Uploads to server /api/upload storage</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {activeLang === 'bn' ? 'Image Title (বাংলা)' : 'Image Title'}
                    </label>
                    <input
                      type="text"
                      value={activeLang === 'bn' ? (formBeat.imageTitleBn || '') : (formBeat.imageTitle || '')}
                      onChange={e => setFormBeat({
                        ...formBeat,
                        imageTitleBn: activeLang === 'bn' ? e.target.value : formBeat.imageTitleBn,
                        imageTitle: activeLang === 'en' ? e.target.value : formBeat.imageTitle
                      })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:border-[#6E56CF] outline-none"
                      placeholder={activeLang === 'bn' ? 'ভিজ্যুয়াল আর্কাইভ শিরোনাম' : 'Visual archive reference'}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {activeLang === 'bn' ? 'Image Subtitle (বাংলা)' : 'Image Subtitle'}
                    </label>
                    <input
                      type="text"
                      value={activeLang === 'bn' ? (formBeat.imageSubtitleBn || '') : (formBeat.imageSubtitle || '')}
                      onChange={e => setFormBeat({
                        ...formBeat,
                        imageSubtitleBn: activeLang === 'bn' ? e.target.value : formBeat.imageSubtitleBn,
                        imageSubtitle: activeLang === 'en' ? e.target.value : formBeat.imageSubtitle
                      })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:border-[#6E56CF] outline-none"
                      placeholder={activeLang === 'bn' ? 'ছোট ইমেজ প্রেক্ষাপট' : 'Short image context'}
                    />
                  </div>
                </div>

                {formBeat.image && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 w-full max-w-md h-40">
                    <img src={formBeat.image} alt="Research preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormBeat(prev => ({ ...prev, image: '' }))}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Research Narrative & Institutional Rationale */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {activeLang === 'bn' ? 'Research Narrative & Institutional Rationale (বাংলা)' : 'Research Narrative & Institutional Rationale'}
                </label>
                <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100 border border-slate-200 rounded-t-xl">
                  {[
                    ['bold', 'Bold'], ['italic', 'Italic'], ['underline', 'Underline'],
                    ['insertUnorderedList', 'Bulleted list'], ['insertOrderedList', 'Numbered list'],
                    ['formatBlock', 'Heading 2']
                  ].map(([command, label]) => (
                    <button
                      key={command}
                      type="button"
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => applyRichTextCommand(command, command === 'formatBlock' ? 'h2' : undefined)}
                      className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200 cursor-pointer"
                      title={label}
                    >
                      {label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => applyRichTextCommand('createLink', window.prompt('Enter URL') || '')}
                    className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200 cursor-pointer"
                  >
                    Link
                  </button>
                  <button
                    type="button"
                    onClick={() => applyRichTextCommand('undo')}
                    className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200 cursor-pointer"
                  >
                    Undo
                  </button>
                  <button
                    type="button"
                    onClick={() => applyRichTextCommand('redo')}
                    className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200 cursor-pointer"
                  >
                    Redo
                  </button>
                </div>
                <div
                  ref={richTextRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={e => {
                    const narrative = e.currentTarget.innerHTML;
                    setFormBeat(prev => ({
                      ...prev,
                      researchNarrativeBn: activeLang === 'bn' ? narrative : prev.researchNarrativeBn,
                      researchNarrative: activeLang === 'en' ? narrative : prev.researchNarrative,
                      summaryBn: activeLang === 'bn' ? narrative : prev.summaryBn,
                      summary: activeLang === 'en' ? narrative : prev.summary,
                    }));
                  }}
                  className="min-h-48 w-full bg-slate-50 border border-t-0 border-slate-200 rounded-b-xl p-3.5 text-sm text-slate-800 leading-relaxed outline-none focus:border-[#6E56CF] focus:bg-white"
                  data-placeholder={activeLang === 'bn' ? 'পূর্ণ গবেষণার ভাবনা ও প্রাতিষ্ঠানিক যুক্তি লিখুন...' : 'Write the full research narrative and institutional rationale...'}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubView('table')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#6E56CF] hover:bg-[#5842c3] text-white text-xs font-bold shadow-sm shadow-purple-200 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Research Track</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
