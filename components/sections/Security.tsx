import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SecurityTracks } from '@/components/sections/SecurityTracks';
import { FRAMEWORKS, READINESS_REVIEW } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Security() {
  return (
    <Section id="security" flush>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
        <SectionHeader
          code="03"
          eyebrow="Cyber security"
          title={
            <>
              Security you can prove, <span className="accent-word">not just claim.</span>
            </>
          }
          description="Hands-on engineering to harden and monitor your environment, and the governance to show customers, insurers, and auditors that it works."
        />
      </div>

      <Reveal>
        <SecurityTracks />
      </Reveal>

      {/* Frameworks */}
      <Reveal
        className={cn(
          CELL_X,
          'flex flex-col gap-4 border-t border-edge py-7 lg:flex-row lg:items-center lg:gap-10'
        )}
      >
        <p className="label shrink-0 text-fg-3">Frameworks we work to</p>
        <ul className="flex flex-wrap gap-2">
          {FRAMEWORKS.map((framework) => (
            <li key={framework} className="chip">
              {framework}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Flagship engagement */}
      <div className="border-t border-edge p-3 sm:p-6 lg:p-10">
        <Reveal>
          <div className="card bracketed mc:border-accent/40 mc:shadow-[0_0_90px_-30px_rgb(var(--accent)/0.55)] ws:rounded-stage ws:border-transparent ws:bg-fg ws:text-bg">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
              <div className="lg:col-span-5">
                <p className="label text-signal ws:text-bg/70">Flagship engagement</p>
                <h3 className="display mt-5 text-4xl sm:text-5xl">{READINESS_REVIEW.title}</h3>
                <p className="mt-6 leading-relaxed text-fg-2 ws:text-bg/75">{READINESS_REVIEW.description}</p>
                <a
                  href="#contact"
                  className="btn btn-primary btn-lg mt-9 ws:!bg-bg ws:!text-fg ws:hover:!bg-accent ws:hover:!text-on-accent"
                >
                  Book a readiness review
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              <ol className="grid gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2 lg:col-span-7 mc:rounded-[3px] ws:rounded-2xl ws:border-bg/15 ws:bg-bg/15">
                {READINESS_REVIEW.steps.map((step, index) => (
                  <li key={step.title} className="bg-panel p-6 lg:p-7 ws:bg-fg">
                    <span className="label tabular-nums text-signal ws:text-bg/60">
                      <span className="mc-only">Step </span>0{index + 1}
                    </span>
                    <h4 className="display mt-4 text-xl">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2 ws:text-bg/70">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
