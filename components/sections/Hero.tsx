'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { AgentConsole } from '@/components/shared/AgentConsole';
import { COMPANY, STATS } from '@/lib/constants';

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24 lg:pt-44">
      {/* Mission: radar sweep behind the console */}
      <div
        className="radar mc-only -right-[9rem] top-8 hidden w-[46rem] lg:block"
        aria-hidden="true"
      />
      {/* Workspace: soft colour wash behind the console */}
      <div
        className="ws-only absolute right-[4%] top-28 hidden h-[30rem] w-[34rem] rounded-full bg-accent/15 blur-[110px] lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-site items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="[container-type:inline-size] lg:col-span-6">
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

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="display hero-title mt-7 text-fg"
          >
            Put AI to work.
            <br />
            <span className="accent-word">Stay in control.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.28}
            className="mt-7 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl"
          >
            We build AI agents and automation that take real work off your team, with the
            security engineering and governance to run them safely. Led by a cyber security
            engineer.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href="#contact" className="btn btn-primary btn-lg">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#agents" className="btn btn-secondary btn-lg">
              See how the agents work
            </a>
          </motion.div>

          <motion.dl
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.52}
            className="mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden border border-edge bg-edge mc:rounded-[2px] ws:rounded-2xl ws:shadow-card"
          >
            <div className="bg-bg p-4 ws:bg-panel">
              <dt className="sr-only">Client rating</dt>
              <dd>
                <a
                  href={COMPANY.socials.freelancer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="flex items-center gap-2">
                    <span className="display text-2xl text-fg">{COMPANY.reviews.rating}</span>
                    <span className="hidden gap-px text-star sm:flex" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={11} className="fill-current" />
                      ))}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-fg-3 transition-colors group-hover:text-accent">
                    {COMPANY.reviews.count} reviews on Freelancer
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </dd>
            </div>
            <div className="bg-bg p-4 ws:bg-panel">
              <dd className="display text-2xl text-fg">{STATS[0].value}</dd>
              <dt className="mt-1 text-xs text-fg-3">Projects delivered</dt>
            </div>
            <div className="bg-bg p-4 ws:bg-panel">
              <dd className="display text-2xl text-fg">{COMPANY.reviews.countries}</dd>
              <dt className="mt-1 text-xs text-fg-3">Countries served</dt>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 lg:pl-4"
        >
          <AgentConsole />
          <p className="mt-4 text-center text-xs text-fg-3 lg:text-left">
            A simulated run. Real agents stop at the same point and wait for a person.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
