'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('faq');
  const resolvedHeading = heading ?? t('defaultHeading');
  const resolvedLabel = label ?? t('defaultLabel');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQS = [0, 1, 2, 3, 4, 5].map(i => ({ q: t(`q${i}`), a: t(`a${i}`) }));

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
            {resolvedLabel}
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
          {resolvedHeading}
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
