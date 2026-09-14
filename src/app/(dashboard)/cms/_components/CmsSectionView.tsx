'use client';

import React from 'react';
import { useCms } from '../../../../context/CmsContext';
import { OverviewView } from '../../../../components/dashboard/OverviewView';
import { AppGridHub } from '../../../../components/dashboard/AppGridHub';
import { SectionFormEditor } from '../../../../components/dashboard/SectionFormEditor';
import { PublicationsEditor } from '../../../../components/dashboard/PublicationsEditor';
import { MonitoringEditor } from '../../../../components/dashboard/MonitoringEditor';
import { InquiriesEditor } from '../../../../components/dashboard/InquiriesEditor';
import { TeamsDirectoryView } from '../../../../components/dashboard/TeamsDirectoryView';
import { ResearchManagerView } from '../../../../components/dashboard/ResearchManagerView';
import { LiveSitePreview } from '../../../../components/frontend/LiveSitePreview';

export const CmsSectionView: React.FC<{ tab: string }> = ({ tab }) => {
  const { selectedSectionAppId, viewMode } = useCms();

  const renderEditor = () => {
    if (selectedSectionAppId === 'research-categories' || selectedSectionAppId === 'research-category') {
      return <ResearchManagerView initialApp="category" />;
    }
    if (selectedSectionAppId === 'research-create') {
      return <ResearchManagerView initialApp="create" />;
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
        return <ResearchManagerView />;
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