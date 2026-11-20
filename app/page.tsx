import type { Metadata } from 'next';
import { Agents } from '@/components/sections/Agents';
import { Approach } from '@/components/sections/Approach';
import { Build } from '@/components/sections/Build';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Reviews } from '@/components/sections/Reviews';
import { Security } from '@/components/sections/Security';
import { Services } from '@/components/sections/Services';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Agents />
      <Security />
      <Build />
      <Approach />
      <Reviews />
      <Contact />
    </>
  );
}
