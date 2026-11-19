'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { AgentConsole } from '@/components/shared/AgentConsole';
import { CountUp } from '@/components/shared/CountUp';
import { CELL_X } from '@/components/shared/Section';
import { COMPANY, STATS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="frame">
        {/* Headline */}
        <div className={cn(CELL_X, 'pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-44')}>
          <motion.p
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="label inline-flex items-center gap-2.5 border border-edge-strong bg-panel/60 px-3 py-2 text-fg-2 backdrop-blur mc:rounded-[2px] ws:rounded-full ws:bg-panel ws:shadow-card"
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
          </motion.p>

          <div className="mt-8 grid gap-8 xl:grid-cols-12 xl:items-end xl:gap-10">
            <div className="[container-type:inline-size] xl:col-span-8">
              <motion.h1
                variants={rise}
                initial="hidden"
                animate="visible"
                custom={0.14}
                className="display hero-title text-fg"
              >
                Put AI to work.
                <br />
                <span className="accent-word">Stay in control.</span>
              </motion.h1>
            </div>

            <motion.div
              variants={rise}
              initial="hidden"
              animate="visible"
              custom={0.28}
              className="xl:col-span-4 xl:pb-2"
            >
              <p className="max-w-2xl text-lg leading-relaxed text-fg-2">
                We build AI agents and automation that take real work off your team, with the security
                engineering and governance to run them safely.{' '}
                <span className="text-fg">Led by a cyber security engineer.</span>
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn btn-primary btn-lg">
                  Start a project
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#agents" className="btn btn-secondary btn-lg">
                  See the agents
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Console on its stage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="px-3 sm:px-6 lg:px-10"
        >
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
        </motion.div>

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
                    className="flex gap-0.5 text-star"
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
