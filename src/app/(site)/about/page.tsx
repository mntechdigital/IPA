import type { Metadata } from 'next';
import AboutView from '../_components/AboutView';
import { getAboutPage, getSiteSettings } from '../../../lib/cms-store';

export const metadata: Metadata = {
  title: 'About Us — IPA Media Research',
  description: 'Learn about IPA, an independent media research observatory focused on journalism, technology, and information integrity.',
};

export default async function AboutPage() {
  let aboutPage: any = {};
  let siteSettings: any = {};

  try {
    aboutPage = await getAboutPage();
  } catch (error) {
    console.error('Failed to fetch about page from CMS:', error);
  }

  try {
    siteSettings = await getSiteSettings();
  } catch (error) {
    console.error('Failed to fetch site settings from CMS:', error);
  }

  return <AboutView aboutPage={aboutPage} siteSettings={siteSettings} />;
}