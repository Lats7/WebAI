'use client';

import { useEffect, useState } from 'react';
import { Check, Pause, Play } from 'lucide-react';
import { AGENT_RUNS, STEP_KIND_LABEL } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const STEP_MS = 1000;
const HOLD_MS = 4200;
const FINISHED_MS = 4500;

/**
 * Simulated agent run. Steps stream in one at a time, and the run stops at the
 * approval step until the visitor approves it or the timer does.
 * Mission Control renders it as a terminal trace. Workspace renders a task list.
 */
export function AgentConsole() {
  const reduceMotion = usePrefersReducedMotion();
  const [runIndex, setRunIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [paused, setPaused] = useState(false);

  const run = AGENT_RUNS[runIndex];
  const total = run.steps.length;
  const visible = reduceMotion ? total : shown;
  const current = visible > 0 ? run.steps[visible - 1] : undefined;
  const waitingForApproval = !reduceMotion && current?.kind === 'hold';
  const finished = visible >= total;

  useEffect(() => {
    if (reduceMotion || paused) return;

    const delay = shown === 0 ? 600 : finished ? FINISHED_MS : waitingForApproval ? HOLD_MS : STEP_MS;
    const id = window.setTimeout(() => {
      if (finished) {
        setRunIndex((index) => (index + 1) % AGENT_RUNS.length);
        setShown(0);
      } else {
        setShown((count) => count + 1);
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [shown, finished, waitingForApproval, paused, reduceMotion]);

  function selectRun(index: number) {
    setRunIndex(index);
    setShown(0);
  }

  const status = finished
    ? 'Run complete. Audit log written.'
    : waitingForApproval
      ? 'Waiting for a person to approve.'
      : visible === 0
        ? 'Waiting for a trigger.'
        : 'Agent is working.';

  return (
    <div className="console card shadow-pop">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-edge px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="ws-only flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-alert/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
          </span>
          <p className="label truncate text-fg-2">
            <span className="mc-only">
              Agent run <span className="text-fg-3">{'//'}</span>{' '}
              <span className="text-accent">{run.id}</span>
            </span>
            <span className="ws-only text-fg">Agent run</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="chip chip-k" data-kind="trigger">
            Simulated
          </span>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? 'Play the demo' : 'Pause the demo'}
              className="grid h-7 w-7 place-items-center rounded-ctl border border-edge-strong text-fg-2 transition-colors hover:border-accent hover:text-accent"
            >
              {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      {/* Run picker */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-edge px-2 py-2 ws:gap-1.5 ws:px-3">
        {AGENT_RUNS.map((item, index) => {
          const selected = index === runIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectRun(index)}
              aria-pressed={selected}
              className={cn(
                'label shrink-0 px-2.5 py-1.5 transition-colors',
                'mc:border-b mc:text-[0.625rem] ws:rounded-full ws:px-3',
                selected
                  ? 'text-fg mc:border-accent mc:text-accent ws:bg-raised'
                  : 'text-fg-3 hover:text-fg mc:border-transparent'
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Steps */}
      <ol className="console-steps min-h-[19.5rem] content-start sm:min-h-[17.5rem] ws:min-h-[24.5rem] sm:ws:min-h-[21.5rem]">
        {run.steps.map((step, index) => {
          const state = index >= visible ? 'pending' : index === visible - 1 && !reduceMotion ? 'active' : 'done';
          return (
            <li
              key={`${run.id}-${index}`}
              className="step"
              data-kind={step.kind}
              data-state={state}
              aria-hidden={state === 'pending'}
            >
              <span className="step-time tabular-nums">{step.t}</span>
              <span className="step-kind">{STEP_KIND_LABEL[step.kind]}</span>
              <span className="step-text">{step.text}</span>
              <span className="step-check" aria-hidden="true">
                <Check size={11} strokeWidth={3} />
              </span>
            </li>
          );
        })}
      </ol>

      {/* Status line */}
      <div className="border-t border-edge">
        <div className="h-px bg-edge" aria-hidden="true">
          <div
            className="h-px bg-accent transition-[width] duration-700 ease-out"
            style={{ width: `${(visible / total) * 100}%` }}
          />
        </div>
        <div className="flex min-h-[3.25rem] items-center justify-between gap-3 px-4 py-2.5">
          <p className="label flex items-center gap-2 text-fg-2">
            <span
              className={cn(
                'h-1.5 w-1.5 shrink-0 rounded-full',
                finished ? 'bg-ok' : waitingForApproval ? 'bg-warn' : 'bg-accent'
              )}
              aria-hidden="true"
            />
            {status}
          </p>
          {waitingForApproval ? (
            <button
              type="button"
              onClick={() => setShown((count) => Math.min(count + 1, total))}
              className="btn btn-primary btn-sm !py-1.5"
            >
              Approve
            </button>
          ) : (
            <span className="label tabular-nums text-fg-3" aria-hidden="true">
              {String(visible).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
