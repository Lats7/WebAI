import { ArrowRight, Bot, Check } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { CRM_FEATURES, CRM_PIPELINE, WEB_FEATURES } from '@/lib/constants';

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 grid gap-x-6 gap-y-3 border-t border-edge pt-7 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-fg-2">
          <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Small pipeline board. Illustrative, not a screenshot of a real CRM. */
function PipelineMock() {
  return (
    <div
      className="grid grid-cols-2 gap-x-2 gap-y-3 border border-edge bg-raised/40 p-3 sm:grid-cols-4 mc:rounded-[2px] ws:rounded-2xl ws:bg-raised/60"
      aria-hidden="true"
    >
      {CRM_PIPELINE.map((column, columnIndex) => (
        <div key={column.stage} className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-1 px-0.5">
            <span className="label truncate !text-[0.625rem] text-fg-2">{column.stage}</span>
            <span className="label !text-[0.625rem] tabular-nums text-fg-3">{column.deals.length}</span>
          </div>
          <div className="space-y-2">
            {column.deals.map((deal, dealIndex) => {
              const agentDrafted = columnIndex === 1 && dealIndex === 0;
              return (
                <div
                  key={deal}
                  className={
                    agentDrafted
                      ? 'border border-accent/50 bg-accent/10 p-2 mc:rounded-[2px] ws:rounded-lg'
                      : 'border border-edge bg-panel p-2 mc:rounded-[2px] ws:rounded-lg ws:shadow-card'
                  }
                >
                  <p className="truncate text-[0.6875rem] font-medium leading-tight text-fg">{deal}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="h-1 w-8 rounded-full bg-line/20" />
                    {agentDrafted ? (
                      <Bot size={11} className="text-accent" />
                    ) : (
                      <span className="h-3 w-3 rounded-full bg-line/20" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** One page drawn in both site styles, plus a phone. Colours are fixed on purpose. */
function DesignMock() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="overflow-hidden border border-edge-strong mc:rounded-[2px] ws:rounded-2xl ws:shadow-card">
        <div className="flex items-center gap-1.5 border-b border-edge bg-raised/70 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line/30" />
          <span className="h-2 w-2 rounded-full bg-line/30" />
          <span className="h-2 w-2 rounded-full bg-line/30" />
          <span className="ml-2 h-3 flex-1 rounded-full bg-line/10" />
        </div>
        <div className="grid h-40 grid-cols-2 sm:h-44">
          {/* Mission Control half */}
          <div className="relative bg-[#05080d] p-4">
            <div className="h-1.5 w-10 bg-[#40c4ff]" />
            <div className="mt-3 h-2.5 w-24 bg-[#e9eff9]" />
            <div className="mt-1.5 h-2.5 w-16 bg-[#40c4ff]" />
            <div className="mt-3 h-1 w-28 bg-[#8ca5d2]/40" />
            <div className="mt-1 h-1 w-20 bg-[#8ca5d2]/40" />
            <div className="mt-4 flex gap-1.5">
              <div className="h-4 w-12 bg-[#40c4ff]" />
              <div className="h-4 w-12 border border-[#8ca5d2]/40" />
            </div>
            <div className="absolute bottom-3 right-3 h-9 w-14 border border-[#40c4ff]/50" />
          </div>
          {/* Workspace half */}
          <div className="relative bg-[#f6f5f1] p-4">
            <div className="h-3 w-12 rounded-full bg-white shadow-sm" />
            <div className="mt-3 h-2.5 w-24 rounded-sm bg-[#16181d]" />
            <div className="mt-1.5 h-2.5 w-16 rounded-sm bg-[#2f54e0]" />
            <div className="mt-3 h-1 w-28 rounded-full bg-[#16181d]/25" />
            <div className="mt-1 h-1 w-20 rounded-full bg-[#16181d]/25" />
            <div className="mt-4 flex gap-1.5">
              <div className="h-4 w-12 rounded-full bg-[#16181d]" />
              <div className="h-4 w-12 rounded-full border border-[#16181d]/20 bg-white" />
            </div>
            <div className="absolute bottom-3 right-3 h-9 w-14 rounded-lg bg-white shadow-md" />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute -bottom-5 right-5 hidden w-[4.5rem] border border-edge-strong bg-panel p-1.5 shadow-pop mc:rounded-[4px] ws:rounded-[1.1rem] sm:block">
        <div className="mx-auto mb-1.5 h-1 w-5 rounded-full bg-line/30" />
        <div className="space-y-1.5 bg-raised/70 p-1.5 mc:rounded-[2px] ws:rounded-[0.7rem]">
          <div className="h-1.5 w-8 rounded-sm bg-accent" />
          <div className="h-1 w-10 rounded-sm bg-line/30" />
          <div className="h-1 w-7 rounded-sm bg-line/30" />
          <div className="h-7 rounded-sm bg-line/10" />
          <div className="h-3 rounded-sm bg-accent/80" />
        </div>
      </div>
    </div>
  );
}

export function Build() {
  return (
    <Section id="build" band>
      <SectionHeader
        code="04"
        eyebrow="CRM, web, and apps"
        title={
          <>
            The systems <span className="accent-word">around the automation.</span>
          </>
        }
        description="Agents and workflows need somewhere to live. We set up and tune the CRM, websites, and apps they plug into, so the whole thing works as one system."
      />

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <Reveal className="h-full">
          <article className="card flex h-full flex-col p-7 sm:p-9">
            <PipelineMock />
            <p className="label mt-8 text-accent">
              <span className="mc-only">{'// '}</span>CRM
            </p>
            <h3 className="display mt-3 text-2xl text-fg sm:text-3xl">A CRM your team wants to use</h3>
            <p className="mt-3 leading-relaxed text-fg-2">
              Most CRM problems are data and process problems. We fix those first, then automate the
              follow-up work so the pipeline stays current without anyone chasing it. Our Salesforce
              work runs from day-to-day administration to full migrations, and we work with other
              major platforms too.
            </p>
            <FeatureList items={CRM_FEATURES} />

            <div className="mt-auto pt-8">
              <div className="flex flex-col gap-4 border border-edge bg-raised/40 p-5 mc:rounded-[2px] ws:rounded-2xl">
                <p className="text-sm leading-relaxed text-fg-2">
                  <strong className="font-semibold text-fg">Pairs with the lead response agent.</strong> New
                  enquiries are qualified, answered, and logged without leaving the CRM.
                </p>
                <div>
                  <a href="#agents" className="btn btn-secondary btn-sm">
                    See the agent patterns
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <article className="card flex h-full flex-col p-7 sm:p-9">
            <DesignMock />
            <p className="label mt-8 text-accent">
              <span className="mc-only">{'// '}</span>Web and app design
            </p>
            <h3 className="display mt-3 text-2xl text-fg sm:text-3xl">Websites and apps, designed and shipped</h3>
            <p className="mt-3 leading-relaxed text-fg-2">
              From a marketing site to a full product, we handle the design and the build. Everything
              is fast, accessible, and reviewed for security before it goes live.
            </p>
            <FeatureList items={WEB_FEATURES} />

            <div className="mt-auto pt-8">
              <div className="flex flex-col gap-4 border border-edge bg-raised/40 p-5 mc:rounded-[2px] ws:rounded-2xl">
                <p className="text-sm leading-relaxed text-fg-2">
                  <strong className="font-semibold text-fg">This site is the demo.</strong> One build, two
                  complete design systems. Try the other one.
                </p>
                <div>
                  <ThemeSwitch size="full" />
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
