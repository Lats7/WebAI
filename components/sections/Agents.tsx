import { Fragment } from 'react';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow, SectionHeader } from '@/components/shared/SectionHeader';
import { ICONS } from '@/components/shared/icons';
import { AgentExplorer } from '@/components/sections/AgentExplorer';
import { AGENT_PRINCIPLES, AUTOMATIONS, AUTOMATION_PIPELINE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/** A row of stages joined by lines, with data moving along them. */
function Pipeline() {
  return (
    <div className="dot-grid border-t border-edge px-5 py-10 sm:px-8 lg:px-14 lg:py-14" aria-hidden="true">
      <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
        {AUTOMATION_PIPELINE.map((stage, index) => {
          const Icon = ICONS[stage.icon];
          const last = index === AUTOMATION_PIPELINE.length - 1;
          return (
            <Fragment key={stage.label}>
              <div
                className={cn(
                  'card flex shrink-0 items-center gap-3 px-4 py-3 lg:flex-col lg:items-start lg:gap-4 lg:px-5 lg:py-5',
                  last && 'bracketed mc:border-accent/50'
                )}
              >
                <span className="grid h-9 w-9 place-items-center border border-edge-strong text-accent mc:rounded-[3px] mc:bg-accent/10 ws:rounded-lg ws:border-transparent ws:bg-accent/10">
                  <Icon size={17} strokeWidth={1.7} />
                </span>
                <span>
                  <span className="label block text-fg-3">
                    <span className="mc-only text-signal">0{index + 1} </span>
                    {stage.label}
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-sm font-medium text-fg">{stage.detail}</span>
                </span>
              </div>

              {!last && (
                <span className="relative ml-[2.1rem] h-7 w-px bg-edge-strong lg:ml-0 lg:h-px lg:w-auto lg:flex-1">
                  <span
                    className="absolute -left-[2px] h-[5px] w-[5px] animate-travel rounded-full bg-accent lg:hidden"
                    style={{ animationDuration: '2.4s', animationDelay: `${index * 0.5}s` }}
                  />
                  <span
                    className="absolute -top-[2px] hidden h-[5px] w-[5px] animate-flow rounded-full bg-accent mc:shadow-[0_0_8px_rgb(var(--accent))] lg:block"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  />
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function Agents() {
  return (
    <Section id="agents" flush tint>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
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
      </div>

      <Reveal>
        <AgentExplorer />
      </Reveal>

      {/* Engineering rules */}
      <div className={cn(CELL_X, 'border-t border-edge py-14 lg:py-20')}>
        <Reveal>
          <h3 className="statement max-w-3xl text-[clamp(1.5rem,2.8vw,2.25rem)]">
            Four rules apply to every agent we ship. <span className="muted">Whatever it does, and whoever it works for.</span>
          </h3>
        </Reveal>
      </div>
      <ol className="grid border-t border-edge sm:grid-cols-2 lg:grid-cols-4">
        {AGENT_PRINCIPLES.map((principle, index) => {
          const Icon = ICONS[principle.icon];
          return (
            <li
              key={principle.title}
              className={cn(
                'border-edge',
                index > 0 && 'border-t sm:border-t-0',
                index % 2 === 1 && 'sm:border-l',
                index >= 2 && 'sm:border-t lg:border-t-0',
                index === 2 && 'lg:border-l'
              )}
            >
              <Reveal delay={index * 0.07} className="h-full">
                <div className="spotlight h-full px-5 py-9 sm:px-8 lg:px-9 lg:py-11">
                  <div className="flex items-center justify-between">
                    <Icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                    <span className="label tabular-nums text-signal ws:text-fg-3">
                      <span className="mc-only">R.</span>0{index + 1}
                    </span>
                  </div>
                  <h4 className="display mt-7 text-xl text-fg">{principle.title}</h4>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-2">{principle.description}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Automation */}
      <div id="automation" className={cn(CELL_X, 'scroll-mt-24 border-t border-edge py-16 lg:py-24')}>
        <Reveal>
          <Eyebrow>Automation</Eyebrow>
          <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h3 className="display text-[clamp(2rem,4.4vw,3.5rem)] text-fg lg:col-span-7">
              Not every job <span className="accent-word">needs an agent.</span>
            </h3>
            <p className="text-base leading-relaxed text-fg-2 sm:text-lg lg:col-span-5 lg:pb-1.5">
              A lot of work is better served by plain automation. It costs less to run, it is easier to
              test, and it does the same thing every time. We reach for an agent only where the task needs
              judgement.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <Pipeline />
      </Reveal>

      <ul className="grid border-t border-edge sm:grid-cols-2 lg:grid-cols-4">
        {AUTOMATIONS.map((automation, index) => {
          const Icon = ICONS[automation.icon];
          return (
            <li
              key={automation.title}
              className={cn(
                'border-edge',
                index > 0 && 'border-t sm:border-t-0',
                index % 2 === 1 && 'sm:border-l',
                index >= 2 && 'sm:border-t lg:border-t-0',
                index === 2 && 'lg:border-l'
              )}
            >
              <Reveal delay={index * 0.07} className="h-full">
                <div className="spotlight h-full px-5 py-9 sm:px-8 lg:px-9 lg:py-10">
                  <Icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  <h4 className="display mt-6 text-lg text-fg">{automation.title}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">{automation.description}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
