'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CTABand from '../components/CTABand';
import { motion } from 'framer-motion';

/* ── Types ────────────────────────────────────────────────── */
interface ServiceItem {
  number: string; title: string; tagline: string; summary: string;
  href: string; image: string; panel1: string; panel2: string;
  bgImage?: string; imgPosition?: string;
}


/* ── Triptych panel ───────────────────────────────────────── */
function TriptychPanel({
  service,
  index,
  activePanel,
  onEnter,
  onLeave,
  vis,
}: {
  service: ServiceItem;
  index: number;
  activePanel: number | null;
  onEnter: (i: number) => void;
  onLeave: () => void;
  vis: boolean;
}) {
  const isActive  = activePanel === index;
  const isDimmed  = activePanel !== null && !isActive;

  return (
    <Link
      href={service.href}
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'block',
        cursor: 'pointer',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 900ms ease ${200 + index * 150}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${200 + index * 150}ms`,
      }}
    >
      {/* Background image — service-specific */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${service.bgImage ?? service.image})`,
        backgroundSize: service.bgImage ? '300% 100%' : 'cover',
        backgroundPosition: service.bgImage
          ? (['0% center', '50% center', '100% center'] as const)[index]
          : 'center center',
        filter: isDimmed
          ? 'grayscale(85%) brightness(0.18) contrast(1.1)'
          : isActive
          ? 'grayscale(0%) brightness(0.38) contrast(1.12)'
          : 'grayscale(60%) brightness(0.28) contrast(1.08)',
        transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
        transition: 'filter 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none',
      }} />

      {/* Base tint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(6,8,15,0.22) 0%, rgba(6,8,15,0.72) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Accent color wash on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 80%, rgba(61,82,230,0.28) 0%, transparent 68%)',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 700ms ease',
        pointerEvents: 'none',
      }} />

      {/* Thin accent rule on left edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '2px', height: '100%',
        background: 'linear-gradient(to bottom, transparent 0%, var(--accent) 40%, var(--accent) 80%, transparent 100%)',
        transform: `scaleY(${isActive ? 1 : 0})`,
        transformOrigin: 'top center',
        transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
        opacity: 0.85,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '100px 32px 44px',
      }}>
        {/* Top — service number */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: isActive ? 'var(--accent)' : 'rgba(220,225,245,0.3)',
            transition: 'color 400ms ease',
          }}>
            {service.number}
          </span>
          <div style={{
            height: '1px', flex: 1, maxWidth: '32px',
            backgroundColor: isActive ? 'var(--accent)' : 'rgba(61,82,230,0.25)',
            transition: 'background-color 400ms ease',
          }} />
        </div>

        {/* Bottom — title block */}
        <div>
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(220,225,245,0.28)',
            marginBottom: '12px',
          }}>
            {service.title}
          </span>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              fontWeight: 500, letterSpacing: '-0.032em',
              color: isActive ? 'var(--dark-text)' : 'rgba(220,225,245,0.55)',
              lineHeight: 1.05, marginBottom: '16px',
              transition: 'color 400ms ease',
            }}
          >
            {service.panel1}<br /><em style={{ fontStyle: 'italic' }}>{service.panel2}</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '12px', lineHeight: 1.7,
            color: 'rgba(220,225,245,0.38)',
            maxWidth: '220px',
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 350ms ease 80ms, transform 450ms cubic-bezier(0.22,1,0.36,1) 80ms',
          }}>
            {service.tagline}
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginTop: '20px',
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity 300ms ease 150ms, transform 380ms cubic-bezier(0.22,1,0.36,1) 150ms',
          }}>
            <span style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Explore
            </span>
            <ArrowRight size={10} color="var(--accent)" />
          </div>
        </div>
      </div>

      {/* Corner brackets on active */}
      {[
        { top: 12, right: 12, borderTop: '1.5px solid', borderRight: '1.5px solid' },
        { bottom: 12, right: 12, borderBottom: '1.5px solid', borderRight: '1.5px solid' },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '14px', height: '14px',
            ...s,
            borderColor: 'rgba(61,82,230,0.7)',
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'scale(1)' : 'scale(0.5)',
            transition: `opacity 260ms ease ${i * 60}ms, transform 300ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms`,
            pointerEvents: 'none', zIndex: 3,
          }}
        />
      ))}
    </Link>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function ServicesHero({ services }: { services: ServiceItem[] }) {
  const [vis, setVis]             = useState(false);
  const [activePanel, setActive]  = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="services-hero"
      data-nav-theme="dark"
      data-section-label="Services"
      style={{
        backgroundColor: 'var(--dark-bg)',
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Triptych panels — full bleed, no overlays */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '3px',
          flex: 1,
          minHeight: '100dvh',
        }}
        className="triptych-grid"
      >
        {services.map((svc, i) => (
          <TriptychPanel
            key={svc.number}
            service={svc}
            index={i}
            activePanel={activePanel}
            onEnter={setActive}
            onLeave={() => setActive(null)}
            vis={vis}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .triptych-grid { grid-template-columns: 1fr !important; gap: 2px !important; min-height: auto !important; }
          .triptych-grid > a { min-height: 40dvh; }
        }
      `}</style>
    </section>
  );
}

/* ── Service image with hover treatment ───────────────────── */
function ServiceImage({
  service,
  fromRight,
}: {
  service: ServiceItem;
  fromRight: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: fromRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden',
      }}
    >
      <img
        src={service.image}
        alt={`${service.title} — Obsidia`}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: service.imgPosition ?? 'center center', display: 'block',
          filter: hov
            ? 'grayscale(0%) brightness(0.78) contrast(1.06)'
            : 'grayscale(75%) brightness(0.5)',
          transform: hov ? 'scale(1.05)' : 'scale(1.0)',
          transition: 'filter 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.3s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        boxShadow: hov
          ? 'inset 0 0 0 1px rgba(61,82,230,0.65)'
          : 'inset 0 0 0 0px rgba(61,82,230,0)',
        transition: 'box-shadow 550ms ease',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '52px 20px 20px',
        background: 'linear-gradient(to top, rgba(6,8,15,0.88) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 400ms ease, transform 480ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
          letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)',
        }}>
          {service.title}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)',
        }}>
          {service.number} / 03
        </span>
      </div>

      {[
        { top: 0,    left: 0,    borderTop: '2px solid', borderLeft: '2px solid' },
        { top: 0,    right: 0,   borderTop: '2px solid', borderRight: '2px solid' },
        { bottom: 0, left: 0,    borderBottom: '2px solid', borderLeft: '2px solid' },
        { bottom: 0, right: 0,   borderBottom: '2px solid', borderRight: '2px solid' },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '18px', height: '18px',
            ...s,
            borderColor: 'rgba(61,82,230,0.8)',
            opacity: hov ? 1 : 0,
            transform: hov ? 'scale(1)' : 'scale(0.6)',
            transition: `opacity 280ms ease ${i * 50}ms, transform 320ms cubic-bezier(0.22,1,0.36,1) ${i * 50}ms`,
            pointerEvents: 'none', zIndex: 3,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ── Service section ──────────────────────────────────────── */
function ServiceSection({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <section
      id={`service-${service.number}`}
      data-nav-theme="dark"
      data-section-label={service.title}
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost number */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%',
        left: isReversed ? 'auto' : '-1.5%',
        right: isReversed ? '-1.5%' : 'auto',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 'clamp(180px, 26vw, 380px)',
        fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(61,82,230,0.048)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        {service.number}
      </div>

      <div
        className="svc-section-grid"
        style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '80px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '72px',
          alignItems: 'center',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Content column */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 32 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ order: isReversed ? 1 : 0 }}
        >
          {/* Service label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace', fontSize: '10px',
              fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Service {service.number}
            </span>
            <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent)', opacity: 0.4 }} />
          </div>

          {/* Title */}
          <h2 className="font-heading" style={{
            fontSize: 'clamp(32px, 3.8vw, 56px)',
            fontWeight: 500, letterSpacing: '-0.028em',
            color: 'var(--dark-text)', lineHeight: 1.02, marginBottom: '18px',
          }}>
            {service.title}
          </h2>

          {/* Summary */}
          <p className="font-body" style={{
            fontSize: 'clamp(14px, 1.15vw, 16px)',
            lineHeight: 1.88, color: 'rgba(220,225,245,0.52)',
            marginBottom: '36px', maxWidth: '440px',
          }}>
            {service.summary}
          </p>

          {/* CTA */}
          <Link
            href={service.href}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--dark-text)', textDecoration: 'none',
              border: '1px solid var(--dark-border)', padding: '14px 28px',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--accent)';
              el.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--dark-border)';
              el.style.color = 'var(--dark-text)';
            }}
          >
            Explore {service.title} <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Image column */}
        <div style={{ order: isReversed ? 0 : 1 }}>
          <ServiceImage
            service={service}
            fromRight={!isReversed}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .svc-section-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .svc-section-grid > div { order: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function ServicesClient() {
  const SERVICES: ServiceItem[] = [
    {
      number: '01', title: 'Workflow Automation', tagline: 'Replace manual processes with self-executing digital workflows.',
      summary: 'We replace the manual, repetitive processes your team runs every day with digital workflows that execute themselves — approval chains, data syncs, reporting pipelines, and custom operations built to your exact specification.',
      href: '/services/automation',
      image: '/auto_service_photo.png',
      imgPosition: 'left center',
      bgImage: '/main_services_page_hero.jpg',
      panel1: 'Automate', panel2: 'the routine.',
    },
    {
      number: '02', title: 'Website Development', tagline: 'Sites built to convert, not just to exist.',
      summary: 'We build websites that do real work: landing pages that convert, corporate sites that establish credibility, and web applications that users actually come back to. Fast, precise, and built to last.',
      href: '/services/websites',
      image: '/web_dev_service_photo.png',
      bgImage: '/main_services_page_hero.jpg',
      panel1: 'Build sites', panel2: 'that convert.',
    },
    {
      number: '03', title: 'Application Development', tagline: 'Software built for how your team actually operates.',
      summary: 'We build the software your team actually needs — mobile apps, internal tools, client portals, and dashboards designed around how your business works, not how off-the-shelf software wants it to work.',
      href: '/services/apps',
      image: '/app_dev_service_photo.png',
      bgImage: '/main_services_page_hero.jpg',
      panel1: 'Software', panel2: 'to your spec.',
    },
  ];

  return (
    <>
      <ServicesHero services={SERVICES} />
      {SERVICES.map((service, i) => (
        <ServiceSection key={service.number} service={service} index={i} />
      ))}
      <CTABand />
    </>
  );
}
