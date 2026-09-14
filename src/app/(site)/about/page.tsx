import type { Metadata } from 'next';
import AboutView from '../_components/AboutView';

export const metadata: Metadata = {
  title: 'About Us â€” IPA Media Research',
  description: 'Learn about IPA, an independent media research observatory focused on journalism, technology, and information integrity.',
};

export default function AboutPage() {
  return <AboutView />;
}

