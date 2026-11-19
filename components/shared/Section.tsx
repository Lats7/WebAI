import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Tinted full-width band, used to give the page rhythm. */
  band?: boolean;
  className?: string;
}

export function Section({ id, children, band, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-24 lg:py-32', band && 'band', className)}>
      <div className="mx-auto max-w-site px-5 sm:px-8">{children}</div>
    </section>
  );
}
