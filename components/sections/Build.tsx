import { ArrowRight, Bot, Check } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow, SectionHeader } from '@/components/shared/SectionHeader';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { CRM_FEATURES, CRM_PIPELINE, WEB_FEATURES } from '@/lib/constants';
import { cn } from '@/lib/utils';

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-edge pt-8 sm:grid-cols-2">
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
    <div className="card shadow-pop" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-edge px-3.5 py-2.5">
        <span className="ws-only flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line/25" />
          <span className="h-2 w-2 rounded-full bg-line/25" />
          <span className="h-2 w-2 rounded-full bg-line/25" />
        </span>
        <span className="label !text-[0.625rem] text-fg-3 ws:!text-xs">
          <span className="mc-only">CRM {'//'} </span>Pipeline
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-3 p-3.5 sm:grid-cols-4">
        {CRM_PIPELINE.map((column, columnIndex) => (
          <div key={column.stage} className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-1 px-0.5">
              <span className="label truncate !text-[0.625rem] text-fg-2 ws:!text-[0.6875rem]">{column.stage}</span>
              <span className="label !text-[0.625rem] tabular-nums text-fg-3">{column.deals.length}</span>
            </div>
            <div className="space-y-2">
              {column.deals.map((deal, dealIndex) => {
                const agentDrafted = columnIndex === 1 && dealIndex === 0;
                return (
                  <div
                    key={deal}
                    className={cn(
                      'border p-2 mc:rounded-[2px] ws:rounded-lg',
                      agentDrafted ? 'border-accent/50 bg-accent/10' : 'border-edge bg-raised/50 ws:bg-bg'
                    )}
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
    </div>
  );
}

/** One page drawn in both site styles, plus a phone. Colours are fixed on purpose. */
function DesignMock() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="card overflow-hidden shadow-pop">
        <div className="flex items-center gap-1.5 border-b border-edge px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-line/25" />
          <span className="h-2 w-2 rounded-full bg-line/25" />
          <span className="h-2 w-2 rounded-full bg-line/25" />
          <span className="ml-2 h-3.5 flex-1 rounded-full bg-line/10" />
        </div>
        <div className="grid h-44 grid-cols-2 sm:h-48">
          {/* Mission Control half */}
          <div className="relative bg-[#06080c] p-4">
            <div className="h-1.5 w-10 bg-[#ffba52]" />
            <div className="mt-3 h-2.5 w-24 bg-[#edf0f7]" />
            <div className="mt-1.5 h-2.5 w-16 bg-[#58c9ff]" />
            <div className="mt-3 h-1 w-28 bg-[#96a6c6]/40" />
            <div className="mt-1 h-1 w-20 bg-[#96a6c6]/40" />
            <div className="mt-4 flex gap-1.5">
              <div className="h-4 w-12 bg-[#58c9ff]" />
              <div className="h-4 w-12 border border-[#96a6c6]/40" />
            </div>
            <div className="absolute bottom-3 right-3 h-9 w-14 border border-[#58c9ff]/50" />
          </div>
          {/* Workspace half */}
          <div className="relative bg-[#f7f6f2] p-4">
            <div className="h-3 w-12 rounded-full bg-white shadow-sm" />
            <div className="mt-3 h-2.5 w-24 rounded-sm bg-[#16171b]" />
            <div className="mt-1.5 h-2.5 w-16 rounded-sm bg-[#2f54e0]" />
            <div className="mt-3 h-1 w-28 rounded-full bg-[#16171b]/25" />
            <div className="mt-1 h-1 w-20 rounded-full bg-[#16171b]/25" />
            <div className="mt-4 flex gap-1.5">
              <div className="h-4 w-12 rounded-full bg-[#16171b]" />
              <div className="h-4 w-12 rounded-full border border-[#16171b]/20 bg-white" />
            </div>
            <div className="absolute bottom-3 right-3 h-9 w-14 rounded-lg bg-white shadow-md" />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute -bottom-5 right-6 hidden w-[4.75rem] border border-edge-strong bg-panel p-1.5 shadow-pop mc:rounded-[5px] ws:rounded-[1.15rem] sm:block">
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
    <Section id="build" flush tint>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
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
      </div>

      <div className="grid border-t border-edge lg:grid-cols-2">
        {/* CRM */}
        <Reveal className="min-w-0 border-edge lg:border-r">
          <article className="flex h-full flex-col">
            <div className="dot-grid flex flex-col justify-center border-b border-edge p-5 sm:p-8 lg:h-[23rem] lg:p-12">
              <PipelineMock />
            </div>
            <div className={cn(CELL_X, 'flex flex-1 flex-col py-10 lg:px-12 lg:py-12')}>
              <Eyebrow>CRM</Eyebrow>
              <h3 className="display mt-5 text-[1.75rem] text-fg sm:text-4xl">A CRM your team wants to use</h3>
              <p className="mt-4 leading-relaxed text-fg-2">
                Most CRM problems are data and process problems. We fix those first, then automate the
                follow-up work so the pipeline stays current without anyone chasing it. Our Salesforce work
                runs from day-to-day administration to full migrations, and we work with other major
                platforms too.
              </p>
              <FeatureList items={CRM_FEATURES} />
              <div className="mt-auto pt-9">
                <a href="#agents" className="btn btn-secondary btn-sm">
                  See the lead response agent
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Web and apps */}
        <Reveal delay={0.08} className="min-w-0 border-t border-edge lg:border-t-0">
          <article className="flex h-full flex-col">
            <div className="dot-grid flex flex-col justify-center border-b border-edge p-5 pb-9 sm:p-8 sm:pb-11 lg:h-[23rem] lg:p-12">
              <DesignMock />
            </div>
            <div className={cn(CELL_X, 'flex flex-1 flex-col py-10 lg:px-12 lg:py-12')}>
              <Eyebrow>Web and app design</Eyebrow>
              <h3 className="display mt-5 text-[1.75rem] text-fg sm:text-4xl">
                Websites and apps, designed and shipped
              </h3>
              <p className="mt-4 leading-relaxed text-fg-2">
                From a marketing site to a full product, we handle the design and the build. Everything is
                fast, accessible, and reviewed for security before it goes live.
              </p>
              <FeatureList items={WEB_FEATURES} />
              <div className="mt-auto flex flex-col gap-4 pt-9 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-fg-2">
                  <strong className="font-medium text-fg">This site is the demo.</strong> One build, two design
                  systems.
                </p>
                <div className="shrink-0">
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
