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

  const handleMetricChange = (index: number, field: string, value: string) => {
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
            Badge Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <input
              type="text"
              value={formData.tenetBadge}
              onChange={(e) => setFormData({ ...formData, tenetBadge: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          ) : (
            <input
              type="text"
              value={formData.tenetBadgeBn}
              onChange={(e) => setFormData({ ...formData, tenetBadgeBn: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          )}
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
                  <label className="block text-[11px] text-slate-400 mb-1">Headline Value {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={metric.valueBn}
                      onChange={(e) => handleMetricChange(index, 'valueBn', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Metric Label {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={metric.labelBn}
                      onChange={(e) => handleMetricChange(index, 'labelBn', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Supporting Context / Detail {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={metric.detail}
                    onChange={(e) => handleMetricChange(index, 'detail', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={metric.detailBn}
                    onChange={(e) => handleMetricChange(index, 'detailBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: CTA Buttons */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>4. Call-to-Action Buttons</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Hero CTAs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary CTA Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.primaryCtaText}
                onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.primaryCtaTextBn}
                onChange={(e) => setFormData({ ...formData, primaryCtaTextBn: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secondary CTA Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.secondaryCtaText}
                onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.secondaryCtaTextBn}
                onChange={(e) => setFormData({ ...formData, secondaryCtaTextBn: e.target.value })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>
      </div>

      {/* Section 5: Public Interest Banner */}
      {formData.publicInterestBanner && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>5. Public Interest Banner</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Mission statement block</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Badge {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.publicInterestBanner.badge}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, badge: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.publicInterestBanner.badgeBn}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, badgeBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.publicInterestBanner.title}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, title: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.publicInterestBanner.titleBn}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, titleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={3}
                value={formData.publicInterestBanner.description}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, description: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
              />
            ) : (
              <textarea
                rows={3}
                value={formData.publicInterestBanner.descriptionBn}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, descriptionBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              CTA Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.publicInterestBanner.ctaText}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, ctaText: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.publicInterestBanner.ctaTextBn}
                onChange={(e) => setFormData({ ...formData, publicInterestBanner: { ...formData.publicInterestBanner, ctaTextBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>
      )}

      {/* Section 6: What We Do */}
      {formData.whatWeDo && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>6. What We Do</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Capability cards</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Header {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.whatWeDo.header}
                onChange={(e) => setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, header: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.whatWeDo.headerBn}
                onChange={(e) => setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, headerBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subheader {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.whatWeDo.subheader}
                onChange={(e) => setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, subheader: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.whatWeDo.subheaderBn}
                onChange={(e) => setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, subheaderBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          {formData.whatWeDo.cards.map((card, index) => (
            <div key={card.id || index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2F818]">Card #{index + 1}</span>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Card Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updatedCards = [...formData.whatWeDo.cards];
                        updatedCards[index] = { ...updatedCards[index], title: e.target.value };
                        setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, cards: updatedCards } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={card.titleBn}
                      onChange={(e) => {
                        const updatedCards = [...formData.whatWeDo.cards];
                        updatedCards[index] = { ...updatedCards[index], titleBn: e.target.value };
                        setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, cards: updatedCards } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Card Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const updatedCards = [...formData.whatWeDo.cards];
                        updatedCards[index] = { ...updatedCards[index], description: e.target.value };
                        setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, cards: updatedCards } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                    />
                  ) : (
                    <textarea
                      rows={2}
                      value={card.descriptionBn}
                      onChange={(e) => {
                        const updatedCards = [...formData.whatWeDo.cards];
                        updatedCards[index] = { ...updatedCards[index], descriptionBn: e.target.value };
                        setFormData({ ...formData, whatWeDo: { ...formData.whatWeDo, cards: updatedCards } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 7: Areas of Investigation */}
      {formData.areasOfInvestigation && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>7. Areas of Investigation</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Research categories</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.areasOfInvestigation.title}
                onChange={(e) => setFormData({ ...formData, areasOfInvestigation: { ...formData.areasOfInvestigation, title: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.areasOfInvestigation.titleBn}
                onChange={(e) => setFormData({ ...formData, areasOfInvestigation: { ...formData.areasOfInvestigation, titleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subtitle {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.areasOfInvestigation.subtitle}
                onChange={(e) => setFormData({ ...formData, areasOfInvestigation: { ...formData.areasOfInvestigation, subtitle: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.areasOfInvestigation.subtitleBn}
                onChange={(e) => setFormData({ ...formData, areasOfInvestigation: { ...formData.areasOfInvestigation, subtitleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          {formData.areasOfInvestigation.filterLabel && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Filter Label {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.areasOfInvestigation.filterLabel}
                  onChange={(e) => setFormData({ ...formData, areasOfInvestigation: { ...formData.areasOfInvestigation, filterLabel: e.target.value } })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.areasOfInvestigation.filterLabelBn}
                  onChange={(e) => setFormData({ ...formData, areasOfInvestigation: { ...formData.areasOfInvestigation, filterLabelBn: e.target.value } })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Section 8: How We Work */}
      {formData.howWeWork && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>8. How We Work</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Process methodology</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Badge {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.howWeWork.badge}
                onChange={(e) => setFormData({ ...formData, howWeWork: { ...formData.howWeWork, badge: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.howWeWork.badgeBn}
                onChange={(e) => setFormData({ ...formData, howWeWork: { ...formData.howWeWork, badgeBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.howWeWork.title}
                onChange={(e) => setFormData({ ...formData, howWeWork: { ...formData.howWeWork, title: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.howWeWork.titleBn}
                onChange={(e) => setFormData({ ...formData, howWeWork: { ...formData.howWeWork, titleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subtitle {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.howWeWork.subtitle}
                onChange={(e) => setFormData({ ...formData, howWeWork: { ...formData.howWeWork, subtitle: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.howWeWork.subtitleBn}
                onChange={(e) => setFormData({ ...formData, howWeWork: { ...formData.howWeWork, subtitleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          {formData.howWeWork.steps.map((step, index) => {
            const stepBn = formData.howWeWork?.stepsBn?.[index];
            return (
              <div key={index} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2F818]">Step {step.step}</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Subheading {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={step.subheading}
                      onChange={(e) => {
                        const updatedSteps = [...formData.howWeWork.steps];
                        updatedSteps[index] = { ...updatedSteps[index], subheading: e.target.value };
                        setFormData({ ...formData, howWeWork: { ...formData.howWeWork, steps: updatedSteps } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={stepBn?.subheading}
                      onChange={(e) => {
                        const stepsBn = [...(formData.howWeWork?.stepsBn || [])];
                        stepsBn[index] = { ...stepsBn[index], subheading: e.target.value };
                        setFormData({ ...formData, howWeWork: { ...formData.howWeWork, stepsBn } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Step Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updatedSteps = [...formData.howWeWork.steps];
                        updatedSteps[index] = { ...updatedSteps[index], title: e.target.value };
                        setFormData({ ...formData, howWeWork: { ...formData.howWeWork, steps: updatedSteps } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={stepBn?.title}
                      onChange={(e) => {
                        const stepsBn = [...(formData.howWeWork?.stepsBn || [])];
                        stepsBn[index] = { ...stepsBn[index], title: e.target.value };
                        setFormData({ ...formData, howWeWork: { ...formData.howWeWork, stepsBn } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-bold outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                  {activeLangTab === 'en' ? (
                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => {
                        const updatedSteps = [...formData.howWeWork.steps];
                        updatedSteps[index] = { ...updatedSteps[index], description: e.target.value };
                        setFormData({ ...formData, howWeWork: { ...formData.howWeWork, steps: updatedSteps } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                    />
                  ) : (
                    <textarea
                      rows={2}
                      value={stepBn?.description}
                      onChange={(e) => {
                        const stepsBn = [...(formData.howWeWork?.stepsBn || [])];
                        stepsBn[index] = { ...stepsBn[index], description: e.target.value };
                        setFormData({ ...formData, howWeWork: { ...formData.howWeWork, stepsBn } });
                      }}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-300 outline-none"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Section 9: Featured Team */}
      {formData.featuredTeam && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>9. Featured Team</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Leadership preview</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.featuredTeam.title}
                onChange={(e) => setFormData({ ...formData, featuredTeam: { ...formData.featuredTeam, title: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.featuredTeam.titleBn}
                onChange={(e) => setFormData({ ...formData, featuredTeam: { ...formData.featuredTeam, titleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subtitle {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={2}
                value={formData.featuredTeam.subtitle}
                onChange={(e) => setFormData({ ...formData, featuredTeam: { ...formData.featuredTeam, subtitle: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            ) : (
              <textarea
                rows={2}
                value={formData.featuredTeam.subtitleBn}
                onChange={(e) => setFormData({ ...formData, featuredTeam: { ...formData.featuredTeam, subtitleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>
      )}

      {/* Section 10: Bottom CTA */}
      {formData.bottomCta && (
        <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>10. Bottom Call-to-Action</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Footer CTA block</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.bottomCta.title}
                onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, title: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.bottomCta.titleBn}
                onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, titleBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-bold text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Narrative {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <textarea
                rows={3}
                value={formData.bottomCta.narrative}
                onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, narrative: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
              />
            ) : (
              <textarea
                rows={3}
                value={formData.bottomCta.narrativeBn}
                onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, narrativeBn: e.target.value } })}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary CTA Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.bottomCta.primaryCtaText}
                  onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, primaryCtaText: e.target.value } })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.bottomCta.primaryCtaTextBn}
                  onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, primaryCtaTextBn: e.target.value } })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Secondary CTA Text {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
              </label>
              {activeLangTab === 'en' ? (
                <input
                  type="text"
                  value={formData.bottomCta.secondaryCtaText}
                  onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, secondaryCtaText: e.target.value } })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData.bottomCta.secondaryCtaTextBn}
                  onChange={(e) => setFormData({ ...formData, bottomCta: { ...formData.bottomCta, secondaryCtaTextBn: e.target.value } })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
                />
              )}
            </div>
          </div>
        </div>
      )}

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
