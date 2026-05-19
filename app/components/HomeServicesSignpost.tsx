'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Digits scramble into the target number when the card enters viewport */
function ScrambleN({ n, go }: { n: string; go: boolean }) {
  const [txt, setTxt] = useState('--');
  const done = useRef(false);

  useEffect(() => {
    if (!go || done.current) return;
    const d = '0123456789';
    let f = 0;
    const tot = 22;
    const id = setInterval(() => {
      f++;
      if (f >= tot) {
        setTxt(n);
        done.current = true;
        clearInterval(id);
        return;
      }
      const p = f / tot;
      setTxt(
        (p > 0.55 ? n[0] : d[Math.floor(Math.random() * 10)]) +
        (p > 0.72 ? n[1] : d[Math.floor(Math.random() * 10)])
      );
    }, 38);
    return () => clearInterval(id);
  }, [go, n]);

  return <>{txt}</>;
}

type Svc = { n: string; title: string; desc: string; href: string; time: string };

function ServiceCard({ s, idx }: { s: Svc; idx: number }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [hov, setHov] = useState(false);

  /* Cursor-following spotlight */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(255,255,255,0.1), transparent 55%)`;

  /* Spring hover lift */
  const scaleS = useSpring(1, { stiffness: 300, damping: 26 });
  const yS     = useSpring(0, { stiffness: 300, damping: 26 });

  useEffect(() => {
    scaleS.set(hov ? 1.028 : 1);
    yS.set(hov ? -7 : 0);
  }, [hov, scaleS, yS]);

  /* Trigger number scramble when card enters viewport */
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    /* Outer: scroll-entry stagger */
    <motion.div
      ref={outerRef}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.78, ease: EASE, delay: 0.22 + idx * 0.16 }}
    >
      {/* Inner: spring hover lift */}
      <motion.div
        style={{ scale: scaleS, y: yS, position: 'relative', height: '100%' }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
      >
        <Link href={s.href} onMouseMove={onMove} className="svc3-card">

          {/* Cursor spotlight */}
          <motion.div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              background: spotlight,
              opacity: hov ? 1 : 0,
              transition: 'opacity 260ms ease',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Ghost watermark */}
          <span className="svc3-wm" aria-hidden="true">{s.n}</span>

          {/* Number + expanding rule */}
          <div className="svc3-cardhead">
            <span className="svc3-num">
              <ScrambleN n={s.n} go={seen} />
            </span>
            <div className="svc3-rule" />
          </div>

          {/* Service title — italic serif flourish on hover */}
          <h3 className="font-heading svc3-title">{s.title}</h3>

          {/* Description — slides up on hover */}
          <p className="font-body svc3-desc">{s.desc}</p>

          {/* Footer */}
          <div className="svc3-footer">
            <span className="svc3-time">{s.time}</span>
            <span className="svc3-arrow"><ArrowRight size={15} /></span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function HomeServicesSignpost() {
  const t = useTranslations('homeServices');
  const SERVICES: Svc[] = [
    { n: '01', title: t('automationTitle'), desc: t('automationDesc'), href: '/services/automation', time: t('automationTime') },
    { n: '02', title: t('websitesTitle'),   desc: t('websitesDesc'),   href: '/services/websites',   time: t('websitesTime')   },
    { n: '03', title: t('appsTitle'),       desc: t('appsDesc'),       href: '/services/apps',       time: t('appsTime')       },
  ];

  return (
    <section
      id="home-services"
      data-section-label="What We Build"
      className="svc3-section"
    >
      <style>{`
        .svc3-section {
          background-color: var(--bg);
          padding: 0 32px;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient ore glows ── */
        .svc3-ore-1 {
          position: absolute; top: -15%; right: -8%;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(61,82,230,0.18) 0%, transparent 65%);
          pointer-events: none;
        }
        .svc3-ore-2 {
          position: absolute; bottom: -12%; left: -6%;
          width: 720px; height: 720px; border-radius: 50%;
          background: radial-gradient(circle, rgba(136,96,230,0.13) 0%, transparent 65%);
          pointer-events: none;
        }
        .svc3-ore-3 {
          position: absolute; top: 50%; left: 40%;
          transform: translate(-50%, -50%);
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(61,82,230,0.07) 0%, transparent 60%);
          pointer-events: none;
        }

        .svc3-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 80px 0; width: 100%;
          position: relative; z-index: 1;
        }
        .svc3-hdr {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 56px;
        }
        .svc3-h2 {
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.92;
          color: #0D1147;
          margin-bottom: 14px;
        }
        .svc3-sub { font-size: 14px; color: var(--accent); line-height: 1.6; }
        .svc3-link {
          font-family: var(--font-body), sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #fff;
          text-decoration: none; background-color: var(--accent);
          padding: 14px 28px; border-radius: 50px;
          transition: background-color 200ms ease; flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .svc3-link:hover { background-color: var(--accent-hover); }

        .svc3-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        /* ── Card ── */
        .svc3-card {
          display: flex; flex-direction: column;
          padding: 52px 44px;
          text-decoration: none; color: var(--text);
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.58);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow:
            0 8px 32px rgba(61,82,230,0.1),
            0 1px 0 rgba(255,255,255,1) inset,
            inset 0 0 0 1px rgba(61,82,230,0.06);
          transition:
            background-color 340ms ease,
            border-color 340ms ease,
            box-shadow 340ms ease;
          cursor: pointer;
          height: 100%;
        }
        .svc3-card:hover {
          background-color: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 16px 56px rgba(61,82,230,0.45), 0 2px 0 rgba(255,255,255,0.18) inset;
        }

        /* Ghost number watermark */
        .svc3-wm {
          position: absolute; bottom: -20px; right: -6px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(92px, 11vw, 158px);
          font-weight: 400; line-height: 1;
          color: rgba(8,9,14,0.05);
          user-select: none; pointer-events: none;
          transition: color 340ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1);
        }
        .svc3-card:hover .svc3-wm {
          color: rgba(61,82,230,0.22);
          transform: scale(1.07) translateY(-4px);
        }

        /* Number + rule header row */
        .svc3-cardhead {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 30px;
          position: relative; z-index: 3;
        }
        .svc3-num {
          font-family: var(--font-mono), monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em;
          color: var(--accent);
          transition: color 340ms ease;
          flex-shrink: 0;
          min-width: 22px;
        }
        .svc3-card:hover .svc3-num { color: rgba(255,255,255,0.65); }

        .svc3-rule {
          flex: 1; height: 1px;
          background-color: var(--border);
          transform: scaleX(0.32);
          transform-origin: left center;
          transition:
            transform 460ms cubic-bezier(0.22,1,0.36,1),
            background-color 340ms ease;
        }
        .svc3-card:hover .svc3-rule {
          transform: scaleX(1);
          background-color: rgba(255,255,255,0.28);
        }

        /* Service title — italic on hover for editorial serif weight */
        .svc3-title {
          font-size: clamp(34px, 3.8vw, 56px);
          font-weight: 500;
          letter-spacing: -0.042em;
          line-height: 1.04;
          color: var(--text);
          margin-bottom: 22px;
          white-space: pre-line;
          transition: color 340ms ease;
          position: relative; z-index: 1;
        }
        .svc3-card:hover .svc3-title {
          color: #FAFBFF;
          font-style: italic;
        }

        /* Description — slides up from below on hover */
        .svc3-desc {
          font-size: 14px; line-height: 1.76;
          color: var(--text-secondary); flex: 1;
          opacity: 0;
          transform: translateY(11px);
          transition:
            color 340ms ease,
            opacity 340ms ease 30ms,
            transform 460ms cubic-bezier(0.22,1,0.36,1) 15ms;
          position: relative; z-index: 1;
        }
        .svc3-card:hover .svc3-desc {
          color: rgba(255,255,255,0.72);
          opacity: 1;
          transform: translateY(0);
        }

        /* Footer */
        .svc3-footer {
          margin-top: 32px; padding-top: 22px;
          border-top: 1px solid transparent;
          display: flex; justify-content: space-between; align-items: center;
          position: relative; z-index: 1;
          transition: border-color 340ms ease;
        }
        .svc3-card:hover .svc3-footer { border-color: rgba(255,255,255,0.15); }
        .svc3-time {
          font-family: var(--font-mono), monospace; font-size: 10px;
          color: var(--muted); letter-spacing: 0.06em; transition: color 340ms ease;
        }
        .svc3-card:hover .svc3-time { color: rgba(255,255,255,0.55); }
        .svc3-arrow {
          display: inline-flex; color: var(--muted);
          transition: transform 260ms cubic-bezier(0.22,1,0.36,1), color 340ms ease;
        }
        .svc3-card:hover .svc3-arrow { transform: translateX(7px); color: rgba(255,255,255,0.8); }

        @media (max-width: 768px) {
          .svc3-grid { grid-template-columns: 1fr; gap: 16px; }
          .svc3-hdr { flex-direction: column; align-items: flex-start; gap: 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc3-card, .svc3-title, .svc3-desc, .svc3-rule,
          .svc3-wm, .svc3-footer, .svc3-arrow, .svc3-num {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Background ores */}
      <div className="svc3-ore-1" aria-hidden />
      <div className="svc3-ore-2" aria-hidden />
      <div className="svc3-ore-3" aria-hidden />

      <div className="svc3-inner">
        {/* Section header with framer-motion fade-in */}
        <motion.div
          className="svc3-hdr"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.62, ease: EASE, delay: 0.28 }}
        >
          <div>
            <h2 className="font-heading svc3-h2">{t('sectionLabel')}</h2>
            <p className="font-body svc3-sub" style={{ color: 'var(--accent)' }}>
              <span style={{ color: '#0D1147' }}>Three</span>
              {' '}Disciplines.{' '}
              <span style={{ color: '#0D1147' }}>One</span>
              {' '}Partner.
            </p>
          </div>
          <Link href="/services" className="svc3-link">
            {t('allServices')} <ArrowRight size={10} />
          </Link>
        </motion.div>

        <div className="svc3-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.n} s={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
