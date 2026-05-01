'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';

/* ── Service sub-pages ─────────────────────────────────────── */
const SERVICE_ITEMS = [
  {
    label: 'Workflow Automation',
    href: '/services/automation',
    tag: 'Automation',
    desc: 'Eliminate manual tasks. Build workflows that run themselves.',
  },
  {
    label: 'Website Development',
    href: '/services/websites',
    tag: 'Web',
    desc: 'Sites that convert visitors, load fast, work on every device.',
  },
  {
    label: 'Application Development',
    href: '/services/apps',
    tag: 'Apps',
    desc: 'Custom tools built for exactly how your team operates.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Logo mark — two stacked cobalt bars (flow symbol)
───────────────────────────────────────────────────────────── */
function LogoMark({ light }: { light: boolean }) {
  return (
    <svg
      width="10"
      height="22"
      viewBox="0 0 10 22"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <rect width="10" height="10" fill="var(--accent)" />
      <rect y="14" width="10" height="8" fill={light ? 'rgba(61,82,230,0.45)' : 'rgba(61,82,230,0.35)'} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated hamburger icon (3 lines → X)
───────────────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  const base: React.CSSProperties = {
    display: 'block',
    width: '20px',
    height: '1.5px',
    backgroundColor: 'currentColor',
    transition: 'transform 320ms cubic-bezier(0.76,0,0.24,1), opacity 200ms ease',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '20px' }}>
      <span style={{ ...base, transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
      <span style={{ ...base, opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
      <span style={{ ...base, transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Nav link with opacity-based hover + slide underline
───────────────────────────────────────────────────────────── */
function NavLink({
  href, label, active, textColor,
}: {
  href: string; label: string; active: boolean; textColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [everHovered, setEverHovered] = useState(false);
  const lit = active || hovered;

  return (
    <Link
      href={href}
      onMouseEnter={() => { setHovered(true); setEverHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.04em',
        color: active ? 'var(--accent)' : textColor,
        textDecoration: 'none',
        padding: '8px 12px',
        opacity: !active && hovered ? 0.7 : 1,
        transition: 'color 200ms ease, opacity 200ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {active && (
        <span style={{
          width: '4px', height: '4px', borderRadius: '50%',
          backgroundColor: 'var(--accent)', flexShrink: 0,
        }} />
      )}
      {label}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '4px',
          left: '12px',
          right: active ? '8px' : '12px',
          height: '1px',
          backgroundColor: 'var(--accent)',
          transform: lit ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: lit ? 'left center' : (everHovered ? 'right center' : 'left center'),
          transition: 'transform 260ms cubic-bezier(0.76,0,0.24,1)',
        }}
      />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single column in the Services dropdown
───────────────────────────────────────────────────────────── */
function ServiceDropdownItem({
  item, isActive, showDivider,
}: {
  item: typeof SERVICE_ITEMS[0];
  isActive: boolean;
  showDivider: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '22px 20px 18px',
        textDecoration: 'none',
        borderRight: showDivider ? '1px solid #1C1C1A' : 'none',
        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
        backgroundColor: isActive
          ? 'rgba(61,82,230,0.04)'
          : hovered
            ? 'rgba(255,255,255,0.028)'
            : 'transparent',
        transition: 'background-color 160ms ease',
        gap: '7px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '9px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: isActive ? 'var(--accent)' : '#383836',
        transition: 'color 160ms ease',
      }}>
        {item.tag}
      </span>

      <span style={{
        fontFamily: 'var(--font-heading), Georgia, serif',
        fontSize: '19px',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        color: isActive || hovered ? '#F0EFE9' : '#585856',
        transition: 'color 160ms ease',
      }}>
        {item.label}
      </span>

      <span style={{
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '12px',
        lineHeight: 1.6,
        color: '#333331',
        flexGrow: 1,
        marginTop: '2px',
      }}>
        {item.desc}
      </span>

      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '10px',
        letterSpacing: '0.08em',
        color: hovered || isActive ? 'var(--accent)' : '#2A2A28',
        transition: 'color 160ms ease, gap 160ms ease',
        marginTop: '6px',
      }}>
        Explore <ArrowRight size={9} />
      </span>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services dropdown panel (desktop)
───────────────────────────────────────────────────────────── */
function ServicesDropdown({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <div
      role="menu"
      aria-hidden={!open}
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        left: '50%',
        transform: `translateX(-50%) translateY(${open ? '0px' : '-6px'})`,
        width: '648px',
        backgroundColor: '#0C0C0A',
        border: '1px solid #1C1C1A',
        borderTop: '2px solid var(--accent)',
        boxShadow: '0 28px 72px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.025) inset',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 190ms ease, transform 190ms cubic-bezier(0.22,1,0.36,1)',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {SERVICE_ITEMS.map((item, i) => (
          <ServiceDropdownItem
            key={item.href}
            item={item}
            isActive={pathname.startsWith(item.href)}
            showDivider={i < SERVICE_ITEMS.length - 1}
          />
        ))}
      </div>

      <div style={{
        borderTop: '1px solid #1C1C1A',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '11px 20px',
        backgroundColor: 'rgba(255,255,255,0.012)',
      }}>
        <Link
          href="/services"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: '#6A6A68',
            textDecoration: 'none',
            transition: 'color 160ms ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F0EFE9'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6A6A68'; }}
        >
          View all services <ArrowRight size={11} />
        </Link>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '9px',
          letterSpacing: '0.14em',
          color: '#282826',
          textTransform: 'uppercase',
        }}>
          Three disciplines. One partner.
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services nav trigger — wraps the button + dropdown
───────────────────────────────────────────────────────────── */
function ServicesNavItem({
  pathname, textColor,
}: {
  pathname: string;
  textColor: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = pathname.startsWith('/services');
  const [hovered, setHovered] = useState(false);
  const lit = isActive || open;

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
    setHovered(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => { setOpen(false); setHovered(false); }, 130);
  };

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: isActive ? 'var(--accent)' : textColor,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 12px',
          opacity: !isActive && hovered ? 0.7 : 1,
          transition: 'color 200ms ease, opacity 200ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        {isActive && (
          <span style={{
            width: '4px', height: '4px', borderRadius: '50%',
            backgroundColor: 'var(--accent)', flexShrink: 0,
          }} />
        )}
        Services
        <ChevronDown
          size={11}
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1)',
            opacity: 0.65,
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '4px',
            left: '12px',
            right: isActive ? '8px' : '12px',
            height: '1px',
            backgroundColor: 'var(--accent)',
            transform: lit ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 260ms cubic-bezier(0.76,0,0.24,1)',
          }}
        />
      </button>

      <ServicesDropdown open={open} pathname={pathname} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile full-screen menu
───────────────────────────────────────────────────────────── */
function MobileMenu({
  open,
  pathname,
  links,
}: {
  open: boolean;
  pathname: string;
  links: { label: string; href: string }[];
}) {
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => { if (!open) setServicesOpen(false); }, [open]);

  const currentPage = links.find((l) =>
    l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
  )?.label ?? 'Home';

  return (
    <div
      aria-hidden={!open}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        backgroundColor: '#0D0D0D',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 440ms cubic-bezier(0.76,0,0.24,1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #1A1A18 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        opacity: 0.7, pointerEvents: 'none',
      }} />

      <div aria-hidden style={{
        position: 'absolute', top: '-100px', left: '-60px',
        width: '380px', height: '380px',
        background: 'radial-gradient(circle, rgba(61,82,230,0.10) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
        backgroundColor: 'var(--accent)',
        transform: open ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 560ms cubic-bezier(0.76,0,0.24,1) 80ms',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        height: '100%',
        padding: '96px 40px 48px 52px',
        overflowY: 'auto',
      }}>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {links.map(({ label, href }, i) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

            if (label === 'Services') {
              const anyServiceActive = pathname.startsWith('/services');
              return (
                <div key={href}>
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-heading), Georgia, serif',
                      fontSize: 'clamp(34px, 7.5vw, 52px)',
                      fontWeight: 500,
                      letterSpacing: '-0.025em',
                      color: anyServiceActive ? 'var(--accent)' : '#C8C6C0',
                      textDecoration: 'none',
                      borderBottom: servicesOpen ? '1px solid transparent' : '1px solid #1A1A18',
                      padding: '18px 0',
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateX(0)' : 'translateX(28px)',
                      transition: [
                        `opacity 480ms ease ${i * 55 + 60}ms`,
                        `transform 480ms cubic-bezier(0.22,1,0.36,1) ${i * 55 + 60}ms`,
                        'color 180ms ease',
                        'border-color 180ms ease',
                      ].join(', '),
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '10px', fontWeight: 400,
                        color: '#2A2A28', letterSpacing: '0.12em',
                        flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      Services
                    </div>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)',
                        color: anyServiceActive ? 'var(--accent)' : '#4A4A48',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  <div style={{
                    overflow: 'hidden',
                    maxHeight: servicesOpen ? '360px' : '0px',
                    transition: 'max-height 380ms cubic-bezier(0.22,1,0.36,1)',
                    borderBottom: servicesOpen ? '1px solid #1A1A18' : 'none',
                  }}>
                    <Link
                      href="/services"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 0 12px 26px',
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: pathname === '/services' ? 'var(--accent)' : '#5A5A58',
                        textDecoration: 'none',
                        borderBottom: '1px solid #141412',
                        transition: 'color 160ms ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F0EFE9'; }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          pathname === '/services' ? 'var(--accent)' : '#5A5A58';
                      }}
                    >
                      <span style={{ width: '1px', height: '14px', backgroundColor: '#2A2A28', flexShrink: 0 }} />
                      All Services
                      <ArrowRight size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </Link>

                    {SERVICE_ITEMS.map((item, j) => {
                      const subActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 0 14px 26px',
                            fontFamily: 'var(--font-heading), Georgia, serif',
                            fontSize: 'clamp(20px, 4vw, 28px)',
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                            color: subActive ? '#F0EFE9' : '#585856',
                            textDecoration: 'none',
                            borderBottom: j < SERVICE_ITEMS.length - 1 ? '1px solid #141412' : 'none',
                            transition: 'color 160ms ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.color = '#C8C6C0';
                          }}
                          onMouseLeave={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.color = '#585856';
                          }}
                        >
                          <span style={{
                            width: '3px', height: '20px', flexShrink: 0,
                            backgroundColor: subActive ? 'var(--accent)' : '#1E1E1C',
                            transition: 'background-color 160ms ease',
                          }} />
                          <div>
                            <div style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '9px',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: subActive ? 'var(--accent)' : '#2E2E2C',
                              marginBottom: '3px',
                            }}>
                              {item.tag}
                            </div>
                            {item.label}
                          </div>
                          <ArrowUpRight
                            size={14}
                            style={{
                              marginLeft: 'auto',
                              opacity: subActive ? 1 : 0.18,
                              color: subActive ? 'var(--accent)' : 'currentColor',
                              flexShrink: 0,
                            }}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading), Georgia, serif',
                  fontSize: 'clamp(34px, 7.5vw, 52px)',
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  color: isActive ? 'var(--accent)' : '#C8C6C0',
                  textDecoration: 'none',
                  borderBottom: '1px solid #1A1A18',
                  padding: '18px 0',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(28px)',
                  transition: [
                    `opacity 480ms ease ${i * 55 + 60}ms`,
                    `transform 480ms cubic-bezier(0.22,1,0.36,1) ${i * 55 + 60}ms`,
                    'color 180ms ease',
                  ].join(', '),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F0EFE9';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = '#C8C6C0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px', fontWeight: 400,
                    color: '#2A2A28', letterSpacing: '0.12em',
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {label}
                </div>
                <ArrowUpRight
                  size={18}
                  style={{
                    opacity: isActive ? 1 : 0.25,
                    color: isActive ? 'var(--accent)' : 'currentColor',
                    flexShrink: 0,
                  }}
                />
              </Link>
            );
          })}
        </nav>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          paddingTop: '32px',
          borderTop: '1px solid #1A1A18',
          opacity: open ? 1 : 0,
          transition: `opacity 400ms ease ${links.length * 55 + 180}ms`,
        }}>
          <div>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#FFFFFF', textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                padding: '12px 24px',
                marginBottom: '16px',
                transition: 'background-color 200ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
            >
              Start a Project <ArrowUpRight size={11} />
            </Link>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#2A2A28',
            }}>
              An Obsidia Company
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#2A2A28', marginBottom: '4px',
            }}>
              You are here
            </div>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px', color: 'var(--accent)', fontWeight: 500,
              letterSpacing: '0.04em',
            }}>
              {currentPage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Nav links
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Services', href: '/services' },
  { label: 'Approach', href: '/approach' },
  { label: 'Contact',  href: '/contact'  },
];

/* ─────────────────────────────────────────────────────────────
   Main navigation component
───────────────────────────────────────────────────────────── */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light');
  const pathname = usePathname();

  useEffect(() => {
    const detectTheme = () => {
      const navH = 80;
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let theme: 'dark' | 'light' = 'light';
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navH && rect.bottom > navH) {
          theme = (el.dataset.navTheme as 'dark' | 'light') ?? 'light';
        }
      });
      setNavTheme(theme);
    };

    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
      detectTheme();
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isNavDark = navTheme === 'dark' && !scrolled;
  const linkColor     = isNavDark ? 'rgba(240,239,233,0.65)' : 'var(--text-secondary)';
  const logoTextColor = scrolled ? 'var(--text)' : isNavDark ? '#F0EFE9' : 'var(--text)';
  const iconColor     = scrolled ? 'var(--text)' : isNavDark ? '#F0EFE9' : 'var(--text)';

  const navBg     = scrolled ? 'rgba(255,255,255,0.93)' : 'transparent';
  const navBorder = scrolled ? '1px solid var(--border)' : '1px solid transparent';
  const navHeight = scrolled ? '62px' : '76px';

  return (
    <>
      {/* ── Reading progress bar ── */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          height: '2px',
          width: `${progress}%`,
          backgroundColor: 'var(--accent)',
          zIndex: 200,
          opacity: scrolled ? 1 : 0,
          transition: 'width 80ms linear, opacity 300ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Header ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          backgroundColor: navBg,
          backdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
          borderBottom: navBorder,
          transition: 'background-color 400ms ease, border-color 400ms ease',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
            height: navHeight,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'height 400ms ease',
          }}
        >
          {/* ── Wordmark ── */}
          <Link
            href="/"
            aria-label="Obsidia — home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          >
            <LogoMark light={!scrolled && isNavDark} />
            <span style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: '20px', fontWeight: 600,
              letterSpacing: '-0.02em', lineHeight: 1,
              color: logoTextColor,
              transition: 'color 400ms ease',
            }}>
              Obsidia
            </span>
          </Link>

          {/* ── Desktop navigation — centered absolutely ── */}
          <nav
            aria-label="Main navigation"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
            className="nav-desktop"
          >
            {NAV_LINKS.map(({ label, href }) => {
              if (label === 'Services') {
                return (
                  <ServicesNavItem
                    key={href}
                    pathname={pathname}
                    textColor={scrolled ? 'var(--text-secondary)' : linkColor}
                  />
                );
              }
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  active={isActive}
                  textColor={scrolled ? 'var(--text-secondary)' : linkColor}
                />
              );
            })}
          </nav>

          {/* ── Right side: CTA + mobile toggle ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="nav-desktop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#FFFFFF', textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                padding: '12px 24px',
                transition: 'background-color 200ms ease, gap 200ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'var(--accent-hover)';
                el.style.gap = '10px';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'var(--accent)';
                el.style.gap = '7px';
              }}
            >
              Start a Project <ArrowUpRight size={11} />
            </Link>

            {/* Mobile toggle */}
            <button
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((v) => !v)}
              className="nav-mobile-toggle"
              style={{
                background: 'none', border: 'none', padding: '8px',
                cursor: 'pointer', display: 'none',
                color: iconColor,
                transition: 'color 400ms ease',
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <MobileMenu open={menuOpen} pathname={pathname} links={NAV_LINKS} />

      {/* ── Responsive rules ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop        { display: none !important; }
          .nav-mobile-toggle  { display: flex !important; align-items: center !important; }
        }
      `}</style>
    </>
  );
}
