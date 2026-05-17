'use client';
import { useEffect, useRef } from 'react';

const RING_SIZE = 28;
// Literal value avoids CSS-variable resolution race on first paint
const ACCENT = '#3D52E6';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Inject cursor:none as an inline <style> — highest cascade priority,
    // runs after hydration so it beats any SSR-injected framework styles.
    const styleTag = document.createElement('style');
    styleTag.textContent =
      '@media (pointer: fine) { html, body, *, *::before, *::after { cursor: none !important; } }';
    document.head.appendChild(styleTag);

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let rafId = 0;
    let hovering = false;
    let clicking = false;

    dot.style.opacity  = '1';
    ring.style.opacity = '1';

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // No CSS transition on transform — RAF drives position every frame.
    // CSS transitions + RAF = compound lag. Only state transitions (scale)
    // get a CSS transition, and those are applied via a separate class switch.
    const tick = () => {
      rx = lerp(rx, mx, 0.11);
      ry = lerp(ry, my, 0.11);

      const dotScale  = clicking ? 0.5 : hovering ? 1.5 : 1;
      const ringScale = clicking ? 0.75 : hovering ? 1.4 : 1;

      // transform is the ONLY layout-free, compositor-thread property we touch.
      // left/top would trigger layout; we never touch those.
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px) scale(${dotScale})`;
      ring.style.transform = `translate(${rx - RING_SIZE / 2}px, ${ry - RING_SIZE / 2}px) scale(${ringScale})`;

      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const updateHoverState = () => {
      const el = document.elementFromPoint(mx, my);
      const isInteractive = !!el?.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor-pointer]'
      );
      if (isInteractive !== hovering) {
        hovering = isInteractive;
      }
    };

    const onMouseDown = () => { clicking = true; };
    const onMouseUp   = () => { clicking = false; };

    document.addEventListener('mousemove', onMouseMove,      { passive: true });
    document.addEventListener('mousemove', updateHoverState, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup',   onMouseUp);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', updateHoverState);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup',   onMouseUp);
      styleTag.remove();
    };
  }, []);

  return (
    <>
      {/* Dot — snaps to cursor, no transform transition (RAF-driven) */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0, top: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: ACCENT,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          // Only opacity transitions; transform must NOT transition (RAF-driven)
          transition: 'opacity 300ms ease',
          willChange: 'transform',
        }}
      />
      {/* Ring — trails cursor via lerp, no transform transition needed */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0, top: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          // Only opacity transitions; transform must NOT transition (RAF-driven)
          transition: 'opacity 300ms ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
