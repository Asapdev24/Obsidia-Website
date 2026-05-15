'use client';

import { useRef, useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function CTABand() {
  const t = useTranslations('cta');
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  const STEPS = [
    { n: '01', label: t('step01label'), desc: t('step01desc') },
    { n: '02', label: t('step02label'), desc: t('step02desc') },
    { n: '03', label: t('step03label'), desc: t('step03desc') },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="home-cta"
      data-section-label="Start a Project"
      style={{
        backgroundColor: 'var(--dark-bg)',
        padding: '120px 32px',
        position: 'relative',
      }}
    >
      <div
        className="cta-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          gap: '0 64px',
          alignItems: 'stretch',
        }}
      >

        {/* Left: headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'opacity 650ms ease 80ms, transform 650ms cubic-bezier(0.22,1,0.36,1) 80ms',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              opacity: 0.6,
              display: 'block',
              marginBottom: '32px',
            }}
          >
            {t('label')}
          </span>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(42px, 5.5vw, 72px)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              color: 'var(--dark-text)',
              lineHeight: 1.05,
              marginBottom: '28px',
            }}
          >
            {t('headline1')}
            <br />
            <em style={{ color: 'var(--accent)' }}>{t('headlineAccent')}</em>
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(220,225,248,0.38)',
              maxWidth: '380px',
            }}
          >
            {t('subtext')}
          </p>
        </div>

        {/* Vertical separator */}
        <div
          className="cta-separator"
          style={{
            backgroundColor: 'var(--dark-border)',
            transformOrigin: 'top center',
            transform: active ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'transform 700ms cubic-bezier(0.22,1,0.36,1) 180ms',
          }}
        />

        {/* Right: steps + CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 650ms ease 80ms, transform 650ms cubic-bezier(0.22,1,0.36,1) 80ms',
          }}
        >
          {/* Steps */}
          <div style={{ marginBottom: '48px' }}>
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                style={{
                  padding: '20px 0',
                  borderBottom: i < STEPS.length - 1 ? '1px solid var(--dark-border)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    color: 'var(--accent)',
                    opacity: 0.75,
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  {step.n} / {step.label.toUpperCase()}
                </span>
                <p
                  className="font-body"
                  style={{
                    fontSize: '17px',
                    lineHeight: 1.7,
                    color: 'rgba(220,225,248,0.52)',
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div>
            <MagneticButton strength={0.18}>
              <Link
                href="/contact"
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  backgroundColor: 'var(--accent)',
                  padding: '18px 40px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: btnHov
                    ? '0 0 0 1px var(--accent), 0 8px 40px rgba(61,82,230,0.5), 0 2px 12px rgba(61,82,230,0.3)'
                    : '0 4px 24px rgba(61,82,230,0.3)',
                  transform: btnHov ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'box-shadow 280ms ease, transform 280ms cubic-bezier(0.22,1,0.36,1)',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    animation: 'ctaPulse 3s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}
                />
                {t('ctaButton')}{' '}
                <span
                  style={{
                    display: 'inline-flex',
                    transform: btnHov ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <ArrowRight size={14} />
                </span>
              </Link>
            </MagneticButton>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                style={{ borderRadius: '50px', display: 'inline-block' }}
              >
                <Link
                  href="/services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    padding: '12px 24px',
                    borderRadius: '50px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {t('ctaSecondary')}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 56px 0 !important;
          }
          .cta-separator { display: none !important; }
        }
      `}</style>
    </section>
  );
}
