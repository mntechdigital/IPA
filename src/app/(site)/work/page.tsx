import 'server-only';

import type { Metadata } from 'next';
import WorkView from '../_components/WorkView';
import { listWorkAreas, listWorkProcessPillars } from '../../../lib/cms-store';
import { WORK_AREAS, WORK_PROCESS_PILLARS } from '../../../data/work';
import type { WorkArea, WorkProcessPillar } from '../../../types';

export const metadata: Metadata = {
  title: 'Researches — IPA Media Research',
  description: 'Explore IPA research programs across journalism, platform dynamics, and civic reception.',
};

export default async function WorkPage() {
  let workAreas: WorkArea[] = [];
  let workProcessPillars: WorkProcessPillar[] = [];

  try {
    const [fetchedAreas, fetchedPillars] = await Promise.all([
      listWorkAreas(),
      listWorkProcessPillars(),
    ]);
    workAreas = fetchedAreas;
    workProcessPillars = fetchedPillars;
  } catch {
    // fallback to static defaults below
  }

  const areas = workAreas.length > 0 ? workAreas : WORK_AREAS as unknown as WorkArea[];
  const pillars = workProcessPillars.length > 0 ? workProcessPillars : WORK_PROCESS_PILLARS;

  return <WorkView workAreas={areas} workProcessPillars={pillars} />;
}
