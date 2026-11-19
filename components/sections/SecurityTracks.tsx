'use client';

import { useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ICONS } from '@/components/shared/icons';
import {
  SAMPLE_AI_RISKS,
  SAMPLE_ATTACK_COVERAGE,
  SAMPLE_ESSENTIAL_EIGHT,
  SECURITY_TRACKS,
  type SecurityTrack,
} from '@/lib/constants';
import { cn } from '@/lib/utils';

const COVERAGE_LABEL = ['None', 'Low', 'Partial', 'Strong'];

function SampleFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="card h-full">
      <figcaption className="flex items-center justify-between gap-3 border-b border-edge px-5 py-3.5">
        <span className="label text-fg-2">{title}</span>
        <span className="chip chip-k shrink-0" data-kind="trigger">
          Sample
        </span>
      </figcaption>
      <div className="p-5">{children}</div>
      <p className="border-t border-edge px-5 py-3 text-xs text-fg-3">
        Illustrative only. Your report is built from your own environment.
      </p>
    </figure>
  );
}

/** Technical: detection coverage across MITRE ATT&CK tactics. */
function AttackCoverage() {
  return (
    <SampleFrame title="Detection coverage by ATT&CK tactic">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SAMPLE_ATTACK_COVERAGE.map((item) => (
          <li
            key={item.tactic}
            className="flex min-h-[4.5rem] flex-col justify-between border border-edge p-2.5 mc:rounded-[2px] ws:rounded-xl"
            style={{ backgroundColor: `rgb(var(--accent) / ${0.03 + item.level * 0.055})` }}
          >
            <span className="text-xs font-medium leading-tight text-fg">{item.tactic}</span>
            <span className="mt-2 flex items-center justify-between gap-2">
              <span className="flex gap-[3px]" aria-hidden="true">
                {[1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className={cn('h-1.5 w-3.5 mc:rounded-none ws:rounded-full', bar <= item.level ? 'bg-accent' : 'bg-line/20')}
                  />
                ))}
              </span>
              <span className="label !text-[0.625rem] text-fg-3">{COVERAGE_LABEL[item.level]}</span>
            </span>
          </li>
        ))}
      </ul>
    </SampleFrame>
  );
}

/** Governance: Essential Eight maturity, current against target. */
function EssentialEight() {
  return (
    <SampleFrame title="Essential Eight maturity snapshot">
      <ul className="space-y-3">
        {SAMPLE_ESSENTIAL_EIGHT.map((item) => {
          const met = item.current >= item.target;
          return (
            <li key={item.control} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5">
              <span className="truncate text-sm text-fg">{item.control}</span>
              <span className={cn('label tabular-nums', met ? 'text-ok' : 'text-warn')}>
                ML{item.current}
                <span className="text-fg-3"> / ML{item.target}</span>
              </span>
              <span className="col-span-2 flex gap-1" aria-hidden="true">
                {[1, 2, 3].map((level) => (
                  <span
                    key={level}
                    className={cn(
                      'h-1.5 flex-1 mc:rounded-none ws:rounded-full',
                      level <= item.current
                        ? met
                          ? 'bg-ok'
                          : 'bg-accent'
                        : level <= item.target
                          ? 'bg-warn/40'
                          : 'bg-line/15'
                    )}
                  />
                ))}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-fg-3">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 bg-accent" aria-hidden="true" /> Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 bg-warn/40" aria-hidden="true" /> Gap to target
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 bg-ok" aria-hidden="true" /> Target met
        </span>
      </p>
    </SampleFrame>
  );
}

/** AI security: a short risk register. */
function AiRiskRegister() {
  return (
    <SampleFrame title="AI risk register">
      <ul className="divide-y divide-edge">
        {SAMPLE_AI_RISKS.map((item) => (
          <li key={item.risk} className="py-3.5 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium leading-snug text-fg">{item.risk}</span>
              <span
                className={cn(
                  'chip shrink-0',
                  item.rating === 'High'
                    ? 'border-alert/30 bg-alert/10 text-alert'
                    : 'border-warn/30 bg-warn/10 text-warn'
                )}
              >
                {item.rating}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-2">
              <span className="label !text-[0.625rem] text-fg-3">Control </span>
              {item.control}
            </p>
          </li>
        ))}
      </ul>
    </SampleFrame>
  );
}

const SAMPLES: Record<SecurityTrack['id'], () => React.JSX.Element> = {
  technical: AttackCoverage,
  governance: EssentialEight,
  ai: AiRiskRegister,
};

export function SecurityTracks() {
  const [activeId, setActiveId] = useState<SecurityTrack['id']>('technical');
  const activeIndex = SECURITY_TRACKS.findIndex((track) => track.id === activeId);
  const track = SECURITY_TRACKS[activeIndex];
  const Sample = SAMPLES[track.id];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const count = SECURITY_TRACKS.length;
    const next = SECURITY_TRACKS[(activeIndex + (event.key === 'ArrowRight' ? 1 : -1) + count) % count];
    setActiveId(next.id);
    document.getElementById(`security-tab-${next.id}`)?.focus();
  }

  return (
    <div>
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 mc:border-b mc:border-edge ws:py-1">
        <div
          role="tablist"
          aria-label="Security disciplines"
          onKeyDown={onKeyDown}
          className="flex w-max mc:-mb-px ws:gap-1 ws:rounded-full ws:border ws:border-edge ws:bg-panel ws:p-1 ws:shadow-card"
        >
          {SECURITY_TRACKS.map((item) => {
            const selected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`security-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="security-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  'relative shrink-0 px-4 py-3 transition-colors duration-200 sm:px-5',
                  'mc:border-b-2 mc:font-mono mc:text-xs mc:font-medium mc:uppercase mc:tracking-[0.14em]',
                  'ws:rounded-full ws:py-2 ws:text-sm ws:font-semibold',
                  selected
                    ? 'mc:border-accent mc:text-accent ws:bg-fg ws:text-bg'
                    : 'text-fg-3 hover:text-fg mc:border-transparent'
                )}
              >
                <span className="mc-only mr-2 text-fg-3">{item.code}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id="security-panel"
        aria-labelledby={`security-tab-${track.id}`}
        tabIndex={0}
        className="mt-8 lg:mt-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-7">
              <h3 className="display text-2xl text-fg sm:text-3xl">{track.heading}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-fg-2">{track.intro}</p>

              <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {track.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <li key={item.title} className="flex gap-3.5">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                        {Icon && <Icon size={17} strokeWidth={1.75} aria-hidden="true" />}
                      </span>
                      <div>
                        <h4 className="font-semibold leading-snug text-fg">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-fg-2">{item.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <Sample />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
