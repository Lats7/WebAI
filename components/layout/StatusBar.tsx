'use client';

import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { SECTIONS } from '@/lib/constants';
import { setTheme } from '@/lib/theme';
import { useActiveSection } from '@/lib/useActiveSection';

const SECTION_IDS = SECTIONS.map((section) => section.id);
const CELLS = 12;

const clock = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Melbourne',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/**
 * Mission Control status bar. Every readout is real: Melbourne time, the
 * section in view, and how far down the page the visitor is.
 */
export function StatusBar() {
  const active = useActiveSection(SECTION_IDS);
  const [time, setTime] = useState('--:--:--');
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(Math.round(value * 100));
  });

  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const index = Math.max(0, SECTIONS.findIndex((section) => section.id === active));
  const section = SECTIONS[index];
  const filled = Math.round((progress / 100) * CELLS);

  return (
    <div
      className="mc-only fixed inset-x-0 bottom-0 z-40 hidden h-8 items-center justify-between gap-6 border-t border-edge bg-bg/85 px-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-3 backdrop-blur-xl md:flex"
      aria-hidden="true"
    >
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-2 text-ok">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
          </span>
          Open for new projects
        </span>
        <span className="hidden lg:inline">
          MEL <span className="tabular-nums text-fg-2">{time}</span>
        </span>
      </div>

      <div className="flex items-center gap-5">
        <span>
          SEC{' '}
          <span className="tabular-nums text-fg-2">
            {String(index + 1).padStart(2, '0')}/{String(SECTIONS.length).padStart(2, '0')}
          </span>{' '}
          <span className="text-accent">{section.label}</span>
        </span>
        <span className="hidden items-center gap-2 lg:flex">
          <span className="flex gap-[2px]">
            {Array.from({ length: CELLS }).map((_, cell) => (
              <span
                key={cell}
                className={cell < filled ? 'h-2.5 w-[3px] bg-accent' : 'h-2.5 w-[3px] bg-line/20'}
              />
            ))}
          </span>
          <span className="w-9 text-right tabular-nums text-fg-2">{String(progress).padStart(3, '0')}%</span>
        </span>
        <button
          type="button"
          tabIndex={-1}
          onClick={(event) => setTheme('workspace', { x: event.clientX, y: event.clientY })}
          className="pointer-events-auto text-fg-3 underline decoration-edge-strong underline-offset-4 transition-colors hover:text-accent"
        >
          Mode: Mission Control
        </button>
      </div>
    </div>
  );
}
