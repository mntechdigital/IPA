import type { Metadata } from 'next';
import TeamView from '../_components/TeamView';

export const metadata: Metadata = {
  title: 'Our Team â€” IPA Media Research',
  description: 'Meet the researchers, analysts, and media experts behind IPA research.',
};

export default function TeamPage() {
  return <TeamView />;
}

