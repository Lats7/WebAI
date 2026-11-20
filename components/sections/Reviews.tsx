'use client';

import { useState } from 'react';
import { ArrowUpRight, MapPin, Pause, Play, Star } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { COMPANY, FEATURED_REVIEW, TESTIMONIALS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type Testimonial = (typeof TESTIMONIALS)[number];

function Stars({ size = 13 }: { size?: number }) {
  return (
    <span className="flex gap-0.5 text-star" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={size} className="fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="card flex w-[19rem] shrink-0 flex-col justify-between p-6 sm:w-[23rem]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <Stars />
          <span className="chip block max-w-[12.5rem] truncate">{review.project}</span>
        </div>
        <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-fg">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-edge pt-4">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center border border-edge-strong font-mono text-xs font-medium text-accent mc:rounded-[3px] mc:bg-accent/10 ws:rounded-full ws:border-transparent ws:bg-accent/10"
          aria-hidden="true"
        >
          {initialsOf(review.author)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-fg">{review.author}</span>
          <span className="flex items-center gap-1 text-xs text-fg-3">
            <MapPin size={11} aria-hidden="true" />
            {review.location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ reviews, reverse, paused }: { reviews: readonly Testimonial[]; reverse?: boolean; paused: boolean }) {
  return (
    <div className="marquee py-2.5" data-reverse={reverse ? 'true' : 'false'} data-paused={paused ? 'true' : 'false'}>
      <div className="marquee-track">
        {reviews.map((review) => (
          <ReviewCard key={review.author} review={review} />
        ))}
      </div>
      {/* Duplicate track so the loop has no seam. Hidden from assistive tech. */}
      <div className="marquee-track" aria-hidden="true">
        {reviews.map((review) => (
          <ReviewCard key={review.author} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  const [paused, setPaused] = useState(false);
  const featured = TESTIMONIALS.find((review) => review.author === FEATURED_REVIEW.author) ?? TESTIMONIALS[0];
  const rest = TESTIMONIALS.filter((review) => review !== featured);
  const half = Math.ceil(rest.length / 2);

  return (
    <Section id="reviews" flush tint>
      <div className={cn(CELL_X, 'pb-4 pt-20 sm:pt-24 lg:pt-32')}>
        <SectionHeader
          code="06"
          eyebrow="Reviews"
          title={
            <>
              Rated {COMPANY.reviews.rating} by clients{' '}
              <span className="accent-word">in {COMPANY.reviews.countries} countries.</span>
            </>
          }
          description={`${COMPANY.reviews.count} verified reviews on Freelancer, covering AI builds, automation, web development, and server work. A selection is shown here, as the clients wrote them.`}
          aside={
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={COMPANY.socials.freelancer}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                All reviews
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                className="btn btn-secondary btn-sm motion-reduce:hidden"
              >
                {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                {paused ? 'Play' : 'Pause'}
              </button>
            </div>
          }
        />
      </div>

      {/* Featured review */}
      <Reveal className={cn(CELL_X, 'border-t border-edge py-14 lg:py-20')}>
        <figure className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <figcaption className="lg:col-span-3">
            <Stars size={15} />
            <p className="mt-4 font-medium text-fg">{featured.author}</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-fg-3">
              <MapPin size={12} aria-hidden="true" />
              {featured.location}
            </p>
            <p className="chip mt-4">{featured.project}</p>
          </figcaption>
          <blockquote className="statement text-[clamp(1.5rem,2.9vw,2.4rem)] lg:col-span-9">
            &ldquo;{FEATURED_REVIEW.lead}{' '}
            <span className="muted">{FEATURED_REVIEW.rest}&rdquo;</span>
          </blockquote>
        </figure>
      </Reveal>

      <div className="overflow-hidden border-t border-edge py-10 lg:py-12">
        <Row reviews={rest.slice(0, half)} paused={paused} />
        <Row reviews={rest.slice(half)} reverse paused={paused} />
      </div>
    </Section>
  );
}
