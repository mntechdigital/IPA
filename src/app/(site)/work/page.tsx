import 'server-only';

import type { Metadata } from 'next';
import WorkView from '../_components/WorkView';
import { getResearchPage, listResearchBeats, listWorkProcessPillars } from '../../../lib/cms-store';
import { INITIAL_CMS_STATE } from '../../../data/initialData';
import type { ResearchBeat, ResearchPageData, WorkProcessPillar } from '../../../types';

export async function generateMetadata(): Promise<Metadata> {
  let pageData: ResearchPageData | null = null;
  try {
    pageData = await getResearchPage();
  } catch {
    pageData = null;
  }
  const hero = pageData?.hero || INITIAL_CMS_STATE.researchPage.hero;
  return {
    title: hero?.title ? `${hero.title} — IPA Media Research` : 'Researches — IPA Media Research',
    description: hero?.description || 'Explore IPA research programs across journalism, platform dynamics, and civic reception.',
  };
}

export default async function WorkPage() {
  let researchPage: ResearchPageData | null = null;
  let researchBeats: ResearchBeat[] = [];
  let workProcessPillars: WorkProcessPillar[] = [];

  try {
    const [fetchedPage, fetchedBeats, fetchedPillars] = await Promise.all([
      getResearchPage(),
      listResearchBeats(),
      listWorkProcessPillars(),
    ]);
    researchPage = fetchedPage;
    researchBeats = fetchedBeats;
    workProcessPillars = fetchedPillars;
  } catch {
    // Fallback to defaults
  }

  const page = (researchPage && Object.keys(researchPage).length > 0)
    ? researchPage
    : INITIAL_CMS_STATE.researchPage;
  const beats = researchBeats.length > 0
    ? researchBeats
    : Object.values(INITIAL_CMS_STATE.researchBeats);
  const pillars = workProcessPillars.length > 0
    ? workProcessPillars
    : INITIAL_CMS_STATE.workProcessPillars;

  return (
    <WorkView
      researchPage={page}
      researchBeats={beats}
      workProcessPillars={pillars}
    />
  );
}
