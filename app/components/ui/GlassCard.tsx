'use client';

import { ReactNode, CSSProperties, useState } from 'react';

export type GlassVariant = 'standard' | 'elevated' | 'accent';

interface GlassCardProps {
  children: ReactNode;
  variant?: GlassVariant;
  topGradientBorder?: boolean;
  style?: CSSProperties;
  className?: string;
}

const BASE: Record<GlassVariant, { bg: string; bgHover: string; border: string; borderHover: string; blur: string }> = {
  standard: {
    bg:          'rgba(255,255,255,0.05)',
    bgHover:     'rgba(255,255,255,0.09)',
    border:      'rgba(255,255,255,0.08)',
    borderHover: 'rgba(61,82,230,0.35)',
    blur:        'blur(16px)',
  },
  elevated: {
    bg:          'rgba(255,255,255,0.03)',
    bgHover:     'rgba(255,255,255,0.06)',
    border:      'rgba(255,255,255,0.10)',
    borderHover: 'rgba(61,82,230,0.35)',
    blur:        'blur(20px)',
  },
  accent: {
    bg:          'rgba(61,82,230,0.08)',
    bgHover:     'rgba(61,82,230,0.14)',
    border:      'rgba(61,82,230,0.20)',
    borderHover: 'rgba(61,82,230,0.45)',
    blur:        'blur(16px)',
  },
};

export default function GlassCard({
  children,
  variant = 'standard',
  topGradientBorder = false,
  style,
  className,
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false);
  const v = BASE[variant];

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:             'relative',
        background:           hovered ? v.bgHover : v.bg,
        backdropFilter:       v.blur,
        WebkitBackdropFilter: v.blur,
        border:               `1px solid ${hovered ? v.borderHover : v.border}`,
        transition:           'background 200ms ease, border-color 200ms ease',
        ...style,
      }}
    >
      {topGradientBorder && (
        <div
          aria-hidden
          style={{
            position:   'absolute',
            top:        0,
            left:       0,
            right:      0,
            height:     '2px',
            background: 'linear-gradient(135deg, var(--accent), var(--violet))',
            zIndex:     1,
          }}
        />
      )}
      {children}
    </div>
  );
}
