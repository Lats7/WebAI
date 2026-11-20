'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { PAGES, SECTIONS } from '@/lib/constants';
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

/** The page the visitor is on, matched by the longest path so nested pages resolve. */
function pageLabel(pathname: string) {
  const match = [...PAGES]
    .sort((a, b) => b.href.length - a.href.length)
    .find((page) => pathname === page.href || (page.href !== '/' && pathname.startsWith(`${page.href}/`)));
  return match?.label ?? 'Page';
}

/**
 * Mission Control status bar. Every readout is real: Melbourne time, where the
 * visitor is on the site, and how far down the page they are.
 */
export function StatusBar() {
  const pathname = usePathname();
  const active = useActiveSection(SECTION_IDS, pathname);
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

  const onHome = pathname === '/';
  const index = Math.max(0, SECTIONS.findIndex((section) => section.id === active));
  const filled = Math.round((progress / 100) * CELLS);

  return (
    <div
      className="mc-only fixed inset-x-0 bottom-0 z-40 hidden h-8 items-center justify-between gap-6 border-t border-edge bg-bg/85 px-5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-fg-3 backdrop-blur-xl md:flex"
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
        <span className="hidden xl:inline">
          <span className="text-fg-2">
            <span className="mac-only">⌘</span>
            <span className="pc-only">Ctrl </span>K
          </span>{' '}
          Command menu
        </span>
      </div>

      <div className="flex items-center gap-5">
        {onHome ? (
          <span>
            SEC{' '}
            <span className="tabular-nums text-fg-2">
              {String(index + 1).padStart(2, '0')}/{String(SECTIONS.length).padStart(2, '0')}
            </span>{' '}
            <span className="text-accent">{SECTIONS[index].label}</span>
          </span>
        ) : (
          <span>
            Page <span className="text-accent">{pageLabel(pathname)}</span>
          </span>
        )}
        <span className="hidden items-center gap-2 lg:flex">
          <span className="flex gap-[2px]">
            {Array.from({ length: CELLS }).map((_, cell) => (
              <span key={cell} className={cell < filled ? 'h-2.5 w-[3px] bg-accent' : 'h-2.5 w-[3px] bg-line/20'} />
            ))}
          </span>
          <span className="w-9 text-right tabular-nums text-fg-2">{String(progress).padStart(3, '0')}%</span>
        </span>
        <button
          type="button"
          tabIndex={-1}
          onClick={(event) => setTheme('workspace', { x: event.clientX, y: event.clientY })}
          className="text-fg-3 underline decoration-edge-strong underline-offset-4 transition-colors hover:text-accent"
        >
          Mode: Mission Control
        </button>
      </div>
    </div>
  );
}
