'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import ServiceTriptych from './ServiceTriptych';
import MagneticButton from './MagneticButton';

/* ── Animation variants ───────────────────────────────────── */
const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const WORD = {
  hidden:  { y: 28, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.65, ease: EASE } },
};

const FADE_UP = {
  hidden:  { y: 20, opacity: 0 },
  visible: (delay: number) => ({
    y: 0, opacity: 1,
    transition: { duration: 0.65, ease: EASE, delay },
  }),
};

/* ── Headline words ───────────────────────────────────────── */
const LINE1_PRE  = ['We', 'build', 'what'];
const LINE2      = ['your', 'business', 'needs.'];
const CYCLE_WORDS = ['Faster.', 'Smarter.', 'Cleaner.', 'Automated.'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gridTemplateRows: '1fr',
        alignItems: 'stretch',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
      className="hero-grid"
    >
      {/* ── Left panel — dot grid ─────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '55%',
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />

      {/* ── Ambient crimson glow — left panel ────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '-80px',
          width: '640px',
          height: '640px',
          background: 'radial-gradient(circle, rgba(61,82,230,0.055) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Left column — content ────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 48px 80px 32px',
          maxWidth: '680px',
        }}
      >
        {/* Animated headline */}
        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(48px, 5.5vw, 88px)',
            fontWeight: 500,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginBottom: '28px',
          }}
        >
          <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate="visible"
            style={{ display: 'block' }}
          >
            {/* Line 1 */}
            <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.22em', marginBottom: '0.04em' }}>
              {LINE1_PRE.map((word, i) => (
                <motion.span key={i} variants={WORD} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2 */}
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.22em', marginBottom: '0.08em' }}>
              {LINE2.map((word, i) => (
                <motion.span key={i} variants={WORD} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 3 — cycling italic crimson word */}
            <motion.span variants={WORD} style={{ display: 'block', minWidth: '2ch' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{
                    display: 'inline-block',
                    color: 'var(--accent)',
                    fontStyle: 'italic',
                  }}
                >
                  {CYCLE_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.div>
        </h1>

        {/* Sub-headline */}
        <motion.p
          variants={FADE_UP}
          custom={0.85}
          initial="hidden"
          animate="visible"
          className="font-body"
          style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            marginBottom: '44px',
          }}
        >
          Obsidia builds custom automations, websites, and applications for businesses that are serious about how they operate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={FADE_UP}
          custom={1.05}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}
        >
          <MagneticButton strength={0.22}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#fff',
                textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                padding: '14px 28px',
                transition: 'background-color 200ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.backgroundColor = 'var(--accent-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.backgroundColor = 'var(--accent)'; }}
            >
              Start a Project <ArrowRight size={13} />
            </Link>
          </MagneticButton>

          <Link
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '3px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = 'var(--text)';
              el.style.borderColor = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = 'var(--text-secondary)';
              el.style.borderColor = 'var(--border)';
            }}
          >
            Our Services <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* ── Activity badge ────────────────────────────── */}
        <motion.div
          variants={FADE_UP}
          custom={1.35}
          initial="hidden"
          animate="visible"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            padding: '10px 18px',
            width: 'fit-content',
          }}
        >
          {/* Pulsing ring + green dot */}
          <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                backgroundColor: '#22C55E', zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute', inset: '-5px', borderRadius: '50%',
                border: '1px solid #22C55E',
                animation: 'pulseRing 2.2s ease-out infinite',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.06em', color: 'var(--text-muted)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--text)', fontWeight: 600 }}>
              3
            </span>{' '}
            active projects · Live since 2024
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          style={{
            position: 'absolute', bottom: '32px', left: '32px',
            display: 'flex', alignItems: 'center', gap: '10px',
            animation: 'scrollBounce 2.6s ease-in-out infinite',
          }}
        >
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--border-strong)' }} />
          <span style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Scroll
          </span>
        </div>
      </div>

      {/* ── Right column — ServiceTriptych ───────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ position: 'relative', height: '100%' }}
      >
        <ServiceTriptych />
      </motion.div>

      {/* ── Responsive styles ──────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: 100vh !important;
          }
          .hero-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
