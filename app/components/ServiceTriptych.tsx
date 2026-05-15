'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Panel 1: Automation — animated node graph ──────────────── */
function AutomationPanel({ visible }: { visible: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setTick(t => t + 1), 1600);
    return () => clearInterval(id);
  }, [visible]);

  const activeEdge = tick % 3;

  const nodes = [
    { id: 0, cx: 48,  cy: 80,  label: 'Trigger' },
    { id: 1, cx: 140, cy: 40,  label: 'Filter'  },
    { id: 2, cx: 140, cy: 120, label: 'Route'   },
    { id: 3, cx: 232, cy: 80,  label: 'Action'  },
  ];

  const edges = [
    { from: 0, to: 1, id: 'e01' },
    { from: 0, to: 2, id: 'e02' },
    { from: 1, to: 3, id: 'e13' },
    { from: 2, to: 3, id: 'e23' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 20px 20px' }}>
      {/* Label */}
      <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3A3A38' }}>
        Automation
      </div>

      {/* SVG graph */}
      <svg viewBox="0 0 280 160" style={{ width: '100%', flex: 1 }} aria-hidden>
        <defs>
          <marker id="arr-a" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0 0 L5 2.5 L0 5Z" fill="var(--accent)" opacity="0.7" />
          </marker>
          <marker id="arr-p" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0 0 L5 2.5 L0 5Z" fill="#2A2A28" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const from = nodes[e.from];
          const to   = nodes[e.to];
          const mid  = { x: (from.cx + to.cx) / 2, y: (from.cy + to.cy) / 2 };
          const d    = `M ${from.cx + 14},${from.cy} Q ${mid.x},${mid.y} ${to.cx - 14},${to.cy}`;
          const isActive = i === activeEdge;
          return (
            <g key={e.id}>
              <path d={d} fill="none" stroke={isActive ? 'var(--accent)' : '#2A2A28'}
                strokeWidth={isActive ? 1.2 : 0.8} opacity={isActive ? 0.8 : 0.5}
                markerEnd={isActive ? 'url(#arr-a)' : 'url(#arr-p)'} />
              {isActive && (
                <circle r="2.5" fill="var(--accent)" opacity="0.9">
                  <animateMotion dur="1.4s" repeatCount="indefinite">
                    <mpath href={`#${e.id}-path`} />
                  </animateMotion>
                </circle>
              )}
              <path id={`${e.id}-path`} d={d} fill="none" stroke="none" />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const isActive = edges[activeEdge]?.from === i || edges[activeEdge]?.to === i;
          return (
            <g key={n.id}>
              <rect x={n.cx - 14} y={n.cy - 12} width={28} height={24} rx={2}
                fill={isActive ? '#0D1020' : '#111318'}
                stroke={isActive ? 'var(--accent)' : '#2A2A28'}
                strokeWidth={0.8} />
              {isActive && <rect x={n.cx - 14} y={n.cy - 12} width={2.5} height={24} rx={1} fill="var(--accent)" />}
              <text x={n.cx} y={n.cy + 1} textAnchor="middle" dominantBaseline="middle"
                fontFamily="var(--font-body), sans-serif" fontSize="6.5" fill={isActive ? '#F0EFE9' : '#5A5A58'}>
                {n.label}
              </text>
            </g>
          );
        })}

        {/* Status */}
        <text x="140" y="152" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
          fontSize="6.5" fill="#2A2A28" letterSpacing="0.12em">
          RUNNING · 4 ACTIVE ROUTES
        </text>
      </svg>
    </div>
  );
}

/* ── Panel 2: Websites — browser wireframe with cursor ─────── */
function WebsitePanel({ visible }: { visible: boolean }) {
  const [cursorOn, setCursorOn] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const blink = setInterval(() => setCursorOn(v => !v), 560);
    const lines = setInterval(() => setLineIdx(i => (i + 1) % 5), 900);
    return () => { clearInterval(blink); clearInterval(lines); };
  }, [visible]);

  const skeletonLines = [
    { y: 72,  w: '75%' },
    { y: 86,  w: '55%' },
    { y: 104, w: '90%' },
    { y: 118, w: '70%' },
    { y: 132, w: '45%' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 20px 20px' }}>
      <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3A3A38' }}>
        Websites
      </div>

      <svg viewBox="0 0 280 160" style={{ width: '100%', flex: 1 }} aria-hidden>
        {/* Browser chrome */}
        <rect x="20" y="8" width="240" height="148" rx="3" fill="#0D0D0D" stroke="#2A2A28" strokeWidth="0.8" />
        {/* Title bar */}
        <rect x="20" y="8" width="240" height="22" rx="3" fill="#1A1A18" stroke="#2A2A28" strokeWidth="0.8" />
        <rect x="20" y="22" width="240" height="8" fill="#1A1A18" />
        {/* Traffic lights */}
        <circle cx="34" cy="19" r="3.5" fill="#C0192C" opacity="0.7" />
        <circle cx="46" cy="19" r="3.5" fill="#2A2A28" />
        <circle cx="58" cy="19" r="3.5" fill="#2A2A28" />
        {/* URL bar */}
        <rect x="72" y="13" width="120" height="12" rx="2" fill="#111111" stroke="#2A2A28" strokeWidth="0.6" />
        <text x="132" y="21" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="5.5" fill="#3A3A38" letterSpacing="0.04em">
          obsidia.co
        </text>

        {/* Nav bar skeleton */}
        <rect x="28" y="38" width="60" height="7" rx="1" fill="#1A1A18" />
        {[100, 126, 152, 178].map(x => (
          <rect key={x} x={x} y="38" width="18" height="7" rx="1" fill="#1A1A18" />
        ))}
        <rect x="214" y="37" width="30" height="9" rx="1" fill="var(--accent)" opacity="0.4" />

        {/* Hero image placeholder */}
        <rect x="28" y="53" width="224" height="14" rx="1" fill="#161616" stroke="#1E1E1C" strokeWidth="0.5" />

        {/* Skeleton text lines */}
        {skeletonLines.map((l, i) => (
          <rect key={i} x="28" y={l.y} width={l.w} height="6" rx="1"
            fill={i <= lineIdx ? '#1E1E1C' : '#141414'}
            style={{ transition: 'fill 300ms ease' }} />
        ))}

        {/* Blinking cursor */}
        <rect x={28 + (lineIdx < 5 ? 8 + lineIdx * 20 : 0)} y="119" width="5" height="1.5"
          fill="var(--accent)"
          opacity={cursorOn ? 0.9 : 0}
          style={{ transition: 'opacity 100ms' }} />

        <text x="140" y="152" textAnchor="middle" fontFamily="var(--font-body), sans-serif"
          fontSize="6.5" fill="#2A2A28" letterSpacing="0.12em">
          LOADING · 98 LIGHTHOUSE
        </text>
      </svg>
    </div>
  );
}

/* ── Panel 3: Applications — app skeleton ─────────────────── */
function AppPanel({ visible }: { visible: boolean }) {
  const [rowActive, setRowActive] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setRowActive(r => (r + 1) % 4), 1200);
    return () => clearInterval(id);
  }, [visible]);

  const rows = [
    { icon: '◈', label: 'Dashboard',   sub: '4 new updates' },
    { icon: '⟶', label: 'Workflows',   sub: '12 running'    },
    { icon: '↗', label: 'Reports',     sub: 'Updated 2m ago' },
    { icon: '◉', label: 'Team',        sub: '8 members'      },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 20px 20px' }}>
      <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3A3A38' }}>
        Applications
      </div>

      <svg viewBox="0 0 280 160" style={{ width: '100%', flex: 1 }} aria-hidden>
        {/* Phone outline */}
        <rect x="80" y="4" width="120" height="152" rx="10" fill="#0D0D0D" stroke="#2A2A28" strokeWidth="0.8" />
        {/* Notch */}
        <rect x="114" y="4" width="52" height="8" rx="0 0 6 6" fill="#1A1A18" />
        <rect x="128" y="6" width="24" height="4" rx="2" fill="#111111" />
        {/* Home indicator */}
        <rect x="120" y="149" width="40" height="2.5" rx="1.5" fill="#2A2A28" />

        {/* App status bar */}
        <rect x="80" y="16" width="120" height="12" fill="#0D0D0D" />
        <text x="92" y="24" fontFamily="var(--font-mono), monospace" fontSize="5.5" fill="#3A3A38">9:41</text>
        <rect x="172" y="19" width="20" height="5" rx="1" fill="#1A1A18" stroke="#2A2A28" strokeWidth="0.5" />
        <rect x="172" y="19" width="12" height="5" rx="1" fill="#2A2A28" />

        {/* App nav bar */}
        <rect x="80" y="28" width="120" height="18" fill="#111111" />
        <text x="140" y="39" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-body), sans-serif" fontSize="7" fontWeight="600" fill="#F0EFE9">
          Obsidia Hub
        </text>

        {/* List rows */}
        {rows.map((r, i) => {
          const isActive = i === rowActive;
          const y = 50 + i * 24;
          return (
            <g key={i}>
              <rect x="80" y={y} width="120" height="22"
                fill={isActive ? 'rgba(61,82,230,0.08)' : '#0D0D0D'}
                style={{ transition: 'fill 300ms ease' }} />
              {isActive && <rect x="80" y={y} width="2.5" height="22" fill="var(--accent)" />}
              <rect x="88" y={y + 6} width="10" height="10" rx="2"
                fill={isActive ? '#0D1020' : '#111318'}
                stroke={isActive ? 'var(--accent)' : '#2A2A28'} strokeWidth="0.6" />
              <text x="94" y={y + 13} textAnchor="middle" dominantBaseline="middle"
                fontFamily="var(--font-mono), monospace" fontSize="5.5"
                fill={isActive ? 'var(--accent)' : '#5A5A58'}>
                {r.icon}
              </text>
              <text x="104" y={y + 9} dominantBaseline="middle"
                fontFamily="var(--font-body), sans-serif" fontSize="6.5"
                fill={isActive ? '#F0EFE9' : '#9A9890'}>
                {r.label}
              </text>
              <text x="104" y={y + 17} dominantBaseline="middle"
                fontFamily="var(--font-body), sans-serif" fontSize="5.5" fill="#3A3A38">
                {r.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function ServiceTriptych() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const panels = [
    { key: 'automation', Panel: AutomationPanel },
    { key: 'websites',   Panel: WebsitePanel   },
    { key: 'apps',       Panel: AppPanel       },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0A0A0A',
        borderLeft: '1px solid #1E1E1C',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #1A1A18 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Corner label */}
      <div aria-hidden style={{
        position: 'absolute', top: '20px', left: '24px', zIndex: 2,
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#3A3A38',
      }}>
        What We Build
      </div>


      {/* Three panels */}
      {panels.map(({ key, Panel }, i) => (
        <div
          key={key}
          style={{
            position: 'relative',
            zIndex: 1,
            borderRight: i < 2 ? '1px solid transparent' : 'none',
            backgroundImage: i < 2 ? 'linear-gradient(var(--dark-bg), var(--dark-bg)), linear-gradient(180deg, var(--accent), var(--violet))' : 'none',
            backgroundOrigin: i < 2 ? 'border-box' : 'initial',
            backgroundClip: i < 2 ? 'padding-box, border-box' : 'initial',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 800ms ease ${i * 140 + 300}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${i * 140 + 300}ms`,
          }}
        >
          <Panel visible={visible} />
        </div>
      ))}
    </div>
  );
}
