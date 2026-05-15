'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Pause grain overlay animation when tab is backgrounded */
    const grain = document.querySelector<HTMLElement>('.grain-overlay');
    const onVisibilityChange = () => {
      if (!grain) return;
      if (document.hidden) grain.classList.add('paused');
      else grain.classList.remove('paused');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    /* Only activate custom cursor on fine-pointer devices (no touch) */
    if (!window.matchMedia('(pointer: fine)').matches) {
      return () => document.removeEventListener('visibilitychange', onVisibilityChange);
    }

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId = 0;
    let hovering = false;

    dot.style.opacity  = '1';
    ring.style.opacity = '1';

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.11);
      ry = lerp(ry, my, 0.11);

      /* Dot: exact follow, centred on 8px dot */
      dot.style.left = `${mx - 4}px`;
      dot.style.top  = `${my - 4}px`;

      /* Ring: lerp follow, centred on fixed 28px size (scale doesn't affect positioning) */
      const ringSize = 28;
      ring.style.left = `${rx - ringSize / 2}px`;
      ring.style.top  = `${ry - ringSize / 2}px`;

      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hovering = true;
      dot.style.transform   = 'scale(0)';
      ring.style.transform  = 'scale(1.43)';
      ring.style.opacity    = '0.35';
    };

    const onLeave = () => {
      hovering = false;
      dot.style.transform   = 'scale(1)';
      ring.style.transform  = 'scale(1)';
      ring.style.opacity    = '0.6';
    };

    const onMouseDown = () => {
      dot.style.transform  = hovering ? 'scale(0)' : 'scale(0.6)';
      ring.style.transform = 'scale(0.85)';
    };

    const onMouseUp = () => {
      dot.style.transform  = hovering ? 'scale(0)' : 'scale(1)';
      ring.style.transform = hovering ? 'scale(1.43)' : 'scale(1)';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    rafId = requestAnimationFrame(tick);

    /* Event delegation — single listeners on document, no DOM querying or MutationObserver */
    const onEnterEl = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.('a, button, input, textarea, select, label, [role="button"]')) {
        onEnter();
      }
    };

    const onLeaveEl = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.('a, button, input, textarea, select, label, [role="button"]')) {
        onLeave();
      }
    };

    document.addEventListener('mouseover', onEnterEl, { passive: true });
    document.addEventListener('mouseout', onLeaveEl, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onEnterEl);
      document.removeEventListener('mouseout', onLeaveEl);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Filled dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'transform 150ms ease, opacity 300ms ease',
          willChange: 'left, top, transform',
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'transform 200ms ease, opacity 300ms ease',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
