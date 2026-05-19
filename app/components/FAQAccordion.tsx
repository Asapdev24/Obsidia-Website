'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ItemProps {
  faq: { q: string; a: string };
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
        id={`faq-trigger-${index}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
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
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
      <div style={{ overflow: 'hidden', minHeight: 0 }}>
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
  heading,
  label,
}: FAQAccordionProps) {
  const resolvedHeading = heading ?? 'Common questions.';
  const resolvedLabel = label ?? 'FAQ';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQS = [
    { q: 'What kinds of workflows can you automate?', a: 'Anything that has a clear trigger and a repeatable outcome. Invoice approvals, lead routing, report generation, data syncing between tools, onboarding sequences, internal notifications. If your team does the same thing more than twice a week, it is a candidate.' },
    { q: 'How long does a typical project take?', a: 'Timeline depends on scope, but most automation builds are delivered in two to four weeks. Website projects run four to eight weeks. Custom applications vary more widely and are scoped individually after an audit.' },
    { q: 'Do we need any technical knowledge on our end?', a: 'No. We handle all the technical work and document everything we build. You will know what the system does and how to manage it, without needing to know how it was built.' },
    { q: 'Which tools do you work with?', a: 'We work with any tool that has an API or native integration support. Common platforms include HubSpot, Notion, Airtable, Slack, Google Workspace, Zapier, Make, and most CRMs or project management tools. If you use something specific, ask us.' },
    { q: 'What happens if something breaks after launch?', a: 'The first 30 days of fixes and adjustments are included. After that, we offer ongoing support arrangements if you need them. We also document every system so your team can make minor changes independently.' },
    { q: 'How is Obsidia different from hiring a developer or agency?', a: 'A developer builds to your brief. An agency adds layers of account management. We audit first, which means we often catch scope problems before they become budget problems. We also build with handoff in mind, so you are not dependent on us to keep the lights on.' },
  ];

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: '56px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-label"
          style={{
            marginBottom: '20px',
            color: dark ? 'var(--accent)' : undefined,
          }}
        >
          <span style={dark ? { '--label-line-color': 'var(--accent)' } as React.CSSProperties : {}}>
            {resolvedLabel}
          </span>
        </motion.div>
        <motion.h2
          className="font-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{
            fontSize: 'clamp(32px, 3.8vw, 52px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            color: dark ? '#F0EFE9' : 'var(--text)',
            lineHeight: 1.1,
          }}
        >
          {resolvedHeading}
        </motion.h2>
      </div>

      {/* Items */}
      <div style={{ borderTop: `1px solid ${dark ? '#2A2A28' : 'var(--border)'}` }}>
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
          >
            <FAQItem
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              dark={dark}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
