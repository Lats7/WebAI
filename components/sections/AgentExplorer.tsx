'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, GitBranch, ShieldCheck, UserCheck, Wrench, Zap, type LucideIcon } from 'lucide-react';
import { AGENT_BLUEPRINTS, type AgentBlueprint } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface Stage {
  kind: string;
  label: string;
  Icon: LucideIcon;
  text?: string;
  items?: string[];
}

function stagesFor(blueprint: AgentBlueprint): Stage[] {
  return [
    { kind: 'trigger', label: 'Trigger', Icon: Zap, text: blueprint.trigger },
    { kind: 'plan', label: 'Plan', Icon: GitBranch, text: blueprint.plan },
    { kind: 'tool', label: 'Tools', Icon: Wrench, items: blueprint.tools },
    { kind: 'guard', label: 'Guardrails', Icon: ShieldCheck, items: blueprint.guardrails },
    { kind: 'hold', label: 'Human approval', Icon: UserCheck, text: blueprint.human },
    { kind: 'outcome', label: 'Outcome', Icon: CircleCheck, text: blueprint.outcome },
  ];
}

const STAGE_MS = 1500;

/**
 * Pick an agent pattern on the left, read how it is put together on the right.
 * A highlight walks down the stages to show the order a run moves through them.
 */
export function AgentExplorer() {
  const reduceMotion = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState(AGENT_BLUEPRINTS[0].id);
  const [activeStage, setActiveStage] = useState(0);
  const [hovering, setHovering] = useState(false);

  const selectedIndex = AGENT_BLUEPRINTS.findIndex((blueprint) => blueprint.id === selectedId);
  const blueprint = AGENT_BLUEPRINTS[selectedIndex];
  const stages = stagesFor(blueprint);

  useEffect(() => {
    if (reduceMotion || hovering) return;
    const id = window.setInterval(() => setActiveStage((stage) => (stage + 1) % stages.length), STAGE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, hovering, stages.length]);

  function select(id: string) {
    setSelectedId(id);
    setActiveStage(0);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const back = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
    if (!forward && !back) return;
    event.preventDefault();
    const count = AGENT_BLUEPRINTS.length;
    const next = AGENT_BLUEPRINTS[(selectedIndex + (forward ? 1 : -1) + count) % count];
    select(next.id);
    document.getElementById(`blueprint-tab-${next.id}`)?.focus();
  }

  return (
    <div className="grid border-t border-edge lg:grid-cols-12">
      {/* Pattern list */}
      <div className="min-w-0 border-edge lg:col-span-4 lg:border-r">
        <div
          role="tablist"
          aria-label="Agent patterns"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4 sm:px-8 lg:sticky lg:top-24 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:py-6"
        >
          {AGENT_BLUEPRINTS.map((item, index) => {
            const selected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`blueprint-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="blueprint-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(item.id)}
                className={cn(
                  'group relative shrink-0 text-left transition-colors duration-300',
                  'border px-4 py-3 mc:rounded-[3px] ws:rounded-xl',
                  'lg:rounded-none lg:border-0 lg:px-14 lg:py-4 lg:mc:rounded-none lg:ws:rounded-none',
                  selected
                    ? 'border-accent/50 bg-accent/[0.07] lg:bg-transparent'
                    : 'border-edge hover:border-edge-strong'
                )}
              >
                {/* Active marker sits on the rail */}
                <span
                  className={cn(
                    'absolute -left-px bottom-3 top-3 hidden w-0.5 bg-accent transition-opacity duration-300 lg:block mc:shadow-[0_0_12px_rgb(var(--accent))]',
                    selected ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden="true"
                />
                <span className="label block whitespace-nowrap text-fg-3">
                  <span className="mc-only text-signal">0{index + 1} </span>
                  {item.domain}
                </span>
                <span
                  className={cn(
                    'display mt-1.5 block whitespace-nowrap text-lg transition-colors duration-300 lg:whitespace-normal lg:text-[1.35rem]',
                    selected ? 'text-fg' : 'text-fg-3 group-hover:text-fg-2'
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blueprint */}
      <div
        role="tabpanel"
        id="blueprint-panel"
        aria-labelledby={`blueprint-tab-${blueprint.id}`}
        tabIndex={0}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="dot-grid min-w-0 border-t border-edge p-3 sm:p-6 lg:col-span-8 lg:border-t-0 lg:p-10"
      >
        <div className="card bracketed shadow-pop">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={blueprint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-edge p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{blueprint.domain}</span>
                  <span className="chip chip-k" data-kind="guard">
                    Autonomy: {blueprint.autonomy}
                  </span>
                </div>
                <h3 className="display mt-4 text-2xl text-fg sm:text-3xl">{blueprint.name}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">{blueprint.summary}</p>
              </div>

              <ol className="relative p-6 sm:p-8">
                {stages.map((stage, index) => {
                  const active = !reduceMotion && index === activeStage;
                  return (
                    <li
                      key={stage.kind}
                      data-kind={stage.kind}
                      className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5"
                    >
                      {index < stages.length - 1 && (
                        <span
                          className="absolute bottom-0 left-[1.0625rem] top-9 w-px bg-edge-strong"
                          aria-hidden="true"
                        >
                          <span
                            className={cn(
                              'absolute inset-x-0 top-0 bg-k transition-[height] ease-linear',
                              active ? 'h-full' : 'h-0'
                            )}
                            style={{ transitionDuration: active ? `${STAGE_MS}ms` : '0ms' }}
                          />
                        </span>
                      )}
                      <span
                        className={cn(
                          'relative z-10 grid h-9 w-9 shrink-0 place-items-center border transition-all duration-500',
                          'mc:rounded-[3px] ws:rounded-full',
                          active
                            ? 'border-k bg-k text-bg mc:shadow-[0_0_22px_-2px_rgb(var(--k)/0.8)] ws:text-white'
                            : 'border-k/40 bg-panel text-k ws:border-transparent ws:bg-k/10'
                        )}
                      >
                        <stage.Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="label text-k">
                          <span className="mc-only text-fg-3">0{index + 1} </span>
                          {stage.label}
                        </p>
                        {stage.text && (
                          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg">{stage.text}</p>
                        )}
                        {stage.items && (
                          <ul className="mt-2.5 flex flex-wrap gap-2">
                            {stage.items.map((item) => (
                              <li key={item} className="chip chip-k">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
