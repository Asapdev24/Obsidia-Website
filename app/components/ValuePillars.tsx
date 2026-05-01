'use client';

import { useRef, useEffect, useState } from 'react';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const PILLARS = [
  {
    Icon:       Zap,
    title:      'Speed of Deployment',
    body:       'From first conversation to live automation in weeks, not quarters. We move with the urgency your business demands, without cutting corners on quality.',
    stat:       '4–6 wks',
    statLabel:  'Average time to first deployment',
  },
  {
    Icon:       ShieldCheck,
    title:      'Built to Your Exact Spec',
    body:       'No off-the-shelf templates. Every workflow is designed around your specific processes, your tools, and your edge cases — not a generic use case.',
    stat:       '100%',
    statLabel:  'Custom-built, nothing repurposed',
  },
  {
    Icon:       TrendingUp,
    title:      'Measurable Return',
    body:       "We don't charge for effort. We deliver outcomes you can measure — hours reclaimed, costs reduced, error rates dropped. The ROI shows up on your books.",
    stat:       'Day 1',
    statLabel:  'When you start seeing returns',
  },
];

export default function ValuePillars() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        borderBottom: '1px solid var(--dark-border)',
        padding: '112px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* Cobalt glow — top-left */}
      <div aria-hidden style={{
        position: 'absolute', top: '-15%', left: '-5%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(61,82,230,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Violet glow — bottom-right */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-15%', right: '-5%',
        width: '640px', height: '640px',
        background: 'radial-gradient(circle, rgba(123,79,212,0.09) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          marginBottom: '64px',
          maxWidth: '540px',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
        }}>
          <div className="section-label" style={{ marginBottom: '20px', color: 'var(--accent)' }}>
            Why Obsidia
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: 'var(--dark-text)',
              lineHeight: 1.1,
            }}
          >
            Three standards.
            <br />
            No exceptions.
          </h2>
        </div>

        {/* Glass pillar cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
          className="pillars-grid"
        >
          {PILLARS.map(({ Icon, title, body, stat, statLabel }, i) => (
            <GlassCard
              key={i}
              variant="elevated"
              topGradientBorder
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '36px 32px',
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 600ms ease ${i * 120 + 250}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120 + 250}ms`,
              }}
            >
              {/* Icon */}
              <div style={{
                width: '44px',
                height: '44px',
                border: '1px solid rgba(61,82,230,0.3)',
                backgroundColor: 'rgba(61,82,230,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '28px',
                flexShrink: 0,
              }}>
                <Icon size={18} color="var(--accent)" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--dark-text)',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                {title}
              </h3>

              {/* Body */}
              <p
                className="font-body"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'rgba(232,234,242,0.55)',
                  flex: 1,
                  marginBottom: '32px',
                }}
              >
                {body}
              </p>

              {/* Stat */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '24px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--dark-text)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {stat}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  color: 'rgba(232,234,242,0.4)',
                }}>
                  {statLabel}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
