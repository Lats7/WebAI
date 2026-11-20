import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/constants';
import { MIN_FILL_MS, briefEmail, parseBrief } from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Receives a brief from the site form and emails it to the business.
 *
 * Environment variables (set in the host, never in the repository):
 *   RESEND_API_KEY  API key for the email service.
 *   CONTACT_FROM    Sender, on a domain verified with the email service,
 *                   for example "WebAI ProTech website <website@webaiprotech.com>".
 *   CONTACT_TO      Where briefs go. Defaults to the address in lib/constants.ts.
 *   CONTACT_EMAIL_ENDPOINT  Optional. Points at a mock email service in tests.
 *
 * Until RESEND_API_KEY and CONTACT_FROM are set this returns "not_configured",
 * and the form falls back to opening the visitor's email app.
 *
 * It does not email the visitor. An endpoint that sends mail to any address
 * typed into a form can be used to spam other people.
 */

const EMAIL_ENDPOINT = process.env.CONTACT_EMAIL_ENDPOINT || 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 12_000;

// Best-effort limit per address. Each server instance keeps its own count, so
// treat this as a speed bump, not a guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(key, hits);
    return true;
  }
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return false;
}

function reply(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  // Only accept posts from this site's own pages.
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  let sameOrigin = false;
  try {
    sameOrigin = Boolean(origin && host && new URL(origin).host === host);
  } catch {
    sameOrigin = false;
  }
  if (!sameOrigin) return reply({ ok: false, code: 'forbidden' }, 403);

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return reply({ ok: false, code: 'invalid' }, 400);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reply({ ok: false, code: 'too_large' }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return reply({ ok: false, code: 'invalid' }, 400);
  }

  // A hidden field that people never see. Bots fill it in. Answer as if it worked.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return reply({ ok: true }, 200);
  }

  if (typeof body.elapsed !== 'number' || body.elapsed < MIN_FILL_MS) {
    return reply({ ok: false, code: 'too_fast' }, 400);
  }

  const address = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(address)) return reply({ ok: false, code: 'rate_limited' }, 429);

  const parsed = parseBrief(body);
  if (!parsed.ok) return reply({ ok: false, code: 'invalid', fields: parsed.fields }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) return reply({ ok: false, code: 'not_configured' }, 503);

  const { subject, text } = briefEmail(parsed.brief);

  try {
    const response = await fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO || COMPANY.email],
        reply_to: parsed.brief.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      // Log the status only. The brief itself contains personal information.
      console.error(`contact: email service answered ${response.status}`);
      return reply({ ok: false, code: 'send_failed' }, 502);
    }
  } catch {
    console.error('contact: email service unreachable');
    return reply({ ok: false, code: 'send_failed' }, 502);
  }

  return reply({ ok: true }, 200);
}
