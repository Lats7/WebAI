import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { type ArticleMeta } from '@/content/articles/types';
import { cn } from '@/lib/utils';

const dateFormat = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

/** A ruled row of article links. */
export function ArticleCards({ articles }: { articles: readonly ArticleMeta[] }) {
  return (
    <ul className={cn('grid gap-px border-t border-edge bg-edge', articles.length > 1 && 'md:grid-cols-2')}>
      {articles.map((article, index) => (
        <li key={article.slug} className="bg-[rgb(var(--bg))]">
          <Reveal delay={(index % 2) * 0.06} className="h-full">
            <article className="spotlight group relative flex h-full flex-col px-5 py-9 sm:px-8 lg:px-12 lg:py-11">
              <div className="flex items-center justify-between gap-4">
                <span className="label text-signal ws:text-fg-3">{article.topic}</span>
                <ArrowUpRight
                  size={18}
                  className="text-fg-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <h3 className="display mt-6 text-2xl text-fg sm:text-[1.7rem]">
                <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-3 leading-relaxed text-fg-2">{article.description}</p>
              <p className="label mt-auto pt-7 text-fg-3">
                {formatDate(article.published)} <span aria-hidden="true">·</span> {article.minutes} min read
              </p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
