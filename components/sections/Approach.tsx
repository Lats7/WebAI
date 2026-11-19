import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ICONS } from '@/components/shared/icons';
import { COMPANY, DIFFERENTIATORS, PROCESS_STEPS, STATS } from '@/lib/constants';

export function Approach() {
  return (
    <Section id="approach">
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

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step, index) => (
          <li key={step.number} className="h-full">
            <Reveal delay={index * 0.08} className="h-full">
              <div className="card relative flex h-full flex-col p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center border border-accent/50 font-mono text-sm font-medium text-accent mc:rounded-[2px] ws:rounded-full ws:border-transparent ws:bg-accent ws:font-body ws:font-semibold ws:text-on-accent">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-edge-strong" aria-hidden="true" />
                  <span className="mc-only label text-fg-3" aria-hidden="true">
                    T+{index}
                  </span>
                </div>
                <h3 className="display mt-6 text-xl text-fg">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-2">{step.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {step.outputs.map((output) => (
                    <li key={output} className="chip">
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Why us */}
      <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          <p className="label text-accent">
            <span className="mc-only">{'// '}</span>Why {COMPANY.fullName}
          </p>
          <h3 className="display mt-4 text-3xl !leading-[1.12] text-fg sm:text-[2.5rem]">
            Most AI builders add security later. Most security consultants do not ship software.{' '}
            <span className="accent-word">We do both.</span>
          </h3>
          <p className="mt-6 max-w-xl leading-relaxed text-fg-2">
            {COMPANY.fullName} is a Melbourne consultancy led by a cyber security engineer. The same
            person who designs your agents also threat-models them, which is why the things we build
            pass security review instead of stalling in it.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-4 mc:rounded-[2px] ws:rounded-2xl">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse bg-bg p-5 ws:bg-panel">
                <dt className="label mt-2 text-fg-3 mc:!text-[0.625rem]">{stat.label}</dt>
                <dd className="display text-3xl tabular-nums text-fg sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="grid gap-4 lg:col-span-6">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title}>
                <Reveal delay={index * 0.07}>
                  <div className="card card-hover flex gap-5 p-6">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                      <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="display text-lg text-fg">{item.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
