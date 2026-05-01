'use client';

import Link from 'next/link';

const NAV_COLS = [
  {
    label: 'Company',
    links: [
      { label: 'Services',  href: '/services'  },
      { label: 'Approach',  href: '/approach'  },
      { label: 'About',     href: '/about'     },
      { label: 'Contact',   href: '/contact'   },
    ],
  },
  {
    label: 'Services',
    links: [
      { label: 'Workflow Automation',      href: '/services/automation' },
      { label: 'Website Development',      href: '/services/websites'   },
      { label: 'Application Development',  href: '/services/apps'       },
    ],
  },
  {
    label: 'Connect',
    links: [
      { label: 'Start a Project',  href: '/contact'             },
      { label: 'LinkedIn',         href: 'https://linkedin.com' },
    ],
  },
];

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
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 32px 60px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '48px',
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: '26px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--dark-text)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '20px',
              lineHeight: 1,
            }}
          >
            Obsidia
          </Link>

          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '13px',
              lineHeight: 1.75,
              color: 'var(--dark-muted)',
              marginBottom: '28px',
            }}
          >
            Automations, websites, and applications — built for businesses serious about how they operate.
          </p>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map(({ label, links }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '20px',
              }}
            >
              {label}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {links.map(({ label: linkLabel, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '13px',
                      color: 'var(--dark-muted)',
                      textDecoration: 'none',
                      transition: 'color 200ms ease',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--dark-text)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--dark-muted)'; }}
                  >
                    {linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer bottom bar */}
      <div
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
        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            color: 'var(--dark-muted)',
            letterSpacing: '0.04em',
          }}
        >
          © {year} Obsidia. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            color: 'var(--dark-muted)',
            letterSpacing: '0.04em',
          }}
        >
          Three services. One partner.
        </p>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
