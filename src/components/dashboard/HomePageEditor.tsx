import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Plus,
  Trash2,
  Image as ImageIcon,
  Languages,
  CheckCircle2
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { HomePageData, MetricItem } from '../../types';

export const HomePageEditor: React.FC = () => {
  const { state, updateHomePage, setViewMode } = useCms();
  const [formData, setFormData] = useState<HomePageData>({ ...state.homePage });
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn'>('en');

  const handleImageUpload = (file: File, onLoad: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const handleMetricChange = (index: number, field: keyof MetricItem, value: string) => {
    const updatedMetrics = [...formData.homeMetrics];
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value };
    setFormData({ ...formData, homeMetrics: updatedMetrics });
  };

  const handleAddMetric = () => {
    const newMetric: MetricItem = {
      id: 'm-' + Date.now(),
      label: 'New Metric',
      value: '100+',
      detail: 'Metric description & benchmark'
    };
    setFormData({ ...formData, homeMetrics: [...formData.homeMetrics, newMetric] });
  };

  const handleRemoveMetric = (index: number) => {
    const updatedMetrics = formData.homeMetrics.filter((_, i) => i !== index);
    setFormData({ ...formData, homeMetrics: updatedMetrics });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomePage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans">Home Page Editorial Manager</h2>
          <p className="text-xs text-slate-400">Configure hero text, bilingual translations, tenets, and featured metrics.</p>
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

      {/* Section 1: Hero Main */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>1. Hero Section & Branding</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Above the fold</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Observatory Badge Tag {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.badgeBn}
                onChange={(e) => setFormData({ ...formData, badgeBn: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Main Hero Headline {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:border-[#D2F818] outline-none font-sans"
            />
          ) : (
            <input
              type="text"
              value={formData.heroHeadlineBn}
              onChange={(e) => setFormData({ ...formData, heroHeadlineBn: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:border-[#D2F818] outline-none font-sans"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Hero Subtitle Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <textarea
              rows={3}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
            />
          ) : (
            <textarea
              rows={3}
              value={formData.heroSubtitleBn}
              onChange={(e) => setFormData({ ...formData, heroSubtitleBn: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hero Background Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, heroImage => setFormData({ ...formData, heroImage }));
              }}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Institutional Core Tenet Quote */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D2F818]"></span>
            <span>2. Institutional Core Tenet & Philosophy</span>
          </h3>
          <span className="text-xs text-slate-400">Featured Quotation Block</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Badge Title
          </label>
          <input
            type="text"
            value={formData.tenetBadge}
            onChange={(e) => setFormData({ ...formData, tenetBadge: e.target.value })}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Core Tenet Quote {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <input
              type="text"
              value={formData.tenetQuote}
              onChange={(e) => setFormData({ ...formData, tenetQuote: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-serif italic text-[#D2F818] focus:border-[#D2F818] outline-none"
            />
          ) : (
            <input
              type="text"
              value={formData.tenetQuoteBn}
              onChange={(e) => setFormData({ ...formData, tenetQuoteBn: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-serif italic text-[#D2F818] focus:border-[#D2F818] outline-none"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Philosophy Statement {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <textarea
              rows={2}
              value={formData.tenetSubtitle}
              onChange={(e) => setFormData({ ...formData, tenetSubtitle: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
            />
          ) : (
            <textarea
              rows={2}
              value={formData.tenetSubtitleBn}
              onChange={(e) => setFormData({ ...formData, tenetSubtitleBn: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
            />
          )}
        </div>
      </div>

      {/* Section 3: Featured Home Metrics */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>3. Key Home Metrics Bar</span>
            </h3>
            <p className="text-xs text-slate-400">High-visibility statistical counters featured across the home page</p>
          </div>
          <button
            type="button"
            onClick={handleAddMetric}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#144234] hover:bg-[#1A5442] text-xs text-[#D2F818] font-bold border border-[#23634F] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.homeMetrics.map((metric, index) => (
            <div key={metric.id || index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2F818]">
                  Metric #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(index)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                  title="Remove Metric"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Headline Value</label>
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Supporting Context / Detail</label>
                <input
                  type="text"
                  value={metric.detail}
                  onChange={(e) => handleMetricChange(index, 'detail', e.target.value)}
                  className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button Bar */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Home Page Changes</span>
        </button>
      </div>
    </form>
  );
};
