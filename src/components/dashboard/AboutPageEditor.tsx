import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Shield,
  Eye,
  Building2,
  ListOrdered,
  Sparkles,
  Languages
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { AboutPageData, CoreTenet, MethodologyStep } from '../../types';

export const AboutPageEditor: React.FC = () => {
  const { state, updateAboutPage, setViewMode } = useCms();
  const [formData, setFormData] = useState<AboutPageData>({ ...state.aboutPage });
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn'>('en');

  const handleStoryParagraphChange = (index: number, val: string) => {
    const updated = [...formData.missionStory];
    updated[index] = val;
    setFormData({ ...formData, missionStory: updated });
  };

  const handleStoryParagraphBnChange = (index: number, val: string) => {
    const currentBn = formData.missionStoryBn || [];
    const updated = [...currentBn];
    updated[index] = val;
    setFormData({ ...formData, missionStoryBn: updated });
  };

  const handleAddStoryParagraph = () => {
    setFormData({ ...formData, missionStory: [...formData.missionStory, 'New descriptive paragraph outlining the observatory mission.'] });
  };

  const handleRemoveStoryParagraph = (index: number) => {
    setFormData({ ...formData, missionStory: formData.missionStory.filter((_, i) => i !== index) });
  };

  const handlePrincipleChange = (index: number, field: keyof CoreTenet, val: string) => {
    const updated = [...formData.principles];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, principles: updated });
  };

  const handleStepChange = (index: number, field: string, val: string) => {
    const updated = [...formData.methodologySteps];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, methodologySteps: updated });
  };

  const handleObservatoryChange = (index: number, field: string, val: string) => {
    const updated = [...formData.observatories];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, observatories: updated });
  };

  const handleGovernanceEthicsChange = (index: number, val: string) => {
    const updated = [...formData.governanceEthics];
    updated[index] = val;
    setFormData({ ...formData, governanceEthics: updated });
  };

  const handleGovernanceEthicsBnChange = (index: number, val: string) => {
    const currentBn = formData.governanceEthicsBn || [];
    const updated = [...currentBn];
    updated[index] = val;
    setFormData({ ...formData, governanceEthicsBn: updated });
  };

  const handleHeroBannerChange = (field: string, val: string) => {
    const current = formData.heroBanner || { badgeText: '', title: '', subtext: '', bgStyle: 'gradient' as const };
    setFormData({ ...formData, heroBanner: { ...current, [field]: val } });
  };

  const handleWhoWeAreChange = (field: string, val: string | string[]) => {
    const current = formData.whoWeAre || { narrative: [], mainPhoto: '', highlightCardText: '', foundedYear: '' };
    setFormData({ ...formData, whoWeAre: { ...current, [field]: val } });
  };

  const handlePillarChange = (index: number, field: string, val: string) => {
    const updated = [...formData.missionPillars];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, missionPillars: updated });
  };

  const handleFtiChange = (field: string, val: string) => {
    const current = formData.fromQuestionsToInsight || { heading: '', subheading: '', ctaText: '', destinationUrl: '' };
    setFormData({ ...formData, fromQuestionsToInsight: { ...current, [field]: val } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutPage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans">About Us & Methodology Editor</h2>
          <p className="text-xs text-slate-400">Manage institutional history, core principles, 5-step methodology, and physical observatories.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('frontend')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E291F] hover:bg-[#143B2D] text-slate-200 text-xs font-semibold border border-[#194030] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D2F818]" />
            <span>Preview in Live Site</span>
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Language Toggle Pills */}
      <div className="flex items-center justify-between bg-[#0C2219] p-3 rounded-xl border border-[#16382B]">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#D2F818]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Editing Translation:</span>
        </div>
        <div className="flex gap-1 bg-[#06140E] p-1 rounded-lg border border-[#16382B]">
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeLangTab === 'en'
                ? 'bg-[#154635] text-[#D2F818]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English (Primary)
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('bn')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeLangTab === 'bn'
                ? 'bg-[#154635] text-[#D2F818]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            বাংলা (Bengali)
          </button>
        </div>
      </div>

      {/* 1. Founding Mission & Story */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>1. Founding Mission & Narrative</span>
          </h3>
          <button
            type="button"
            onClick={handleAddStoryParagraph}
            className="text-xs font-semibold text-[#D2F818] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Paragraph</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mission Badge Tag {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.missionBadge}
                onChange={(e) => setFormData({ ...formData, missionBadge: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.missionBadgeBn || ''}
                onChange={(e) => setFormData({ ...formData, missionBadgeBn: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.missionTitle}
                onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none font-sans font-bold"
              />
            ) : (
              <input
                type="text"
                value={formData.missionTitleBn || ''}
                onChange={(e) => setFormData({ ...formData, missionTitleBn: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none font-sans font-bold"
              />
            )}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-300">
            Narrative Paragraphs {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {formData.missionStory.map((para, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-xs font-mono text-slate-500 pt-2 shrink-0">#{index + 1}</span>
              {activeLangTab === 'en' ? (
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => handleStoryParagraphChange(index, e.target.value)}
                  className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
                />
              ) : (
                <textarea
                  rows={3}
                  value={(formData.missionStoryBn || [])[index] || ''}
                  onChange={(e) => handleStoryParagraphBnChange(index, e.target.value)}
                  className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveStoryParagraph(index)}
                className="text-slate-500 hover:text-rose-400 p-2 self-start"
                title="Remove paragraph"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Four Institutional Principles */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D2F818]"></span>
            <span>2. Four Institutional Principles</span>
          </h3>
          <p className="text-xs text-slate-400">Independence, Evidence, Transparency, and Public Interest</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.principles.map((principle, index) => (
            <div key={principle.id || index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D2F818]">
                  {principle.number || `0${index + 1}`}
                </span>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={principle.title}
                    onChange={(e) => handlePrincipleChange(index, 'title', e.target.value)}
                    className="bg-transparent border-b border-[#16382B] text-xs font-bold text-white px-1 py-0.5 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={principle.titleBn || ''}
                    onChange={(e) => handlePrincipleChange(index, 'titleBn', e.target.value)}
                    className="bg-transparent border-b border-[#16382B] text-xs font-bold text-white px-1 py-0.5 outline-none"
                  />
                )}
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Short Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={principle.description}
                    onChange={(e) => handlePrincipleChange(index, 'description', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-200 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={principle.descriptionBn || ''}
                    onChange={(e) => handlePrincipleChange(index, 'descriptionBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-200 outline-none"
                  />
                )}
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Operational Detail {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <textarea
                    rows={2}
                    value={principle.detail}
                    onChange={(e) => handlePrincipleChange(index, 'detail', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-[11px] text-slate-300 outline-none leading-relaxed"
                  />
                ) : (
                  <textarea
                    rows={2}
                    value={principle.detailBn || ''}
                    onChange={(e) => handlePrincipleChange(index, 'detailBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-[11px] text-slate-300 outline-none leading-relaxed"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 5-Step Methodology Protocol */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>3. Five-Step Scientific Methodology</span>
          </h3>
          <p className="text-xs text-slate-400">The continuous empirical inquiry cycle: Question, Research, Evidence, Analysis, Insight</p>
        </div>

        <div className="space-y-3">
          {formData.methodologySteps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg bg-[#081811] border border-[#16382B] items-center">
              <div className="md:col-span-2">
                <span className="text-xs font-mono font-bold text-[#D2F818] block">{step.step}</span>
                <span className="text-[10px] text-slate-500">Step {index + 1}</span>
              </div>
              <div className="md:col-span-4">
                <label className="block text-[10px] text-slate-400 mb-1">
                  Label {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={step.label}
                    onChange={(e) => handleStepChange(index, 'label', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-white font-semibold outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={step.labelBn || ''}
                    onChange={(e) => handleStepChange(index, 'labelBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-white font-semibold outline-none"
                  />
                )}
              </div>
              <div className="md:col-span-6">
                <label className="block text-[10px] text-slate-400 mb-1">
                  Summary {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={step.summary}
                    onChange={(e) => handleStepChange(index, 'summary', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={step.summaryBn || ''}
                    onChange={(e) => handleStepChange(index, 'summaryBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Governance & Ethics */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D2F818]" />
            <span>4. Governance & Ethics Standards</span>
          </h3>
          <p className="text-xs text-slate-400">IRB protocols, privacy standards, peer review, and funding transparency</p>
        </div>

        <div className="space-y-3">
          {formData.governanceEthics.map((item, index) => (
            <div key={index} className="flex gap-2 items-start">
              <span className="text-xs font-mono text-slate-500 pt-2 shrink-0">#{index + 1}</span>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleGovernanceEthicsChange(index, e.target.value)}
                  className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={(formData.governanceEthicsBn || [])[index] || ''}
                  onChange={(e) => handleGovernanceEthicsBnChange(index, e.target.value)}
                  className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Physical Observatories & Infrastructure */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#D2F818]" />
            <span>5. Physical Observatories & Partner Labs</span>
          </h3>
          <p className="text-xs text-slate-400">Facilities across Dhaka & Partner observatories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.observatories.map((obs, index) => (
            <div key={index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Facility Name {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={obs.name}
                    onChange={(e) => handleObservatoryChange(index, 'name', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={obs.nameBn || ''}
                    onChange={(e) => handleObservatoryChange(index, 'nameBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                  />
                )}
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Function / Mandate {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={obs.role}
                    onChange={(e) => handleObservatoryChange(index, 'role', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={obs.roleBn || ''}
                    onChange={(e) => handleObservatoryChange(index, 'roleBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                  />
                )}
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Physical Address {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={obs.address}
                    onChange={(e) => handleObservatoryChange(index, 'address', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={obs.addressBn || ''}
                    onChange={(e) => handleObservatoryChange(index, 'addressBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={obs.phone}
                    onChange={(e) => handleObservatoryChange(index, 'phone', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Direct Email</label>
                  <input
                    type="email"
                    value={obs.email}
                    onChange={(e) => handleObservatoryChange(index, 'email', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Hero Banner */}
      {formData.heroBanner && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>6. Hero Banner</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">About page banner</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Badge Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.heroBanner.badgeText}
                  onChange={(e) => handleHeroBannerChange('badgeText', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.heroBanner.badgeTextBn || ''}
                  onChange={(e) => handleHeroBannerChange('badgeTextBn', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Banner Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.heroBanner.title}
                  onChange={(e) => handleHeroBannerChange('title', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.heroBanner.titleBn || ''}
                  onChange={(e) => handleHeroBannerChange('titleBn', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Banner Subtext {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.heroBanner.subtext}
                onChange={(e) => handleHeroBannerChange('subtext', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none leading-relaxed"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.heroBanner.subtextBn || ''}
                onChange={(e) => handleHeroBannerChange('subtextBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none leading-relaxed"
              />
            )}
          </div>
        </div>
      )}

      {/* 7. Who We Are */}
      {formData.whoWeAre && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D2F818]"></span>
              <span>7. Who We Are</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Organization overview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Heading {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.whoWeAre.heading || ''}
                  onChange={(e) => handleWhoWeAreChange('heading', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.whoWeAre.headingBn || ''}
                  onChange={(e) => handleWhoWeAreChange('headingBn', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Badge Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.whoWeAre.badgeText || ''}
                  onChange={(e) => handleWhoWeAreChange('badgeText', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.whoWeAre.badgeTextBn || ''}
                  onChange={(e) => handleWhoWeAreChange('badgeTextBn', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.whoWeAre.description || ''}
                onChange={(e) => handleWhoWeAreChange('description', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.whoWeAre.descriptionBn || ''}
                onChange={(e) => handleWhoWeAreChange('descriptionBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Photo URL</label>
              <input
                type="text"
                value={formData.whoWeAre.mainPhoto}
                onChange={(e) => handleWhoWeAreChange('mainPhoto', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Main Photo (Bengali) {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              <input
                type="text"
                value={formData.whoWeAre.mainPhotoBn || ''}
                onChange={(e) => handleWhoWeAreChange('mainPhotoBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-slate-300 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Highlight Card Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.whoWeAre.highlightCardText}
                onChange={(e) => handleWhoWeAreChange('highlightCardText', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.whoWeAre.highlightCardTextBn || ''}
                onChange={(e) => handleWhoWeAreChange('highlightCardTextBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none"
              />
            )}
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-slate-300">
              Narrative Paragraphs {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {formData.whoWeAre.narrative.map((para, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-xs font-mono text-slate-500 pt-2 shrink-0">#{index + 1}</span>
                {activeLangTab === 'en' ? (
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) => {
                      const updated = [...formData.whoWeAre!.narrative];
                      updated[index] = e.target.value;
                      handleWhoWeAreChange('narrative', updated);
                    }}
                    className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
                  />
                ) : (
                  <textarea
                    rows={3}
                    value={(formData.whoWeAre.narrativeBn || [])[index] || ''}
                    onChange={(e) => {
                      const currentBn = formData.whoWeAre!.narrativeBn || [];
                      const updated = [...currentBn];
                      updated[index] = e.target.value;
                      handleWhoWeAreChange('narrativeBn', updated);
                    }}
                    className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.whoWeAre!.narrative.filter((_, i) => i !== index);
                    handleWhoWeAreChange('narrative', updated);
                  }}
                  className="text-slate-500 hover:text-rose-400 p-2 self-start"
                  title="Remove paragraph"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Mission Pillars */}
      {formData.missionPillars && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-[#D2F818]" />
              <span>8. Mission Pillars</span>
            </h3>
            <p className="text-xs text-slate-400">Core structural pillars underpinning the observatory mandate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.missionPillars.map((pillar, index) => (
              <div key={pillar.id || index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#D2F818]">
                    {pillar.badge}
                  </span>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={pillar.badge}
                      onChange={(e) => handlePillarChange(index, 'badge', e.target.value)}
                      className="bg-transparent border-b border-[#16382B] text-[10px] font-bold text-slate-400 px-1 py-0.5 outline-none w-24 text-right"
                    />
                  ) : (
                    <input
                      type="text"
                      value={pillar.badgeBn || ''}
                      onChange={(e) => handlePillarChange(index, 'badgeBn', e.target.value)}
                      className="bg-transparent border-b border-[#16382B] text-[10px] font-bold text-slate-400 px-1 py-0.5 outline-none w-24 text-right"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    Pillar Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                  </label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handlePillarChange(index, 'title', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={pillar.titleBn || ''}
                      onChange={(e) => handlePillarChange(index, 'titleBn', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    Quote {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                  </label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={pillar.quote}
                      onChange={(e) => handlePillarChange(index, 'quote', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={pillar.quoteBn || ''}
                      onChange={(e) => handlePillarChange(index, 'quoteBn', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                  </label>
                  {activeLangTab === 'en' ? (
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => handlePillarChange(index, 'description', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-[11px] text-slate-300 outline-none leading-relaxed"
                    />
                  ) : (
                    <textarea
                      rows={2}
                      value={pillar.descriptionBn || ''}
                      onChange={(e) => handlePillarChange(index, 'descriptionBn', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-[11px] text-slate-300 outline-none leading-relaxed"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. From Questions to Insight */}
      {formData.fromQuestionsToInsight && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D2F818]" />
              <span>9. From Questions to Insight</span>
            </h3>
            <p className="text-xs text-slate-400">Closing section CTA block</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Heading {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.fromQuestionsToInsight.heading}
                  onChange={(e) => handleFtiChange('heading', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-bold outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.fromQuestionsToInsight.headingBn || ''}
                  onChange={(e) => handleFtiChange('headingBn', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-bold outline-none"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subheading {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.fromQuestionsToInsight.subheading}
                  onChange={(e) => handleFtiChange('subheading', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.fromQuestionsToInsight.subheadingBn || ''}
                  onChange={(e) => handleFtiChange('subheadingBn', e.target.value)}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              CTA Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.fromQuestionsToInsight.ctaText}
                onChange={(e) => handleFtiChange('ctaText', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.fromQuestionsToInsight.ctaTextBn || ''}
                onChange={(e) => handleFtiChange('ctaTextBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            )}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save About Us Changes</span>
        </button>
      </div>
    </form>
  );
};
