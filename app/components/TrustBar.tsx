'use client';

import { useRef, useEffect, useState } from 'react';
import LogoLoop, { LogoItem } from './ui/LogoLoop';

const ICON_SZ = 80;
const CDN = 'https://cdn.simpleicons.org';

function AppLogo({ slug, alt, href, svgNode }: { slug?: string; alt: string; href: string; svgNode?: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Visit ${alt} website`}
      className="tb-logo"
    >
      {svgNode ? (
        <div className="tb-media tb-media-svg">
          {svgNode}
        </div>
      ) : (
        <img
          src={`${CDN}/${slug}/08090E`}
          alt={alt}
          width={ICON_SZ}
          height={ICON_SZ}
          draggable={false}
          loading="lazy"
          decoding="async"
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
          className="tb-media tb-media-img"
        />
      )}
    </a>
  );
}

const TOOLS: LogoItem[] = [
  { node: <AppLogo slug="n8n"              alt="n8n"              href="https://n8n.io" /> },
  { node: <AppLogo slug="zapier"           alt="Zapier"           href="https://zapier.com" /> },
  { node: <AppLogo slug="make"             alt="Make"             href="https://make.com" /> },
  { node: <AppLogo slug="notion"           alt="Notion"           href="https://notion.so" /> },
  { node: <AppLogo svgNode={<svg width="80%" height="80%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>} alt="Slack"            href="https://slack.com" /> },
  { node: <AppLogo slug="airtable"         alt="Airtable"         href="https://airtable.com" /> },
  { node: <AppLogo svgNode={<svg width="80%" height="80%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>}  alt="Google Workspace" href="https://workspace.google.com" /> },
  { node: <AppLogo slug="hubspot"          alt="HubSpot"          href="https://hubspot.com" /> },
  { node: <AppLogo svgNode={<svg width="80%" height="80%" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Monday.com</title><g transform="matrix(3.208255 0 0 3.208255 -35.559129 -63.587202)"><path d="M13.513 35.76a2.433 2.433 0 0 1-2.059-3.723l4.377-6.99a2.432 2.432 0 1 1 4.123 2.582l-4.378 6.99a2.43 2.43 0 0 1-2.063 1.141z" /><path d="M21.056 35.76a2.433 2.433 0 0 1-2.063-3.723l4.38-6.99a2.432 2.432 0 1 1 4.117 2.582l-4.372 6.99a2.43 2.43 0 0 1-2.063 1.141z" /><ellipse ry="2.375" rx="2.436" cy="33.384" cx="28.597" /></g></svg>} alt="Monday.com"       href="https://monday.com" /> },
  { node: <AppLogo svgNode={<svg width="80%" height="80%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Microsoft Teams</title><path d="M20.625 8.127q-.55 0-1.025-.205-.475-.205-.832-.563-.358-.357-.563-.832Q18 6.053 18 5.502q0-.54.205-1.02t.563-.837q.357-.358.832-.563.474-.205 1.025-.205.54 0 1.02.205t.837.563q.358.357.563.837.205.48.205 1.02 0 .55-.205 1.025-.205.475-.563.832-.357.358-.837.563-.48.205-1.02.205zm0-3.75q-.469 0-.797.328-.328.328-.328.797 0 .469.328.797.328.328.797.328.469 0 .797-.328.328-.328.328-.797 0-.469-.328-.797-.328-.328-.797-.328zM24 10.002v5.578q0 .774-.293 1.46-.293.685-.803 1.194-.51.51-1.195.803-.686.293-1.459.293-.445 0-.908-.105-.463-.106-.85-.329-.293.95-.855 1.729-.563.78-1.319 1.336-.756.557-1.67.861-.914.305-1.898.305-1.148 0-2.162-.398-1.014-.399-1.805-1.102-.79-.703-1.312-1.664t-.674-2.086h-5.8q-.411 0-.704-.293T0 16.881V6.873q0-.41.293-.703t.703-.293h8.59q-.34-.715-.34-1.5 0-.727.275-1.365.276-.639.75-1.114.475-.474 1.114-.75.638-.275 1.365-.275t1.365.275q.639.276 1.114.75.474.475.75 1.114.275.638.275 1.365t-.275 1.365q-.276.639-.75 1.113-.475.475-1.114.75-.638.276-1.365.276-.188 0-.375-.024-.188-.023-.375-.058v1.078h10.875q.469 0 .797.328.328.328.328.797zM12.75 2.373q-.41 0-.78.158-.368.158-.638.434-.27.275-.428.639-.158.363-.158.773 0 .41.158.78.159.368.428.638.27.27.639.428.369.158.779.158.41 0 .773-.158.364-.159.64-.428.274-.27.433-.639.158-.369.158-.779 0-.41-.158-.773-.159-.364-.434-.64-.275-.275-.639-.433-.363-.158-.773-.158zM6.937 9.814h2.25V7.94H2.814v1.875h2.25v6h1.875zm10.313 7.313v-6.75H12v6.504q0 .41-.293.703t-.703.293H8.309q.152.809.556 1.5.405.691.985 1.19.58.497 1.318.779.738.281 1.582.281.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752zm5.25-1.547v-5.203h-3.75v6.855q.305.305.691.452.387.146.809.146.469 0 .879-.176.41-.175.715-.48.304-.305.48-.715t.176-.879Z"/></svg>} alt="Microsoft Teams"  href="https://teams.microsoft.com" /> },
  { node: <AppLogo slug="gmail"            alt="Gmail"            href="https://mail.google.com" /> },
  { node: <AppLogo slug="trello"           alt="Trello"           href="https://trello.com" /> },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="trust-bar"
      data-section-label="Integrations"
      style={{ backgroundColor: 'var(--bg)', padding: '96px 0' }}
    >
      {/* Header */}
      <div style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 600ms ease, transform 600ms ease',
        textAlign: 'center',
        marginBottom: '64px',
        padding: '0 32px',
      }}>
        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--text)',
            maxWidth: '680px',
            margin: '0 auto 16px',
          }}
        >
          Works with the tools your
          <br />
          <span style={{ color: 'var(--accent)' }}>business already runs on</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          letterSpacing: '0.01em',
        }}>
          Click any logo to learn more
        </p>
      </div>

      {/* Logo strip */}
      <div style={{ opacity: revealed ? 1 : 0, transition: 'opacity 700ms ease 200ms' }}>
        <LogoLoop
          logos={TOOLS}
          speed={48}
          direction="left"
          logoHeight={ICON_SZ}
          gap={120}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--bg, #FBFBFE)"
          ariaLabel="Integration partners"
        />
      </div>

      <p style={{
        marginTop: '40px',
        textAlign: 'center',
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '12px',
        color: 'var(--muted)',
        letterSpacing: '0.04em',
        padding: '0 32px',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 600ms ease 400ms',
      }}>
        And many more. Obsidia connects with any tool that has an API.
      </p>
    </section>
  );
}
