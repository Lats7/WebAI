import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AgentFigure, AutomationFigure, SecurityFigure, SupportFigure } from '@/components/shared/Figures';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const FIGURES: Record<string, typeof AgentFigure> = {
  'agentic-ai': AgentFigure,
  automation: AutomationFigure,
  'it-support': SupportFigure,
  'cyber-security': SecurityFigure,
};

// Rules between the four core cards: a column on a phone, two by two on a tablet, one row on a wide screen.
const CORE_RULES = [
  '',
  'border-t md:border-l md:border-t-0',
  'border-t xl:border-l xl:border-t-0',
  'border-t md:border-l xl:border-t-0',
];

export function Services() {
  const core = SERVICES.filter((service) => service.tier === 'core');
  const support = SERVICES.filter((service) => service.tier === 'support');

  return (
    <Section id="services" flush>
      {/* Statement */}
      <Reveal className={cn(CELL_X, 'py-20 sm:py-24 lg:py-32')}>
        <Eyebrow code="01">What we do</Eyebrow>
        <h2 className="sr-only">AI agents, automation, IT support, and security services</h2>
        <p className="statement mt-8 max-w-5xl text-[clamp(1.7rem,3.7vw,3.1rem)]">
          AI and automation that take cost out of your business.{' '}
          <span className="muted">
            We find the manual work that eats the most hours, automate it, and look after the IT underneath.
            Security is built in from the first day, so it never becomes the thing that holds you up.
          </span>
        </p>
      </Reveal>

      {/* Core disciplines */}
      <div className="grid border-t border-edge md:grid-cols-2 xl:grid-cols-4">
        {core.map((service, index) => {
          const Figure = FIGURES[service.slug];
          return (
            <Reveal key={service.slug} delay={index * 0.08} className={cn('border-edge', CORE_RULES[index])}>
              <article className="spotlight group relative flex h-full flex-col px-5 py-10 sm:px-8 lg:px-10 lg:py-12 xl:px-7">
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

                {Figure && <Figure className="mx-auto my-5 h-44 w-full max-w-[20rem] text-fg sm:h-56 lg:my-8 xl:h-48" />}

                <h3 className="display text-2xl text-fg sm:text-[1.75rem] xl:text-2xl">
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

      {/* Supporting services, in one line. The detail is in the section further down. */}
      <Reveal
        className={cn(
          CELL_X,
          'flex flex-col gap-4 border-t border-edge py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10'
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="label shrink-0 text-fg-3">Also</p>
          {support.map((service) => (
            <span key={service.slug} className="chip">
              {service.title}
            </span>
          ))}
          <p className="text-sm text-fg-2">The systems around the automation, built by the same team.</p>
        </div>
        <Link
          href="/#build"
          className="inline-flex shrink-0 items-center gap-2 py-1 text-sm text-accent underline-offset-4 hover:underline"
        >
          CRM, web, and apps
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
