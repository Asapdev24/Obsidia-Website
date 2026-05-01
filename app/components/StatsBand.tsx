'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    value:   72,
    suffix:  '+',
    unit:    'hrs',
    label:   'Saved per employee, per month',
    context: "That's a full work week, every month, per person.",
  },
  {
    value:   3,
    suffix:  '×',
    unit:    '',
    label:   'Faster approval cycles',
    context: 'Decisions that took 3 days now take 4 minutes.',
  },
  {
    value:   60,
    suffix:  '%',
    unit:    '',
    label:   'Reduction in manual processing cost',
    context: 'Less than half the overhead. Same output.',
  },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function StatItem({ stat, active, index }: { stat: typeof STATS[0]; active: boolean; index: number }) {
  const count = useCountUp(stat.value, active, 1600 + index * 200);

  return (
    <div
      className="stat-item"
      style={{
        flex:         1,
        padding:      '72px 0',
        borderRight:  index < 2 ? '1px solid #E5E5E3' : 'none',
        paddingRight: index < 2 ? '64px' : '0',
        paddingLeft:  index > 0 ? '64px' : '0',
        opacity:      active ? 1 : 0,
        transform:    active ? 'translateY(0)' : 'translateY(20px)',
        transition:   `opacity 700ms ease ${index * 140}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 140}ms`,
      }}
    >
      {/* Number + suffix + unit */}
      <div
        style={{
          display:     'flex',
          alignItems:  'baseline',
          gap:         '1px',
          marginBottom: '20px',
          lineHeight:  0.9,
        }}
      >
        <span
          className="font-heading"
          style={{
            fontSize:      'clamp(76px, 8.5vw, 112px)',
            fontWeight:    500,
            letterSpacing: '-0.04em',
            color:         '#0D0D0D',
            lineHeight:    0.9,
          }}
        >
          {count}
        </span>
        <span
          className="font-heading"
          style={{
            fontSize:      'clamp(40px, 4.5vw, 56px)',
            fontWeight:    500,
            letterSpacing: '-0.02em',
            color:         'var(--accent)',
            lineHeight:    1,
            marginLeft:    '2px',
          }}
        >
          {stat.suffix}
        </span>
        {stat.unit && (
          <span
            style={{
              fontFamily:    'var(--font-body), sans-serif',
              fontSize:      '15px',
              fontWeight:    400,
              color:         '#9A9A9A',
              marginLeft:    '10px',
              letterSpacing: '0.06em',
            }}
          >
            {stat.unit}
          </span>
        )}
      </div>

      {/* Label */}
      <p
        style={{
          fontFamily:    'var(--font-body), sans-serif',
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color:         '#9A9A9A',
          marginBottom:  '10px',
          lineHeight:    1.5,
        }}
      >
        {stat.label}
      </p>

      {/* Context */}
      <p
        style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize:   '14px',
          lineHeight: 1.65,
          color:      '#5C5C5C',
          fontStyle:  'italic',
        }}
      >
        {stat.context}
      </p>
    </div>
  );
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setActive(true); observer.disconnect(); }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
        borderTop:       '1px solid #E5E5E3',
        borderBottom:    '1px solid #E5E5E3',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin:   '0 auto',
          padding:  '0 32px',
          display:  'flex',
          gap:      0,
        }}
        className="stats-band-inner"
      >
        {STATS.map((stat, i) => (
          <StatItem key={i} stat={stat} active={active} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-band-inner { flex-direction: column !important; }
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid #E5E5E3 !important;
            padding: 48px 0 !important;
          }
          .stat-item:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
