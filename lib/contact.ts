import { CONTACT_INTERESTS } from '@/lib/constants';

/**
 * Shared rules for the brief form. The browser uses the limits for its own
 * hints, and the server enforces them again, since browser checks are only a
 * convenience.
 */

export const LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  message: 4000,
  source: 80,
  attributionValue: 160,
} as const;

/** Shortest plausible time between the form appearing and a person sending it. */
export const MIN_FILL_MS = 2500;

const ATTRIBUTION_KEYS = [
  'landing',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

export interface Brief {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  source: string;
  attribution: Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;
}

export type BriefResult = { ok: true; brief: Brief } | { ok: false; fields: string[] };

/** Collapse control characters and line breaks, so a value cannot add email headers or lines. */
function singleLine(value: unknown, max: number) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .trim()
    .slice(0, max);
}

function multiLine(value: unknown, max: number) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]+/g, '')
    .trim()
    .slice(0, max);
}

const EMAIL = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

/** Validate and normalise an untrusted request body into a brief. */
export function parseBrief(input: unknown): BriefResult {
  const body = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const fields: string[] = [];

  const name = singleLine(body.name, LIMITS.name);
  if (!name) fields.push('name');

  const email = singleLine(body.email, LIMITS.email);
  if (!EMAIL.test(email)) fields.push('email');

  const message = multiLine(body.message, LIMITS.message);
  if (!message) fields.push('message');

  const rawInterest = singleLine(body.interest, 60);
  const interest = (CONTACT_INTERESTS as readonly string[]).includes(rawInterest) ? rawInterest : '';

  const attribution: Brief['attribution'] = {};
  const rawAttribution =
    typeof body.attribution === 'object' && body.attribution !== null
      ? (body.attribution as Record<string, unknown>)
      : {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = singleLine(rawAttribution[key], LIMITS.attributionValue);
    if (value) attribution[key] = value;
  }

  if (fields.length > 0) return { ok: false, fields };

  return {
    ok: true,
    brief: {
      name,
      email,
      company: singleLine(body.company, LIMITS.company),
      interest,
      message,
      source: singleLine(body.source, LIMITS.source) || 'unknown',
      attribution,
    },
  };
}

/** The notification email, as plain text. No HTML, so nothing a visitor types can be rendered as markup. */
export function briefEmail(brief: Brief) {
  const campaign = (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const)
    .filter((key) => brief.attribution[key])
    .map((key) => `${key.replace('utm_', '')}: ${brief.attribution[key]}`)
    .join(', ');

  const text = [
    'New brief from the website',
    '',
    `Name: ${brief.name}`,
    `Email: ${brief.email}`,
    `Company: ${brief.company || 'Not provided'}`,
    `Interested in: ${brief.interest || 'Not specified'}`,
    `Sent from: ${brief.source}`,
    '',
    'Message',
    '-------',
    brief.message,
    '',
    'How they found the site',
    '-----------------------',
    `Landing page: ${brief.attribution.landing ?? 'Unknown'}`,
    `Referrer: ${brief.attribution.referrer ?? 'Direct or unknown'}`,
    `Campaign: ${campaign || 'None'}`,
  ].join('\n');

  const subject = `Website brief: ${brief.interest || 'General'} from ${brief.name}`.slice(0, 150);
  return { subject, text };
}
