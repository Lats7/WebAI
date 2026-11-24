import type { Metadata } from 'next';
import { Agents } from '@/components/sections/Agents';
import { Approach } from '@/components/sections/Approach';
import { Build } from '@/components/sections/Build';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { ITSupport } from '@/components/sections/ITSupport';
import { Reviews } from '@/components/sections/Reviews';
import { Security } from '@/components/sections/Security';
import { Services } from '@/components/sections/Services';
import { SHARE_BASE } from '@/lib/seo';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  // Setting any share detail here replaces the ones in the layout, so name them all.
  openGraph: { ...SHARE_BASE, url: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Agents />
      <ITSupport />
      <Security />
      <Build />
      <Approach />
      <Reviews />
      <Contact />
    </>
  );
}
