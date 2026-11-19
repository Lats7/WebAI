import { ArrowRight, ArrowUpRight, Linkedin, Star } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { COMPANY, NAV_ITEMS } from '@/lib/constants';

const hasRealAbn = /[1-9]/.test(COMPANY.abn);

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
          <a href="#contact" className="btn btn-primary btn-lg shrink-0 self-start lg:self-auto">
            Start a project
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="cell grid gap-12 px-5 py-14 sm:px-8 md:grid-cols-12 lg:px-14 lg:py-16">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-2">{COMPANY.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="chip transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin size={13} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={COMPANY.socials.freelancer}
                target="_blank"
                rel="noopener noreferrer"
                className="chip transition-colors hover:border-accent hover:text-accent"
              >
                <Star size={13} className="fill-current" aria-hidden="true" />
                {COMPANY.reviews.rating} on Freelancer
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="label text-fg-3">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-fg-2 transition-colors hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="label text-fg-3">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-2">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-accent">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-accent">
                  {COMPANY.phone}
                </a>
              </li>
              <li>{COMPANY.location}</li>
              <li>
                <a href="#contact" className="inline-flex items-center gap-1 text-accent hover:underline">
                  Start a project
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="cell flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
          <p className="text-xs text-fg-3">
            &copy; {new Date().getFullYear()} {COMPANY.fullName}. All rights reserved.
            {hasRealAbn && <span className="ml-3">{COMPANY.abn}</span>}
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
