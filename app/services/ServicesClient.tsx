'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CTABand from '../components/CTABand';
import GlassCard from '../components/ui/GlassCard';

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

/* ─────────────────────────────────────────────────────────────
   Service data
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    number:   '01',
    title:    'Workflow Automation',
    tag:      'Automation',
    summary:  'We replace the manual, repetitive processes your team runs every day with digital workflows that execute themselves — approval chains, data syncs, reporting pipelines, and custom operations built to your exact specification.',
    outcomes: [
      'Approval cycles cut from days to under four minutes',
      'Cross-system data moves without manual entry or errors',
      'Recurring reports that build, format, and deliver themselves on schedule',
    ],
    href:    '/services/automation',
    label:  'Explore Workflow Automation',
    dark:   true,
  },
  {
    number:   '02',
    title:    'Website Development',
    tag:      null,
    summary:  'We build websites that do real work — landing pages that convert, corporate sites that establish credibility, e-commerce that sells, and web applications that users actually come back to. Fast, precise, and built to last.',
    outcomes: [
      'Purpose-built for your audience and conversion goals',
      'Performance-first: sub-2s load time as a baseline requirement',
      'Delivered with full documentation, CMS access, and team training',
    ],
    href:    '/services/websites',
    label:  'Explore Website Development',
    dark:   false,
  },
  {
    number:   '03',
    title:    'Application Development',
    tag:      null,
    summary:  "We build the software your team actually needs — mobile apps, internal tools, client portals, and dashboards designed around how your business works, not how off-the-shelf software wants it to work.",
    outcomes: [
      'Built to your workflow, not adapted from a generic template',
      'Mobile and desktop, native quality or progressive web app',
      'First 30 days of fixes and adjustments included in every engagement',
    ],
    href:    '/services/apps',
    label:  'Explore Application Development',
    dark:   false,
  },
];

/* ─────────────────────────────────────────────────────────────
   Per-service abstract visual
───────────────────────────────────────────────────────────── */
function ServiceVisual({ index }: { index: number }) {
  if (index === 0) {
    /* Automation: node graph */
    return (
      <svg viewBox="0 0 340 200" style={{ width: '100%', maxWidth: '340px' }} aria-hidden>
        {[
          { x: 10,  y: 83,  label: 'Trigger',  active: true  },
          { x: 120, y: 30,  label: 'Filter',   active: true  },
          { x: 120, y: 136, label: 'Route',    active: false },
          { x: 230, y: 83,  label: 'Action',   active: true  },
          { x: 296, y: 83,  label: 'Done',     active: true  },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={86} height={30} rx={2}
              fill={n.active ? '#1C1010' : '#161616'}
              stroke={n.active ? 'var(--accent)' : '#2A2A28'} strokeWidth={0.8} />
            {n.active && <rect x={n.x} y={n.y + 4} width={2.5} height={22} rx={1} fill="var(--accent)" />}
            <text x={n.x + 43} y={n.y + 15} textAnchor="middle" dominantBaseline="middle"
              fontFamily="var(--font-body), sans-serif" fontSize="8"
              fill={n.active ? '#F0EFE9' : '#5A5A58'}>{n.label}</text>
          </g>
        ))}
        {/* Connectors */}
        <path d="M96,98 C108,98 108,45 120,45" fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.7} />
        <path d="M96,98 C108,98 108,151 120,151" fill="none" stroke="#2A2A28" strokeWidth={0.8} opacity={0.5} />
        <path d="M206,45 C218,45 218,98 230,98" fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.7} />
        <path d="M316,98 L330,98" fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.5} />
        <circle r="2.5" fill="var(--accent)" opacity={0.9}>
          <animateMotion dur="2.2s" repeatCount="indefinite">
            <mpath href="#sv0-path" />
          </animateMotion>
        </circle>
        <path id="sv0-path" d="M96,98 C108,98 108,45 120,45 C144,45 206,45 230,98 L316,98" fill="none" stroke="none" />
        <text x="170" y="190" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
          fontSize="7" fill="#2A2A28" letterSpacing="0.12em">5-NODE PIPELINE · RUNNING</text>
      </svg>
    );
  }

  if (index === 1) {
    /* Websites: responsive grid mockup */
    return (
      <svg viewBox="0 0 340 220" style={{ width: '100%', maxWidth: '340px' }} aria-hidden>
        <rect x="0" y="0" width="340" height="180" rx="3" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.8" />
        <rect x="0" y="0" width="340" height="28" rx="3" fill="var(--surface-alt)" stroke="var(--border)" strokeWidth="0.8" />
        <rect x="0" y="20" width="340" height="8" fill="var(--surface-alt)" />
        <circle cx="14" cy="14" r="3.5" fill="var(--accent)" opacity={0.5} />
        <circle cx="26" cy="14" r="3.5" fill="var(--border)" />
        <circle cx="38" cy="14" r="3.5" fill="var(--border)" />
        <rect x="54" y="8" width="160" height="14" rx="2" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.6" />
        <text x="134" y="17" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="6.5" fill="var(--text-muted)">yourbrand.com</text>
        <rect x="272" y="8" width="56" height="14" rx="2" fill="var(--accent)" opacity={0.25} />
        <text x="300" y="17" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="6.5" fill="var(--accent)">Get Started</text>
        <rect x="8" y="38" width="324" height="52" rx="2" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.5" />
        <rect x="20" y="48" width="120" height="10" rx="1" fill="var(--border)" />
        <rect x="20" y="62" width="80" height="8" rx="1" fill="var(--border)" opacity={0.5} />
        <rect x="20" y="75" width="52" height="10" rx="2" fill="var(--accent)" opacity={0.25} />
        <rect x="8" y="100" width="104" height="68" rx="2" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.5" />
        <rect x="120" y="100" width="104" height="68" rx="2" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.5" />
        <rect x="232" y="100" width="100" height="68" rx="2" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.5" />
        {[8, 120, 232].map((x, i) => (
          <g key={i}>
            <rect x={x + 8} y="108" width="60" height="8" rx="1" fill="var(--border)" />
            <rect x={x + 8} y="120" width="40" height="6" rx="1" fill="var(--border)" opacity={0.5} />
            <rect x={x + 8} y="130" width="80" height="5" rx="1" fill="var(--border)" opacity={0.3} />
            <rect x={x + 8} y="138" width="60" height="5" rx="1" fill="var(--border)" opacity={0.3} />
          </g>
        ))}
        <text x="170" y="204" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
          fontSize="7" fill="var(--text-muted)" letterSpacing="0.12em">DESKTOP · MOBILE · PERFORMANCE-FIRST</text>
      </svg>
    );
  }

  /* Apps: phone + sidebar */
  return (
    <svg viewBox="0 0 340 220" style={{ width: '100%', maxWidth: '340px' }} aria-hidden>
      <rect x="10" y="10" width="320" height="180" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.8" />
      {/* Sidebar */}
      <rect x="10" y="10" width="72" height="180" rx="4 0 0 4" fill="var(--surface-alt)" stroke="var(--border)" strokeWidth="0.8" />
      <rect x="10" y="10" width="72" height="28" fill="var(--surface-alt)" stroke="var(--border)" strokeWidth="0.8" />
      <rect x="82" y="10" width="248" height="28" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.8" />
      <text x="46" y="25" textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-body), sans-serif" fontSize="7.5" fontWeight="600" fill="var(--text)">Obsidia</text>
      <text x="206" y="25" textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-body), sans-serif" fontSize="7.5" fontWeight="600" fill="var(--text)">Operations</text>
      {['Dashboard', 'Projects', 'Reports', 'Settings'].map((label, i) => {
        const y = 46 + i * 24;
        const isFirst = i === 0;
        return (
          <g key={i}>
            {isFirst && <rect x="10" y={y} width="72" height="22" fill="rgba(61,82,230,0.08)" />}
            {isFirst && <rect x="10" y={y} width="2.5" height="22" fill="var(--accent)" />}
            <text x="46" y={y + 11} textAnchor="middle" dominantBaseline="middle"
              fontFamily="var(--font-body), sans-serif" fontSize="7"
              fill={isFirst ? 'var(--accent)' : 'var(--text-muted)'}>
              {label}
            </text>
          </g>
        );
      })}
      {/* Main stats */}
      {[
        { x: 90, label: '2,840', sub: 'Tasks done', active: true },
        { x: 188, label: '98%', sub: 'On time', active: false },
        { x: 272, label: '4.2s', sub: 'Avg', active: false },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="46" width={i === 0 ? 90 : 76} height="38" rx="2"
            fill={c.active ? 'rgba(61,82,230,0.05)' : 'var(--bg)'}
            stroke={c.active ? 'rgba(61,82,230,0.3)' : 'var(--border)'} strokeWidth="0.6" />
          {c.active && <rect x={c.x} y="46" width="2" height="38" fill="var(--accent)" />}
          <text x={c.x + (i === 0 ? 45 : 38)} y="60" textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-mono), monospace" fontSize="13"
            fill={c.active ? 'var(--accent)' : 'var(--text)'}>{c.label}</text>
          <text x={c.x + (i === 0 ? 45 : 38)} y="74" textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-body), sans-serif" fontSize="6" fill="var(--text-muted)">{c.sub}</text>
        </g>
      ))}
      {/* Bar chart */}
      {[0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5].map((h, i) => (
        <rect key={i} x={90 + i * 32} y={94 + (1 - h) * 50} width={24} height={h * 50} rx="1"
          fill={i === 3 ? 'var(--accent)' : 'var(--border)'}
          opacity={i === 3 ? 0.6 : 0.4} />
      ))}
      {/* Row table */}
      <rect x="90" y="152" width="240" height="12" rx="1" fill="var(--surface-alt)" />
      {['Task', 'Status', 'Owner'].map((h, i) => (
        <text key={i} x={98 + i * 80} y="159" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="5.5" fill="var(--text-muted)" fontWeight="600">{h}</text>
      ))}
      <rect x="90" y="164" width="240" height="10" rx="0" />
      <text x="170" y="204" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
        fontSize="7" fill="var(--text-muted)" letterSpacing="0.12em">MOBILE · WEB · INTERNAL TOOLS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single service band
───────────────────────────────────────────────────────────── */
function ServiceBand({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);

  const isDark  = service.dark;
  const textCol  = isDark ? 'var(--dark-text)'  : 'var(--text)';
  const subCol   = isDark ? 'var(--dark-muted)' : 'var(--text-secondary)';
  const borderCol = isDark ? 'var(--dark-border)' : 'var(--border)';
  const bgCol    = isDark ? 'var(--dark-bg)' : (index % 2 === 0 ? 'var(--bg)' : 'var(--surface)');

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: bgCol,
        borderBottom: `1px solid ${borderCol}`,
        padding: '100px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="svc-band-grid"
      >
        {/* Content side */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Number + tag row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: 'var(--accent)',
            }}>
              {service.number}
            </span>
            {service.tag && (
              <span style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                border: '1px solid rgba(61,82,230,0.3)',
                padding: '3px 10px',
              }}>
                {service.tag}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: textCol,
              lineHeight: 1.06,
              marginBottom: '20px',
            }}
          >
            {service.title}
          </h2>

          {/* Summary */}
          <p
            className="font-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: subCol,
              marginBottom: '36px',
              maxWidth: '460px',
            }}
          >
            {service.summary}
          </p>

          {/* Outcomes */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '48px' }}>
            {service.outcomes.map((o, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{
                  width: '5px', height: '5px',
                  backgroundColor: 'var(--accent)',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                  marginTop: '8px',
                }} />
                <span style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: subCol,
                }}>
                  {o}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA link */}
          <Link
            href={service.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: textCol,
              borderBottom: `1px solid ${borderCol}`,
              paddingBottom: '4px',
              transition: 'color 200ms ease, border-color 200ms ease, gap 200ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'var(--accent)';
              el.style.borderColor = 'var(--accent)';
              el.style.gap = '14px';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = textCol;
              el.style.borderColor = borderCol;
              el.style.gap = '10px';
            }}
          >
            {service.label} <ArrowRight size={12} />
          </Link>
        </div>

        {/* Visual side */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 700ms ease 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms',
          }}
        >
          <ServiceVisual index={index} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Approach strip
───────────────────────────────────────────────────────────── */
function ApproachStrip() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderBottom: '1px solid var(--dark-border)',
        padding: '80px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '64px',
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}
        className="approach-strip-grid"
      >
        <div>
          <div className="section-label" style={{ marginBottom: '20px', color: 'var(--accent)' }}>
            How We Work
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: 'var(--dark-text)',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            One process, three disciplines.
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--dark-muted)',
              maxWidth: '520px',
            }}
          >
            Every engagement — whether it&rsquo;s automation, a website, or an application — follows the same four-phase process: Audit, Design, Build, Handoff. No surprises, no scope creep.
          </p>
        </div>

        <Link
          href="/approach"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--dark-text)',
            textDecoration: 'none',
            border: '1px solid var(--dark-border)',
            padding: '14px 28px',
            whiteSpace: 'nowrap',
            transition: 'border-color 200ms ease, color 200ms ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--accent)';
            el.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--dark-border)';
            el.style.color = 'var(--dark-text)';
          }}
        >
          Our Approach <ArrowRight size={12} />
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .approach-strip-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero section — full-vh split: content left, glass cards right
───────────────────────────────────────────────────────────── */
const HERO_CARDS = [
  {
    n: '01', tag: 'Automation',
    title: 'Workflow Automation',
    desc: 'Replace manual processes with digital workflows that run themselves.',
    href: '/services/automation',
  },
  {
    n: '02', tag: 'Web',
    title: 'Website Development',
    desc: 'Sites built to convert — fast, precise, and built to last.',
    href: '/services/websites',
  },
  {
    n: '03', tag: 'Apps',
    title: 'Application Development',
    desc: 'Custom tools built for exactly how your team operates.',
    href: '/services/apps',
  },
];

function ServicesHero() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      data-nav-theme="dark"
      style={{
        backgroundColor: 'var(--dark-bg)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* Cobalt glow — top-left */}
      <div aria-hidden style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '640px', height: '640px',
        background: 'radial-gradient(circle, rgba(61,82,230,0.11) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Violet glow — bottom-right */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-15%', right: '-5%',
        width: '720px', height: '720px',
        background: 'radial-gradient(circle, rgba(123,79,212,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '140px 32px 96px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }} className="svcs-hero-grid">

        {/* ── Left: content ── */}
        <div>
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
          }}>
            <div className="section-label" style={{ marginBottom: '28px', color: 'var(--accent)' }}>
              Services
            </div>
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(44px, 5.5vw, 80px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: 'var(--dark-text)',
              lineHeight: 1.0,
              marginBottom: '32px',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 700ms ease 180ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 180ms',
            }}
          >
            Three disciplines.
            <br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>One partner.</span>
          </h1>

          <p
            className="font-body"
            style={{
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.8,
              color: 'rgba(232,234,242,0.55)',
              maxWidth: '440px',
              marginBottom: '48px',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms ease 300ms, transform 600ms ease 300ms',
            }}
          >
            Automation, web development, and application development — handled by one team that understands how all three connect.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 600ms ease 420ms, transform 600ms ease 420ms',
          }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                padding: '14px 28px',
                transition: 'background-color 200ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
            >
              Start a Project <ArrowRight size={12} />
            </Link>
            <Link
              href="/approach"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(232,234,242,0.55)', textDecoration: 'none',
                border: '1px solid var(--dark-border)',
                padding: '14px 28px',
                transition: 'border-color 200ms ease, color 200ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(61,82,230,0.5)';
                el.style.color = 'var(--dark-text)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--dark-border)';
                el.style.color = 'rgba(232,234,242,0.55)';
              }}
            >
              Our Process
            </Link>
          </div>
        </div>

        {/* ── Right: stacked glass service cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {HERO_CARDS.map((card, i) => (
            <GlassCard
              key={card.n}
              variant="elevated"
              topGradientBorder
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateX(0)' : 'translateX(24px)',
                transition: `opacity 600ms ease ${300 + i * 120}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${300 + i * 120}ms`,
              }}
            >
              <Link
                href={card.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '24px 28px',
                  textDecoration: 'none',
                }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: 'var(--accent)',
                  flexShrink: 0,
                  width: '28px',
                }}>
                  {card.n}
                </span>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '6px',
                  }}>
                    {card.tag}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading), Georgia, serif',
                    fontSize: 'clamp(18px, 1.8vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: 'var(--dark-text)',
                    marginBottom: '6px',
                    lineHeight: 1.2,
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'rgba(232,234,242,0.5)',
                  }}>
                    {card.desc}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={16}
                  style={{ color: 'rgba(61,82,230,0.6)', flexShrink: 0, transition: 'transform 200ms ease' }}
                />
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .svcs-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export default function ServicesClient() {
  return (
    <>
      <ServicesHero />
      {SERVICES.map((service, i) => (
        <ServiceBand key={service.number} service={service} index={i} />
      ))}
      <ApproachStrip />
      <CTABand />
    </>
  );
}
