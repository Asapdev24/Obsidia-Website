'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
      }}
    >
      {/* Main footer body */}
      <div
        className="footer-body"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 32px 60px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '64px',
        }}
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="footer-brand"
            style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--dark-text)',
              textDecoration: 'none',
              display: 'block',
              lineHeight: 1,
              marginBottom: '16px',
            }}
          >
            Obsidia
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '14px',
              lineHeight: 1.75,
              color: 'var(--muted)',
              maxWidth: '260px',
            }}
          >
            {t('tagline')}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="footer-col-label">{t('colCompany')}</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: t('linkServices'),  href: '/services'  },
              { label: t('linkApproach'),  href: '/approach'  },
              { label: t('linkContact'),   href: '/contact'   },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="footer-col-label">{t('colServices')}</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: t('linkAutomation'), href: '/services/automation' },
              { label: t('linkWebsites'),   href: '/services/websites'   },
              { label: t('linkApps'),       href: '/services/apps'       },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <p className="footer-col-label">{t('colContact')}</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a
                href="https://linkedin.com"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('linkLinkedIn')}
              </a>
            </li>
            <li>
              <a href="mailto:sales@obsidia.space" className="footer-link">
                sales@obsidia.space
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="footer-bar"
        style={{
          borderTop: '1px solid var(--dark-border)',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {[
            { label: t('privacy'), href: '/privacy' },
            { label: t('terms'),   href: '/terms'   },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="footer-legal-link">
              {label}
            </Link>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            color: 'var(--muted)',
            letterSpacing: '0.04em',
          }}
        >
          {t('rights', { year })}
        </p>
      </div>

      <style>{`
        .footer-col-label {
          font-family: var(--font-body), sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .footer-link {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-link:hover { color: var(--dark-text); }
        .footer-legal-link {
          font-family: var(--font-body), sans-serif;
          font-size: 11px;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 200ms ease;
        }
        .footer-legal-link:hover { color: var(--dark-text); }
        @media (max-width: 1024px) {
          .footer-body { grid-template-columns: 2fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-body { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
