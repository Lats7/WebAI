import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { COMPANY, SERVICES } from '@/lib/constants';
import { THEME_INIT_SCRIPT, THEME_META } from '@/lib/theme-config';
import './globals.css';

// One sans for both styles. Each style sets its own weight and tracking.
const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Labels, codes, and the console in Mission Control.
const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Headline accent in Workspace.
const serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
});

const title = `${COMPANY.fullName} | AI agents, automation, and cyber security in Melbourne`;

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: title,
    template: `%s | ${COMPANY.fullName}`,
  },
  description: COMPANY.description,
  keywords: [
    'AI agents Melbourne',
    'agentic AI consulting',
    'AI automation Australia',
    'cyber security consultant Melbourne',
    'Essential Eight assessment',
    'ISO 27001 readiness',
    'AI governance',
    'AI readiness review',
    'LLM security testing',
    'CRM implementation',
    'Salesforce consulting',
    'web and app development',
    COMPANY.fullName,
  ],
  authors: [{ name: COMPANY.fullName }],
  creator: COMPANY.fullName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: COMPANY.url,
    siteName: COMPANY.fullName,
    title,
    description: COMPANY.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: COMPANY.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: THEME_META.mission.themeColor,
  width: 'device-width',
  initialScale: 1,
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: COMPANY.fullName,
  description: COMPANY.description,
  url: COMPANY.url,
  email: COMPANY.email,
  telephone: COMPANY.phone.replace(/\s/g, ''),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  areaServed: { '@type': 'Country', name: 'Australia' },
  sameAs: [COMPANY.socials.linkedin, COMPANY.socials.freelancer],
  serviceType: SERVICES.map((service) => service.title),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      data-theme="mission"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"],.step[data-state="pending"]{opacity:1!important;transform:none!important;filter:none!important}',
            }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
