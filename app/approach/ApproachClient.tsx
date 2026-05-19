'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* scroll direction — used for stagger reversal in Principles */
function useScrollDirection() {
  const [dir, setDir] = useState<'down' | 'up'>('down');
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDir(y > lastY.current ? 'down' : 'up');
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return dir;
}

/* ── Types ────────────────────────────────────────────────── */
type Phase = {
  number: string; name: string; id: string;
  descriptor: string; deliverables: string[];
  body: string; image: string;
};

type Principle = {
  number: string; title: string; body: string; image: string;
};

/* ── Principle row ────────────────────────────────────────── */
function PrincipleRow({ principle, index, scrollDir, total }: {
  principle: Principle; index: number;
  scrollDir: 'down' | 'up'; total: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const spotX = useTransform(mouseX, v => v - 200);
  const spotY = useTransform(mouseY, v => v - 200);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-200);
    mouseY.set(-200);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={rowRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      custom={{ index, scrollDir, total }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: ({ index: i, scrollDir: dir, total: n }: { index: number; scrollDir: string; total: number }) => ({
          opacity: 1, y: 0,
          transition: {
            duration: 0.65, ease: EASE,
            delay: dir === 'up' ? (n - 1 - i) * 0.12 + 0.1 : i * 0.12 + 0.15,
          },
        }),
        hovered: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      whileHover="hovered"
      viewport={{ once: false, amount: 0.25 }}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}
    >
      {/* Static divider */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 1, backgroundColor: 'var(--dark-border)', zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Accent line — grows on hover */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 0, opacity: 0 },
          hovered: { scaleX: 1, opacity: 0.75 },
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          backgroundColor: 'var(--accent)', transformOrigin: 'center', zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Background image — fades in on hover */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.55 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${principle.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(55%) brightness(0.28)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Cursor spotlight */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0,
          x: spotX, y: spotY,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(61,82,230,0.1) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div
        className="principle-row-inner"
        style={{
          position: 'relative', zIndex: 3,
          display: 'grid',
          gridTemplateColumns: '88px 2fr 1.5fr',
          gap: '48px',
          padding: '22px 0',
          alignItems: 'center',
        }}
      >
        <motion.div
          variants={{
            hidden: { color: 'rgba(255,255,255,0.04)' },
            visible: { color: 'rgba(255,255,255,0.055)' },
            hovered: { color: 'rgba(61,82,230,0.65)' },
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 'clamp(72px, 9vw, 108px)',
            fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {principle.number}
        </motion.div>

        <div>
          <motion.h3
            className="font-heading"
            variants={{
              hidden: { color: 'var(--dark-text)' },
              visible: { color: 'var(--dark-text)' },
              hovered: { color: '#ffffff' },
            }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.06,
            }}
          >
            {principle.title}
          </motion.h3>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 0, x: -10 },
              hovered: { opacity: 1, x: 0 },
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 24, height: 1, backgroundColor: 'var(--accent)' }} />
            <ArrowRight size={12} style={{ color: 'var(--accent)' }} />
          </motion.div>
        </div>

        <motion.p
          className="font-body"
          variants={{
            hidden: { color: 'var(--dark-muted)' },
            visible: { color: 'var(--dark-muted)' },
            hovered: { color: 'rgba(220,225,245,0.78)' },
          }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: 15, lineHeight: 1.88 }}
        >
          {principle.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Phase image — Framer Motion entry + grayscale-to-color hover ── */
function PhaseImage({ phase, from }: { phase: Phase; from: 'left' | 'right' }) {
  const [hov, setHov] = useState(false);
  const initX = from === 'right' ? 40 : -40;
  return (
    <motion.div
      initial={{ opacity: 0, x: initX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}
    >
      <img
        src={phase.image}
        alt={`${phase.name} phase — ${phase.descriptor}`}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          filter: hov
            ? 'grayscale(0%) brightness(0.95) contrast(1.04)'
            : 'grayscale(55%) brightness(0.7)',
          transform: hov ? 'scale(1.04)' : 'scale(1.0)',
          transition: 'filter 1s cubic-bezier(0.22,1,0.36,1), transform 1.2s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      {/* Accent frame traces the border on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        boxShadow: hov
          ? 'inset 0 0 0 1px rgba(61,82,230,0.55)'
          : 'inset 0 0 0 0px rgba(61,82,230,0)',
        transition: 'box-shadow 600ms ease',
        pointerEvents: 'none', zIndex: 2,
      }} />
      {/* Metadata slides up on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '48px 20px 18px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 450ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 2,
      }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{phase.name}</span>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)' }}>{phase.number} / 04</span>
      </div>
    </motion.div>
  );
}

/* ── Phase text — Framer Motion entry, staggered children ── */
function PhaseText({ phase, from }: { phase: Phase; from: 'left' | 'right' }) {
  const initX = from === 'left' ? -52 : 52;
  const itemV = {
    hidden: { opacity: 0, x: initX },
    visible: { opacity: 1, x: 0, transition: { duration: 0.78, ease: EASE } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
    >
      <motion.h2
        variants={itemV}
        className="font-heading"
        style={{ fontSize: 'clamp(34px, 4.2vw, 58px)', fontWeight: 500, letterSpacing: '-0.032em', color: 'var(--text)', lineHeight: 1.0, marginBottom: 20 }}
      >
        {phase.name}
      </motion.h2>
      <motion.p
        variants={itemV}
        className="font-body"
        style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 36, maxWidth: '420px' }}
      >
        {phase.body}
      </motion.p>
      <motion.div
        variants={itemV}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
      >
        {phase.deliverables.map(d => (
          <span key={d} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid rgba(61,82,230,0.22)', padding: '6px 14px', background: 'rgba(61,82,230,0.035)' }}>{d}</span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Phase timeline node — rotating diamond with counter-rotating number ── */
function PhaseNode({ number }: { number: string }) {
  return (
    <div style={{ position: 'relative', zIndex: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Static outer glow ring */}
      <div aria-hidden style={{ position: 'absolute', width: 58, height: 58, transform: 'rotate(45deg)', border: '1px solid rgba(61,82,230,0.1)', pointerEvents: 'none' }} />
      {/* Diamond — rotates into place, number stays upright */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 45 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 190, damping: 15, delay: 0.12 }}
        style={{
          width: 34, height: 34,
          backgroundColor: 'var(--bg)',
          border: '1.5px solid var(--accent)',
          boxShadow: '0 0 0 5px rgba(61,82,230,0.07), 0 0 28px rgba(61,82,230,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ transform: 'rotate(-45deg)', fontFamily: 'var(--font-mono), monospace', fontSize: 8, letterSpacing: '0.06em', color: 'var(--accent)', fontWeight: 600, userSelect: 'none', lineHeight: 1 }}>
          {number}
        </span>
      </motion.div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function ApproachClient() {
  const t = useTranslations('approach');
  const [lineDrawn, setLineDrawn] = useState(false);
  const scrollDir = useScrollDirection();

  const PHASES: Phase[] = [
    { number: '01', name: t('phase01name'), id: 'phase-audit',   descriptor: t('phase01descriptor'), deliverables: [t('phase01d0'), t('phase01d1'), t('phase01d2')], body: t('phase01body'), image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80' },
    { number: '02', name: t('phase02name'), id: 'phase-design',  descriptor: t('phase02descriptor'), deliverables: [t('phase02d0'), t('phase02d1'), t('phase02d2')], body: t('phase02body'), image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80' },
    { number: '03', name: t('phase03name'), id: 'phase-build',   descriptor: t('phase03descriptor'), deliverables: [t('phase03d0'), t('phase03d1'), t('phase03d2')], body: t('phase03body'), image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
    { number: '04', name: t('phase04name'), id: 'phase-handoff', descriptor: t('phase04descriptor'), deliverables: [t('phase04d0'), t('phase04d1'), t('phase04d2')], body: t('phase04body'), image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80' },
  ];

  const PRINCIPLES: Principle[] = [
    { number: '01', title: t('p01title'), body: t('p01body'), image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80' },
    { number: '02', title: t('p02title'), body: t('p02body'), image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1600&q=80' },
    { number: '03', title: t('p03title'), body: t('p03body'), image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80' },
  ];

  useEffect(() => {
    const id = setTimeout(() => setLineDrawn(true), 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════
          S1 — HERO
      ════════════════════════════════════════════════ */}
      <section
        id="approach-hero"
        data-section-label="Overview"
        data-nav-theme="dark"
        style={{
          backgroundColor: 'var(--dark-bg)',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Right-side technical image */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, right: 0,
          width: '45%', height: '100%', overflow: 'hidden', zIndex: 0,
        }}>
          <img
            src="https://picsum.photos/seed/obsidia-datacenter-rack/1920/1080"
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              filter: 'grayscale(60%) brightness(0.3)',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--dark-bg) 0%, rgba(6,8,15,0.72) 42%, rgba(6,8,15,0.12) 100%)',
          }} />
        </div>

        {/* Outlined "04" watermark */}
        <div aria-hidden style={{
          position: 'absolute', top: '50%', right: '-3%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-heading), Georgia, serif',
          fontSize: 'clamp(240px, 32vw, 480px)',
          fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(61,82,230,0.06)',
          userSelect: 'none', pointerEvents: 'none', zIndex: 1,
        }}>
          04
        </div>

        {/* Cobalt ambient glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '15%', left: '-8%',
          width: '900px', height: '900px',
          background: 'radial-gradient(circle, rgba(61,82,230,0.09) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Main content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'relative', zIndex: 2,
          maxWidth: '1200px', width: '100%', margin: '0 auto',
          padding: '120px 32px 60px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 52 }}
          >
            <div style={{ width: 28, height: 1, backgroundColor: 'var(--accent)', opacity: 0.7 }} />
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              {t('heroLabel')}
            </span>
          </motion.div>

          <motion.h1
            className="font-heading"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            style={{
              fontSize: 'clamp(56px, 8.5vw, 116px)',
              fontWeight: 500, letterSpacing: '-0.04em',
              color: 'var(--dark-text)', lineHeight: 0.94,
              marginBottom: 44, maxWidth: '820px',
            }}
          >
            Built around
            <br />
            the process,
            <br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>not the tool.</em>
          </motion.h1>

          <motion.p
            className="font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.46 }}
            style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.8,
              color: 'rgba(220,225,245,0.52)', maxWidth: '500px',
            }}
          >
            Most automation projects fail because the process was never mapped before the build started. Here is exactly how ours works, and why it succeeds.
          </motion.p>
        </div>

        {/* Phase tracker — taller, clickable anchors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          {/* Animated accent rule */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, height: 1, width: '100%',
            backgroundColor: 'var(--accent)',
            transformOrigin: 'left center',
            transform: lineDrawn ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.8s cubic-bezier(0.22,1,0.36,1)',
            opacity: 0.4,
          }} />

          <div style={{ borderTop: '1px solid var(--dark-border)' }}>
            <div
              className="phase-tracker"
              style={{
                maxWidth: '1200px', margin: '0 auto',
                padding: '0 32px',
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                width: '100%',
              }}
            >
              {PHASES.map((phase, i) => (
                <a
                  key={phase.id}
                  href={`#${phase.id}`}
                  className="phase-tracker-item"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px 0',
                    borderLeft: i > 0 ? '1px solid var(--dark-border)' : 'none',
                    textDecoration: 'none',
                  }}
                >
                  <span className="phase-name" style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(220,225,245,0.3)',
                    transition: 'color 200ms ease',
                  }}>
                    {phase.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          PHASES HEADER
      ════════════════════════════════════════════════ */}
      <section
        id="approach-process"
        data-section-label="The Process"
        style={{
          backgroundColor: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          padding: '88px 32px 72px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, backgroundColor: 'var(--accent)' }} />
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>{t('processLabel')}</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(42px, 5.8vw, 78px)', fontWeight: 500, letterSpacing: '-0.038em', color: 'var(--text)', lineHeight: 0.97, marginBottom: 24 }}>
              {t('processHeadline')}<br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('processHeadlineAccent')}</em>
            </h2>
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '400px', marginTop: 8 }}>
              Every engagement runs through the same four phases, in the same order, without exception.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          S2–S5 — PHASE SECTIONS (alternating + timeline)
      ════════════════════════════════════════════════ */}
      {PHASES.map((phase, i) => {
        const isReversed = i % 2 === 1;
        return (
          <section
            key={phase.id}
            id={phase.id}
            style={{
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
              position: 'relative',
            }}
          >
            <div
              style={{
                maxWidth: '1200px', margin: '0 auto',
                padding: '0 32px',
                display: 'grid',
                gridTemplateColumns: '1fr 72px 1fr',
                alignItems: 'stretch',
              }}
            >
              {/* Left column */}
              <div style={{ padding: '88px 48px 88px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {isReversed
                  ? <PhaseImage phase={phase} from="left" />
                  : <PhaseText phase={phase} from="left" />}
              </div>

              {/* Timeline column (center) */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 88, flexShrink: 0 }}>
                {/* Vertical guide line */}
                <div aria-hidden style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: '50%', transform: 'translateX(-50%)',
                  width: 1,
                  background: 'linear-gradient(to bottom, rgba(61,82,230,0.45) 0%, rgba(61,82,230,0.06) 100%)',
                  zIndex: 0,
                }} />
                <PhaseNode number={phase.number} />
              </div>

              {/* Right column */}
              <div style={{ padding: '88px 0 88px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {isReversed
                  ? <PhaseText phase={phase} from="right" />
                  : <PhaseImage phase={phase} from="right" />}
              </div>
            </div>
          </section>
        );
      })}

      {/* ════════════════════════════════════════════════
          S6 — PRINCIPLES
      ════════════════════════════════════════════════ */}
      <section
        id="approach-principles"
        data-section-label="Principles"
        data-nav-theme="dark"
        style={{
          backgroundColor: 'var(--dark-bg)',
          borderTop: '1px solid var(--dark-border)',
          padding: '96px 32px 48px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ marginBottom: 28 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, backgroundColor: 'var(--accent)', opacity: 0.7 }} />
              <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8,
              }}>
                {t('principlesLabel')}
              </span>
            </div>
            <h2 className="font-heading" style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 500, letterSpacing: '-0.032em',
              color: 'var(--dark-text)', lineHeight: 1.02, marginBottom: 14,
            }}>
              {t('principlesHeadline')}
            </h2>
            <p style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: 15, color: 'var(--dark-muted)',
              lineHeight: 1.75, maxWidth: '400px',
            }}>
              Non-negotiable standards applied to every engagement, without exception.
            </p>
          </motion.div>

          {PRINCIPLES.map((p, i) => (
            <PrincipleRow key={p.number} principle={p} index={i} scrollDir={scrollDir} total={PRINCIPLES.length} />
          ))}

          <div style={{ borderTop: '1px solid var(--dark-border)' }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          S7 — PHILOSOPHY + CTA (merged split-screen)
      ════════════════════════════════════════════════ */}
      <section
        id="approach-philosophy"
        data-section-label="Philosophy"
        data-nav-theme="dark"
        style={{
          backgroundColor: 'var(--dark-surface)',
          borderTop: '1px solid var(--dark-border)',
          overflow: 'hidden',
          height: '100dvh',
          paddingTop: '76px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="philo-cta-grid"
          style={{
            maxWidth: '1200px', margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            height: '100%',
          }}
        >
          {/* Left — Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{
              padding: '40px 64px 40px 32px',
              borderRight: '1px solid var(--dark-border)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div aria-hidden className="font-heading" style={{
              fontSize: 'clamp(80px, 11vw, 136px)',
              color: 'var(--accent)', lineHeight: 0.7,
              marginBottom: 8, opacity: 0.28, userSelect: 'none',
            }}>
              &ldquo;
            </div>

            <p className="font-heading" style={{
              fontSize: 'clamp(20px, 2.3vw, 31px)',
              fontWeight: 400, fontStyle: 'italic',
              lineHeight: 1.46, letterSpacing: '-0.014em',
              color: 'var(--dark-text)', maxWidth: '440px', marginBottom: 40,
            }}>
              Every engagement starts with an audit, not a proposal. We map the process before we design the solution.
            </p>

            <div style={{ width: 40, height: 1, backgroundColor: 'var(--accent)', marginBottom: 24, opacity: 0.55 }} />

            <div style={{ marginBottom: 52 }}>
              <div style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 14, fontWeight: 600, color: 'var(--dark-text)',
                letterSpacing: '0.01em', marginBottom: 5,
              }}>
                Omar Attar
              </div>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--muted)',
              }}>
                CEO, Obsidia
              </div>
            </div>

            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 9, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--accent)',
              display: 'block', opacity: 0.75, marginBottom: 20,
            }}>
              What this means in practice
            </span>

            {[
              'You receive a scope document before any build begins.',
              'Every automation ships with full documentation.',
              'Success metrics are agreed before the first line of logic.',
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.55, ease: EASE, delay: idx * 0.1 + 0.25 }}
                style={{
                  display: 'flex', gap: 20, padding: '18px 0',
                  borderTop: '1px solid var(--dark-border)',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 10, fontWeight: 500, letterSpacing: '0.12em',
                  color: 'rgba(61,82,230,0.55)', flexShrink: 0, paddingTop: 3,
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <p className="font-body" style={{
                  fontSize: 15, lineHeight: 1.8, color: 'rgba(220,225,245,0.58)',
                }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            style={{
              display: 'flex', flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Card — spans full column height, glow clipped inside */}
            <div style={{
              position: 'relative',
              flex: 1,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              margin: '48px 32px 80px 64px',
              borderRadius: '20px',
              border: '1px solid rgba(61,82,230,0.16)',
              backgroundColor: 'rgba(61,82,230,0.04)',
              padding: '40px 44px',
              overflow: 'hidden',
            }}>
              {/* Ambient glow — clipped strictly to card boundary */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 75% 85%, rgba(61,82,230,0.32) 0%, rgba(61,82,230,0.12) 38%, transparent 68%)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              {/* Content sits above the glow */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
                  <div style={{ width: 28, height: 1, backgroundColor: 'var(--accent)', opacity: 0.5 }} />
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.7,
                  }}>
                    {t('ctaLabel')}
                  </span>
                </div>

                <h2 className="font-heading" style={{
                  fontSize: 'clamp(32px, 4vw, 64px)',
                  fontWeight: 500, letterSpacing: '-0.04em',
                  color: 'var(--dark-text)', lineHeight: 0.96, marginBottom: 28,
                }}>
                  Describe the problem.
                  <br />
                  <em style={{ color: 'var(--accent)' }}>We handle</em>
                  <br />
                  everything from there.
                </h2>

                <p style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: 15, lineHeight: 1.82,
                  color: 'rgba(220,225,245,0.42)',
                  maxWidth: '380px', marginBottom: 44,
                }}>
                  You know something is broken. We find exactly what, and fix it.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
                  <Link href="/contact" className="approach-cta-btn">
                    {t('ctaButton')} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Styles ──────────────────────────────────────── */}
      <style>{`
        /* Phase tracker hover */
        .phase-tracker-item:hover .phase-name { color: rgba(220,225,245,0.72) !important; }
        .phase-tracker-item:hover .phase-num  { color: var(--accent) !important; opacity: 1 !important; }
        .phase-tracker-item:hover .phase-desc { color: rgba(220,225,245,0.32) !important; }

        /* Phase image zoom */
        .phase-img:hover { transform: scale(1.03); }

        /* CTA button */
        .approach-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-body), sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; text-decoration: none;
          background-color: var(--accent);
          padding: 18px 44px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 24px rgba(61,82,230,0.28);
          transition: background-color 200ms ease, box-shadow 280ms ease,
                      transform 280ms cubic-bezier(0.22,1,0.36,1), gap 200ms ease;
          will-change: transform;
        }
        .approach-cta-btn:hover {
          background-color: var(--accent-hover);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 40px rgba(61,82,230,0.48),
                      0 2px 12px rgba(61,82,230,0.28);
          transform: translateY(-2px); gap: 14px;
        }
        .approach-cta-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 12px rgba(61,82,230,0.25);
        }

        .approach-link-secondary {
          font-family: var(--font-body), sans-serif;
          font-size: 12px; color: rgba(220,225,245,0.32);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 3px;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .approach-link-secondary:hover {
          color: rgba(220,225,245,0.68);
          border-color: rgba(255,255,255,0.25);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .phase-content-grid { gap: 40px !important; }
        }
        @media (max-width: 900px) {
          .philo-cta-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .philo-cta-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--dark-border) !important;
          }
          .philo-cta-grid > div:first-child {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .philo-cta-grid > div:last-child > div:last-child {
            margin-left: 32px !important;
            margin-right: 32px !important;
          }
          .principle-row-inner {
            grid-template-columns: 56px 1fr !important;
            gap: 16px !important;
          }
          .principle-row-inner > *:nth-child(3) { grid-column: 2 !important; }
          .phase-tracker { grid-template-columns: repeat(2, 1fr) !important; }
          .phase-content-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .phase-content-grid > *:nth-child(2) { order: 2 !important; }
        }
        @media (max-width: 640px) {
          .phase-tracker { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
