'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Mesh gradient base — adds color depth behind the neural canvas */}
      <div className="mesh-gradient absolute inset-0" />

      {/* Floating orbs — large, slow, atmospheric */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[100px]"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px]"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.02] blur-[120px]"
        animate={{
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
