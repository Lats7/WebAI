'use client';

import { type KeyboardEvent, type MouseEvent } from 'react';
import { PanelsTopLeft, Radar } from 'lucide-react';
import { setTheme, useTheme, THEME_META, type Theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface ThemeSwitchProps {
  /** `full` shows labels, `compact` shows icons only. */
  size?: 'full' | 'compact';
  className?: string;
}

const OPTIONS: { value: Theme; Icon: typeof Radar }[] = [
  { value: 'mission', Icon: Radar },
  { value: 'workspace', Icon: PanelsTopLeft },
];

/**
 * Two-way style switch. The active state is drawn by CSS from the
 * `data-theme` attribute, so it is correct before React hydrates.
 */
export function ThemeSwitch({ size = 'full', className }: ThemeSwitchProps) {
  const theme = useTheme();

  function choose(next: Theme, event?: MouseEvent<HTMLButtonElement>) {
    // Keyboard activation reports 0,0, so fall back to the button centre.
    let origin: { x: number; y: number } | undefined;
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const fromPointer = event.clientX !== 0 || event.clientY !== 0;
      origin = fromPointer
        ? { x: event.clientX, y: event.clientY }
        : { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    setTheme(next, origin);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const next: Theme = theme === 'mission' ? 'workspace' : 'mission';
    setTheme(next);
    event.currentTarget.querySelector<HTMLButtonElement>(`button[data-value="${next}"]`)?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Site style"
      className={cn('theme-switch', className)}
      onKeyDown={onKeyDown}
    >
      <span className="theme-switch-thumb" aria-hidden="true" />
      {OPTIONS.map(({ value, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          data-value={value}
          aria-checked={theme === value}
          aria-label={size === 'compact' ? `${THEME_META[value].label} style` : undefined}
          tabIndex={theme === value ? 0 : -1}
          onClick={(event) => choose(value, event)}
        >
          <Icon size={14} strokeWidth={2} aria-hidden="true" />
          {size === 'full' && (
            <>
              <span className="sm:hidden" aria-hidden="true">
                {THEME_META[value].short}
              </span>
              <span className="max-sm:sr-only">{THEME_META[value].label}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
