'use client';

import { useEffect, useRef } from 'react';

/* ── Layout constants ─────────────────────────────────────── */
const VB_W = 600;
const VB_H = 320;
const NW   = 96;   // node width
const NH   = 34;   // node height

/* ── Node definitions ─────────────────────────────────────── */
type NodeType = 'trigger' | 'process' | 'active' | 'output';

interface WFNode {
  id:    number;
  x:     number;
  y:     number;
  label: string;
  sub:   string;
  type:  NodeType;
}

const NODES: WFNode[] = [
  { id: 0, x: 8,   y: 143, label: 'CRM Trigger',   sub: 'webhook',    type: 'trigger'  },
  { id: 1, x: 140, y: 64,  label: 'Filter Rules',  sub: 'condition',  type: 'process'  },
  { id: 2, x: 140, y: 222, label: 'Route Logic',   sub: 'router',     type: 'process'  },
  { id: 3, x: 272, y: 28,  label: 'Transform',     sub: 'formatter',  type: 'active'   },
  { id: 4, x: 272, y: 143, label: 'Validate',      sub: 'schema',     type: 'process'  },
  { id: 5, x: 272, y: 258, label: 'Schedule',      sub: 'cron',       type: 'process'  },
  { id: 6, x: 404, y: 86,  label: 'Auto-Approve',  sub: 'action',     type: 'active'   },
  { id: 7, x: 404, y: 200, label: 'Sync to DB',    sub: 'database',   type: 'process'  },
  { id: 8, x: 496, y: 143, label: 'Complete',      sub: 'output',     type: 'output'   },
];

/* ── Edge definitions ─────────────────────────────────────── */
interface WFEdge {
  from:   number;
  to:     number;
  active: boolean;
  dur:    string;
  begin:  string;
}

const EDGES: WFEdge[] = [
  { from: 0, to: 1, active: true,  dur: '2.4s', begin: '0s'    },
  { from: 0, to: 2, active: false, dur: '3.0s', begin: '0.8s'  },
  { from: 1, to: 3, active: true,  dur: '2.2s', begin: '0.6s'  },
  { from: 1, to: 4, active: false, dur: '2.8s', begin: '1.2s'  },
  { from: 2, to: 4, active: false, dur: '2.6s', begin: '0.4s'  },
  { from: 2, to: 5, active: false, dur: '3.2s', begin: '1.6s'  },
  { from: 3, to: 6, active: true,  dur: '2.0s', begin: '1.0s'  },
  { from: 4, to: 6, active: false, dur: '2.8s', begin: '0.2s'  },
  { from: 4, to: 7, active: false, dur: '2.6s', begin: '1.4s'  },
  { from: 5, to: 7, active: false, dur: '3.0s', begin: '0.6s'  },
  { from: 6, to: 8, active: true,  dur: '1.8s', begin: '1.8s'  },
  { from: 7, to: 8, active: false, dur: '2.4s', begin: '1.0s'  },
];

/* ── Helpers ──────────────────────────────────────────────── */
function cx(n: WFNode) { return n.x + NW / 2; }
function cy(n: WFNode) { return n.y + NH / 2; }

function edgePath(from: WFNode, to: WFNode): string {
  const x1 = from.x + NW;
  const y1 = cy(from);
  const x2 = to.x;
  const y2 = cy(to);
  const offset = Math.max(Math.abs(x2 - x1) * 0.45, 36);
  return `M ${x1},${y1} C ${x1 + offset},${y1} ${x2 - offset},${y2} ${x2},${y2}`;
}

/* ── Node colours ─────────────────────────────────────────── */
const NODE_STYLE: Record<NodeType, { bg: string; border: string; accentBar: string; labelColor: string; subColor: string }> = {
  trigger: { bg: '#0D1020', border: '#3D52E6',  accentBar: '#3D52E6', labelColor: '#F0EFE9', subColor: '#3D52E6' },
  active:  { bg: '#0D1020', border: '#3D52E6',  accentBar: '#3D52E6', labelColor: '#F0EFE9', subColor: '#3D52E6' },
  process: { bg: '#111318', border: '#2A2A28',  accentBar: '#3A3A38', labelColor: '#9A9890', subColor: '#5A5A58' },
  output:  { bg: '#0D1020', border: '#3D52E6',  accentBar: '#3D52E6', labelColor: '#F0EFE9', subColor: '#3D52E6' },
};

export default function WorkflowGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.style.opacity = '0';
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        svg.style.transition = 'opacity 1.2s ease 0.3s';
        svg.style.opacity = '1';
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0A0A0A',
        borderLeft: '1px solid #1E1E1C',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot grid on the dark panel */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #1E1E1C 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      {/* Corner label */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#3A3A38',
          zIndex: 1,
        }}
      >
        Automation Preview
      </div>

      {/* Status dot */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            animation: 'statPulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#3A3A38',
          }}
        >
          Live
        </span>
      </div>

      {/* SVG graph */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{
          width: '100%',
          height: '100%',
          padding: '52px 24px 28px',
        }}
        aria-hidden
      >
        <defs>
          {/* Glow filter for active nodes */}
          <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Arrow marker */}
          <marker id="arrow-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="var(--accent)" opacity="0.8" />
          </marker>
          <marker id="arrow-passive" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#2A2A28" />
          </marker>
        </defs>

        {/* ── Edges ── */}
        {EDGES.map((edge, i) => {
          const fromNode = NODES[edge.from];
          const toNode   = NODES[edge.to];
          const d = edgePath(fromNode, toNode);
          const pathId = `ep-${edge.from}-${edge.to}`;

          return (
            <g key={i}>
              <path
                id={pathId}
                d={d}
                fill="none"
                stroke={edge.active ? 'var(--accent)' : '#2A2A28'}
                strokeWidth={edge.active ? 1.2 : 0.8}
                strokeOpacity={edge.active ? 0.75 : 0.6}
                markerEnd={edge.active ? 'url(#arrow-active)' : 'url(#arrow-passive)'}
              />
              {edge.active && (
                <circle r="3" fill="var(--accent)" opacity="0.9">
                  <animateMotion
                    dur={edge.dur}
                    repeatCount="indefinite"
                    begin={edge.begin}
                    rotate="auto"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {NODES.map((node) => {
          const style = NODE_STYLE[node.type];
          const isActive = node.type === 'active' || node.type === 'trigger' || node.type === 'output';

          return (
            <g
              key={node.id}
              style={isActive ? { animation: 'nodeGlow 2.4s ease-in-out infinite' } : {}}
            >
              {/* Node body */}
              <rect
                x={node.x}
                y={node.y}
                width={NW}
                height={NH}
                rx={3}
                fill={style.bg}
                stroke={style.border}
                strokeWidth={0.8}
              />

              {/* Left accent bar */}
              <rect
                x={node.x}
                y={node.y + 4}
                width={2.5}
                height={NH - 8}
                rx={1}
                fill={style.accentBar}
              />

              {/* Label */}
              <text
                x={node.x + 12}
                y={node.y + NH / 2 - 3}
                fontFamily="var(--font-body), sans-serif"
                fontSize="8.5"
                fontWeight="500"
                fill={style.labelColor}
                dominantBaseline="middle"
              >
                {node.label}
              </text>

              {/* Sub-label */}
              <text
                x={node.x + 12}
                y={node.y + NH / 2 + 8}
                fontFamily="var(--font-body), sans-serif"
                fontSize="7"
                fill={style.subColor}
                dominantBaseline="middle"
                letterSpacing="0.08em"
                style={{ textTransform: 'uppercase' }}
              >
                {node.sub}
              </text>

              {/* Status dot (top-right of node) */}
              <circle
                cx={node.x + NW - 8}
                cy={node.y + 8}
                r={2.5}
                fill={isActive ? 'var(--accent)' : '#3A3A38'}
                opacity={isActive ? 0.9 : 0.5}
              />
            </g>
          );
        })}

        {/* Connection count badge at bottom */}
        <text
          x={VB_W / 2}
          y={VB_H - 6}
          fontFamily="var(--font-body), sans-serif"
          fontSize="7.5"
          fill="#3A3A38"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          12 ACTIVE CONNECTIONS · RUNNING
        </text>
      </svg>
    </div>
  );
}
