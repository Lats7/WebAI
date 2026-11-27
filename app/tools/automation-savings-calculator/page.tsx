import Link from 'next/link';
import { ArticleCards } from '@/components/shared/ArticleCards';
import { Faq } from '@/components/shared/Faq';
import { ItemGrid } from '@/components/shared/ItemGrid';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { SavingsCalculator } from '@/components/tools/SavingsCalculator';
import { ARTICLES } from '@/content/articles';
import { WEEKS_PER_YEAR } from '@/lib/savings';
import { breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const PATH = '/tools/automation-savings-calculator';

export const metadata = pageMetadata({
  title: 'Automation savings calculator',
  description:
    'Work out what one manual task costs your business in a year, and how much of it automation could give back. Free, no sign-up, and it runs in your browser.',
  path: PATH,
});

const LEFT_OUT = [
  {
    icon: 'Wrench',
    title: 'The cost to build',
    description:
      'A simple automation between two systems is a small job. An agent that works across several is a bigger one. You need a scope to know which you have.',
  },
  {
    icon: 'Receipt',
    title: 'The cost to run',
    description:
      'Software subscriptions, AI usage, and someone to look after it. Usually small next to wages, but never zero.',
  },
  {
    icon: 'Repeat',
    title: 'The time to change',
    description:
      'People need a week or two to trust a new way of working. The saving starts when they stop double-checking it.',
  },
];

/**
 * OWNER NOTE: these answers describe the tool and how you work. Check each
 * one is true for you. The third answer says what you do with an estimate
 * someone sends.
 */
const FAQS = [
  {
    question: 'How is the estimate worked out?',
    answer: `Hours a week, times the number of people, times ${WEEKS_PER_YEAR} working weeks, gives the hours the task takes in a year. Multiply by what an hour costs you for the yearly cost. The share software could do gives the part you could get back. It is your numbers multiplied together, nothing more.`,
  },
  {
    question: 'What should I use for the cost of an hour?',
    answer:
      'The wage plus super, leave, and other on-costs, not just the pay rate. If you are not sure, take the yearly cost of the role and divide it by the hours actually worked. For a task the owner does, use what an hour of your time is worth to the business.',
  },
  {
    question: 'What happens if I send the estimate?',
    answer:
      'We read it, look at the task, and reply with whether it is worth automating and roughly what it would take. Sometimes the answer is a simpler fix, and we will say so. There is no obligation.',
  },
  {
    question: 'Is the saving guaranteed?',
    answer:
      'No. The calculator shows what the hours are worth, not what a particular build will deliver. A real figure needs a look at the task: how often it varies, what systems it touches, and how much still needs a person.',
  },
  {
    question: 'Does saving hours mean cutting jobs?',
    answer:
      'Rarely, in a small business. The usual result is that the same people stop doing the work nobody wanted and spend the time on customers, sales, or the backlog. That is worth the same money, and it is why we count hours as well as dollars.',
  },
  {
    question: 'What happens to the numbers I enter?',
    answer:
      'They stay in your browser. Nothing is sent to us unless you choose to send the estimate with a message.',
  },
];

const GUIDES = ['what-to-automate-first', 'automation-payback'];

export default function SavingsCalculatorPage() {
  const guides = ARTICLES.filter((article) => GUIDES.includes(article.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Automation savings calculator', path: PATH }])}
      />
      <PageHero
        eyebrow="Free calculator"
        trail={[{ name: 'Automation savings calculator', path: PATH }]}
        title={
          <>
            What is that manual task <span className="accent-word">costing you a year?</span>
          </>
        }
        lead={
          <p>
            Pick one task your team does by hand. Enter the hours and what an hour costs, and see what it adds up
            to and how much could come back. No sign-up, and nothing you enter leaves your browser unless you
            choose to send it.
          </p>
        }
      />

      <section className="relative">
        <div className="frame">
          <div className="cell cell-marks dot-grid px-3 py-10 sm:px-6 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-5xl">
              <SavingsCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* What the number leaves out */}
      <Section id="left-out" flush tint>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="01">Read it honestly</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            What the number <span className="accent-word">leaves out.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            The calculator shows what the hours are worth. Whether a build is worth doing depends on three costs
            it cannot see. We work these out with you before anything is built, and we cover the method in{' '}
            <Link href="/insights/automation-payback" className="text-accent underline underline-offset-4">
              how to tell if automation will pay for itself
            </Link>
            .
          </p>
        </Reveal>
        <ItemGrid items={LEFT_OUT} />
      </Section>

      {/* Questions */}
      <Section id="questions" flush>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="02">Questions</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            About the <span className="accent-word">calculator.</span>
          </h2>
        </Reveal>
        <Faq items={FAQS} />
      </Section>

      {guides.length > 0 && (
        <Section id="reading" flush tint>
          <Reveal className={cn(CELL_X, 'py-14 lg:py-16')}>
            <Eyebrow>Guides on choosing what to automate</Eyebrow>
          </Reveal>
          <ArticleCards articles={guides} />
        </Section>
      )}
    </>
  );
}
