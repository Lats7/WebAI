'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { TESTIMONIALS } from '@/lib/constants';

// Distinct hues for each avatar — stays within the blue palette
const avatarColors = [
  'from-blue-500 to-cyan-400',
  'from-indigo-500 to-blue-400',
  'from-sky-500 to-teal-400',
];

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16 lg:mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-heading font-semibold text-sm tracking-wider uppercase"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-heading text-heading md:text-display-sm font-bold text-foreground"
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-foreground-secondary max-w-xl mx-auto leading-relaxed"
        >
          Don&apos;t take our word for it — hear from the businesses we&apos;ve helped.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="glass-card rounded-3xl p-8 lg:p-9 flex flex-col justify-between group hover:shadow-lg hover:shadow-accent/5"
          >
            <div>
              {/* Decorative quote mark */}
              <div className="relative">
                <span className="absolute -top-3 -left-1 text-6xl font-heading font-bold text-accent/10 leading-none select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-foreground leading-relaxed pl-4 pt-4">
                  {testimonial.quote}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                {/* Avatar with distinct color */}
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-heading font-bold text-sm shadow-md`}>
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-foreground-muted">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
