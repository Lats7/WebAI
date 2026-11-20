import { Founder } from '@/components/shared/Founder';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow, SectionHeader } from '@/components/shared/SectionHeader';
import { ICONS } from '@/components/shared/icons';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { COMPANY, DIFFERENTIATORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Approach() {
  return (
    <Section id="approach" flush>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
        <SectionHeader
          code="05"
          eyebrow="Approach"
          title={
            <>
              How an engagement <span className="accent-word">runs.</span>
            </>
          }
          description="Four stages, each with something you can hold at the end of it. You always know what is being built, what it costs, and what comes next."
        />
      </div>

      <ProcessSteps />

      {/* Why us */}
      <div className="grid border-t border-edge lg:grid-cols-12">
        <Reveal className={cn(CELL_X, 'py-14 lg:col-span-7 lg:py-24')}>
          <Eyebrow>Why {COMPANY.fullName}</Eyebrow>
          <p className="statement mt-8 text-[clamp(1.6rem,3vw,2.5rem)]">
            The person who designs your agents also threat-models them.{' '}
            <span className="muted">
              {COMPANY.fullName} is a Melbourne consultancy led by a cyber security engineer, so controls are
              in the first diagram and not bolted on before launch.
            </span>
          </p>
        </Reveal>

        <ul className="border-t border-edge lg:col-span-5 lg:border-l lg:border-t-0">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className={cn('border-edge', index > 0 && 'border-t')}>
                <Reveal delay={index * 0.06}>
                  <div className="spotlight flex gap-5 px-5 py-7 sm:px-8 lg:px-10">
                    <Icon size={21} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <h4 className="display text-lg text-fg">{item.title}</h4>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-2">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <Founder />
    </Section>
  );
}
