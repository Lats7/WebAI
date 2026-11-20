import { ArticleCards } from '@/components/shared/ArticleCards';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Section } from '@/components/shared/Section';
import { ARTICLES } from '@/content/articles';
import { breadcrumbData, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Insights on using AI safely',
  description:
    'Practical guides on adopting AI safely: usage policies, Copilot readiness, prompt injection, and giving agents the right access. Written by a security engineer.',
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
            Practical notes on <span className="accent-word">using AI safely.</span>
          </>
        }
        lead={
          <p>
            Short guides you can act on the same day. No sign-up, nothing gated. Written by the person who does
            the work.
          </p>
        }
      />
      <Section id="articles" flush>
        <ArticleCards articles={ARTICLES} />
      </Section>
    </>
  );
}
