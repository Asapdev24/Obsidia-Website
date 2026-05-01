'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import WorkflowGraph from '../../components/WorkflowGraph';
import TrustBar from '../../components/TrustBar';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CYCLE_WORDS = ['approval chains.', 'manual reports.', 'data entry.', 'repetitive ops.'];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);
  return count;
}

/* ── Hero (unchanged) ─────────────────────────────────────── */
const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const WORD = {
  hidden:  { y: 28, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.65, ease: EASE } },
};
const FADE_UP = {
  hidden:  { y: 20, opacity: 0 },
  visible: (d: number) => ({ y: 0, opacity: 1, transition: { duration: 0.65, ease: EASE, delay: d } }),
};

function AutomationHero() {
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      data-nav-theme="dark"
      style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }}
      className="auto-hero-grid"
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, width: '55%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '20%', left: '-120px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(61,82,230,0.09) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 80px 32px', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ marginBottom: '28px' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>Workflow Automation</div>
        </motion.div>

        <h1 className="font-heading" style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--dark-text)', marginBottom: '28px' }}>
          <motion.div variants={CONTAINER} initial="hidden" animate="visible" style={{ display: 'block' }}>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.22em', marginBottom: '0.04em' }}>
              {['Automate', 'your'].map((w, i) => (
                <motion.span key={i} variants={WORD} style={{ display: 'inline-block' }}>{w}</motion.span>
              ))}
            </span>
            <motion.span variants={WORD} style={{ display: 'block', minHeight: '1.05em' }}>
              <AnimatePresence mode="wait">
                <motion.span key={wordIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'inline-block', color: 'var(--accent)', fontStyle: 'italic' }}>
                  {CYCLE_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.div>
        </h1>

        <motion.p variants={FADE_UP} custom={0.85} initial="hidden" animate="visible" className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: 'var(--dark-muted)', maxWidth: '460px', marginBottom: '44px' }}>
          Your team is losing hours every week to tasks that should run automatically. We map those tasks, build the workflows, and hand them over — fully documented and production-ready.
        </motion.p>

        <motion.div variants={FADE_UP} custom={1.05} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <MagneticButton strength={0.22}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', backgroundColor: 'var(--accent)', padding: '14px 28px', transition: 'background-color 200ms ease' }}
              onMouseEnter={(e) => { (e.currentTarget).style.backgroundColor = 'var(--accent-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.backgroundColor = 'var(--accent)'; }}>
              Start a Project <ArrowRight size={13} />
            </Link>
          </MagneticButton>
          <Link href="/approach" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dark-muted)', textDecoration: 'none', borderBottom: '1px solid var(--dark-border)', paddingBottom: '3px', transition: 'color 200ms ease, border-color 200ms ease' }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = 'var(--dark-text)'; el.style.borderColor = 'var(--dark-muted)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = 'var(--dark-muted)'; el.style.borderColor = 'var(--dark-border)'; }}>
            Our Process <ArrowRight size={12} />
          </Link>
        </motion.div>

        <motion.div variants={FADE_UP} custom={1.35} initial="hidden" animate="visible" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', border: '1px solid var(--dark-border)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '10px 18px', width: 'fit-content' }}>
          <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#22C55E', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: '-5px', borderRadius: '50%', border: '1px solid #22C55E', animation: 'pulseRing 2.2s ease-out infinite' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'var(--dark-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--dark-text)', fontWeight: 600 }}>47</span>{' '}workflows automated this month
          </span>
        </motion.div>

        <div aria-hidden style={{ position: 'absolute', bottom: '32px', left: '32px', display: 'flex', alignItems: 'center', gap: '10px', animation: 'scrollBounce 2.6s ease-in-out infinite' }}>
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--dark-border)' }} />
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dark-muted)' }}>Scroll</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
        <WorkflowGraph />
      </motion.div>

      <style>{`
        @media (max-width: 1024px) { .auto-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; } .auto-hero-grid > div:last-child { display: none !important; } }
      `}</style>
    </section>
  );
}

/* ── Stats band — dark ROI dashboard ─────────────────────── */
interface AutoStat { num: number; suffix: string; label: string; context: string; fill: number; tag: string; }
const AUTO_STATS: AutoStat[] = [
  { num: 72, suffix: '+ hrs', label: 'Saved per employee, per month',       context: "That's a full work week, every month, per person.",      fill: 85, tag: 'TIME RECOVERED'  },
  { num: 3,  suffix: '×',     label: 'Faster approval cycles',              context: 'Decisions that took 3 days now take 4 minutes.',          fill: 60, tag: 'VELOCITY'        },
  { num: 60, suffix: '%',     label: 'Reduction in processing cost',        context: 'Less than half the overhead. Same output.',               fill: 60, tag: 'COST EFFICIENCY' },
];

function AutoStatItem({ stat, index, active }: { stat: AutoStat; index: number; active: boolean }) {
  const count = useCountUp(stat.num, active, 1600 + index * 200);
  return (
    <div className="auto-stat-item" style={{
      flex: 1,
      padding: '64px 0',
      borderRight: index < 2 ? '1px solid #1E1E1C' : 'none',
      paddingRight: index < 2 ? '56px' : '0',
      paddingLeft:  index > 0 ? '56px' : '0',
      opacity:    active ? 1 : 0,
      transform:  active ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 700ms ease ${index * 140}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 140}ms`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <div style={{ width: '5px', height: '5px', backgroundColor: '#22C55E', borderRadius: '50%', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A38' }}>{stat.tag}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '18px' }}>
        <span className="font-heading" style={{ fontSize: 'clamp(52px, 6.5vw, 84px)', fontWeight: 500, letterSpacing: '-0.04em', color: '#F0EFE9', lineHeight: 0.9 }}>{count}</span>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '20px', color: 'var(--accent)', fontWeight: 400, marginLeft: '4px' }}>{stat.suffix}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A4A48', marginBottom: '20px' }}>{stat.label}</p>
      <div style={{ position: 'relative', height: '1px', backgroundColor: '#1E1E1C', marginBottom: '14px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          width: active ? `${stat.fill}%` : '0%',
          backgroundColor: 'var(--accent)', opacity: 0.65,
          transition: `width 2s cubic-bezier(0.22,1,0.36,1) ${index * 200 + 500}ms`,
        }} />
      </div>
      <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', lineHeight: 1.65, color: '#3A3A38', fontStyle: 'italic' }}>{stat.context}</p>
    </div>
  );
}

function AutomationStatsBand() {
  const { ref, visible } = useReveal(0.25);
  return (
    <section ref={ref} style={{ backgroundColor: '#111111', borderTop: '1px solid #1E1E1C', borderBottom: '1px solid #1E1E1C' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex' }} className="auto-stats-inner">
        {AUTO_STATS.map((s, i) => <AutoStatItem key={i} stat={s} index={i} active={visible} />)}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .auto-stats-inner  { flex-direction: column !important; }
          .auto-stat-item    { border-right: none !important; border-bottom: 1px solid #1E1E1C !important; padding: 48px 0 !important; }
          .auto-stat-item:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Abstract SVG graphics for zig-zag rows ───────────────── */
function ApprovalSVG() {
  return (
    <svg viewBox="0 0 280 160" fill="none" width="100%" style={{ maxWidth: '360px' }}>
      <circle cx="44" cy="80" r="28" stroke="#D4D2CC" strokeWidth="1.5"/>
      <circle cx="44" cy="80" r="8" fill="#D4D2CC"/>
      <line x1="72" y1="80" x2="100" y2="80" stroke="#D4D2CC" strokeWidth="1" strokeDasharray="5,4"/>
      <polygon points="98,76 106,80 98,84" fill="#D4D2CC"/>
      <circle cx="140" cy="80" r="32" stroke="rgba(61,82,230,0.6)" strokeWidth="1.5" fill="rgba(61,82,230,0.04)"/>
      <circle cx="140" cy="74" r="10" stroke="rgba(61,82,230,0.5)" strokeWidth="1.2" fill="none"/>
      <line x1="140" y1="66" x2="140" y2="74" stroke="rgba(61,82,230,0.7)" strokeWidth="1.5"/>
      <line x1="140" y1="74" x2="145" y2="74" stroke="rgba(61,82,230,0.7)" strokeWidth="1.5"/>
      <text x="140" y="96" fontSize="8" fill="rgba(61,82,230,0.55)" textAnchor="middle" fontFamily="monospace" letterSpacing="1">+3 DAYS</text>
      <line x1="172" y1="80" x2="200" y2="80" stroke="#1E1E1C" strokeWidth="1" strokeDasharray="5,4"/>
      <polygon points="198,76 206,80 198,84" fill="#1E1E1C"/>
      <circle cx="236" cy="80" r="28" stroke="#1E1E1C" strokeWidth="1" strokeDasharray="5,4"/>
      <circle cx="236" cy="80" r="8" fill="#1E1E1C" opacity="0.3"/>
    </svg>
  );
}

function ManualDataSVG() {
  return (
    <svg viewBox="0 0 280 160" fill="none" width="100%" style={{ maxWidth: '360px' }}>
      <rect x="8" y="28" width="100" height="104" rx="3" stroke="#D4D2CC" strokeWidth="1.5"/>
      {[0,1,2,3].map(i => <line key={i} x1="8" y1={52 + i*24} x2="108" y2={52 + i*24} stroke="#E8E6E0" strokeWidth="1"/>)}
      {[0,1,2].map(i => (
        <rect key={i} x={16} y={56 + i*24} width={42} height={10} rx="1" fill="#E8E6E0"/>
      ))}
      {[0,1,2].map(i => (
        <rect key={i} x={64} y={56 + i*24} width={28} height={10} rx="1" fill="#F0EEE8"/>
      ))}
      <path d="M 118 80 Q 140 60 162 80" stroke="rgba(61,82,230,0.4)" strokeWidth="1.5" strokeDasharray="4,3" fill="none"/>
      <polygon points="159,75 165,81 157,83" fill="rgba(61,82,230,0.4)"/>
      <text x="140" y="56" fontSize="8" fill="rgba(61,82,230,0.4)" textAnchor="middle" fontFamily="monospace">copy</text>
      <rect x="172" y="28" width="100" height="104" rx="3" stroke="#D4D2CC" strokeWidth="1.5"/>
      {[0,1,2,3].map(i => <line key={i} x1="172" y1={52 + i*24} x2="272" y2={52 + i*24} stroke="#E8E6E0" strokeWidth="1"/>)}
      {[0,1,2].map(i => (
        <rect key={i} x={180} y={56 + i*24} width={42} height={10} rx="1" fill={i === 0 ? 'rgba(61,82,230,0.08)' : '#E8E6E0'}/>
      ))}
      <text x="140" y="150" fontSize="8" fill="#9A9A98" textAnchor="middle" fontFamily="monospace" letterSpacing="1">1 IN 25 HAS AN ERROR</text>
    </svg>
  );
}

function SilosSVG() {
  const tools = [
    { x: 8,   y: 20,  label: 'CRM' },
    { x: 100, y: 20,  label: 'ERP' },
    { x: 8,   y: 96,  label: 'PM'  },
    { x: 100, y: 96,  label: 'FIN' },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" width="100%" style={{ maxWidth: '360px' }}>
      {tools.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width="72" height="44" rx="4" stroke="#D4D2CC" strokeWidth="1.5" fill="none"/>
          <text x={t.x + 36} y={t.y + 27} fontSize="9" fill="#9A9A98" textAnchor="middle" fontFamily="monospace" letterSpacing="1">{t.label}</text>
        </g>
      ))}
      {/* Broken connectors in the center */}
      <line x1="80" y1="42" x2="100" y2="42" stroke="#E0DEDC" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="90" y="38" fontSize="10" fill="rgba(61,82,230,0.4)" textAnchor="middle">×</text>
      <line x1="80" y1="118" x2="100" y2="118" stroke="#E0DEDC" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="90" y="114" fontSize="10" fill="rgba(61,82,230,0.4)" textAnchor="middle">×</text>
      <line x1="44" y1="64" x2="44" y2="96" stroke="#E0DEDC" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="40" y="83" fontSize="10" fill="rgba(61,82,230,0.4)" textAnchor="middle">×</text>
      <line x1="136" y1="64" x2="136" y2="96" stroke="#E0DEDC" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="132" y="83" fontSize="10" fill="rgba(61,82,230,0.4)" textAnchor="middle">×</text>
      {/* Central connector box — "bridge" that doesn't exist */}
      <rect x="90" y="58" width="100" height="44" rx="3" stroke="rgba(61,82,230,0.25)" strokeDasharray="4,3" strokeWidth="1.2"/>
      <text x="140" y="75" fontSize="7" fill="rgba(61,82,230,0.35)" textAnchor="middle" fontFamily="sans-serif">1 person manually</text>
      <text x="140" y="88" fontSize="7" fill="rgba(61,82,230,0.35)" textAnchor="middle" fontFamily="sans-serif">keeps these in sync</text>
    </svg>
  );
}

function ReportsSVG() {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65, 0.5];
  return (
    <svg viewBox="0 0 280 160" fill="none" width="100%" style={{ maxWidth: '360px' }}>
      <line x1="32" y1="16" x2="32" y2="128" stroke="#D4D2CC" strokeWidth="1"/>
      <line x1="32" y1="128" x2="240" y2="128" stroke="#D4D2CC" strokeWidth="1"/>
      {bars.map((h, i) => (
        <rect key={i} x={44 + i*32} y={128 - h*108} width="20" height={h*108} rx="1"
          fill={i === 3 ? 'rgba(61,82,230,0.3)' : '#E8E6E0'}
          stroke={i === 3 ? 'rgba(61,82,230,0.5)' : 'none'} strokeWidth="1"/>
      ))}
      {/* Hand cursor icon */}
      <path d="M208 72 L208 96 L216 104 L226 104 L226 80 L220 80 L220 72 Z" stroke="#9A9A98" strokeWidth="1.2" fill="none"/>
      <line x1="212" y1="80" x2="212" y2="72" stroke="#9A9A98" strokeWidth="1.2"/>
      <line x1="216" y1="78" x2="216" y2="70" stroke="#9A9A98" strokeWidth="1.2"/>
      <text x="140" y="148" fontSize="8" fill="rgba(61,82,230,0.5)" textAnchor="middle" fontFamily="monospace" letterSpacing="1">100+ HRS / YEAR</text>
    </svg>
  );
}

/* ── Zig-zag problem section ──────────────────────────────── */
const AUTO_PROBLEMS = [
  {
    n: '01', title: 'Approval chains that take days',
    body: 'Requests sit in inboxes while your team waits for sign-off. Every day of delay is a decision your business didn\'t make fast enough. The bottleneck is the process, not the people.',
    Graphic: ApprovalSVG,
  },
  {
    n: '02', title: 'Manual data entry at every step',
    body: 'Your team copies data between systems by hand, and each transfer takes time it shouldn\'t. One in 25 manual transfers contains a mistake — and they compound quietly.',
    Graphic: ManualDataSVG,
  },
  {
    n: '03', title: 'Tools that don\'t talk to each other',
    body: 'CRM, ERP, project management, finance — each system is a silo you pay someone to bridge. Keeping them in sync is a full-time job that produces zero business output.',
    Graphic: SilosSVG,
  },
  {
    n: '04', title: 'Reports that require a human to run',
    body: 'Every week, someone spends two hours pulling the same numbers from the same places. That\'s over 100 hours a year producing reports that could run themselves.',
    Graphic: ReportsSVG,
  },
];

function AutomationZigZag() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} style={{ borderBottom: '1px solid var(--border)' }}>
      {/* ── Red header panel ─────────────────────────────── */}
      <div style={{ backgroundColor: '#8C0E1C', padding: '80px 32px 72px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms ease, transform 600ms ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
              The Problem
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(40px, 5vw, 66px)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.03em', color: '#FFFFFF', maxWidth: '720px' }}>
              Your biggest operational cost<br />isn&rsquo;t salaries.
            </h2>
            <p className="font-body" style={{ marginTop: '28px', fontSize: '17px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: '520px' }}>
              Every hour spent on manual, repetitive work is an hour your business isn&rsquo;t growing. The inefficiency compounds quietly — and most companies don&rsquo;t measure it until it&rsquo;s costing them millions.
            </p>
          </div>
        </div>
      </div>

      {AUTO_PROBLEMS.map((p, i) => {
        const isReversed = i % 2 === 1;
        const bg = i % 2 === 0 ? '#FFFFFF' : 'var(--surface)';
        return (
          <div
            key={i}
            style={{
              borderTop: '1px solid var(--border)',
              backgroundColor: bg,
            }}
          >
            <div
              className="auto-zigzag-row"
              style={{
                maxWidth: '1200px', margin: '0 auto', padding: '0 32px',
                display: 'grid',
                gridTemplateColumns: isReversed ? '40% 60%' : '60% 40%',
                alignItems: 'center',
                minHeight: '280px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 600ms ease ${i * 120 + 200}ms, transform 600ms ease ${i * 120 + 200}ms`,
              }}
            >
              {/* Text side */}
              <div style={{ order: isReversed ? 2 : 1, padding: isReversed ? '56px 0 56px 64px' : '56px 64px 56px 0' }} className="auto-zigzag-text">
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '20px' }}>{p.n}</div>
                <h3 className="font-heading" style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.2, marginBottom: '20px' }}>{p.title}</h3>
                <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '420px' }}>{p.body}</p>
              </div>

              {/* Graphic side */}
              <div style={{
                order: isReversed ? 1 : 2,
                padding: '32px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderLeft: !isReversed ? '1px solid var(--border)' : 'none',
                borderRight: isReversed ? '1px solid var(--border)' : 'none',
                height: '100%',
              }}>
                <p.Graphic />
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @media (max-width: 900px) {
          .auto-zigzag-row { grid-template-columns: 1fr !important; }
          .auto-zigzag-row > div:last-child { display: none !important; }
          .auto-zigzag-text { order: 1 !important; padding: 40px 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Accordion services section ───────────────────────────── */
const AUTO_SERVICES = [
  {
    n: '01', tag: 'Approval & Routing',
    title: 'Document & Approval Automation',
    body: 'We map your approval chain and replace each manual step with a triggered route. Documents reach the right person in seconds, not days.',
    outcome: 'Cut approval time by up to 80%',
  },
  {
    n: '02', tag: 'Data & Integration',
    title: 'Data Integration & Sync',
    body: 'We connect your CRM, ERP, and finance tools so data moves between them without anyone touching it. One entry. Every system updated.',
    outcome: 'Eliminate cross-system data errors',
  },
  {
    n: '03', tag: 'Reporting & Analytics',
    title: 'Automated Reporting Pipelines',
    body: "We build pipelines that pull your numbers, format them, and deliver them on a schedule you set. Your weekly report runs without anyone opening a spreadsheet.",
    outcome: 'Reclaim hours of report-building per week',
  },
  {
    n: '04', tag: 'Operations',
    title: 'Custom Operations Workflows',
    body: "We audit your highest-friction process and build the automation that removes it. Built to your exact spec, documented, and handed off to your team.",
    outcome: 'Workflows built to your exact spec',
  },
];

function AccordionItem({
  item, isOpen, onClick, index, active,
}: {
  item: typeof AUTO_SERVICES[0]; isOpen: boolean;
  onClick: () => void; index: number; active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        opacity:    active ? 1 : 0,
        transform:  active ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 600ms ease ${index * 100 + 200}ms, transform 600ms ease ${index * 100 + 200}ms`,
      }}
    >
      {/* Header */}
      <button
        onClick={onClick}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '20px',
          padding: '28px 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.12em', color: isOpen ? 'var(--accent)' : '#3A3A38', flexShrink: 0, transition: 'color 200ms ease' }}>{item.n}</span>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,239,233,0.35)', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', flexShrink: 0 }}>{item.tag}</span>
        <span className="font-heading" style={{ flex: 1, fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', color: isOpen ? '#F0EFE9' : hovered ? '#C8C6C0' : '#6A6A68', lineHeight: 1.15, transition: 'color 200ms ease' }}>{item.title}</span>
        <div style={{ flexShrink: 0, width: '28px', height: '28px', border: `1px solid ${isOpen ? 'rgba(61,82,230,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 200ms ease' }}>
          {isOpen
            ? <Minus size={12} color="var(--accent)" />
            : <Plus size={12} color="#6A6A68" />
          }
        </div>
      </button>

      {/* Expandable content */}
      <div style={{ overflow: 'hidden', maxHeight: isOpen ? '200px' : '0', transition: 'max-height 380ms cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ padding: '0 0 32px 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'start' }} className="accordion-content">
          <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(240,239,233,0.55)', margin: 0 }}>{item.body}</p>
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--accent)', whiteSpace: 'nowrap' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
            {item.outcome}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationAccordion() {
  const { ref, visible } = useReveal(0.08);
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--dark-bg)', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px', padding: '112px 32px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50%', height: '70%', background: 'radial-gradient(ellipse, rgba(61,82,230,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '56px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
        }} className="accordion-header">
          <div>
            <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 12px', display: 'inline-block', marginBottom: '20px' }}>What We Build</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--dark-text)', lineHeight: 1.1 }}>
              The four workflows<br />businesses automate first.
            </h2>
          </div>
          <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(240,239,233,0.45)', paddingTop: '8px', alignSelf: 'end' }}>
            Every engagement starts with an audit. We find the highest-value automations first and build those — so you see ROI within weeks, not months.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {AUTO_SERVICES.map((s, i) => (
            <AccordionItem
              key={i} item={s} index={i} active={visible}
              isOpen={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .accordion-header { grid-template-columns: 1fr !important; gap: 24px !important; } .accordion-content { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ── Process section — dark pipeline terminal ─────────────── */
const AUTO_PHASES = [
  {
    n: '01', title: 'Audit', tag: 'Discovery', time: '~1 wk',
    detail: 'We map every manual touchpoint across your operation and score each by time-cost. You get a ranked list of what to automate before a single line of logic is written.',
    deliverable: 'Prioritised automation roadmap',
  },
  {
    n: '02', title: 'Design', tag: 'Architecture', time: '~1 wk',
    detail: 'We architect the full logic — triggers, conditions, transformations, error paths. The complete design is reviewed and signed off before development starts.',
    deliverable: 'Signed-off workflow blueprint',
  },
  {
    n: '03', title: 'Build', tag: 'Development', time: '~3 wks',
    detail: 'Built and tested in a staging environment mirroring production. Every workflow ships with structured logging, retry logic, and full documentation.',
    deliverable: 'Tested, documented automation',
  },
  {
    n: '04', title: 'Handoff', tag: 'Delivery', time: '~1 wk',
    detail: 'We deploy to production, walk your team through every workflow, and hand over complete documentation. Thirty days of post-launch fixes are included.',
    deliverable: 'Full handover + 30-day support',
  },
];

function AutoPhaseRow({ phase, index, visible, isLast }: { phase: typeof AUTO_PHASES[0]; index: number; visible: boolean; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr',
        gap: '0 28px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 600ms ease ${index * 120 + 200}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 120 + 200}ms`,
      }}
    >
      {/* Left rail: number + diamond + vertical line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', color: '#2A2A28', marginBottom: '10px', textAlign: 'center' }}>{phase.n}</span>
        <div style={{
          width: '9px', height: '9px',
          backgroundColor: 'var(--accent)',
          transform: `rotate(45deg) scale(${hov ? 1.4 : 1})`,
          boxShadow: hov ? '0 0 12px rgba(61,82,230,0.6)' : 'none',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
          flexShrink: 0,
          zIndex: 2,
        }} />
        {!isLast && (
          <div style={{ flex: 1, width: '1px', backgroundColor: '#1E1E1C', marginTop: '8px', minHeight: '40px' }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ paddingBottom: isLast ? '0' : '52px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : '#3A3A38', transition: 'color 200ms ease' }}>{phase.tag}</span>
          <span style={{ width: '1px', height: '8px', backgroundColor: '#1E1E1C', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: '#2A2A28' }}>{phase.time}</span>
        </div>
        <h3 className="font-heading" style={{ fontSize: 'clamp(24px, 2.5vw, 34px)', fontWeight: 500, color: hov ? '#FFFFFF' : '#F0EFE9', lineHeight: 1.1, marginBottom: '14px', letterSpacing: '-0.02em', transition: 'color 200ms ease' }}>{phase.title}</h3>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.75, color: '#4A4A48', marginBottom: '18px', maxWidth: '560px' }}>{phase.detail}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : '#2A2A28', transition: 'color 200ms ease' }}>Deliverable —</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: '#3A3A38', lineHeight: 1.5 }}>{phase.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

function AutoProcessTimeline() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} style={{ backgroundColor: '#111111', borderTop: '1px solid #1E1E1C' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px 64px', borderBottom: '1px solid #1E1E1C' }}>
        <div className="auto-proc-header" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'flex-end', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
              How We Work
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 4.2vw, 56px)', fontWeight: 500, letterSpacing: '-0.025em', color: '#F0EFE9', lineHeight: 1.05 }}>
              From first call to live automation.
            </h2>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '4px' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, color: '#F0EFE9', letterSpacing: '-0.02em', lineHeight: 1 }}>4–6</div>
            <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A38', marginTop: '4px' }}>weeks · start to live</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 80px' }}>
        {AUTO_PHASES.map((phase, i) => (
          <AutoPhaseRow key={i} phase={phase} index={i} visible={visible} isLast={i === AUTO_PHASES.length - 1} />
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .auto-proc-header { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function AutomationClient() {
  return (
    <>
      <AutomationHero />
      <AutomationStatsBand />
      <AutomationZigZag />
      <AutomationAccordion />
      <AutoProcessTimeline />
      <TrustBar />
      <CTABand />
    </>
  );
}
