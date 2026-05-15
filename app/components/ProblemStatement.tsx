'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const SEVERITY_META: Array<{
  cssClass: string; bars: number; label: string; pct: number; hex: string;
}> = [
  { cssClass: 'critical', bars: 4, label: 'CRITICAL', pct: 84, hex: '#C8201A' },
  { cssClass: 'high',     bars: 3, label: 'HIGH',     pct: 67, hex: '#A86209' },
  { cssClass: 'systemic', bars: 5, label: 'SYSTEMIC', pct: 93, hex: '#3D52E6' },
];

type SMeta = typeof SEVERITY_META[0];

/* Shared: animate 0 → target with ease-out-quart */
function runCounter(
  target: number,
  setter: (v: number) => void,
  rafRef: React.MutableRefObject<number | null>,
  duration = 950
) {
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    setter(Math.round((1 - Math.pow(1 - p, 4)) * target));
    if (p < 1) rafRef.current = requestAnimationFrame(tick);
  };
  rafRef.current = requestAnimationFrame(tick);
}

/* ──────────────────────────────────────────────
   Card 1 — System resource monitor
   Maps to: "capacity gaps, not insight gaps"
   Two metric bars with staggered counters
────────────────────────────────────────────── */
function SystemLoadViz({ active, color }: { active: boolean; color: string }) {
  const [c0, setC0] = useState(0);
  const [c1, setC1] = useState(0);
  const r0 = useRef<number | null>(null);
  const r1 = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (active) {
      runCounter(84, setC0, r0);
      timer = setTimeout(() => runCounter(61, setC1, r1), 210);
    } else {
      if (r0.current) { cancelAnimationFrame(r0.current); r0.current = null; }
      if (r1.current) { cancelAnimationFrame(r1.current); r1.current = null; }
      setC0(0); setC1(0);
    }
    return () => {
      if (timer !== undefined) clearTimeout(timer);
      if (r0.current) cancelAnimationFrame(r0.current);
      if (r1.current) cancelAnimationFrame(r1.current);
    };
  }, [active]);

  const rows = [
    { label: 'CAPACITY', pct: 84, count: c0, delay: 0 },
    { label: 'COVERAGE', pct: 61, count: c1, delay: 210 },
  ];

  return (
    <div aria-hidden style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
      {rows.map(row => (
        <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '7.5px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: active ? 'rgba(13,17,71,0.45)' : 'rgba(13,17,71,0.2)',
            minWidth: '68px', transition: 'color 320ms ease',
          }}>
            {row.label}
          </span>
          <div style={{ flex: 1, height: '2px', backgroundColor: 'rgba(13,17,71,0.07)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: active ? `${row.pct}%` : '0%',
              backgroundColor: active ? color : 'rgba(13,17,71,0.15)',
              transition: active
                ? `width 950ms cubic-bezier(0.22,1,0.36,1) ${row.delay}ms, background-color 380ms ease`
                : 'width 500ms ease, background-color 380ms ease',
            }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '8px', fontWeight: 600,
            minWidth: '28px', textAlign: 'right',
            color: active ? color : 'rgba(13,17,71,0.22)',
            transition: 'color 380ms ease',
          }}>
            {row.count}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Card 2 — Phase timeline
   Maps to: "proposals describe a goal, not a schedule"
   Three phase bars with stagger + schedule density counter
────────────────────────────────────────────── */
function PhaseTimelineViz({ active, color }: { active: boolean; color: string }) {
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      runCounter(67, setPct, rafRef, 1000);
    } else {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      setPct(0);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active]);

  const phases = [
    { label: 'DISCOVERY', fill: 100 },
    { label: 'BUILD',     fill: 72  },
    { label: 'CLOSE',     fill: 44  },
  ];

  return (
    <div aria-hidden>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '10px' }}>
        {phases.map((p, i) => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace', fontSize: '7.5px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: active ? 'rgba(13,17,71,0.45)' : 'rgba(13,17,71,0.2)',
              minWidth: '68px', transition: 'color 320ms ease',
            }}>
              {p.label}
            </span>
            <div style={{ flex: 1, height: '2px', backgroundColor: 'rgba(13,17,71,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: active ? `${p.fill}%` : '0%',
                backgroundColor: active ? color : 'rgba(13,17,71,0.15)',
                transition: active
                  ? `width 800ms cubic-bezier(0.22,1,0.36,1) ${i * 130}ms, background-color 380ms ease`
                  : 'width 400ms ease',
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: '5px' }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '7px',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(13,17,71,0.2)',
        }}>
          SCHEDULE DENSITY
        </span>
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '10px', fontWeight: 700,
          color: active ? color : 'rgba(13,17,71,0.22)',
          transition: 'color 380ms ease',
        }}>
          {pct}%
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Card 3 — Handoff node graph
   Maps to: "tool outlasting the engagement"
   SVG line draw-in: BUILD → DEPLOY → HAND + 93% counter
────────────────────────────────────────────── */
function NodeGraphViz({ active, color }: { active: boolean; color: string }) {
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      runCounter(93, setPct, rafRef, 1000);
    } else {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      setPct(0);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active]);

  const Y = 20;
  const nodes = [{ id: 'BUILD', x: 18 }, { id: 'DEPLOY', x: 110 }, { id: 'HAND', x: 202 }];
  const edges = [
    { x1: 26, x2: 102, len: 76, delay: 0 },
    { x1: 118, x2: 194, len: 76, delay: 220 },
  ];

  return (
    <div aria-hidden>
      <svg width="100%" height="52" viewBox="0 0 230 52" fill="none" style={{ overflow: 'visible' }}>
        {edges.map((e, i) => (
          <line
            key={i} x1={e.x1} y1={Y} x2={e.x2} y2={Y}
            style={{
              stroke: active ? color : 'rgba(13,17,71,0.13)',
              strokeWidth: 1,
              strokeDasharray: e.len,
              strokeDashoffset: active ? 0 : e.len,
              transition: active
                ? `stroke-dashoffset 600ms cubic-bezier(0.22,1,0.36,1) ${e.delay}ms, stroke 380ms ease`
                : 'stroke-dashoffset 350ms ease, stroke 380ms ease',
            }}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <circle cx={node.x} cy={Y} r={5}
              style={{
                fill: active ? color : 'rgba(13,17,71,0.12)',
                transition: `fill 380ms ease ${i * 140}ms`,
              }}
            />
            <text x={node.x} y={42} textAnchor="middle"
              style={{
                fontFamily: 'var(--font-mono), monospace', fontSize: '7px', letterSpacing: '0.08em',
                fill: active ? 'rgba(13,17,71,0.42)' : 'rgba(13,17,71,0.18)',
                transition: 'fill 380ms ease',
              }}
            >
              {node.id}
            </text>
          </g>
        ))}
        {/* counter near the HAND node */}
        <text x={202} y={11} textAnchor="middle"
          style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '8.5px', fontWeight: 700,
            fill: active ? color : 'rgba(13,17,71,0.18)',
            transition: 'fill 380ms ease 300ms',
          }}
        >
          {pct}%
        </text>
      </svg>
    </div>
  );
}

function CardViz({ index, active, color }: { index: number; active: boolean; color: string }) {
  if (index === 0) return <SystemLoadViz active={active} color={color} />;
  if (index === 1) return <PhaseTimelineViz active={active} color={color} />;
  return <NodeGraphViz active={active} color={color} />;
}

/* ──────────────────────────────────────────────
   Finding Card
────────────────────────────────────────────── */
function FindingCard({
  finding, index, meta,
}: {
  finding: { code: string; statement: string; note: string };
  index: number;
  meta: SMeta;
}) {
  const [barsOn, setBarsOn] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, ease: EASE, delay: index * 0.13 }}
      className={`finding-card card-${meta.cssClass}`}
      onMouseEnter={() => setBarsOn(true)}
      onMouseLeave={() => setBarsOn(false)}
    >
      {/* Top row: severity + code | segment bars */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <span className="sev-label" style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>
            {meta.label}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(13,17,71,0.28)',
          }}>
            {finding.code}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', paddingTop: '3px' }}>
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} style={{
              width: '14px', height: '3px', borderRadius: '1.5px',
              backgroundColor: barsOn && j < meta.bars ? meta.hex : 'rgba(13,17,71,0.09)',
              transition: barsOn
                ? `background-color 200ms ease ${j * 90}ms`
                : 'background-color 300ms ease',
            }} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="sev-divider" style={{ height: '1px', marginBottom: '22px' }} />

      {/* Statement */}
      <h3 className="font-heading" style={{
        fontSize: 'clamp(19px, 2vw, 27px)', fontWeight: 500,
        letterSpacing: '-0.025em', lineHeight: 1.16, color: '#0D1147',
        margin: '0 0 14px',
      }}>
        {finding.statement}
      </h3>

      {/* Note */}
      <p className="font-body" style={{
        fontSize: '13px', lineHeight: 1.78,
        color: 'rgba(13,17,71,0.5)', margin: 0,
      }}>
        {finding.note}
      </p>

      {/* Techy visualization — auto margin pushes it to card bottom */}
      <div className="viz-border" style={{ marginTop: 'auto', paddingTop: '22px' }}>
        <CardViz index={index} active={barsOn} color={meta.hex} />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Section
────────────────────────────────────────────── */
export default function ProblemStatement() {
  const t = useTranslations('problem');

  const FINDINGS = [
    { code: t('d01code'), statement: t('d01statement'), note: t('d01note') },
    { code: t('d02code'), statement: t('d02statement'), note: t('d02note') },
    { code: t('d03code'), statement: t('d03statement'), note: t('d03note') },
  ];

  return (
    <section
      id="home-problem"
      data-section-label="Findings"
      style={{ backgroundColor: '#FFFFFF', padding: '96px 32px 112px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Violet ambient — top left brand presence */}
      <div aria-hidden style={{
        position: 'absolute', top: '-8%', left: '-5%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(136,96,230,0.06) 0%, transparent 62%)',
        pointerEvents: 'none',
      }} />
      {/* Cobalt ambient — bottom right */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-6%', right: '-4%',
        width: '440px', height: '440px',
        background: 'radial-gradient(circle, rgba(61,82,230,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.62, ease: EASE }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}>
            <h2 className="font-heading" style={{
              fontSize: 'clamp(72px, 9.5vw, 128px)', fontWeight: 500,
              letterSpacing: '-0.05em', lineHeight: 0.88,
              color: '#0D1147', margin: 0,
            }}>
              {t('label')}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>.</em>
            </h2>

            <div style={{ flexShrink: 0, textAlign: 'right', paddingBottom: '10px' }}>
              <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 400,
                letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--accent)',
                display: 'block',
              }}>
                0{FINDINGS.length}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(61,82,230,0.5)', display: 'block', marginTop: '4px',
              }}>
                ENTRIES
              </span>
            </div>
          </div>

          {/* Cobalt → violet gradient rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(61,82,230,0.35), rgba(136,96,230,0.18) 55%, transparent)',
              transformOrigin: 'left center', marginTop: '28px',
            }}
          />
        </motion.div>

        {/* Cards */}
        <div className="findings-grid">
          {FINDINGS.map((f, i) => (
            <FindingCard key={f.code} finding={f} index={i} meta={SEVERITY_META[i]} />
          ))}
        </div>
      </div>

      <style>{`
        .findings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .findings-grid { grid-template-columns: 1fr; gap: 16px; }
        }

        /* Card base — grayscale, no severity color */
        .finding-card {
          display: flex;
          flex-direction: column;
          padding: 32px 30px 28px;
          background: #FFFFFF;
          border-top: 3px solid rgba(13,17,71,0.09);
          border-right: 1px solid rgba(13,17,71,0.1);
          border-bottom: 1px solid rgba(13,17,71,0.1);
          border-left: 1px solid rgba(13,17,71,0.1);
          transition:
            border-top-color 420ms ease,
            border-right-color 420ms ease,
            border-bottom-color 420ms ease,
            border-left-color 420ms ease;
          cursor: default;
        }

        .sev-label   { color: rgba(13,17,71,0.22); transition: color 420ms ease; }
        .sev-divider { background: rgba(13,17,71,0.08); transition: background 420ms ease; }
        .viz-border  { border-top: 1px solid rgba(13,17,71,0.08); transition: border-color 420ms ease; }

        /* CRITICAL */
        .card-critical:hover {
          border-top-color: #C8201A;
          border-right-color: rgba(200,32,26,0.26);
          border-bottom-color: rgba(200,32,26,0.26);
          border-left-color: rgba(200,32,26,0.26);
        }
        .card-critical:hover .sev-label  { color: #C8201A; }
        .card-critical:hover .sev-divider { background: rgba(200,32,26,0.11); }
        .card-critical:hover .viz-border  { border-color: rgba(200,32,26,0.11); }

        /* HIGH */
        .card-high:hover {
          border-top-color: #A86209;
          border-right-color: rgba(168,98,9,0.26);
          border-bottom-color: rgba(168,98,9,0.26);
          border-left-color: rgba(168,98,9,0.26);
        }
        .card-high:hover .sev-label  { color: #A86209; }
        .card-high:hover .sev-divider { background: rgba(168,98,9,0.11); }
        .card-high:hover .viz-border  { border-color: rgba(168,98,9,0.11); }

        /* SYSTEMIC */
        .card-systemic:hover {
          border-top-color: #3D52E6;
          border-right-color: rgba(61,82,230,0.26);
          border-bottom-color: rgba(61,82,230,0.26);
          border-left-color: rgba(61,82,230,0.26);
        }
        .card-systemic:hover .sev-label  { color: #3D52E6; }
        .card-systemic:hover .sev-divider { background: rgba(61,82,230,0.12); }
        .card-systemic:hover .viz-border  { border-color: rgba(61,82,230,0.12); }

        @media (prefers-reduced-motion: reduce) {
          .finding-card, .sev-label, .sev-divider, .viz-border {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
