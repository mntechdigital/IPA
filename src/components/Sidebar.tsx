import React from 'react';
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
  Eye,
  Columns,
  SlidersHorizontal,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Sparkles,
  Layers,
  HelpCircle,
  MessageSquare
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
    setSelectedSectionAppId
  } = useCms();

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
    </aside>
  );
};
