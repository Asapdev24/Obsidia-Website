'use client';

import { useRef, useEffect, useState } from 'react';

const ACCENT     = 'var(--accent)';
const LINE_COLOR = '#E5E5E3';
const STEPS_BG   = '#F8F8F7';
const STATS_BG   = '#F4F3F1';
const TEXT_DARK  = '#1A1A1A';
const TEXT_BODY  = '#5C5C5C';
const NUM_MUTED  = '#9A9A9A';

export interface PSStep {
  number: string;
  title: string;
  detail: string;
  deliverable: string;
}

export interface PSStat {
  value: string;
  label: string;
}


/* ── Step column ─────────────────────────────────────────────── */
function StepCol({
  step, index, active, pipeline, deliverableLabel,
}: {
  step: PSStep; index: number; active: boolean; pipeline?: boolean; deliverableLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="step-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:      'relative',
        paddingTop:    '52px',
        paddingBottom: '32px',
        borderBottom:  !pipeline ? `2px solid ${hovered ? ACCENT : 'transparent'}` : undefined,
        borderTop:     pipeline ? `2px solid ${hovered ? ACCENT : LINE_COLOR}` : undefined,
        opacity:       active ? 1 : 0,
        transform:     active ? 'translateY(0)' : 'translateY(18px)',
        transition: [
          `opacity 600ms ease ${index * 100 + 300}ms`,
          `transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 100 + 300}ms`,
          'border-color 200ms ease',
        ].join(', '),
      }}
    >
      {/* Step number */}
      <div className="step-num" style={{
        position:      'absolute', top: 0, left: 0,
        fontFamily:    'var(--font-mono), monospace',
        fontSize:      '12px', lineHeight: 1,
        color:         NUM_MUTED, letterSpacing: '0.04em',
      }}>
        {step.number}
      </div>

      {/* Diamond / circle marker */}
      <div
        aria-hidden
        className="step-diamond"
        style={{
          position:        'absolute',
          top:             pipeline ? '-5px' : '20px',
          left:            0,
          width:           '8px',
          height:          '8px',
          backgroundColor: ACCENT,
          transform:       pipeline
            ? `scale(${hovered ? 1.5 : 1})`
            : `rotate(45deg) scale(${hovered ? 1.3 : 1})`,
          borderRadius:    pipeline ? '50%' : undefined,
          boxShadow:       pipeline && hovered ? `0 0 10px rgba(61,82,230,0.6)` : undefined,
          transition:      'transform 200ms ease, box-shadow 200ms ease',
          zIndex:          2,
        }}
      />

      {/* Pipeline inter-step arrow (not on last item) */}
      {pipeline && index < 3 && (
        <div
          aria-hidden
          style={{
            position:       'absolute',
            top:            '-1px',
            right:          '-25px',
            width:          '25px',
            height:         '1px',
            backgroundColor: LINE_COLOR,
            zIndex:          3,
          }}
        >
          <div style={{
            position:     'absolute',
            right:        0,
            top:          '-3px',
            borderLeft:   `6px solid ${LINE_COLOR}`,
            borderTop:    '4px solid transparent',
            borderBottom: '4px solid transparent',
          }} />
        </div>
      )}

      {/* Title */}
      <h3 className="font-heading step-title" style={{
        fontSize:      '32px', fontWeight: 500,
        letterSpacing: '-0.02em',
        color:         hovered ? ACCENT : TEXT_DARK,
        lineHeight:    1.1, marginBottom: '16px',
        transition:    'color 200ms ease',
      }}>
        {step.title}
      </h3>

      {/* Detail */}
      <p className="font-body" style={{
        fontSize: '15px', lineHeight: 1.7,
        color: TEXT_BODY, marginBottom: 0,
      }}>
        {step.detail}
      </p>

      {/* Deliverable */}
      <div style={{
        marginTop:     '24px',
        fontFamily:    'var(--font-body), sans-serif',
        fontSize:      '11px', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color:         ACCENT,
      }}>
        {deliverableLabel}: {step.deliverable}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function ProcessSection({
  headline,
  steps,
  stats,
  variant  = 'default',
}: {
  headline?: string;
  steps?:    PSStep[];
  stats?:    PSStat[];
  variant?:  'default' | 'pipeline';
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const defaultSteps: PSStep[] = [
    { number: '01', title: 'Audit', detail: 'We map your current processes, identify what is costing you time and money, and deliver a clear brief before we build anything.', deliverable: 'Process audit & scope document' },
    { number: '02', title: 'Design', detail: 'We design the solution architecture and present it for your sign-off. Nothing is built until the structure is agreed.', deliverable: 'Signed-off solution design' },
    { number: '03', title: 'Build', detail: 'Development against a staging environment with regular reviews. You see progress throughout — no surprises at handoff.', deliverable: 'Tested, documented build' },
    { number: '04', title: 'Handoff', detail: 'Deployment, training, full documentation, and 30 days of post-launch support. Your team owns the outcome from day one.', deliverable: 'Full handover with 30-day support' },
  ];

  const defaultStats: PSStat[] = [
    { value: '2–4 wks', label: 'Typical delivery window' },
    { value: '30 days', label: 'Post-launch support included' },
    { value: '100%', label: 'Documented and handed off' },
  ];

  const resolvedHeadline = headline ?? 'How we work.';
  const resolvedSteps = steps ?? defaultSteps;
  const resolvedStats = stats ?? defaultStats;
  const deliverableLabel = 'Deliverable';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref}>

      {/* ── Headline ──────────────────────────────────────── */}
      <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border)', padding: '100px 32px' }}>
        <div style={{
          maxWidth:   '1200px', margin: '0 auto',
          opacity:    active ? 1 : 0,
          transform:  active ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}>
          <div className="section-label" style={{ marginBottom: '20px' }}>Process</div>
          <h2 className="font-heading" style={{
            fontSize:      'clamp(36px, 4vw, 56px)',
            fontWeight:    500, letterSpacing: '-0.025em',
            color:         'var(--text)', lineHeight: 1.08, maxWidth: '600px',
          }}>
            {resolvedHeadline}
          </h2>
        </div>
      </div>

      {/* ── Stats band — light ─────────────────────────────── */}
      <div style={{
        backgroundColor: STATS_BG,
        padding:         '60px 32px',
        borderTop:       '1px solid var(--border)',
        borderBottom:    '1px solid var(--border)',
      }}>
        <div className="stats-band-grid" style={{
          maxWidth:            '1200px', margin: '0 auto',
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          position:            'relative',
        }}>
          <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: '33.333%',  width: '1px', backgroundColor: 'rgba(61,82,230,0.2)' }} />
          <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: '66.667%', width: '1px', backgroundColor: 'rgba(61,82,230,0.2)' }} />

          {resolvedStats.map((s, i) => (
            <div key={i} className="stat-item" style={{
              paddingLeft:  i === 0 ? 0 : '48px',
              paddingRight: i === 2 ? 0 : '48px',
            }}>
              <div style={{
                fontFamily:    'var(--font-mono), monospace',
                fontSize:      'clamp(32px, 3.8vw, 52px)',
                fontWeight:    400, color: '#1A1A1A',
                lineHeight:    1, marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize:   '13px', color: '#6A6A68', lineHeight: 1.5,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Steps ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: STEPS_BG, padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            {/* Timeline / pipeline line */}
            <div aria-hidden className="timeline-h-line" style={{
              position:        'absolute',
              top:             variant === 'pipeline' ? '0' : '24px',
              left:            0, right: 0,
              height:          '1px',
              backgroundColor: LINE_COLOR,
              zIndex:          0,
            }}
              data-pipeline={variant === 'pipeline' ? 'true' : undefined}
            >
              {/* Animated flow particle for pipeline variant */}
              {variant === 'pipeline' && active && (
                <div
                  aria-hidden
                  style={{
                    position:        'absolute',
                    top:             '-4px',
                    left:            0,
                    width:           '8px',
                    height:          '8px',
                    borderRadius:    '50%',
                    backgroundColor: ACCENT,
                    animation:       'psFlowPulse 4s ease-in-out infinite',
                  }}
                />
              )}
            </div>

            <div className="process-steps-grid" style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              columnGap:           '48px',
              position:            'relative',
              zIndex:              1,
            }}>
              {resolvedSteps.map((step, i) => (
                <StepCol
                  key={i}
                  step={step}
                  index={i}
                  active={active}
                  pipeline={variant === 'pipeline'}
                  deliverableLabel={deliverableLabel}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes psFlowPulse {
          0%   { left: 0%;               opacity: 0; transform: scale(0.4); }
          6%   { opacity: 1;             transform: scale(1); }
          94%  { opacity: 1;             transform: scale(1); }
          100% { left: calc(100% - 8px); opacity: 0; transform: scale(0.4); }
        }

        @media (max-width: 768px) {
          .process-steps-grid  { grid-template-columns: 1fr !important; column-gap: 0 !important; }
          .timeline-h-line     { display: none !important; }
          .step-col {
            padding-left: 36px !important;
            padding-top: 20px !important;
            border-left: 1px solid ${LINE_COLOR} !important;
            border-bottom: none !important;
            border-top: none !important;
          }
          .step-num    { position: static !important; display: block !important; margin-bottom: 8px !important; }
          .step-diamond { top: 28px !important; left: -4px !important; }
          .stats-band-grid { grid-template-columns: 1fr !important; }
          .stat-item {
            padding: 28px 0 !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .stat-item:last-child { border-bottom: none !important; }
        }
        @media (max-width: 480px) { .step-title { font-size: 26px !important; } }
      `}</style>
    </section>
  );
}

/* ── Per-service step configs (imported by service pages) ─── */
export const WEBSITE_STEPS: PSStep[] = [
  {
    number: '01', title: 'Audit',
    detail: 'We audit your current site, map what\'s costing you conversions, and define the goal before we touch design. You get a prioritised improvement brief.',
    deliverable: 'Conversion & performance audit report',
  },
  {
    number: '02', title: 'Wireframing',
    detail: 'We wireframe every key page and present the information architecture for your sign-off. Nothing is designed until the structure is agreed.',
    deliverable: 'Signed-off page wireframes',
  },
  {
    number: '03', title: 'Build',
    detail: 'Development against a staging environment that mirrors production. Every page is performance-tested and reviewed across devices before handoff.',
    deliverable: 'Tested, optimised website',
  },
  {
    number: '04', title: 'Launch',
    detail: 'We handle deployment, configure analytics and performance monitoring, and train your team on content management. First 30 days of fixes included.',
    deliverable: 'Live site with 30-day support',
  },
];

export const APP_STEPS: PSStep[] = [
  {
    number: '01', title: 'Audit',
    detail: 'We map your current processes, identify where software is missing or wrong, and deliver a detailed spec before we write a line of code.',
    deliverable: 'Process audit & product spec',
  },
  {
    number: '02', title: 'Architecture',
    detail: 'We prototype the core user flows and review them with your team. The system architecture and data model are locked before development starts.',
    deliverable: 'Signed-off prototype & architecture',
  },
  {
    number: '03', title: 'Build',
    detail: 'Iterative development with regular demos. You see the product every sprint. No surprises at handoff, no scope drift.',
    deliverable: 'Tested, documented application',
  },
  {
    number: '04', title: 'Handoff',
    detail: 'Deployment, team training, full documentation, and 30 days of post-launch fixes. Your team owns the product from day one.',
    deliverable: 'Full handover with 30-day support',
  },
];
