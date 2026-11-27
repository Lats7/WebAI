import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { StatusBar } from '@/components/layout/StatusBar';
import { AttributionCapture } from '@/components/shared/AttributionCapture';
import { Backdrop } from '@/components/shared/Backdrop';
import { CommandMenuLoader } from '@/components/shared/CommandMenuLoader';
import { JsonLd } from '@/components/shared/JsonLd';
import { Motion } from '@/components/shared/Motion';
import { RevealObserver } from '@/components/shared/RevealObserver';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { COMPANY, META_DESCRIPTION, SERVICES } from '@/lib/constants';
import { HOLDING_MESSAGE, isHolding } from '@/lib/holding';
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

const title = `${COMPANY.fullName} | AI automation and IT support, Melbourne`;

// While the holding page is on, the site shows one message and no navigation. See lib/holding.ts.
const holding = isHolding();

const holdingMetadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: COMPANY.fullName,
  description: HOLDING_MESSAGE,
  robots: { index: false, follow: false },
};

const siteMetadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: title,
    template: `%s | ${COMPANY.fullName}`,
  },
  description: META_DESCRIPTION,
  authors: [{ name: COMPANY.fullName }],
  creator: COMPANY.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: COMPANY.fullName,
    title,
    description: META_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: META_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const metadata: Metadata = holding ? holdingMetadata : siteMetadata;

export const viewport: Viewport = {
  themeColor: THEME_META.mission.themeColor,
  width: 'device-width',
  initialScale: 1,
};

const organisation = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${COMPANY.url}/#organisation`,
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
      data-scroll-behavior="smooth"
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
        {!holding && <JsonLd data={organisation} />}
      </head>
      <body className="font-sans antialiased">
        {holding ? (
          // The holding page stands alone: no navigation, no footer, no tracking.
          <main id="main">{children}</main>
        ) : (
          <>
            <Motion>
              <Backdrop />
              <ScrollProgress />
              <Navbar />
              <main id="main">{children}</main>
              <Footer />
              <StatusBar />
              <CommandMenuLoader />
            </Motion>
            <RevealObserver />
            <AttributionCapture />
            {/* Vercel serves the analytics script from this site's own origin. It only exists on Vercel. */}
            {process.env.VERCEL ? <Analytics /> : null}
          </>
        )}
      </body>
    </html>
  );
}
