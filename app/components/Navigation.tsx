'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        fontWeight: active ? 700 : 500,
        letterSpacing: '0.04em',
        color: active ? 'var(--accent)' : textColor,
        textDecoration: 'none',
        padding: '8px 12px',
        opacity: active || hovered ? 1 : 0.78,
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
   Right-panel preview — one per service, crossfades on hover
───────────────────────────────────────────────────────────── */
const EASE_NAV = 'cubic-bezier(0.22,1,0.36,1)';

function DefaultPreviewPanel() {
  const [exploreHov, setExploreHov] = useState(false);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      padding: '32px 32px 26px',
      display: 'flex', flexDirection: 'column',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', display: 'block', marginBottom: '14px',
      }}>
        All Services
      </span>

      <h3 style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: '32px', fontWeight: 500,
        letterSpacing: '-0.02em', lineHeight: 1.05,
        color: 'var(--dark-text)', marginBottom: '14px',
      }}>
        Three disciplines.<br />One studio.
      </h3>

      <Link
        href="/services"
        onMouseEnter={() => setExploreHov(true)}
        onMouseLeave={() => setExploreHov(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
          color: exploreHov ? 'var(--accent)' : 'rgba(220,225,248,0.30)',
          textDecoration: 'none',
          transition: `color 200ms ${EASE_NAV}`,
          alignSelf: 'flex-start',
          marginTop: 'auto',
        }}
      >
        Explore all services
        <ArrowRight
          size={10}
          style={{
            transform: exploreHov ? 'translateX(4px)' : 'translateX(0)',
            transition: `transform 200ms ${EASE_NAV}`,
          }}
        />
      </Link>
    </div>
  );
}

function PreviewPanel({ item, active }: { item: ServiceItem; active: boolean }) {
  const [exploreHov, setExploreHov] = useState(false);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '32px 32px 26px',
        opacity: active ? 1 : 0,
        transition: `opacity 200ms ease`,
        pointerEvents: active ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', display: 'block', marginBottom: '14px',
      }}>
        {item.tag}
      </span>

      <h3 style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: '32px', fontWeight: 500,
        letterSpacing: '-0.02em', lineHeight: 1.05,
        color: 'var(--dark-text)', marginBottom: '14px',
      }}>
        {item.label}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '13px', lineHeight: 1.7,
        color: 'rgba(220,225,248,0.66)',
        flex: 1, marginBottom: '22px',
      }}>
        {item.desc}
      </p>

      <Link
        href={item.href}
        onMouseEnter={() => setExploreHov(true)}
        onMouseLeave={() => setExploreHov(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
          color: exploreHov ? 'var(--accent)' : 'rgba(220,225,248,0.30)',
          textDecoration: 'none',
          transition: `color 200ms ${EASE_NAV}`,
          alignSelf: 'flex-start',
        }}
      >
        Explore
        <ArrowRight
          size={10}
          style={{
            transform: exploreHov ? 'translateX(4px)' : 'translateX(0)',
            transition: `transform 200ms ${EASE_NAV}`,
          }}
        />
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services dropdown panel (desktop) — list + preview
───────────────────────────────────────────────────────────── */

function ServicesDropdown({ pathname, items, viewAll, onMouseEnter, onMouseLeave, onFocusIn, onFocusOut }: {
  pathname: string;
  items: ServiceItem[];
  viewAll: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [viewAllHov, setViewAllHov] = useState(false);
  const isExactServices = pathname === '/services';

  return (
    <div style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
    <motion.div
      role="navigation"
      aria-label="Services"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={() => onFocusIn?.()}
      onBlur={(e) => { if (onFocusOut && !e.currentTarget.contains(e.relatedTarget as Node)) onFocusOut(); }}
      initial={{ opacity: 0, y: -14, scaleY: 0.94 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -10, scaleY: 0.96 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transformOrigin: 'top center',
        width: '700px',
        backgroundColor: 'var(--dark-bg)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: `2px solid var(--accent)`,
        boxShadow: '0 28px 72px rgba(0,0,0,0.72), 0 1px 0 rgba(255,255,255,0.025) inset',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
      }}
    >
      {/* ── Left: service list ── */}
      <div style={{ borderRight: '1px solid rgba(255,255,255,0.09)', padding: '8px 0' }}>
        {/* View all — top of list */}
        <Link
          href="/services"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 20px',
            marginBottom: '4px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: viewAllHov ? 'var(--dark-text)' : isExactServices ? 'rgba(220,225,248,0.90)' : 'rgba(220,225,248,0.62)',
            textDecoration: 'none',
            boxShadow: isExactServices ? 'inset 2px 0 0 rgba(61,82,230,0.52)' : 'none',
            transition: `color 200ms ${EASE_NAV}, box-shadow 200ms ease`,
          }}
          onMouseEnter={() => { setViewAllHov(true); setHoveredIdx(null); }}
          onMouseLeave={() => setViewAllHov(false)}
        >
          {viewAll}
          {isExactServices && !viewAllHov && (
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0, marginLeft: '2px' }} />
          )}
          {!isExactServices && <ArrowRight size={9} />}
          {isExactServices && viewAllHov && <ArrowRight size={9} />}
        </Link>

        {items.map((item, i) => {
          const isHov    = hoveredIdx === i;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIdx(i)}
              style={{
                display: 'block',
                padding: '10px 20px',
                backgroundColor: isHov
                  ? 'rgba(136,96,230,0.10)'
                  : isActive ? 'rgba(61,82,230,0.07)' : 'transparent',
                boxShadow: isActive ? 'inset 2px 0 0 rgba(61,82,230,0.52)' : 'none',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: `background-color 380ms ${EASE_NAV}, box-shadow 240ms ease`,
              }}
            >
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: isHov ? 'var(--accent)' : isActive ? 'rgba(61,82,230,0.70)' : 'rgba(61,82,230,0.38)',
                marginBottom: '5px',
                transition: `color 360ms ${EASE_NAV}`,
              }}>
                {item.tag}
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '20px', fontWeight: 500,
                letterSpacing: '-0.01em', lineHeight: 1.1,
                color: isHov ? '#FFFFFF' : isActive ? 'rgba(220,225,248,0.80)' : 'rgba(220,225,248,0.42)',
                transition: `color 360ms ${EASE_NAV}`,
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ── Right: preview panel — sequential crossfade on service switch ── */}
      <div style={{ position: 'relative', minHeight: '200px', backgroundColor: 'rgba(255,255,255,0.022)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={hoveredIdx ?? 'default'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {hoveredIdx === null
              ? <DefaultPreviewPanel />
              : <PreviewPanel item={items[hoveredIdx]} active={true} />
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services nav trigger — wraps the button + dropdown
───────────────────────────────────────────────────────────── */
function ServicesNavItem({
  pathname, textColor, label, items, viewAll,
}: {
  pathname: string;
  textColor: string;
  label: string;
  items: ServiceItem[];
  viewAll: string;
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
    <div style={{ position: 'relative', alignSelf: 'center' }}>
      <Link
        href="/services"
        aria-expanded={open}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        onFocus={openMenu}
        onBlur={closeMenu}
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
          cursor: 'pointer',
          padding: '8px 12px',
          opacity: isActive || hovered ? 1 : 0.78,
          transition: 'color 200ms ease, opacity 200ms ease',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
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
      </Link>

      <AnimatePresence>
        {open && (
          <ServicesDropdown
            pathname={pathname}
            items={items}
            viewAll={viewAll}
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
            onMouseLeave={closeMenu}
            onFocusIn={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
            onFocusOut={closeMenu}
          />
        )}
      </AnimatePresence>
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
  const [isDarkSection, setIsDarkSection] = useState(true);
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

  const detectNavTheme = useCallback(() => {
    const elements = document.elementsFromPoint(window.innerWidth / 2, 50) as Element[];
    const section = elements.find(el => el.hasAttribute('data-nav-theme'));
    const theme = section?.getAttribute('data-nav-theme') ?? 'dark';
    setIsDarkSection(theme === 'dark');
  }, []);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
      detectNavTheme();
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, [detectNavTheme]);

  useEffect(() => {
    const t = setTimeout(detectNavTheme, 120);
    return () => clearTimeout(t);
  }, [pathname, detectNavTheme]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkColor = '#ffffff';

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
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
          >
            <div style={{ position: 'relative', height: '64px', width: '280px' }}>
              <img
                src="/logos/obsidia_web_black_logo.png"
                alt="Obsidia"
                style={{
                  position: 'absolute', inset: 0,
                  height: '100%', width: '100%',
                  objectFit: 'contain', objectPosition: 'left center',
                }}
              />
            </div>
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
