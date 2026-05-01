const ITEMS = [
  'Workflow Automation',
  'Process Intelligence',
  'Operational Efficiency',
  'Obsidia',
  'Workflow Automation',
  'Process Intelligence',
  'Operational Efficiency',
  'Obsidia',
];

interface MarqueeProps {
  speed?: number;
}

export default function Marquee({ speed = 32 }: MarqueeProps) {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid #1E1E1C',
        borderBottom: '1px solid #1E1E1C',
        overflow: 'hidden',
        padding: '18px 0',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to right, #0A0A0A, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to left, #0A0A0A, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: `marqueeScroll ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: i % 4 === 3 ? 'var(--accent)' : '#4A4A48',
                padding: '0 32px',
              }}
            >
              {item}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#2A2A28',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
