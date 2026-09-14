import React, { useState, useEffect } from 'react';
import {
  Save,
  Plus,
  Trash2,
  BookOpen,
  Eye,
  Sliders,
  Sparkles,
  ChevronRight,
  FileText,
  TrendingUp,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import {
  ResearchBeat,
  MetricItem,
  MethodologyProtocol,
  CaseStudy,
  PublicationItem
} from '../../types';

export const ResearchEditor: React.FC = () => {
  const {
    state,
    selectedBeatId,
    setSelectedBeatId,
    updateResearchBeat,
    addResearchBeat,
    deleteResearchBeat,
    setViewMode,
    searchQuery
  } = useCms();

  const beats = Object.values(state.researchBeats).sort((a, b) => 
    (a.beatNumber || '').localeCompare(b.beatNumber || '')
  );

  const [activeBeatId, setActiveBeatId] = useState<string>(
    selectedBeatId || beats[0]?.id || 'media-journalism'
  );

  useEffect(() => {
    if (selectedBeatId) {
      setActiveBeatId(selectedBeatId);
    }
  }, [selectedBeatId]);

  const currentBeat = state.researchBeats[activeBeatId] || beats[0];

  const [formData, setFormData] = useState<ResearchBeat>(currentBeat ? { ...currentBeat } : ({} as ResearchBeat));

  useEffect(() => {
    if (currentBeat) {
      setFormData({ ...currentBeat });
    }
  }, [currentBeat?.id]);

  const [showNewBeatModal, setShowNewBeatModal] = useState<boolean>(false);
  const [newBeatName, setNewBeatName] = useState<string>('');
  const [newBeatNumber, setNewBeatNumber] = useState<string>('07');

  if (!currentBeat) {
    return (
      <div className="p-8 text-center text-slate-400">
        No research tracks available.
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateResearchBeat(activeBeatId, formData);
  };

  const handleMetricChange = (index: number, field: keyof MetricItem, value: string) => {
    const metrics = [...(formData.metrics || [])];
    metrics[index] = { ...metrics[index], [field]: value };
    setFormData({ ...formData, metrics });
  };

  const handleAddMetric = () => {
    const newM: MetricItem = {
      id: 'm-' + Date.now(),
      label: 'New Metric',
      value: '100+',
      detail: 'Benchmark details'
    };
    setFormData({ ...formData, metrics: [...(formData.metrics || []), newM] });
  };

  const handleRemoveMetric = (index: number) => {
    const metrics = (formData.metrics || []).filter((_, i) => i !== index);
    setFormData({ ...formData, metrics });
  };

  const handleKeyQuestionChange = (index: number, value: string) => {
    const questions = [...(formData.keyQuestions || [])];
    questions[index] = value;
    setFormData({ ...formData, keyQuestions: questions });
  };

  const handleAddKeyQuestion = () => {
    setFormData({ ...formData, keyQuestions: [...(formData.keyQuestions || []), 'What empirical patterns emerge from long-term observations?'] });
  };

  const handleRemoveKeyQuestion = (index: number) => {
    setFormData({ ...formData, keyQuestions: (formData.keyQuestions || []).filter((_, i) => i !== index) });
  };

  const handleOverviewChange = (index: number, value: string) => {
    const overview = [...(formData.overview || [])];
    overview[index] = value;
    setFormData({ ...formData, overview });
  };

  const handleAddOverviewParagraph = () => {
    setFormData({ ...formData, overview: [...(formData.overview || []), 'Additional research narrative detailing problem scope and societal implications.'] });
  };

  const handleRemoveOverviewParagraph = (index: number) => {
    setFormData({ ...formData, overview: (formData.overview || []).filter((_, i) => i !== index) });
  };

  const handleAddCaseStudy = () => {
    const newCs: CaseStudy = {
      id: 'cs-' + Date.now(),
      title: 'New Investigation Study',
      year: '2025–2026',
      summary: 'Description of the empirical field study.',
      impact: 'Public policy and newsroom impact.'
    };
    setFormData({ ...formData, caseStudies: [...(formData.caseStudies || []), newCs] });
  };

  const handleCaseStudyChange = (index: number, field: keyof CaseStudy, value: string) => {
    const studies = [...(formData.caseStudies || [])];
    studies[index] = { ...studies[index], [field]: value };
    setFormData({ ...formData, caseStudies: studies });
  };

  const handleRemoveCaseStudy = (index: number) => {
    setFormData({ ...formData, caseStudies: (formData.caseStudies || []).filter((_, i) => i !== index) });
  };

  const handleAddProtocol = () => {
    const newP: MethodologyProtocol = {
      id: 'proto-' + Date.now(),
      title: 'New Methodological Protocol',
      protocol: 'Continuous systematic evaluation',
      frequency: 'Quarterly',
      description: 'Protocol description and validation criteria.'
    };
    setFormData({ ...formData, methodologyDetails: [...(formData.methodologyDetails || []), newP] });
  };

  const handleProtocolChange = (index: number, field: keyof MethodologyProtocol, value: string) => {
    const protos = [...(formData.methodologyDetails || [])];
    protos[index] = { ...protos[index], [field]: value };
    setFormData({ ...formData, methodologyDetails: protos });
  };

  const handleRemoveProtocol = (index: number) => {
    setFormData({ ...formData, methodologyDetails: (formData.methodologyDetails || []).filter((_, i) => i !== index) });
  };

  const handleLeadFellowsChange = (val: string) => {
    const fellows = val.split(',').map(s => s.trim()).filter(Boolean);
    setFormData({ ...formData, leadFellows: fellows });
  };

  const handleCreateNewBeat = () => {
    if (!newBeatName.trim()) return;
    const id = newBeatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newBeat: ResearchBeat = {
      id,
      beatNumber: newBeatNumber || '07',
      category: 'general',
      name: newBeatName,
      tagline: 'Empirical inquiry and investigation agenda.',
      description: 'Systematic observation, methodology design, and public knowledge dissemination.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
      outputsCount: '10 Reports & Monographs',
      timeframe: '2024 – Present',
      status: 'Active Longitudinal Beat',
      leadFellows: ['Dr. Tariqul Islam', 'Dr. Elena Rostova'],
      metrics: [
        { id: 'm1', label: 'Field Audits', value: '30 Outlets', detail: 'National coverage' },
        { id: 'm2', label: 'Interviews Logged', value: '80 Editors', detail: 'Semi-structured' }
      ],
      overview: ['Detailed overview of this new research domain.'],
      keyQuestions: ['What are the core democratic implications?'],
      methodologyDetails: [
        {
          id: 'p1',
          title: 'Primary Telemetry Audit',
          protocol: 'Cross-platform sampling',
          frequency: 'Monthly',
          description: 'Longitudinal capture and cross-validation.'
        }
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Inaugural Investigation Report',
          year: '2025',
          summary: 'Benchmark analysis across key media organizations.',
          impact: 'Shared with press councils.'
        }
      ],
      publications: []
    };

    addResearchBeat(newBeat);
    setActiveBeatId(newBeat.id);
    setSelectedBeatId(newBeat.id);
    setShowNewBeatModal(false);
    setNewBeatName('');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Beat Navigation Bar */}
      <div className="bg-[#0C2219] p-3 rounded-xl border border-[#16382B] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {beats.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setActiveBeatId(b.id);
                setSelectedBeatId(b.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeBeatId === b.id
                  ? 'bg-[#D2F818] text-[#0B2A20] shadow-sm font-bold'
                  : 'bg-[#081811] text-slate-300 hover:text-white hover:bg-[#143B2D] border border-[#16382B]'
              }`}
            >
              <span className={`font-mono text-[11px] ${activeBeatId === b.id ? 'text-[#0B2A20]' : 'text-[#D2F818]'}`}>
                {b.beatNumber || '00'}
              </span>
              <span>{b.name}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowNewBeatModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#144234] hover:bg-[#1A5442] text-xs font-bold text-[#D2F818] border border-[#23634F] transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Sub-Category</span>
        </button>
      </div>

      {/* Main Beat Editor Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Editor Actions Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#16382B]">
          <div className="flex items-center gap-3">
            <span className="text-xl font-mono font-bold text-[#D2F818] px-2.5 py-1 rounded bg-[#D2F818]/10 border border-[#D2F818]/30">
              {formData.beatNumber}
            </span>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">{formData.name}</h2>
              <p className="text-xs text-slate-400">Editing research sub-category configuration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {beats.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete the sub-category "${formData.name}"?`)) {
                    deleteResearchBeat(activeBeatId);
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-800/50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Track</span>
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Beat</span>
            </button>
          </div>
        </div>

        {/* 1. Basic Metadata & Banner */}
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-[#16382B] pb-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Core Metadata & Header</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Beat Number (e.g. 01, 02)</label>
              <input
                type="text"
                value={formData.beatNumber}
                onChange={(e) => setFormData({ ...formData, beatNumber: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sub-Category Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-bold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status Badge</label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Brief Summary Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Outputs Count Tag</label>
              <input
                type="text"
                value={formData.outputsCount}
                onChange={(e) => setFormData({ ...formData, outputsCount: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Observation Timeframe</label>
              <input
                type="text"
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cover Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Lead Research Fellows (Comma-separated)
            </label>
            <input
              type="text"
              value={(formData.leadFellows || []).join(', ')}
              onChange={(e) => handleLeadFellowsChange(e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              placeholder="e.g. Dr. Eleanor Vance, Tariq Rahman, Maya Lin"
            />
          </div>
        </div>

        {/* 2. Track Metrics (4 items) */}
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#D2F818]" />
              <span>Track-Specific Empirical Metrics</span>
            </h3>
            <button
              type="button"
              onClick={handleAddMetric}
              className="text-xs font-semibold text-[#D2F818] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(formData.metrics || []).map((m, index) => (
              <div key={m.id || index} className="p-3 bg-[#081811] border border-[#16382B] rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">Metric #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(index)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={m.value}
                    placeholder="Value (e.g. 48 Outlets)"
                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    className="bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={m.label}
                    placeholder="Label (e.g. Newsrooms Audited)"
                    onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                    className="bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <input
                  type="text"
                  value={m.detail}
                  placeholder="Detail context"
                  onChange={(e) => handleMetricChange(index, 'detail', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Narrative Overview & Key Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overview Paragraphs */}
          <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-[#16382B] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Overview Narrative</h3>
              <button
                type="button"
                onClick={handleAddOverviewParagraph}
                className="text-xs font-semibold text-[#D2F818] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>

            <div className="space-y-3">
              {(formData.overview || []).map((p, idx) => (
                <div key={idx} className="flex gap-2">
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => handleOverviewChange(idx, e.target.value)}
                    className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg p-2 text-xs text-slate-200 outline-none leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOverviewParagraph(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1 self-start"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Questions */}
          <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-[#16382B] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Research Inquiries</h3>
              <button
                type="button"
                onClick={handleAddKeyQuestion}
                className="text-xs font-semibold text-[#D2F818] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {(formData.keyQuestions || []).map((q, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-mono text-xs text-[#D2F818] pt-2">Q{idx + 1}</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => handleKeyQuestionChange(idx, e.target.value)}
                    className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyQuestion(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Methodology Protocols */}
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Scientific Methodology Protocols</span>
            </h3>
            <button
              type="button"
              onClick={handleAddProtocol}
              className="text-xs font-semibold text-[#D2F818] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Protocol</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.methodologyDetails || []).map((proto, idx) => (
              <div key={proto.id || idx} className="p-4 bg-[#081811] border border-[#16382B] rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={proto.title}
                    onChange={(e) => handleProtocolChange(idx, 'title', e.target.value)}
                    className="bg-transparent border-b border-[#16382B] text-xs font-bold text-white px-1 py-0.5 outline-none flex-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProtocol(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Protocol Protocol</label>
                    <input
                      type="text"
                      value={proto.protocol}
                      onChange={(e) => handleProtocolChange(idx, 'protocol', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={proto.frequency}
                      onChange={(e) => handleProtocolChange(idx, 'frequency', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Detailed Description</label>
                  <textarea
                    rows={2}
                    value={proto.description}
                    onChange={(e) => handleProtocolChange(idx, 'description', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-xs text-slate-300 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Empirical Case Studies */}
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D2F818]" />
              <span>Published Case Studies & Inquiries</span>
            </h3>
            <button
              type="button"
              onClick={handleAddCaseStudy}
              className="text-xs font-semibold text-[#D2F818] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Case Study</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.caseStudies || []).map((cs, idx) => (
              <div key={cs.id || idx} className="p-4 bg-[#081811] border border-[#16382B] rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={cs.title}
                    onChange={(e) => handleCaseStudyChange(idx, 'title', e.target.value)}
                    className="bg-transparent border-b border-[#16382B] text-xs font-bold text-white px-1 py-0.5 outline-none flex-1 mr-2"
                  />
                  <input
                    type="text"
                    value={cs.year}
                    onChange={(e) => handleCaseStudyChange(idx, 'year', e.target.value)}
                    className="bg-[#0C2218] border border-[#16382B] rounded px-2 py-0.5 text-xs text-[#D2F818] font-mono w-24 text-right"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCaseStudy(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1 ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Study Summary</label>
                  <textarea
                    rows={2}
                    value={cs.summary}
                    onChange={(e) => handleCaseStudyChange(idx, 'summary', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-xs text-slate-300 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Societal / Policy Impact</label>
                  <input
                    type="text"
                    value={cs.impact}
                    onChange={(e) => handleCaseStudyChange(idx, 'impact', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-emerald-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Sub-Category "{formData.name}"</span>
          </button>
        </div>
      </form>

      {/* Modal: Create New Sub-Category */}
      {showNewBeatModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0C241B] border border-[#23634E] rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white font-sans flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#D2F818]" />
              <span>Create New Research Sub-Category</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-Category Name</label>
              <input
                type="text"
                placeholder="e.g. Environmental Media & Climate Discourse"
                value={newBeatName}
                onChange={(e) => setNewBeatName(e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Beat Number</label>
              <input
                type="text"
                value={newBeatNumber}
                onChange={(e) => setNewBeatNumber(e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-2 text-xs text-white font-mono outline-none"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowNewBeatModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateNewBeat}
                className="px-5 py-2 rounded-lg text-xs font-extrabold bg-[#D2F818] text-[#0B2A20] uppercase tracking-wider hover:bg-[#bef024]"
              >
                Create Beat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
