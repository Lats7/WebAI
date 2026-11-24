'use client';

import { useId, useRef, useState } from 'react';
import { ContactForm } from '@/components/shared/ContactForm';
import { trackEvent } from '@/lib/analytics';
import {
  SAVINGS_DEFAULTS,
  SAVINGS_LIMITS,
  WEEKS_PER_YEAR,
  type SavingsInput,
  cleanInput,
  estimate,
  formatDollars,
  formatWhole,
} from '@/lib/savings';

const labelClass = 'mb-2 block text-sm font-medium text-fg-2';
const hintClass = 'mt-2 text-sm leading-relaxed text-fg-3';

/**
 * A calculator for what one manual task costs in a year, and what part of
 * that could come back. It multiplies the visitor's own numbers in the
 * browser. Nothing is sent unless they choose to send the estimate.
 */
export function SavingsCalculator() {
  const id = useId();
  const used = useRef(false);
  const [task, setTask] = useState('');
  // Kept as text while typing, so a field can be cleared without snapping back.
  const [fields, setFields] = useState({
    hours: String(SAVINGS_DEFAULTS.hours),
    people: String(SAVINGS_DEFAULTS.people),
    hourlyCost: String(SAVINGS_DEFAULTS.hourlyCost),
  });
  const [share, setShare] = useState(SAVINGS_DEFAULTS.share);

  const input: SavingsInput = cleanInput({
    hours: Number(fields.hours),
    people: Number(fields.people),
    hourlyCost: Number(fields.hourlyCost),
    share,
  });
  const result = estimate(input);

  function touched() {
    if (used.current) return;
    used.current = true;
    trackEvent('savings_calculator_used');
  }

  function setField(name: keyof typeof fields, value: string) {
    touched();
    setFields((current) => ({ ...current, [name]: value }));
  }

  const message = [
    `Savings estimate${task.trim() ? ` for: ${task.trim()}` : ''}`,
    `${input.hours} hours a week, ${input.people} ${input.people === 1 ? 'person' : 'people'}, ${formatDollars(input.hourlyCost)} an hour, ${input.share}% could be automated.`,
    `That is about ${formatWhole(result.hoursNow)} hours and ${formatDollars(result.costNow)} a year now, with about ${formatWhole(result.hoursBack)} hours and ${formatDollars(result.saving)} a year to get back.`,
    '',
    'A bit about the task and the systems it touches: ',
  ].join('\n');

  return (
    <div>
      <div className="card bracketed shadow-pop">
        <div className="grid lg:grid-cols-12">
          {/* Inputs */}
          <div className="p-6 sm:p-9 lg:col-span-7">
            <p className="label text-signal ws:text-fg-3">Your numbers</p>

            <div className="mt-6">
              <label htmlFor={`${id}-task`} className={labelClass}>
                What is the task? <span className="font-normal text-fg-3">(optional)</span>
              </label>
              <input
                id={`${id}-task`}
                value={task}
                maxLength={120}
                onChange={(event) => setTask(event.target.value)}
                placeholder="For example, entering supplier invoices"
                autoComplete="off"
                className="field"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor={`${id}-hours`} className={labelClass}>
                  Hours a week, each
                </label>
                <input
                  id={`${id}-hours`}
                  type="number"
                  inputMode="decimal"
                  min={SAVINGS_LIMITS.hours.min}
                  max={SAVINGS_LIMITS.hours.max}
                  step={SAVINGS_LIMITS.hours.step}
                  value={fields.hours}
                  onChange={(event) => setField('hours', event.target.value)}
                  className="field tabular-nums"
                />
              </div>
              <div>
                <label htmlFor={`${id}-people`} className={labelClass}>
                  People who do it
                </label>
                <input
                  id={`${id}-people`}
                  type="number"
                  inputMode="numeric"
                  min={SAVINGS_LIMITS.people.min}
                  max={SAVINGS_LIMITS.people.max}
                  step={SAVINGS_LIMITS.people.step}
                  value={fields.people}
                  onChange={(event) => setField('people', event.target.value)}
                  className="field tabular-nums"
                />
              </div>
              <div>
                <label htmlFor={`${id}-cost`} className={labelClass}>
                  Cost of an hour ($)
                </label>
                <input
                  id={`${id}-cost`}
                  type="number"
                  inputMode="decimal"
                  min={SAVINGS_LIMITS.hourlyCost.min}
                  max={SAVINGS_LIMITS.hourlyCost.max}
                  step={SAVINGS_LIMITS.hourlyCost.step}
                  value={fields.hourlyCost}
                  onChange={(event) => setField('hourlyCost', event.target.value)}
                  className="field tabular-nums"
                />
              </div>
            </div>
            <p className={hintClass}>
              For the cost of an hour, use the wage plus super and other on-costs, not just the pay rate.
            </p>

            <div className="mt-7">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-share`} className="text-sm font-medium text-fg-2">
                  How much of it could software do?
                </label>
                <output htmlFor={`${id}-share`} className="display text-2xl tabular-nums text-fg">
                  {input.share}%
                </output>
              </div>
              <input
                id={`${id}-share`}
                type="range"
                min={SAVINGS_LIMITS.share.min}
                max={SAVINGS_LIMITS.share.max}
                step={SAVINGS_LIMITS.share.step}
                value={share}
                onChange={(event) => {
                  touched();
                  setShare(Number(event.target.value));
                }}
                className="range mt-4 w-full"
              />
              <p className={hintClass}>
                Not sure? Leave it at half. Work that follows the same steps every time sits higher. Work that
                needs judgement sits lower.
              </p>
            </div>
          </div>

          {/* Result */}
          <div
            className="border-t border-edge p-6 sm:p-9 lg:col-span-5 lg:border-l lg:border-t-0 mc:bg-accent/[0.04] ws:bg-raised/60"
            role="status"
            aria-live="polite"
          >
            <p className="label text-signal ws:text-fg-3">In a year</p>

            <p className="mt-6 text-sm text-fg-2">This task costs you now</p>
            <p className="display mt-1 text-3xl tabular-nums text-fg">{formatDollars(result.costNow)}</p>
            <p className="mt-1 text-sm tabular-nums text-fg-3">{formatWhole(result.hoursNow)} hours</p>

            <div className="mt-7 border-t border-edge pt-7">
              <p className="text-sm text-fg-2">You could get back</p>
              <p className="display accent-word mt-1 text-5xl tabular-nums sm:text-6xl">
                {formatDollars(result.saving)}
              </p>
              <p className="mt-2 text-sm tabular-nums text-fg-2">
                {formatWhole(result.hoursBack)} hours, or about {formatWhole(result.daysBack)} working days
              </p>
            </div>

            <p className="mt-7 border-t border-edge pt-6 text-sm leading-relaxed text-fg-2">
              A build that costs less than <span className="font-medium text-fg">{formatDollars(result.saving)}</span>{' '}
              would pay for itself inside a year, before running costs.
            </p>
          </div>
        </div>

        <p className="border-t border-edge px-6 py-5 text-sm leading-relaxed text-fg-3 sm:px-9">
          This multiplies your own numbers over {WEEKS_PER_YEAR} working weeks. It is not a quote, and nothing you
          enter leaves your browser unless you send it.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="display text-3xl text-fg sm:text-4xl">
          Want it checked? <span className="accent-word">Send the estimate.</span>
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">
          Your numbers are already in the message below. Add a line about the task, and we will tell you whether
          it is worth automating and roughly what it would take.
        </p>
        <ContactForm
          key={message}
          source="savings-calculator"
          defaultInterest="Automation"
          defaultMessage={message}
          title="Send estimate with a brief"
          className="mt-7"
        />
      </div>
    </div>
  );
}
