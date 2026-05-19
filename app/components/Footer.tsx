'use client';

import Link from 'next/link';

export default function Footer() {
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
              display: 'inline-block',
              marginBottom: '16px',
              textDecoration: 'none',
            }}
          >
            <img
              src="/logos/obsidia_web_black_logo.png"
              alt="Obsidia"
              style={{ height: '96px', width: 'auto', display: 'block' }}
            />
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
            Workflow automations, websites, and applications. Built to spec, built to outlast the engagement.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <Link href="/approach" className="footer-col-label footer-col-link" style={{ textAlign: 'left' }}>Company</Link>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Services',  href: '/services'  },
              { label: 'Approach',  href: '/approach'  },
              { label: 'Contact',   href: '/contact'   },
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
          <Link href="/services" className="footer-col-label footer-col-link" style={{ textAlign: 'left' }}>Services</Link>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Workflow Automation',    href: '/services/automation' },
              { label: 'Website Development',    href: '/services/websites'   },
              { label: 'Application Development',href: '/services/apps'       },
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
          <Link href="/contact" className="footer-col-label footer-col-link" style={{ textAlign: 'left' }}>Contact Us</Link>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a
                href="https://www.linkedin.com/company/obsidia-space/"
                className="footer-link footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                  <path d="M8 11l0 5" />
                  <path d="M8 8l0 .01" />
                  <path d="M12 16l0 -5" />
                  <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/obsidiaspace/"
                className="footer-link footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  <path d="M16.5 7.5l0 .01" />
                </svg>
                Instagram
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
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms',          href: '/terms'   },
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
          {`© ${year} Obsidia. All rights reserved.`}
        </p>
      </div>

      <style>{`
        .footer-col-label {
          display: block;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
          text-align: center;
        }
        a.footer-col-label {
          text-decoration: none;
          transition: opacity 200ms ease;
        }
        a.footer-col-label:hover { opacity: 0.72; }
        .footer-link {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-link:hover { color: var(--dark-text); }
        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
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
