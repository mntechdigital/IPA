import type { Metadata } from 'next';
import WorkView from '../_components/WorkView';

export const metadata: Metadata = {
  title: 'Researches â€” IPA Media Research',
  description: 'Explore IPA research programs across journalism, platform dynamics, and civic reception.',
};

export default function WorkPage() {
  return <WorkView />;
}

