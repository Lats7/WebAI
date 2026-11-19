import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ICONS } from '@/components/shared/icons';
import { AgentExplorer } from '@/components/sections/AgentExplorer';
import { AGENT_PRINCIPLES, AUTOMATIONS } from '@/lib/constants';

export function Agents() {
  return (
    <Section id="agents" band>
      <SectionHeader
        code="02"
        eyebrow="Agents and automation"
        title={
          <>
            Agents that finish the job, <span className="accent-word">with a person on the switch.</span>
          </>
        }
        description="An agent is software that can plan, call your systems, and complete a task from start to end. We build them to be useful on day one and still safe on day 300. Pick a pattern to see how one is put together."
      />

      <Reveal>
        <AgentExplorer />
      </Reveal>

      {/* Engineering principles */}
      <div className="mt-20 lg:mt-24">
        <Reveal>
          <h3 className="display text-2xl text-fg sm:text-3xl">How we engineer agents</h3>
          <p className="mt-3 max-w-2xl text-fg-2">
            The same four rules apply to every agent we ship, whatever it does.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_PRINCIPLES.map((principle, index) => {
            const Icon = ICONS[principle.icon];
            return (
              <Reveal key={principle.title} delay={index * 0.07} className="h-full">
                <div className="card h-full p-6">
                  <div className="flex items-center justify-between">
                    <Icon size={22} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                    <span className="mc-only label text-fg-3">R.0{index + 1}</span>
                  </div>
                  <h4 className="display mt-5 text-lg text-fg">{principle.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{principle.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Automation */}
      <div id="automation" className="mt-20 scroll-mt-28 lg:mt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="label text-accent">
              <span className="mc-only">{'// '}</span>Automation
            </p>
            <h3 className="display mt-4 text-3xl text-fg sm:text-4xl">
              Not every job <span className="accent-word">needs an agent.</span>
            </h3>
            <p className="mt-5 leading-relaxed text-fg-2">
              A lot of work is better served by plain automation. It costs less to run, it is easier
              to test, and it does the same thing every time. We reach for an agent only where the
              task needs judgement.
            </p>
            <p className="mt-4 leading-relaxed text-fg-2">
              Either way, you get it documented, monitored, and built on tools you can keep running
              without us.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {AUTOMATIONS.map((automation, index) => {
              const Icon = ICONS[automation.icon];
              return (
                <Reveal key={automation.title} delay={index * 0.07} className="h-full">
                  <div className="card card-hover flex h-full gap-4 p-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="display text-lg text-fg">{automation.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{automation.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
