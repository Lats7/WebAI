import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SecurityTracks } from '@/components/sections/SecurityTracks';
import { FRAMEWORKS, READINESS_REVIEW } from '@/lib/constants';

export function Security() {
  return (
    <Section id="security">
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

      <Reveal>
        <SecurityTracks />
      </Reveal>

      {/* Frameworks */}
      <Reveal className="mt-14 flex flex-col gap-4 border-t border-edge pt-8 lg:flex-row lg:items-center lg:gap-8">
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
      <Reveal className="mt-14 lg:mt-20">
        <div className="card mc:border-accent/40 mc:shadow-[0_0_80px_-30px_rgb(var(--accent)/0.5)] ws:border-transparent ws:bg-fg ws:text-bg">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-5">
              <p className="label text-accent ws:text-bg/70">
                <span className="mc-only">{'// '}</span>Flagship engagement
              </p>
              <h3 className="display mt-4 text-3xl sm:text-4xl">{READINESS_REVIEW.title}</h3>
              <p className="mt-5 leading-relaxed text-fg-2 ws:text-bg/75">{READINESS_REVIEW.description}</p>
              <a
                href="#contact"
                className="btn btn-primary btn-lg mt-8 ws:!bg-bg ws:!text-fg ws:hover:!bg-accent ws:hover:!text-on-accent"
              >
                Book a readiness review
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <ol className="grid gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2 lg:col-span-7 mc:rounded-[2px] ws:rounded-2xl ws:border-bg/15 ws:bg-bg/15">
              {READINESS_REVIEW.steps.map((step, index) => (
                <li key={step.title} className="bg-panel p-6 ws:bg-fg">
                  <span className="label text-accent ws:text-bg/60">
                    <span className="mc-only">STEP </span>0{index + 1}
                  </span>
                  <h4 className="display mt-3 text-lg">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2 ws:text-bg/70">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
