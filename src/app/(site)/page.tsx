import type { Metadata } from 'next';
import HomeView from './_components/HomeView';

export const metadata: Metadata = {
  title: 'IPA Media Research â€” Researching Media. Understanding Society.',
  description: 'Independent media research observatory researching journalism, technology, and information environments.',
};

export default function HomePage() {
  return <HomeView />;
}

