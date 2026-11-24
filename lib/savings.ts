/**
 * The arithmetic behind the savings calculator. It multiplies the visitor's
 * own numbers. It is not a quote, and it makes no claim about what a build
 * would save.
 *
 * OWNER NOTE: the starting values are only there so the page is not empty.
 * Change them here if you would rather it opened on different numbers.
 */

/** Working weeks in a year, after four weeks of annual leave. */
export const WEEKS_PER_YEAR = 48;

/** Hours in a standard full-time working day, for "that is N working days". */
export const HOURS_PER_DAY = 7.6;

export interface SavingsInput {
  /** Hours each person spends on the task in a week. */
  hours: number;
  /** How many people do it. */
  people: number;
  /** What an hour of their time costs the business, in dollars. */
  hourlyCost: number;
  /** The share of the task software could do, from 0 to 100. */
  share: number;
}

export const SAVINGS_DEFAULTS: SavingsInput = { hours: 5, people: 2, hourlyCost: 45, share: 50 };

export const SAVINGS_LIMITS = {
  hours: { min: 0, max: 60, step: 0.5 },
  people: { min: 1, max: 500, step: 1 },
  hourlyCost: { min: 0, max: 500, step: 1 },
  share: { min: 10, max: 90, step: 5 },
} as const;

const clamp = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

/** Keep every input inside its limits, so a typed value cannot produce nonsense. */
export function cleanInput(input: SavingsInput): SavingsInput {
  return {
    hours: clamp(input.hours, SAVINGS_LIMITS.hours.min, SAVINGS_LIMITS.hours.max),
    people: Math.round(clamp(input.people, SAVINGS_LIMITS.people.min, SAVINGS_LIMITS.people.max)),
    hourlyCost: clamp(input.hourlyCost, SAVINGS_LIMITS.hourlyCost.min, SAVINGS_LIMITS.hourlyCost.max),
    share: clamp(input.share, SAVINGS_LIMITS.share.min, SAVINGS_LIMITS.share.max),
  };
}

export interface SavingsResult {
  /** Hours the task takes across the team in a year, as it is done now. */
  hoursNow: number;
  /** What those hours cost in a year. */
  costNow: number;
  /** Hours that would come back in a year. */
  hoursBack: number;
  /** What those hours are worth in a year. */
  saving: number;
  /** The same hours as working days. */
  daysBack: number;
}

export function estimate(raw: SavingsInput): SavingsResult {
  const input = cleanInput(raw);
  const hoursNow = input.hours * input.people * WEEKS_PER_YEAR;
  const hoursBack = hoursNow * (input.share / 100);
  return {
    hoursNow,
    costNow: hoursNow * input.hourlyCost,
    hoursBack,
    saving: hoursBack * input.hourlyCost,
    daysBack: hoursBack / HOURS_PER_DAY,
  };
}

const dollars = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
const whole = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 });

export const formatDollars = (value: number) => dollars.format(Math.round(value));
export const formatWhole = (value: number) => whole.format(Math.round(value));
