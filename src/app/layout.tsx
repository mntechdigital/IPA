import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IPA — Institute of Public Accountability',
  description:
    'Independent media research observatory focused on journalism, digital platforms, public opinion, and institutional accountability.',
  openGraph: {
    title: 'IPA — Institute of Public Accountability',
    description:
      'Independent media research observatory focused on journalism, digital platforms, public opinion, and institutional accountability.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPA — Institute of Public Accountability',
    description:
      'Independent media research observatory focused on journalism, digital platforms, public opinion, and institutional accountability.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}