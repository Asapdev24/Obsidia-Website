'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function CTABand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]');
    targets.forEach((t, i) => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(16px)';
      t.style.transition = `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targets.forEach((t) => {
              t.style.opacity = '1';
              t.style.transform = 'translateY(0)';
            });
            observer.disconnect();
          }
        });
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
        backgroundColor: 'var(--dark-bg)',
        padding: '112px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot grid on dark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '64px',
          alignItems: 'center',
        }}
        className="cta-band-inner"
      >
        {/* Left: copy */}
        <div>
          <div
            data-reveal
            className="section-label"
            style={{ marginBottom: '24px', color: 'var(--accent)' }}
          >
            <span style={{ '--label-line-color': 'var(--accent)' } as React.CSSProperties}>
              Ready to begin
            </span>
          </div>

          <h2
            data-reveal
            className="font-heading"
            style={{
              fontSize: 'clamp(38px, 5vw, 68px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: 'var(--dark-text)',
              lineHeight: 1.05,
              marginBottom: '20px',
            }}
          >
            You know what
            <br />
            needs fixing. We know
            <br />
            how to build it.
          </h2>

          <p
            data-reveal
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--dark-muted)',
              maxWidth: '440px',
            }}
          >
            The first conversation is free. Tell us what&rsquo;s slowing your
            team down and we&rsquo;ll show you exactly what to build.
          </p>
        </div>

        {/* Right: CTA */}
        <div
          data-reveal
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-start',
          }}
          className="cta-band-actions"
        >
          <MagneticButton strength={0.22}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--dark-bg)',
                textDecoration: 'none',
                backgroundColor: 'var(--dark-text)',
                padding: '16px 32px',
                whiteSpace: 'nowrap',
                transition: 'background-color 200ms ease, color 200ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = 'var(--accent)';
                el.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = 'var(--dark-text)';
                el.style.color = 'var(--dark-bg)';
              }}
            >
              Start a Conversation
              <ArrowRight size={14} />
            </Link>
          </MagneticButton>

          <Link
            href="/services"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: 'var(--dark-muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: '1px solid var(--dark-border)',
              paddingBottom: '3px',
              transition: 'color 200ms ease, border-color 200ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = 'var(--dark-text)';
              el.style.borderColor = 'var(--dark-muted)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = 'var(--dark-muted)';
              el.style.borderColor = 'var(--dark-border)';
            }}
          >
            Or browse our services first <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <style>{`
        .section-label::before { background-color: var(--accent); }

        @media (max-width: 768px) {
          .cta-band-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cta-band-actions { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
