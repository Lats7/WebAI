import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { GrainOverlay } from '@/components/shared/GrainOverlay';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { NeuralBackground } from '@/components/shared/NeuralBackground';

export default function Home() {
  return (
    <>
      <NeuralBackground />
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" aria-hidden="true" />
        <Services />
        <div className="section-divider" aria-hidden="true" />
        <About />
        <div className="section-divider" aria-hidden="true" />
        <HowWeWork />
        <div className="section-divider" aria-hidden="true" />
        <Testimonials />
        <div className="section-divider" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
