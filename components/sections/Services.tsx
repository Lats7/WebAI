import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AgentGlyph, AutomationGlyph, SecurityGlyph } from '@/components/shared/Glyphs';
import { ICONS } from '@/components/shared/icons';
import { SERVICES } from '@/lib/constants';

const GLYPHS: Record<string, typeof AgentGlyph> = {
  'agentic-ai': AgentGlyph,
  automation: AutomationGlyph,
  'cyber-security': SecurityGlyph,
};

export function Services() {
  const core = SERVICES.filter((service) => service.tier === 'core');
  const support = SERVICES.filter((service) => service.tier === 'support');

  return (
    <Section id="services">
      <SectionHeader
        code="01"
        eyebrow="Services"
        title={
          <>
            AI, automation, and security <span className="accent-word">at the core.</span>
          </>
        }
        description="Three disciplines that work better together, plus the CRM, web, and app work that surrounds them. One team is accountable for all of it."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {core.map((service, index) => {
          const Icon = ICONS[service.icon];
          const Glyph = GLYPHS[service.slug];
          return (
            <Reveal key={service.slug} delay={index * 0.08} className="h-full">
              <article className="card card-hover group flex h-full flex-col p-7 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center border border-edge-strong text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="mc-only label text-fg-3">SVC.{service.code}</span>
                  </div>
                  {Glyph && <Glyph className="h-20 w-24 text-accent opacity-90" />}
                </div>

                <h3 className="display mt-6 text-2xl text-fg sm:text-[1.7rem]">
                  <a href={service.href} className="after:absolute after:inset-0 after:content-['']">
                    {service.title}
                  </a>
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">{service.description}</p>

                <ul className="mt-6 space-y-2.5 border-t border-edge pt-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-2">
                      <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="label mt-auto flex items-center gap-1.5 pt-7 text-accent" aria-hidden="true">
                  Explore
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {support.map((service, index) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal key={service.slug} delay={0.1 + index * 0.08} className="h-full">
              <article className="card card-hover group flex h-full flex-col gap-5 p-7 sm:flex-row sm:items-start lg:p-8">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="display text-xl text-fg">
                    <a href={service.href} className="after:absolute after:inset-0 after:content-['']">
                      {service.title}
                    </a>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{service.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="chip">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 hidden shrink-0 text-fg-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
