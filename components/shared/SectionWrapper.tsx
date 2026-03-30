'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({ children, id, className, fullWidth }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'py-section lg:py-section-lg',
        !fullWidth && 'mx-auto max-w-7xl px-6 lg:px-8',
        className
      )}
    >
      {children}
    </motion.section>
  );
}
