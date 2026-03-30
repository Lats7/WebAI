'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, Zap, MapPin } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { STATS } from '@/lib/constants';

const differentiators = [
  {
    icon: Shield,
    title: 'Enterprise Expertise, Boutique Attention',
    description: 'Big-company experience without the big-company bureaucracy. Every engagement gets senior-level attention.',
  },
  {
    icon: Users,
    title: 'Senior Consultants, Not Juniors',
    description: 'You work directly with experienced professionals who\'ve solved problems like yours before.',
  },
  {
    icon: Zap,
    title: 'Flexible Engagement Models',
    description: 'Retainer, project-based, or ad-hoc. We fit your needs, not the other way around.',
  },
  {
    icon: MapPin,
    title: 'Australian-Based, Australian-Focused',
    description: 'Local team, local hours, local understanding. We\'re in your timezone and we get the market.',
  },
];

// Animated counter hook
function useCounter(target: string, isInView: boolean) {
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Extract numeric part and suffix (e.g., "50+" → 50, "+")
    const match = target.match(/^(\d+)(.*)/);
    if (!match) {
      setDisplay(target);
      return;
    }

    const end = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1600;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += end / steps;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setDisplay(`${Math.round(current)}${suffix}`);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return display;
}

function StatItem({ value, label, isInView }: { value: string; label: string; isInView: boolean }) {
  const display = useCounter(value, isInView);

  return (
    <div className="text-center sm:text-left">
      <div className="text-3xl md:text-4xl font-heading font-bold text-foreground tabular-nums">
        {display}
      </div>
      <div className="text-sm text-foreground-muted mt-1.5">{label}</div>
    </div>
  );
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* Left — Story */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-heading font-semibold text-sm tracking-wider uppercase"
          >
            Why WebAI
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-heading text-heading md:text-display-sm font-bold text-foreground"
          >
            Built Different.
            <br />
            <span className="gradient-text">On Purpose.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 space-y-4 text-foreground-secondary leading-relaxed text-lg"
          >
            <p>
              WebAI was founded on a simple observation: mid-market businesses deserve the same quality technology services that enterprises get, without the enterprise price tag or attitude.
            </p>
            <p>
              We&apos;re a boutique consultancy based in Melbourne, led by senior technologists who&apos;ve spent years in enterprise environments and decided to do things differently.
            </p>
          </motion.div>

          {/* Stats — animated counters */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-border"
          >
            {STATS.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                isInView={statsInView}
              />
            ))}
          </motion.div>
        </div>

        {/* Right — Differentiators */}
        <div className="grid gap-4">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ x: 6, transition: { duration: 0.25 } }}
              className="glass-card rounded-2xl p-6 lg:p-7 flex gap-5 group cursor-default"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
