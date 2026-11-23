import { ArticleCards } from '@/components/shared/ArticleCards';
import { Faq } from '@/components/shared/Faq';
import { ItemGrid } from '@/components/shared/ItemGrid';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { SelfCheck } from '@/components/tools/SelfCheck';
import { ARTICLES } from '@/content/articles';
import { emailConfigured } from '@/lib/apiGuard';
import { CHECK_BANDS, CHECK_QUESTIONS, MAX_SCORE } from '@/lib/selfCheck';
import { breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const PATH = '/tools/ai-readiness-check';

export const metadata = pageMetadata({
  title: 'Free AI readiness self-check',
  description:
    'Ten questions, two minutes. See how ready your business is to use AI safely and what to fix first. Free, no sign-up, and private unless you ask for a copy.',
  path: PATH,
});

/**
 * OWNER NOTE: these answers describe the tool and how you work. Check each one
 * is true for you. The scoring answer must match the bands in lib/selfCheck.ts.
 */
const FAQS = [
  {
    question: 'Who is the self-check for?',
    answer:
      'Owners and managers of small and mid-sized businesses that use AI tools, or are about to. You do not need to be technical to answer the questions. If you are not sure about one, pick the weaker answer, because not knowing is a finding too.',
  },
  {
    question: 'How is the score worked out?',
    answer: `Each of the ${CHECK_QUESTIONS.length} questions has three answers, worth 0, 1, or 2 points, so the total is out of ${MAX_SCORE}. ${CHECK_BANDS.map(
      (band) => `A score of ${band.range} is “${band.name}”.`
    ).join(' ')} Your result also lists the three weakest areas, with the first fix for each.`,
  },
  {
    question: 'Is this a security assessment?',
    answer:
      'No. It is a quick indicator based on your own answers, and it does not look at your systems. The AI Readiness Review checks the same areas in your real environment and gives you written findings.',
  },
  {
    question: 'What happens to my answers?',
    answer:
      'They stay in your browser. Nothing is sent to us unless you choose to send your result. There is no sign-up and no account.',
  },
  {
    question: 'Does it cover Microsoft Copilot and ChatGPT?',
    answer:
      'Yes. The questions are about how your business uses AI, not about one product. The ones on file sharing, sign-in security, and sensitive data matter most for an assistant such as Copilot, because it can draw on anything a person can already open.',
  },
  {
    question: 'We scored low. What should we do first?',
    answer:
      'Start with the three fixes on your result. They are ordered with the weakest areas first, and most of them take time, not money: a list of approved tools, a one-page policy, and multi-factor authentication on every account. If you want a second opinion, send us your result.',
  },
];

export default function SelfCheckPage() {
  // Decided when the site is built. The "email me my results" form appears
  // once the email service is set up (see lib/apiGuard.ts) and the site is redeployed.
  const canEmailResults = emailConfigured();

  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'AI readiness self-check', path: PATH }])} />
      <PageHero
        eyebrow="Free self-check"
        trail={[{ name: 'AI readiness self-check', path: PATH }]}
        title={
          <>
            How ready are you <span className="accent-word">to use AI safely?</span>
          </>
        }
        lead={
          <p>
            Ten questions, about two minutes. You get a score and the three things to fix first. No sign-up, and
            nothing you enter leaves your browser unless you choose to send it.
          </p>
        }
      />

      <section className="relative">
        <div className="frame">
          <div className="cell cell-marks dot-grid px-3 py-10 sm:px-6 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-3xl">
              <SelfCheck canEmailResults={canEmailResults} />
            </div>
          </div>
        </div>
      </section>

      {/* What it covers */}
      <Section id="areas" flush tint>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="01">What it checks</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            Ten areas that decide <span className="accent-word">whether AI is safe to use.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            The self-check asks one question about each. None of them is about the AI model itself. They are about
            the business around it: who can reach what, who approves what, and who would know if something went
            wrong.
          </p>
        </Reveal>
        <ol className="grid gap-px border-t border-edge bg-edge sm:grid-cols-2">
          {CHECK_QUESTIONS.map((question, index) => (
            <li key={question.area} className="bg-[rgb(var(--bg))]">
              <div className="flex h-full gap-5 px-5 py-7 sm:px-8 lg:px-9 lg:py-8">
                <span className="label pt-1 tabular-nums text-signal ws:text-fg-3" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="display text-lg text-fg sm:text-xl">{question.area}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">{question.why}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* How the score works */}
      <Section id="score" flush>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="02">How the score works</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            A score out of {MAX_SCORE}, <span className="accent-word">in three bands.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            Each answer is worth 0, 1, or 2 points. The score is a starting point for a conversation, not a pass
            mark. What matters more is the list of weak areas that comes with it.
          </p>
        </Reveal>
        <ItemGrid
          items={CHECK_BANDS.map((band) => ({ title: `${band.range}: ${band.name}`, description: band.summary }))}
          numbered
        />
      </Section>

      {/* Questions */}
      <Section id="questions" flush tint>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="03">Questions</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            About the <span className="accent-word">self-check.</span>
          </h2>
        </Reveal>
        <Faq items={FAQS} />
      </Section>

      {/* Reading */}
      <Section id="reading" flush>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-16')}>
          <Eyebrow>Guides for the most common gaps</Eyebrow>
        </Reveal>
        <ArticleCards articles={ARTICLES} />
      </Section>
    </>
  );
}
