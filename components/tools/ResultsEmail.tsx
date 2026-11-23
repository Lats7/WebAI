'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, CircleAlert, LoaderCircle, Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { readAttribution } from '@/lib/attribution';
import { COMPANY } from '@/lib/constants';
import { LIMITS } from '@/lib/contact';

interface ResultsEmailProps {
  /** One value of 0, 1, or 2 for each question. */
  answers: number[];
  /** The result band, for analytics only. */
  band: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ERRORS: Record<string, string> = {
  invalid: 'That email address does not look right. Check it and try again.',
  too_fast: 'That was quick. Press the button once more.',
  rate_limited: `Too many requests from this connection. Wait a few minutes, or email ${COMPANY.email}.`,
  already_sent: 'We have already sent results to that address today. Check your inbox and your spam folder.',
};
const SEND_FAILED = `We could not send that just now. Try again in a minute, or email ${COMPANY.email}.`;

/**
 * Lets a visitor ask for their self-check results by email. It posts the
 * address, the ten answers, and the follow-up choice to /api/self-check, which
 * writes the email. The follow-up box starts unticked: we only keep the
 * address when the visitor asks us to get in touch.
 */
export function ResultsEmail({ answers, band }: ResultsEmailProps) {
  const id = useId();
  const shownAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const followUp = data.get('followUp') === 'on';

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/self-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          answers,
          followUp,
          website: String(data.get('website') ?? ''),
          elapsed: Date.now() - shownAt.current,
          attribution: readAttribution(),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string };

      if (response.ok && result.ok) {
        setSentTo(email);
        setStatus('sent');
        trackEvent('self_check_results_requested', { band, follow_up: followUp });
        return;
      }
      setStatus('error');
      setError((result.code && ERRORS[result.code]) || SEND_FAILED);
    } catch {
      setStatus('error');
      setError(SEND_FAILED);
    }
  }

  if (status === 'sent') {
    return (
      <div className="card bracketed p-6 sm:p-9" role="status" aria-live="polite">
        <div className="flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center bg-ok/15 text-ok mc:rounded-[3px] ws:rounded-full">
            <Check size={18} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="display text-2xl text-fg">Results sent.</h3>
            <p className="mt-2 leading-relaxed text-fg-2">
              We sent them to <span className="break-all font-medium text-fg">{sentTo}</span>. They should arrive
              within a few minutes. If they do not, check your spam folder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} className="card bracketed p-6 sm:p-9">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[3px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
          <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="display text-2xl text-fg">Email me my results</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-fg-2">
            Get your score, all ten areas, and the fix for every gap, not only the top three.
          </p>
        </div>
      </div>

      {/* Bots fill this in. People never see it. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium text-fg-2">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            placeholder="you@company.com"
            className="field"
          />
        </div>
        <button type="submit" className="btn btn-primary shrink-0" disabled={sending}>
          {sending ? 'Sending' : 'Email my results'}
          {sending ? (
            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fg-2">
        <input type="checkbox" name="followUp" className="peer sr-only" />
        <span
          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-edge-strong text-transparent transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent mc:rounded-[3px] ws:rounded-md"
          aria-hidden="true"
        >
          <Check size={13} strokeWidth={3.5} />
        </span>
        <span>
          It is okay for {COMPANY.fullName} to follow up with me about these results.{' '}
          <span className="text-fg-3">Optional.</span>
        </span>
      </label>

      <p className="mt-4 text-sm leading-relaxed text-fg-3" role="status" aria-live="polite">
        {status === 'error' ? (
          <span className="flex items-start gap-2 text-alert">
            <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </span>
        ) : (
          <>
            We send your results once. We keep your address only if you tick the box. See the{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">
              privacy page
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
