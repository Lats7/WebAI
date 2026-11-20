'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { ContactForm } from '@/components/shared/ContactForm';
import { trackEvent } from '@/lib/analytics';
import { CHECK_QUESTIONS, MAX_SCORE, bandFor } from '@/lib/selfCheck';
import { cn } from '@/lib/utils';

const TOTAL = CHECK_QUESTIONS.length;
const TONE = { alert: 'text-alert', warn: 'text-warn', ok: 'text-ok' } as const;
const TONE_BG = { alert: 'bg-alert', warn: 'bg-warn', ok: 'bg-ok' } as const;

/** Score ring. The arc length is the share of the maximum score. */
function ScoreRing({ score, tone }: { score: number; tone: keyof typeof TONE }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="6" className="stroke-line/15" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="butt"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / MAX_SCORE)}
          className={cn('transition-[stroke-dashoffset] duration-1000 ease-out', TONE[tone])}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <p>
          <span className="display block text-4xl tabular-nums text-fg">{score}</span>
          <span className="label text-fg-3">of {MAX_SCORE}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Ten questions, one at a time, scored in the browser. Nothing is sent
 * anywhere unless the visitor chooses to send their result with a brief.
 */
export function SelfCheck() {
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => Array(TOTAL).fill(undefined));
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const finished = step >= TOTAL;
  const score = answers.reduce<number>((sum, value) => sum + (value ?? 0), 0);
  const band = bandFor(score);

  // Move focus to the new question or the result, so keyboard and screen reader users follow along.
  useEffect(() => {
    if (!started.current) return;
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (finished) trackEvent('self_check_completed', { band: band.name });
    // Only when the result is first shown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function go(next: number) {
    started.current = true;
    setStep(next);
  }

  function restart() {
    setAnswers(Array(TOTAL).fill(undefined));
    go(0);
  }

  if (finished) {
    // Weakest answers first. Ties keep the order of the questions.
    const priorities = CHECK_QUESTIONS.map((question, index) => ({ question, value: answers[index] ?? 0 }))
      .filter((item) => item.value < 2)
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);

    const message = [
      `AI readiness self-check result: ${score} out of ${MAX_SCORE} (${band.name}).`,
      priorities.length > 0
        ? `Areas to work on: ${priorities.map((item) => item.question.area).join(', ')}.`
        : 'No weak areas flagged.',
      '',
      'A bit about us: ',
    ].join('\n');

    return (
      <div>
        <div className="card bracketed shadow-pop">
          <div className="flex flex-col gap-8 border-b border-edge p-6 sm:flex-row sm:items-center sm:p-9">
            <ScoreRing score={score} tone={band.tone} />
            <div>
              <p className="label text-signal ws:text-fg-3">Your result</p>
              <h2 ref={headingRef} tabIndex={-1} className={cn('display mt-3 text-4xl outline-none', TONE[band.tone])}>
                {band.name}
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-fg-2">{band.summary}</p>
            </div>
          </div>

          {priorities.length > 0 && (
            <div className="border-b border-edge p-6 sm:p-9">
              <h3 className="label text-fg-3">Where to start</h3>
              <ol className="mt-5 space-y-6">
                {priorities.map((item, index) => (
                  <li key={item.question.area} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center border border-accent/50 font-mono text-xs text-accent mc:rounded-[3px] ws:rounded-full ws:border-transparent ws:bg-accent/10 ws:font-sans ws:font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-fg">{item.question.area}</p>
                      <p className="mt-1 leading-relaxed text-fg-2">{item.question.advice}</p>
                      {item.question.link && (
                        <Link
                          href={item.question.link.href}
                          className="mt-2 inline-flex items-center gap-1.5 py-1 text-sm text-accent underline-offset-4 hover:underline"
                        >
                          {item.question.link.label}
                          <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="p-6 sm:p-9">
            <h3 className="label text-fg-3">All ten areas</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {CHECK_QUESTIONS.map((question, index) => {
                const value = answers[index] ?? 0;
                const tone = value === 2 ? 'ok' : value === 1 ? 'warn' : 'alert';
                return (
                  <li key={question.area} className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-2.5 text-fg">
                      <span className={cn('h-2 w-2 shrink-0 rounded-full', TONE_BG[tone])} aria-hidden="true" />
                      {question.area}
                    </span>
                    <span className={cn('label', TONE[tone])}>
                      {value === 2 ? 'In place' : value === 1 ? 'Partial' : 'Gap'}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-edge pt-6">
              <button type="button" onClick={restart} className="btn btn-secondary btn-sm">
                <RotateCcw size={13} aria-hidden="true" />
                Start again
              </button>
              <p className="text-sm text-fg-3">
                This is a quick indicator, not an assessment. Nothing you entered has left your browser.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="display text-3xl text-fg sm:text-4xl">
            Want a proper look? <span className="accent-word">Send your result.</span>
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">
            The AI Readiness Review checks these areas in your real environment. Your result is already in the
            message below. Add a line about your business and send it.
          </p>
          <ContactForm
            key={score}
            source="self-check"
            defaultInterest="AI Readiness Review"
            defaultMessage={message}
            title="Send result with a brief"
            className="mt-7"
          />
        </div>
      </div>
    );
  }

  const question = CHECK_QUESTIONS[step];
  const selected = answers[step];

  return (
    <div className="card bracketed shadow-pop">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4 border-b border-edge px-6 py-4 sm:px-9">
        <p className="label text-fg-2">
          Question <span className="tabular-nums">{step + 1}</span> of {TOTAL}
        </p>
        <div
          className="flex gap-1"
          role="progressbar"
          aria-label="Progress"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={step}
        >
          {CHECK_QUESTIONS.map((item, index) => (
            <span
              key={item.area}
              className={cn(
                'h-1.5 w-4 transition-colors duration-300 sm:w-6 mc:rounded-none ws:rounded-full',
                index < step ? 'bg-accent' : index === step ? 'bg-accent/50' : 'bg-line/15'
              )}
            />
          ))}
        </div>
      </div>

      <fieldset className="p-6 sm:p-9">
        <legend className="contents">
          <span className="label block text-signal ws:text-fg-3">{question.area}</span>
          <span
            ref={headingRef}
            tabIndex={-1}
            role="heading"
            aria-level={2}
            className="display mt-4 block text-2xl text-fg outline-none sm:text-[2rem] sm:leading-[1.1]"
          >
            {question.question}
          </span>
        </legend>

        <div className="mt-8 grid gap-3">
          {question.options.map((option, index) => {
            const checked = selected === index;
            return (
              <label
                key={option}
                className={cn(
                  'flex cursor-pointer items-center gap-4 border p-4 transition-colors duration-200 sm:p-5',
                  'mc:rounded-[3px] ws:rounded-2xl',
                  'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
                  checked ? 'border-accent bg-accent/10' : 'border-edge-strong hover:border-accent/50'
                )}
              >
                <input
                  type="radio"
                  name={`question-${step}`}
                  value={index}
                  checked={checked}
                  onChange={() => setAnswers((current) => current.map((value, i) => (i === step ? index : value)))}
                  className="sr-only"
                />
                <span
                  className={cn(
                    'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors',
                    checked ? 'border-accent bg-accent text-on-accent' : 'border-edge-strong'
                  )}
                  aria-hidden="true"
                >
                  {checked && <Check size={12} strokeWidth={3.5} />}
                </span>
                <span className={cn('leading-snug', checked ? 'text-fg' : 'text-fg-2')}>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center justify-between gap-4 border-t border-edge px-6 py-5 sm:px-9">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="btn btn-secondary btn-sm disabled:invisible"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back
        </button>
        <button
          type="button"
          onClick={() => go(step + 1)}
          disabled={selected === undefined}
          className="btn btn-primary"
        >
          {step === TOTAL - 1 ? 'See my result' : 'Next'}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
