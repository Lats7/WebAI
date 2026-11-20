import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ArticleCards, formatDate } from '@/components/shared/ArticleCards';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { ARTICLES, getArticle } from '@/content/articles';
import { COMPANY } from '@/lib/constants';
import { absoluteUrl, breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const base = pageMetadata({
    title: article.meta.seoTitle,
    description: article.meta.description,
    path: `/insights/${slug}`,
  });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: article.meta.published },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { meta, Body } = article;
  const path = `/insights/${meta.slug}`;
  const others = ARTICLES.filter((item) => item.slug !== meta.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbData([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: meta.title, path },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: meta.title,
          description: meta.description,
          datePublished: meta.published,
          dateModified: meta.updated ?? meta.published,
          mainEntityOfPage: absoluteUrl(path),
          author: { '@type': 'Organization', name: COMPANY.fullName, url: COMPANY.url },
          publisher: { '@id': `${COMPANY.url}/#organisation` },
        }}
      />

      <PageHero
        compact
        eyebrow={meta.topic}
        trail={[{ name: 'Insights', path: '/insights' }]}
        title={meta.title}
        lead={
          <>
            <p>{meta.description}</p>
            <p className="label mt-5 text-fg-3">
              {formatDate(meta.published)} <span aria-hidden="true">·</span> {meta.minutes} min read
            </p>
          </>
        }
      />

      <section className="relative">
        <div className="frame">
          <div className="cell cell-marks grid lg:grid-cols-12">
            <article className={cn(CELL_X, 'py-14 lg:col-span-8 lg:py-20')}>
              <div className="prose-site">
                <Body />
              </div>
            </article>

            {/* What to do next, kept beside the article on wide screens */}
            <aside className="border-t border-edge lg:col-span-4 lg:border-l lg:border-t-0">
              <div className="px-5 py-10 sm:px-8 lg:sticky lg:top-24 lg:px-9 lg:py-12">
                <p className="label text-signal ws:text-fg-3">Where do you stand?</p>
                <h2 className="display mt-4 text-2xl text-fg">Take the two-minute self-check</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
                  Ten questions on how ready your business is to use AI safely. Nothing you enter leaves your
                  browser.
                </p>
                <Link href="/tools/ai-readiness-check" className="btn btn-primary mt-6 w-full">
                  Start the self-check
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/ai-readiness-review" className="btn btn-secondary mt-3 w-full">
                  AI Readiness Review
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <Section id="more" flush tint>
          <Reveal className={cn(CELL_X, 'py-14 lg:py-16')}>
            <Eyebrow>Keep reading</Eyebrow>
          </Reveal>
          <ArticleCards articles={others} />
        </Section>
      )}
    </>
  );
}
