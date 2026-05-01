'use client';

import { motion } from 'framer-motion';
import ClickSpark from './components/ClickSpark';

export default function Template({ children }: { children: React.ReactNode }) {
  const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

  return (
    <>
      {/* Crimson full-height bar — sweeps scaleX 1→0 in 250ms */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--accent)',
          transformOrigin: 'right center',
          zIndex: 99998,
          pointerEvents: 'none',
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      />

      {/* Page content — fades in 200ms with 150ms delay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut', delay: 0.15 }}
      >
        <ClickSpark
          sparkColor="#3D52E6"
          sparkSize={20}
          sparkRadius={35}
          sparkCount={11}
          duration={400}
        >
          {children}
        </ClickSpark>
      </motion.div>
    </>
  );
}
