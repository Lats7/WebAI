import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ICONS } from '@/components/shared/icons';
import { cn } from '@/lib/utils';

/**
 * Security and AI readiness as one vertical. The home page shows a summary of
 * each part and links to its page, where the detail lives.
 */
const PARTS = [
  {
    icon: 'ListChecks',
    title: 'AI Readiness Review',
    href: '/ai-readiness-review',
    description:
      'A structured review before you roll out AI: what it will be able to see, what could go wrong, and what to fix first.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Cyber security',
    href: '/services/cyber-security',
    description:
      'Hardening and monitoring for the systems you already own, and the governance to prove it: Essential Eight, ASD Essentials, and ISO 27001.',
  },
  {
    icon: 'Bug',
    title: 'AI security testing',
    href: '/services/ai-security',
    description:
      'We test what your chatbot, Copilot, or agent can be talked into, and what it can reach, before someone else does.',
  },
];

export function Security() {
  return (
    <Section id="security" flush>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
        <SectionHeader
          code="04"
          eyebrow="Security and AI readiness"
          title={
            <>
              Secure by default, <span className="accent-word">without slowing you down.</span>
            </>
          }
          description="Security is part of how we build and support everything above, not a gate at the end. When you need it on its own, we check that AI is safe to switch on, harden what you have, and help you prove it to customers, insurers, and auditors."
        />
      </div>

      <div className="grid border-t border-edge md:grid-cols-3">
        {PARTS.map((part, index) => {
          const Icon = ICONS[part.icon];
          return (
            <Reveal
              key={part.href}
              delay={index * 0.08}
              className={cn('border-edge', index > 0 && 'border-t md:border-l md:border-t-0')}
            >
              <article className="spotlight group relative flex h-full flex-col px-5 py-9 sm:px-8 lg:px-10 lg:py-11">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center border border-edge-strong text-accent mc:rounded-[3px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-fg-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="display mt-7 text-2xl text-fg">
                  <Link href={part.href} className="after:absolute after:inset-0 after:content-['']">
                    {part.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-fg-2">{part.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        className={cn(
          CELL_X,
          'flex flex-col gap-4 border-t border-edge py-7 sm:flex-row sm:items-center sm:justify-between'
        )}
      >
        <p className="text-fg-2">Not sure where you stand? The free self-check takes two minutes.</p>
        <Link href="/tools/ai-readiness-check" className="btn btn-secondary shrink-0 self-start sm:self-auto">
          Take the self-check
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
