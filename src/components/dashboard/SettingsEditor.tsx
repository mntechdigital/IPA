import React, { useState } from 'react';
import {
  Settings,
  Save,
  Globe,
  Mail,
  Building,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { SiteSettings } from '../../types';

export const SettingsEditor: React.FC = () => {
  const { state, updateSettings, exportJson, importJson, resetToDefault, setViewMode } = useCms();
  const [formData, setFormData] = useState<SiteSettings>({ ...state.settings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const handleSocialChange = (network: keyof SiteSettings['socialLinks'], value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [network]: value
      }
    });
  };

  const accessControl = formData.accessControl || {
    administrator: { manageSettings: true, manageContent: true, manageTeam: true },
    editor: { manageSettings: false, manageContent: true, manageTeam: false },
    viewer: { manageSettings: false, manageContent: false, manageTeam: false }
  };

  const updatePermission = (role: keyof typeof accessControl, permission: keyof typeof accessControl.administrator) => {
    setFormData({
      ...formData,
      accessControl: {
        ...accessControl,
        [role]: { ...accessControl[role], [permission]: !accessControl[role][permission] }
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <span>Global Site Configuration & SEO Metadata</span>
          </h2>
          <p className="text-xs text-slate-400">Configure core metadata, research desk communication channels, and physical location info.</p>
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
            className="inline-flex items-center gap-1.5 px-6 py-2 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* 1. Identity & SEO */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-[#16382B] pb-2">
          <Globe className="w-4 h-4 text-[#D2F818]" />
          <span>1. Site Identity & SEO Meta</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Site Name</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D2F818]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle Descriptor</label>
            <input
              type="text"
              value={formData.siteSubtitle}
              onChange={(e) => setFormData({ ...formData, siteSubtitle: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D2F818]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">SEO Meta Description</label>
          <textarea
            rows={2}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-slate-200 outline-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Social Share Card (OG Image URL)</label>
            <input
              type="url"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Established Year</label>
            <input
              type="text"
              value={formData.establishedYear}
              onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Official Communications & Address */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-[#16382B] pb-2">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>2. Observatory Communication Inboxes</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">General Secretariat Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Research Desk Inquiries</label>
            <input
              type="email"
              value={formData.researchDeskEmail}
              onChange={(e) => setFormData({ ...formData, researchDeskEmail: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Press & Citations Desk</label>
            <input
              type="email"
              value={formData.pressEmail}
              onChange={(e) => setFormData({ ...formData, pressEmail: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Headquarters Address</label>
          <input
            type="text"
            value={formData.officeAddress}
            onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* 3. Social Media & Academic Profiles */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-[#16382B] pb-2">
          <Share2 className="w-4 h-4 text-[#D2F818]" />
          <span>3. Social Channels & Repositories</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Twitter / X URL</label>
            <input
              type="text"
              value={formData.socialLinks.twitter}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile</label>
            <input
              type="text"
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Data Repository</label>
            <input
              type="text"
              value={formData.socialLinks.github}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">YouTube Briefing Channel</label>
            <input
              type="text"
              value={formData.socialLinks.youtube}
              onChange={(e) => handleSocialChange('youtube', e.target.value)}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Role-Based Access Control */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-[#16382B] pb-2">
          <ShieldCheck className="w-4 h-4 text-[#BEF024]" />
          <span>4. Role-Based Access Control</span>
        </h3>
        <p className="text-xs text-slate-400">Control which areas each CMS role can manage.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            ['administrator', 'Administrator'],
            ['editor', 'Editor'],
            ['viewer', 'Viewer']
          ] as const).map(([role, label]) => (
            <div key={role} className="rounded-xl border border-[#16382B] bg-[#081811] p-4 space-y-3">
              <div className="text-sm font-bold text-white">{label}</div>
              {([
                ['manageSettings', 'Manage settings'],
                ['manageContent', 'Manage content'],
                ['manageTeam', 'Manage team']
              ] as const).map(([permission, permissionLabel]) => (
                <label key={permission} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accessControl[role][permission]}
                    onChange={() => updatePermission(role, permission)}
                    className="accent-[#BEF024]"
                  />
                  {permissionLabel}
                </label>
              ))}
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
          <span>Save Global Configuration</span>
        </button>
      </div>
    </form>
  );
};
