import React, { useState } from 'react';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  Languages,
  MessageSquare,
  MapPin,
  Inbox,
  HelpCircle
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ContactPageData, FaqItem } from '../../types';

export const ContactPageEditor: React.FC = () => {
  const { state, updateContactPage, setViewMode } = useCms();
  const [formData, setFormData] = useState<ContactPageData>({ ...state.contactPage } as ContactPageData);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn'>('en');

  const handleHeroChange = (field: string, value: string) => {
    const current = formData.hero || { heading: '', headingBn: '', subtitle: '', subtitleBn: '', bgImage: '', badge: '', badgeBn: '' };
    setFormData({ ...formData, hero: { ...current, [field]: value } });
  };

  const handleDirectDetailsChange = (field: string, value: string) => {
    const current = formData.directDetails || { phone: '', phoneLabel: '', tollFreePhone: '', tollFreePhoneLabel: '', supportEmail: '', researchDeskEmail: '', pressEmail: '', officeLocation: '', officeLocationBn: '', workingHours: '', workingHoursBn: '', googleMapsUrl: '', phoneLabelBn: '', tollFreePhoneLabelBn: '', supportEmailLabelBn: '', researchDeskEmailLabelBn: '', pressEmailLabelBn: '' };
    setFormData({ ...formData, directDetails: { ...current, [field]: value } });
  };

  const handleMessageSettingsChange = (field: string, value: string | boolean) => {
    const current = formData.messageSettings || { targetEmail: '', autoReply: false, subjectPrefix: '', requireAffiliation: false, subjectPrefixBn: '' };
    setFormData({ ...formData, messageSettings: { ...current, [field]: value } });
  };

  const handleFaqChange = (index: number, field: keyof FaqItem, value: string | string[]) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: 'faq-' + Date.now(),
      category: 'general',
      question: 'New FAQ question?',
      answer: 'Answer to the FAQ.',
      highlights: [],
      questionBn: '',
      answerBn: '',
      highlightsBn: [],
      categoryLabel: '',
      categoryLabelBn: ''
    };
    setFormData({ ...formData, faqs: [...formData.faqs, newFaq] });
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleHighlightChange = (faqIndex: number, highlightIndex: number, value: string) => {
    const updatedFaqs = [...formData.faqs];
    const faq = { ...updatedFaqs[faqIndex] };
    if (activeLangTab === 'en') {
      const currentHighlights = [...(faq.highlights || [])];
      currentHighlights[highlightIndex] = value;
      faq.highlights = currentHighlights;
    } else {
      const currentHighlights = [...(faq.highlightsBn || [])];
      currentHighlights[highlightIndex] = value;
      faq.highlightsBn = currentHighlights;
    }
    updatedFaqs[faqIndex] = faq;
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleAddHighlight = (faqIndex: number) => {
    const updatedFaqs = [...formData.faqs];
    const faq = { ...updatedFaqs[faqIndex] };
    if (activeLangTab === 'en') {
      faq.highlights = [...(faq.highlights || []), ''];
    } else {
      faq.highlightsBn = [...(faq.highlightsBn || []), ''];
    }
    updatedFaqs[faqIndex] = faq;
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleRemoveHighlight = (faqIndex: number, highlightIndex: number) => {
    const updatedFaqs = [...formData.faqs];
    const faq = { ...updatedFaqs[faqIndex] };
    if (activeLangTab === 'en') {
      faq.highlights = (faq.highlights || []).filter((_, i) => i !== highlightIndex);
    } else {
      faq.highlightsBn = (faq.highlightsBn || []).filter((_, i) => i !== highlightIndex);
    }
    updatedFaqs[faqIndex] = faq;
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactPage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans">Contact Page Editorial Manager</h2>
          <p className="text-xs text-slate-400">Manage hero, direct contact details, message settings, and FAQs.</p>
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

      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>1. Hero Section</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Above the fold</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Observatory Badge {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <input
              type="text"
              value={formData.hero?.badge || ''}
              onChange={(e) => handleHeroChange('badge', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          ) : (
            <input
              type="text"
              value={formData.hero?.badgeBn || ''}
              onChange={(e) => handleHeroChange('badgeBn', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Hero Heading {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <input
              type="text"
              value={formData.hero?.heading || ''}
              onChange={(e) => handleHeroChange('heading', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:border-[#D2F818] outline-none font-sans"
            />
          ) : (
            <input
              type="text"
              value={formData.hero?.headingBn || ''}
              onChange={(e) => handleHeroChange('headingBn', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:border-[#D2F818] outline-none font-sans"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Hero Subtitle {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
          </label>
          {activeLangTab === 'en' ? (
            <textarea
              rows={3}
              value={formData.hero?.subtitle || ''}
              onChange={(e) => handleHeroChange('subtitle', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
            />
          ) : (
            <textarea
              rows={3}
              value={formData.hero?.subtitleBn || ''}
              onChange={(e) => handleHeroChange('subtitleBn', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 focus:border-[#D2F818] outline-none leading-relaxed"
            />
          )}
        </div>
      </div>

      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D2F818]"></span>
            <span>2. Direct Contact Details</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Phone, email, and office</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
            <input
              type="text"
              value={formData.directDetails?.phone || ''}
              onChange={(e) => handleDirectDetailsChange('phone', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Label {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.directDetails?.phoneLabel || ''}
                onChange={(e) => handleDirectDetailsChange('phoneLabel', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.directDetails?.phoneLabelBn || ''}
                onChange={(e) => handleDirectDetailsChange('phoneLabelBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Toll-Free Phone</label>
            <input
              type="text"
              value={formData.directDetails?.tollFreePhone || ''}
              onChange={(e) => handleDirectDetailsChange('tollFreePhone', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Toll-Free Label {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.directDetails?.tollFreePhoneLabel || ''}
                onChange={(e) => handleDirectDetailsChange('tollFreePhoneLabel', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.directDetails?.tollFreePhoneLabelBn || ''}
                onChange={(e) => handleDirectDetailsChange('tollFreePhoneLabelBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Support Email</label>
            <input
              type="email"
              value={formData.directDetails?.supportEmail || ''}
              onChange={(e) => handleDirectDetailsChange('supportEmail', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Support Email Label (Bengali)</label>
            <input
              type="text"
              value={formData.directDetails?.supportEmailLabelBn || ''}
              onChange={(e) => handleDirectDetailsChange('supportEmailLabelBn', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Research Desk Email</label>
            <input
              type="email"
              value={formData.directDetails?.researchDeskEmail || ''}
              onChange={(e) => handleDirectDetailsChange('researchDeskEmail', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Research Desk Label (Bengali)</label>
            <input
              type="text"
              value={formData.directDetails?.researchDeskEmailLabelBn || ''}
              onChange={(e) => handleDirectDetailsChange('researchDeskEmailLabelBn', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Press Email</label>
            <input
              type="email"
              value={formData.directDetails?.pressEmail || ''}
              onChange={(e) => handleDirectDetailsChange('pressEmail', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Press Email Label (Bengali)</label>
            <input
              type="text"
              value={formData.directDetails?.pressEmailLabelBn || ''}
              onChange={(e) => handleDirectDetailsChange('pressEmailLabelBn', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Office Location {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.directDetails?.officeLocation || ''}
                onChange={(e) => handleDirectDetailsChange('officeLocation', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.directDetails?.officeLocationBn || ''}
                onChange={(e) => handleDirectDetailsChange('officeLocationBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Working Hours {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.directDetails?.workingHours || ''}
                onChange={(e) => handleDirectDetailsChange('workingHours', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.directDetails?.workingHoursBn || ''}
                onChange={(e) => handleDirectDetailsChange('workingHoursBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Maps URL</label>
          <input
            type="text"
            value={formData.directDetails?.googleMapsUrl || ''}
            onChange={(e) => handleDirectDetailsChange('googleMapsUrl', e.target.value)}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
          />
        </div>
      </div>

      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>3. Message Settings</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Contact form configuration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Email</label>
            <input
              type="email"
              value={formData.messageSettings?.targetEmail || ''}
              onChange={(e) => handleMessageSettingsChange('targetEmail', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subject Prefix {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
            </label>
            {activeLangTab === 'en' ? (
              <input
                type="text"
                value={formData.messageSettings?.subjectPrefix || ''}
                onChange={(e) => handleMessageSettingsChange('subjectPrefix', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            ) : (
              <input
                type="text"
                value={formData.messageSettings?.subjectPrefixBn || ''}
                onChange={(e) => handleMessageSettingsChange('subjectPrefixBn', e.target.value)}
                className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white focus:border-[#D2F818] outline-none"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.messageSettings?.autoReply || false}
              onChange={(e) => handleMessageSettingsChange('autoReply', e.target.checked)}
              className="w-4 h-4 rounded border-[#16382B] bg-[#081811] text-[#D2F818] focus:ring-[#D2F818]"
            />
            <span className="text-xs font-semibold text-slate-300">Enable Auto-Reply</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.messageSettings?.requireAffiliation || false}
              onChange={(e) => handleMessageSettingsChange('requireAffiliation', e.target.checked)}
              className="w-4 h-4 rounded border-[#16382B] bg-[#081811] text-[#D2F818] focus:ring-[#D2F818]"
            />
            <span className="text-xs font-semibold text-slate-300">Require Affiliation</span>
          </label>
        </div>
      </div>

      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>4. Frequently Asked Questions</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Manage FAQ items with bilingual question, answer, and category labels.</p>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#144234] hover:bg-[#1A5442] text-xs text-[#D2F818] font-bold border border-[#23634F] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.faqs.map((faq, faqIndex) => (
            <div key={faq.id || faqIndex} className="p-4 rounded-lg bg-[#081811] border border-[#16382B] space-y-4 relative group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2F818]">
                  FAQ #{faqIndex + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(faqIndex)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Category Label {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                  </label>
                  {activeLangTab === 'en' ? (
                    <input
                      type="text"
                      value={faq.categoryLabel || ''}
                      onChange={(e) => handleFaqChange(faqIndex, 'categoryLabel', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={faq.categoryLabelBn || ''}
                      onChange={(e) => handleFaqChange(faqIndex, 'categoryLabelBn', e.target.value)}
                      className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Category (slug)</label>
                  <input
                    type="text"
                    value={faq.category}
                    onChange={(e) => handleFaqChange(faqIndex, 'category', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Question {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(faqIndex, 'question', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-semibold outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={faq.questionBn || ''}
                    onChange={(e) => handleFaqChange(faqIndex, 'questionBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-white font-semibold outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Answer {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                {activeLangTab === 'en' ? (
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(faqIndex, 'answer', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none leading-relaxed"
                  />
                ) : (
                  <textarea
                    rows={2}
                    value={faq.answerBn || ''}
                    onChange={(e) => handleFaqChange(faqIndex, 'answerBn', e.target.value)}
                    className="w-full bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none leading-relaxed"
                  />
                )}
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Highlights {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}
                </label>
                <div className="space-y-2">
                  {(activeLangTab === 'en' ? (faq.highlights || []) : (faq.highlightsBn || [])).map((highlight, hlIndex) => (
                    <div key={hlIndex} className="flex gap-2">
                      <span className="text-[10px] font-mono text-slate-500 pt-2 shrink-0">#{hlIndex + 1}</span>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(faqIndex, hlIndex, e.target.value)}
                        className="flex-1 bg-[#0C2218] border border-[#16382B] rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(faqIndex, hlIndex)}
                        className="text-slate-500 hover:text-rose-400 p-1 self-center"
                        title="Remove highlight"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddHighlight(faqIndex)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold text-[#D2F818] hover:bg-[#144234] border border-[#23634F] cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    Add Highlight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Contact Changes</span>
        </button>
      </div>
    </form>
  );
};
