'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, CircleAlert, LoaderCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { readAttribution } from '@/lib/attribution';
import { COMPANY, CONTACT_INTERESTS } from '@/lib/constants';
import { LIMITS } from '@/lib/contact';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  /** Which page or placement this form is on. Shows up in the brief and in analytics. */
  source: string;
  /** Pre-selected option in the "Interested in" list. */
  defaultInterest?: (typeof CONTACT_INTERESTS)[number];
  /** Text placed in the message box, for example a self-check result. */
  defaultMessage?: string;
  title?: string;
  className?: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

const ERRORS: Record<string, string> = {
  invalid: 'Something in the form is missing or does not look right. Check it and send again.',
  too_fast: 'That was quick. Press send once more.',
  rate_limited: `Too many attempts from this connection. Wait a few minutes, or email ${COMPANY.email}.`,
};

const labelClass = 'mb-2 block text-sm font-medium text-fg-2';

/**
 * The brief form. It posts to /api/contact. If the site cannot send (the email
 * service is not set up yet, or the request fails), it falls back to opening
 * the visitor's email app with the brief filled in, so a lead is never lost.
 */
export function ContactForm({
  source,
  defaultInterest,
  defaultMessage,
  title = 'New project brief',
  className,
}: ContactFormProps) {
  const id = useId();
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? '').trim();

    const brief = {
      name: field('name'),
      email: field('email'),
      company: field('company'),
      interest: field('interest'),
      message: field('message'),
    };

    // Used when the site cannot send the brief itself.
    const openEmailApp = () => {
      const subject = `Website enquiry: ${brief.interest || 'General'}${brief.company ? ` (${brief.company})` : ''}`;
      const body = [
        `Name: ${brief.name}`,
        `Email: ${brief.email}`,
        `Company: ${brief.company || 'Not provided'}`,
        `Interested in: ${brief.interest || 'Not specified'}`,
        '',
        brief.message,
      ].join('\n');
      window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('fallback');
      trackEvent('brief_email_fallback', { source });
    };

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...brief,
          website: field('website'),
          elapsed: Date.now() - startedAt.current,
          source,
          attribution: readAttribution(),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string };

      if (response.ok && result.ok) {
        setStatus('sent');
        trackEvent('brief_sent', { source, interest: brief.interest || 'Not specified' });
        form.reset();
        return;
      }
      if (result.code && ERRORS[result.code]) {
        setStatus('error');
        setError(ERRORS[result.code]);
        return;
      }
      openEmailApp();
    } catch {
      openEmailApp();
    }
  }

  if (status === 'sent') {
    return (
      <div className={cn('card bracketed p-8 shadow-pop sm:p-10', className)} role="status" aria-live="polite">
        <span className="grid h-12 w-12 place-items-center bg-ok/15 text-ok mc:rounded-[3px] ws:rounded-full">
          <Check size={22} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className="display mt-6 text-3xl text-fg">Brief received.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-fg-2">
          Thanks. We will read it properly and reply by email. If it is urgent, call {COMPANY.phone}.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus('idle');
          }}
          className="btn btn-secondary btn-sm mt-8"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} className={cn('card bracketed p-6 shadow-pop sm:p-9', className)} noValidate={false}>
      <div className="mb-7 flex items-center justify-between gap-4 border-b border-edge pb-5">
        <p className="label text-fg-2">{title}</p>
        <span className="mc-only label text-signal" aria-hidden="true">
          Form 01
        </span>
      </div>

      {/* Bots fill this in. People never see it. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            placeholder="Your name"
            className="field"
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
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
        <div>
          <label htmlFor={`${id}-company`} className={labelClass}>
            Company <span className="font-normal text-fg-3">(optional)</span>
          </label>
          <input
            id={`${id}-company`}
            name="company"
            maxLength={LIMITS.company}
            autoComplete="organization"
            placeholder="Where you work"
            className="field"
          />
        </div>
        <div>
          <label htmlFor={`${id}-interest`} className={labelClass}>
            Interested in
          </label>
          <div className="relative">
            <select id={`${id}-interest`} name="interest" defaultValue={defaultInterest ?? ''} className="field">
              <option value="" disabled>
                Choose one
              </option>
              {CONTACT_INTERESTS.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-fg-3"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={labelClass}>
            What do you need?
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={5}
            maxLength={LIMITS.message}
            defaultValue={defaultMessage}
            placeholder="What is slow, risky, or manual right now?"
            className="field resize-y"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
          {sending ? 'Sending' : 'Send the brief'}
          {sending ? (
            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
        </button>
        <p className="text-sm leading-relaxed text-fg-3" role="status" aria-live="polite">
          {status === 'error' && (
            <span className="flex items-start gap-2 text-alert">
              <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </span>
          )}
          {status === 'fallback' && (
            <span className="flex items-start gap-2 text-warn">
              <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                We could not send that from the site, so your email app should now be open with the brief filled
                in. If nothing opened, email {COMPANY.email}.
              </span>
            </span>
          )}
          {(status === 'idle' || status === 'sending') && (
            <>
              We use your details only to reply. See the{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">
                privacy page
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
