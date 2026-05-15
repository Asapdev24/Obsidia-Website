'use client';

import { useRef, useEffect, useState } from 'react';

export default function TestimonialQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setActive(true); observer.disconnect(); } });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '112px 32px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Large decorative background quotation mark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-heading), serif',
          fontSize: 'clamp(240px, 22vw, 400px)',
          fontWeight: 600,
          lineHeight: 1,
          color: 'var(--border)',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.6,
        }}
      >
        "
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Opening crimson quote mark */}
        <div
          style={{
            fontFamily: 'var(--font-heading), serif',
            fontSize: 'clamp(72px, 8vw, 120px)',
            fontWeight: 600,
            lineHeight: 0.8,
            color: 'var(--accent)',
            marginBottom: '24px',
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 700ms ease, transform 700ms ease',
          }}
        >
          "
        </div>

        {/* Quote text */}
        <blockquote
          className="font-heading"
          style={{
            fontSize: 'clamp(24px, 3.2vw, 44px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: '0 0 48px 0',
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease 100ms, transform 800ms ease 100ms',
          }}
        >
          Obsidia cut our weekly reporting overhead from 12 hours to under 30 minutes.
          What used to take two people every Monday now runs overnight and lands in our inbox.
        </blockquote>

        {/* Divider */}
        <div
          style={{
            width: '48px',
            height: '1px',
            backgroundColor: 'var(--accent)',
            margin: '0 auto 32px',
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center center',
            transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 400ms',
          }}
        />

        {/* Attribution */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 600ms ease 500ms, transform 600ms ease 500ms',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'var(--text)',
              marginBottom: '6px',
            }}
          >
            Head of Operations
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            200-person logistics firm, Dubai
          </div>
        </div>
      </div>
    </section>
  );
}
