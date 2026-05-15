'use client';

interface TextMarqueeProps {
  text: string;
  speed?: number;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  italic?: boolean;
  padding?: string;
}

export default function TextMarquee({
  text,
  speed = 32,
  backgroundColor = 'var(--dark-bg)',
  textColor = 'rgba(220,225,248,0.14)',
  fontSize = 'clamp(22px, 3vw, 42px)',
  italic = true,
  padding = '18px 0',
}: TextMarqueeProps) {
  const repeated = `${text}   —   ${text}   —   `;
  const duration = `${speed}s`;

  return (
    <div
      aria-hidden
      style={{
        backgroundColor,
        padding,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Two tracks offset by half the duration for a seamless infinite scroll */}
      <div style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: `marqueeScroll ${duration} linear infinite`,
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize,
              fontWeight: 400,
              fontStyle: italic ? 'italic' : 'normal',
              letterSpacing: '-0.02em',
              color: textColor,
              paddingRight: '4em',
              userSelect: 'none',
            }}
          >
            {repeated}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize,
              fontWeight: 400,
              fontStyle: italic ? 'italic' : 'normal',
              letterSpacing: '-0.02em',
              color: textColor,
              paddingRight: '4em',
              userSelect: 'none',
            }}
          >
            {repeated}
          </span>
        </div>
      </div>
    </div>
  );
}
