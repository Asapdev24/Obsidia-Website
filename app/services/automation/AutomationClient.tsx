'use client';

import { useState, useEffect, useRef, useCallback, type ReactElement } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import WorkflowGraph from '../../components/WorkflowGraph';
import TrustBar from '../../components/TrustBar';
import CTABand from '../../components/CTABand';
import MagneticButton from '../../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CYCLE_COUNT = 4;


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
      style={{ position: 'relative', minHeight: '100dvh', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'stretch', overflow: 'hidden', backgroundColor: 'var(--dark-bg)', paddingTop: '76px' }}
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

const SERVICE_VIDEOS = [
  '/outcome.mp4',
  '/file-transfer.mp4',
  '/growth.mp4',
  '/process.mp4',
];

function ServiceRow({
  item, isActive, onEnter, index,
}: {
  item: typeof AUTO_SERVICES[0];
  isActive: boolean;
  onEnter: () => void;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(-400);
  const spotX = useTransform(mouseX, v => v - 300);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
  }, [mouseX]);

  const handleMouseEnter = useCallback(() => {
    mouseX.set(200);
    onEnter();
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [mouseX, onEnter]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-400);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, [mouseX]);

  return (
    <motion.div
      ref={rowRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, x: -28 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      style={{
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
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
        pointerEvents: 'none',
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

        {/* Video icon */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: '4px',
        }} className="service-metric">
          <video
            ref={videoRef}
            src={SERVICE_VIDEOS[index]}
            muted
            playsInline
            preload="metadata"
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* All four panels are always mounted; only opacity changes — no reflow. */
function ServicePreviewPanel({ items, activeIdx }: { items: typeof AUTO_SERVICES; activeIdx: number }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: '320px' }}>
      {items.map((item, i) => (
        <motion.div
          key={item.n}
          animate={{ opacity: i === activeIdx ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '48px 44px',
            display: 'flex', flexDirection: 'column', gap: '32px',
            pointerEvents: i === activeIdx ? 'auto' : 'none',
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
      ))}
    </div>
  );
}

function AutomationServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="auto-services"
      data-section-label="What We Automate"
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
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ marginBottom: '20px' }}
        >
          <div>
            <span style={{
              fontFamily: 'var(--font-mono), monospace', fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)',
              opacity: 0.7, display: 'block', marginBottom: '20px',
            }}>
              What We Automate
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } } }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {AUTO_SERVICES.map((s, i) => (
              <ServiceRow
                key={i} item={s} index={i}
                isActive={activeIdx === i}
                onEnter={() => setActiveIdx(i)}
              />
            ))}
          </motion.div>

          {/* Right: preview panel — fixed-height container, opacity-only crossfade */}
          <div className="services-preview" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <ServicePreviewPanel items={AUTO_SERVICES} activeIdx={activeIdx} />
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
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: false, amount: 0.06 });
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="auto-process" data-section-label="How We Work" style={{ backgroundColor: '#111111', borderTop: '1px solid #1E1E1C' }}>
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

/* ── Pain / Problem cards ─────────────────────────────────── */
type HoverCard = 'none' | 'left' | 'center' | 'right';
type CardPos   = 'left' | 'center' | 'right';

const FLIP_EASE = 'cubic-bezier(0.22,1,0.36,1)';  // kept for box-shadow transitions
const FM_EASE   = [0.22, 1, 0.36, 1] as const;     // Framer Motion format

/* Card is 272px wide × 290px tall.
   Outer wrapper sits at left:50%/top:50%; FM x/y offset from that origin.
   CX/CY centre the card on that anchor point, fan offsets shift from there. */
const CX = -136; // -(272 / 2)
const CY = -145; // -(290 / 2)

type FMCard = { x: number; y: number; rotate: number; scale: number };

/* Fan durations — 900ms active, 800ms passive. Nothing shorter than 500ms.
   Flip duration — 1400ms. Logged in PainCards useEffect on mount. */
const CARD_FM: Record<CardPos, Record<HoverCard, FMCard>> = {
  left: {
    none:   { x: CX - 248, y: CY + 18,  rotate: -7, scale: 1    },
    left:   { x: CX - 248, y: CY - 22,  rotate:  0, scale: 1.06 },
    center: { x: CX - 282, y: CY + 28,  rotate: -9, scale: 1    },
    right:  { x: CX - 282, y: CY + 28,  rotate: -9, scale: 1    },
  },
  center: {
    none:   { x: CX +   0, y: CY +  0,  rotate:  0, scale: 1    },
    left:   { x: CX +  14, y: CY + 12,  rotate:  4, scale: 1    },
    center: { x: CX +   0, y: CY - 22,  rotate:  0, scale: 1.06 },
    right:  { x: CX -  14, y: CY + 12,  rotate: -4, scale: 1    },
  },
  right: {
    none:   { x: CX + 248, y: CY + 18,  rotate:  7, scale: 1    },
    left:   { x: CX + 282, y: CY + 28,  rotate:  9, scale: 1    },
    center: { x: CX + 282, y: CY + 28,  rotate:  9, scale: 1    },
    right:  { x: CX + 248, y: CY - 22,  rotate:  0, scale: 1.06 },
  },
};

/* Resting order: left=1 (bottom), center=2 (middle), right=3 (top).
   Hovered card always rises to 4; non-hovered cards keep their relative left-to-right order. */
const CARD_Z: Record<CardPos, Record<HoverCard, number>> = {
  left:   { none: 1, left: 4, center: 1, right: 1 },
  center: { none: 2, left: 2, center: 4, right: 2 },
  right:  { none: 3, left: 3, center: 3, right: 4 },
};

const CARD_SHADOW: Record<CardPos, Record<HoverCard, string>> = {
  left: {
    none:   '0 6px 28px rgba(0,0,0,0.38)',
    left:   '0 28px 72px rgba(0,0,0,0.62), 0 4px 16px rgba(0,0,0,0.3)',
    center: '0 2px 10px rgba(0,0,0,0.22)',
    right:  '0 2px 10px rgba(0,0,0,0.22)',
  },
  center: {
    none:   '0 14px 44px rgba(0,0,0,0.52), 0 4px 16px rgba(0,0,0,0.28)',
    left:   '0 4px 20px rgba(0,0,0,0.28)',
    center: '0 32px 80px rgba(0,0,0,0.68), 0 6px 20px rgba(0,0,0,0.32)',
    right:  '0 4px 20px rgba(0,0,0,0.28)',
  },
  right: {
    none:   '0 6px 28px rgba(0,0,0,0.38)',
    left:   '0 2px 10px rgba(0,0,0,0.22)',
    center: '0 2px 10px rgba(0,0,0,0.22)',
    right:  '0 28px 72px rgba(0,0,0,0.62), 0 4px 16px rgba(0,0,0,0.3)',
  },
};

function IconHourglass() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h14" /><path d="M5 20h14" />
      <path d="M7 4v3.5l5 4.5-5 4.5V20" /><path d="M17 4v3.5l-5 4.5 5 4.5V20" />
    </svg>
  );
}
function IconTransfer() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="8" height="8" rx="1.5" />
      <rect x="14" y="3" width="8" height="8" rx="1.5" />
      <rect x="14" y="13" width="8" height="8" rx="1.5" />
      <rect x="2" y="13" width="8" height="8" rx="1.5" />
      <path d="M10 7h4M6 11v2M18 11v2" strokeDasharray="2.5 2" />
    </svg>
  );
}
function IconNodes() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="5.5" r="2.5" />
      <circle cx="19" cy="18.5" r="2.5" />
      <line x1="7.5" y1="11.1" x2="16.5" y2="6.5" strokeDasharray="2.5 2.5" />
      <line x1="7.5" y1="12.9" x2="16.5" y2="17.5" strokeDasharray="2.5 2.5" />
    </svg>
  );
}

const PAIN_CARDS: {
  pos: CardPos;
  Icon: () => ReactElement;
  title: string;
  front: string;
  back: string;
}[] = [
  {
    pos: 'left',
    Icon: IconHourglass,
    title: 'Approval Delays',
    front: 'Every signature that should take minutes sits in an inbox for days.',
    back: 'The decision was already made. The process was not built to move it forward. Every day it waits is a day the business fell behind.',
  },
  {
    pos: 'center',
    Icon: IconTransfer,
    title: 'Manual Data Entry',
    front: 'Your team moves data that should move itself.',
    back: 'One in twenty-five transfers contains an error. Most go unnoticed until they cannot be quietly fixed.',
  },
  {
    pos: 'right',
    Icon: IconNodes,
    title: 'Disconnected Tools',
    front: 'Your operation runs on disconnected systems.',
    back: 'Every gap between them gets filled by a person. The same gap, every day, never actually closed.',
  },
];

function PainCards() {
  const [hover, setHover]     = useState<HoverCard>('none');
  const [flipped, setFlipped] = useState<HoverCard>('none');
  const [btnReady, setBtnReady] = useState<HoverCard>('none');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((pos: CardPos) => {
    setHover(pos);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBtnReady(pos), 1000);
  }, []);

  const handleLeave = useCallback(() => {
    setHover('none');
    setBtnReady('none');
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // Confirm applied durations — remove after QA
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[PainCards] fan-active=900ms fan-passive=800ms flip=1400ms ease=[0.22,1,0.36,1]');
    }
  }, []);

  return (
    <section
      id="auto-pain"
      data-section-label="The Cost of Manual Work"
      data-nav-theme="dark"
      style={{
        backgroundColor: 'var(--dark-bg)',
        height: '100dvh',
        padding: '0 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(61,82,230,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <div style={{ width: '22px', height: '1px', backgroundColor: 'var(--accent)', opacity: 0.55 }} />
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px', fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              The Cost of Manual Work
            </span>
            <div style={{ width: '22px', height: '1px', backgroundColor: 'var(--accent)', opacity: 0.55 }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(44px, 5.8vw, 74px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
            color: 'var(--dark-text)',
          }}>
            Your team is capable.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Your processes are not.</em>
          </h2>
        </motion.div>

        {/* ── Fan cards ── */}
        <motion.div
          className="pain-fan"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          style={{
            position: 'relative',
            height: '400px',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          {PAIN_CARDS.map(({ pos, Icon, title, front, back }) => {
            const isFlipped = flipped === pos;
            return (
              /* Outer wrapper — positions + fans the card via FM x/y/rotate/scale.
                 transformStyle:preserve-3d is REQUIRED here so FM's own transform
                 does not flatten the child flip wrapper's 3D context. */
              <motion.div
                key={pos}
                onMouseEnter={() => handleEnter(pos)}
                onMouseLeave={handleLeave}
                animate={CARD_FM[pos][hover]}
                transition={{ duration: hover === pos ? 0.9 : 0.8, ease: FM_EASE }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '272px',
                  zIndex: CARD_Z[pos][hover],
                  cursor: 'default',
                  transformStyle: 'preserve-3d',
                  perspective: '1600px',
                }}
              >
                {/* Flip wrapper — rotates around Y axis via FM animate.
                    duration: 1.4s / ease: [0.22,1,0.36,1] */}
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 1.4, ease: FM_EASE }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '290px',
                    transformStyle: 'preserve-3d',
                  }}
                >

                  {/* ── Front face ── */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    backgroundColor: '#111423',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '36px 28px 32px',
                    boxShadow: CARD_SHADOW[pos][hover],
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: `box-shadow 500ms ${FLIP_EASE}`,
                  }}>
                    <div style={{ marginBottom: '22px', flexShrink: 0 }}>
                      <Icon />
                    </div>

                    <h3 className="font-heading" style={{
                      fontSize: '28px',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      color: '#FFFFFF',
                      marginBottom: '18px',
                      flexShrink: 0,
                    }}>
                      {title}
                    </h3>

                    <p style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '12.5px',
                      lineHeight: 1.75,
                      color: 'rgba(220,225,248,0.66)',
                    }}>
                      {front}
                    </p>

                    {/* Flip button — appears 1000ms after hover starts.
                        motion.div wrapper handles opacity/y; plain button avoids
                        transform conflicts with Framer Motion's own transform system. */}
                    <AnimatePresence>
                      {btnReady === pos && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          style={{
                            position: 'absolute',
                            bottom: '18px',
                            left: 0, right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFlipped(f => f === pos ? 'none' : pos);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              border: '1px solid rgba(61,82,230,0.4)',
                              backgroundColor: 'rgba(61,82,230,0.14)',
                              borderRadius: '50px',
                              padding: '5px 13px',
                              color: 'rgba(220,225,248,0.85)',
                              fontSize: '9.5px',
                              fontFamily: 'var(--font-body), sans-serif',
                              fontWeight: 500,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Read more
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                              <path d="M4.5 1v7M1 4.5l3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 4.5 4.5)" />
                            </svg>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Back face ── */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#111423',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    boxShadow: CARD_SHADOW[pos][hover],
                  }}>
                    {/* Electric Cobalt top accent */}
                    <div style={{
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--accent)',
                      flexShrink: 0,
                    }} />

                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '28px 28px 30px',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '13px',
                        lineHeight: 1.84,
                        color: 'rgba(220,225,248,0.72)',
                      }}>
                        {back}
                      </p>

                      {/* Back-to-front button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setFlipped('none'); }}
                        style={{
                          marginTop: '20px',
                          alignSelf: 'center',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          border: '1px solid rgba(255,255,255,0.12)',
                          backgroundColor: 'transparent',
                          borderRadius: '50px',
                          padding: '5px 13px',
                          color: 'rgba(220,225,248,0.5)',
                          fontSize: '9.5px',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontWeight: 500,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                          <path d="M4.5 1v7M1 4.5l3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(270 4.5 4.5)" />
                        </svg>
                        Back
                      </button>
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Mobile fallback: stacked cards ── */}
        <div
          className="pain-stack"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '420px',
            margin: '0 auto',
          }}
        >
          {PAIN_CARDS.map(({ pos, Icon, title, back }) => (
            <div
              key={pos}
              style={{
                backgroundColor: '#111423',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--accent)' }} />
              <div style={{ padding: '28px 26px 30px', textAlign: 'center' }}>
                <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
                  <Icon />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                  marginBottom: '14px',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '13px',
                  lineHeight: 1.8,
                  color: 'rgba(220,225,248,0.72)',
                }}>
                  {back}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .pain-fan { display: none !important; }
          .pain-stack { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

/* ── What You Get at Handoff ──────────────────────────────── */
const DELIVERABLES = [
  {
    number: '01',
    title: 'Process Map.',
    body: 'A full technical layout of your operations — every trigger, every handoff, every destination. Not a summary. The exact blueprint of how your business runs.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
  },
  {
    number: '02',
    title: 'Documented Workflows.',
    body: 'Step-by-step documentation written for the person who will run it, not the person who built it. No technical jargon. No assumptions.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1600&q=80',
  },
  {
    number: '03',
    title: 'Team Walkthrough.',
    body: 'A live session with the people who will use the system daily. Questions answered, edge cases covered, your team confident before we close the engagement.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    number: '04',
    title: 'Everything Yours.',
    body: 'Every credential, every integration, every file. Nothing hosted on our infrastructure. Nothing that stops working if you stop working with us.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80',
  },
];

function DeliverableCard({ item, index }: { item: typeof DELIVERABLES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const spotX = useTransform(mouseX, v => v - 140);
  const spotY = useTransform(mouseY, v => v - 140);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-300);
    mouseY.set(-300);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      whileHover="hovered"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.6, ease: EASE, delay: index * 0.09 + 0.1 },
        },
        hovered: { opacity: 1, y: 0 },
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        backgroundColor: 'var(--dark-bg)',
        width: '100%',
        height: '100%',
        borderRight: index % 2 === 0 ? '1px solid var(--dark-border)' : 'none',
        borderBottom: index < 2 ? '1px solid var(--dark-border)' : 'none',
      }}
    >
      {/* Background image — contained within card, fades on hover */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(60%) brightness(0.22)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top accent line — scales in from left on hover */}
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 0 },
          hovered: { scaleX: 1 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          backgroundColor: 'var(--accent)', transformOrigin: 'left center',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Cursor spotlight */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0,
          x: spotX, y: spotY,
          width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(61,82,230,0.11) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      {/* Card content */}
      <div style={{
        position: 'relative', zIndex: 3,
        height: '100%', padding: '28px 28px 32px',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Ghost number — top-left, floats above content */}
        <motion.div
          variants={{
            hidden: { color: 'rgba(255,255,255,0.04)' },
            visible: { color: 'rgba(255,255,255,0.05)' },
            hovered: { color: 'rgba(61,82,230,0.58)' },
          }}
          transition={{ duration: 0.28 }}
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 'clamp(52px, 5.5vw, 68px)',
            fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1,
            userSelect: 'none', flexShrink: 0,
            marginBottom: 'auto',
          }}
        >
          {item.number}
        </motion.div>

        {/* Title + body — anchored to bottom */}
        <div style={{ paddingTop: 20 }}>
          <motion.h3
            className="font-heading"
            variants={{
              hidden: { color: 'rgba(220,225,248,0.72)' },
              visible: { color: 'rgba(220,225,248,0.72)' },
              hovered: { color: '#ffffff' },
            }}
            transition={{ duration: 0.22 }}
            style={{
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            {item.title}
          </motion.h3>

          <motion.p
            className="font-body"
            variants={{
              hidden: { color: 'rgba(220,225,248,0.62)' },
              visible: { color: 'rgba(220,225,248,0.62)' },
              hovered: { color: 'rgba(220,225,248,0.9)' },
            }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: 13, lineHeight: 1.82 }}
          >
            {item.body}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function HandoffDeliverables() {
  return (
    <section
      id="auto-deliverables"
      data-section-label="The Deliverables"
      data-nav-theme="dark"
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 32px',
      }}
    >
      <div style={{
        maxWidth: '1200px', width: '100%', margin: '0 auto',
        flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        paddingTop: 52, paddingBottom: 52,
      }}>

        {/* Header — compact, headline left, subtext right */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ marginBottom: 32, flexShrink: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, backgroundColor: 'var(--accent)', opacity: 0.7 }} />
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8,
            }}>
              The Deliverables
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="font-heading" style={{
              fontSize: 'clamp(30px, 3.8vw, 52px)',
              fontWeight: 500, letterSpacing: '-0.032em',
              color: 'var(--dark-text)', lineHeight: 1.02,
            }}>
              Built to run without us.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: 14, color: 'var(--dark-muted)',
              lineHeight: 1.7, maxWidth: '340px',
              textAlign: 'right', flexShrink: 0,
            }}>
              Every engagement closes with a complete handoff package.
            </p>
          </div>
        </motion.div>

        {/* 2×2 grid — hairline gaps via bg color bleed-through */}
        <div
          className="deliv-grid"
          style={{
            flex: 1, minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 0,
          }}
        >
          {DELIVERABLES.map((d, i) => (
            <DeliverableCard key={d.number} item={d} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .deliv-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(4, auto) !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function AutomationClient() {
  return (
    <>
      <AutomationHero />
      <PainCards />
      <AutomationServicesSection />
      <HandoffDeliverables />
      <TrustBar />
      <CTABand />
    </>
  );
}
