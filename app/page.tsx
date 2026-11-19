import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { StatusBar } from '@/components/layout/StatusBar';
import { Agents } from '@/components/sections/Agents';
import { Approach } from '@/components/sections/Approach';
import { Build } from '@/components/sections/Build';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Reviews } from '@/components/sections/Reviews';
import { Security } from '@/components/sections/Security';
import { Services } from '@/components/sections/Services';
import { Backdrop } from '@/components/shared/Backdrop';
import { CommandMenu } from '@/components/shared/CommandMenu';
import { Motion } from '@/components/shared/Motion';
import { ScrollProgress } from '@/components/shared/ScrollProgress';

export default function Home() {
  return (
    <Motion>
      <Backdrop />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Agents />
        <Security />
        <Build />
        <Approach />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
      <CommandMenu />
    </Motion>
  );
}
