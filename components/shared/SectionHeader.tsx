'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

/**
 * Unified section intro — mono eyebrow, display title, optional description.
 * Keeps every section opening visually identical.
 */
export function SectionHeader({ eyebrow, title, description, align = 'center', className }: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={cn(isCenter ? 'text-center mb-16 lg:mb-20' : 'text-left', className)}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cn('eyebrow', !isCenter && 'eyebrow-left')}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-4 font-heading text-heading md:text-display-sm font-bold text-foreground tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={cn(
            'mt-4 text-foreground-secondary leading-relaxed',
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-lg'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
