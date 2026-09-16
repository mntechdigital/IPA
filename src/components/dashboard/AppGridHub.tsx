import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  Compass,
  Quote,
  GitBranch,
  Users,
  Megaphone,
  Building2,
  Target,
  BookOpen,
  ArrowUpRight,
  Search,
  Layers,
  Newspaper,
  Cpu,
  Radio,
  ShieldAlert,
  Binary,
  Award,
  GraduationCap,
  MessageSquare,
  MapPin,
  Inbox,
  HelpCircle,
  Globe,
  FileText,
  Share2,
  ChevronRight,
  ExternalLink,
  Eye,
  FolderKanban,
  ScrollText,
  Navigation
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { APP_GRID_PAGES } from '../../data/appGridDefinitions';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  Compass,
  Quote,
  GitBranch,
  Users,
  Megaphone,
  Building2,
  Target,
  BookOpen,
  ArrowUpRight,
  Search,
  Layers,
  Newspaper,
  Cpu,
  Radio,
  ShieldAlert,
  Binary,
  Award,
  GraduationCap,
  MessageSquare,
  MapPin,
  Inbox,
  HelpCircle,
  Globe,
  FileText,
  Share2,
  ScrollText,
  Navigation
};

interface AppGridHubProps {
  pageId: 'home' | 'about' | 'research' | 'teams' | 'contact' | 'branding' | 'work';
}

export const AppGridHub: React.FC<AppGridHubProps> = ({ pageId }) => {
  const { setSelectedSectionAppId } = useCms();
  const [filterQuery, setFilterQuery] = useState('');

  const pageDef = APP_GRID_PAGES[pageId] || APP_GRID_PAGES.home;

  const filteredApps = useMemo(() => {
    if (!filterQuery.trim()) return pageDef.apps;
    const q = filterQuery.toLowerCase();
    return pageDef.apps.filter(
      app =>
        app.title.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.appNumber.toLowerCase().includes(q)
    );
  }, [pageDef.apps, filterQuery]);

  const getBadgeStyles = (color?: string) => {
    switch (color) {
      case 'purple':
        return {
          iconBg: 'bg-[#F3EFFE]',
          iconColor: 'text-[#6E56CF]',
          pill: 'bg-[#F3EFFE] text-[#6E56CF] border-[#E5DEFF]'
        };
      case 'green':
        return {
          iconBg: 'bg-[#E8FBF0]',
          iconColor: 'text-[#10B981]',
          pill: 'bg-[#E8FBF0] text-[#10B981] border-[#C2F5DA]'
        };
      case 'blue':
        return {
          iconBg: 'bg-[#EFF6FF]',
          iconColor: 'text-[#3B82F6]',
          pill: 'bg-[#EFF6FF] text-[#3B82F6] border-[#DBEAFE]'
        };
      case 'amber':
        return {
          iconBg: 'bg-[#FEF8EC]',
          iconColor: 'text-[#F59E0B]',
          pill: 'bg-[#FEF8EC] text-[#F59E0B] border-[#FDE68A]'
        };
      case 'rose':
        return {
          iconBg: 'bg-[#FFF1F2]',
          iconColor: 'text-[#F43F5E]',
          pill: 'bg-[#FFF1F2] text-[#F43F5E] border-[#FECDD3]'
        };
      default:
        return {
          iconBg: 'bg-[#F3EFFE]',
          iconColor: 'text-[#6E56CF]',
          pill: 'bg-[#F3EFFE] text-[#6E56CF] border-[#E5DEFF]'
        };
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Hub Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-100/50 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-50/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[#6E56CF] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Section App Hub</span>
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                {pageDef.routePath}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#1E1B4B] tracking-tight">
              {pageDef.pageTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {pageDef.pageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-purple-50/70 border border-purple-100 rounded-xl text-xs font-semibold text-[#6E56CF]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Section Management</span>
          </div>
        </div>

        {/* Quick Hub Metrics & Filter */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live section management</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter section apps..."
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid of Square Section App Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredApps.map(app => {
          const IconComponent = ICON_MAP[app.icon] || LayoutGrid;
          const styles = getBadgeStyles(app.badgeColor);

          return (
            <div
              key={app.id}
              onClick={() => setSelectedSectionAppId(app.id)}
              className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-sm"
            >
              <div>
                {/* Top Badge & Status Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${styles.pill}`}
                  >
                    {app.appNumber}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Live on Site</span>
                  </span>
                </div>

                {/* App Icon Box */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-200 ${styles.iconBg} ${styles.iconColor}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* App Title & Tagline */}
                <h3 className="text-base font-bold text-[#1E1B4B] group-hover:text-[#6E56CF] transition-colors leading-snug">
                  {app.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {app.tagline}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                  {app.fieldsCount} Parameters
                </span>

                <span className="inline-flex items-center gap-1 text-[#6E56CF] font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Manage Section</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <p className="text-slate-500 text-sm">
            No section apps found matching "{filterQuery}".
          </p>
          <button
            onClick={() => setFilterQuery('')}
            className="mt-3 text-xs text-[#6E56CF] font-semibold hover:underline cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};
