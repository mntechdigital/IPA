import type { Metadata } from 'next';
import { INVESTIGATIONS_DETAIL } from '../../../../data/investigationsDetail';
import InvestigationView from '../../_components/InvestigationView';

interface InvestigationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: InvestigationPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = INVESTIGATIONS_DETAIL[id] || INVESTIGATIONS_DETAIL['media-journalism'];
  return {
    title: `${data.name} â€” IPA Media Research`,
    description: data.tagline,
  };
}

export default async function InvestigationPage({ params }: InvestigationPageProps) {
  const { id } = await params;
  return <InvestigationView id={id} />;
}

