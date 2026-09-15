import type { Metadata } from 'next';
import { getResearchBeat } from '../../../../lib/cms-store';
import { INVESTIGATIONS_DETAIL } from '../../../../data/investigationsDetail';
import InvestigationView from '../../_components/InvestigationView';

interface InvestigationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: InvestigationPageProps): Promise<Metadata> {
  const { id } = await params;
  let data;
  try {
    const beat = await getResearchBeat(id);
    if (beat) {
      data = beat;
    }
  } catch {
  }
  data = data || INVESTIGATIONS_DETAIL[id] || INVESTIGATIONS_DETAIL['media-journalism'];
  return {
    title: `${data.name} â€” IPA Media Research`,
    description: data.tagline,
  };
}

export default async function InvestigationPage({ params }: InvestigationPageProps) {
  const { id } = await params;
  let beat;
  try {
    beat = await getResearchBeat(id);
  } catch {
  }
  return <InvestigationView beat={beat} id={id} />;
}
