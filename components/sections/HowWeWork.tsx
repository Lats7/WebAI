'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { PROCESS_STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function HowWeWork() {
  return (
    <SectionWrapper id="process">
      <div className="text-center mb-16 lg:mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-heading font-semibold text-sm tracking-wider uppercase"
        >
          Our Process
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-heading text-heading md:text-display-sm font-bold text-foreground"
        >
          How We Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-foreground-secondary max-w-2xl mx-auto leading-relaxed"
        >
          A proven approach that keeps things simple, transparent, and focused on outcomes.
        </motion.p>
      </div>

      {/* Desktop: horizontal timeline with connecting line */}
      {/* Mobile: vertical timeline with left-side connector */}
      <div className="relative">
        {/* Desktop connecting line */}
        <div className="hidden lg:block absolute top-[4.5rem] left-[calc(12.5%+1.75rem)] right-[calc(12.5%+1.75rem)] h-px" aria-hidden="true">
          <div className="h-full w-full bg-gradient-to-r from-accent/30 via-accent/20 to-accent/30" />
        </div>

        {/* Mobile vertical connector */}
        <div className="lg:hidden absolute left-[1.6rem] top-8 bottom-8 w-px bg-gradient-to-b from-accent/30 via-accent/20 to-accent/30" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Mobile layout: timeline dot + card side by side */}
              <div className="flex lg:block gap-6 lg:gap-0 py-4 lg:py-0">
                {/* Timeline dot — mobile only */}
                <div className="lg:hidden flex-shrink-0 relative z-10">
                  <div className="w-[3.25rem] h-[3.25rem] rounded-2xl gradient-accent flex items-center justify-center text-white font-heading font-bold text-base shadow-lg shadow-accent/20">
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className={cn(
                    'glass-card rounded-3xl p-7 lg:p-8 lg:text-center group flex-1',
                    'hover:shadow-lg hover:shadow-accent/5'
                  )}
                >
                  {/* Step number — desktop only */}
                  <div className="hidden lg:inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-accent text-white font-heading font-bold text-lg mb-6 group-hover:shadow-lg group-hover:shadow-accent/25 group-hover:scale-105 transition-all duration-300">
                    {step.number}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
