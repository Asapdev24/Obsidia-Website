'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Check } from 'lucide-react';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';
import { useReveal } from '@/app/hooks/useScroll';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];



/* ── Animated browser build visual ───────────────────────── */
function BrowserBuildVisual() {
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 5), 1200);
    return () => clearInterval(id);
  }, [mounted]);

  const lines = [
    { label: 'Nav bar',      w: '100%', delay: 0 },
    { label: 'Hero section', w: '100%', delay: 1 },
    { label: 'Feature grid', w: '100%', delay: 2 },
    { label: 'CTA band',     w: '100%', delay: 3 },
    { label: 'Footer',       w: '100%', delay: 4 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0D0F1A', overflow: 'hidden' }}>
      {/* Gradient panel separator — left edge */}
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px', background: 'linear-gradient(180deg, rgba(61,82,230,0.0) 0%, rgba(61,82,230,0.5) 40%, rgba(123,79,212,0.4) 70%, rgba(61,82,230,0.0) 100%)', zIndex: 2 }} />
      {/* Cobalt ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(61,82,230,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(61,82,230,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '20px', left: '24px', fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.32)', zIndex: 1 }}>Website Preview</div>
      <div style={{ position: 'absolute', top: '22px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'statPulse 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.32)' }}>Building</span>
      </div>
      <div style={{ position: 'absolute', inset: '52px 24px 28px', backgroundColor: '#0E1020', border: '1px solid rgba(61,82,230,0.2)', borderRadius: '4px', overflow: 'hidden', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease' }}>
        <div style={{ height: '28px', backgroundColor: '#141628', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 14px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', opacity: 0.7 }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A2A38' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A2A38' }} />
          <div style={{ flex: 1, marginLeft: '12px', height: '14px', backgroundColor: '#1A1A18', borderRadius: '2px', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>yourbrand.com</span>
          </div>
        </div>
        <div style={{ padding: '0', height: 'calc(100% - 28px)', display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
          {lines.map((line, i) => {
            const built = i <= phase;
            return (
              <div key={i} style={{ flex: i === 1 ? 3 : 1, backgroundColor: built ? '#0E1020' : '#0C0D18', borderBottom: i < lines.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', position: 'relative', overflow: 'hidden', transition: 'background-color 400ms ease' }}>
                {built && <div style={{ position: 'absolute', top: 0, left: 0, height: '1px', backgroundColor: 'var(--accent)', width: '100%', opacity: 0.5 }} />}
                <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: built ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.07)', transition: 'color 400ms ease' }}>{line.label}</div>
                {i === 1 && built && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', gap: '6px' }}>
                    <div style={{ height: '10px', width: '55%', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px' }} />
                    <div style={{ height: '7px', width: '38%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
                    <div style={{ height: '20px', width: '88px', backgroundColor: 'rgba(61,82,230,0.25)', borderRadius: '2px', border: '1px solid rgba(61,82,230,0.4)', marginTop: '4px' }} />
                  </div>
                )}
                {built && <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', opacity: 0.7 }}><Check size={9} color="var(--accent)" strokeWidth={2} /></div>}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono), monospace', fontSize: '8px', color: 'rgba(61,82,230,0.45)', letterSpacing: '0.12em', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease 400ms' }}>
        {Math.min(phase + 1, 5)}/5 SECTIONS · {Math.min((phase + 1) * 20, 100)}% BUILT
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function WebsitesHero() {
  const CYCLE = ['win clients.', 'drive inquiries.', 'close deals.', 'build trust.', 'earns its keep.'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-nav-theme="dark" id="web-hero" data-section-label="Overview" style={{ position: 'relative', minHeight: '100dvh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }} className="web-hero-grid">
      <div aria-hidden style={{ position: 'absolute', inset: 0, width: '55%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(61,82,230,0.09) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 80px 32px', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ marginBottom: '28px' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>Website Development</div>
        </motion.div>
        <h1 className="font-heading" style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--dark-text)', marginBottom: '28px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <span style={{ display: 'block', marginBottom: '0.04em' }}>Your website</span>
            <span style={{ display: 'block', marginBottom: '0.04em' }}>should actually</span>
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'block', color: 'var(--accent)', fontStyle: 'italic' }}>
                {CYCLE[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.85 }} className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: 'var(--dark-muted)', maxWidth: '460px', marginBottom: '44px' }}>
          A slow, confusing, or outdated website costs you leads every day, and most businesses don&rsquo;t notice until a competitor takes them. We build websites that earn their keep.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <MagneticButton strength={0.22}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', backgroundColor: 'var(--accent)', padding: '14px 28px', borderRadius: '50px', transition: 'background-color 200ms ease' }}
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
      </div>

      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
        <BrowserBuildVisual />
      </motion.div>

      <style>{`
        @media (max-width: 1024px) { .web-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; } .web-hero-grid > div:last-child { display: none !important; } }
      `}</style>
    </section>
  );
}



/* ── Problem section — two-column layout ─────────────────── */
const WEB_PROBLEMS = [
  {
    n: '01',
    title: 'Slow sites do not lose visitors. They send them to competitors.',
    body: 'Every second of delay is a decision made without you. Most sites lose that argument before they finish loading.',
  },
  {
    n: '02',
    title: 'First impressions close deals before you do.',
    body: 'Buyers have already judged your business before they read a word. An outdated site is a closed door.',
  },
  {
    n: '03',
    title: 'Built for a business you no longer run.',
    body: 'The messaging, the structure, the calls to action. All written for a version of the company that has moved on.',
  },
];

/* ── Micro-animation widgets ──────────────────────────────── */

/* 01 — Session countdown timer: 10→0, loops */
function TimerWidget({ active }: { active: boolean }) {
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setCount(c => (c <= 0 ? 10 : c - 1)), 900);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div aria-hidden style={{
      width: '54px', height: '42px',
      backgroundColor: '#080A14',
      border: '1px solid rgba(61,82,230,0.2)',
      borderRadius: '3px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '22px', fontWeight: 500,
        color: 'var(--accent)',
        letterSpacing: '-0.04em', lineHeight: 1,
      }}>
        {String(count).padStart(2, '0')}
      </span>
    </div>
  );
}

/* 02 — Site/Competitor crossfade toggle, 2s cadence */
function SiteToggleWidget({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  const LABELS = ['YOUR SITE', 'COMPETITOR'];
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 2), 2000);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div aria-hidden style={{
      width: '88px', height: '42px',
      backgroundColor: '#080A14',
      border: '1px solid rgba(61,82,230,0.2)',
      borderRadius: '3px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, overflow: 'hidden', position: 'relative',
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '7.5px', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: phase === 0 ? 'var(--accent)' : 'rgba(220,225,248,0.55)',
          }}
        >
          {LABELS[phase]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* 03 — Year counter: 2021 → 2022 → 2023 → TODAY (pauses 2.5s), resets */
function YearWidget({ active }: { active: boolean }) {
  const YEARS = ['2021', '2022', '2023', 'TODAY'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      current = (current + 1) % YEARS.length;
      setIdx(current);
      timer = setTimeout(tick, current === YEARS.length - 1 ? 2500 : 1000);
    };
    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, [active]);
  const isToday = idx === YEARS.length - 1;
  return (
    <div aria-hidden style={{
      width: '72px', height: '42px',
      backgroundColor: '#080A14',
      border: `1px solid ${isToday ? 'rgba(61,82,230,0.45)' : 'rgba(61,82,230,0.2)'}`,
      borderRadius: '3px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, position: 'relative', overflow: 'hidden',
      transition: 'border-color 400ms ease',
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: isToday ? '8.5px' : '12px',
            letterSpacing: isToday ? '0.16em' : '0.06em',
            fontWeight: isToday ? 600 : 400,
            color: isToday ? 'var(--accent)' : 'rgba(220,225,248,0.6)',
            textTransform: 'uppercase',
          }}
        >
          {YEARS[idx]}
        </motion.span>
      </AnimatePresence>
      {isToday && (
        <motion.div
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            border: '1px solid var(--accent)',
            borderRadius: '3px',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

const PROB_WIDGETS = [TimerWidget, SiteToggleWidget, YearWidget];

/* ── Problem item row ─────────────────────────────────────── */
function ProblemItem({
  item, index, visible,
}: {
  item: typeof WEB_PROBLEMS[0]; index: number; visible: boolean;
}) {
  const Widget = PROB_WIDGETS[index];
  const isLast = index === WEB_PROBLEMS.length - 1;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '28px',
        alignItems: 'start',
        paddingBottom: isLast ? 0 : '36px',
        marginBottom: isLast ? 0 : '36px',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-22px)',
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${index * 150 + 300}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 150 + 300}ms`,
      }}
    >
      {/* Number + widget column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', paddingTop: '2px' }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.16em', color: 'var(--accent)',
        }}>
          {item.n}
        </span>
        <Widget active={visible} />
      </div>

      {/* Text column */}
      <div>
        <h3 className="font-heading" style={{
          fontSize: 'clamp(20px, 1.9vw, 28px)',
          fontWeight: 500, letterSpacing: '-0.025em',
          color: 'var(--text)', lineHeight: 1.14,
          marginBottom: '10px',
        }}>
          {item.title}
        </h3>
        <p className="font-body" style={{
          fontSize: '15px', lineHeight: 1.78,
          color: 'var(--text-secondary)', margin: 0,
        }}>
          {item.body}
        </p>
      </div>
    </div>
  );
}

/* ── Live Diagnostic card — enlarged for right column ────── */
function LiveDiagnosticCard({ visible }: { visible: boolean }) {
  const [revenueLost, setRevenueLost] = useState(12840);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => {
      setRevenueLost(prev => prev + Math.floor(Math.random() * 30 + 10));
    }, 1500);
    return () => clearInterval(t);
  }, [visible]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1, opacity: 1,
      transition: { duration: 2, ease: 'easeInOut' as const },
    },
  };

  return (
    <div style={{
      width: '100%',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '40px 36px',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 700ms ease 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms',
    }}>
      <div aria-hidden style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '240px', height: '240px',
        background: 'radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 65%)',
        filter: 'blur(32px)', pointerEvents: 'none',
      }} />

      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', flexShrink: 0 }}
        />
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '11px', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.18em',
          color: 'var(--text-secondary)',
        }}>
          Live Diagnostic
        </span>
      </div>

      {/* Revenue number */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '13px', color: 'var(--text-muted)',
          marginBottom: '10px', letterSpacing: '0.01em',
        }}>
          Estimated Monthly Loss
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 'clamp(38px, 3.8vw, 52px)',
            color: '#EF4444',
            fontFamily: 'var(--font-heading), serif',
            fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1,
          }}>
            ${revenueLost.toLocaleString()}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11px', padding: '5px 12px',
            background: 'rgba(239,68,68,0.07)',
            color: '#EF4444', borderRadius: '4px',
            letterSpacing: '0.06em', fontWeight: 600,
          }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Downward trend chart */}
      <div style={{ height: '100px', width: '100%', marginBottom: '36px' }}>
        <svg viewBox="0 0 260 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {[22, 50, 78].map(y => (
            <line key={y} x1="0" y1={y} x2="260" y2={y}
              stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          <motion.path
            d="M 0 8 Q 55 8, 100 28 T 175 60 T 260 90"
            fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"
            variants={pathVariants}
            initial="hidden"
            animate={visible ? 'visible' : 'hidden'}
          />
          <motion.circle
            cx="260" cy="90" r="4.5" fill="#EF4444"
            initial={{ scale: 0, opacity: 0 }}
            animate={visible
              ? { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
              : { scale: 0, opacity: 0 }}
            transition={{ delay: 2.1, duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </div>

      {/* Vital rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { label: 'Bounce Rate', value: '78%',  status: 'critical' as const, delay: 0.3 },
          { label: 'Load Time',   value: '4.2s', status: 'warning'  as const, delay: 0.5 },
          { label: 'Conversion',  value: '0.8%', status: 'critical' as const, delay: 0.7 },
        ].map(v => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, x: -12 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.5, delay: v.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 18px',
              background: v.status === 'critical' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)',
              borderRadius: '6px',
              border: `1px solid ${v.status === 'critical' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)'}`,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px', letterSpacing: '0.04em', color: 'var(--text-secondary)',
            }}>
              {v.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '13px', fontWeight: 700,
              color: v.status === 'critical' ? '#EF4444' : '#F59E0B',
            }}>
              {v.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Two-column problem section ───────────────────────────── */
function WebStickyProblem() {
  const { ref, visible } = useReveal(0.05);

  return (
    <section
      ref={ref}
      id="web-problem"
      data-section-label="The Problem"
      data-nav-theme="light"
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="web-prob-outer"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 32px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: '72px',
          alignItems: 'stretch',
        }}
      >
        {/* ── Left 55% ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          {/* Section label */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 500ms ease 100ms, transform 500ms ease 100ms',
            marginBottom: '36px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              The Problem
            </span>
          </div>

          {/* Headline */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 600ms ease 160ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 160ms',
            marginBottom: '60px',
          }}>
            <h2 className="font-heading" style={{
              fontSize: 'clamp(38px, 4.5vw, 64px)',
              fontWeight: 500, letterSpacing: '-0.042em',
              color: 'var(--text)', lineHeight: 0.96,
            }}>
              The site is live.
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                The leads are not.
              </em>
            </h2>
          </div>

          {/* Problem items */}
          <div>
            {WEB_PROBLEMS.map((p, i) => (
              <ProblemItem key={i} item={p} index={i} visible={visible} />
            ))}
          </div>
        </div>

        {/* ── Right 45% — Live Diagnostic card only ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LiveDiagnosticCard visible={visible} />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .web-prob-outer {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
        @media (max-width: 640px) {
          .web-prob-outer { padding: 56px 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Services grid with wireframe card backgrounds ────────── */
const WEB_SERVICES = [
  { n: '01', tag: 'Conversion', title: 'Landing Pages', body: 'Purpose-built to convert. We design and build campaign landing pages that communicate a single, specific message with no distractions and a clear path to conversion.' },
  { n: '02', tag: 'Corporate',  title: 'Corporate & Brand Sites', body: 'Multi-page sites that establish credibility, communicate your positioning, and guide the right visitor toward the right action. Built with SEO and performance in mind.' },
  { n: '03', tag: 'Commerce',   title: 'E-Commerce', body: 'Custom storefronts that convert browsers into buyers. Product pages that sell, checkout flows that reduce abandonment, and CMS access your team can actually use.' },
  { n: '04', tag: 'Applications', title: 'Web Applications', body: 'Browser-based tools with real functionality: dashboards, client portals, booking systems, and internal tools built as progressive web apps or full-stack applications.' },
];

/* Faint wireframe SVG motifs per card */
function WireframeBg({ index }: { index: number }) {
  if (index === 0) return (
    <svg viewBox="0 0 200 140" fill="none" width="200" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.055, pointerEvents: 'none' }}>
      <rect x="8" y="8" width="184" height="124" rx="2" stroke="white" strokeWidth="1"/>
      <rect x="8" y="8" width="184" height="22" stroke="white" strokeWidth="1" fill="none"/>
      <rect x="20" y="44" width="160" height="16" rx="1" stroke="white" strokeWidth="0.8"/>
      <rect x="20" y="68" width="120" height="10" rx="1" stroke="white" strokeWidth="0.6"/>
      <rect x="20" y="86" width="72" height="20" rx="2" stroke="white" strokeWidth="0.8"/>
    </svg>
  );
  if (index === 1) return (
    <svg viewBox="0 0 200 140" fill="none" width="200" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.055, pointerEvents: 'none' }}>
      <rect x="8" y="8" width="184" height="20" rx="1" stroke="white" strokeWidth="1"/>
      <rect x="8" y="36" width="184" height="48" rx="1" stroke="white" strokeWidth="0.8"/>
      <rect x="8" y="92" width="88" height="40" rx="1" stroke="white" strokeWidth="0.6"/>
      <rect x="104" y="92" width="88" height="40" rx="1" stroke="white" strokeWidth="0.6"/>
    </svg>
  );
  if (index === 2) return (
    <svg viewBox="0 0 200 140" fill="none" width="200" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.055, pointerEvents: 'none' }}>
      {[0,1,2].map(col => [0,1].map(row => (
        <rect key={`${col}-${row}`} x={8 + col*64} y={8 + row*68} width="56" height="60" rx="1" stroke="white" strokeWidth="0.8"/>
      )))}
      <rect x="8" y="128" width="184" height="4" rx="1" stroke="white" strokeWidth="0.6"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 200 140" fill="none" width="200" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.055, pointerEvents: 'none' }}>
      <rect x="8" y="8" width="184" height="18" rx="1" stroke="white" strokeWidth="1"/>
      <rect x="8" y="34" width="56" height="98" rx="1" stroke="white" strokeWidth="0.6"/>
      <rect x="72" y="34" width="120" height="44" rx="1" stroke="white" strokeWidth="0.8"/>
      <rect x="72" y="86" width="56" height="46" rx="1" stroke="white" strokeWidth="0.6"/>
      <rect x="136" y="86" width="56" height="46" rx="1" stroke="white" strokeWidth="0.6"/>
    </svg>
  );
}

function WebServiceCard({ s, index, active }: { s: typeof WEB_SERVICES[0]; index: number; active: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? 'rgba(255,255,255,0.10)'
          : 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.13)'}`,
        borderTop: `1px solid ${hov ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.20)'}`,
        padding: '28px 24px',
        position: 'relative', overflow: 'hidden',
        borderRadius: '2px',
        transform: active ? (hov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(36px)',
        opacity: active ? 1 : 0,
        transition: [
          `opacity 600ms ease ${active ? index * 90 : 0}ms`,
          `transform 500ms cubic-bezier(0.22,1,0.36,1) ${active ? index * 90 : 0}ms`,
          'background 250ms ease',
          'border-color 250ms ease',
          'box-shadow 250ms ease',
        ].join(', '),
        boxShadow: hov
          ? '0 20px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)'
          : 'inset 0 1px 0 rgba(255,255,255,0.07)',
      }}
    >
      {/* Top gradient border highlight */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, rgba(61,82,230,0.7) 0%, rgba(123,79,212,0.5) 100%)', opacity: hov ? 1 : 0.5, transition: 'opacity 250ms ease', pointerEvents: 'none' }} />
      <WireframeBg index={index} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--accent)' }}>{s.n}</span>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,239,233,0.5)', backgroundColor: 'rgba(61,82,230,0.1)', border: '1px solid rgba(61,82,230,0.25)', padding: '4px 10px' }}>{s.tag}</span>
      </div>
      <h3 className="font-heading" style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--dark-text)', lineHeight: 1.12, marginBottom: '16px', position: 'relative', zIndex: 1 }}>{s.title}</h3>
      <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(240,239,233,0.55)', position: 'relative', zIndex: 1 }}>{s.body}</p>
    </div>
  );
}

function WebServicesGrid() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section ref={ref} id="web-services" data-section-label="What We Build" style={{ backgroundColor: 'var(--dark-bg)', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px', padding: '64px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows — behind the glass cards */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(61,82,230,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '5%', right: '8%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(123,79,212,0.14) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(61,82,230,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '32px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }}>
          <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid rgba(61,82,230,0.25)', padding: '5px 12px', display: 'inline-block', marginBottom: '20px' }}>What We Build</div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--dark-text)', lineHeight: 1.1 }}>
            The four types of website<br />we build for businesses.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }} className="web-svc-grid">
          {WEB_SERVICES.map((s, i) => <WebServiceCard key={i} s={s} index={i} active={visible} />)}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .web-svc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ── Process section — milestone tracker ──────────────────── */
const WEB_PHASES = [
  {
    n: '01', title: 'Audit', tag: 'Discovery', time: '~1 wk',
    detail: 'We audit your current site, map what\'s costing you conversions, and define the goal before we touch design. You get a prioritised improvement brief.',
    deliverable: 'Conversion & performance audit report',
    accent: 'rgba(61,82,230,0.07)',
  },
  {
    n: '02', title: 'Wireframing', tag: 'Structure', time: '~1 wk',
    detail: 'We wireframe every key page and present the information architecture for your sign-off. Nothing is designed until the structure is agreed.',
    deliverable: 'Signed-off page wireframes',
    accent: 'rgba(61,82,230,0.05)',
  },
  {
    n: '03', title: 'Build', tag: 'Development', time: '~3 wks',
    detail: 'Development against a staging environment that mirrors production. Every page is performance-tested and reviewed across devices before handoff.',
    deliverable: 'Tested, optimised website',
    accent: 'rgba(61,82,230,0.07)',
  },
  {
    n: '04', title: 'Launch', tag: 'Delivery', time: '~1 wk',
    detail: 'We handle deployment, configure analytics and performance monitoring, and train your team on content management. First 30 days of fixes included.',
    deliverable: 'Live site with 30-day support',
    accent: 'rgba(61,82,230,0.05)',
  },
];

function WebPhaseRow({ phase, index, visible, isLast }: { phase: typeof WEB_PHASES[0]; index: number; visible: boolean; isLast: boolean }) {
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
        transition: `opacity 600ms ease ${index * 120 + 300}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 120 + 300}ms`,
      }}
      className="web-phase-row"
    >
      {/* Left rail */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease', marginBottom: '10px' }}>{phase.n}</span>
        <div style={{
          width: '9px', height: '9px',
          backgroundColor: 'var(--accent)',
          transform: `rotate(45deg) scale(${hov ? 1.4 : 1})`,
          transition: 'transform 200ms ease',
          flexShrink: 0,
          zIndex: 2,
        }} />
        {!isLast && (
          <div style={{ flex: 1, width: '1px', backgroundColor: 'var(--border)', marginTop: '8px', minHeight: '40px' }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ paddingBottom: isLast ? '0' : '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>{phase.tag}</span>
          <span style={{ width: '1px', height: '8px', backgroundColor: 'var(--border)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--muted)' }}>{phase.time}</span>
        </div>
        <h3 className="font-heading" style={{ fontSize: 'clamp(24px, 2.4vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em', color: hov ? 'var(--accent)' : 'var(--text)', lineHeight: 1.1, marginBottom: '14px', transition: 'color 200ms ease' }}>{phase.title}</h3>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '560px', marginBottom: '16px' }}>{phase.detail}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>Deliverable:</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{phase.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

function WebProcessSection() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} id="web-process" data-section-label="How We Work" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'flex-end', marginBottom: '0', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }} className="web-proc-hdr">
          <div>
            <div className="section-label" style={{ marginBottom: '20px' }}>How We Work</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--text)', lineHeight: 1.05 }}>
              From first call to a launched website.
            </h2>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '4px' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>4–6 wks</div>
            <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>first call to launch</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '48px auto 80px', padding: '0 32px' }}>
        {WEB_PHASES.map((p, i) => (
          <WebPhaseRow key={i} phase={p} index={i} visible={visible} isLast={i === WEB_PHASES.length - 1} />
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .web-proc-hdr { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function WebsitesClient() {
  return (
    <>
      <WebsitesHero />
      <WebStickyProblem />
      <WebServicesGrid />
      <CTABand />
    </>
  );
}
