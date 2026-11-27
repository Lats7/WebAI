import { type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { AgentConsole } from '@/components/shared/AgentConsole';
import { CountUp } from '@/components/shared/CountUp';
import { CELL_X } from '@/components/shared/Section';
import { COMPANY, STATS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const delay = (seconds: number) => ({ '--rise-delay': `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="frame">
        {/* Headline */}
        <div className={cn(CELL_X, 'pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-44')}>
          <p
            className="rise label inline-flex items-center gap-2.5 border border-edge-strong bg-panel/60 px-3 py-2 text-fg-2 backdrop-blur mc:rounded-[2px] ws:rounded-full ws:bg-panel ws:shadow-card"
            style={delay(0.05)}
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
            </span>
            Open for new projects
            <span className="inline-flex items-center gap-2.5 mc:max-sm:hidden">
              <span className="text-fg-3" aria-hidden="true">
                <span className="mc-only">{'//'}</span>
                <span className="ws-only">·</span>
              </span>
              {COMPANY.location}
            </span>
          </p>

          <div className="mt-8 grid gap-8 xl:grid-cols-12 xl:items-end xl:gap-10">
            <div className="[container-type:inline-size] xl:col-span-8">
              {/* Slides in fully opaque: this is the largest thing on the first screen. */}
              <h1 className="rise-solid display hero-title text-fg">
                Cut the busywork.
                <br />
                <span className="accent-word">Keep the savings.</span>
              </h1>
            </div>

            <div className="rise xl:col-span-4 xl:pb-2" style={delay(0.12)}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-2">
                We build AI agents and automation that take hours of manual work off your team, and we look
                after the IT behind them.{' '}
                <span className="text-fg">Secure from day one, without slowing you down.</span>
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/#contact" className="btn btn-primary btn-lg">
                  Start a project
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/tools/automation-savings-calculator" className="btn btn-secondary btn-lg">
                  Savings calculator
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Console on its stage */}
        <div className="rise px-3 sm:px-6 lg:px-10" style={delay(0.22)}>
          <div className="stage px-3 pb-4 pt-12 sm:px-6 sm:pb-6 lg:px-12 lg:pb-10 lg:pt-16 ws:pt-6 sm:ws:pt-8 lg:ws:pt-12">
            <div
              className="radar mc-only left-1/2 top-1/2 w-[70rem] -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <div className="mc-only absolute inset-x-4 top-4 flex items-center justify-between gap-4" aria-hidden="true">
              <span className="label !text-[0.625rem] text-fg-3">
                <span className="text-signal">Stage 01</span> {'//'} Live demo
              </span>
              <span className="label hidden !text-[0.625rem] tabular-nums text-fg-3 sm:block">
                Lat {COMPANY.coordinates.lat} <span className="mx-1 text-edge-strong">|</span> Lon{' '}
                {COMPANY.coordinates.lon} <span className="mx-1 text-edge-strong">|</span>{' '}
                <span className="text-fg-2">Melbourne</span>
              </span>
            </div>

            <div className="relative">
              <AgentConsole />
            </div>
            <p className="relative mt-4 text-center text-xs text-fg-3 ws:text-fg-2">
              A simulated run. Real agents stop at the same point and wait for a person.
            </p>
          </div>
        </div>

        {/* Proof row */}
        <dl className="mt-10 grid grid-cols-2 border-t border-edge lg:mt-14 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col-reverse gap-2 border-edge px-5 py-7 sm:px-8 lg:px-14 lg:py-9',
                index % 2 === 1 && 'border-l',
                index >= 2 && 'border-t lg:border-t-0',
                index === 2 && 'lg:border-l'
              )}
            >
              <dt className="label text-fg-3">{stat.label}</dt>
              <dd className="display flex items-center gap-3 text-4xl text-fg sm:text-5xl">
                <CountUp value={stat.value} />
                {index === 1 && (
                  <a
                    href={COMPANY.socials.freelancer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-m-2 flex gap-0.5 p-2 text-star"
                    aria-label="See the reviews on Freelancer (opens in a new tab)"
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={13} className="fill-current" aria-hidden="true" />
                    ))}
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
