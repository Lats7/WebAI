'use client';

import { useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, GitBranch, ShieldCheck, UserCheck, Wrench, Zap, type LucideIcon } from 'lucide-react';
import { AGENT_BLUEPRINTS, type AgentBlueprint } from '@/lib/constants';
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

/** Pick an agent pattern on the left, read how it is put together on the right. */
export function AgentExplorer() {
  const [selectedId, setSelectedId] = useState(AGENT_BLUEPRINTS[0].id);
  const selectedIndex = AGENT_BLUEPRINTS.findIndex((blueprint) => blueprint.id === selectedId);
  const blueprint = AGENT_BLUEPRINTS[selectedIndex];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const back = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
    if (!forward && !back) return;
    event.preventDefault();
    const count = AGENT_BLUEPRINTS.length;
    const next = AGENT_BLUEPRINTS[(selectedIndex + (forward ? 1 : -1) + count) % count];
    setSelectedId(next.id);
    document.getElementById(`blueprint-tab-${next.id}`)?.focus();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Pattern list */}
      <div
        role="tablist"
        aria-label="Agent patterns"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:sticky lg:top-28 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-2.5 lg:self-start lg:overflow-visible lg:px-0 lg:pb-0"
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
              onClick={() => setSelectedId(item.id)}
              className={cn(
                'group relative w-60 shrink-0 border p-4 text-left transition-all duration-300 lg:w-auto lg:p-5',
                'mc:rounded-[3px] ws:rounded-2xl',
                selected
                  ? 'border-accent/60 bg-accent/[0.07] ws:border-edge ws:bg-panel ws:shadow-card'
                  : 'border-edge bg-panel/40 hover:border-edge-strong ws:border-transparent ws:bg-transparent ws:hover:bg-panel/70'
              )}
            >
              {selected && (
                <span
                  className="absolute inset-y-3 left-0 w-0.5 bg-accent mc:shadow-[0_0_10px_rgb(var(--accent))] ws:inset-y-4 ws:left-2 ws:w-1 ws:rounded-full"
                  aria-hidden="true"
                />
              )}
              <span className="flex items-center justify-between gap-3 ws:pl-3">
                <span className="label text-fg-3">
                  <span className="mc-only">BP.0{index + 1} {'//'} </span>
                  {item.domain}
                </span>
              </span>
              <span
                className={cn(
                  'display mt-2 block text-lg transition-colors ws:pl-3',
                  selected ? 'text-fg' : 'text-fg-2 group-hover:text-fg'
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Blueprint */}
      <div
        role="tabpanel"
        id="blueprint-panel"
        aria-labelledby={`blueprint-tab-${blueprint.id}`}
        tabIndex={0}
        className="card lg:col-span-8"
      >
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
              {stagesFor(blueprint).map((stage, index, stages) => (
                <li key={stage.kind} data-kind={stage.kind} className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5">
                  {/* Connector */}
                  {index < stages.length - 1 && (
                    <span className="absolute bottom-0 left-[1.0625rem] top-9 w-px bg-edge-strong" aria-hidden="true">
                      <span
                        className="absolute -left-[2px] h-[5px] w-[5px] animate-travel rounded-full bg-k"
                        style={{ animationDelay: `${index * 0.5}s`, animationDuration: '3s' }}
                      />
                    </span>
                  )}
                  <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center border border-k/40 bg-panel text-k mc:rounded-[2px] ws:rounded-full ws:border-transparent ws:bg-k/10">
                    <stage.Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="label text-k">{stage.label}</p>
                    {stage.text && <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg">{stage.text}</p>}
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
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
