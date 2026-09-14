import type { Metadata } from 'next';
import HomeView from './_components/HomeView';
import { getSiteContent } from '../../lib/site-content';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { settings, homePage } = await getSiteContent();
  const siteName = settings?.siteName || 'IPA Media Research';
  const heroHeadline = homePage?.heroHeadline
    ?.split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ');
  return {
    title: heroHeadline
      ? `${heroHeadline} — ${siteName}`
      : `${siteName} — Researching Media. Understanding Society.`,
    description:
      settings?.metaDescription ||
      'Independent media research observatory researching journalism, technology, and information environments.',
  };
}

export default async function HomePage() {
  const content = await getSiteContent();
  return <HomeView content={content} />;
}