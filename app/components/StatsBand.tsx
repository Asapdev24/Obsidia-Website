'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Finding = { stat: string; unit: string; claim: string; detail: string };

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setValue(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function FindingItem({ f, index, active }: { f: Finding; index: number; active: boolean }) {
  const numericTarget = parseInt(f.stat.replace(/[^0-9]/g, ''), 10);
  const suffix = f.stat.replace(/[0-9]/g, '');
  const countedValue = useCountUp(numericTarget, active, 1000 + index * 200);

  const displayStat = isNaN(numericTarget)
    ? f.stat
    : `${countedValue}${suffix}`;

  return (
    <div
      className="finding-item"
      style={{
        flex: 1,
        padding: '72px 0',
        paddingRight: index < 2 ? '56px' : '0',
        paddingLeft: index > 0 ? '56px' : '0',
        borderRight: index < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 700ms ease ${index * 140 + 100}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 140 + 100}ms`,
      }}
    >
      {/* Large display stat */}
      <div
        className="font-heading"
        style={{
          fontSize: 'clamp(64px, 7vw, 96px)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          color: '#FFFFFF',
          marginBottom: '12px',
        }}
      >
        {displayStat}
      </div>

      {/* Unit */}
      <div style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '9px',
        fontWeight: 500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '32px',
      }}>
        {f.unit}
      </div>

      {/* Divider */}
      <div style={{
        width: '32px',
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.25)',
        marginBottom: '20px',
      }} />

      {/* Claim */}
      <p
        className="font-heading"
        style={{
          fontSize: 'clamp(18px, 1.8vw, 22px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          color: 'rgba(255,255,255,0.88)',
          marginBottom: '16px',
        }}
      >
        {f.claim}
      </p>

      {/* Detail */}
      <p style={{
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '13px',
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.45)',
        maxWidth: '300px',
      }}>
        {f.detail}
      </p>
    </div>
  );
}

export default function StatsBand() {
  const t = useTranslations('stats');
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const FINDINGS: Finding[] = [
    { stat: t('stat0'), unit: t('unit0'), claim: t('claim0'), detail: t('detail0') },
    { stat: t('stat1'), unit: t('unit1'), claim: t('claim1'), detail: t('detail1') },
    { stat: t('stat2'), unit: t('unit2'), claim: t('claim2'), detail: t('detail2') },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="home-results"
      data-section-label="Results"
      style={{
        backgroundColor: 'var(--accent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Very subtle texture — diagonal lines at low opacity */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 40px)',
        pointerEvents: 'none',
      }} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          gap: 0,
          position: 'relative',
          zIndex: 1,
        }}
        className="stats-band-inner"
      >
        {FINDINGS.map((f, i) => (
          <FindingItem key={i} f={f} index={i} active={active} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-band-inner { flex-direction: column !important; }
          .finding-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1) !important;
            padding: 52px 0 !important;
          }
          .finding-item:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
