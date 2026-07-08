'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Monitor, Sparkles, Code, ArrowUpRight, Check } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { services } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Monitor,
  Sparkles,
  Code,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        eyebrow="What We Do"
        title="Services Built for Growth"
        description="Enterprise-grade technology services, delivered with the care and attention of a boutique consultancy."
      />

      {/* Service Cards — 2x2 grid, single accent story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];

          return (
            <motion.div
              key={service.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Accent hairline — top edge, brightens on hover */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative glass-card rounded-2xl p-8 lg:p-10 h-full flex flex-col">
                {/* Header row: icon + index */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg border border-border-strong bg-accent/[0.06] flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors duration-300">
                    {Icon && <Icon size={22} strokeWidth={1.8} />}
                  </div>

                  <span className="font-mono text-xs text-foreground-muted tracking-widest group-hover:text-accent/70 transition-colors duration-300">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3 tracking-tight">
                  {service.title}
                  <ArrowUpRight
                    size={18}
                    className="inline-block ml-2 text-accent opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </h3>

                {/* Description */}
                <p className="text-foreground-secondary leading-relaxed mb-8 flex-grow text-[15px]">
                  {service.description}
                </p>

                {/* Features — two-column checklist */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-6 border-t border-border">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground-muted group-hover:text-foreground-secondary transition-colors duration-300"
                    >
                      <Check size={14} className="text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
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
