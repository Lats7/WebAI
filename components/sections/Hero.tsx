'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';

const wordReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: text moves up slower than scroll, bg moves down
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatedBackground />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-background-secondary/60 backdrop-blur-sm px-5 py-2 mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-accent-secondary" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-secondary" />
          </span>
          <span className="font-mono text-[11px] font-medium text-foreground-secondary tracking-[0.18em] uppercase">
            Melbourne-Based Technology Consultancy
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          variants={wordReveal}
          initial="hidden"
          animate="visible"
          className="font-heading text-display-sm md:text-display font-bold tracking-tight text-balance"
        >
          <motion.span variants={wordChild} className="inline-block gradient-text">
            AI that does the job.
          </motion.span>
          <br />
          <motion.span variants={wordChild} className="inline-block gradient-accent-text">
            Not just the pitch.
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed text-balance"
        >
          From buzzword to bottom line. Senior consultants who design, build, and run
          the systems your business depends on.
        </motion.p>

        {/* Capability index — technical chip row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {[
            'AI & Automation',
            'IT Infrastructure',
            'AI Readiness Review',
            'Full-Stack Development',
          ].map((label, i) => (
            <span
              key={label}
              className="inline-flex items-center gap-2.5 font-mono text-xs text-foreground-muted tracking-wider uppercase"
            >
              <span className="text-accent/70">{String(i + 1).padStart(2, '0')}</span>
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="group/btn"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — fades out on scroll */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] font-medium text-foreground-muted uppercase tracking-[0.25em]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-foreground-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
