'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useCms } from '../../../../context/CmsContext';

const OverviewView = dynamic(() => import('../../../../components/dashboard/OverviewView').then(m => m.OverviewView), { ssr: false });
const AppGridHub = dynamic(() => import('../../../../components/dashboard/AppGridHub').then(m => m.AppGridHub), { ssr: false });
const SectionFormEditor = dynamic(() => import('../../../../components/dashboard/SectionFormEditor').then(m => m.SectionFormEditor), { ssr: false });
const PublicationsEditor = dynamic(() => import('../../../../components/dashboard/PublicationsEditor').then(m => m.PublicationsEditor), { ssr: false });
const MonitoringEditor = dynamic(() => import('../../../../components/dashboard/MonitoringEditor').then(m => m.MonitoringEditor), { ssr: false });
const InquiriesEditor = dynamic(() => import('../../../../components/dashboard/InquiriesEditor').then(m => m.InquiriesEditor), { ssr: false });
const TeamsDirectoryView = dynamic(() => import('../../../../components/dashboard/TeamsDirectoryView').then(m => m.TeamsDirectoryView), { ssr: false });
const ResearchManagerView = dynamic(() => import('../../../../components/dashboard/ResearchManagerView').then(m => m.ResearchManagerView), { ssr: false });
const LiveSitePreview = dynamic(() => import('../../../../components/frontend/LiveSitePreview').then(m => m.LiveSitePreview), { ssr: false });

export const CmsSectionView: React.FC<{ tab: string }> = ({ tab }) => {
  const { selectedSectionAppId, viewMode } = useCms();

  const renderEditor = () => {
    if (selectedSectionAppId === 'research-tracks' || selectedSectionAppId === 'research-categories' || selectedSectionAppId === 'research-category' || selectedSectionAppId === 'research-create') {
      return <ResearchManagerView />;
    }
    if (selectedSectionAppId) {
      return <SectionFormEditor appId={selectedSectionAppId} />;
    }

    switch (tab) {
      case 'overview':
        return <OverviewView />;
      case 'home':
        return <AppGridHub pageId="home" />;
      case 'about':
        return <AppGridHub pageId="about" />;
      case 'research':
        return <AppGridHub pageId="research" />;
      case 'teams':
        return <TeamsDirectoryView />;
      case 'contact':
        return <AppGridHub pageId="contact" />;
      case 'branding':
        return <AppGridHub pageId="branding" />;
      case 'publications':
        return <PublicationsEditor />;
      case 'monitoring':
        return <MonitoringEditor />;
      case 'inquiries':
        return <InquiriesEditor />;
      default:
        return <OverviewView />;
    }
  };

  if (viewMode === 'frontend') {
    return <LiveSitePreview />;
  }

  if (viewMode === 'split') {
    return (
      <div className="flex h-full flex-col xl:flex-row">
        <div className="flex-1 min-w-0 border-b xl:border-b-0 xl:border-r border-slate-200">
          <LiveSitePreview />
        </div>
        <div className="flex-1 min-w-0">{renderEditor()}</div>
      </div>
    );
  }

  return renderEditor();
};