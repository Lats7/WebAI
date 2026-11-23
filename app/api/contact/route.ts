import {
  businessInbox,
  clientAddress,
  createLimiter,
  isSameOrigin,
  readJson,
  reply,
  sendEmail,
} from '@/lib/apiGuard';
import { MIN_FILL_MS, briefEmail, parseBrief } from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Receives a brief from the site form and emails it to the business.
 * The shared checks and the environment variables are described in lib/apiGuard.ts.
 *
 * Until RESEND_API_KEY and CONTACT_FROM are set this returns "not_configured",
 * and the form falls back to opening the visitor's email app.
 *
 * This endpoint never emails the visitor, because the brief is free text and
 * an endpoint that sends typed text to any address can be used to spam other
 * people. The self-check results email (/api/self-check) is the one place the
 * site emails a visitor, and its content is fixed by the server.
 */

const MAX_BODY_BYTES = 12_000;
const limited = createLimiter(10 * 60 * 1000, 5);

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

  if (limited(clientAddress(request))) return reply({ ok: false, code: 'rate_limited' }, 429);

  const parsed = parseBrief(body);
  if (!parsed.ok) return reply({ ok: false, code: 'invalid', fields: parsed.fields }, 400);

  const { subject, text } = briefEmail(parsed.brief);
  const outcome = await sendEmail('contact', {
    to: businessInbox(),
    replyTo: parsed.brief.email,
    subject,
    text,
  });

  if (outcome === 'not_configured') return reply({ ok: false, code: 'not_configured' }, 503);
  if (outcome === 'failed') return reply({ ok: false, code: 'send_failed' }, 502);
  return reply({ ok: true }, 200);
}
