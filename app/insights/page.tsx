import { ArticleCards } from '@/components/shared/ArticleCards';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { BUSINESS_ARTICLES, SAFETY_ARTICLES } from '@/content/articles';
import { breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata = pageMetadata({
  title: 'Guides on automation, IT, and safe AI',
  description:
    'Practical guides for small businesses: what to automate first, whether it will pay back, the IT underneath, and how to use AI safely. No sign-up.',
  path: '/insights',
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }])} />
      <PageHero
        eyebrow="Insights"
        trail={[{ name: 'Insights', path: '/insights' }]}
        title={
          <>
            Practical notes on automation, IT, <span className="accent-word">and using AI safely.</span>
          </>
        }
        lead={
          <p>
            Short guides you can act on the same day. No sign-up, nothing gated. Written by the person who does
            the work.
          </p>
        }
      />

      <Section id="automation" flush>
        <Reveal className={cn(CELL_X, 'py-12 lg:py-14')}>
          <Eyebrow code="01">Automation and IT</Eyebrow>
          <h2 className="display mt-6 text-[clamp(1.75rem,3.4vw,2.6rem)] text-fg">
            Where to start, and whether it pays.
          </h2>
        </Reveal>
        <ArticleCards articles={BUSINESS_ARTICLES} />
      </Section>

      <Section id="safety" flush tint>
        <Reveal className={cn(CELL_X, 'py-12 lg:py-14')}>
          <Eyebrow code="02">Using AI safely</Eyebrow>
          <h2 className="display mt-6 text-[clamp(1.75rem,3.4vw,2.6rem)] text-fg">
            Policy, Copilot, and keeping agents in check.
          </h2>
        </Reveal>
        <ArticleCards articles={SAFETY_ARTICLES} />
      </Section>
    </>
  );
}
