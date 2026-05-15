'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import BorderGlow from './ui/BorderGlow';
import LanguageSwitcher from './LanguageSwitcher';


/* ── Service item type ─────────────────────────────────────── */
const SERVICE_ITEMS_STATIC = [
  { href: '/services/automation' },
  { href: '/services/websites'   },
  { href: '/services/apps'       },
] as const;

type ServiceItem = { label: string; href: string; tag: string; desc: string };

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
  item: ServiceItem;
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
        borderRight: showDivider ? '1px solid var(--dark-border)' : 'none',
        backgroundColor: isActive
          ? 'rgba(61,82,230,0.08)'
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
        color: isActive || hovered ? 'var(--dark-text)' : 'rgba(220,225,248,0.45)',
        transition: 'color 160ms ease',
      }}>
        {item.label}
      </span>

      <span style={{
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'rgba(220,225,248,0.32)',
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
        color: hovered || isActive ? 'var(--accent)' : 'rgba(220,225,248,0.22)',
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
function ServicesDropdown({ open, pathname, items, viewAll, tagline, onFocusIn, onFocusOut }: {
  open: boolean;
  pathname: string;
  items: ServiceItem[];
  viewAll: string;
  tagline: string;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
}) {
  return (
    <div
      role="menu"
      aria-hidden={!open}
      onFocus={() => { if (onFocusIn) onFocusIn(); }}
      onBlur={(e) => { if (onFocusOut && !e.currentTarget.contains(e.relatedTarget as Node)) onFocusOut(); }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        left: '50%',
        transform: `translateX(-50%) translateY(${open ? '0px' : '-6px'})`,
        width: '648px',
        backgroundColor: 'var(--dark-bg)',
        border: '1px solid var(--dark-border)',
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
        {items.map((item, i) => (
          <ServiceDropdownItem
            key={item.href}
            item={item}
            isActive={pathname.startsWith(item.href)}
            showDivider={i < items.length - 1}
          />
        ))}
      </div>

      <div style={{
        borderTop: '1px solid var(--dark-border)',
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
            color: 'var(--muted)',
            textDecoration: 'none',
            transition: 'color 160ms ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dark-text)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
        >
          {viewAll} <ArrowRight size={11} />
        </Link>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '9px',
          letterSpacing: '0.14em',
          color: 'rgba(220,225,248,0.18)',
          textTransform: 'uppercase',
        }}>
          {tagline}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services nav trigger — wraps the button + dropdown
───────────────────────────────────────────────────────────── */
function ServicesNavItem({
  pathname, textColor, label, items, viewAll, tagline,
}: {
  pathname: string;
  textColor: string;
  label: string;
  items: ServiceItem[];
  viewAll: string;
  tagline: string;
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
        onFocus={() => openMenu()}
        onBlur={() => closeMenu()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open ? closeMenu() : openMenu(); }
          else if (e.key === 'Escape') { closeMenu(); }
        }}
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
        {label}
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

      <ServicesDropdown
        open={open}
        pathname={pathname}
        items={items}
        viewAll={viewAll}
        tagline={tagline}
        onFocusIn={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
        onFocusOut={closeMenu}
      />
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
  serviceItems,
  allServicesLabel,
  startProjectLabel,
  companyLabel,
  youAreHereLabel,
}: {
  open: boolean;
  pathname: string;
  links: { label: string; href: string }[];
  serviceItems: ServiceItem[];
  allServicesLabel: string;
  startProjectLabel: string;
  companyLabel: string;
  youAreHereLabel: string;
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
                      color: anyServiceActive ? 'var(--accent)' : 'rgba(220,225,248,0.55)',
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
                    display: 'grid',
                    gridTemplateRows: servicesOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 380ms cubic-bezier(0.22,1,0.36,1)',
                    borderBottom: servicesOpen ? '1px solid #1A1A18' : 'none',
                  }}>
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
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
                        color: pathname === '/services' ? 'var(--accent)' : 'rgba(220,225,248,0.45)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--dark-border)',
                        transition: 'color 160ms ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dark-text)'; }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          pathname === '/services' ? 'var(--accent)' : 'rgba(220,225,248,0.45)';
                      }}
                    >
                      <span style={{ width: '1px', height: '14px', backgroundColor: '#2A2A28', flexShrink: 0 }} />
                      {allServicesLabel}
                      <ArrowRight size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </Link>

                    {serviceItems.map((item, j) => {
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
                            color: subActive ? 'var(--dark-text)' : 'rgba(220,225,248,0.45)',
                            textDecoration: 'none',
                            borderBottom: j < serviceItems.length - 1 ? '1px solid var(--dark-border)' : 'none',
                            transition: 'color 160ms ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.55)';
                          }}
                          onMouseLeave={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.45)';
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
                  color: isActive ? 'var(--accent)' : 'rgba(220,225,248,0.55)',
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
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--dark-text)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.55)';
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
              {startProjectLabel} <ArrowUpRight size={11} />
            </Link>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#2A2A28',
            }}>
              {companyLabel}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#2A2A28', marginBottom: '4px',
            }}>
              {youAreHereLabel}
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
   Main navigation component
───────────────────────────────────────────────────────────── */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  const serviceItems: ServiceItem[] = [
    { label: t('automationLabel'), href: '/services/automation', tag: t('automationTag'), desc: t('automationDesc') },
    { label: t('websitesLabel'),   href: '/services/websites',   tag: t('websitesTag'),   desc: t('websitesDesc')   },
    { label: t('appsLabel'),       href: '/services/apps',       tag: t('appsTag'),       desc: t('appsDesc')       },
  ];

  const NAV_LINKS = [
    { label: t('home'),     href: '/'         },
    { label: t('services'), href: '/services' },
    { label: t('approach'), href: '/approach' },
    { label: t('contact'),  href: '/contact'  },
  ];

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
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

  const linkColor = 'rgba(220,225,248,0.6)';

  return (
    <>
      {/* ── Reading progress bar ── */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          height: '2px', width: '100%',
          backgroundColor: 'var(--accent)',
          zIndex: 200,
          opacity: scrolled ? 1 : 0,
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left center',
          transition: 'transform 80ms linear, opacity 300ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Header shell — transparent, only for positioning ── */}
      <header
        data-main-nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '10px 20px' : '16px 20px',
          pointerEvents: 'none',
          transition: 'none',
        }}
      >
        {/* ── Floating dark pill ── */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            pointerEvents: 'auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '58px' : '66px',
            backgroundColor: scrolled ? 'rgba(6,8,15,0.72)' : 'rgba(6,8,15,0.42)',
            backdropFilter: 'blur(32px) saturate(2.2)',
            WebkitBackdropFilter: 'blur(32px) saturate(2.2)',
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: '16px',
            padding: '0 28px',
            boxShadow: scrolled
              ? '0 8px 48px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset'
              : '0 4px 24px rgba(0,0,0,0.3)',
            transition: 'background-color 400ms ease, border-color 400ms ease, box-shadow 400ms ease',
          }}
        >
          {/* ── Wordmark ── */}
          <Link
            href="/"
            aria-label="Obsidia home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          >
            <LogoMark light={true} />
            <span style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: '20px', fontWeight: 600,
              letterSpacing: '-0.02em', lineHeight: 1,
              color: 'var(--dark-text)',
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
              if (href === '/services') {
                return (
                  <ServicesNavItem
                    key={href}
                    pathname={pathname}
                    textColor={linkColor}
                    label={label}
                    items={serviceItems}
                    viewAll={t('viewAllServices')}
                    tagline={t('tagline')}
                  />
                );
              }
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return <NavLink key={href} href={href} label={label} active={isActive} textColor={linkColor} />;
            })}
          </nav>

          {/* ── Right side: lang switcher + CTA + mobile toggle ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div className="nav-desktop" style={{ flexShrink: 0 }}>
              <LanguageSwitcher />
            </div>
            <div className="nav-desktop" style={{ flexShrink: 0 }}>
              <BorderGlow
                backgroundColor="#3D52E6"
                borderRadius={8}
                glowColor="220 100 80"
                glowRadius={14}
                glowIntensity={2.4}
                colors={['#3D52E6', '#8860E6', '#60A5FA']}
                edgeSensitivity={65}
                coneSpread={28}
                fillOpacity={0}
              >
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: '#FFFFFF', textDecoration: 'none',
                    padding: '10px 22px',
                    transition: 'gap 200ms ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '7px'; }}
                >
                  {t('startProject')} <ArrowUpRight size={11} />
                </Link>
              </BorderGlow>
            </div>

            <button
              aria-label={menuOpen ? t('closeNav') : t('openNav')}
              onClick={() => setMenuOpen((v) => !v)}
              className="nav-mobile-toggle"
              style={{
                background: 'none', border: 'none', padding: '8px',
                cursor: 'pointer', display: 'none',
                color: 'var(--dark-text)',
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        links={NAV_LINKS}
        serviceItems={serviceItems}
        allServicesLabel={t('viewAllServices')}
        startProjectLabel={t('startProject')}
        companyLabel={t('company')}
        youAreHereLabel={t('youAreHere')}
      />

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
