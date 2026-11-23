import {
  businessInbox,
  clientAddress,
  createLimiter,
  emailConfigured,
  fingerprint,
  isSameOrigin,
  readJson,
  reply,
  sendEmail,
} from '@/lib/apiGuard';
import { MIN_FILL_MS } from '@/lib/contact';
import { leadEmail, parseResultRequest, resultEmail } from '@/lib/selfCheckEmail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Emails a visitor the self-check results they asked for, and sends the
 * business a note about the request. The shared checks and the environment
 * variables are described in lib/apiGuard.ts.
 *
 * This is the only endpoint on the site that emails a visitor, so it is the
 * one that could be pointed at someone else's inbox. Three things keep that
 * small:
 *   1. The request carries an address and ten numbers. All of the email's
 *      wording is fixed by the server (see lib/selfCheckEmail.ts).
 *   2. Limits per visitor, per recipient address, and overall.
 *   3. The same origin, hidden-field, and timing checks as the brief form.
 *
 * The limits are kept in memory by each server instance, so they slow abuse
 * down and do not stop a determined sender. If this is ever abused, move the
 * counts to a shared store.
 */

const MAX_BODY_BYTES = 4_000;
const TEN_MINUTES = 10 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

const visitorLimited = createLimiter(TEN_MINUTES, 3);
const recipientLimited = createLimiter(24 * ONE_HOUR, 2);
const overallLimited = createLimiter(ONE_HOUR, 40);

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return reply({ ok: false, code: 'forbidden' }, 403);

  const json = await readJson(request, MAX_BODY_BYTES);
  if (!json.ok) return json.response;
  const { body } = json;

  // A hidden field that people never see. Bots fill it in. Answer as if it worked.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return reply({ ok: true }, 200);
  }

  if (typeof body.elapsed !== 'number' || body.elapsed < MIN_FILL_MS) {
    return reply({ ok: false, code: 'too_fast' }, 400);
  }

  if (visitorLimited(clientAddress(request))) return reply({ ok: false, code: 'rate_limited' }, 429);

  const parsed = parseResultRequest(body);
  if (!parsed.ok) return reply({ ok: false, code: 'invalid', fields: parsed.fields }, 400);
  const result = parsed.request;

  if (!emailConfigured()) return reply({ ok: false, code: 'not_configured' }, 503);

  if (recipientLimited(fingerprint(result.email))) return reply({ ok: false, code: 'already_sent' }, 429);
  if (overallLimited('all')) return reply({ ok: false, code: 'rate_limited' }, 429);

  const outcome = await sendEmail('self-check', {
    to: result.email,
    replyTo: businessInbox(),
    ...resultEmail(result),
  });
  if (outcome !== 'sent') return reply({ ok: false, code: 'send_failed' }, 502);

  // The visitor has their results. The note to the business is best effort.
  await sendEmail('self-check note', {
    to: businessInbox(),
    ...(result.followUp ? { replyTo: result.email } : {}),
    ...leadEmail(result),
  });

  return reply({ ok: true }, 200);
}
