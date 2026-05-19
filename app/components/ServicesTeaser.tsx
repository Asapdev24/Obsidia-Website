'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GlareHover from './GlareHover';

const ACCENT     = 'var(--accent)';
const TEXT_MAIN  = '#F0EFE9';
const TEXT_MUTED = 'rgba(240,239,233,0.5)';
const CARD_BG    = 'rgba(255,255,255,0.06)';
const CARD_BORDER= 'rgba(255,255,255,0.1)';
const GAP_COLOR  = 'rgba(255,255,255,0.06)';

const SERVICES = [
  {
    number:  '01',
    tag:     'Approval & Routing',
    title:   'Document & Approval Automation',
    summary: 'We map your approval chain and replace each manual step with a triggered route. Documents reach the right person in seconds, not days.',
    benefit: 'Cut approval time by up to 80%',
  },
  {
    number:  '02',
    tag:     'Data & Integration',
    title:   'Data Integration & Sync',
    summary: 'We connect your CRM, ERP, and finance tools so data moves between them without anyone touching it. One entry. Every system updated.',
    benefit: 'Eliminate cross-system data errors',
  },
  {
    number:  '03',
    tag:     'Reporting & Analytics',
    title:   'Automated Reporting Pipelines',
    summary: 'We build pipelines that pull your numbers, format them, and deliver them on a schedule you set. Your weekly report runs without anyone opening a spreadsheet.',
    benefit: 'Reclaim hours of report-building per week',
  },
  {
    number:  '04',
    tag:     'Operations',
    title:   'Custom Operations Workflows',
    summary: 'We audit your highest-friction process and build the automation that removes it. Built to your exact spec, documented, and handed off to your team.',
    benefit: 'Workflows built to your exact spec',
  },
];

type ServiceData = typeof SERVICES[0];

function ServiceCard({ service, index, active }: { service: ServiceData; index: number; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    /* Entrance animation wrapper */
    <div
      style={{
        opacity:    active ? 1 : 0,
        transform:  active ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 600ms ease ${active ? index * 90 : 0}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${active ? index * 90 : 0}ms`,
      }}
    >
      {/* JS hover state wrapper (for accent bar + arrow shift) */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <GlareHover
          width="100%"
          height="420px"
          background={CARD_BG}
          borderRadius="0"
          borderColor={CARD_BORDER}
          glareColor="#ffffff"
          glareOpacity={0.3}
          glareAngle={-30}
          glareSize={300}
          transitionDuration={800}
          style={{
            backdropFilter:       'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/*
            Single child fills the GlareHover grid.
            align-self + justify-self stretch override place-items: center.
          */}
          <div
            style={{
              width:         '100%',
              height:        '100%',
              alignSelf:     'stretch',
              justifySelf:   'stretch',
              display:       'flex',
              flexDirection: 'column',
              position:      'relative',
            }}
          >
            {/* Top content */}
            <div style={{ flex: 1, padding: '36px 36px 0', display: 'flex', flexDirection: 'column' }}>

              {/* Number + tag row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <span
                  style={{
                    fontFamily:    'var(--font-body), sans-serif',
                    fontSize:      '11px',
                    fontWeight:    600,
                    letterSpacing: '0.18em',
                    color:         ACCENT,
                  }}
                >
                  {service.number}
                </span>
                <span
                  style={{
                    fontFamily:      'var(--font-body), sans-serif',
                    fontSize:        '9px',
                    fontWeight:      500,
                    letterSpacing:   '0.14em',
                    textTransform:   'uppercase',
                    color:           TEXT_MUTED,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border:          '1px solid rgba(255,255,255,0.1)',
                    padding:         '4px 10px',
                  }}
                >
                  {service.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-heading"
                style={{
                  fontSize:      'clamp(22px, 2.2vw, 32px)',
                  fontWeight:    500,
                  letterSpacing: '-0.02em',
                  color:         TEXT_MAIN,
                  lineHeight:    1.12,
                  marginBottom:  '16px',
                }}
              >
                {service.title}
              </h3>

              {/* Summary */}
              <p
                className="font-body"
                style={{
                  fontSize:   '14px',
                  lineHeight: 1.8,
                  color:      TEXT_MUTED,
                  flex:       1,
                }}
              >
                {service.summary}
              </p>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                padding:        '16px 36px',
                borderTop:      `1px solid ${CARD_BORDER}`,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                marginTop:      '24px',
              }}
            >
              <span
                style={{
                  fontFamily:    'var(--font-body), sans-serif',
                  fontSize:      '11px',
                  letterSpacing: '0.04em',
                  color:         TEXT_MUTED,
                }}
              >
                {service.benefit}
              </span>
              <Link
                href="/services"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  width:          '30px',
                  height:         '30px',
                  border:         `1px solid ${CARD_BORDER}`,
                  color:          TEXT_MUTED,
                  textDecoration: 'none',
                  transition:     'border-color 200ms ease, color 200ms ease, transform 200ms ease',
                  transform:      hovered ? 'translateX(5px)' : 'translateX(0)',
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.color       = ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = CARD_BORDER;
                  e.currentTarget.style.color       = TEXT_MUTED;
                }}
              >
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Top accent bar — scaleX from left */}
            <div
              aria-hidden
              style={{
                position:        'absolute',
                top:             0,
                left:            0,
                right:           0,
                height:          '2px',
                backgroundColor: ACCENT,
                transform:       hovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition:      'transform 320ms cubic-bezier(0.76,0,0.24,1)',
              }}
            />
          </div>
        </GlareHover>
      </div>
    </div>
  );
}

export default function ServicesTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setActive(true); observer.disconnect(); }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#0D0D0D',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize:  '24px 24px',
        padding:         '112px 32px',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* Cobalt ambient glow — top centre */}
      <div
        aria-hidden
        style={{
          position:      'absolute',
          top:           '-20%',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '70%',
          height:        '55%',
          background:    'radial-gradient(ellipse, rgba(61,82,230,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      {/* Violet ambient glow — bottom right */}
      <div
        aria-hidden
        style={{
          position:      'absolute',
          bottom:        '-15%',
          right:         '-5%',
          width:         '45%',
          height:        '50%',
          background:    'radial-gradient(ellipse, rgba(123,79,212,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            marginBottom:   '48px',
            opacity:        active ? 1 : 0,
            transform:      active ? 'translateY(0)' : 'translateY(16px)',
            transition:     'opacity 600ms ease, transform 600ms ease',
          }}
          className="services-header"
        >
          <div>
            <div
              style={{
                fontFamily:    'var(--font-body), sans-serif',
                fontSize:      '9px',
                fontWeight:    500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.35)',
                border:        '1px solid rgba(255,255,255,0.12)',
                padding:       '5px 12px',
                display:       'inline-block',
                marginBottom:  '20px',
              }}
            >
              What We Build
            </div>
            <h2
              className="font-heading"
              style={{
                fontSize:      'clamp(34px, 4vw, 52px)',
                fontWeight:    500,
                letterSpacing: '-0.025em',
                color:         TEXT_MAIN,
                lineHeight:    1.1,
              }}
            >
              The four workflows most
              <br />
              businesses automate first.
            </h2>
          </div>

          <div className="services-cta-link">
            <Link
              href="/services"
              style={{
                fontFamily:     'var(--font-body), sans-serif',
                fontSize:       '11px',
                fontWeight:     500,
                letterSpacing:  '0.1em',
                textTransform:  'uppercase',
                color:          'rgba(255,255,255,0.38)',
                textDecoration: 'none',
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                borderBottom:   '1px solid rgba(255,255,255,0.14)',
                paddingBottom:  '4px',
                transition:     'color 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color       = ACCENT;
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color       = 'rgba(255,255,255,0.38)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
              }}
            >
              View all services <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* 2×2 card grid */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap:                 '1px',
            backgroundColor:     GAP_COLOR,
          }}
          className="services-grid"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} active={active} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .services-header   { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .services-cta-link { display: none !important; }
        }
      `}</style>
    </section>
  );
}
