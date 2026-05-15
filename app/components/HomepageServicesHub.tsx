'use client';

import { useRef, useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    number:   '01',
    title:    'Workflow Automation',
    summary:  'We replace your manual processes with digital workflows that run without anyone touching them: approval chains, data syncs, reporting pipelines, and operations at any scale.',
    outcomes: [
      'Approval cycles cut from days to minutes',
      'Cross-system data moves without manual entry',
      'Recurring reports that deliver themselves',
    ],
    href:     '/services/automation',
    label:    'Explore Automation',
    bg:       'var(--dark-bg)',
    text:     'var(--dark-text)',
    sub:      'var(--dark-muted)',
    border:   'var(--dark-border)',
    dark:     true,
  },
  {
    number:   '02',
    title:    'Website Development',
    summary:  'We build websites that convert visitors, load fast, and work correctly on every device, from corporate sites and landing pages to e-commerce and web applications.',
    outcomes: [
      'Purpose-built for your specific audience',
      'Performance-first: sub-2s load on every page',
      'Handoff includes full documentation and training',
    ],
    href:     '/services/websites',
    label:    'Explore Websites',
    bg:       'var(--bg)',
    text:     'var(--text)',
    sub:      'var(--text-secondary)',
    border:   'var(--border)',
    dark:     false,
  },
  {
    number:   '03',
    title:    'Application Development',
    summary:  'We build the custom tools your team actually needs: mobile apps, internal dashboards, client portals, and operational software designed around how your business works.',
    outcomes: [
      'Built to your workflow, not forced into a template',
      'Mobile and desktop, native or progressive web',
      'Handed off with 30 days of included support',
    ],
    href:     '/services/apps',
    label:    'Explore Applications',
    bg:       'var(--surface)',
    text:     'var(--text)',
    sub:      'var(--text-secondary)',
    border:   'var(--border)',
    dark:     false,
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: typeof SERVICES[0];
  index:   number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: service.bg,
        borderBottom: `1px solid ${service.border}`,
        padding: '96px 32px',
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
        className="service-row-grid"
      >
        {/* Left: content */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Number */}
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: 'var(--accent)',
              marginBottom: '20px',
            }}
          >
            {service.number}
          </div>

          {/* Title */}
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(34px, 4vw, 52px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: service.text,
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
              color: service.sub,
              marginBottom: '36px',
              maxWidth: '440px',
            }}
          >
            {service.summary}
          </p>

          {/* Outcomes */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '44px' }}>
            {service.outcomes.map((o, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
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
                  lineHeight: 1.6,
                  color: service.sub,
                }}>
                  {o}
                </span>
              </li>
            ))}
          </ul>

          {/* Link */}
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
              color: service.dark ? 'var(--dark-text)' : 'var(--text)',
              borderBottom: `1px solid ${service.dark ? 'var(--dark-border)' : 'var(--border)'}`,
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
              el.style.color = service.dark ? 'var(--dark-text)' : 'var(--text)';
              el.style.borderColor = service.dark ? 'var(--dark-border)' : 'var(--border)';
              el.style.gap = '10px';
            }}
          >
            {service.label} <ArrowRight size={12} />
          </Link>
        </div>

        {/* Right: abstract visual */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 700ms ease 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms',
          }}
        >
          <ServiceVisual index={index} dark={service.dark} />
        </div>
      </div>
    </div>
  );
}

/* ── Minimal geometric placeholder visuals ──────────────────── */
function ServiceVisual({ index, dark }: { index: number; dark: boolean }) {
  const stroke = dark ? '#2A2A28' : 'var(--border)';
  const accent = 'var(--accent)';
  const fill   = dark ? '#161616' : 'var(--surface)';
  const textFill = dark ? '#5A5A58' : 'var(--text-muted)';

  if (index === 0) {
    /* Automation: flow diagram */
    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', maxWidth: '400px', display: 'block' }} aria-hidden>
        <rect width="400" height="240" fill="none" />
        {/* Flow nodes */}
        {[
          { x: 20,  y: 96,  w: 88, label: 'CRM Trigger'  },
          { x: 156, y: 44,  w: 88, label: 'Filter Rules' },
          { x: 156, y: 148, w: 88, label: 'Route Logic'  },
          { x: 292, y: 96,  w: 88, label: 'Auto-Action'  },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={32} rx={2}
              fill={i === 0 || i === 3 ? '#1C1010' : fill}
              stroke={i === 0 || i === 3 ? accent : stroke}
              strokeWidth={0.8} />
            {(i === 0 || i === 3) && <rect x={n.x} y={n.y + 4} width={2.5} height={24} rx={1} fill={accent} />}
            <text x={n.x + n.w / 2} y={n.y + 16} textAnchor="middle" dominantBaseline="middle"
              fontFamily="var(--font-body), sans-serif" fontSize="8"
              fill={i === 0 || i === 3 ? '#F0EFE9' : textFill}>
              {n.label}
            </text>
          </g>
        ))}
        {/* Connectors */}
        <path d="M108,112 C132,112 132,60 156,60" fill="none" stroke={accent} strokeWidth={1.2} opacity={0.7} />
        <path d="M108,112 C132,112 132,164 156,164" fill="none" stroke={stroke} strokeWidth={0.8} opacity={0.5} />
        <path d="M244,60 C268,60 268,112 292,112" fill="none" stroke={accent} strokeWidth={1.2} opacity={0.7} />
        <path d="M244,164 C268,164 268,112 292,112" fill="none" stroke={stroke} strokeWidth={0.8} opacity={0.5} />
        {/* Animated dot */}
        <circle r="3" fill={accent} opacity={0.9}>
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#hp-path1" />
          </animateMotion>
        </circle>
        <path id="hp-path1" d="M108,112 C132,112 132,60 156,60 C180,60 268,60 292,112" fill="none" stroke="none" />
        {/* Label */}
        <text x="200" y="228" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
          fontSize="7.5" fill={textFill} letterSpacing="0.12em">
          APPROVAL FLOW · 4-STEP PIPELINE
        </text>
      </svg>
    );
  }

  if (index === 1) {
    /* Websites: browser wireframe */
    return (
      <svg viewBox="0 0 400 260" style={{ width: '100%', maxWidth: '400px', display: 'block' }} aria-hidden>
        {/* Browser */}
        <rect x="10" y="10" width="380" height="230" rx="4" fill={fill} stroke={stroke} strokeWidth="0.8" />
        <rect x="10" y="10" width="380" height="32" rx="4" fill={dark ? '#1A1A18' : 'var(--surface-alt)'} stroke={stroke} strokeWidth="0.8" />
        <rect x="10" y="34" width="380" height="8" fill={dark ? '#1A1A18' : 'var(--surface-alt)'} />
        {/* Dots */}
        <circle cx="26" cy="26" r="4" fill={accent} opacity={0.65} />
        <circle cx="40" cy="26" r="4" fill={stroke} />
        <circle cx="54" cy="26" r="4" fill={stroke} />
        {/* URL bar */}
        <rect x="72" y="18" width="200" height="16" rx="2" fill={dark ? '#111111' : 'var(--bg)'} stroke={stroke} strokeWidth="0.6" />
        <text x="172" y="28" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="7" fill={textFill}>
          yourbusiness.com
        </text>
        {/* Nav */}
        <rect x="22" y="50" width="80" height="10" rx="2" fill={stroke} opacity={0.5} />
        {[130, 160, 190, 220].map(x => (
          <rect key={x} x={x} y="50" width="22" height="10" rx="2" fill={stroke} opacity={0.3} />
        ))}
        <rect x="330" y="49" width="48" height="12" rx="2" fill={accent} opacity={0.3} />
        {/* Hero block */}
        <rect x="22" y="72" width="356" height="60" rx="2" fill={dark ? '#161616' : 'var(--surface)'} stroke={stroke} strokeWidth="0.5" />
        <rect x="40" y="84" width="140" height="10" rx="1" fill={dark ? '#2A2A28' : 'var(--border)'} />
        <rect x="40" y="100" width="100" height="8" rx="1" fill={dark ? '#1E1E1C' : 'var(--border)'} />
        <rect x="40" y="114" width="60" height="12" rx="2" fill={accent} opacity={0.4} />
        {/* Content rows */}
        {[148, 164, 180, 196, 212].map((y, i) => (
          <rect key={y} x="22" y={y} width={`${[85, 65, 75, 55, 40][i]}%`} height="7" rx="1"
            fill={dark ? '#1E1E1C' : 'var(--border)'} opacity={0.5} />
        ))}
        <text x="200" y="250" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
          fontSize="7.5" fill={textFill} letterSpacing="0.12em">
          DESKTOP · MOBILE · PERFORMANCE-FIRST
        </text>
      </svg>
    );
  }

  /* Apps: dual-panel (phone + dashboard) */
  return (
    <svg viewBox="0 0 400 260" style={{ width: '100%', maxWidth: '400px', display: 'block' }} aria-hidden>
      {/* Phone */}
      <rect x="20" y="20" width="110" height="200" rx="12" fill={fill} stroke={stroke} strokeWidth="0.8" />
      <rect x="48" y="20" width="54" height="8" rx="0 0 6 6" fill={dark ? '#1A1A18' : 'var(--surface-alt)'} />
      <rect x="52" y="22" width="46" height="4" rx="2" fill={stroke} opacity={0.5} />
      <rect x="50" y="208" width="50" height="4" rx="2" fill={stroke} />
      {/* Phone status bar */}
      <rect x="20" y="30" width="110" height="14" fill={dark ? '#111111' : 'var(--surface)'} />
      <text x="34" y="39" fontFamily="var(--font-mono), monospace" fontSize="6" fill={textFill}>9:41</text>
      {/* App header */}
      <rect x="20" y="44" width="110" height="20" fill={dark ? '#161616' : 'var(--surface-alt)'} />
      <text x="75" y="56" textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-body), sans-serif" fontSize="8" fontWeight="600" fill={dark ? '#F0EFE9' : 'var(--text)'}>
        Obsidia Hub
      </text>
      {/* List items */}
      {['Dashboard', 'Projects', 'Reports', 'Settings'].map((label, i) => {
        const y = 66 + i * 26;
        const isFirst = i === 0;
        return (
          <g key={i}>
            <rect x="20" y={y} width="110" height="24" fill={isFirst ? 'rgba(61,82,230,0.06)' : 'transparent'} />
            {isFirst && <rect x="20" y={y} width="2.5" height="24" fill={accent} />}
            <rect x="30" y={y + 7} width="10" height="10" rx="2"
              fill={isFirst ? '#1C1010' : fill}
              stroke={isFirst ? accent : stroke} strokeWidth="0.5" />
            <text x="46" y={y + 13} dominantBaseline="middle"
              fontFamily="var(--font-body), sans-serif" fontSize="7.5"
              fill={isFirst ? (dark ? '#F0EFE9' : 'var(--text)') : textFill}>
              {label}
            </text>
          </g>
        );
      })}

      {/* Dashboard panel */}
      <rect x="148" y="20" width="232" height="200" rx="4" fill={fill} stroke={stroke} strokeWidth="0.8" />
      <rect x="148" y="20" width="232" height="28" fill={dark ? '#1A1A18' : 'var(--surface-alt)'} stroke={stroke} strokeWidth="0.8" />
      <rect x="148" y="40" width="232" height="8" fill={dark ? '#1A1A18' : 'var(--surface-alt)'} />
      <text x="264" y="35" textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-body), sans-serif" fontSize="8" fontWeight="600"
        fill={dark ? '#F0EFE9' : 'var(--text)'}>
        Operations Dashboard
      </text>
      {/* Stat cards */}
      {[
        { x: 156, label: '2,840', sub: 'Tasks done' },
        { x: 252, label: '98%',   sub: 'Uptime'     },
        { x: 316, label: '4.2s',  sub: 'Avg. time'  },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="58" width={i === 0 ? 88 : 56} height="44" rx="2"
            fill={i === 0 ? '#1C1010' : fill}
            stroke={i === 0 ? accent : stroke} strokeWidth="0.6" />
          {i === 0 && <rect x={c.x} y="58" width="2.5" height="44" rx="1" fill={accent} />}
          <text x={c.x + (i === 0 ? 44 : 28)} y="76" textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-mono), monospace" fontSize={i === 0 ? '14' : '11'}
            fill={i === 0 ? '#F0EFE9' : (dark ? '#9A9890' : 'var(--text)')}>
            {c.label}
          </text>
          <text x={c.x + (i === 0 ? 44 : 28)} y="93" textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-body), sans-serif" fontSize="6" fill={textFill}>
            {c.sub}
          </text>
        </g>
      ))}
      {/* Chart bars */}
      {[0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5].map((h, i) => (
        <rect key={i} x={156 + i * 30} y={110 + (1 - h) * 60} width={22} height={h * 60} rx="1"
          fill={i === 3 ? accent : (dark ? '#1E1E1C' : 'var(--border)')}
          opacity={i === 3 ? 0.7 : 0.6} />
      ))}
      {/* Table header */}
      <rect x="156" y="180" width="216" height="10" rx="1" fill={dark ? '#1A1A18' : 'var(--surface-alt)'} />
      {['Task', 'Owner', 'Status'].map((h, i) => (
        <text key={i} x={164 + i * 72} y="186" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="5.5" fill={textFill} fontWeight="600">
          {h}
        </text>
      ))}
      <rect x="156" y="192" width="216" height="8" rx="0" fill={dark ? '#111111' : 'transparent'} />
      <text x="200" y="250" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
        fontSize="7.5" fill={textFill} letterSpacing="0.12em">
        MOBILE · WEB · INTERNAL TOOLS
      </text>
    </svg>
  );
}

export default function HomepageServicesHub() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Section header */}
      <div
        style={{
          backgroundColor: 'var(--dark-bg)',
          padding: '80px 32px 64px',
          borderTop: '1px solid var(--dark-border)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms ease, transform 600ms ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '24px', color: 'var(--accent)' }}>
            What We Build
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(34px, 4vw, 52px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: 'var(--dark-text)',
                lineHeight: 1.1,
              }}
            >
              Three disciplines.
              <br />
              One partner.
            </h2>
            <Link
              href="/services"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--dark-muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid var(--dark-border)',
                paddingBottom: '4px',
                transition: 'color 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--dark-text)';
                e.currentTarget.style.borderColor = 'var(--dark-muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--dark-muted)';
                e.currentTarget.style.borderColor = 'var(--dark-border)';
              }}
            >
              View all services <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Service rows */}
      {SERVICES.map((service, i) => (
        <ServiceRow key={service.number} service={service} index={i} />
      ))}

      <style>{`
        @media (max-width: 900px) {
          .service-row-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .service-row-grid > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
