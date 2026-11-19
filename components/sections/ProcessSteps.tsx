'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/** Four stages in a row. A line fills across the top as the visitor scrolls past. */
export function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol ref={ref} className="relative grid border-t border-edge sm:grid-cols-2 lg:grid-cols-4">
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -top-px z-10 h-px origin-left bg-accent mc:shadow-[0_0_14px_rgb(var(--accent))]"
      />
      {PROCESS_STEPS.map((step, index) => (
        <li
          key={step.number}
          className={cn(
            'spotlight flex flex-col border-edge px-5 py-10 sm:px-8 lg:px-9 lg:py-12',
            index > 0 && 'border-t sm:border-t-0',
            index % 2 === 1 && 'sm:border-l',
            index >= 2 && 'sm:border-t lg:border-t-0',
            index === 2 && 'lg:border-l'
          )}
        >
          <div className="flex items-baseline justify-between">
            <span className="display text-5xl tabular-nums text-fg-3/40 mc:text-fg-3/50">{step.number}</span>
            <span className="mc-only label text-signal" aria-hidden="true">
              T+{index}
            </span>
          </div>
          <h3 className="display mt-8 text-2xl text-fg">{step.title}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">{step.description}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-7">
            {step.outputs.map((output) => (
              <li key={output} className="chip">
                {output}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
