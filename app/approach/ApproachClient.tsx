'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

/* ── IntersectionObserver reveal hook ─────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Data ─────────────────────────────────────────────────── */
const PHASES = [
  {
    number: '01',
    name: 'Audit',
    descriptor: 'Map everything slowing the business down',
    description:
      'We begin with a structured conversation — not a questionnaire. Over one or two calls, we map every manual step in your highest-cost processes, identify the workflows that consume the most time, and rank them by ROI. You receive a prioritized list of what to automate and why before we\'ve agreed to build anything.',
    insight: 'The brief is never complete until we\'ve seen the work firsthand.',
    deliverables: ['Process map', 'Friction audit', 'ROI ranking', 'Automation scope'],
    weeks: 'Week 1',
    bg: 'var(--bg)',
  },
  {
    number: '02',
    name: 'Design',
    descriptor: 'Blueprint the automation before a line is built',
    description:
      'Before any tool is opened, we design the full automation logic. Every trigger, condition, data transformation, and error path is defined in a format you can read and follow. You approve the design before we proceed — if you can\'t follow the logic, we haven\'t explained it well enough.',
    insight: 'If you can\'t follow the logic, we haven\'t explained it well enough.',
    deliverables: ['Logic blueprint', 'Edge case map', 'Error handling spec', 'Client sign-off'],
    weeks: 'Week 2',
    bg: 'var(--surface)',
  },
  {
    number: '03',
    name: 'Build',
    descriptor: 'Production-grade, tested, documented delivery',
    description:
      'We build in a staging environment that mirrors your production setup exactly. Every automation is tested against real data, real edge cases, and real failure conditions — nothing ships without structured logging, retry logic, and failure alerts built in from the start.',
    insight: 'Untested automations are just slow, expensive bugs waiting to surface.',
    deliverables: ['Staging build', 'Test log', 'Error handling', 'Full documentation'],
    weeks: 'Weeks 3–4',
    bg: 'var(--bg)',
  },
  {
    number: '04',
    name: 'Handoff',
    descriptor: 'Yours to own. Ours to support.',
    description:
      'We deploy to production with your team present, walk through every workflow, and confirm your team can operate what we\'ve built independently. The first 30 days of fixes are included — after that, optional maintenance packages are available.',
    insight: 'If your team can\'t run it without us, the project isn\'t finished.',
    deliverables: ['Production deploy', 'Team walkthrough', '30-day support', 'Maintenance options'],
    weeks: 'Weeks 5–6',
    bg: 'var(--surface)',
  },
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'We audit before we build.',
    body: 'Every project starts with a process map — we never design automation for a workflow we haven\'t observed ourselves. The brief is never complete until we\'ve seen the work.',
  },
  {
    number: '02',
    title: 'We build to hand off.',
    body: 'You should be able to run what we build without us present. Full documentation and a team walkthrough are required deliverables on every engagement.',
  },
  {
    number: '03',
    title: 'We measure the outcome.',
    body: 'Every automation has a defined success metric agreed before build begins. If we can\'t measure it, we haven\'t scoped it correctly.',
  },
];

const TIMELINE = [
  { week: 'Week 1',   phase: '01', label: 'Audit',   task: 'Discovery call + process mapping',    output: 'Process map, friction audit, ROI ranking' },
  { week: 'Week 2',   phase: '02', label: 'Design',  task: 'Automation blueprint delivered',       output: 'Logic blueprint, error handling spec' },
  { week: 'Week 3',   phase: '03', label: 'Build',   task: 'Staging environment + first build',    output: 'Working automation in staging' },
  { week: 'Week 4',   phase: '03', label: 'Build',   task: 'Edge case testing + documentation',    output: 'Test log, full documentation' },
  { week: 'Week 5',   phase: '03', label: 'Build',   task: 'Client review and revisions',          output: 'Approved, production-ready build' },
  { week: 'Week 6',   phase: '04', label: 'Handoff', task: 'Deployment + team walkthrough',        output: 'Live automation, 30-day support begins' },
];

/* ── Phase row ────────────────────────────────────────────── */
function PhaseRow({ phase, index }: { phase: typeof PHASES[0]; index: number }) {
  const { ref, visible } = useReveal();
  const [rowHovered, setRowHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
      style={{
        backgroundColor: phase.bg,
        borderTop: '1px solid var(--border)',
        padding: '104px 32px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 700ms ease ${index * 80}ms, transform 700ms ease ${index * 80}ms`,
      }}
    >
      <div
        className="phase-row-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: '72px',
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-16px',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 'clamp(96px, 13vw, 160px)',
              fontWeight: 400,
              color: 'var(--text)',
              opacity: rowHovered ? 0.1 : 0.05,
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              transition: 'opacity 200ms ease',
            }}
          >
            {phase.number}
          </div>

          <div style={{ position: 'relative', zIndex: 1, paddingTop: '24px' }}>
            {/* Phase progress bars */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '28px' }}>
              {PHASES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '3px',
                    width: i === index ? '28px' : '8px',
                    backgroundColor: i === index ? 'var(--accent)' : 'var(--border)',
                    transition: 'width 300ms ease, background-color 300ms ease',
                  }}
                />
              ))}
            </div>

            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(48px, 5.5vw, 72px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                lineHeight: 1.0,
                marginBottom: '12px',
                transform: rowHovered ? 'translateX(6px)' : 'translateX(0)',
                transition: 'transform 200ms ease',
              }}
            >
              {phase.name}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                lineHeight: 1.5,
                maxWidth: '260px',
                marginBottom: '28px',
              }}
            >
              {phase.descriptor}
            </p>

            {/* Week chip */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                border: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                }}
              >
                {phase.weeks}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ paddingTop: '4px' }}>
          <p
            className="font-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              marginBottom: '28px',
            }}
          >
            {phase.description}
          </p>

          {/* Insight callout */}
          <div
            style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '20px',
              marginBottom: '36px',
            }}
          >
            <p
              className="font-heading"
              style={{
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
              }}
            >
              &ldquo;{phase.insight}&rdquo;
            </p>
          </div>

          {/* Deliverables */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <div
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Deliverables
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {phase.deliverables.map((item) => (
                <div
                  key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      flexShrink: 0,
                      border: '1px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={10} color="var(--accent)" strokeWidth={2.5} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--text)',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Principle row ────────────────────────────────────────── */
function PrincipleRow({
  principle,
  index,
  visible,
}: {
  principle: typeof PRINCIPLES[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="principle-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr 1fr',
        gap: '48px',
        padding: '40px 0',
        borderTop: `1px solid ${hovered ? 'rgba(61,82,230,0.35)' : 'var(--dark-border)'}`,
        alignItems: 'start',
        cursor: 'default',
        transition: 'border-color 200ms ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
      /* stagger via inline, can't use transition-delay in the shorthand above */
    >
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: hovered ? 'var(--accent)' : 'var(--dark-border)',
          transition: 'color 200ms ease',
          userSelect: 'none',
        }}
      >
        {principle.number}
      </div>
      <h3
        className="font-heading"
        style={{
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: 'var(--dark-text)',
          lineHeight: 1.2,
          paddingTop: '8px',
        }}
      >
        {principle.title}
      </h3>
      <p
        className="font-body"
        style={{
          fontSize: '14px',
          lineHeight: 1.8,
          color: 'var(--dark-muted)',
          paddingTop: '8px',
        }}
      >
        {principle.body}
      </p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function ApproachClient() {
  const [lineDrawn, setLineDrawn] = useState(false);
  const [heroPhaseIndex, setHeroPhaseIndex] = useState(-1);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLineDrawn(true), 300);
    const timers = PHASES.map((_, i) =>
      setTimeout(() => setHeroPhaseIndex(i), 600 + i * 150)
    );
    return () => {
      clearTimeout(t1);
      timers.forEach(clearTimeout);
    };
  }, []);

  const { ref: philoRef, visible: philoVisible } = useReveal();
  const { ref: principlesRef, visible: principlesVisible } = useReveal();
  const { ref: timelineRef, visible: timelineVisible } = useReveal();
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.15);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          S1 — HERO
      ════════════════════════════════════════════════════ */}
      <section
        data-nav-theme="dark"
        style={{
          backgroundColor: 'var(--dark-bg)',
          padding: '152px 32px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, var(--dark-surface) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '35%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '900px',
            background:
              'radial-gradient(circle, rgba(61,82,230,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '80px', alignItems: 'center' }}>
            {/* Left: headline block */}
            <div>
              <div className="section-label" style={{ marginBottom: '36px' }}>
                Our Approach
              </div>

              <h1
                className="font-heading"
                style={{
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  fontWeight: 500,
                  letterSpacing: '-0.035em',
                  color: 'var(--dark-text)',
                  lineHeight: 0.97,
                  marginBottom: '32px',
                }}
              >
                Built around
                <br />
                the process,
                <br />
                <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>
                  not the tool.
                </em>
              </h1>

              <p
                className="font-body"
                style={{
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  lineHeight: 1.8,
                  color: 'var(--dark-muted)',
                  maxWidth: '460px',
                  marginBottom: '52px',
                }}
              >
                Most automation projects fail because the process was never
                understood before the build started. Here is exactly how ours
                works — and why it doesn&rsquo;t fail.
              </p>

              {/* Mini stats */}
              <div className="hero-stats" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[
                  { value: '04', label: 'Phases' },
                  { value: '06', label: 'Weeks' },
                  { value: '30', label: 'Day support' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '32px',
                        fontWeight: 500,
                        color: 'var(--dark-text)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--dark-muted)',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: phase preview list */}
            <div
              className="hero-phases"
              style={{
                borderLeft: '1px solid var(--dark-border)',
                paddingLeft: '56px',
              }}
            >
              {PHASES.map((p, i) => (
                <div
                  key={p.number}
                  style={{
                    padding: '22px 0',
                    borderBottom:
                      i < PHASES.length - 1
                        ? '1px solid var(--dark-border)'
                        : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    opacity: heroPhaseIndex >= i ? 1 : 0,
                    transform:
                      heroPhaseIndex >= i ? 'translateX(0)' : 'translateX(18px)',
                    transition: 'opacity 450ms ease, transform 450ms ease',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px',
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        color: 'var(--accent)',
                        marginBottom: '6px',
                      }}
                    >
                      {p.number}
                    </div>
                    <div
                      className="font-heading"
                      style={{
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: 'var(--dark-text)',
                        lineHeight: 1.1,
                        marginBottom: '3px',
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: 'var(--dark-muted)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {p.weeks}
                    </div>
                  </div>
                  <ArrowRight size={13} color="var(--dark-border)" />
                </div>
              ))}
            </div>
          </div>

          {/* Crimson line draws across on load */}
          <div
            aria-hidden
            style={{
              height: '1px',
              backgroundColor: 'var(--accent)',
              marginTop: '88px',
              width: lineDrawn ? '100%' : '0%',
              transition: 'width 1.4s ease-in-out',
            }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S2 — PHILOSOPHY
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '120px 32px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          ref={philoRef}
          className="philo-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
            opacity: philoVisible ? 1 : 0,
            transform: philoVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 800ms ease, transform 800ms ease',
          }}
        >
          {/* Left: pull quote */}
          <div>
            <div
              aria-hidden
              className="font-heading"
              style={{
                fontSize: 'clamp(80px, 10vw, 128px)',
                color: 'var(--accent)',
                lineHeight: 0.75,
                marginBottom: '12px',
                opacity: 0.65,
                userSelect: 'none',
              }}
            >
              &ldquo;
            </div>
            <p
              className="font-heading"
              style={{
                fontSize: 'clamp(20px, 2.4vw, 30px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                color: 'var(--text)',
                maxWidth: '480px',
              }}
            >
              Every engagement starts with an audit, not a proposal. We map
              the process before we design the solution.
            </p>
            <div
              style={{
                width: '48px',
                height: '1px',
                backgroundColor: 'var(--accent)',
                marginTop: '36px',
              }}
            />
          </div>

          {/* Right: commitments */}
          <div style={{ paddingTop: '8px' }}>
            <div
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}
            >
              What this means in practice
            </div>
            {[
              'You receive a scope document before any build begins.',
              'Every automation ships with full documentation.',
              'Success metrics are agreed before the first line of logic.',
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '18px',
                  padding: '20px 0',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    color: 'var(--accent)',
                    flexShrink: 0,
                    paddingTop: '2px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.75,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S3 — FOUR PHASES
      ════════════════════════════════════════════════════ */}
      <div>
        {PHASES.map((phase, i) => (
          <PhaseRow key={phase.number} phase={phase} index={i} />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════
          S4 — PRINCIPLES
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--dark-bg)',
          borderTop: '1px solid var(--dark-border)',
          padding: '112px 32px',
        }}
      >
        <div
          ref={principlesRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              What we hold ourselves to
            </div>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: 'var(--dark-text)',
                lineHeight: 1.1,
              }}
            >
              Three rules we don&rsquo;t bend.
            </h2>
          </div>

          {PRINCIPLES.map((p, i) => (
            <PrincipleRow
              key={p.number}
              principle={p}
              index={i}
              visible={principlesVisible}
            />
          ))}

          {/* Final border */}
          <div style={{ borderTop: '1px solid var(--dark-border)' }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S5 — TIMELINE
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '112px 32px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            ref={timelineRef}
            style={{
              opacity: timelineVisible ? 1 : 0,
              transform: timelineVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 700ms ease, transform 700ms ease',
            }}
          >
            {/* Header */}
            <div
              className="timeline-header"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '56px',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: '16px' }}>
                  What to Expect
                </div>
                <h2
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: 'var(--text)',
                    lineHeight: 1.05,
                  }}
                >
                  The first 6 weeks,
                  <br />
                  mapped out.
                </h2>
              </div>
              <p
                className="font-body timeline-subtitle"
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: '320px',
                  textAlign: 'right',
                }}
              >
                From first conversation to a live, running automation.
              </p>
            </div>

            {/* Table */}
            <div>
              {/* Column headers */}
              <div
                className="timeline-table-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '96px 96px 1fr 1fr',
                  gap: '24px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--border-strong)',
                }}
              >
                {['Week', 'Phase', 'Activity', 'What you receive'].map((h) => (
                  <div
                    key={h}
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {TIMELINE.map((row, i) => (
                <div
                  key={i}
                  className="timeline-table-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '96px 96px 1fr 1fr',
                    gap: '24px',
                    padding: '22px 0',
                    borderBottom: '1px solid var(--border)',
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible ? 'translateX(0)' : 'translateX(-12px)',
                    transition: `opacity 500ms ease ${i * 90 + 300}ms, transform 500ms ease ${i * 90 + 300}ms`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      color: 'var(--accent)',
                      paddingTop: '2px',
                    }}
                  >
                    {row.week}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                      paddingTop: '2px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {row.phase}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {row.label}
                    </span>
                  </div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--text)',
                      fontWeight: 500,
                    }}
                  >
                    {row.task}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {row.output}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S6 — CTA
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--dark-bg)',
          padding: '140px 32px',
          borderTop: '1px solid var(--dark-border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, var(--dark-surface) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-200px',
            right: '-100px',
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(61,82,230,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={ctaRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 800ms ease, transform 800ms ease',
          }}
        >
          <div
            className="cta-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '24px',
                }}
              >
                Start the process
              </div>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: 'var(--dark-text)',
                  lineHeight: 1.0,
                  maxWidth: '680px',
                }}
              >
                See exactly what we&rsquo;d automate
                <br />
                for your business.
              </h2>
            </div>

            <Link
              href="/contact"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: ctaHovered ? 'var(--dark-text)' : 'var(--dark-bg)',
                backgroundColor: ctaHovered ? 'var(--accent)' : 'var(--dark-text)',
                padding: '18px 44px',
                transition: 'background-color 220ms ease, color 220ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              Book a free audit <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Responsive ────────────────────────────────────── */}
      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-phases {
            border-left: none !important;
            border-top: 1px solid var(--dark-border) !important;
            padding-left: 0 !important;
            padding-top: 40px !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-phases > div {
            border-bottom: none !important;
            border-top: 1px solid var(--dark-border) !important;
          }
          .hero-phases > div:nth-child(1),
          .hero-phases > div:nth-child(2) {
            border-top: none !important;
          }
        }

        @media (max-width: 768px) {
          .phase-row-inner {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .philo-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-phases {
            grid-template-columns: 1fr !important;
          }
          .hero-phases > div {
            border-top: 1px solid var(--dark-border) !important;
          }
          .principle-row {
            grid-template-columns: 48px 1fr !important;
            gap: 20px !important;
          }
          .principle-row > *:nth-child(3) {
            grid-column: 2 !important;
          }
          .timeline-table-row {
            grid-template-columns: 72px 1fr !important;
          }
          .timeline-table-row > *:nth-child(2),
          .timeline-table-row > *:nth-child(4) {
            display: none !important;
          }
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .timeline-subtitle {
            text-align: left !important;
          }
          .hero-stats {
            gap: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
