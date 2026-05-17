'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface SectionInfo {
  id: string;
  label: string;
  element: HTMLElement;
}

function SideNavItem({
  section,
  isActive,
  isLast,
  onClick,
  navHovered,
}: {
  section: SectionInfo;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
  navHovered: boolean;
}) {
  const [itemHovered, setItemHovered] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {/* Label + dot */}
      <div
        style={{
          display: 'flex', alignItems: 'center', height: '14px',
        }}
        onMouseEnter={() => setItemHovered(true)}
        onMouseLeave={() => setItemHovered(false)}
      >
        {/* Label — grid 0fr→1fr reveal so text clips smoothly */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: navHovered ? '1fr' : '0fr',
          transition: 'grid-template-columns 280ms cubic-bezier(0.22,1,0.36,1)',
          overflow: 'hidden',
          paddingRight: navHovered ? '8px' : '0px',
        }}>
          <button
            onClick={onClick}
            style={{
              overflow: 'hidden',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isActive ? '#FFFFFF' : itemHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              whiteSpace: 'nowrap',
              opacity: navHovered ? 1 : 0,
              transition: 'opacity 200ms ease 60ms, color 180ms ease',
              userSelect: 'none',
              pointerEvents: navHovered ? 'auto' : 'none',
            }}
          >
            {section.label}
          </button>
        </div>

        {/* Dot */}
        <button
          onClick={onClick}
          aria-label={`Go to ${section.label}`}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            flexShrink: 0,
            border: isActive
              ? '1px solid rgba(61,82,230,0.9)'
              : `1px solid ${itemHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)'}`,
            backgroundColor: isActive ? 'var(--accent)' : 'transparent',
            boxShadow: isActive
              ? '0 0 0 2.5px rgba(255,255,255,0.7), 0 0 0 4px rgba(0,0,0,0.15), 0 0 9px rgba(61,82,230,0.6)'
              : itemHovered
                ? '0 0 0 2px rgba(255,255,255,0.5), 0 0 0 3.5px rgba(0,0,0,0.12)'
                : '0 0 0 2px rgba(255,255,255,0.3), 0 0 0 3.5px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            padding: 0,
            transform: isActive ? 'scale(1.33)' : itemHovered ? 'scale(1.16)' : 'scale(1)',
            transition: 'transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          }}
        />
      </div>

      {/* Connector line — dual shadow for any-background visibility */}
      {!isLast && (
        <div
          style={{
            width: '1px',
            height: '16px',
            marginRight: '2.5px',
            background: 'rgba(255,255,255,0.22)',
            boxShadow: '1px 0 0 rgba(0,0,0,0.12)',
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}

export default function SideNav() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [navHovered, setNavHovered] = useState(false);
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const discoverSections = useCallback(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-section-label][id]');
    const discovered: SectionInfo[] = [];
    elements.forEach(el => {
      if (el.id && el.dataset.sectionLabel) {
        discovered.push({ id: el.id, label: el.dataset.sectionLabel, element: el });
      }
    });
    setSections(discovered);
    return discovered;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const discovered = discoverSections();
      if (discovered.length === 0) return;

      if (observerRef.current) observerRef.current.disconnect();

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter(e => e.isIntersecting);
          if (visible.length > 0) {
            const sorted = visible.sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );
            setActiveId(sorted[0].target.id);
          }
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );

      discovered.forEach(({ element }) => observer.observe(element));
      observerRef.current = observer;
      setActiveId(discovered[0]?.id ?? '');
    }, 150);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [pathname, discoverSections]);

  if (sections.length < 2) return null;

  const scrollToSection = (element: HTMLElement) => {
    const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        aria-label="Page sections"
        className="sidenav-root"
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        onFocus={() => setNavHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setNavHovered(false);
          }
        }}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '24px',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '12px 10px',
          background: navHovered
            ? 'rgba(8,9,14,0.75)'
            : 'rgba(8,9,14,0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: navHovered
            ? '1px solid rgba(255,255,255,0.10)'
            : '1px solid rgba(255,255,255,0.02)',
          borderRadius: '16px',
          gap: '0',
          // explicit padding transition so the pill visibly grows when opening
          paddingLeft: navHovered ? '14px' : '10px',
          paddingRight: '10px',
          paddingTop: '12px',
          paddingBottom: '12px',
          transition: 'background 280ms ease, border-color 280ms ease',
        }}
      >
        {sections.map((section, i) => (
          <SideNavItem
            key={section.id}
            section={section}
            isActive={activeId === section.id}
            isLast={i === sections.length - 1}
            onClick={() => scrollToSection(section.element)}
            navHovered={navHovered}
          />
        ))}
      </nav>

      <style>{`
        @media (max-width: 1024px) {
          .sidenav-root { display: none !important; }
        }
      `}</style>
    </>
  );
}
