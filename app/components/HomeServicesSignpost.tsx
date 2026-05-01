'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    n: '01',
    tag: 'Automation',
    title: 'Workflow Automation',
    desc: 'Replace manual, repetitive processes with digital workflows that run themselves.',
    href: '/services/automation',
  },
  {
    n: '02',
    tag: 'Web',
    title: 'Website Development',
    desc: 'Sites built to convert visitors, load fast, and work correctly on every device.',
    href: '/services/websites',
  },
  {
    n: '03',
    tag: 'Apps',
    title: 'Application Development',
    desc: 'Custom tools built for exactly how your team operates.',
    href: '/services/apps',
  },
];

function ServiceCard({ s, index, active }: { s: typeof SERVICES[0]; index: number; active: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={s.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '36px 32px',
        textDecoration: 'none',
        borderRight: index < 2 ? '1px solid var(--border)' : 'none',
        borderTop: `2px solid ${hov ? 'var(--accent)' : 'transparent'}`,
        backgroundColor: hov ? 'var(--accent-subtle)' : 'transparent',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: [
          `opacity 600ms ease ${index * 120 + 200}ms`,
          `transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 120 + 200}ms`,
          'background-color 200ms ease',
          'border-color 200ms ease',
        ].join(', '),
      }}
      className="svc-signpost-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
        }}>
          {s.n}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '8px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hov ? 'var(--accent)' : 'var(--muted)',
          transition: 'color 200ms ease',
        }}>
          {s.tag}
        </span>
      </div>

      <h3 className="font-heading" style={{
        fontSize: 'clamp(22px, 2.2vw, 28px)',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        color: hov ? 'var(--accent)' : 'var(--text)',
        lineHeight: 1.15,
        marginBottom: '14px',
        transition: 'color 200ms ease',
      }}>
        {s.title}
      </h3>

      <p className="font-body" style={{
        fontSize: '14px',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        flex: 1,
        marginBottom: '28px',
      }}>
        {s.desc}
      </p>

      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: hov ? '8px' : '5px',
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: hov ? 'var(--accent)' : 'var(--muted)',
        transition: 'color 200ms ease, gap 200ms ease',
      }}>
        Explore <ArrowRight size={11} />
      </span>
    </Link>
  );
}

export default function HomeServicesSignpost() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Header row */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '72px 32px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
      }}>
        <div>
          <div className="section-label" style={{ marginBottom: '16px' }}>What We Do</div>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            lineHeight: 1.1,
          }}>
            Three disciplines.<br />One partner.
          </h2>
        </div>
        <Link
          href="/services"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            paddingBottom: '3px',
            borderBottom: '1px solid var(--border)',
            transition: 'color 200ms ease, border-color 200ms ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--accent)';
            el.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--text-secondary)';
            el.style.borderColor = 'var(--border)';
          }}
        >
          All Services <ArrowRight size={11} />
        </Link>
      </div>

      {/* Cards row */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        marginTop: '48px',
        borderTop: '1px solid var(--border)',
      }} className="svc-signpost-grid">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} s={s} index={i} active={active} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .svc-signpost-grid { grid-template-columns: 1fr !important; }
          .svc-signpost-card { border-right: none !important; border-bottom: 1px solid var(--border) !important; }
          .svc-signpost-card:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
