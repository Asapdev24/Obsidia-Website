'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
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
      <div aria-hidden style={{ position: 'absolute', top: '20px', left: '24px', fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A38', zIndex: 1 }}>Website Preview</div>
      <div style={{ position: 'absolute', top: '22px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'statPulse 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3A38' }}>Building</span>
      </div>
      <div style={{ position: 'absolute', inset: '52px 24px 28px', backgroundColor: '#0E1020', border: '1px solid rgba(61,82,230,0.2)', borderRadius: '4px', overflow: 'hidden', opacity: mounted ? 1 : 0, transition: 'opacity 600ms ease' }}>
        <div style={{ height: '28px', backgroundColor: '#141628', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 14px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', opacity: 0.7 }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A2A38' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A2A38' }} />
          <div style={{ flex: 1, marginLeft: '12px', height: '14px', backgroundColor: '#1A1A18', borderRadius: '2px', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
            <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', color: '#3A3A38', letterSpacing: '0.04em' }}>yourbrand.com</span>
          </div>
        </div>
        <div style={{ padding: '0', height: 'calc(100% - 28px)', display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
          {lines.map((line, i) => {
            const built = i <= phase;
            return (
              <div key={i} style={{ flex: i === 1 ? 3 : 1, backgroundColor: built ? '#0E1020' : '#0C0D18', borderBottom: i < lines.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', position: 'relative', overflow: 'hidden', transition: 'background-color 400ms ease' }}>
                {built && <div style={{ position: 'absolute', top: 0, left: 0, height: '1px', backgroundColor: 'var(--accent)', width: '100%', opacity: 0.5 }} />}
                <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', fontFamily: 'var(--font-body), sans-serif', fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: built ? '#4A4A5A' : '#1E1E2C', transition: 'color 400ms ease' }}>{line.label}</div>
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
  const CYCLE = ['converts.', 'performs.', 'builds trust.', 'earns its keep.'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % CYCLE.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-nav-theme="dark" style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }} className="web-hero-grid">
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
          A slow, confusing, or outdated website costs you leads every day — and most businesses don&rsquo;t notice until a competitor takes them. We build websites that earn their keep.
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
            <span style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--dark-text)', fontWeight: 600 }}>Sub-2s</span>{' '}load time on every build we ship
          </span>
        </motion.div>
        <div aria-hidden style={{ position: 'absolute', bottom: '32px', left: '32px', display: 'flex', alignItems: 'center', gap: '10px', animation: 'scrollBounce 2.6s ease-in-out infinite' }}>
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--dark-border)' }} />
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dark-muted)' }}>Scroll</span>
        </div>
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

/* ── Stats band — performance scorecard ────────────────────── */
interface WebStatData { prefix?: string; num: number; suffix: string; label: string; context: string; score: number; category: string; }
const WEB_STATS_DATA: WebStatData[] = [
  { prefix: '<', num: 2,   suffix: 's',  label: 'Page load time',               context: 'Every build is performance-tested before launch.',                  score: 95, category: 'Performance' },
  { num: 40,               suffix: '%',  label: 'Avg. lift in lead conversion',  context: 'From redesigns where we had baseline data to compare.',             score: 40, category: 'Conversion' },
  { num: 100,              suffix: '%',  label: 'Mobile-first by default',       context: 'Responsive is the floor. Mobile-first is the standard.',            score: 100, category: 'Mobile' },
];

function WebScoreCard({ stat, index, active }: { stat: WebStatData; index: number; active: boolean }) {
  const count = useCountUp(stat.num, active, 1600 + index * 200);
  const R = 30, CIRC = 2 * Math.PI * R;
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setFilled(true), index * 180 + 400);
    return () => clearTimeout(t);
  }, [active, index]);

  return (
    <div className="web-stat-item" style={{
      flex: 1, padding: '64px 0',
      borderRight: index < 2 ? '1px solid var(--border)' : 'none',
      paddingRight: index < 2 ? '52px' : '0',
      paddingLeft:  index > 0 ? '52px' : '0',
      display: 'flex', alignItems: 'flex-start', gap: '22px',
      opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 700ms ease ${index * 140}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 140}ms`,
    }}>
      {/* Circular score ring */}
      <svg width="68" height="68" style={{ flexShrink: 0, transform: 'rotate(-90deg)', marginTop: '4px' }} aria-hidden>
        <circle cx="34" cy="34" r={R} fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle cx="34" cy="34" r={R} fill="none" stroke="var(--accent)" strokeWidth="2.5"
          strokeDasharray={CIRC}
          strokeDashoffset={filled ? CIRC - (stat.score / 100) * CIRC : CIRC}
          strokeLinecap="round"
          style={{ transition: `stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1) ${index * 200 + 450}ms` }}
        />
      </svg>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>{stat.category}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '14px', lineHeight: 0.9 }}>
          {stat.prefix && <span className="font-heading" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 0.9 }}>{stat.prefix}</span>}
          <span className="font-heading" style={{ fontSize: 'clamp(44px, 5vw, 68px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 0.9 }}>{count}</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', color: 'var(--text-muted)', marginLeft: '2px' }}>{stat.suffix}</span>
        </div>
        <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>{stat.label}</p>
        <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', fontStyle: 'italic' }}>{stat.context}</p>
      </div>
    </div>
  );
}

function WebStatsBand() {
  const { ref, visible } = useReveal(0.25);
  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex' }} className="web-stats-inner">
        {WEB_STATS_DATA.map((s, i) => <WebScoreCard key={i} stat={s} index={i} active={visible} />)}
      </div>
      <style>{`
        @media (max-width: 900px) { .web-stats-inner { flex-direction: column !important; } .web-stat-item { border-right: none !important; border-bottom: 1px solid var(--border) !important; padding: 48px 0 !important; } .web-stat-item:last-child { border-bottom: none !important; } }
      `}</style>
    </section>
  );
}

/* ── Sticky-scroll problem section ────────────────────────── */
const WEB_PROBLEMS = [
  {
    n: '01', title: 'Visitors leave before they convert',
    body: 'If your page takes more than 3 seconds to load, half your mobile visitors are already gone. Every second of delay costs you more than you think.',
  },
  {
    n: '02', title: 'Your site doesn\'t establish credibility',
    body: 'Buyers judge your business in under 50 milliseconds. An outdated design, stock photography, or broken mobile experience sends them to a competitor before they read a word.',
  },
  {
    n: '03', title: 'It was built for yesterday\'s goals',
    body: 'Your business has changed, but the site hasn\'t. The messaging, the flow, the CTAs — all pointing at what you used to sell, not what you sell now.',
  },
  {
    n: '04', title: 'No one can update it without breaking it',
    body: 'A site your team can\'t edit is a liability. Content goes stale, errors go unfixed, and every small change becomes a developer request.',
  },
];

/* ── Rich per-problem illustrations ─────────────────────────── */
function SpeedIllustration() {
  return (
    <svg viewBox="0 0 180 140" fill="none" aria-hidden width="100%">
      <rect x="8" y="8" width="164" height="108" rx="4" stroke="var(--border)" strokeWidth="1.5"/>
      <rect x="8" y="8" width="164" height="22" fill="var(--surface)" rx="4"/>
      <rect x="8" y="26" width="164" height="4" fill="var(--surface)"/>
      {[0,1,2].map(i => <circle key={i} cx={20+i*10} cy={19} r="3.5" fill="var(--border)"/>)}
      {/* URL bar */}
      <rect x="52" y="13" width="100" height="12" rx="2" fill="var(--border)" opacity="0.5"/>
      {/* Progress track */}
      <rect x="20" y="54" width="140" height="3" rx="1.5" fill="var(--border)"/>
      <rect x="20" y="54" width="82" height="3" rx="1.5" fill="rgba(61,82,230,0.55)"/>
      {/* 3s drop marker */}
      <line x1="102" y1="46" x2="102" y2="62" stroke="rgba(61,82,230,0.6)" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="102" y="43" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(61,82,230,0.7)" letterSpacing="0.5">3s</text>
      {/* Abandon label */}
      <text x="90" y="78" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(61,82,230,0.5)">62% left</text>
      {/* Silhouettes leaving */}
      {[0,1,2].map(i => (
        <g key={i} opacity={0.13 + i * 0.1}>
          <circle cx={40 + i * 40} cy={102} r={5} fill="var(--text-secondary)"/>
          <path d={`M${35+i*40} 110 Q${40+i*40} 116 ${45+i*40} 110`} stroke="var(--text-secondary)" strokeWidth="1" fill="none"/>
        </g>
      ))}
    </svg>
  );
}

function CredibilityIllustration() {
  return (
    <svg viewBox="0 0 180 140" fill="none" aria-hidden width="100%">
      {/* Your site — dated */}
      <rect x="8" y="24" width="76" height="92" rx="3" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4,3"/>
      <rect x="8" y="24" width="76" height="16" fill="var(--surface)"/>
      <text x="46" y="36" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="var(--text-muted)" letterSpacing="0.5">YOUR SITE</text>
      {[0,1,2].map(i => <rect key={i} x="18" y={50+i*22} width={i===0?50:i===1?36:44} height="8" rx="1" fill="var(--border)" opacity={0.5+i*0.1}/>)}
      <text x="46" y="128" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(61,82,230,0.55)">outdated</text>
      {/* Competitor — clean */}
      <rect x="96" y="8" width="76" height="108" rx="3" stroke="var(--text-secondary)" strokeWidth="1.5"/>
      <rect x="96" y="8" width="76" height="16" fill="var(--text-secondary)" opacity="0.08"/>
      <text x="134" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="var(--text-secondary)" letterSpacing="0.5">COMPETITOR</text>
      {[0,1,2,3].map(i => <rect key={i} x="106" y={32+i*18} width={i===0?56:i===1?40:i===2?48:34} height="7" rx="1" fill="var(--text-secondary)" opacity="0.12"/>)}
      <rect x="106" y="104" width="32" height="8" rx="1" fill="rgba(61,82,230,0.5)"/>
      <text x="122" y="112" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fill="white" letterSpacing="0.5">CTA</text>
      {/* Arrow */}
      <path d="M 62 80 Q 79 75 87 80" stroke="rgba(61,82,230,0.35)" strokeWidth="1.5" strokeDasharray="3,2" fill="none"/>
      <polygon points="84,76 90,81 83,84" fill="rgba(61,82,230,0.35)"/>
    </svg>
  );
}

function GoalsIllustration() {
  return (
    <svg viewBox="0 0 180 140" fill="none" aria-hidden width="100%">
      {/* Target rings */}
      {[52,38,24,10].map((r,i) => <circle key={i} cx="90" cy="72" r={r} stroke={i===0?'var(--border)':i===1?'rgba(61,82,230,0.15)':i===2?'rgba(61,82,230,0.3)':'rgba(61,82,230,0.5)'} strokeWidth="1.5" fill="none"/>)}
      {/* Centre dot — empty (missed) */}
      <circle cx="90" cy="72" r="5" stroke="rgba(61,82,230,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
      {/* Arrows missing the mark */}
      <line x1="22" y1="30" x2="58" y2="55" stroke="var(--border)" strokeWidth="1.5"/>
      <polygon points="54,52 62,54 57,61" fill="var(--border)"/>
      <line x1="158" y1="22" x2="126" y2="50" stroke="var(--border)" strokeWidth="1.5"/>
      <polygon points="128,47 121,52 123,44" fill="var(--border)"/>
      {/* Year labels */}
      <text x="18" y="26" fontFamily="monospace" fontSize="7" fill="var(--text-muted)">2021</text>
      <text x="146" y="20" fontFamily="monospace" fontSize="7" fill="var(--text-muted)">2022</text>
      {/* "Today" label at bottom */}
      <text x="90" y="138" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(61,82,230,0.6)" letterSpacing="0.5">TODAY</text>
    </svg>
  );
}

function UpdateIllustration() {
  return (
    <svg viewBox="0 0 180 140" fill="none" aria-hidden width="100%">
      {/* CMS panel */}
      <rect x="8" y="8" width="164" height="108" rx="4" stroke="var(--border)" strokeWidth="1.5"/>
      <rect x="8" y="8" width="164" height="22" fill="var(--surface)" rx="4"/>
      <rect x="8" y="26" width="164" height="4" fill="var(--surface)"/>
      <text x="22" y="22" fontFamily="sans-serif" fontSize="8" fill="var(--text-muted)" letterSpacing="0.5">Content Editor</text>
      {/* Locked edit toolbar */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={22+i*28} y="36" width="22" height="12" rx="2" fill="var(--border)" opacity="0.4"/>
      ))}
      {/* Lock overlays on buttons */}
      {[1,2].map(i => (
        <g key={i} opacity="0.6">
          <rect x={28+i*28} y="38" width="10" height="8" rx="1" fill="rgba(61,82,230,0.2)" stroke="rgba(61,82,230,0.4)" strokeWidth="0.8"/>
          <path d={`M${30+i*28} 38 Q${33+i*28} 34 ${36+i*28} 38`} stroke="rgba(61,82,230,0.5)" strokeWidth="1" fill="none"/>
        </g>
      ))}
      {/* Stale content lines */}
      {[0,1,2,3].map(i => <rect key={i} x="22" y={58+i*14} width={[140,100,120,80][i]} height="8" rx="1" fill="var(--border)" opacity="0.35"/>)}
      {/* Ticket queue */}
      <text x="90" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(61,82,230,0.5)">6 changes waiting on dev</text>
    </svg>
  );
}

const WEB_VISUALS = [SpeedIllustration, CredibilityIllustration, GoalsIllustration, UpdateIllustration];

function ProblemScrollItem({ item, index, visible }: { item: typeof WEB_PROBLEMS[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Visual = WEB_VISUALS[index];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '44px 0',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1fr 200px',
        gap: '32px',
        alignItems: 'center',
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 600ms ease ${index * 130 + 200}ms, transform 600ms ease ${index * 130 + 200}ms`,
        cursor: 'default',
      }}
      className="web-prob-row"
    >
      <div>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.12em', color: hovered ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '14px', transition: 'color 200ms ease' }}>{item.n}</div>
        <h3 className="font-heading" style={{ fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', color: hovered ? 'var(--accent)' : 'var(--text)', lineHeight: 1.2, marginBottom: '14px', transition: 'color 200ms ease' }}>{item.title}</h3>
        <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>{item.body}</p>
      </div>
      <div style={{ opacity: hovered ? 1 : 0.5, transition: 'opacity 300ms ease' }}>
        <Visual />
      </div>
    </div>
  );
}

function WebStickyProblem() {
  const { ref, visible } = useReveal(0.05);

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '112px 32px' }}>
        <div className="web-sticky-grid" style={{ display: 'grid', gridTemplateColumns: '38% 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Sticky left */}
          <div className="web-sticky-left" style={{
            position: 'sticky', top: '100px', alignSelf: 'start',
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms ease, transform 600ms ease',
          }}>
            <div className="section-label" style={{ marginBottom: '28px' }}>The Problem</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 3.8vw, 50px)', fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '28px' }}>
              Your website is costing you business right now.
            </h2>
            <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Most business websites are built once and then ignored. They fall behind on performance, credibility, and conversion — quietly costing the company leads every month.
            </p>
            <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--text)', fontWeight: 500 }}>
              Obsidia diagnoses what&rsquo;s costing you, then builds what fixes it.
            </p>
          </div>

          {/* Scrolling problems */}
          <div>
            {WEB_PROBLEMS.map((p, i) => (
              <ProblemScrollItem key={i} item={p} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px)  { .web-sticky-grid { grid-template-columns: 1fr !important; } .web-sticky-left { position: static !important; } }
        @media (max-width: 640px)  { .web-prob-row { grid-template-columns: 1fr !important; } .web-prob-row > div:last-child { display: none !important; } }
      `}</style>
    </section>
  );
}

/* ── Services grid with wireframe card backgrounds ────────── */
const WEB_SERVICES = [
  { n: '01', tag: 'Conversion', title: 'Landing Pages', body: 'Purpose-built to convert. We design and build campaign landing pages that communicate a single, specific message with no distractions and a clear path to conversion.' },
  { n: '02', tag: 'Corporate',  title: 'Corporate & Brand Sites', body: 'Multi-page sites that establish credibility, communicate your positioning, and guide the right visitor toward the right action — built with SEO and performance in mind.' },
  { n: '03', tag: 'Commerce',   title: 'E-Commerce', body: 'Custom storefronts that convert browsers into buyers. Product pages that sell, checkout flows that reduce abandonment, and CMS access your team can actually use.' },
  { n: '04', tag: 'Applications', title: 'Web Applications', body: 'Browser-based tools with real functionality — dashboards, client portals, booking systems, and internal tools built as progressive web apps or full-stack applications.' },
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
        backgroundColor: hov ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '40px 36px',
        position: 'relative', overflow: 'hidden',
        transform: active ? (hov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(36px)',
        opacity: active ? 1 : 0,
        transition: `opacity 600ms ease ${active ? index * 90 : 0}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${active ? index * 90 : 0}ms`,
        boxShadow: hov ? '0 16px 48px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <WireframeBg index={index} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--accent)' }}>{s.n}</span>
        <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,239,233,0.4)', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px' }}>{s.tag}</span>
      </div>
      <h3 className="font-heading" style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--dark-text)', lineHeight: 1.12, marginBottom: '16px', position: 'relative', zIndex: 1 }}>{s.title}</h3>
      <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(240,239,233,0.5)', position: 'relative', zIndex: 1 }}>{s.body}</p>
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '3px', backgroundColor: 'var(--accent)', transform: hov ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top', transition: 'transform 320ms cubic-bezier(0.76,0,0.24,1)' }} />
    </div>
  );
}

function WebServicesGrid() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section ref={ref} style={{ backgroundColor: 'var(--dark-bg)', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px', padding: '112px 32px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(61,82,230,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '48px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease, transform 600ms ease' }}>
          <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 12px', display: 'inline-block', marginBottom: '20px' }}>What We Build</div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--dark-text)', lineHeight: 1.1 }}>
            The four types of website<br />we build for businesses.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} className="web-svc-grid">
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
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 200ms ease' }}>Deliverable —</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{phase.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

function WebProcessSection() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
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
      <WebStatsBand />
      <WebStickyProblem />
      <WebServicesGrid />
      <WebProcessSection />
      <CTABand />
    </>
  );
}
