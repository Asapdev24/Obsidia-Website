'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_THRESHOLD = 320;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? scrollY / maxScroll : 0;
    setProgress(pct);
    setVisible(scrollY > SHOW_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const progressDeg = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.72, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.72, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.91 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '24px',
            zIndex: 89,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(6,8,15,0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            outline: 'none',
          }}
        >
          {/* SVG progress ring */}
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotate(-90deg)',
              pointerEvents: 'none',
            }}
            aria-hidden
          >
            {/* Track */}
            <circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
            {/* Progress arc */}
            <motion.circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 120ms linear' }}
            />
          </svg>

          {/* Arrow icon */}
          <ArrowUp
            size={14}
            color="rgba(220,225,248,0.82)"
            strokeWidth={2}
            style={{ position: 'relative', zIndex: 1 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
