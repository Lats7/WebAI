import { type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CELL_X } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  /** Buttons under the lead paragraph. */
  actions?: ReactNode;
  /** Parent pages, for the breadcrumb trail. Home is added automatically. */
  trail?: { name: string; path: string }[];
  /** Use a narrower headline for long titles such as article headings. */
  compact?: boolean;
}

/** Top of every page other than the home page. The headline slides in opaque so it paints first. */
export function PageHero({ eyebrow, title, lead, actions, trail = [], compact }: PageHeroProps) {
  return (
    <section className="relative">
      <div className="frame">
        <div className={cn(CELL_X, 'pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40')}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="label flex flex-wrap items-center gap-1.5 text-fg-3">
              <li>
                <Link href="/" className="inline-block py-1 transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              {trail.map((item) => (
                <li key={item.path} className="flex items-center gap-1.5">
                  <ChevronRight size={12} aria-hidden="true" />
                  <Link href={item.path} className="inline-block py-1 transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="mt-7 grid gap-8 xl:grid-cols-12 xl:items-end xl:gap-10">
            <h1
              className={cn(
                'rise-solid display text-fg xl:col-span-8',
                compact ? 'text-[clamp(2.1rem,4.6vw,3.6rem)] !leading-[1.04]' : 'text-[clamp(2.5rem,6.2vw,4.9rem)]'
              )}
            >
              {title}
            </h1>
            <div className="rise xl:col-span-4 xl:pb-1.5" style={{ '--rise-delay': '0.12s' } as CSSProperties}>
              <div className="max-w-2xl text-lg leading-relaxed text-fg-2">{lead}</div>
              {actions && <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
