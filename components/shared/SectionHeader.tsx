import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/Reveal';

interface SectionHeaderProps {
  /** Two-digit section number, shown in Mission Control. */
  code: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional content aligned to the right of the heading on wide screens. */
  aside?: ReactNode;
  className?: string;
}

/**
 * Section intro. Mission Control draws it as a numbered rule across the page.
 * Workspace draws it as a soft pill above the heading.
 */
export function SectionHeader({ code, eyebrow, title, description, aside, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn('mb-12 lg:mb-16', className)}>
      <div className="mb-6 flex items-center gap-3">
        <span className="mc-only label text-accent">[ {code} ]</span>
        <span
          className={cn(
            'label mc:text-fg-2',
            'ws:inline-flex ws:items-center ws:gap-2 ws:rounded-full ws:border ws:border-edge ws:bg-panel ws:px-3 ws:py-1.5 ws:text-fg-2 ws:shadow-card'
          )}
        >
          <span className="ws-only h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
        <span className="mc-only h-px flex-1 bg-edge" aria-hidden="true" />
        <span className="mc-only label text-fg-3" aria-hidden="true">
          SEC.{code}
        </span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.6vw,3.5rem)] text-fg">{title}</h2>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">{description}</p>
          )}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </Reveal>
  );
}
