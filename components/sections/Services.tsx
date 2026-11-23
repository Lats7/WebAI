import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AgentFigure, AutomationFigure, SecurityFigure } from '@/components/shared/Figures';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { ICONS } from '@/components/shared/icons';
import { SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const FIGURES: Record<string, typeof AgentFigure> = {
  'agentic-ai': AgentFigure,
  automation: AutomationFigure,
  'cyber-security': SecurityFigure,
};

export function Services() {
  const core = SERVICES.filter((service) => service.tier === 'core');
  const support = SERVICES.filter((service) => service.tier === 'support');

  return (
    <Section id="services" flush>
      {/* Statement */}
      <Reveal className={cn(CELL_X, 'py-20 sm:py-24 lg:py-32')}>
        <Eyebrow code="01">What we do</Eyebrow>
        <h2 className="sr-only">AI agents, automation, and cyber security services</h2>
        <p className="statement mt-8 max-w-5xl text-[clamp(1.7rem,3.7vw,3.1rem)]">
          AI, automation, and security from one team.{' '}
          <span className="muted">
            Most AI builders add security later, and most security consultants do not ship software. We do
            both, so what we build passes review instead of stalling in it.
          </span>
        </p>
      </Reveal>

      {/* Core disciplines */}
      <div className="grid border-t border-edge lg:grid-cols-3">
        {core.map((service, index) => {
          const Figure = FIGURES[service.slug];
          return (
            <Reveal
              key={service.slug}
              delay={index * 0.08}
              className={cn('border-edge', index > 0 && 'border-t lg:border-l lg:border-t-0')}
            >
              <article className="spotlight group relative flex h-full flex-col px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
                <div className="flex items-center justify-between">
                  <span className="label text-signal ws:text-fg-3">
                    Fig <span className="tabular-nums">0.{index + 1}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-fg-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>

                {Figure && <Figure className="mx-auto my-6 h-56 w-full max-w-[20rem] text-fg lg:my-8 lg:h-60" />}

                <h3 className="display text-2xl text-fg sm:text-[1.75rem]">
                  <Link href={service.href} className="after:absolute after:inset-0 after:content-['']">
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-fg-2">{service.description}</p>

                <ul className="mt-7 grid gap-2.5 border-t border-edge pt-6 text-sm text-fg-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Supporting services */}
      <div className="grid border-t border-edge lg:grid-cols-2">
        {support.map((service, index) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal
              key={service.slug}
              delay={0.08 + index * 0.08}
              className={cn('border-edge', index > 0 && 'border-t lg:border-l lg:border-t-0')}
            >
              <article className="spotlight group relative flex h-full items-start gap-5 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[3px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="display text-xl text-fg">
                    <Link href={service.href} className="after:absolute after:inset-0 after:content-['']">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-2">{service.description}</p>
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
