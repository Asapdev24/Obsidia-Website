'use client';

import { useRef, useEffect, useState } from 'react';

const TOOLS = [
  { name: 'n8n',               logo: 'https://logo.clearbit.com/n8n.io'              },
  { name: 'Zapier',            logo: 'https://logo.clearbit.com/zapier.com'           },
  { name: 'Make',              logo: 'https://logo.clearbit.com/make.com'             },
  { name: 'Notion',            logo: 'https://logo.clearbit.com/notion.so'            },
  { name: 'Slack',             logo: 'https://logo.clearbit.com/slack.com'            },
  { name: 'Airtable',         logo: 'https://logo.clearbit.com/airtable.com'         },
  { name: 'Google Workspace',  logo: 'https://logo.clearbit.com/workspace.google.com' },
  { name: 'HubSpot',           logo: 'https://logo.clearbit.com/hubspot.com'          },
  { name: 'Monday.com',        logo: 'https://logo.clearbit.com/monday.com'           },
];

/* Duplicate for seamless loop */
const TRACK = [...TOOLS, ...TOOLS];

function LogoItem({ tool }: { tool: typeof TOOLS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        padding: '0 52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '56px',
      }}
    >
      {errored ? (
        /* Fallback: abbreviated name pill when logo 404s */
        <span
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: hovered ? 'var(--text)' : 'var(--text-muted)',
            transition: 'color 300ms ease',
            userSelect: 'none',
          }}
        >
          {tool.name}
        </span>
      ) : (
        <img
          src={tool.logo}
          alt={tool.name}
          width={36}
          height={36}
          onError={() => setErrored(true)}
          style={{
            width: '36px',
            height: '36px',
            objectFit: 'contain',
            filter: hovered ? 'grayscale(0%) opacity(1)' : 'grayscale(100%) opacity(0.45)',
            transition: 'filter 320ms ease',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setRevealed(true); observer.disconnect(); } });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--bg)',
        padding: '96px 0',
      }}
    >
      {/* Label */}
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
          textAlign: 'center',
          marginBottom: '52px',
          padding: '0 32px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Works with the tools your business already runs on
        </p>
      </div>

      {/* Marquee track */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 700ms ease 200ms',
        }}
      >
        {/* Fade edge — left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(to right, var(--bg), transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Fade edge — right */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(to left, var(--bg), transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling row */}
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'marqueeScroll 34s linear infinite',
            willChange: 'transform',
          }}
        >
          {TRACK.map((tool, i) => (
            <LogoItem key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          marginTop: '40px',
          textAlign: 'center',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.04em',
          padding: '0 32px',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 600ms ease 400ms',
        }}
      >
        And many more — Obsidia integrates with any tool that has an API.
      </p>
    </section>
  );
}
