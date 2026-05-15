'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type LogoItem =
  | { node: React.ReactNode; href?: string; title?: string; ariaLabel?: string }
  | { src: string; alt?: string; href?: string; title?: string; srcSet?: string; sizes?: string; width?: number; height?: number };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 } as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => { observers.forEach(o => o?.disconnect()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) { onLoad(); return; }
    let remaining = images.length;
    const handleLoad = () => { remaining -= 1; if (remaining === 0) onLoad(); };
    images.forEach(img => {
      if ((img as HTMLImageElement).complete) { handleLoad(); }
      else {
        img.addEventListener('load', handleLoad, { once: true });
        img.addEventListener('error', handleLoad, { once: true });
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const dt = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;
      if (seqSize > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;
        track.style.transform = isVertical
          ? `translate3d(0, ${-next}px, 0)`
          : `translate3d(${-next}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

export const LogoLoop = React.memo<LogoLoopProps>(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dirMul = isVertical ? (direction === 'up' ? 1 : -1) : (direction === 'left' ? 1 : -1);
    return mag * dirMul * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const seqRect = seqRef.current?.getBoundingClientRect();
    const sw = seqRect?.width ?? 0;
    const sh = seqRect?.height ?? 0;
    if (isVertical) {
      const parentH = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentH > 0) {
        const tH = Math.ceil(parentH);
        if (containerRef.current.style.height !== `${tH}px`) containerRef.current.style.height = `${tH}px`;
      }
      if (sh > 0) {
        setSeqHeight(Math.ceil(sh));
        const vp = containerRef.current?.clientHeight ?? parentH ?? sh;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(vp / sh) + ANIMATION_CONFIG.COPY_HEADROOM));
      }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sw) + ANIMATION_CONFIG.COPY_HEADROOM));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const handleMouseEnter = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(true); }, [effectiveHoverSpeed]);
  const handleMouseLeave = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(false); }, [effectiveHoverSpeed]);

  const cssVariables = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
  }) as React.CSSProperties, [gap, logoHeight, fadeOutColor]);

  const rootClasses = useMemo(() => cx(
    'relative group',
    isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
    '[--logoloop-gap:32px]',
    '[--logoloop-logoHeight:28px]',
    '[--logoloop-fadeColorAuto:#ffffff]',
    'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
    scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
    className,
  ), [isVertical, scaleOnHover, className]);

  const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => {
    const liStyle: React.CSSProperties = {
      flexShrink: 0,
      lineHeight: 1,
      ...(isVertical ? { marginBottom: `${gap}px` } : { marginRight: `${gap}px` }),
      ...(scaleOnHover ? { overflow: 'visible' } : {}),
    };

    if (renderItem) {
      return (
        <li style={liStyle} key={key} role="listitem">
          {renderItem(item, key)}
        </li>
      );
    }

    const isNodeItem = 'node' in item;

    const content = isNodeItem ? (
      <span className={cx('inline-flex items-center', scaleOnHover && 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-[1.2]')}>
        {(item as any).node}
      </span>
    ) : (
      <img
        className={cx('w-auto block object-contain pointer-events-none', scaleOnHover && 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-[1.2]')}
        style={{ height: `${logoHeight}px` }}
        src={(item as any).src}
        srcSet={(item as any).srcSet}
        sizes={(item as any).sizes}
        alt={(item as any).alt ?? ''}
        title={(item as any).title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

    const inner = (item as any).href ? (
      <a
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', borderRadius: '4px' }}
        href={(item as any).href}
        aria-label={(item as any).ariaLabel ?? (item as any).alt ?? (item as any).title ?? 'logo link'}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ) : content;

    return (
      <li style={liStyle} key={key} role="listitem">
        {inner}
      </li>
    );
  }, [isVertical, scaleOnHover, renderItem, logoHeight, gap]);

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => (
    <ul
      className={cx('flex items-center', isVertical && 'flex-col')}
      key={`copy-${copyIndex}`}
      role="list"
      aria-hidden={copyIndex > 0}
      ref={copyIndex === 0 ? seqRef : undefined}
    >
      {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem, isVertical]);

  const containerStyle = useMemo((): React.CSSProperties => ({
    width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'),
    ...cssVariables,
    ...style,
  }), [width, cssVariables, style, isVertical]);

  const fadeColor = 'var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto))';

  return (
    <div ref={containerRef} className={rootClasses} style={containerStyle} role="region" aria-label={ariaLabel}>
      {fadeOut && (isVertical ? (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(24px,8%,120px)]" style={{ background: `linear-gradient(to bottom, ${fadeColor} 0%, transparent 100%)` }} />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(24px,8%,120px)]" style={{ background: `linear-gradient(to top, ${fadeColor} 0%, transparent 100%)` }} />
        </>
      ) : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)]" style={{ background: `linear-gradient(to right, ${fadeColor} 0%, transparent 100%)` }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)]" style={{ background: `linear-gradient(to left, ${fadeColor} 0%, transparent 100%)` }} />
        </>
      ))}

      <div
        className="flex will-change-transform select-none relative z-0 flex-row w-max"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
