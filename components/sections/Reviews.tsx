'use client';

import { useState } from 'react';
import { ArrowUpRight, MapPin, Pause, Play, Star } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { COMPANY, TESTIMONIALS } from '@/lib/constants';

type Testimonial = (typeof TESTIMONIALS)[number];

function ReviewCard({ review }: { review: Testimonial }) {
  const initials = review.author
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <figure className="card flex w-[19rem] shrink-0 flex-col justify-between p-6 sm:w-[23rem]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex gap-0.5 text-star" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={13} className="fill-current" aria-hidden="true" />
            ))}
          </span>
          <span className="chip block max-w-[12.5rem] truncate">{review.project}</span>
        </div>
        <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-fg">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-edge pt-4">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center border border-edge-strong font-mono text-xs font-medium text-accent mc:rounded-[2px] mc:bg-accent/10 ws:rounded-full ws:border-transparent ws:bg-accent/10"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-fg">{review.author}</span>
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
  const half = Math.ceil(TESTIMONIALS.length / 2);

  return (
    <section id="reviews" className="band relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <SectionHeader
          code="06"
          eyebrow="Reviews"
          title={
            <>
              Rated {COMPANY.reviews.rating} by clients{' '}
              <span className="accent-word">in {COMPANY.reviews.countries} countries.</span>
            </>
          }
          description={`${COMPANY.reviews.count} verified reviews on Freelancer, covering AI builds, automation, web development, and server work.`}
          aside={
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                className="btn btn-secondary btn-sm motion-reduce:hidden"
              >
                {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                {paused ? 'Play' : 'Pause'}
              </button>
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
            </div>
          }
        />
      </div>

      <Row reviews={TESTIMONIALS.slice(0, half)} paused={paused} />
      <Row reviews={TESTIMONIALS.slice(half)} reverse paused={paused} />
    </section>
  );
}
