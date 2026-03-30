'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { TESTIMONIALS, COMPANY } from '@/lib/constants';

const avatarColors = [
  'from-blue-500 to-cyan-400',
  'from-indigo-500 to-blue-400',
  'from-sky-500 to-teal-400',
  'from-blue-600 to-indigo-400',
  'from-cyan-500 to-blue-400',
  'from-blue-400 to-sky-400',
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.offsetWidth || 360;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth - 24 : cardWidth + 24,
      behavior: 'smooth',
    });
  };

  return (
    <SectionWrapper id="testimonials" fullWidth>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent font-heading font-semibold text-sm tracking-wider uppercase"
            >
              5.0 Rating — 18 Reviews
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-heading text-heading md:text-display-sm font-bold text-foreground"
            >
              Trusted Worldwide
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-foreground-secondary max-w-lg leading-relaxed"
            >
              Real reviews from real clients across 10+ countries.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Freelancer badge */}
            <a
              href={COMPANY.socials.freelancer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              View all on Freelancer
              <ExternalLink size={14} />
            </a>

            {/* Carousel controls */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-xl bg-background-tertiary border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-xl bg-background-tertiary border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrollable carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={`${testimonial.author}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.08, 0.5), duration: 0.5 }}
              className="glass-card rounded-3xl p-7 lg:p-8 flex flex-col justify-between min-w-[320px] max-w-[380px] flex-shrink-0 group hover:shadow-lg hover:shadow-accent/5 transition-shadow"
            >
              <div>
                {/* Decorative quote */}
                <div className="relative">
                  <span className="absolute -top-2 -left-1 text-5xl font-heading font-bold text-accent/10 leading-none select-none" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="text-foreground leading-relaxed pl-4 pt-3 text-[15px]">
                    {testimonial.quote}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-heading font-bold text-xs shadow-md flex-shrink-0`}>
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm text-foreground truncate">
                      {testimonial.author}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-foreground-muted">
                      <span className="truncate">{testimonial.project}</span>
                      <span className="text-border">·</span>
                      <span className="flex items-center gap-0.5 flex-shrink-0">
                        <MapPin size={10} />
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
