'use client';

import { useEffect, useState } from 'react';
import { Check, Pause, Play } from 'lucide-react';
import { AGENT_RUNS, STEP_KIND_LABEL } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const STEP_MS = 1000;
const HOLD_MS = 4200;
const FINISHED_MS = 4500;

type CheckState = 'pending' | 'waiting' | 'passed';

function CheckMark({ state }: { state: CheckState }) {
  if (state === 'passed') {
    return (
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ok/15 text-ok">
        <Check size={10} strokeWidth={3.5} aria-hidden="true" />
      </span>
    );
  }
  if (state === 'waiting') {
    return (
      <span className="relative grid h-4 w-4 shrink-0 place-items-center">
        <span className="absolute h-2 w-2 animate-ping rounded-full bg-warn" />
        <span className="h-2 w-2 rounded-full bg-warn" />
      </span>
    );
  }
  return <span className="h-4 w-4 shrink-0 rounded-full border border-edge-strong" />;
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-fg-3 mc:!text-[0.625rem] ws:text-xs">{label}</dt>
      <dd className="mt-1 font-mono text-lg tabular-nums leading-none text-fg">{value}</dd>
    </div>
  );
}

/**
 * Simulated agent operations console. Pick an agent on the left, watch its run
 * stream in the middle, and see the controls respond on the right. The run
 * stops at the approval step until the visitor approves it or the timer does.
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

  // Controls are derived from how far the run has got.
  const reached = (kind: string) => run.steps.findIndex((step) => step.kind === kind) < visible;
  const checks: CheckState[] = [
    reached('plan') ? 'passed' : 'pending',
    reached('guard') ? 'passed' : 'pending',
    reached('done') ? 'passed' : waitingForApproval ? 'waiting' : 'pending',
  ];
  const toolCalls = run.steps.slice(0, visible).filter((step) => step.kind === 'tool').length;
  const approval = reached('done') ? 'Approved' : waitingForApproval ? 'Requested' : 'Not needed yet';

  const status = finished
    ? 'Run complete. Audit log written.'
    : waitingForApproval
      ? 'Waiting for a person to approve.'
      : visible === 0
        ? 'Waiting for a trigger.'
        : 'Agent is working.';

  return (
    <div className="console card bracketed shadow-pop">
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
              Ops console <span className="text-fg-3">{'//'}</span> <span className="text-accent">{run.id}</span>
            </span>
            <span className="ws-only font-medium text-fg">Agent runs</span>
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

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15.5rem] xl:grid-cols-[13.5rem_minmax(0,1fr)_15.5rem]">
        {/* Agents */}
        <div className="min-w-0 border-b border-edge lg:col-span-2 xl:col-span-1 xl:border-b-0 xl:border-r">
          <p className="label hidden px-4 pb-2 pt-4 text-fg-3 mc:!text-[0.625rem] xl:block">Agents</p>
          <div className="no-scrollbar flex gap-1 overflow-x-auto p-2 xl:flex-col xl:gap-0.5 xl:overflow-visible xl:px-2 xl:pb-3 xl:pt-0">
            {AGENT_RUNS.map((item, index) => {
              const selected = index === runIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectRun(index)}
                  aria-pressed={selected}
                  className={cn(
                    'flex shrink-0 items-center gap-2.5 px-2.5 py-2 text-left transition-colors xl:w-full',
                    'mc:rounded-[2px] ws:rounded-lg',
                    selected ? 'bg-accent/10 text-fg ws:bg-raised' : 'text-fg-2 hover:bg-line/5 hover:text-fg'
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 shrink-0 rounded-full',
                      selected ? (finished ? 'bg-ok' : waitingForApproval ? 'bg-warn' : 'bg-accent') : 'bg-line/30'
                    )}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block whitespace-nowrap text-[0.8125rem] font-medium leading-tight">{item.title}</span>
                    <span className="hidden text-xs leading-tight text-fg-3 xl:block">{item.domain}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <dl className="hidden border-t border-edge px-4 py-4 xl:block">
            <dt className="label text-fg-3 mc:!text-[0.625rem] ws:text-xs">Autonomy</dt>
            <dd className="mt-1 text-[0.8125rem] font-medium text-fg">{run.autonomy}</dd>
          </dl>
        </div>

        {/* Run trace */}
        <ol className="console-steps min-w-0 min-h-[19rem] content-start sm:min-h-[17rem] lg:min-h-0 lg:py-2 ws:min-h-[23rem] sm:ws:min-h-[21rem] lg:ws:min-h-0">
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

        {/* Controls */}
        <div className="grid min-w-0 grid-cols-2 border-t border-edge lg:block lg:border-l lg:border-t-0">
          <div className="border-r border-edge p-4 lg:border-b lg:border-r-0">
            <p className="label text-fg-3 mc:!text-[0.625rem] ws:text-xs">Guardrails</p>
            <ul className="mt-3 space-y-2.5">
              {run.guardrails.map((guardrail, index) => (
                <li key={guardrail} className="flex items-start gap-2.5">
                  <span className="mt-px">
                    <CheckMark state={checks[index]} />
                  </span>
                  <span
                    className={cn(
                      'text-[0.8125rem] leading-snug transition-colors duration-500',
                      checks[index] === 'pending' ? 'text-fg-3' : 'text-fg'
                    )}
                  >
                    {guardrail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <p className="label text-fg-3 mc:!text-[0.625rem] ws:text-xs">Approval</p>
            <p className="mt-2 text-[0.8125rem] font-medium text-fg">{run.approver}</p>
            <p
              className={cn(
                'mt-0.5 text-xs transition-colors duration-500',
                approval === 'Approved' ? 'text-ok' : approval === 'Requested' ? 'text-warn' : 'text-fg-3'
              )}
            >
              {approval}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-edge pt-4">
              <Readout label="Tool calls" value={String(toolCalls).padStart(2, '0')} />
              <Readout label="Logged" value={String(visible).padStart(2, '0')} />
            </dl>
          </div>
        </div>
      </div>

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
