'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

/* ── App skeleton visual ──────────────────────────────────── */
function AppSkeletonVisual() {
  const [activeRow, setActiveRow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setActiveRow(r => (r + 1) % 4), 1100);
    return () => clearInterval(id);
  }, [mounted]);

  const rows = [
    { label: 'Dashboard', metric: '2,840 tasks', icon: '◈' },
    { label: 'Projects',  metric: '12 active',   icon: '⟶' },
    { label: 'Reports',   metric: 'Updated 2m',  icon: '↗'  },
    { label: 'Team',      metric: '8 members',   icon: '◉'  },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0A0A0A', borderLeft: '1px solid #1E1E1C', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #1A1A18 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '20px', left: '24px', fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.32)', zIndex: 1 }}>App Preview</div>
      <div style={{ position: 'absolute', top: '22px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'statPulse 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.32)' }}>Live</span>
      </div>
      <div style={{ position: 'absolute', inset: '52px 24px 28px', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '12px', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Phone */}
        <div style={{ border: '1px solid #1E1E1C', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0D0D0D', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '16px', backgroundColor: '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '32px', height: '6px', backgroundColor: '#111111', borderRadius: '3px' }} />
          </div>
          <div style={{ height: '16px', backgroundColor: '#0D0D0D', display: 'flex', alignItems: 'center', padding: '0 10px', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '6px', color: 'rgba(255,255,255,0.22)' }}>9:41</span>
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              {[1,2,3].map(i => <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#2A2A28' }} />)}
            </div>
          </div>
          <div style={{ height: '22px', backgroundColor: '#111111', display: 'flex', alignItems: 'center', padding: '0 10px', borderBottom: '1px solid #1A1A18' }}>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7.5px', fontWeight: 600, color: '#F0EFE9' }}>Obsidia Hub</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {rows.map((r, i) => {
              const isActive = i === activeRow;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', height: '28px', backgroundColor: isActive ? 'rgba(61,82,230,0.14)' : 'transparent', transition: 'background-color 300ms ease' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.22)', width: '14px', textAlign: 'center', transition: 'color 300ms ease' }}>{r.icon}</span>
                  <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: isActive ? '#F0EFE9' : '#5A5A58', flex: 1, transition: 'color 300ms ease' }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '6px', color: isActive ? 'var(--accent)' : '#2A2A28', transition: 'color 300ms ease' }}>{r.metric}</span>
                </div>
              );
            })}
          </div>
          <div style={{ height: '16px', backgroundColor: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '28px', height: '2.5px', backgroundColor: '#1E1E1C', borderRadius: '2px' }} />
          </div>
        </div>
        {/* Desktop dashboard */}
        <div style={{ border: '1px solid #1E1E1C', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0D0D0D', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '24px', backgroundColor: '#111111', borderBottom: '1px solid #1A1A18', display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7.5px', fontWeight: 600, color: '#F0EFE9' }}>Operations Dashboard</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['#2A2A28','#2A2A28','var(--accent)'].map((c, i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c, opacity: i === 2 ? 0.6 : 1 }} />)}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '8px', flexShrink: 0 }}>
            {[
              { val: rows[activeRow].metric, sub: rows[activeRow].label, active: true },
              { val: '98%',  sub: 'Uptime',    active: false },
              { val: '4.2s', sub: 'Avg. time', active: false },
            ].map((c, i) => (
              <div key={i} style={{ backgroundColor: c.active ? '#0D1020' : '#161616', border: `1px solid ${c.active ? 'rgba(61,82,230,0.4)' : '#1E1E1C'}`, borderRadius: '2px', padding: '8px', transition: 'background-color 300ms ease', position: 'relative' }}>
                {c.active && <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', backgroundColor: 'var(--accent)' }} />}
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: i === 0 ? '11px' : '9px', color: c.active ? '#F0EFE9' : '#9A9890', marginBottom: '2px', transition: 'color 300ms ease', paddingLeft: c.active ? '4px' : '0' }}>{c.val}</div>
                <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '6px', color: '#3A3A38', paddingLeft: c.active ? '4px' : '0' }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, padding: '0 8px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', flex: 1 }}>
              {[0.4,0.7,0.55,0.9,0.65,0.8,0.5,0.72].map((h, i) => <div key={i} style={{ flex: 1, height: `${h*100}%`, backgroundColor: i === 3 ? 'var(--accent)' : '#1E1E1C', opacity: i === 3 ? 0.65 : 0.5, borderRadius: '1px 1px 0 0' }} />)}
            </div>
            <div style={{ borderTop: '1px solid #1A1A18', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {['Backlog review','Sprint planning','Deploy pipeline'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '14px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '1px', backgroundColor: i === 0 ? 'rgba(61,82,230,0.4)' : '#1E1E1C', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '6px', color: '#3A3A38' }}>{label}</span>
                  <div style={{ marginLeft: 'auto', width: '24px', height: '6px', backgroundColor: '#161616', borderRadius: '1px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono), monospace', fontSize: '8px', color: '#2A2A28', letterSpacing: '0.12em', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease 400ms' }}>
        MOBILE + DESKTOP · LIVE SYNC
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function AppsHero() {
  const CYCLE = ['was built for it.', 'fits how you work.', 'runs without friction.', 'scales with you.'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-nav-theme="dark" id="apps-hero" data-section-label="Overview" style={{ position: 'relative', minHeight: '100dvh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }} className="apps-hero-grid">
      <div aria-hidden style={{ position: 'absolute', inset: 0, width: '55%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '40%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(61,82,230,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 80px 32px', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ marginBottom: '28px' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>Application Development</div>
        </motion.div>
        <h1 className="font-heading" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--dark-text)', marginBottom: '28px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <span style={{ display: 'block' }}>Your operation</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap', marginBottom: '0.04em' }}>deserves software that</span>
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'block', color: 'var(--accent)', fontStyle: 'italic' }}>
                {CYCLE[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.85 }} className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: 'var(--dark-muted)', maxWidth: '460px', marginBottom: '44px' }}>
          Most software fits a template. You're expected to work around the gaps. Obsidia builds what you actually need.
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
        <AppSkeletonVisual />
      </motion.div>
      <style>{`@media (max-width: 1024px) { .apps-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; } .apps-hero-grid > div:last-child { display: none !important; } }`}</style>
    </section>
  );
}



/* ── Problem statement ────────────────────────────────────── */
const PROBLEMS = [
  {
    n: '01',
    title: 'Manual work\nthat should be\nsoftware.',
    body: 'When a core part of your business runs on spreadsheets and memory, it’s a liability, not a system.',
    indicator: 'Process gap',
  },
  {
    n: '02',
    title: 'Tools built for\nsomeone else\nentirely.',
    body: 'You adapt your workflow to the software. The friction compounds daily.',
    indicator: 'Tool mismatch',
  },
  {
    n: '03',
    title: 'Software your\nteam quietly\navoids.',
    body: 'A tool nobody uses costs more than no tool at all.',
    indicator: 'Adoption failure',
  },
  {
    n: '04',
    title: 'No visibility\ninto what is\nhappening.',
    body: 'When data lives everywhere, decisions live nowhere.',
    indicator: 'Blind spot',
  },
];

function AppsProblemStatement() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="apps-problem"
      data-nav-theme="dark"
      data-section-label="Built Wrong."
      style={{
        backgroundColor: 'var(--dark-surface)',
        borderTop: '1px solid var(--dark-border)',
        borderBottom: '1px solid var(--dark-border)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '-30%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(61,82,230,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.75, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '48px',
            marginBottom: '16px',
          }}
          className="apps-prob-hdr"
        >
          <div>
            <div className="section-label" style={{ color: 'var(--accent)', marginBottom: '14px' }}>Built Wrong.</div>
            <h2
              className="font-heading"
              style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--dark-text)' }}
            >
              Your biggest bottleneck
              <br /><em style={{ color: 'var(--accent)' }}>is missing software.</em>
            </h2>
          </div>
        </motion.div>

        {/* 2×2 diagnostic grid */}
        <div
          className="apps-prob-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}
        >
          {PROBLEMS.map((p, i) => {
            const isHov = hoveredIdx === i;
            const ACTIVE = '2px solid rgba(61,82,230,0.65)';
            const NONE = '2px solid transparent';
            const outerBorder = i === 0
              ? { borderTop: isHov ? ACTIVE : NONE, borderLeft: isHov ? ACTIVE : NONE, borderBottom: NONE, borderRight: NONE }
              : i === 1
              ? { borderTop: isHov ? ACTIVE : NONE, borderRight: isHov ? ACTIVE : NONE, borderBottom: NONE, borderLeft: NONE }
              : i === 2
              ? { borderBottom: isHov ? ACTIVE : NONE, borderLeft: isHov ? ACTIVE : NONE, borderTop: NONE, borderRight: NONE }
              : { borderBottom: isHov ? ACTIVE : NONE, borderRight: isHov ? ACTIVE : NONE, borderTop: NONE, borderLeft: NONE };
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.68, ease: EASE, delay: i * 0.10 }}
                style={{
                  position: 'relative',
                  padding: '22px 28px',
                  backgroundColor: isHov ? 'rgba(61,82,230,0.1)' : '#0D1020',
                  overflow: 'hidden',
                  transition: 'background-color 300ms ease, border-color 280ms ease',
                  cursor: 'default',
                  ...outerBorder,
                }}
              >
                {/* Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '16px' }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: isHov ? 'var(--accent)' : 'rgba(61,82,230,0.5)',
                    boxShadow: isHov ? '0 0 12px rgba(61,82,230,0.6)' : 'none',
                    transition: 'background-color 250ms ease, box-shadow 250ms ease',
                    animation: `statPulse ${1.8 + i * 0.4}s ease-in-out infinite`,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: isHov ? 'var(--accent)' : 'rgba(220,225,248,0.22)',
                    transition: 'color 250ms ease',
                  }}>
                    {p.indicator}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(19px, 2.1vw, 28px)',
                    fontWeight: 500, fontStyle: 'italic',
                    letterSpacing: '-0.025em',
                    color: isHov ? 'var(--dark-text)' : 'rgba(220,225,248,0.65)',
                    lineHeight: 1.14, marginBottom: '14px',
                    whiteSpace: 'pre-line',
                    transition: 'color 250ms ease',
                    position: 'relative', zIndex: 1,
                  }}
                >
                  {p.title}
                </h3>

                {/* Body */}
                <p className="font-body" style={{
                  fontSize: '12.5px', lineHeight: 1.68,
                  color: 'rgba(220,225,248,0.68)',
                  position: 'relative', zIndex: 1,
                }}>
                  {p.body}
                </p>

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                  backgroundColor: 'var(--accent)',
                  transform: isHov ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left center',
                  transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
                  pointerEvents: 'none',
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .apps-prob-hdr { flex-direction: column !important; align-items: flex-start !important; }
          .apps-prob-hdr > p { max-width: 100% !important; }
          .apps-prob-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Phone display — interactive screen mockup ─────────────── */
const PHONE_SCREENS = [
  {
    label: 'Mobile App',
    render: () => (
      <div style={{ height: '100%', backgroundColor: '#0A0B10', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div style={{ padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#DCE1F5', fontWeight: 600 }}>9:41</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {[3,5,7].map(h => <div key={h} style={{ width: '3px', height: `${h}px`, backgroundColor: '#DCE1F5', borderRadius: '1px', opacity: 0.7 }} />)}
            <div style={{ width: '14px', height: '7px', border: '1px solid rgba(220,225,245,0.5)', borderRadius: '2px', marginLeft: '3px', display: 'flex', alignItems: 'center', padding: '1px' }}>
              <div style={{ width: '70%', height: '100%', backgroundColor: '#22C55E', borderRadius: '1px' }} />
            </div>
          </div>
        </div>
        {/* Header */}
        <div style={{ padding: '8px 20px 16px', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', color: 'rgba(220,225,248,0.4)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.15em', marginBottom: '4px' }}>FIELDWORK</div>
          <div style={{ fontSize: '18px', color: '#DCE1F5', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.02em' }}>Good morning</div>
          <div style={{ fontSize: '11px', color: 'rgba(220,225,248,0.4)', fontFamily: 'var(--font-body), sans-serif', marginTop: '2px' }}>3 tasks due today</div>
        </div>
        {/* Cards */}
        <div style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
          {[
            { title: 'Site Alpha', sub: '2 open items', dot: '#3D52E6', badge: 'Active' },
            { title: 'Meridian', sub: 'Review pending', dot: '#F59E0B', badge: 'Pending' },
            { title: 'Q3 Review', sub: 'Completed', dot: '#22C55E', badge: 'Done' },
          ].map((card, i) => (
            <div key={i} style={{ backgroundColor: '#0F1118', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: card.dot, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#DCE1F5', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, marginBottom: '2px' }}>{card.title}</div>
                <div style={{ fontSize: '10px', color: 'rgba(220,225,248,0.35)', fontFamily: 'var(--font-body), sans-serif' }}>{card.sub}</div>
              </div>
              <div style={{ fontSize: '8px', color: card.dot, fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.1em', backgroundColor: `${card.dot}18`, padding: '3px 7px', borderRadius: '4px' }}>{card.badge}</div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 0 20px', display: 'flex', justifyContent: 'space-around', flexShrink: 0 }}>
          {[
            { icon: '◈', active: true },
            { icon: '⊞', active: false },
            { icon: '↗', active: false },
            { icon: '○', active: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <span style={{ fontSize: '14px', color: item.active ? 'var(--accent)' : 'rgba(220,225,248,0.25)' }}>{item.icon}</span>
              {item.active && <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Internal Tool',
    render: () => (
      <div style={{ height: '100%', backgroundColor: '#0A0B10', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div style={{ padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#DCE1F5', fontWeight: 600 }}>9:41</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'statPulse 2s ease-in-out infinite' }} />
          </div>
        </div>
        {/* Header */}
        <div style={{ padding: '8px 20px 14px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '10px', color: 'rgba(220,225,248,0.4)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.15em', marginBottom: '3px' }}>OPS CONSOLE</div>
          <div style={{ fontSize: '16px', color: '#DCE1F5', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.02em' }}>Operations</div>
        </div>
        {/* Metric tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '14px 14px 0', flexShrink: 0 }}>
          {[
            { val: '284', label: 'Tasks', color: 'var(--accent)' },
            { val: '98%', label: 'Uptime', color: '#22C55E' },
            { val: '4.2s', label: 'Avg. t', color: '#F59E0B' },
          ].map((m, i) => (
            <div key={i} style={{ backgroundColor: '#0F1118', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 8px' }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '15px', fontWeight: 600, color: m.color, marginBottom: '3px' }}>{m.val}</div>
              <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '8px', color: 'rgba(220,225,248,0.35)' }}>{m.label}</div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4px', backgroundColor: '#0F1118', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 10px 10px' }}>
            {[0.5, 0.8, 0.6, 1.0, 0.7, 0.85, 0.55].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h * 70}%`, backgroundColor: i === 3 ? 'var(--accent)' : 'rgba(61,82,230,0.22)', borderRadius: '2px 2px 0 0', transition: 'height 500ms ease' }} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
            {['Deploy completed', 'Sync triggered'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: i === 0 ? '#22C55E' : 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', color: 'rgba(220,225,248,0.45)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Client Portal',
    render: () => (
      <div style={{ height: '100%', backgroundColor: '#0A0B10', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div style={{ padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#DCE1F5', fontWeight: 600 }}>9:41</span>
        </div>
        {/* Header */}
        <div style={{ padding: '8px 20px 14px', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', color: 'rgba(220,225,248,0.4)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.15em', marginBottom: '3px' }}>CLIENT HUB</div>
          <div style={{ fontSize: '16px', color: '#DCE1F5', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.02em' }}>Phase 3: Design</div>
        </div>
        {/* Progress */}
        <div style={{ padding: '0 20px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', color: 'rgba(220,225,248,0.4)' }}>Project progress</span>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'var(--accent)' }}>72%</span>
          </div>
          <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '72%', height: '100%', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
          </div>
        </div>
        {/* File list */}
        <div style={{ flex: 1, padding: '0 14px', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
          {[
            { name: 'Wireframes.pdf', status: 'Approved', icon: '✓', color: '#22C55E' },
            { name: 'Brand Guide.fig', status: 'Pending review', icon: '⧖', color: '#F59E0B' },
            { name: 'Copy deck.docx', status: 'Approved', icon: '✓', color: '#22C55E' },
          ].map((f, i) => (
            <div key={i} style={{ backgroundColor: '#0F1118', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: f.color, fontSize: '12px', flexShrink: 0 }}>{f.icon}</span>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', color: '#DCE1F5', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', color: f.color, opacity: 0.8 }}>{f.status}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Action buttons */}
        <div style={{ padding: '14px', display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button style={{ flex: 1, backgroundColor: 'var(--accent)', border: 'none', borderRadius: '8px', padding: '11px', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            Approve all
          </button>
          <button style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', color: 'rgba(220,225,248,0.6)', cursor: 'pointer' }}>
            Comment
          </button>
        </div>
      </div>
    ),
  },
  {
    label: 'Dashboard',
    render: () => (
      <div style={{ height: '100%', backgroundColor: '#0A0B10', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div style={{ padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#DCE1F5', fontWeight: 600 }}>9:41</span>
        </div>
        {/* Header */}
        <div style={{ padding: '8px 20px 14px', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', color: 'rgba(220,225,248,0.4)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.15em', marginBottom: '3px' }}>ANALYTICS</div>
          <div style={{ fontSize: '16px', color: '#DCE1F5', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '2px' }}>Revenue</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '22px', color: '#DCE1F5', fontWeight: 600 }}>$142,840</span>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', color: '#22C55E' }}>+18.4%</span>
          </div>
        </div>
        {/* Line chart */}
        <div style={{ flex: 1, padding: '0 14px 10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, backgroundColor: '#0F1118', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px', position: 'relative', overflow: 'hidden' }}>
            {/* SVG chart line */}
            <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(61,82,230,0.25)" />
                  <stop offset="100%" stopColor="rgba(61,82,230,0)" />
                </linearGradient>
              </defs>
              <path d="M0,50 C20,45 30,38 50,30 S80,20 100,22 S140,10 160,8 S185,10 200,6" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M0,50 C20,45 30,38 50,30 S80,20 100,22 S140,10 160,8 S185,10 200,6 L200,60 L0,60 Z" fill="url(#lineGrad)" />
            </svg>
          </div>
          {/* Source breakdown */}
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {[
              { label: 'Direct', pct: '47.2', w: '47%' },
              { label: 'Organic', pct: '31.6', w: '31%' },
              { label: 'Referral', pct: '21.2', w: '21%' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', color: 'rgba(220,225,248,0.4)', width: '44px', flexShrink: 0 }}>{s.label}</span>
                <div style={{ flex: 1, height: '3px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: s.w, height: '100%', backgroundColor: 'var(--accent)', borderRadius: '2px', opacity: 1 - i * 0.25 }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: 'rgba(220,225,248,0.5)', width: '28px', textAlign: 'right', flexShrink: 0 }}>{s.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function PhoneDisplay({ activeScreen }: { activeScreen: number }) {
  return (
    <div
      style={{
        width: '260px',
        height: '520px',
        backgroundColor: '#0A0B10',
        borderRadius: '40px',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.8), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(61,82,230,0.08)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90px',
          height: '24px',
          backgroundColor: '#0A0B10',
          borderRadius: '0 0 16px 16px',
          zIndex: 10,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
        }}
      />

      {/* Side button decoration */}
      <div aria-hidden style={{ position: 'absolute', right: '-1px', top: '110px', width: '3px', height: '32px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '0 2px 2px 0' }} />
      <div aria-hidden style={{ position: 'absolute', left: '-1px', top: '90px', width: '3px', height: '26px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px 0 0 2px' }} />
      <div aria-hidden style={{ position: 'absolute', left: '-1px', top: '128px', width: '3px', height: '26px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px 0 0 2px' }} />

      {/* Screen */}
      <div style={{ position: 'absolute', inset: '0', borderRadius: '40px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {PHONE_SCREENS[activeScreen].render()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Home indicator */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '4px',
          backgroundColor: 'rgba(255,255,255,0.25)',
          borderRadius: '2px',
          zIndex: 10,
        }}
      />
    </div>
  );
}

/* ── Services showcase with phone ─────────────────────────── */
const APP_SERVICES = [
  {
    n: '01',
    tag: 'Mobile',
    title: 'Mobile Applications',
    body: 'Native-quality iOS and Android, fast and polished, from a single codebase.',
    screen: 0,
  },
  {
    n: '02',
    tag: 'Internal',
    title: 'Internal Tools',
    body: 'Custom dashboards that pull your data together and cut out the repetitive manual work.',
    screen: 1,
  },
  {
    n: '03',
    tag: 'Portals',
    title: 'Client & Partner Portals',
    body: 'A dedicated login space that replaces the email chains and keeps everyone aligned.',
    screen: 2,
  },
  {
    n: '04',
    tag: 'Data',
    title: 'Dashboards & Reporting',
    body: 'Real-time dashboards pulling from your actual data sources, surfacing the numbers that matter without manual exports or stale screenshots.',
    screen: 3,
  },
];

function AppServicesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % APP_SERVICES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-6, 6]), { stiffness: 180, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="apps-services"
      data-nav-theme="dark"
      data-section-label="What We Build"
      style={{
        backgroundColor: 'var(--dark-bg)',
        padding: '28px 32px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(61,82,230,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.72, ease: EASE }}
          style={{ marginBottom: '24px' }}
        >
          <div className="section-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>What We Build</div>
          <h2
            className="font-heading"
            style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--dark-text)', lineHeight: 1.04, maxWidth: '520px' }}
          >
            Four types of application,
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}> one team.</em>
          </h2>
        </motion.div>

        {/* Main grid: phone + service list */}
        <div className="apps-svc-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>

          {/* Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '900px' }}>
            <motion.div
              initial={{ rotateX: 85, opacity: 0 }}
              whileInView={{ rotateX: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                rotateX: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.38, ease: 'easeOut' },
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <PhoneDisplay activeScreen={APP_SERVICES[activeIdx].screen} />
              </motion.div>
            </motion.div>
          </div>

          {/* Service list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {APP_SERVICES.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => { setActiveIdx(i); setIsHovered(true); }}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setActiveIdx(i)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.58, ease: EASE, delay: i * 0.10 + 0.15 }}
                  style={{
                    padding: '18px 0',
                    borderBottom: i < APP_SERVICES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {/* Row header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: isActive ? '14px' : '0', transition: 'margin-bottom 300ms ease' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px',
                        letterSpacing: '0.16em',
                        color: isActive ? 'var(--accent)' : 'rgba(220,225,248,0.25)',
                        transition: 'color 200ms ease',
                        flexShrink: 0,
                        width: '24px',
                      }}
                    >
                      {s.n}
                    </span>

                    {/* Tag */}
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '9px',
                        fontWeight: 500,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--accent)' : 'rgba(220,225,248,0.3)',
                        backgroundColor: isActive ? 'rgba(61,82,230,0.12)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(61,82,230,0.3)' : 'rgba(255,255,255,0.07)'}`,
                        padding: '3px 10px',
                        transition: 'all 200ms ease',
                      }}
                    >
                      {s.tag}
                    </span>

                    <h3
                      className="font-heading"
                      style={{
                        fontSize: 'clamp(18px, 1.8vw, 24px)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: isActive ? 'var(--dark-text)' : 'rgba(220,225,248,0.5)',
                        lineHeight: 1.1,
                        flex: 1,
                        transition: 'color 200ms ease',
                      }}
                    >
                      {s.title}
                    </h3>

                    {/* Arrow */}
                    <div
                      style={{
                        color: isActive ? 'var(--accent)' : 'rgba(220,225,248,0.2)',
                        transform: isActive ? 'rotate(0deg)' : 'rotate(-45deg)',
                        transition: 'color 200ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)',
                        flexShrink: 0,
                      }}
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  {/* Expandable body */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isActive ? '1fr' : '0fr',
                      transition: 'grid-template-rows 350ms cubic-bezier(0.22,1,0.36,1)',
                      paddingLeft: '40px',
                    }}
                  >
                    <div style={{ overflow: 'hidden', minHeight: 0 }}>
                      <p
                        className="font-body"
                        style={{
                          fontSize: '13.5px',
                          lineHeight: 1.78,
                          color: 'rgba(220,225,248,0.66)',
                          paddingBottom: '4px',
                          paddingTop: '4px',
                        }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* CTA */}
            <div
              style={{
                marginTop: '36px',
              }}
            >
              <MagneticButton strength={0.18}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    textDecoration: 'none',
                    backgroundColor: 'var(--accent)',
                    padding: '13px 26px',
                    borderRadius: '50px',
                    transition: 'background-color 200ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--accent)'; }}
                >
                  Discuss your application <ArrowRight size={13} />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .apps-svc-layout {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Process — development pipeline layout ─────────────────── */
const APP_PHASES = [
  {
    n: '01',
    phase: 'Phase One',
    time: '~1 week',
    title: 'Discovery',
    subtitle: 'Understand before you build',
    bullets: [
      'We map your workflows and catch edge cases before they become expensive.',
      'Everyone aligns on exactly what\'s being built before scoping begins.',
    ],
    deliverable: 'Technical specification',
    previewTitle: 'requirements.md',
    previewLines: [
      '# Scope — Confirmed',
      '',
      'Core user: Operations Manager',
      '→ Mobile approval on the go',
      '→ Real-time push notifications',
      '→ Full audit trail access',
      '',
      '✓ Signed off by client',
    ],
  },
  {
    n: '02',
    phase: 'Phase Two',
    time: '~1 week',
    title: 'Architecture',
    subtitle: 'Design the system, then build it',
    bullets: [
      'We design the database structure and underlying system logic first.',
      'You get a working prototype to review before any production code is written.',
    ],
    deliverable: 'Approved prototype',
    previewTitle: 'schema.ts',
    previewLines: [
      'interface User {',
      '  id: string',
      '  role: "admin" | "member"',
      '  orgId: string',
      '}',
      '',
      'interface Approval {',
      '  status: "pending" | "done"',
      '}',
    ],
  },
  {
    n: '03',
    phase: 'Phase Three',
    time: '~3 weeks',
    title: 'Build',
    subtitle: 'Weekly demos, no surprises',
    bullets: [
      'Development runs in structured cycles with regular working demos.',
      'Every feature is tested and signed off before the next one starts.',
    ],
    deliverable: 'Tested application',
    previewTitle: 'git log --oneline',
    previewLines: [
      '● a3f2c  feat: approval workflow',
      '● b8e4f  feat: push notifications',
      '● c1d9a  test: e2e approval flow',
      '● d4b2e  fix: mobile layout',
      '● e7a4c  feat: audit log view',
      '● f2c8d  release: v1.0.0-rc',
    ],
  },
  {
    n: '04',
    phase: 'Phase Four',
    time: '~1 week',
    title: 'Deploy',
    subtitle: 'Live, documented, supported',
    bullets: [
      'We handle the launch, monitoring setup, and full team handover.',
      'A post-launch support window ensures nothing slips through after go-live.',
    ],
    deliverable: 'Live application',
    previewTitle: 'deploy.log',
    previewLines: [
      '✓  Build    passed   (2m 14s)',
      '✓  Tests    47/47',
      '✓  Deploy   production',
      '✓  Health   OK',
      '✓  SSL      configured',
      '',
      '●  App is live  [200 OK]',
    ],
  },
];

function AppProcessSection() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section
      id="apps-process"
      data-section-label="How We Build"
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', bottom: '-10%', left: '20%', width: '600px', height: '400px', background: 'radial-gradient(circle, rgba(61,82,230,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          className="apps-proc-hdr"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'end',
            marginBottom: '64px',
          }}
        >
          <div>
            <div className="section-label" style={{ color: 'var(--accent)', marginBottom: '24px' }}>How We Build</div>
            <h2
              className="font-heading"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--dark-text)', lineHeight: 1.08 }}
            >
              From first call
              <br />to a live application.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.72, color: 'rgba(220,225,248,0.62)', textAlign: 'right' }}>
              Four precise phases. Constant visibility. Zero surprises.
            </p>
          </div>
        </motion.div>

        {/* Phase cards grid */}
        <div
          className="apps-phases-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          {APP_PHASES.map((phase, i) => {
            const isActive = activePhase === i;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActivePhase(i)}
                onMouseLeave={() => setActivePhase(null)}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.68, ease: EASE, delay: i * 0.11 + 0.08 }}
                style={{
                  position: 'relative',
                  backgroundColor: isActive ? 'rgba(61,82,230,0.09)' : '#070B18',
                  padding: '36px 28px 32px',
                  overflow: 'hidden',
                  minHeight: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background-color 320ms ease',
                  cursor: 'default',
                }}
              >
                {/* Top accent line sweeps in on hover */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  backgroundColor: 'var(--accent)',
                  transform: `scaleX(${isActive ? 1 : 0})`,
                  transformOrigin: 'left center',
                  transition: 'transform 420ms cubic-bezier(0.22,1,0.36,1)',
                  pointerEvents: 'none',
                }} />

                {/* Phase meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                  <div style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--accent)' : 'rgba(61,82,230,0.4)',
                    boxShadow: isActive ? '0 0 14px rgba(61,82,230,0.65)' : 'none',
                    transition: 'all 280ms ease',
                    animation: `statPulse ${2 + i * 0.3}s ease-in-out infinite`,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : 'rgba(220,225,248,0.22)',
                    transition: 'color 250ms ease',
                  }}>
                    {phase.phase}
                  </span>
                </div>

                {/* Phase title */}
                <h3
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(24px, 2.4vw, 34px)',
                    fontWeight: 500, fontStyle: 'italic',
                    letterSpacing: '-0.025em', lineHeight: 1.06,
                    color: isActive ? 'var(--dark-text)' : 'rgba(220,225,248,0.65)',
                    marginBottom: '5px',
                    transition: 'color 250ms ease',
                  }}
                >
                  {phase.title}
                </h3>
                <div style={{
                  fontFamily: 'var(--font-body), sans-serif', fontSize: '11px',
                  color: isActive ? 'rgba(220,225,248,0.42)' : 'rgba(220,225,248,0.18)',
                  marginBottom: '24px',
                  transition: 'color 250ms ease',
                }}>
                  {phase.subtitle}
                </div>

                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1 }}>
                  {phase.bullets.map((bullet, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                      <div style={{
                        width: '3px', height: '3px', borderRadius: '50%', marginTop: '7px', flexShrink: 0,
                        backgroundColor: isActive ? 'var(--accent)' : 'rgba(61,82,230,0.4)',
                        transition: 'background-color 250ms ease',
                      }} />
                      <span style={{
                        fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', lineHeight: 1.62,
                        color: isActive ? 'rgba(220,225,248,0.58)' : 'rgba(220,225,248,0.28)',
                        transition: 'color 250ms ease',
                      }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Deliverable */}
                <div style={{
                  borderTop: `1px solid ${isActive ? 'rgba(61,82,230,0.25)' : 'rgba(255,255,255,0.07)'}`,
                  paddingTop: '14px', marginTop: '20px',
                  display: 'flex', alignItems: 'center', gap: '9px',
                  transition: 'border-color 250ms ease',
                }}>
                  <div style={{
                    width: '5px', height: '5px', borderRadius: '1px',
                    backgroundColor: isActive ? 'var(--accent)' : 'rgba(61,82,230,0.3)',
                    transition: 'background-color 250ms ease', flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body), sans-serif', fontSize: '11px',
                    color: isActive ? 'rgba(220,225,248,0.48)' : 'rgba(220,225,248,0.2)',
                    transition: 'color 250ms ease',
                  }}>
                    {phase.deliverable}
                  </span>
                </div>

                {/* Terminal preview — slides up from bottom on hover */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '196px',
                  backgroundColor: '#040710',
                  borderTop: '1px solid rgba(61,82,230,0.22)',
                  transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 420ms cubic-bezier(0.22,1,0.36,1)',
                  overflow: 'hidden',
                  padding: '14px 16px 12px',
                }}>
                  {/* Terminal header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '9px' }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map((c, k) => (
                      <div key={k} style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: c, opacity: 0.65 }} />
                    ))}
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '8px', color: 'rgba(220,225,248,0.3)', marginLeft: '6px', letterSpacing: '0.1em' }}>
                      {phase.previewTitle}
                    </span>
                  </div>
                  {/* Terminal lines */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {phase.previewLines.map((line, k) => (
                      <span key={k} style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px', lineHeight: 1.55, display: 'block',
                        color: line.startsWith('✓') ? '#22C55E'
                          : line.startsWith('●') ? 'var(--accent)'
                          : line.startsWith('#') ? 'rgba(220,225,248,0.72)'
                          : line === '' ? 'transparent'
                          : 'rgba(220,225,248,0.42)',
                      }}>
                        {line || ' '}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .apps-proc-hdr { grid-template-columns: 1fr !important; gap: 32px !important; }
          .apps-phases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .apps-phases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function AppsClient() {
  return (
    <>
      <AppsHero />
      <AppsProblemStatement />
      <AppServicesGrid />
      <AppProcessSection />
      <CTABand />
    </>
  );
}
