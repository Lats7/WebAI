'use client';

import { motion } from 'framer-motion';
import { Cloud, Monitor, Sparkles, Kanban, ArrowUpRight, Check } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { services } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Monitor,
  Sparkles,
  Kanban,
};

// Each card gets a subtle unique accent gradient — keyed by slug for stable mapping
const cardAccentMap: Record<string, string> = {
  'ai-automation': 'from-indigo-500 via-blue-500 to-cyan-400',
  'salesforce': 'from-blue-500 via-blue-400 to-cyan-400',
  'it-support': 'from-sky-500 via-cyan-400 to-teal-400',
  'project-management': 'from-blue-600 via-indigo-500 to-purple-400',
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Services() {
  return (
    <SectionWrapper id="services">
      {/* Section Header */}
      <div className="text-center mb-16 lg:mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-heading font-semibold text-sm tracking-wider uppercase"
        >
          What We Do
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-heading text-heading md:text-display-sm font-bold text-foreground"
        >
          Services Built for Growth
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-foreground-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Enterprise-grade technology services, delivered with the care and attention of a boutique consultancy.
        </motion.p>
      </div>

      {/* Service Cards — equal 2x2 grid with gradient border accent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          const accent = cardAccentMap[service.slug] || 'from-blue-500 to-cyan-400';

          return (
            <motion.div
              key={service.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
              className={cn('group relative cursor-pointer', `order-none md:order-none`)}
              style={{ order: undefined }}
            >
              {/* Gradient border — top edge */}
              <div className={cn(
                'absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r opacity-40 group-hover:opacity-100 group-hover:left-4 group-hover:right-4 transition-all duration-500',
                accent
              )} />

              <div className="relative glass-card rounded-3xl p-8 lg:p-10 h-full flex flex-col group-hover:shadow-2xl group-hover:shadow-accent/[0.08] transition-shadow duration-500">
                {/* Header row: icon + arrow */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/[0.15] group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-300"
                  >
                    {Icon && <Icon size={26} strokeWidth={1.8} />}
                  </motion.div>

                  <div className="w-10 h-10 rounded-xl bg-background-tertiary/50 flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={18} className="text-accent" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-foreground-secondary leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Features — two-column checklist */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-6 border-t border-border">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground-muted group-hover:text-foreground-secondary transition-colors duration-300"
                    >
                      <Check size={14} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
