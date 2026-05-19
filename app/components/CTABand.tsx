'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function CTABand() {
  const [btnHov, setBtnHov] = useState(false);

  const STEPS = [
    { n: '01', label: 'First Call', desc: "One conversation to find what's broken, what it's costing you, and what gets fixed first." },
    { n: '02', label: 'Scoping',    desc: 'We map your operation and come back with a fixed-fee proposal built around reality.' },
    { n: '03', label: 'Build',      desc: "Clean engineering, full documentation, and complete ownership when we're done." },
  ];

  return (
    <section
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
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
            Start a Project
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
            One conversation.
            <br />
            <em style={{ color: 'var(--accent)' }}>We map the rest.</em>
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(220,225,248,0.62)',
              maxWidth: '380px',
            }}
          >
            The first conversation costs nothing. The last deliverable is yours to run.
          </p>
        </motion.div>

        {/* Vertical separator */}
        <motion.div
          className="cta-separator"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          style={{
            backgroundColor: 'var(--dark-border)',
            transformOrigin: 'top center',
          }}
        />

        {/* Right: steps + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
                    color: 'rgba(220,225,248,0.68)',
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
                Start a Conversation{' '}
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
                  Browse services first
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
