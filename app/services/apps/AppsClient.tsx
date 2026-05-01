'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
      <div aria-hidden style={{ position: 'absolute', top: '20px', left: '24px', fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A38', zIndex: 1 }}>App Preview</div>
      <div style={{ position: 'absolute', top: '22px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'statPulse 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A38' }}>Live</span>
      </div>
      <div style={{ position: 'absolute', inset: '52px 24px 28px', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '12px', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Phone */}
        <div style={{ border: '1px solid #1E1E1C', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0D0D0D', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '16px', backgroundColor: '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '32px', height: '6px', backgroundColor: '#111111', borderRadius: '3px' }} />
          </div>
          <div style={{ height: '16px', backgroundColor: '#0D0D0D', display: 'flex', alignItems: 'center', padding: '0 10px', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '6px', color: '#3A3A38' }}>9:41</span>
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
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', height: '28px', backgroundColor: isActive ? 'rgba(61,82,230,0.07)' : 'transparent', borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent', transition: 'background-color 300ms ease, border-color 300ms ease' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: isActive ? 'var(--accent)' : '#3A3A38', width: '14px', textAlign: 'center', transition: 'color 300ms ease' }}>{r.icon}</span>
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
              <div key={i} style={{ backgroundColor: c.active ? '#1C1010' : '#161616', border: `1px solid ${c.active ? 'rgba(61,82,230,0.4)' : '#1E1E1C'}`, borderRadius: '2px', padding: '8px', transition: 'background-color 300ms ease', position: 'relative' }}>
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
  const CYCLE = ['built for you.', 'fit your team.', 'work your way.', 'earn their cost.'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-nav-theme="dark" style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }} className="apps-hero-grid">
      <div aria-hidden style={{ position: 'absolute', inset: 0, width: '55%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '40%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(61,82,230,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 80px 32px', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ marginBottom: '28px' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>Application Development</div>
        </motion.div>
        <h1 className="font-heading" style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--dark-text)', marginBottom: '28px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <span style={{ display: 'block', marginBottom: '0.04em' }}>Tools that are</span>
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'block', color: 'var(--accent)', fontStyle: 'italic' }}>
                {CYCLE[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.85 }} className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: 'var(--dark-muted)', maxWidth: '460px', marginBottom: '44px' }}>
          Off-the-shelf software costs more than it solves — in subscription fees, workarounds, and hours spent fitting your business around a tool designed for someone else. We build the tool that fits you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
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
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 1.35 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', border: '1px solid var(--dark-border)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '10px 18px', width: 'fit-content' }}>
          <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#22C55E', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: '-5px', borderRadius: '50%', border: '1px solid #22C55E', animation: 'pulseRing 2.2s ease-out infinite' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'var(--dark-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--dark-text)', fontWeight: 600 }}>30 days</span>{' '}of fixes included in every handoff
          </span>
        </motion.div>
        <div aria-hidden style={{ position: 'absolute', bottom: '32px', left: '32px', display: 'flex', alignItems: 'center', gap: '10px', animation: 'scrollBounce 2.6s ease-in-out infinite' }}>
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--dark-border)' }} />
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dark-muted)' }}>Scroll</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
        <AppSkeletonVisual />
      </motion.div>
      <style>{`@media (max-width: 1024px) { .apps-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; } .apps-hero-grid > div:last-child { display: none !important; } }`}</style>
    </section>
  );
}

/* ── Stats band — asymmetric value bento ──────────────────── */
function AppStatsBand() {
  const { ref, visible } = useReveal(0.2);
  const primary30 = useCountUp(30, visible, 1800);
  const secondary100 = useCountUp(100, visible, 1400);
  const secondary6 = useCountUp(6, visible, 1200);

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div className="apps-stats-bento" style={{ display: 'grid', gridTemplateColumns: '55% 45%', minHeight: '280px' }}>

          {/* Primary — large 30 day guarantee */}
          <div style={{
            borderRight: '1px solid var(--border)',
            padding: '60px 56px 60px 0',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Post-Handoff Coverage</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
              <span className="font-heading" style={{ fontSize: 'clamp(72px, 9vw, 120px)', fontWeight: 500, letterSpacing: '-0.05em', color: 'var(--text)', lineHeight: 0.85 }}>{primary30}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '-0.02em', lineHeight: 1 }}>days</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 500, color: 'var(--accent)', fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>included.</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '340px' }}>
              Every engagement includes a full month of post-launch fixes — no extra invoice, no waiting. You launch with a safety net.
            </p>
          </div>

          {/* Secondary stack */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* 100% custom */}
            <div style={{
              flex: 1, padding: '40px 0 40px 52px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '24px',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms ease 140ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 140ms',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '8px' }}>
                  <span className="font-heading" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 0.9 }}>{secondary100}</span>
                  <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'var(--text-muted)', marginLeft: '2px' }}>%</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Custom-built, nothing repurposed</p>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>No templates, no pre-built modules forced into your workflow.</p>
              </div>
            </div>
            {/* 6 wks */}
            <div style={{
              flex: 1, padding: '40px 0 40px 52px',
              display: 'flex', alignItems: 'center', gap: '24px',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms ease 280ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 280ms',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '8px' }}>
                  <span className="font-heading" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 0.9 }}>{secondary6}</span>
                  <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'var(--accent)', marginLeft: '4px' }}>wks</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Average time to first version</p>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>From kickoff call to a working application in your hands.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .apps-stats-bento { grid-template-columns: 1fr !important; } .apps-stats-bento > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border) !important; padding: 48px 0 !important; } .apps-stats-bento > div:last-child > div { padding: 36px 0 !important; } }
      `}</style>
    </section>
  );
}

/* ── Problem section — borderless, whitespace-driven ─────── */
const PROBLEMS = [
  { n: '01', title: 'Manual processes that should be software', body: 'Your team tracks things in spreadsheets, makes decisions from email threads, and approves work via chat messages. Every manual step is a point where things slow down, fall through the cracks, or get done wrong.' },
  { n: '02', title: 'Off-the-shelf tools that don\'t fit', body: 'Generic software comes with the features it was designed for — not the ones you need. You adapt your process to the tool, pay for features you don\'t use, and work around the ones you do.' },
  { n: '03', title: 'Tools your team doesn\'t actually use', body: 'Adoption is the real metric. A tool that isn\'t used is worse than no tool at all — it costs money, fragments data, and gives management false confidence that the process is covered.' },
  { n: '04', title: 'No visibility into what\'s actually happening', body: 'Without a purpose-built dashboard or portal, the data that should drive decisions is scattered across systems. Someone has to pull it together manually every time a question gets asked.' },
];

function AppPainCard({ item, index, active }: { item: typeof PROBLEMS[0]; index: number; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 32px',
        backgroundColor: 'transparent',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.08), inset 3px 0 0 var(--accent)' : 'inset 3px 0 0 transparent',
        transition: 'box-shadow 250ms ease',
        opacity:    active ? 1 : 0,
        transform:  active ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: active ? `${index * 90}ms` : '0ms',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', color: hovered ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '20px', transition: 'color 200ms ease' }}>{item.n}</div>
      <h3 className="font-heading" style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text)', lineHeight: 1.25, marginBottom: '16px' }}>{item.title}</h3>
      <p className="font-body" style={{ fontSize: '13.5px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{item.body}</p>
    </div>
  );
}

function AppsProblemStatement() {
  const { ref, visible } = useReveal(0.08);
  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '112px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '56px', alignItems: 'end' }} className="apps-prob-header">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 600ms ease, transform 600ms ease' }}>
            <div className="section-label" style={{ marginBottom: '28px' }}>The Problem</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Your biggest<br />bottleneck is<br />missing software.
            </h2>
          </div>
          <div style={{ paddingBottom: '6px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 600ms ease 160ms, transform 600ms ease 160ms' }}>
            <p className="font-body" style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Most operational bottlenecks aren&rsquo;t people problems — they&rsquo;re tooling gaps. The process works fine in theory, but there&rsquo;s no software that supports it.
            </p>
            <p className="font-body" style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text)', fontWeight: 500 }}>
              Obsidia identifies those gaps and builds exactly what fills them.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }} className="apps-pain-grid">
          {PROBLEMS.map((p, i) => (
            <div key={i} style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <AppPainCard item={p} index={i} active={visible} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .apps-pain-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .apps-prob-header { grid-template-columns: 1fr !important; gap: 40px !important; } .apps-pain-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ── Bento box services ────────────────────────────────────── */
const APP_SERVICES = [
  { n: '01', tag: 'Mobile', title: 'Mobile Applications', body: 'iOS and Android apps built as native-quality progressive web apps — the look, feel, and performance of a native app, without the overhead of two separate codebases.' },
  { n: '02', tag: 'Internal', title: 'Internal Tools', body: 'Operations dashboards, admin panels, and workflow tools designed around how your team actually works — built specifically for your processes, your data, and your people.' },
  { n: '03', tag: 'Portals', title: 'Client & Partner Portals', body: 'Branded portals where clients can view project status, approve deliverables, access documents, and communicate — reducing the back-and-forth that eats up your team\'s time.' },
  { n: '04', tag: 'Data', title: 'Dashboards & Reporting', body: 'Real-time dashboards that pull from your actual data sources and surface the numbers that matter — no manual data pulls, no stale screenshots in slide decks.' },
];

function AppBentoCard({
  s, index, active, style,
}: {
  s: typeof APP_SERVICES[0]; index: number; active: boolean;
  style?: React.CSSProperties;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: hov ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: index === 0 ? '40px 36px' : '28px',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        opacity:    active ? 1 : 0,
        transform:  active ? (hov ? 'translateY(-3px)' : 'translateY(0)') : 'translateY(36px)',
        transition: `opacity 600ms ease ${active ? index * 90 : 0}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${active ? index * 90 : 0}ms`,
        boxShadow: hov ? '0 20px 56px rgba(0,0,0,0.5)' : 'none',
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: index === 0 ? '32px' : '20px' }}>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--accent)' }}>{s.n}</span>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,239,233,0.4)', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px' }}>{s.tag}</span>
      </div>
      <h3 className="font-heading" style={{ fontSize: index === 0 ? 'clamp(26px, 2.6vw, 36px)' : 'clamp(18px, 2vw, 24px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--dark-text)', lineHeight: 1.12, marginBottom: '14px' }}>{s.title}</h3>
      <p className="font-body" style={{ fontSize: index === 0 ? '15px' : '13px', lineHeight: 1.75, color: 'rgba(240,239,233,0.5)' }}>{s.body}</p>
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '3px', backgroundColor: 'var(--accent)', transform: hov ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top', transition: 'transform 320ms cubic-bezier(0.76,0,0.24,1)' }} />
    </div>
  );
}

function AppServicesGrid() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section ref={ref} style={{ backgroundColor: 'var(--dark-bg)', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px', padding: '80px 32px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(61,82,230,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '48px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }}>
          <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid rgba(61,82,230,0.25)', padding: '5px 12px', display: 'inline-block', marginBottom: '20px' }}>What We Build</div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--dark-text)', lineHeight: 1.1 }}>
            Four types of application<br />we build for businesses.
          </h2>
        </div>

        {/* Bento grid */}
        <div className="apps-bento" style={{ display: 'grid', gridTemplateColumns: '60% 40%', gridTemplateRows: 'auto auto auto', gap: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          {/* Large main card */}
          <div style={{ gridRow: '1 / 3', gridColumn: '1 / 2' }}>
            <AppBentoCard s={APP_SERVICES[0]} index={0} active={visible} style={{ height: '100%', minHeight: '360px' }} />
          </div>
          {/* Top-right */}
          <div style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}>
            <AppBentoCard s={APP_SERVICES[1]} index={1} active={visible} style={{ height: '100%', minHeight: '180px' }} />
          </div>
          {/* Bottom-right */}
          <div style={{ gridRow: '2 / 3', gridColumn: '2 / 3' }}>
            <AppBentoCard s={APP_SERVICES[2]} index={2} active={visible} style={{ height: '100%', minHeight: '180px' }} />
          </div>
          {/* Full-width bottom */}
          <div style={{ gridRow: '3 / 4', gridColumn: '1 / 3' }}>
            <AppBentoCard s={APP_SERVICES[3]} index={3} active={visible} />
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .apps-bento { grid-template-columns: 1fr !important; grid-template-rows: auto !important; } .apps-bento > div { grid-row: auto !important; grid-column: auto !important; } }`}</style>
    </section>
  );
}

/* ── Process section — sprint timeline ────────────────────── */
const APP_PHASES = [
  {
    n: '01', title: 'Audit', sprint: 'Sprint 0', time: '~1 wk',
    detail: 'We map your current processes, identify where software is missing or wrong, and deliver a detailed spec before we write a line of code.',
    deliverable: 'Process audit & product spec',
  },
  {
    n: '02', title: 'Architecture', sprint: 'Sprint 1', time: '~1 wk',
    detail: 'We prototype the core user flows and review them with your team. The system architecture and data model are locked before development starts.',
    deliverable: 'Signed-off prototype & architecture',
  },
  {
    n: '03', title: 'Build', sprint: 'Sprints 2–4', time: '~3 wks',
    detail: 'Iterative development with regular demos. You see the product every sprint — no surprises at handoff, no scope drift.',
    deliverable: 'Tested, documented application',
  },
  {
    n: '04', title: 'Handoff', sprint: 'Sprint 5', time: '~1 wk',
    detail: 'Deployment, team training, full documentation, and 30 days of post-launch fixes. Your team owns the product from day one.',
    deliverable: 'Full handover with 30-day support',
  },
];

function AppSprintRow({ phase, index, visible, isLast }: { phase: typeof APP_PHASES[0]; index: number; visible: boolean; isLast: boolean }) {
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
      className="app-sprint-row"
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
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>{phase.sprint}</span>
          <span style={{ width: '1px', height: '8px', backgroundColor: 'var(--border)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--muted)' }}>{phase.time}</span>
        </div>
        <h3 className="font-heading" style={{ fontSize: 'clamp(24px, 2.4vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em', color: hov ? 'var(--accent)' : 'var(--text)', lineHeight: 1.1, marginBottom: '14px', transition: 'color 200ms ease' }}>{phase.title}</h3>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '560px', marginBottom: '16px' }}>{phase.detail}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>Deliverable —</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{phase.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

function AppProcessSection() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px 56px', borderBottom: '1px solid var(--border)' }}>
        <div className="app-proc-hdr" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-end', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '20px' }}>How We Work</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--text)', lineHeight: 1.08 }}>
              From first call<br />to a live application.
            </h2>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '16px' }}>
              We work in structured sprints so you can see progress every week — not just at the end. Every phase ends with your review and sign-off.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--accent)' }}>4–6 weeks start to finish</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 80px' }}>
        {APP_PHASES.map((p, i) => (
          <AppSprintRow key={i} phase={p} index={i} visible={visible} isLast={i === APP_PHASES.length - 1} />
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .app-proc-hdr { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function AppsClient() {
  return (
    <>
      <AppsHero />
      <AppStatsBand />
      <AppsProblemStatement />
      <AppServicesGrid />
      <AppProcessSection />
      <CTABand />
    </>
  );
}
