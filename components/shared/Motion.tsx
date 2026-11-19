'use client';

import { MotionConfig } from 'framer-motion';
import { type ReactNode } from 'react';
import { useSpotlight } from '@/lib/useSpotlight';

/**
 * Page-level client behaviour: every framer-motion animation respects the
 * visitor's reduced-motion setting, and spotlight surfaces follow the pointer.
 */
export function Motion({ children }: { children: ReactNode }) {
  useSpotlight();
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
