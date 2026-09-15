import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Info,
  BookOpen,
  Users,
  FileText,
  Radio,
  Inbox,
  ExternalLink,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Columns,
  SlidersHorizontal,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Sparkles,
  Layers,
  HelpCircle,
  MessageSquare,
  FolderKanban
} from 'lucide-react';
import { useCms, CMS_TAB_ROUTES } from '../context/CmsContext';

interface SidebarProps {
  onNewBeatClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewBeatClick }) => {
  const router = useRouter();
  const {
    state,
    activeTab,
    setActiveTab,
    selectedBeatId,
    setSelectedBeatId,
    selectedSectionAppId,
    setSelectedSectionAppId,
    resetToDefault,
    exportJson,
    importJson,
    previewLanguage,
    setPreviewLanguage
  } = useCms();

  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importJson(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const pendingInquiriesCount = state.inquiries.filter(i => i.status === 'new').length;

  const navigateToPage = (tab: string) => {
    setActiveTab(tab);
    setSelectedBeatId(null);
    setSelectedSectionAppId(null);
    router.push(CMS_TAB_ROUTES[tab] ?? '/cms');
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col h-screen select-none shrink-0 text-slate-700 shadow-sm z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6E56CF] flex items-center justify-center font-bold text-white shadow-sm text-sm tracking-wide">
            IPA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight text-[#1E1B4B]">IPA CMS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-purple-50 text-[#6E56CF] border border-purple-100">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
              Media Research Observatory
            </p>
          </div>
        </div>
      </div>

      {/* Institutional CMS Status */}
      <div className="p-3 bg-slate-50/70 border-b border-slate-100">
        <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-[#1E1B4B]">Observatory CMS</span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#6E56CF] border border-purple-100">
            Admin v2.0
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-sm font-sans" id="cms-sidebar-nav">
        {/* Section 1: Page App Grids */}
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
          Website App Grids
        </div>

        {/* Overview */}
        <button
          id="nav-overview"
          onClick={() => navigateToPage('overview')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'overview' && !selectedSectionAppId
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 text-[#6E56CF]" />
            <span>Overview Hub</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">Live</span>
        </button>

        {/* Home Page */}
        <button
          id="nav-home"
          onClick={() => navigateToPage('home')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Home className="w-4 h-4 text-[#6E56CF]" />
            <span>Home Page</span>
          </div>
        </button>

        {/* About Us */}
        <button
          id="nav-about"
          onClick={() => navigateToPage('about')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'about'
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#6E56CF]" />
            <span>About Us</span>
          </div>
        </button>

        {/* Work */}
        <button
          id="nav-work"
          onClick={() => navigateToPage('work')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'work'
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <FolderKanban className="w-4 h-4 text-[#6E56CF]" />
            <span>Work</span>
          </div>
        </button>

        {/* All Research */}
        <div>
          <div>
            <button
              id="nav-research-main"
              onClick={() => navigateToPage('research')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'research' && !selectedBeatId
                  ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#6E56CF]" />
                <span>All Research</span>
              </div>
            </button>
          </div>

        </div>

        {/* Teams Page */}
        <button
          id="nav-team"
          onClick={() => navigateToPage('teams')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'teams'
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#6E56CF]" />
            <span>Teams Directory</span>
          </div>
        </button>

        {/* Contact Us */}
        <button
          id="nav-contact"
          onClick={() => navigateToPage('contact')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-[#6E56CF]" />
            <span>Contact Us</span>
          </div>
        </button>

        {/* Footer & Global Branding */}
        <button
          id="nav-branding"
          onClick={() => navigateToPage('branding')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'branding'
              ? 'bg-[#F3EFFE] text-[#6E56CF] font-bold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#6E56CF]" />
            <span>Footer & Branding</span>
          </div>
        </button>

      </nav>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
        {/* Language switch */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Preview Language:</span>
          </span>
          <div className="flex bg-white rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setPreviewLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                previewLanguage === 'en'
                  ? 'bg-[#6E56CF] text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setPreviewLanguage('bn')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                previewLanguage === 'bn'
                  ? 'bg-[#6E56CF] text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              BN
            </button>
          </div>
        </div>

        {/* Export / Import buttons */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={exportJson}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 transition-colors cursor-pointer shadow-xs text-[11px]"
            title="Download full backup"
          >
            <Download className="w-3 h-3 text-[#6E56CF]" />
            <span>Export JSON</span>
          </button>
          <label className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 transition-colors cursor-pointer shadow-xs text-[11px]">
            <Upload className="w-3 h-3 text-emerald-600" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Reset Confirmation */}
        {showResetConfirm ? (
          <div className="p-2 bg-red-50 border border-red-200 rounded-xl space-y-1.5">
            <p className="text-[10px] text-red-700 leading-tight">
              Reset all CMS parameters to default sample data?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetToDefault();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-[10px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center gap-1 py-1 text-[11px] text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Factory Defaults</span>
          </button>
        )}
      </div>
    </aside>
  );
};
