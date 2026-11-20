import { ICONS } from '@/components/shared/icons';
import { Reveal } from '@/components/shared/Reveal';
import { cn } from '@/lib/utils';

interface ItemGridProps {
  items: readonly { icon?: string; title: string; description: string }[];
  /** Number the cells instead of showing icons. */
  numbered?: boolean;
}

/** A ruled grid of short points. Hairlines come from the gap between cells. */
export function ItemGrid({ items, numbered }: ItemGridProps) {
  // Column counts are chosen so no row is left with an empty cell.
  const columns =
    items.length === 3
      ? 'md:grid-cols-3'
      : items.length % 3 === 0
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2 lg:grid-cols-4';
  return (
    <ul className={cn('grid gap-px border-t border-edge bg-edge', columns)}>
      {items.map((item, index) => {
        const Icon = item.icon ? ICONS[item.icon] : undefined;
        return (
          <li key={item.title} className="bg-[rgb(var(--bg))]">
            <Reveal delay={(index % 4) * 0.06} className="h-full">
              <div className="spotlight h-full px-5 py-9 sm:px-8 lg:px-9 lg:py-11">
                <div className="flex items-center justify-between">
                  {Icon ? (
                    <Icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  ) : (
                    <span />
                  )}
                  {numbered && (
                    <span className="label tabular-nums text-signal ws:text-fg-3">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>
                <h3 className="display mt-6 text-xl text-fg">{item.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-2">{item.description}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
