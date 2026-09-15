import type { Metadata } from 'next';
import ContactView from '../_components/ContactView';
import { getContactPage, getSiteSettings } from '../../../lib/cms-store';

export const metadata: Metadata = {
  title: 'Contact — IPA Media Research',
  description: 'Get in touch with IPA for research collaboration, dataset access, and inquiries.',
};

export default async function ContactPage() {
  try {
    const [contactPage, siteSettings] = await Promise.all([
      getContactPage(),
      getSiteSettings(),
    ]);

    return (
      <ContactView
        contactPage={contactPage ?? null}
        siteSettings={(siteSettings ?? {}) as any}
      />
    );
  } catch (err) {
    return <ContactView contactPage={null} siteSettings={{}} />;
  }
}
