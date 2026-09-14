import type { Metadata } from 'next';
import ContactView from '../_components/ContactView';

export const metadata: Metadata = {
  title: 'Contact â€” IPA Media Research',
  description: 'Get in touch with IPA for research collaboration, dataset access, and inquiries.',
};

export default function ContactPage() {
  return <ContactView />;
}

