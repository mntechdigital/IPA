import "server-only";

import type { Metadata } from "next";
import { getResearchBeat, listResearchBeats } from "../../../../lib/cms-store";
import InvestigationView from "../../_components/InvestigationView";
import { INITIAL_CMS_STATE } from "../../../../data/initialData";
import type { ResearchBeat } from "../../../../types";

interface InvestigationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InvestigationPageProps): Promise<Metadata> {
  const { id } = await params;
  let data: ResearchBeat | null = null;
  try {
    data = await getResearchBeat(id);
  } catch {
    data = null;
  }
  if (!data) {
    try {
      const beats = await listResearchBeats();
      data =
        beats.find((b) => b.id === id || b.slug === id) || beats[0] || null;
    } catch {
      data = null;
    }
  }
  if (!data) {
    const fallback =
      Object.values(INITIAL_CMS_STATE.researchBeats).find((b) => b.id === id) ||
      Object.values(INITIAL_CMS_STATE.researchBeats)[0];
    data = fallback || null;
  }
  if (!data) {
    return {
      title: "Research — IPA Media Research",
      description: "Independent media research observatory.",
    };
  }
  return {
    title: `${data.name} — IPA Media Research`,
    description: data.tagline,
  };
}

export default async function InvestigationPage({
  params,
}: InvestigationPageProps) {
  const { id } = await params;
  let beat: ResearchBeat | null = null;
  let allBeats: ResearchBeat[] = [];

  try {
    const [fetchedBeat, fetchedBeats] = await Promise.all([
      getResearchBeat(id),
      listResearchBeats(),
    ]);
    beat = fetchedBeat;
    allBeats = fetchedBeats;
  } catch {
    // Fallback
  }

  if (!beat && allBeats.length > 0) {
    beat = allBeats.find((b) => b.id === id || b.slug === id) || null;
  }

  if (!beat) {
    beat =
      (INITIAL_CMS_STATE.researchBeats as Record<string, ResearchBeat>)[id] ||
      Object.values(INITIAL_CMS_STATE.researchBeats)[0] ||
      null;
  }

  if (allBeats.length === 0) {
    allBeats = Object.values(INITIAL_CMS_STATE.researchBeats);
  }

  return <InvestigationView beat={beat} id={id} allBeats={allBeats} />;
}