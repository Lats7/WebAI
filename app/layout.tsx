import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://webai.com.au'),
  title: {
    default: 'WebAI — Managed Technology Services | Melbourne',
    template: '%s | WebAI',
  },
  description:
    'Salesforce Consulting, IT Support, AI & Automation, and Project Management. Senior-led technology services for mid-market Australian businesses. Based in Melbourne.',
  keywords: [
    'managed technology services',
    'Salesforce consulting Melbourne',
    'IT support Melbourne',
    'AI automation consulting',
    'project management services',
    'technology consultancy Australia',
    'Microsoft 365 support',
    'WebAI',
  ],
  authors: [{ name: 'WebAI' }],
  creator: 'WebAI',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://webai.com.au',
    siteName: 'WebAI',
    title: 'WebAI — Managed Technology Services | Melbourne',
    description:
      'Salesforce, IT Support, AI & Automation, and Project Management — delivered by senior consultants who understand your business.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WebAI — Managed Technology Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebAI — Managed Technology Services',
    description: 'Senior-led technology services for mid-market Australian businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'WebAI',
              description: 'Managed Technology Services — Salesforce, IT Support, AI & Automation, Project Management',
              url: 'https://webai.com.au',
              email: 'hello@webai.com.au',
              telephone: '+61390000000',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Melbourne',
                addressRegion: 'VIC',
                addressCountry: 'AU',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Australia',
              },
              serviceType: [
                'Salesforce Consulting',
                'IT Support',
                'AI & Automation',
                'Project Management',
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased" style={{ backgroundColor: '#6b21a8' }}>
        {/* TEMP TEST OVERLAY — purple bg + green smiley. Remove to revert. */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(107, 33, 168, 0.35)',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(40vw, 360px)',
            height: 'min(40vw, 360px)',
            pointerEvents: 'none',
            zIndex: 9999,
            filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.35))',
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <circle cx="50" cy="50" r="46" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
            <circle cx="36" cy="40" r="6" fill="#14532d" />
            <circle cx="64" cy="40" r="6" fill="#14532d" />
            <path d="M30 60 Q50 82 70 60" fill="none" stroke="#14532d" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
