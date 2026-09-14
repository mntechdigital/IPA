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
  Tag
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ResearchBeat } from '../../types';

interface ResearchManagerViewProps {
  initialApp?: 'category' | 'create';
}

export const ResearchManagerView: React.FC<ResearchManagerViewProps> = ({ initialApp = 'create' }) => {
  const { state, updateResearchBeat, addResearchBeat, deleteResearchBeat, setNotification, setSelectedSectionAppId } = useCms();

  // Active sub-app: 'category' or 'create'
  const [activeApp, setActiveApp] = useState<'category' | 'create'>(initialApp);

  // In 'create' app: 'table' view or 'editor-page' view
  const [subView, setSubView] = useState<'table' | 'editor'>('table');
  const [editingBeatId, setEditingBeatId] = useState<string | null>(null);
  const [isNewBeat, setIsNewBeat] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLeadFellowsOpen, setIsLeadFellowsOpen] = useState<boolean>(false);
  const richTextRef = useRef<HTMLDivElement>(null);

  // Categories taxonomy state (derived & extendable)
  const defaultCategories = [
    { id: 'journalism', code: 'JRN-01', name: 'Media & Journalism', description: 'Newsroom structures, editorial independence, ownership concentration, and investigative audits' },
    { id: 'platforms', code: 'PLT-02', name: 'Digital Media & Algorithms', description: 'Platform governance, viral engagement loops, generative automation, and recommendation audits' },
    { id: 'monitoring', code: 'MON-03', name: 'Media Monitoring', description: 'Continuous broadcast archiving, print corpus scraping, NLP sentiment pipelines, and transcript indexing' },
    { id: 'public', code: 'PUB-04', name: 'Public Opinion & Trust', description: 'Annual media trust indices, representative probability surveys, and citizen verification panels' },
    { id: 'democracy', code: 'DEM-05', name: 'Media & Democracy', description: 'Press freedom legal harassment, state advertising allocations, and institutional pressure tracking' },
    { id: 'ai', code: 'TEC-06', name: 'Technology & AI', description: 'Multimodal synthetic detection, deepfake risks, watermarking provenance, and automated newsrooms' }
  ];

  const [categoriesList, setCategoriesList] = useState(defaultCategories);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<{ id: string; code: string; name: string; description: string } | null>(null);

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

  useEffect(() => {
    if (richTextRef.current) {
      richTextRef.current.innerHTML = formBeat.researchNarrative || formBeat.summary || '';
    }
  }, [formBeat.id]);

  const beatsList = Object.values(state.researchBeats).sort((a, b) =>
    (a.beatNumber || '').localeCompare(b.beatNumber || '')
  );

  const filteredBeats = beatsList.filter(beat => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      beat.name.toLowerCase().includes(q) ||
      (beat.tagline && beat.tagline.toLowerCase().includes(q)) ||
      (beat.leadFellows || []).some(f => f.toLowerCase().includes(q)) ||
      beat.beatNumber.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || beat.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleStartCreateResearch = () => {
    const nextNum = (beatsList.length + 1).toString().padStart(2, '0');
    setFormBeat({
      id: 'beat-' + Date.now(),
      beatNumber: nextNum,
      name: '',
      tagline: '',
      category: 'journalism',
      description: '',
      image: '',
      timeframe: '2024 – Present',
      leadFellows: ['Dr. Sabrina Farhana', 'Shahidul Alam'],
      status: 'active',
      summary: '',
      outputsCount: '2 Published Monographs',
      methodology: 'Triangulated empirical methodology combining qualitative newsroom interviews, open web corpus indexing, and statistical modeling.',
      primaryMethodologies: [],
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
    setSubView('editor');
  };

  const handleStartEditResearch = (beat: ResearchBeat) => {
    setFormBeat({
      ...beat,
      leadFellows: [...(beat.leadFellows || [])],
      metrics: [...(beat.metrics || [])]
    });
    setEditingBeatId(beat.id);
    setIsNewBeat(false);
    setSubView('editor');
  };

  const handleSaveResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBeat.name.trim()) {
      alert('Please enter a research program title.');
      return;
    }

    const researchToSave: ResearchBeat = {
      ...formBeat,
      description: formBeat.researchNarrative || formBeat.summary || '',
      summary: formBeat.researchNarrative || formBeat.summary || '',
      overview: formBeat.researchNarrative || formBeat.summary ? [formBeat.researchNarrative || formBeat.summary] : []
    };

    if (isNewBeat) {
      addResearchBeat(researchToSave);
      setNotification({ message: `Research investigation "${formBeat.name}" created successfully.`, type: 'success' });
    } else {
      updateResearchBeat(formBeat.id, researchToSave);
      setNotification({ message: `Research investigation "${formBeat.name}" updated successfully.`, type: 'success' });
    }

    setSubView('table');
  };

  const applyRichTextCommand = (command: string, value?: string) => {
    richTextRef.current?.focus();
    document.execCommand(command, false, value);
    if (richTextRef.current) {
      const narrative = richTextRef.current.innerHTML;
      setFormBeat(prev => ({ ...prev, researchNarrative: narrative, summary: narrative }));
    }
  };

  const handleResearchImageUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => setFormBeat(prev => ({ ...prev, image: event.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleDeleteResearch = (beat: ResearchBeat) => {
    if (window.confirm(`Are you sure you want to delete research track "${beat.name}"?`)) {
      deleteResearchBeat(beat.id);
      setNotification({ message: `Research track "${beat.name}" deleted.`, type: 'success' });
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name.trim()) return;

    if (categoriesList.some(c => c.id === editingCategory.id)) {
      setCategoriesList(categoriesList.map(c => c.id === editingCategory.id ? editingCategory : c));
      setNotification({ message: `Category "${editingCategory.name}" updated.`, type: 'success' });
    } else {
      setCategoriesList([...categoriesList, editingCategory]);
      setNotification({ message: `Category "${editingCategory.name}" created.`, type: 'success' });
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top App Switcher: Category App & Create Researches App */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#6E56CF]"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E56CF]">
              Research Architecture Hub
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Research Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage research taxonomies or maintain the master table of created investigations.
          </p>
        </div>

        {/* 2 Apps Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          <button
            id="tab-app-category"
            onClick={() => {
              setActiveApp('category');
              setSelectedSectionAppId('research-categories');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeApp === 'category'
                ? 'bg-white text-[#6E56CF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Category App</span>
          </button>
          <button
            id="tab-app-create-researches"
            onClick={() => {
              setActiveApp('create');
              setSelectedSectionAppId('research-create');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeApp === 'create'
                ? 'bg-white text-[#6E56CF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Create Researches App</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* APP 1: CATEGORY APP                                      */}
      {/* ======================================================== */}
      {activeApp === 'category' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#1E1B4B] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#6E56CF]" />
                <span>Research Categories & Classification Taxonomy</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Define and categorize empirical tracks across journalism, platform governance, and AI forensics.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingCategory({
                  id: 'cat-' + Date.now(),
                  code: 'CAT-0' + (categoriesList.length + 1),
                  name: '',
                  description: ''
                });
                setIsCategoryModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6E56CF] hover:bg-[#5842c3] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Categories Grid Array */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriesList.map((cat, idx) => {
              const assignedBeatsCount = beatsList.filter(b => b.category === cat.id).length;
              return (
                <div
                  key={cat.id || idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#6E56CF]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-purple-50 text-[#6E56CF] font-mono text-[11px] font-bold border border-purple-100">
                        {cat.code}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {assignedBeatsCount} {assignedBeatsCount === 1 ? 'Investigation' : 'Investigations'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#1E1B4B]">{cat.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory({ ...cat });
                        setIsCategoryModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-[#6E56CF] hover:bg-purple-50 text-xs font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete category "${cat.name}"?`)) {
                          setCategoriesList(categoriesList.filter(c => c.id !== cat.id));
                          setNotification({ message: `Category "${cat.name}" removed.`, type: 'info' });
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Edit Category Modal */}
          {isCategoryModalOpen && editingCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-scale-in">
                <h3 className="text-sm font-bold text-[#1E1B4B]">
                  {categoriesList.some(c => c.id === editingCategory.id) ? 'Edit Category' : 'Create Category'}
                </h3>
                <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category Code</label>
                    <input
                      type="text"
                      required
                      value={editingCategory.code}
                      onChange={e => setEditingCategory({ ...editingCategory, code: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category Name</label>
                    <input
                      type="text"
                      required
                      value={editingCategory.name}
                      onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Scope & Description</label>
                    <textarea
                      rows={3}
                      value={editingCategory.description}
                      onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsCategoryModalOpen(false)}
                      className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-[#6E56CF] text-white font-bold hover:bg-[#5842c3]"
                    >
                      Save Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* APP 2: CREATE RESEARCHES APP                             */}
      {/* ======================================================== */}
      {activeApp === 'create' && subView === 'table' && (
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
                  <option value="journalism">Journalism</option>
                  <option value="platforms">Platforms & Algorithms</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="public">Public Opinion</option>
                  <option value="democracy">Democracy</option>
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
              <span>Create Research</span>
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
                          Click "Create Research" to configure and launch a new empirical investigation.
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
                              title="Delete Research"
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
      {/* DEDICATED FULL-PAGE CREATE / EDIT VIEW                   */}
      {/* ======================================================== */}
      {activeApp === 'create' && subView === 'editor' && (
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
              {isNewBeat ? 'New Research Program' : `Editing Beat ${formBeat.beatNumber}`}
            </span>
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
                  <label className="text-xs font-bold text-slate-700">Research Program Title</label>
                  <input
                    type="text"
                    required
                    value={formBeat.name}
                    onChange={e => setFormBeat({ ...formBeat, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                    placeholder="e.g. Media Concentration & Cross-Border Capital Flows"
                  />
                </div>

                {/* Category Dropdown (rendered below the tagline) */}
                <div className="hidden">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={formBeat.category}
                    onChange={e => setFormBeat({ ...formBeat, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="journalism">Media & Journalism</option>
                    <option value="platforms">Digital Media & Algorithms</option>
                    <option value="monitoring">Media Monitoring</option>
                    <option value="public">Public Opinion & Trust</option>
                    <option value="democracy">Media & Democracy</option>
                    <option value="ai">Technology & AI</option>
                  </select>
                </div>

                {/* Timeframe (rendered below the tagline) */}
                <div className="hidden">
                  <label className="text-xs font-bold text-slate-700">Investigation Timeframe</label>
                  <input
                    type="text"
                    value={formBeat.timeframe}
                    onChange={e => setFormBeat({ ...formBeat, timeframe: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800"
                    placeholder="2024 – Present"
                  />
                </div>

              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Focus Thesis / Tagline</label>
                <input
                  type="text"
                  value={formBeat.tagline}
                  onChange={e => setFormBeat({ ...formBeat, tagline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-serif italic"
                  placeholder="Empirical auditing of ownership transparency and editorial autonomy."
                />
              </div>

              {/* Timeframe and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Investigation Timeframe</label>
                  <input
                    type="text"
                    value={formBeat.timeframe}
                    onChange={e => setFormBeat({ ...formBeat, timeframe: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800"
                    placeholder="Investigation period"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={formBeat.category}
                    onChange={e => setFormBeat({ ...formBeat, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="journalism">Media & Journalism</option>
                    <option value="platforms">Digital Media & Algorithms</option>
                    <option value="monitoring">Media Monitoring</option>
                    <option value="public">Public Opinion & Trust</option>
                    <option value="democracy">Media & Democracy</option>
                    <option value="ai">Technology & AI</option>
                  </select>
                </div>
              </div>

              {/* Primary Methodologies */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Primary Methodologies <span className="text-slate-400 font-normal">(comma-separated names)</span></label>
                <input
                  type="text"
                  value={(formBeat.primaryMethodologies || []).join(', ')}
                  onChange={e => setFormBeat({ ...formBeat, primaryMethodologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean), methodology: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  placeholder="Ethnography, Corpus Analysis, Network Mapping"
                />
              </div>

              {/* Lead Fellows */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Lead Fellows</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLeadFellowsOpen(open => !open)}
                    className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-left text-slate-800"
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleResearchImageUpload(e.target.files?.[0])}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Image Title</label>
                    <input
                      type="text"
                      value={formBeat.imageTitle || ''}
                      onChange={e => setFormBeat({ ...formBeat, imageTitle: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
                      placeholder="Visual archive title"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Image Subtitle</label>
                    <input
                      type="text"
                      value={formBeat.imageSubtitle || ''}
                      onChange={e => setFormBeat({ ...formBeat, imageSubtitle: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
                      placeholder="Short image context"
                    />
                  </div>
                </div>
                {formBeat.image && <img src={formBeat.image} alt="Research preview" className="h-32 w-full rounded-xl object-cover border border-slate-200" />}
              </div>

              {/* Research Narrative & Institutional Rationale */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Research Narrative & Institutional Rationale</label>
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
                      className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200"
                      title={label}
                    >
                      {label}
                    </button>
                  ))}
                  <button type="button" onClick={() => applyRichTextCommand('createLink', window.prompt('Enter URL') || '')} className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200">Link</button>
                  <button type="button" onClick={() => applyRichTextCommand('undo')} className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200">Undo</button>
                  <button type="button" onClick={() => applyRichTextCommand('redo')} className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-[#6E56CF] hover:border-purple-200">Redo</button>
                </div>
                <div
                  ref={richTextRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={e => {
                    const narrative = e.currentTarget.innerHTML;
                    setFormBeat(prev => ({ ...prev, researchNarrative: narrative, summary: narrative }));
                  }}
                  className="min-h-48 w-full bg-slate-50 border border-t-0 border-slate-200 rounded-b-xl p-3 text-sm text-slate-800 leading-relaxed outline-none focus:border-[#6E56CF]"
                  data-placeholder="Write the full research narrative and institutional rationale..."
                />
              </div>

              {/* Legacy methodology field retained for saved-record compatibility */}
              <div className="hidden">
                <label className="text-xs font-bold text-slate-700">Primary Methodologies <span className="text-slate-400 font-normal">(comma-separated names)</span></label>
                <input
                  type="text"
                  value={(formBeat.primaryMethodologies || []).join(', ')}
                  onChange={e => setFormBeat({ ...formBeat, primaryMethodologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean), methodology: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  placeholder="Ethnography, Corpus Analysis, Network Mapping"
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
                <span>Save Research Program</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
