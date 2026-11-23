import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { BriefCta } from '@/components/shared/BriefCta';
import { Faq } from '@/components/shared/Faq';
import { ItemGrid } from '@/components/shared/ItemGrid';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { COMPANY, READINESS_OFFER, READINESS_REVIEW } from '@/lib/constants';
import { absoluteUrl, breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const PATH = '/ai-readiness-review';

export const metadata = pageMetadata({
  title: 'AI Readiness Review',
  description:
    'A structured review of your environment, data, and controls before you roll out AI. You get a gap analysis ranked by risk, a usage policy, and a roadmap.',
  path: PATH,
});

const SITUATIONS = [
  {
    title: 'You are about to switch something on',
    description:
      'Copilot, a chatbot, or an agent is on the way, and you want to know what it will be able to see and do before it goes live.',
  },
  {
    title: 'Staff already use AI and there are no rules',
    description:
      'People are pasting work into AI tools. Nobody has written down which tools are approved or what must never go into them.',
  },
  {
    title: 'Someone has asked how you govern AI',
    description:
      'A customer questionnaire, an insurer, or your board wants an answer, and you want one that is true and written down.',
  },
];

const DELIVERABLES = [
  'A written gap analysis in plain language, with findings ranked by risk',
  'An AI usage policy your staff can follow',
  'A roadmap: what to fix first, and which AI projects to start with',
  'A walkthrough of the findings with the person who did the review',
];

const NOT_INCLUDED = [
  'A penetration test or a certification audit. If you need one, we will say so and help you scope it.',
  'A sales pitch for a build. You own the report and can act on it with anyone.',
];

const FAQS = [
  {
    question: 'Do we need to be using AI already?',
    answer:
      'No. The review is most useful just before you start, because it is cheaper to fix sharing and access problems before an assistant can see them. If you already use AI tools, we review what is in place.',
  },
  {
    question: 'We are a small business. Is this overkill?',
    answer:
      'The scope fits the business. For a small team it is mostly about three things: who can open what, which tools are approved, and what staff are told. Small businesses often get the most out of it, because nobody has had time to look.',
  },
  {
    question: 'Does it cover Microsoft 365 Copilot?',
    answer:
      'Yes. Copilot can surface anything a person already has access to, so files that were shared too widely are one of the most common findings before a rollout. The review looks at sharing and permissions for that reason.',
  },
  {
    question: 'What access do you need?',
    answer:
      'As little as the review requires, and read-only wherever possible. We agree the access list with you before we start, and you can remove it the day we finish.',
  },
  {
    question: 'What does it cost, and how long does it take?',
    answer:
      'Both depend on the size of your environment. The scope is fixed and the price is confirmed in writing before any work starts, so there are no surprises.',
  },
  {
    question: 'What happens after the review?',
    answer:
      'You own the report. You can act on it yourselves, hand it to your IT provider, or ask us to help with the fixes or the first build. There is no obligation either way.',
  },
];

export default function ReadinessReviewPage() {
  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: READINESS_REVIEW.title, path: PATH }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: READINESS_REVIEW.title,
          description: metadata.description,
          url: absoluteUrl(PATH),
          areaServed: { '@type': 'Country', name: 'Australia' },
          provider: { '@id': `${COMPANY.url}/#organisation` },
        }}
      />

      <PageHero
        eyebrow="Fixed-scope review"
        trail={[{ name: READINESS_REVIEW.title, path: PATH }]}
        title={
          <>
            AI Readiness Review. <span className="accent-word">Adopt AI without the blind spots.</span>
          </>
        }
        lead={
          <p>
            A structured look at your environment, your data, and your controls before AI gets access to them. You
            finish with a written gap analysis, a usage policy, and a roadmap.
          </p>
        }
        actions={
          <>
            <a href="#brief" className="btn btn-primary btn-lg">
              Ask about a review
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Link href="/tools/ai-readiness-check" className="btn btn-secondary btn-lg">
              Try the free self-check
            </Link>
          </>
        }
      />

      {/* Position */}
      <Section id="why" tint>
        <Reveal>
          <p className="statement max-w-5xl text-[clamp(1.6rem,3.3vw,2.75rem)]">
            We are pro-AI, and the fastest way to adopt it is to adopt it safely.{' '}
            <span className="muted">
              An assistant can read whatever its user can open. An agent can do whatever its account is allowed to
              do. The review finds out what that means for you before you find out the hard way.
            </span>
          </p>
        </Reveal>
      </Section>

      {/* Who it is for */}
      <Section id="who" flush>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="01">Who it is for</Eyebrow>
          <h2 className="display mt-7 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            Three situations <span className="accent-word">it is built for.</span>
          </h2>
        </Reveal>
        <ItemGrid items={SITUATIONS} numbered />
      </Section>

      {/* What we look at */}
      <Section id="scope" flush tint>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="02">What we look at</Eyebrow>
          <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] text-fg lg:col-span-7">
              Four steps, <span className="accent-word">one report.</span>
            </h2>
            <p className="text-base leading-relaxed text-fg-2 sm:text-lg lg:col-span-5 lg:pb-1.5">
              Each step answers a question you will be asked sooner or later, by a customer, an insurer, or your
              own staff.
            </p>
          </div>
        </Reveal>
        <ol className="grid border-t border-edge sm:grid-cols-2 lg:grid-cols-4">
          {READINESS_REVIEW.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                'border-edge px-5 py-10 sm:px-8 lg:px-9 lg:py-12',
                index > 0 && 'border-t sm:border-t-0',
                index % 2 === 1 && 'sm:border-l',
                index >= 2 && 'sm:border-t lg:border-t-0',
                index === 2 && 'lg:border-l'
              )}
            >
              <span className="display text-5xl tabular-nums text-fg-3/40 mc:text-fg-3/50">0{index + 1}</span>
              <h3 className="display mt-7 text-xl text-fg">{step.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* What you get */}
      <Section id="deliverables" flush>
        <div className="grid lg:grid-cols-12">
          <Reveal className={cn(CELL_X, 'py-14 lg:col-span-7 lg:py-20')}>
            <Eyebrow code="03">What you get</Eyebrow>
            <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
              Something you can <span className="accent-word">act on.</span>
            </h2>
            <ul className="mt-9 space-y-4">
              {DELIVERABLES.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-lg text-fg">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center bg-ok/15 text-ok mc:rounded-[3px] ws:rounded-full">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="label mt-12 text-fg-3">What it is not</h3>
            <ul className="mt-4 space-y-3">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-fg-2">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border border-edge-strong text-fg-3 mc:rounded-[3px] ws:rounded-full">
                    <X size={13} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Scope and price */}
          <div className="dot-grid border-t border-edge p-3 sm:p-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-10">
            <Reveal delay={0.08}>
              <div className="card bracketed p-7 shadow-pop sm:p-9">
                <p className="label text-signal ws:text-fg-3">Scope and price</p>
                {READINESS_OFFER.price ? (
                  <p className="display mt-5 text-5xl text-fg">{READINESS_OFFER.price}</p>
                ) : (
                  <p className="display mt-5 text-3xl text-fg">Fixed scope. Price in writing first.</p>
                )}
                <p className="mt-4 leading-relaxed text-fg-2">
                  {READINESS_OFFER.priceNote ??
                    'We size the review to your environment and confirm the price before any work starts.'}
                </p>
                {READINESS_OFFER.turnaround && (
                  <p className="mt-4 leading-relaxed text-fg-2">{READINESS_OFFER.turnaround}</p>
                )}
                <a href="#brief" className="btn btn-primary btn-lg mt-8 w-full">
                  Ask about a review
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <p className="mt-5 text-sm leading-relaxed text-fg-3">
                  Not sure yet? The{' '}
                  <Link href="/tools/ai-readiness-check" className="text-accent underline underline-offset-4">
                    free self-check
                  </Link>{' '}
                  takes two minutes, and nothing you enter leaves your browser unless you choose to send it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Questions */}
      <Section id="questions" flush tint>
        <Reveal className={cn(CELL_X, 'py-14 lg:py-20')}>
          <Eyebrow code="04">Questions</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
            What people ask <span className="accent-word">first.</span>
          </h2>
        </Reveal>
        <Faq items={FAQS} />
      </Section>

      <BriefCta
        source="ai-readiness-review"
        interest="AI Readiness Review"
        title={
          <>
            Ask about <span className="accent-word">a review.</span>
          </>
        }
        description="Tell us roughly how many people you have, what you run (Microsoft 365, Google Workspace, something else), and which AI tools are in use or planned."
      />
    </>
  );
}
