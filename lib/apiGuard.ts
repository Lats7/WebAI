import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/constants';

/**
 * Shared checks for the site's form endpoints (/api/contact and
 * /api/self-check): same-origin posts only, small JSON bodies, best-effort
 * rate limits, and one place that talks to the email service.
 *
 * Environment variables (set in the host, never in the repository):
 *   RESEND_API_KEY  API key for the email service.
 *   CONTACT_FROM    Sender, on a domain verified with the email service,
 *                   for example "WebAI ProTech website <website@webaiprotech.com>".
 *   CONTACT_TO      The business inbox. Defaults to the address in lib/constants.ts.
 *   CONTACT_EMAIL_ENDPOINT  Optional. Points at a mock email service in tests.
 */

const EMAIL_ENDPOINT = process.env.CONTACT_EMAIL_ENDPOINT || 'https://api.resend.com/emails';

export function reply(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/** True when the post came from one of this site's own pages. */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return Boolean(origin && host && new URL(origin).host === host);
  } catch {
    return false;
  }
}

type JsonBody = { ok: true; body: Record<string, unknown> } | { ok: false; response: NextResponse };

/** Read a small JSON object from the request, or return the error response to send. */
export async function readJson(request: Request, maxBytes: number): Promise<JsonBody> {
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return { ok: false, response: reply({ ok: false, code: 'invalid' }, 400) };
  }
  const raw = await request.text();
  if (raw.length > maxBytes) return { ok: false, response: reply({ ok: false, code: 'too_large' }, 413) };
  try {
    const body: unknown = JSON.parse(raw);
    if (typeof body !== 'object' || body === null || Array.isArray(body)) throw new Error('not an object');
    return { ok: true, body: body as Record<string, unknown> };
  } catch {
    return { ok: false, response: reply({ ok: false, code: 'invalid' }, 400) };
  }
}

export function clientAddress(request: Request) {
  return (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
}

/** A one-way fingerprint, so a limiter can count an email address without holding it. */
export function fingerprint(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex').slice(0, 32);
}

/**
 * A best-effort limit: at most `max` hits per key in each window. Each server
 * instance keeps its own count, so treat this as a speed bump, not a guarantee.
 * The returned function answers true when the caller should be refused.
 */
export function createLimiter(windowMs: number, max: number) {
  const recent = new Map<string, number[]>();
  return (key: string) => {
    const now = Date.now();
    const hits = (recent.get(key) ?? []).filter((time) => now - time < windowMs);
    if (hits.length >= max) {
      recent.set(key, hits);
      return true;
    }
    hits.push(now);
    recent.set(key, hits);
    if (recent.size > 5000) recent.clear();
    return false;
  };
}

/** The business inbox that receives briefs and lead notes. */
export function businessInbox() {
  return process.env.CONTACT_TO || COMPANY.email;
}

/** True once the email service has a key and a verified sender. */
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM);
}

interface OutgoingEmail {
  to: string;
  replyTo?: string;
  subject: string;
  /** Plain text only. Nothing a visitor types is ever rendered as markup. */
  text: string;
}

/** Send one plain-text email. Logs the outcome only, never the content. */
export async function sendEmail(label: string, message: OutgoingEmail): Promise<'sent' | 'not_configured' | 'failed'> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) return 'not_configured';

  try {
    const response = await fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [message.to],
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        subject: message.subject,
        text: message.text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error(`${label}: email service answered ${response.status}`);
      return 'failed';
    }
    return 'sent';
  } catch {
    console.error(`${label}: email service unreachable`);
    return 'failed';
  }
}
