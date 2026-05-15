'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import WorkflowGraph from '../../components/WorkflowGraph';
import TrustBar from '../../components/TrustBar';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CYCLE_COUNT = 4;

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
  const t = useTranslations('automation');
  const tNav = useTranslations('nav');
  const [wordIdx, setWordIdx] = useState(0);
  const cycleWords = [t('heroCycle0'), t('heroCycle1'), t('heroCycle2'), t('heroCycle3')];
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % CYCLE_COUNT), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-nav-theme="dark"
      id="auto-hero"
      data-section-label="Overview"
      style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }}
      className="auto-hero-grid"
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, width: '55%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '20%', left: '-120px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(61,82,230,0.09) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px 80px 32px', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ marginBottom: '28px' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>{tNav('automationLabel')}</div>
        </motion.div>

        <h1 className="font-heading" style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--dark-text)', marginBottom: '28px' }}>
          <motion.div variants={CONTAINER} initial="hidden" animate="visible" style={{ display: 'block' }}>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.22em', marginBottom: '0.04em' }}>
              {['Automate', 'your'].map((w, i) => (
                <motion.span key={i} variants={WORD} style={{ display: 'inline-block' }}>{w}</motion.span>
              ))}
            </span>
            <motion.span variants={WORD} style={{ display: 'block', minHeight: '1.05em' }} aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.span key={wordIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'inline-block', color: 'var(--accent)', fontStyle: 'italic' }}>
                  {cycleWords[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.div>
        </h1>

        <motion.p variants={FADE_UP} custom={0.85} initial="hidden" animate="visible" className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: 'var(--dark-muted)', maxWidth: '460px', marginBottom: '44px' }}>
          Your team is losing hours every week to tasks that should run automatically. We map those tasks, build the workflows, and hand them over: fully documented and production-ready.
        </motion.p>

        <motion.div variants={FADE_UP} custom={1.05} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
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
        <WorkflowGraph />
      </motion.div>

      <style>{`
        @media (max-width: 1024px) { .auto-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; } .auto-hero-grid > div:last-child { display: none !important; } }
      `}</style>
    </section>
  );
}



/* ── What We Build — split panel ─────────────────────────── */

/* ── What We Build — split panel ─────────────────────────── */
const AUTO_SERVICES = [
  {
    n: '01', tag: 'Approval & Routing',
    title: 'Document & Approval Automation',
    body: 'We map your approval chain and replace each manual step with a triggered route. Documents reach the right person in seconds, not days.',
    outcome: 'Cut approval time by up to 80%',
    metric: '80%',
    metricLabel: 'faster approvals',
    color: 'rgba(61,82,230,0.12)',
  },
  {
    n: '02', tag: 'Data & Integration',
    title: 'Data Integration & Sync',
    body: 'We connect your CRM, ERP, and finance tools so data moves between them without anyone touching it. One entry. Every system updated.',
    outcome: 'Eliminate cross-system data errors',
    metric: '0',
    metricLabel: 'manual re-entry',
    color: 'rgba(61,82,230,0.08)',
  },
  {
    n: '03', tag: 'Reporting & Analytics',
    title: 'Automated Reporting Pipelines',
    body: 'We build pipelines that pull your numbers, format them, and deliver them on a schedule you set. Your weekly report runs without anyone opening a spreadsheet.',
    outcome: 'Reclaim hours of report-building per week',
    metric: '100+',
    metricLabel: 'hrs / year reclaimed',
    color: 'rgba(61,82,230,0.1)',
  },
  {
    n: '04', tag: 'Operations',
    title: 'Custom Operations Workflows',
    body: 'We audit your highest-friction process and build the automation that removes it. Built to your exact spec, documented, and handed off to your team.',
    outcome: 'Workflows built to your exact spec',
    metric: '4–6',
    metricLabel: 'weeks to live',
    color: 'rgba(61,82,230,0.09)',
  },
];

const SERVICE_ICONS = [
  <svg key="0" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="23" cy="7" r="3" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="15" cy="23" r="3" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M10 7h10M7 10v4a4 4 0 004 4h2M23 10v4a4 4 0 01-4 4h-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
  <svg key="1" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
    <rect x="3" y="9" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="18" y="9" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M12 13h6M12 17h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 15l2.5-2.5M12 15l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="2" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
    <rect x="3" y="19" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="12" y="13" width="5" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="21" y="7" width="5" height="20" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M2 5h26" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
  </svg>,
  <svg key="3" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
    <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M15 4v3M15 23v3M4 15h3M23 15h3M7.5 7.5l2.1 2.1M20.4 20.4l2.1 2.1M7.5 22.5l2.1-2.1M20.4 9.6l2.1-2.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
];

function ServiceRow({
  item, isActive, onEnter, index, visible,
}: {
  item: typeof AUTO_SERVICES[0];
  isActive: boolean;
  onEnter: () => void;
  index: number;
  visible: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-400);
  const spotX = useTransform(mouseX, v => v - 300);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
  }, [mouseX]);

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { mouseX.set(200); onEnter(); }}
      onMouseLeave={() => mouseX.set(-400)}
      style={{
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 600ms ease ${index * 110 + 200}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 110 + 200}ms`,
        cursor: 'default',
      }}
    >
      {/* Horizontal scan beam */}
      <motion.div aria-hidden style={{
        position: 'absolute', top: 0, x: spotX,
        width: 560, height: '100%',
        background: 'radial-gradient(ellipse 280px 100% at center, rgba(61,82,230,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '2px', height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85) 50%, transparent)',
        transform: `scaleY(${isActive ? 1 : 0})`,
        transformOrigin: 'center',
        transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
        opacity: 0.8,
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        gap: '0 32px',
        alignItems: 'center',
        padding: '20px 0 20px 20px',
        position: 'relative', zIndex: 1,
      }} className="service-row-inner">
        {/* Number */}
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '11px',
          letterSpacing: '0.14em',
          color: isActive ? 'var(--accent)' : '#FFFFFF',
          transition: 'color 250ms ease',
        }}>
          {item.n}
        </span>

        {/* Title + tag */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#FFFFFF',
              backgroundColor: isActive ? 'rgba(61,82,230,0.1)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isActive ? 'rgba(61,82,230,0.65)' : 'rgba(255,255,255,0.25)'}`,
              padding: '3px 8px',
              transition: 'all 250ms ease',
            }}>
              {item.tag}
            </span>
          </div>
          <h3 className="font-heading" style={{
            fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 500,
            letterSpacing: '-0.02em', lineHeight: 1.15,
            color: isActive ? '#F0EFE9' : '#6A6A68',
            transition: 'color 250ms ease',
          }}>
            {item.title}
          </h3>
        </div>

        {/* Icon */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: '4px',
          color: isActive ? 'var(--accent)' : '#FFFFFF',
          transition: 'color 300ms ease',
        }} className="service-metric">
          {SERVICE_ICONS[index]}
        </div>
      </div>
    </div>
  );
}

function ServicePreviewPanel({ item }: { item: typeof AUTO_SERVICES[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.n}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: EASE }}
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '48px 44px',
          display: 'flex', flexDirection: 'column', gap: '32px',
        }}
      >
        {/* Corner accent */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, right: 0,
          width: '120px', height: '120px',
          background: 'radial-gradient(circle at top right, rgba(61,82,230,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--accent)', opacity: 0.8, display: 'block', marginBottom: '20px',
          }}>
            {item.n}
          </span>

          <h3 className="font-heading" style={{
            fontSize: 'clamp(26px, 2.6vw, 36px)', fontWeight: 500,
            letterSpacing: '-0.025em', lineHeight: 1.1,
            color: '#F0EFE9', marginBottom: '20px',
          }}>
            {item.title}
          </h3>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, var(--accent) 0%, transparent 70%)', marginBottom: '24px', opacity: 0.4 }} />

          <p className="font-body" style={{
            fontSize: '15px', lineHeight: 1.8,
            color: 'rgba(240,239,233,0.55)',
            marginBottom: '32px',
          }}>
            {item.body}
          </p>

          {/* Outcome badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'rgba(61,82,230,0.1)',
            border: '1px solid rgba(61,82,230,0.25)',
            padding: '10px 16px',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--accent)', boxShadow: '0 0 8px rgba(61,82,230,0.7)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-body), sans-serif', fontSize: '12px',
              color: 'rgba(61,82,230,0.85)', letterSpacing: '0.02em',
            }}>
              {item.outcome}
            </span>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}

function AutomationServicesSection() {
  const { ref, visible } = useReveal(0.06);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      ref={ref}
      id="auto-services"
      data-section-label="What We Build"
      style={{
        backgroundColor: 'var(--dark-bg)',
        padding: '40px 32px',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Left gutter decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px',
        background: [
          'linear-gradient(to right, rgba(61,82,230,0.22) 0%, transparent 100%)',
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: 'auto, 28px 28px',
        pointerEvents: 'none',
      }} />
      {/* Right gutter decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px',
        background: [
          'linear-gradient(to left, rgba(61,82,230,0.22) 0%, transparent 100%)',
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: 'auto, 28px 28px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ marginBottom: '20px' }}
        >
          <div>
            <span style={{
              fontFamily: 'var(--font-mono), monospace', fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)',
              opacity: 0.7, display: 'block', marginBottom: '20px',
            }}>
              What We Build
            </span>
            <h2 className="font-heading" style={{
              fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500,
              letterSpacing: '-0.03em', lineHeight: 1.05,
              color: 'var(--dark-text)',
            }}>
              The four workflows<br />businesses automate first.
            </h2>
          </div>
        </motion.div>

        {/* Split layout: rows left, preview right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '64px', alignItems: 'stretch' }} className="services-split">
          {/* Left: service rows */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {AUTO_SERVICES.map((s, i) => (
              <ServiceRow
                key={i} item={s} index={i} visible={visible}
                isActive={activeIdx === i}
                onEnter={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* Right: preview panel */}
          <div className="services-preview">
            <ServicePreviewPanel item={AUTO_SERVICES[activeIdx]} />
          </div>
        </div>
      </div>

      <style>{`
        .services-preview { display: flex; flex-direction: column; }
        @media (max-width: 1024px) {
          .services-split { grid-template-columns: 1fr !important; }
          .services-preview { display: none !important; }
        }
        .service-row-inner { padding-left: 20px !important; }
        @media (max-width: 600px) {
          .service-metric { display: none !important; }
          .service-row-inner { grid-template-columns: 48px 1fr !important; }
        }
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
    detail: 'We architect the full logic: triggers, conditions, transformations, error paths. The complete design is reviewed and signed off before development starts.',
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
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--dark-border)' }}>{phase.time}</span>
        </div>
        <h3 className="font-heading" style={{ fontSize: 'clamp(24px, 2.5vw, 34px)', fontWeight: 500, color: hov ? '#FFFFFF' : '#F0EFE9', lineHeight: 1.1, marginBottom: '14px', letterSpacing: '-0.02em', transition: 'color 200ms ease' }}>{phase.title}</h3>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.75, color: '#4A4A48', marginBottom: '18px', maxWidth: '560px' }}>{phase.detail}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--dark-border)', transition: 'color 200ms ease' }}>Deliverable:</span>
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: '#6A6A68', lineHeight: 1.5 }}>{phase.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

function AutoProcessTimeline() {
  const { ref, visible } = useReveal(0.06);
  return (
    <section ref={ref} id="auto-process" data-section-label="How We Work" style={{ backgroundColor: '#111111', borderTop: '1px solid #1E1E1C' }}>
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
      <AutomationServicesSection />
      <TrustBar />
      <CTABand />
    </>
  );
}
