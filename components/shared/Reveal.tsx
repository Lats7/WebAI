import { type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait after the element scrolls into view. */
  delay?: number;
  className?: string;
}

/**
 * Fades content up once as it scrolls into view.
 *
 * This renders plain markup. The hidden state is CSS that applies only when
 * JavaScript is running (`.js [data-reveal]`), and one observer for the whole
 * page (RevealObserver) switches each element on. Content is visible with
 * JavaScript off, and nothing here delays the first paint.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const style = delay ? ({ '--reveal-delay': `${delay}s` } as CSSProperties) : undefined;
  return (
    <div data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
