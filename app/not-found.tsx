import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <section
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--dark-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '120px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--dark-surface) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '640px',
          height: '640px',
          background: 'radial-gradient(circle, rgba(61,82,230,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Large background number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-24px',
          bottom: '-40px',
          fontFamily: 'var(--font-heading), Georgia, serif',
          fontSize: 'clamp(240px, 28vw, 420px)',
          fontWeight: 600,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(220,225,245,0.07)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        404
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            opacity: 0.7,
            display: 'block',
            marginBottom: '28px',
          }}
        >
          {t('label')}
        </span>

        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(42px, 5.5vw, 72px)',
            fontWeight: 500,
            letterSpacing: '-0.035em',
            lineHeight: 1.04,
            color: 'var(--dark-text)',
            marginBottom: '24px',
          }}
        >
          {t('headline1')}
          <br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{t('headlineAccent')}</em>
        </h1>

        <p
          className="font-body"
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(220,225,248,0.62)',
            maxWidth: '400px',
            marginBottom: '48px',
          }}
        >
          {t('body')}
        </p>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textDecoration: 'none',
              backgroundColor: 'var(--accent)',
              padding: '14px 28px',
            }}
          >
            {t('backHome')} <ArrowRight size={13} />
          </Link>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(220,225,248,0.66)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              paddingBottom: '3px',
            }}
          >
            {t('startProject')} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
