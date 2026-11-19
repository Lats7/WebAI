'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronDown, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { COMPANY, CONTACT_INTERESTS, NEXT_STEPS } from '@/lib/constants';

const CHANNELS = [
  { Icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { Icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, '')}` },
  { Icon: Linkedin, label: 'LinkedIn', value: 'WebAI ProTech', href: COMPANY.socials.linkedin, external: true },
  { Icon: MapPin, label: 'Based in', value: COMPANY.location },
];

export function Contact() {
  const [opened, setOpened] = useState(false);

  // There is no backend. The form hands a pre-filled email to the visitor's mail app.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? '').trim();

    const subject = `Website enquiry: ${field('interest') || 'General'}${field('company') ? ` (${field('company')})` : ''}`;
    const body = [
      `Name: ${field('name')}`,
      `Email: ${field('email')}`,
      `Company: ${field('company') || 'Not provided'}`,
      `Interested in: ${field('interest') || 'Not specified'}`,
      '',
      field('message'),
    ].join('\n');

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <Section id="contact">
      <SectionHeader
        code="07"
        eyebrow="Contact"
        title={
          <>
            Tell us what you want <span className="accent-word">off your plate.</span>
          </>
        }
        description="A paragraph is enough to start. Say what is slow, risky, or manual, and we will tell you honestly whether we can help."
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <h3 className="label text-fg-3">What happens next</h3>
          <ol className="mt-5 space-y-4">
            {NEXT_STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center border border-accent/50 font-mono text-xs text-accent mc:rounded-[2px] ws:rounded-full ws:border-transparent ws:bg-accent/10 ws:font-body ws:font-semibold">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-fg">{step}</span>
              </li>
            ))}
          </ol>

          <ul className="mt-10 grid gap-px overflow-hidden border border-edge bg-edge mc:rounded-[2px] ws:rounded-2xl">
            {CHANNELS.map(({ Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                    <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="label block text-fg-3 mc:!text-[0.625rem]">{label}</span>
                    <span className="mt-0.5 block truncate text-[0.9375rem] font-medium text-fg">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label} className="bg-bg ws:bg-panel">
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-accent/[0.06]"
                    >
                      {content}
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="card p-6 sm:p-9">
            <div className="mb-7 flex items-center justify-between gap-4 border-b border-edge pb-5">
              <p className="label text-fg-2">
                <span className="mc-only">{'// '}</span>New project brief
              </p>
              <span className="mc-only label text-fg-3" aria-hidden="true">
                FORM.01
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
                  Name
                </label>
                <input id="name" name="name" required autoComplete="name" placeholder="Your name" className="field" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-fg">
                  Company <span className="font-normal text-fg-3">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Where you work"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="interest" className="mb-2 block text-sm font-medium text-fg">
                  Interested in
                </label>
                <div className="relative">
                  <select id="interest" name="interest" defaultValue="" className="field">
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
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
                  What do you need?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What is slow, risky, or manual right now?"
                  className="field resize-y"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Send the brief
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="text-sm text-fg-3" role="status" aria-live="polite">
                {opened ? (
                  <span className="flex items-start gap-2 text-ok">
                    <Check size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      Your email app should now be open with the brief filled in. If nothing opened,
                      email {COMPANY.email} directly.
                    </span>
                  </span>
                ) : (
                  'This opens your email app with the brief filled in.'
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
