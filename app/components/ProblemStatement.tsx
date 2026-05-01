'use client';

import { useRef, useEffect, useState } from 'react';
import GlassCard from './ui/GlassCard';

const PAIN_POINTS = [
  {
    number: '01',
    title:  'Approval chains that take days',
    body:   'Requests sit in inboxes while your team waits for sign-off. Every day of delay is a decision your business didn\'t make fast enough.',
  },
  {
    number: '02',
    title:  'Manual data entry at every step',
    body:   'Your team copies data between systems by hand, and each transfer takes time it shouldn\'t. One in 25 manual transfers contains a mistake — and they compound quietly.',
  },
  {
    number: '03',
    title:  'Tools that don\'t talk to each other',
    body:   'CRM, ERP, project management, finance — each system is a silo you pay someone to bridge. Keeping them in sync is a full-time job with zero business output.',
  },
  {
    number: '04',
    title:  'Reports that require a human to run',
    body:   'Every week, someone spends two hours pulling the same numbers from the same places. That\'s over 100 hours a year producing reports that could run themselves.',
  },
];

function PainCard({ item, index, active }: {
  item:   typeof PAIN_POINTS[0];
  index:  number;
  active: boolean;
}) {
  return (
    <GlassCard
      variant="elevated"
      topGradientBorder
      style={{
        padding:   '36px 32px',
        opacity:   active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(24px)',
        transition: [
          `opacity 600ms ease ${index * 90}ms`,
          `transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 90}ms`,
        ].join(', '),
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily:    'var(--font-mono), monospace',
          fontSize:      '11px',
          fontWeight:    500,
          letterSpacing: '0.1em',
          color:         'var(--muted)',
          marginBottom:  '20px',
        }}
      >
        {item.number}
      </div>

      {/* Title */}
      <h3
        className="font-heading"
        style={{
          fontSize:      'clamp(18px, 1.6vw, 22px)',
          fontWeight:    500,
          letterSpacing: '-0.015em',
          color:         'var(--dark-text)',
          lineHeight:    1.25,
          marginBottom:  '16px',
        }}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        className="font-body"
        style={{
          fontSize:   '13.5px',
          lineHeight: 1.8,
          color:      'rgba(232,234,242,0.60)',
        }}
      >
        {item.body}
      </p>
    </GlassCard>
  );
}

export default function ProblemStatement() {
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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderBottom:    '1px solid var(--dark-border)',
        padding:         '112px 32px',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize:  '24px 24px',
        pointerEvents:   'none',
      }} />

      {/* Cobalt ambient glow — top centre */}
      <div aria-hidden style={{
        position:      'absolute',
        top:           '-15%',
        left:          '50%',
        transform:     'translateX(-50%)',
        width:         '65%',
        height:        '55%',
        background:    'radial-gradient(ellipse, rgba(61,82,230,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Violet ambient glow — bottom right */}
      <div aria-hidden style={{
        position:      'absolute',
        bottom:        '-10%',
        right:         '-5%',
        width:         '40%',
        height:        '45%',
        background:    'radial-gradient(ellipse, rgba(123,79,212,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header — headline left, body copy right */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '80px',
            marginBottom:        '64px',
            alignItems:          'end',
          }}
          className="problem-header-grid"
        >
          {/* Left: label + headline */}
          <div
            style={{
              opacity:    active ? 1 : 0,
              transform:  active ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
            }}
          >
            <div className="section-label" style={{ marginBottom: '28px' }}>
              The Problem
            </div>
            <h2
              className="font-heading"
              style={{
                fontSize:      'clamp(36px, 4.5vw, 58px)',
                fontWeight:    500,
                lineHeight:    1.04,
                letterSpacing: '-0.03em',
                color:         'var(--dark-text)',
              }}
            >
              Your biggest
              <br />
              operational cost
              <br />
              isn't salaries.
            </h2>
          </div>

          {/* Right: body copy */}
          <div
            style={{
              paddingBottom: '6px',
              opacity:       active ? 1 : 0,
              transform:     active ? 'translateY(0)' : 'translateY(24px)',
              transition:    'opacity 600ms ease 160ms, transform 600ms ease 160ms',
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize:     '17px',
                lineHeight:   1.8,
                color:        'rgba(232,234,242,0.55)',
                marginBottom: '20px',
              }}
            >
              Every hour your team spends on manual work is an hour not spent on the business.
              Those hours don't appear as a line item — they hide inside your payroll.
            </p>
            <p
              className="font-body"
              style={{
                fontSize:   '17px',
                lineHeight: 1.8,
                color:      'var(--dark-text)',
                fontWeight: 500,
              }}
            >
              Obsidia finds those hours, puts a number on them, and eliminates them.
            </p>
          </div>
        </div>

        {/* Pain point cards — glass elevated */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '16px',
          }}
          className="pain-points-grid"
        >
          {PAIN_POINTS.map((item, i) => (
            <PainCard key={i} item={item} index={i} active={active} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pain-points-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .problem-header-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pain-points-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
