import Link from 'next/link';
import { ArrowRight, Linkedin, Star } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { COMPANY } from '@/lib/constants';

const hasRealAbn = /[1-9]/.test(COMPANY.abn);

const COLUMNS = [
  {
    heading: 'Services',
    links: [
      { label: 'AI agents and automation', href: '/services/ai-agents-automation' },
      { label: 'Cyber security', href: '/services/cyber-security' },
      { label: 'AI security', href: '/services/ai-security' },
      { label: 'CRM, web, and apps', href: '/#build' },
    ],
  },
  {
    heading: 'Start here',
    links: [
      { label: 'AI Readiness Review', href: '/ai-readiness-review' },
      { label: 'Free self-check', href: '/tools/ai-readiness-check' },
      { label: 'Work', href: '/work' },
      { label: 'Insights', href: '/insights' },
    ],
  },
] as const;

// Links are padded to at least 24px tall so they are easy to hit on a phone.
const linkClass = 'inline-block py-1 text-sm text-fg-2 transition-colors hover:text-accent';

export function Footer() {
  return (
    <footer className="relative mc:pb-8">
      <div className="frame">
        {/* Closing call to action */}
        <div className="cell cell-marks flex flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:py-24">
          <p className="statement max-w-3xl text-[clamp(1.8rem,4vw,3.25rem)]">
            Have something slow, risky, or manual?{' '}
            <span className="muted">Tell us about it and we will say honestly whether we can help.</span>
          </p>
          <Link href="/#contact" className="btn btn-primary btn-lg shrink-0 self-start lg:self-auto">
            Start a project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="cell grid gap-12 px-5 py-14 sm:px-8 md:grid-cols-12 lg:px-14 lg:py-16">
          <div className="md:col-span-4">
            <Link href="/" aria-label="WebAI ProTech home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-2">{COMPANY.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="chip !py-1.5 transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin size={13} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={COMPANY.socials.freelancer}
                target="_blank"
                rel="noopener noreferrer"
                className="chip !py-1.5 transition-colors hover:border-accent hover:text-accent"
              >
                <Star size={13} className="fill-current" aria-hidden="true" />
                {COMPANY.reviews.rating} on Freelancer
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {COLUMNS.map((column, index) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className={index === 0 ? 'md:col-span-3' : 'md:col-span-2'}
            >
              <p className="label text-fg-3">{column.heading}</p>
              <ul className="mt-3 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <p className="label text-fg-3">Contact</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a href={`mailto:${COMPANY.email}`} className={`${linkClass} whitespace-nowrap`}>
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={linkClass}>
                  {COMPANY.phone}
                </a>
              </li>
              <li className="py-1 text-sm text-fg-2">{COMPANY.location}</li>
            </ul>
          </div>
        </div>

        <div className="cell flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-3">
            <span>
              &copy; {new Date().getFullYear()} {COMPANY.fullName}. All rights reserved.
            </span>
            {hasRealAbn && <span>{COMPANY.abn}</span>}
            <Link href="/privacy" className="inline-block py-1.5 underline-offset-4 hover:text-accent hover:underline">
              Privacy
            </Link>
            <a
              href="/.well-known/security.txt"
              className="inline-block py-1.5 underline-offset-4 hover:text-accent hover:underline"
            >
              Report a security issue
            </a>
          </p>
          <div className="flex items-center gap-3">
            <span className="label text-fg-3">Site style</span>
            <ThemeSwitch size="compact" />
          </div>
        </div>

        {/* Wordmark, cropped by the bottom of the page */}
        <div className="cell wordmark-wrap overflow-hidden" aria-hidden="true">
          <p className="wordmark -mb-[0.13em] select-none whitespace-nowrap pt-5 text-center leading-[0.85]">
            {COMPANY.name}
            <span className="wordmark-thin">{COMPANY.suffix}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
