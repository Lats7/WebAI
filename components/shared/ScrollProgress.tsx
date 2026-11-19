'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32 });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent mc:shadow-[0_0_12px_rgb(var(--accent)/0.9)]"
    />
  );
}
