'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PROCESS_STEPS } from '@/lib/constants';

export function HowWeWork() {
  return (
    <SectionWrapper id="process">
      <SectionHeader
        eyebrow="Our Process"
        title="How We Work"
        description="A proven approach that keeps things simple, transparent, and focused on outcomes."
      />

      {/* Desktop: horizontal timeline with connecting line */}
      {/* Mobile: vertical timeline with left-side connector */}
      <div className="relative">
        {/* Desktop connecting line */}
        <div className="hidden lg:block absolute top-[4.25rem] left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px" aria-hidden="true">
          <div className="h-full w-full bg-gradient-to-r from-accent/25 via-border-strong to-accent/25" />
        </div>

        {/* Mobile vertical connector */}
        <div className="lg:hidden absolute left-[1.5rem] top-8 bottom-8 w-px bg-gradient-to-b from-accent/25 via-border-strong to-accent/25" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Mobile layout: timeline marker + card side by side */}
              <div className="flex lg:block gap-6 lg:gap-0 py-4 lg:py-0">
                {/* Timeline marker — mobile only */}
                <div className="lg:hidden flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-lg border border-accent/40 bg-background-secondary flex items-center justify-center font-mono font-medium text-sm text-accent">
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-7 lg:p-8 lg:text-center group flex-1">
                  {/* Step number — desktop only */}
                  <div className="hidden lg:inline-flex relative z-10 items-center justify-center w-12 h-12 rounded-lg border border-accent/40 bg-background-secondary font-mono font-medium text-sm text-accent mb-6 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
                    {step.number}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
