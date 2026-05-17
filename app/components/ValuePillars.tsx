'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.22, 1, 0.36, 1] as const;

type Standard = { n: string; title: string; body: string };

function DotMatrix({ hovered }: { hovered: boolean }) {
  const pattern = [1,0,1,0,1, 0,1,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 1,0,1,0,1];
  return (
    <div aria-hidden style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px', width: '74px' }}>
      {pattern.map((on, i) => (
        <div key={i} style={{
          width: '10px', height: '10px',
          backgroundColor: on
            ? hovered ? 'var(--accent)' : 'rgba(61,82,230,0.32)'
            : hovered ? 'rgba(61,82,230,0.1)' : 'rgba(61,82,230,0.07)',
          transition: `background-color 220ms ease ${i * 14}ms`,
        }} />
      ))}
    </div>
  );
}

function BarChart({ hovered }: { hovered: boolean }) {
  const heights = [0.3, 0.58, 0.42, 0.92, 0.65, 0.78, 0.48];
  return (
    <div aria-hidden style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '52px', width: '74px' }}>
      {heights.map((h, i) => (
        <div key={i} style={{
          flex: 1,
          height: hovered ? `${h * 100}%` : '8%',
          backgroundColor: i === 3 ? 'var(--accent)' : 'rgba(61,82,230,0.32)',
          borderRadius: '1px 1px 0 0',
          transition: `height 520ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`,
        }} />
      ))}
    </div>
  );
}

function CheckList({ hovered }: { hovered: boolean }) {
  return (
    <div aria-hidden style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: '13px', height: '13px', flexShrink: 0,
            border: `1px solid ${hovered ? 'rgba(61,82,230,0.55)' : 'rgba(61,82,230,0.18)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: `border-color 200ms ease ${i * 100}ms`,
          }}>
            <svg width="7" height="6" viewBox="0 0 7 6" style={{ opacity: hovered ? 1 : 0, transition: `opacity 200ms ease ${i * 100 + 90}ms` }}>
              <path d="M1 3L3 5L6 1" stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{
            height: '1px', width: '48px',
            backgroundColor: hovered ? 'rgba(61,82,230,0.4)' : 'rgba(61,82,230,0.18)',
            transition: `background-color 200ms ease ${i * 80}ms`,
          }} />
        </div>
      ))}
    </div>
  );
}

function PillarVisual({ index, hovered }: { index: number; hovered: boolean }) {
  if (index === 0) return <DotMatrix hovered={hovered} />;
  if (index === 1) return <BarChart hovered={hovered} />;
  return <CheckList hovered={hovered} />;
}

function StandardCard({ standard, index }: { standard: Standard; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.91 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.68, ease: EASE, delay: 0.28 + index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 36px',
        background: hovered ? 'rgba(61,82,230,0.1)' : 'rgba(61,82,230,0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? 'rgba(61,82,230,0.55)' : 'rgba(61,82,230,0.22)'}`,
        boxShadow: hovered ? '0 8px 40px rgba(61,82,230,0.12), inset 0 1px 0 rgba(255,255,255,0.8)' : '0 2px 16px rgba(61,82,230,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        transition: 'background 380ms ease, border-color 380ms ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Title */}
      <h3 className="font-heading" style={{
        fontSize: 'clamp(20px, 2.2vw, 30px)',
        fontWeight: 500, letterSpacing: '-0.025em',
        color: hovered ? '#3D52E6' : '#0D1147',
        lineHeight: 1.1, marginBottom: '14px',
        transition: 'color 280ms ease',
        position: 'relative', zIndex: 1,
      }}>
        {standard.title}
      </h3>

      {/* Separator */}
      <div style={{
        height: '1px',
        background: hovered ? 'rgba(61,82,230,0.55)' : 'rgba(61,82,230,0.2)',
        marginBottom: '16px',
        transform: `scaleX(${hovered ? 1 : 0.35})`,
        transformOrigin: 'left',
        transition: 'transform 480ms cubic-bezier(0.22,1,0.36,1), background 280ms ease',
        position: 'relative', zIndex: 1,
      }} />

      {/* Body */}
      <p className="font-body" style={{
        fontSize: '13px', lineHeight: 1.8,
        color: hovered ? 'rgba(13,17,71,0.72)' : 'rgba(13,17,71,0.52)',
        margin: 0, flex: 1,
        transition: 'color 280ms ease',
        position: 'relative', zIndex: 1,
      }}>
        {standard.body}
      </p>

      {/* Visual */}
      <div style={{ marginTop: '24px', position: 'relative', zIndex: 1 }}>
        <PillarVisual index={index} hovered={hovered} />
      </div>
    </motion.div>
  );
}

export default function ValuePillars() {
  const t = useTranslations('pillars');

  const STANDARDS: Standard[] = [
    { n: '01', title: t('p01title'), body: t('p01body') },
    { n: '02', title: t('p02title'), body: t('p02body') },
    { n: '03', title: t('p03title'), body: t('p03body') },
  ];

  return (
    <section
      id="home-why"
      data-section-label="Why Obsidia"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 32px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(61,82,230,0.28) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        opacity: 0.45,
        pointerEvents: 'none',
      }} />

      {/* Ambient glow — bottom center */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-25%', left: '50%',
        transform: 'translateX(-50%)',
        width: '900px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(61,82,230,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Ambient glow — top left */}
      <div aria-hidden style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(136,96,230,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Vertical accent line */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: '22%', bottom: 0,
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(61,82,230,0.1) 20%, rgba(61,82,230,0.1) 80%, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Header — big heading first, section label below */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 className="font-heading" style={{
            fontSize: 'clamp(52px, 7vw, 96px)',
            fontWeight: 500, letterSpacing: '-0.045em',
            lineHeight: 0.92, color: '#0D1147',
            marginBottom: '18px',
          }}>
            {t('headline1')}
            <br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{t('headlineAccent')}</em>
          </h2>

          <p className="font-body" style={{
            fontSize: '14px', lineHeight: 1.6,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            margin: 0,
          }}>
            <span style={{ color: '#0D1147' }}>Obsidia</span>
            {' '}
            <span style={{ color: 'var(--accent)' }}>Standards</span>
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.44 }}
          style={{ height: '1px', background: 'rgba(61,82,230,0.22)', marginBottom: '32px', transformOrigin: 'left center' }}
        />

        {/* 3-card grid */}
        <div className="pillars-grid">
          {STANDARDS.map((s, i) => (
            <StandardCard key={s.n} standard={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
