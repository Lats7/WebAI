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
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
