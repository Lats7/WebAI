import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/Reveal';

interface EyebrowProps {
  /** Two-digit section number, shown in Mission Control. */
  code?: string;
  children: ReactNode;
  className?: string;
}

/** Small label above a heading. A numbered rule in mission, a pill in workspace. */
export function Eyebrow({ code, children, className }: EyebrowProps) {
  return (
    <p className={cn('flex items-center gap-3', className)}>
      {code && <span className="mc-only label text-signal">{code}</span>}
      {code && <span className="mc-only h-px w-8 bg-edge-strong" aria-hidden="true" />}
      <span
        className={cn(
          'label mc:text-fg-2',
          'ws:inline-flex ws:items-center ws:gap-2 ws:rounded-full ws:border ws:border-edge ws:bg-panel ws:px-3 ws:py-1.5 ws:text-fg-2 ws:shadow-card'
        )}
      >
        <span className="ws-only h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {children}
      </span>
    </p>
  );
}

interface SectionHeaderProps {
  code: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional controls shown under the description. */
  aside?: ReactNode;
  className?: string;
}

/** Section intro: heading on the left, supporting text aligned to its baseline on the right. */
export function SectionHeader({ code, eyebrow, title, description, aside, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn('mb-14 lg:mb-20', className)}>
      <Eyebrow code={code}>{eyebrow}</Eyebrow>
      <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 className="display text-[clamp(2.25rem,5.4vw,4.25rem)] text-fg lg:col-span-7">{title}</h2>
        {(description || aside) && (
          <div className="lg:col-span-5 lg:pb-1.5">
            {description && <p className="text-base leading-relaxed text-fg-2 sm:text-lg">{description}</p>}
            {aside && <div className="mt-6">{aside}</div>}
          </div>
        )}
      </div>
    </Reveal>
  );
}
