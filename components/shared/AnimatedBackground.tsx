'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Mesh gradient base — colour depth behind the constellation canvas */}
      <div className="mesh-gradient absolute inset-0" />

      {/* Engineering grid — fades out radially from the headline */}
      <div className="bg-grid absolute inset-0" />

      {/* Two slow ambient glows — barely-there atmosphere */}
      <motion.div
        className="absolute top-[15%] left-[12%] w-[520px] h-[520px] rounded-full bg-blue-500/[0.05] blur-[120px]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[10%] w-[440px] h-[440px] rounded-full bg-cyan-500/[0.04] blur-[120px]"
        animate={{ opacity: [1, 0.55, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Horizon line — thin accent glow anchoring the fold */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[50%] h-48 rounded-[100%] bg-accent/[0.06] blur-[60px]" />
    </div>
  );
}
