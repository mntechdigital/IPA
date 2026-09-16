'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  CmsState,
  ViewMode,
  HomePageData,
  AboutPageData,
  ContactPageData,
  ResearchBeat,
  ResearchPageData,
  TeamMember,
  PublicationItem,
  MonitoringTelemetry,
  SiteSettings,
  InquirySubmission,
  WorkProcessPillar,
} from '../types';
import { INITIAL_CMS_STATE } from '../data/initialData';

const TAB_ROUTES: Record<string, string> = {
  overview: '/cms',
  home: '/cms/home',
  about: '/cms/about',
  research: '/cms/research',
  teams: '/cms/teams',
  contact: '/cms/contact',
  branding: '/cms/branding',
  publications: '/cms/publications',
  monitoring: '/cms/monitoring',
  inquiries: '/cms/inquiries',
};

export const CMS_TAB_ROUTES = TAB_ROUTES;

const ROUTE_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_ROUTES).map(([tab, route]) => [route, tab])
);

function deriveTabFromPathname(pathname: string): string {
  if (pathname === '/cms') return 'overview';
  return ROUTE_TO_TAB[pathname] ?? 'overview';
}

interface CmsContextType {
  state: CmsState;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedBeatId: string | null;
  setSelectedBeatId: (id: string | null) => void;
  selectedSectionAppId: string | null;
  setSelectedSectionAppId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  previewLanguage: 'en' | 'bn';
  setPreviewLanguage: (lang: 'en' | 'bn') => void;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  setNotification: (notif: { message: string; type: 'success' | 'info' | 'warning' } | null) => void;

  updateHomePage: (partial: Partial<HomePageData>) => void;
  updateAboutPage: (partial: Partial<AboutPageData>) => void;
  updateContactPage: (partial: Partial<ContactPageData>) => void;
  updateResearchPage: (partial: Partial<ResearchPageData>) => void;
  updateWorkProcessPillars: (pillars: WorkProcessPillar[]) => void;
  updateResearchBeat: (beatId: string, updated: ResearchBeat) => void;
  recordResearchView: (beatId: string) => void;
  addResearchBeat: (beat: ResearchBeat) => void;
  deleteResearchBeat: (beatId: string) => void;
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updatePublication: (pub: PublicationItem) => void;
  addPublication: (pub: PublicationItem) => void;
  deletePublication: (id: string) => void;
  updateMonitoring: (partial: Partial<MonitoringTelemetry>) => void;
  updateSettings: (partial: Partial<SiteSettings>) => void;
  updateInquiryStatus: (id: string, status: InquirySubmission['status'], notes?: string) => void;
  addInquiry: (inquiry: Omit<InquirySubmission, 'id' | 'date'>) => void;
  resetToDefault: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiMutate<T>(path: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(path, { method, headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);
  return res.json();
}

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const [state, setState] = useState<CmsState>(INITIAL_CMS_STATE);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [viewMode, setViewMode] = useState<ViewMode>('cms');
  const [activeTab, setActiveTabState] = useState<string>(() => deriveTabFromPathname(pathname));
  const [selectedBeatId, setSelectedBeatId] = useState<string | null>(null);
  const [selectedSectionAppId, setSelectedSectionAppId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewLanguage, setPreviewLanguage] = useState<'en' | 'bn'>('en');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  useEffect(() => {
    setActiveTabState(deriveTabFromPathname(pathname));
  }, [pathname]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snapshot = await apiGet<Partial<CmsState>>('/api/cms/state');
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            ...snapshot,
            settings: { ...prev.settings, ...(snapshot.settings || {}) },
            homePage: { ...prev.homePage, ...(snapshot.homePage || {}) },
            aboutPage: { ...prev.aboutPage, ...(snapshot.aboutPage || {}) },
            researchPage: { ...prev.researchPage, ...(snapshot.researchPage || {}) },
            workProcessPillars: snapshot.workProcessPillars ?? prev.workProcessPillars,
          }));
        }
      } catch (e) {
        console.error('Failed to load CMS state from API:', e);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    setSelectedSectionAppId(null);
    setActiveTabState(tab);
  }, []);

  const recordLog = useCallback((action: string, section: string) => {
    return { id: crypto.randomUUID(), timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16), action, section, user: 'Administrator' };
  }, []);

  const updateHomePage = useCallback((partial: Partial<HomePageData>) => {
    setState((prev) => {
      const merged = { ...prev.homePage, ...partial };
      apiMutate('/api/cms/home', 'PUT', merged).catch((e) => console.error('Failed to save home page:', e));
      const log = recordLog('Updated Home Page content', 'Home Page');
      return { ...prev, lastUpdated: new Date().toISOString(), homePage: merged, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Home Page settings updated successfully.', type: 'success' });
  }, [recordLog]);

  const updateAboutPage = useCallback((partial: Partial<AboutPageData>) => {
    setState((prev) => {
      const merged = { ...prev.aboutPage, ...partial };
      apiMutate('/api/cms/about', 'PUT', merged).catch((e) => console.error('Failed to save about page:', e));
      const log = recordLog('Updated About Us content', 'About Us');
      return { ...prev, lastUpdated: new Date().toISOString(), aboutPage: merged, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'About Us page updated successfully.', type: 'success' });
  }, [recordLog]);

  const updateContactPage = useCallback((partial: Partial<ContactPageData>) => {
    setState((prev) => {
      const currentContact = prev.contactPage || (INITIAL_CMS_STATE.contactPage as ContactPageData);
      const merged = { ...currentContact, ...partial };
      apiMutate('/api/cms/contact', 'PUT', merged).catch((e) => console.error('Failed to save contact page:', e));
      const log = recordLog('Updated Contact Us content', 'Contact Us');
      return { ...prev, lastUpdated: new Date().toISOString(), contactPage: merged, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Contact settings updated successfully.', type: 'success' });
  }, [recordLog]);

  const updateResearchPage = useCallback((partial: Partial<ResearchPageData>) => {
    setState((prev) => {
      const current = prev.researchPage || (INITIAL_CMS_STATE.researchPage as ResearchPageData);
      const merged: ResearchPageData = {
        ...current,
        ...partial,
        hero: { ...current.hero, ...(partial.hero || {}) },
        areasSection: { ...current.areasSection, ...(partial.areasSection || {}) },
        filterPills: { ...current.filterPills, ...(partial.filterPills || {}) },
        cta: { ...current.cta, ...(partial.cta || {}) },
        whatOurWorkLooksLike: { ...current.whatOurWorkLooksLike, ...(partial.whatOurWorkLooksLike || {}) },
      };
      apiMutate('/api/cms/research-page', 'PUT', merged).catch((e) => console.error('Failed to save research page:', e));
      const log = recordLog('Updated Research Page content', 'Research');
      return { ...prev, lastUpdated: new Date().toISOString(), researchPage: merged, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Research Page settings updated successfully.', type: 'success' });
  }, [recordLog]);

  const updateWorkProcessPillars = useCallback((pillars: WorkProcessPillar[]) => {
    setState((prev) => {
      apiMutate('/api/cms/work-process', 'PUT', pillars).catch((e) => console.error('Failed to save pillars:', e));
      const log = recordLog('Updated Research Pillars', 'Research');
      return { ...prev, lastUpdated: new Date().toISOString(), workProcessPillars: pillars, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Research Pillars updated successfully.', type: 'success' });
  }, [recordLog]);

  const updateResearchBeat = useCallback((beatId: string, updated: ResearchBeat) => {
    setState((prev) => {
      apiMutate(`/api/cms/research/${encodeURIComponent(beatId)}`, 'PATCH', updated).catch((e) => console.error('Failed to save research beat:', e));
      const log = recordLog(`Updated beat: ${updated.name}`, 'Research Domains');
      return { ...prev, lastUpdated: new Date().toISOString(), researchBeats: { ...prev.researchBeats, [beatId]: updated }, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: `Research Track "${updated.name}" saved.`, type: 'success' });
  }, [recordLog]);

  const recordResearchView = useCallback((beatId: string) => {
    setState((prev) => {
      const beat = prev.researchBeats[beatId];
      if (!beat) return prev;
      return { ...prev, researchBeats: { ...prev.researchBeats, [beatId]: { ...beat, viewCount: (beat.viewCount || 0) + 1 } } };
    });
  }, []);

  const addResearchBeat = useCallback((beat: ResearchBeat) => {
    setState((prev) => {
      apiMutate('/api/cms/research', 'POST', beat).catch((e) => console.error('Failed to create research beat:', e));
      const log = recordLog(`Created new beat: ${beat.name}`, 'Research Domains');
      return { ...prev, lastUpdated: new Date().toISOString(), researchBeats: { ...prev.researchBeats, [beat.id]: beat }, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: `Created new research beat "${beat.name}".`, type: 'success' });
  }, [recordLog]);

  const deleteResearchBeat = useCallback((beatId: string) => {
    setState((prev) => {
      const copy = { ...prev.researchBeats };
      const name = copy[beatId]?.name || beatId;
      delete copy[beatId];
      apiMutate(`/api/cms/research/${encodeURIComponent(beatId)}`, 'DELETE').catch((e) => console.error('Failed to delete research beat:', e));
      const log = recordLog(`Deleted beat: ${name}`, 'Research Domains');
      return { ...prev, lastUpdated: new Date().toISOString(), researchBeats: copy, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setSelectedBeatId(null);
    setNotification({ message: 'Research track removed.', type: 'info' });
  }, [recordLog]);

  const updateTeamMember = useCallback((member: TeamMember) => {
    setState((prev) => {
      const index = prev.team.findIndex((t) => t.id === member.id);
      let updatedTeam = [...prev.team];
      if (index >= 0) {
        updatedTeam[index] = member;
        apiMutate(`/api/cms/team/${encodeURIComponent(member.id)}`, 'PATCH', member).catch((e) => console.error('Failed to update team member:', e));
      } else {
        updatedTeam.push(member);
        apiMutate('/api/cms/team', 'POST', member).catch((e) => console.error('Failed to create team member:', e));
      }
      const log = recordLog(`Updated profile for ${member.name}`, 'Our Team');
      return { ...prev, lastUpdated: new Date().toISOString(), team: updatedTeam, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: `Profile for ${member.name} updated.`, type: 'success' });
  }, [recordLog]);

  const addTeamMember = useCallback((member: TeamMember) => {
    setState((prev) => {
      apiMutate('/api/cms/team', 'POST', member).catch((e) => console.error('Failed to create team member:', e));
      const log = recordLog(`Added researcher: ${member.name}`, 'Our Team');
      return { ...prev, lastUpdated: new Date().toISOString(), team: [member, ...prev.team], activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: `Added ${member.name} to research directory.`, type: 'success' });
  }, [recordLog]);

  const deleteTeamMember = useCallback((id: string) => {
    setState((prev) => {
      const member = prev.team.find((t) => t.id === id);
      apiMutate(`/api/cms/team/${encodeURIComponent(id)}`, 'DELETE').catch((e) => console.error('Failed to delete team member:', e));
      const log = recordLog(`Removed researcher: ${member?.name || id}`, 'Our Team');
      return { ...prev, lastUpdated: new Date().toISOString(), team: prev.team.filter((t) => t.id !== id), activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Team profile deleted.', type: 'info' });
  }, [recordLog]);

  const updatePublication = useCallback((pub: PublicationItem) => {
    setState((prev) => {
      const index = prev.publications.findIndex((p) => p.id === pub.id);
      let updatedPubs = [...prev.publications];
      if (index >= 0) {
        updatedPubs[index] = pub;
        apiMutate(`/api/cms/publications/${encodeURIComponent(pub.id)}`, 'PATCH', pub).catch((e) => console.error('Failed to update publication:', e));
      } else {
        updatedPubs.push(pub);
        apiMutate('/api/cms/publications', 'POST', pub).catch((e) => console.error('Failed to create publication:', e));
      }
      const log = recordLog(`Updated publication: ${pub.title}`, 'Publications');
      return { ...prev, lastUpdated: new Date().toISOString(), publications: updatedPubs, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: `Publication "${pub.title}" updated.`, type: 'success' });
  }, [recordLog]);

  const addPublication = useCallback((pub: PublicationItem) => {
    setState((prev) => {
      apiMutate('/api/cms/publications', 'POST', pub).catch((e) => console.error('Failed to create publication:', e));
      const log = recordLog(`Added publication: ${pub.title}`, 'Publications');
      return { ...prev, lastUpdated: new Date().toISOString(), publications: [pub, ...prev.publications], activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'New publication released.', type: 'success' });
  }, [recordLog]);

  const deletePublication = useCallback((id: string) => {
    setState((prev) => {
      const pub = prev.publications.find((p) => p.id === id);
      apiMutate(`/api/cms/publications/${encodeURIComponent(id)}`, 'DELETE').catch((e) => console.error('Failed to delete publication:', e));
      const log = recordLog(`Deleted publication: ${pub?.title || id}`, 'Publications');
      return { ...prev, lastUpdated: new Date().toISOString(), publications: prev.publications.filter((p) => p.id !== id), activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Publication item removed.', type: 'info' });
  }, [recordLog]);

  const updateMonitoring = useCallback((partial: Partial<MonitoringTelemetry>) => {
    setState((prev) => {
      const merged = { ...prev.monitoring, ...partial };
      apiMutate('/api/cms/monitoring', 'PUT', merged).catch((e) => console.error('Failed to save monitoring:', e));
      const log = recordLog('Updated monitoring telemetry parameters', 'Media Monitoring');
      return { ...prev, lastUpdated: new Date().toISOString(), monitoring: merged, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Telemetry parameters synchronized.', type: 'success' });
  }, [recordLog]);

  const updateSettings = useCallback((partial: Partial<SiteSettings>) => {
    setState((prev) => {
      const merged = { ...prev.settings, ...partial };
      apiMutate('/api/cms/settings', 'PUT', merged).catch((e) => console.error('Failed to save settings:', e));
      const log = recordLog('Updated site global settings', 'Settings');
      return { ...prev, lastUpdated: new Date().toISOString(), settings: merged, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Global site configuration saved.', type: 'success' });
  }, [recordLog]);

  const updateInquiryStatus = useCallback((id: string, status: InquirySubmission['status'], notes?: string) => {
    setState((prev) => {
      apiMutate(`/api/cms/inquiries/${encodeURIComponent(id)}`, 'PATCH', { status, notes }).catch((e) => console.error('Failed to update inquiry:', e));
      const updatedInquiries = prev.inquiries.map((inq) => {
        if (inq.id === id) return { ...inq, status, notes: notes !== undefined ? notes : inq.notes };
        return inq;
      });
      const log = recordLog(`Updated inquiry status to ${status}`, 'Inquiries Inbox');
      return { ...prev, lastUpdated: new Date().toISOString(), inquiries: updatedInquiries, activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: `Inquiry status updated to "${status}".`, type: 'success' });
  }, [recordLog]);

  const addInquiry = useCallback((inquiry: Omit<InquirySubmission, 'id' | 'date'>) => {
    const newInq: InquirySubmission = { ...inquiry, id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10), status: 'new' };
    setState((prev) => {
      apiMutate('/api/cms/inquiries', 'POST', inquiry).catch((e) => console.error('Failed to create inquiry:', e));
      const log = recordLog(`New research inquiry from ${inquiry.name}`, 'Inquiries Inbox');
      return { ...prev, lastUpdated: new Date().toISOString(), inquiries: [newInq, ...prev.inquiries], activityLogs: [log, ...prev.activityLogs.slice(0, 20)] };
    });
    setNotification({ message: 'Dataset request / inquiry recorded.', type: 'success' });
  }, [recordLog]);

  const resetToDefault = useCallback(() => {
    apiMutate('/api/cms/reset', 'POST')
      .then((res: any) => {
        if (res.snapshot) setState((prev) => ({ ...prev, ...res.snapshot }));
        setNotification({ message: 'CMS state has been reset to target website default data.', type: 'info' });
      })
      .catch((e) => {
        console.error('Failed to reset:', e);
        setNotification({ message: 'Failed to reset CMS state.', type: 'warning' });
      });
  }, []);

  const exportJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ipa-mediaresearch-cms-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setNotification({ message: 'CMS backup downloaded successfully.', type: 'success' });
  }, [state]);

  const importJson = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.researchBeats && parsed.team && parsed.homePage) {
        apiMutate('/api/cms/import', 'POST', parsed)
          .then((res: any) => {
            if (res.snapshot) setState((prev) => ({ ...prev, ...res.snapshot }));
            setNotification({ message: 'CMS state restored successfully from backup file.', type: 'success' });
          })
          .catch((e) => {
            console.error('Failed to import:', e);
            setNotification({ message: 'Failed to import CMS state.', type: 'warning' });
          });
        return true;
      } else {
        throw new Error('Invalid JSON structure: missing required CMS schema fields.');
      }
    } catch (err) {
      console.error('JSON Import Error:', err);
      setNotification({ message: 'Failed to import JSON: Invalid format or missing fields.', type: 'warning' });
      return false;
    }
  }, []);

  return (
    <CmsContext.Provider
      value={{
        state,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        selectedBeatId,
        setSelectedBeatId,
        selectedSectionAppId,
        setSelectedSectionAppId,
        searchQuery,
        setSearchQuery,
        previewLanguage,
        setPreviewLanguage,
        notification,
        setNotification,
        updateHomePage,
        updateAboutPage,
        updateContactPage,
        updateResearchPage,
        updateWorkProcessPillars,
        updateResearchBeat,
        recordResearchView,
        addResearchBeat,
        deleteResearchBeat,
        updateTeamMember,
        addTeamMember,
        deleteTeamMember,
        updatePublication,
        addPublication,
        deletePublication,
        updateMonitoring,
        updateSettings,
        updateInquiryStatus,
        addInquiry,
        resetToDefault,
        exportJson,
        importJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};