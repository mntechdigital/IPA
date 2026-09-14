import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Shield,
  Eye,
  Building2,
  ListOrdered,
  Sparkles
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { AboutPageData, CoreTenet, MethodologyStep } from '../../types';

export const AboutPageEditor: React.FC = () => {
  const { state, updateAboutPage, setViewMode } = useCms();
  const [formData, setFormData] = useState<AboutPageData>({ ...state.aboutPage });

  const handleStoryParagraphChange = (index: number, val: string) => {
    const updated = [...formData.missionStory];
    updated[index] = val;
    setFormData({ ...formData, missionStory: updated });
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

  const handleStepChange = (index: number, field: keyof MethodologyStep, val: string) => {
    const updated = [...formData.methodologySteps];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, methodologySteps: updated });
  };

  const handleObservatoryChange = (index: number, field: string, val: string) => {
    const updated = [...formData.observatories];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, observatories: updated });
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
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mission Badge Tag</label>
            <input
              type="text"
              value={formData.missionBadge}
              onChange={(e) => setFormData({ ...formData, missionBadge: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Title</label>
            <input
              type="text"
              value={formData.missionTitle}
              onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none font-sans font-bold"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-300">Narrative Paragraphs</label>
          {formData.missionStory.map((para, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-xs font-mono text-slate-500 pt-2 shrink-0">#{index + 1}</span>
              <textarea
                rows={3}
                value={para}
                onChange={(e) => handleStoryParagraphChange(index, e.target.value)}
                className="flex-1 bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
              />
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
                <input
                  type="text"
                  value={principle.title}
                  onChange={(e) => handlePrincipleChange(index, 'title', e.target.value)}
                  className="bg-transparent border-b border-[#16382B] text-xs font-bold text-white px-1 py-0.5 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Short Description</label>
                <input
                  type="text"
                  value={principle.description}
                  onChange={(e) => handlePrincipleChange(index, 'description', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Operational Detail</label>
                <textarea
                  rows={2}
                  value={principle.detail}
                  onChange={(e) => handlePrincipleChange(index, 'detail', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded p-2 text-[11px] text-slate-300 outline-none leading-relaxed"
                />
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
                <input
                  type="text"
                  value={step.label}
                  onChange={(e) => handleStepChange(index, 'label', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-white font-semibold outline-none"
                />
              </div>
              <div className="md:col-span-6">
                <input
                  type="text"
                  value={step.summary}
                  onChange={(e) => handleStepChange(index, 'summary', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Physical Observatories & Infrastructure */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#D2F818]" />
            <span>4. Physical Observatories & Partner Labs</span>
          </h3>
          <p className="text-xs text-slate-400">Facilities across Dhaka & Partner observatories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.observatories.map((obs, index) => (
            <div key={index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Facility Name</label>
                <input
                  type="text"
                  value={obs.name}
                  onChange={(e) => handleObservatoryChange(index, 'name', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Function / Mandate</label>
                <input
                  type="text"
                  value={obs.role}
                  onChange={(e) => handleObservatoryChange(index, 'role', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Physical Address</label>
                <input
                  type="text"
                  value={obs.address}
                  onChange={(e) => handleObservatoryChange(index, 'address', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2 py-1 text-xs text-slate-300 outline-none"
                />
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
