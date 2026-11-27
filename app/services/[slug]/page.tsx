import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ArticleCards } from '@/components/shared/ArticleCards';
import { BriefCta } from '@/components/shared/BriefCta';
import { Faq } from '@/components/shared/Faq';
import { ItemGrid } from '@/components/shared/ItemGrid';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { SecurityTracks } from '@/components/sections/SecurityTracks';
import { ARTICLES } from '@/content/articles';
import { COMPANY, FRAMEWORKS } from '@/lib/constants';
import { absoluteUrl, breadcrumbData, pageMetadata } from '@/lib/seo';
import { SERVICE_PAGES, getServicePage } from '@/lib/servicePages';
import { cn } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${page.slug}`,
  });
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const path = `/services/${page.slug}`;
  const related = ARTICLES.filter((article) => page.related.includes(article.slug));

  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: page.name, path }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.name,
          description: page.metaDescription,
          url: absoluteUrl(path),
          areaServed: { '@type': 'Country', name: 'Australia' },
          provider: { '@id': `${COMPANY.url}/#organisation` },
        }}
      />

      <PageHero
        eyebrow={page.eyebrow}
        trail={[{ name: page.name, path }]}
        title={
          <>
            {page.title[0]} <span className="accent-word">{page.title[1]}</span>
          </>
        }
        lead={<p>{page.lead}</p>}
        actions={
          <>
            <a href="#brief" className="btn btn-primary btn-lg">
              Start a brief
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Link href={page.secondary?.href ?? '/ai-readiness-review'} className="btn btn-secondary btn-lg">
              {page.secondary?.label ?? 'AI Readiness Review'}
            </Link>
          </>
        }
      />

      {/* The position, in one statement */}
      <Section id="position" tint>
        <Reveal>
          <p className="statement max-w-5xl text-[clamp(1.6rem,3.3vw,2.75rem)]">
            {page.statement[0]} <span className="muted">{page.statement[1]}</span>
          </p>
        </Reveal>
      </Section>

      {page.groups.map((group, index) => (
        <Section key={group.heading} id={group.id ?? `group-${index + 1}`} flush>
          <Reveal className={cn(CELL_X, 'scroll-mt-24 py-14 lg:py-20')}>
            <Eyebrow code={String(index + 1).padStart(2, '0')}>What we do</Eyebrow>
            <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] text-fg lg:col-span-7">{group.heading}</h2>
              <p className="text-base leading-relaxed text-fg-2 sm:text-lg lg:col-span-5 lg:pb-1.5">{group.intro}</p>
            </div>
          </Reveal>
          <ItemGrid items={group.items} />
        </Section>
      ))}

      {page.showcase === 'security-samples' && (
        <Section id="samples" flush tint>
          <Reveal className={cn(CELL_X, 'pb-4 pt-14 lg:pt-20')}>
            <Eyebrow>What you get</Eyebrow>
            <div className="mb-10 mt-7 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] text-fg lg:col-span-7">
                Evidence you can <span className="accent-word">hand to whoever asks.</span>
              </h2>
              <p className="text-base leading-relaxed text-fg-2 sm:text-lg lg:col-span-5 lg:pb-1.5">
                Each piece of work ends in something you can read and reuse. These are samples of the kind of
                output, across the three disciplines.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <SecurityTracks samplesOnly />
          </Reveal>
          <Reveal
            className={cn(
              CELL_X,
              'flex flex-col gap-4 border-t border-edge py-7 lg:flex-row lg:items-center lg:gap-10'
            )}
          >
            <p className="label shrink-0 text-fg-3">Frameworks we work to</p>
            <ul className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((framework) => (
                <li key={framework} className="chip">
                  {framework}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}

      {/* How an engagement runs */}
      <Section id="approach" flush tint>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow>Approach</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            How an engagement <span className="accent-word">runs.</span>
          </h2>
        </Reveal>
        <ProcessSteps />
      </Section>

      {/* Questions */}
      <Section id="questions" flush>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            What people ask <span className="accent-word">first.</span>
          </h2>
        </Reveal>
        <Faq items={page.faqs} />
      </Section>

      {related.length > 0 && (
        <Section id="reading" flush>
          <Reveal className={cn(CELL_X, 'py-14 lg:py-16')}>
            <Eyebrow>Related reading</Eyebrow>
          </Reveal>
          <ArticleCards articles={related} />
        </Section>
      )}

      <BriefCta
        source={`service:${page.slug}`}
        interest={page.interest}
        title={
          <>
            {page.cta.title[0]} <span className="accent-word">{page.cta.title[1]}</span>
          </>
        }
        description={page.cta.description}
      />
    </>
  );
}
