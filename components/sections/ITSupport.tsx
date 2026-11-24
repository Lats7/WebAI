import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ItemGrid } from '@/components/shared/ItemGrid';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { IT_SUPPORT } from '@/lib/constants';
import { cn } from '@/lib/utils';

/** IT support: what is covered, and the ways to buy it. The copy lives in IT_SUPPORT in lib/constants.ts. */
export function ITSupport() {
  return (
    <Section id="it-support" flush>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
        <SectionHeader
          code="03"
          eyebrow="IT support"
          title={
            <>
              IT that stays out of the way, <span className="accent-word">run by people who know it.</span>
            </>
          }
          description="We look after Microsoft 365 and Google Workspace, run the projects and migrations, and set security up properly from the start. Tidy IT is also what makes automation possible later."
        />
      </div>

      <ItemGrid items={IT_SUPPORT.covers} />

      <div className={cn(CELL_X, 'border-t border-edge py-12 lg:py-16')}>
        <Reveal>
          <p className="statement max-w-3xl text-[clamp(1.5rem,2.8vw,2.25rem)]">
            Take it as a plan or one job at a time.{' '}
            <span className="muted">Either way you get a price in writing before anything starts.</span>
          </p>
        </Reveal>
      </div>

      <ItemGrid items={IT_SUPPORT.ways} />

      <Reveal
        className={cn(
          CELL_X,
          'flex flex-col gap-4 border-t border-edge py-7 sm:flex-row sm:items-center sm:justify-between'
        )}
      >
        <p className="text-fg-2">Based in Melbourne. Working with businesses across Australia.</p>
        <Link href="/services/it-support" className="btn btn-secondary shrink-0 self-start sm:self-auto">
          See what IT support covers
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
