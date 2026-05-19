'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
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

const CYCLE_COUNT = 4;

export default function Hero() {
  const t = useTranslations('hero');
  const [wordIdx, setWordIdx] = useState(0);

  const line1Words = t('headline1').split(' ');
  const line2Words = t('headline2').split(' ');
  const cycleWords = [t('cycle0'), t('cycle1'), t('cycle2'), t('cycle3')];

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % CYCLE_COUNT), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home-hero"
      data-section-label="Home"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateColumns: '44% 56%',
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
          backgroundImage: 'radial-gradient(circle, rgba(128,128,128,0.3) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          opacity: 0.85,
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
          padding: '120px 16px 80px 32px',
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
              {line1Words.map((word, i) => (
                <motion.span key={i} variants={WORD} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2 */}
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.22em', marginBottom: '0.08em' }}>
              {line2Words.map((word, i) => (
                <motion.span key={i} variants={WORD} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 3 — cycling italic accent word */}
            <motion.span variants={WORD} style={{ display: 'block', minWidth: '2ch' }} aria-live="polite" aria-atomic="true">
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
                  {cycleWords[wordIdx]}
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
          {t('subheadline')}
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
            <Link href="/contact" className="hero-btn-primary">
              {t('ctaPrimary')} <ArrowRight size={13} />
            </Link>
          </MagneticButton>

          <Link href="/services" className="hero-btn-secondary">
            {t('ctaSecondary')} <ArrowRight size={12} />
          </Link>
        </motion.div>

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
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          background-color: var(--accent);
          padding: 14px 28px;
          border-radius: 50px;
          transition: background-color 200ms ease;
        }
        .hero-btn-primary:hover { background-color: var(--accent-hover); }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          padding-bottom: 3px;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .hero-btn-secondary:hover {
          color: var(--text);
          border-color: var(--text);
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: 100dvh !important;
          }
          .hero-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
