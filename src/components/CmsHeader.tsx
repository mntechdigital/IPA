import React from 'react';
import {
  ExternalLink,
  Eye,
  SlidersHorizontal,
  Columns,
  Globe,
  CheckCircle,
  Bell,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { APP_GRID_PAGES } from '../data/appGridDefinitions';

export const CmsHeader: React.FC = () => {
  const {
    activeTab,
    selectedBeatId,
    selectedSectionAppId,
    setSelectedSectionAppId,
    state,
    previewLanguage,
    setPreviewLanguage,
    notification
  } = useCms();

  const getBreadcrumbs = () => {
    let pageLabel = 'Dashboard';
    switch (activeTab) {
      case 'overview':
        pageLabel = 'Overview Hub';
        break;
      case 'home':
        pageLabel = 'Home Page';
        break;
      case 'about':
        pageLabel = 'About Us';
        break;
      case 'research':
        pageLabel = 'Research & Sub-Categories';
        break;
      case 'teams':
        pageLabel = 'Teams Directory';
        break;
      case 'contact':
        pageLabel = 'Contact Us';
        break;
      case 'branding':
        pageLabel = 'Footer & Branding';
        break;
      case 'publications':
        pageLabel = 'Publications & Monographs';
        break;
      case 'monitoring':
        pageLabel = 'Monitoring Telemetry';
        break;
      case 'inquiries':
        pageLabel = 'Inquiries & Submissions';
        break;
    }

    if (selectedSectionAppId) {
      let appName = selectedSectionAppId;
      for (const page of Object.values(APP_GRID_PAGES)) {
        const found = page.apps.find(a => a.id === selectedSectionAppId);
        if (found) {
          appName = `${found.appNumber}: ${found.title}`;
          break;
        }
      }
      return (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedSectionAppId(null)}
            className="hover:text-[#6E56CF] cursor-pointer"
          >
            {pageLabel}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#6E56CF] font-semibold">{appName}</span>
        </div>
      );
    }

    return <span>{pageLabel}</span>;
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between text-slate-700 shrink-0 z-10 shadow-xs">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-[#1E1B4B] tracking-tight flex items-center gap-2">
          <span className="text-[#6E56CF] font-bold text-xs bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
            IPA CMS
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium">{getBreadcrumbs()}</span>
        </h1>

        {notification && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-fade-in shadow-xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{notification.message}</span>
          </div>
        )}
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-3">
      </div>
    </header>
  );
};
