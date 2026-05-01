'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What kinds of workflows can you automate?',
    a: 'Anything that has a clear trigger and a repeatable outcome — approval chains, data syncing between tools, report generation, lead routing, invoice processing, onboarding sequences, and more. If your team does it manually on a schedule or in response to an event, it can almost certainly be automated.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most workflows go live within 4–6 weeks of the first conversation. Simple, single-system automations can be done in under two weeks. Multi-system integrations with complex logic take longer. We give you a realistic timeline after the audit — not before.',
  },
  {
    q: 'Do we need any technical knowledge on our end?',
    a: 'No. We handle all the technical work. You need to be able to describe your current process clearly and tell us what a good outcome looks like. We do the architecture, the build, and the documentation. Your team learns to monitor the output, not the code.',
  },
  {
    q: 'Which tools do you work with?',
    a: 'We work with any tool that has an API or native integration support — n8n, Make, Zapier, HubSpot, Notion, Airtable, Slack, Google Workspace, Monday.com, and many others. If the tool exists, there is almost certainly a way to connect it.',
  },
  {
    q: 'What happens if something breaks after launch?',
    a: 'The first 30 days of fixes are included at no charge. We monitor for errors during that period and resolve anything that surfaces. After 30 days, optional maintenance packages are available. Every workflow comes with full documentation so you\'re never dependent on us.',
  },
  {
    q: 'How is Obsidia different from hiring a developer or using a no-code tool ourselves?',
    a: 'A developer builds to your brief — which means you need to know what to brief. A no-code tool requires your team to learn it, maintain it, and debug it. We do all three: we map the process, design the logic, build the automation, and hand it over with documentation. You get the outcome without the overhead.',
  },
];

interface ItemProps {
  faq: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  dark?: boolean;
}

function FAQItem({ faq, index, isOpen, onToggle, dark = false }: ItemProps) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${dark ? '#2A2A28' : 'var(--border)'}`,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: isOpen ? 'var(--accent)' : (dark ? '#5A5A58' : 'var(--text-muted)'),
              flexShrink: 0,
              transition: 'color 200ms ease',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="font-heading"
            style={{
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: isOpen ? (dark ? '#F0EFE9' : 'var(--text)') : (dark ? '#C8C6C0' : 'var(--text)'),
              lineHeight: 1.3,
              transition: 'color 200ms ease',
            }}
          >
            {faq.q}
          </span>
        </div>

        {/* Plus / Minus icon */}
        <div
          style={{
            width: '28px',
            height: '28px',
            border: `1px solid ${dark ? '#3A3A38' : 'var(--border)'}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 200ms ease, background-color 200ms ease',
            backgroundColor: isOpen ? 'var(--accent)' : 'transparent',
            borderColor: isOpen ? 'var(--accent)' : (dark ? '#3A3A38' : 'var(--border)'),
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{ transition: 'transform 300ms ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <line x1="5" y1="0" x2="5" y2="10" stroke="#fff" strokeWidth="1.5" />
            <line x1="0" y1="5" x2="10" y2="5" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </div>
      </button>

      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '300px' : '0px',
          transition: 'max-height 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <p
          className="font-body"
          style={{
            fontSize: '14px',
            lineHeight: 1.8,
            color: dark ? '#7A7870' : 'var(--text-secondary)',
            paddingBottom: '24px',
            paddingLeft: '30px',
            maxWidth: '760px',
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

interface FAQAccordionProps {
  dark?: boolean;
  heading?: string;
  label?: string;
}

export default function FAQAccordion({
  dark = false,
  heading = 'Common questions.',
  label = 'FAQ',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: '56px' }}>
        <div
          className="section-label"
          style={{
            marginBottom: '20px',
            color: dark ? 'var(--accent)' : undefined,
          }}
        >
          <span style={dark ? { '--label-line-color': 'var(--accent)' } as React.CSSProperties : {}}>
            {label}
          </span>
        </div>
        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(32px, 3.8vw, 52px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            color: dark ? '#F0EFE9' : 'var(--text)',
            lineHeight: 1.1,
          }}
        >
          {heading}
        </h2>
      </div>

      {/* Items */}
      <div style={{ borderTop: `1px solid ${dark ? '#2A2A28' : 'var(--border)'}` }}>
        {FAQS.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
}
