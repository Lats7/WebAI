import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Tinted cell, used to give the page rhythm. */
  tint?: boolean;
  /** Remove the default padding, for sections that manage their own cells. */
  flush?: boolean;
  className?: string;
}

/**
 * A section is one cell in the page frame: two rails either side, a rule on
 * top, and registration marks where they meet.
 */
export function Section({ id, children, tint, flush, className }: SectionProps) {
  return (
    <section id={id} className="relative">
      <div className="frame">
        <div
          className={cn(
            'cell cell-marks',
            tint && 'tint',
            !flush && 'px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32',
            className
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/** Shared horizontal padding for content inside a flush section. */
export const CELL_X = 'px-5 sm:px-8 lg:px-14';
