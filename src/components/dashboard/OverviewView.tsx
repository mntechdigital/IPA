import React from 'react';
import { useRouter } from 'next/navigation';
import { Activity, BarChart3, BookOpen, Inbox, Layers, PieChart as PieChartIcon, ShieldCheck, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useCms, CMS_TAB_ROUTES } from '../../context/CmsContext';

const chartColors = ['#6E56CF', '#BEF024', '#8B7AE8', '#D6F77A', '#A99BEF', '#E5FBA8'];
const mockCategoryViews = [
  { category: 'public trust', views: 1240, programs: 3 },
  { category: 'digital rights', views: 980, programs: 2 },
  { category: 'institutional accountability', views: 760, programs: 2 },
  { category: 'information integrity', views: 610, programs: 1 },
];
const mockPopularResearch = [
  { name: 'Public Trust & Media', clicks: 1240 },
  { name: 'Digital Rights & Access', clicks: 980 },
  { name: 'Institutional Accountability', clicks: 760 },
  { name: 'Information Integrity', clicks: 610 },
  { name: 'Civic Participation', clicks: 445 },
];

export const OverviewView: React.FC = () => {
  const { state, setActiveTab, setSelectedSectionAppId } = useCms();
  const router = useRouter();
  const researchBeats = Object.values(state.researchBeats);
  const researchCount = researchBeats.length;
  const categoryCount = new Set(researchBeats.map(beat => beat.category)).size;
  const researchCategories = researchBeats.reduce<Record<string, number>>((counts, beat) => ({ ...counts, [beat.category]: (counts[beat.category] || 0) + 1 }), {});
  const categoryViews = researchBeats.reduce<Record<string, number>>((counts, beat) => ({ ...counts, [beat.category]: (counts[beat.category] || 0) + (beat.viewCount || 0) }), {});
  const hasResearchViews = Object.values(categoryViews).some(views => views > 0);
  const categoryChartData = hasResearchViews
    ? Object.entries(categoryViews).sort(([, a], [, b]) => b - a).map(([category, views]) => ({ category: category.replace(/-/g, ' '), views, programs: researchCategories[category] || 0 }))
    : mockCategoryViews;
  const totalResearchViews = researchBeats.reduce((total, beat) => total + (beat.viewCount || 0), 0);
  const chartResearchViews = hasResearchViews ? totalResearchViews : mockCategoryViews.reduce((total, item) => total + item.views, 0);
  const popularResearchData = totalResearchViews > 0
    ? researchBeats.map(beat => ({ name: beat.name, clicks: beat.viewCount || 0 })).sort((a, b) => b.clicks - a.clicks).slice(0, 5)
    : mockPopularResearch;
  const openPage = (tab: string) => { setActiveTab(tab); setSelectedSectionAppId(null); router.push(CMS_TAB_ROUTES[tab] ?? '/cms'); };
  const cards = [
    { label: 'Team Members', value: state.team.length, icon: Users, tab: 'teams' },
    { label: 'Research Programs', value: researchCount, icon: BookOpen, tab: 'research' },
    { label: 'Research Views', value: totalResearchViews, icon: Activity, tab: 'research' },
    { label: 'Research Categories', value: categoryCount, icon: Layers, tab: 'research' },
    { label: 'Contact Messages', value: state.inquiries.length, icon: Inbox, tab: 'contact' },
    { label: 'Avg. Traffic Time', value: '4m 12s', icon: Activity, tab: 'overview' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#6E56CF]">Operations dashboard</p>
        <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#1E1B4B]">Overview Hub</h1>
        <p className="mt-2 text-sm text-slate-500">A live snapshot of research, team, website, and contact activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
        {cards.map(card => { const Icon = card.icon; return (
          <button key={card.label} type="button" onClick={() => openPage(card.tab)} className="text-left bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-[#6E56CF] hover:shadow-md transition-all">
            <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{card.label}</span><Icon className="w-4 h-4 text-[#6E56CF]" /></div>
            <div className="mt-3 text-3xl font-extrabold text-[#1E1B4B]">{card.value}</div>
          </button>
        ); })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><BarChart3 className="w-5 h-5 text-[#6E56CF]" /><div><h2 className="text-base font-bold text-[#1E1B4B]">Research Views by Category</h2><p className="text-xs text-slate-500">Tracked clicks from the live research directory</p></div></div>
          <div className="h-[280px]">
            {categoryChartData.length ? <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} layout="vertical" margin={{ top: 8, right: 24, left: 12, bottom: 4 }}>
                <CartesianGrid horizontal={false} stroke="#E2E8F0" strokeDasharray="4 4" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="category" width={170} tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(30, 27, 75, 0.08)' }} formatter={(value, name) => [value, name === 'views' ? 'Views' : 'Programs']} />
                <Bar dataKey="views" name="views" fill="#6E56CF" radius={[0, 8, 8, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer> : <div className="h-full flex items-center justify-center text-xs text-slate-400">No research clicks have been recorded yet.</div>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><PieChartIcon className="w-5 h-5 text-[#6E56CF]" /><div><h2 className="text-base font-bold text-[#1E1B4B]">Research Views Share</h2><p className="text-xs text-slate-500">Tracked research clicks by category</p></div></div>
          <div className="h-[280px] relative">
            {categoryChartData.length && chartResearchViews > 0 ? <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryChartData} dataKey="views" nameKey="category" innerRadius={70} outerRadius={102} paddingAngle={3} cornerRadius={7} stroke="none">
                  {categoryChartData.map((entry, index) => <Cell key={entry.category} fill={chartColors[index % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(30, 27, 75, 0.08)' }} formatter={(value) => [value, 'Views']} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#64748B' }} />
              </PieChart>
            </ResponsiveContainer> : <div className="h-full flex items-center justify-center text-xs text-slate-400">No clicks recorded</div>}
            {categoryChartData.length && chartResearchViews > 0 && <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-6"><div className="text-center"><div className="text-2xl font-extrabold text-[#1E1B4B]">{chartResearchViews}</div><div className="text-[10px] uppercase tracking-wider text-slate-400">total views</div></div></div>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"><div className="flex items-center gap-2 mb-4"><ShieldCheck className="w-5 h-5 text-[#6E56CF]" /><h2 className="text-base font-bold text-[#1E1B4B]">Recent Activity</h2></div><div className="divide-y divide-slate-100">{state.activityLogs.slice(0, 5).map(log => <div key={log.id} className="py-3 text-xs"><div className="font-semibold text-slate-700 truncate">{log.action}</div><div className="text-slate-400 mt-0.5">{log.section} · {log.timestamp}</div></div>)}{state.activityLogs.length === 0 && <div className="py-6 text-center text-xs text-slate-400">No recent activity.</div>}</div></div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><Activity className="w-5 h-5 text-[#6E56CF]" /><div><h2 className="text-base font-bold text-[#1E1B4B]">Popular Research</h2><p className="text-xs text-slate-500">Most viewed research programs by click count</p></div></div>
          <div className="h-[280px]"><ResponsiveContainer width="100%" height="100%">
            <BarChart data={popularResearchData} layout="vertical" margin={{ top: 4, right: 24, left: 12, bottom: 4 }}>
              <CartesianGrid horizontal={false} stroke="#E2E8F0" strokeDasharray="4 4" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(30, 27, 75, 0.08)' }} formatter={(value) => [value, 'Clicks']} />
              <Bar dataKey="clicks" fill="#6E56CF" radius={[0, 8, 8, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
};
