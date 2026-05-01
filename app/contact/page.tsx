'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, Mail } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion';

/* ── Constants ────────────────────────────────────────────── */
const BUDGET   = ['Under $2k', '$2k – $5k', '$5k – $10k', '$10k+', 'Not sure yet'];
const TIMELINE = ['As soon as possible', 'Within 1 month', '1–3 months', 'Just exploring'];

const PROCESS = [
  { n: '01', title: 'Brief reviewed',    sub: 'Within one hour'         },
  { n: '02', title: 'Discovery call',    sub: 'Scheduled in 24 hours'   },
  { n: '03', title: 'Scope document',    sub: 'Delivered within 3 days' },
];

const STEP_LABELS = ['About you', 'Your challenge', 'Scope'];

/* ── Pill selector ─────────────────────────────────────────── */
function PillGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(active ? '' : opt)}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '9px 20px',
              border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
              backgroundColor: active ? 'var(--accent)' : 'transparent',
              color: active ? '#FFFFFF' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'border-color 180ms ease, background-color 180ms ease, color 180ms ease',
            }}
            onMouseEnter={(e) => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ── Form input (underline style) ─────────────────────────── */
interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder, autoFocus }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: focused ? 'var(--accent)' : 'var(--text-muted)',
        marginBottom: '9px',
        transition: 'color 200ms ease',
        userSelect: 'none',
      }}>
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '10px 0',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '15px',
          color: 'var(--text)',
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 200ms ease',
        }}
      />
    </div>
  );
}

/* ── Progress indicator ───────────────────────────────────── */
function Progress({ step }: { step: number }) {
  return (
    <div style={{ marginBottom: '52px' }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '2px',
              backgroundColor: i <= step ? 'var(--accent)' : 'var(--border)',
              transition: 'background-color 400ms ease',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
        }}>
          {String(step).padStart(2, '0')} / 03
        </span>
        <span style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}>
          {STEP_LABELS[step - 1]}
        </span>
      </div>
    </div>
  );
}

/* ── Step 1: About you ────────────────────────────────────── */
function Step1({
  form,
  onChange,
}: {
  form: { name: string; company: string; email: string; role: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div style={{ marginBottom: '44px' }}>
        <h2 className="font-heading" style={{
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          color: 'var(--text)',
          lineHeight: 1.05,
          marginBottom: '10px',
        }}>
          First, who are you?
        </h2>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          We&rsquo;ll use this to personalize our reply.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
          <Field label="Your name" name="name" value={form.name} onChange={onChange} required autoFocus />
          <Field label="Company" name="company" value={form.company} onChange={onChange} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
          <Field label="Work email" name="email" type="email" value={form.email} onChange={onChange} required />
          <Field label="Your role" name="role" value={form.role} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Description ──────────────────────────────────── */
function Step2({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const words = value.trim().split(/\s+/).filter(Boolean).length;
  const ready = words >= 10;

  return (
    <div>
      <div style={{ marginBottom: '44px' }}>
        <h2 className="font-heading" style={{
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          color: 'var(--text)',
          lineHeight: 1.05,
          marginBottom: '10px',
        }}>
          What&rsquo;s slowing you down?
        </h2>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          Describe the process as if explaining it to a new colleague.
        </p>
      </div>

      <div>
        <label style={{
          display: 'block',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: focused ? 'var(--accent)' : 'var(--text-muted)',
          marginBottom: '10px',
          transition: 'color 200ms ease',
          userSelect: 'none',
        }}>
          Describe the process
          <span style={{ color: 'var(--accent)', marginLeft: '3px' }}>*</span>
        </label>
        <textarea
          name="description"
          value={value}
          onChange={onChange}
          required
          rows={7}
          autoFocus
          placeholder="e.g. Every Monday, someone on my team spends two hours pulling numbers from our CRM, pasting them into a spreadsheet, formatting a table, and emailing a PDF to eight stakeholders. It's always late and occasionally wrong."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: '12px 0',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '14px',
            lineHeight: 1.75,
            color: 'var(--text)',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
            outline: 'none',
            resize: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 200ms ease',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}>
          <span style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '11px',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            maxWidth: '320px',
          }}>
            {!ready && 'A few sentences is enough.'}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: ready ? 'var(--accent)' : 'var(--text-muted)',
            letterSpacing: '0.06em',
            transition: 'color 300ms ease',
            whiteSpace: 'nowrap',
          }}>
            {words} {words === 1 ? 'word' : 'words'}{ready ? ' ✓' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Scope ────────────────────────────────────────── */
function Step3({
  budget,
  timeline,
  onBudget,
  onTimeline,
}: {
  budget: string;
  timeline: string;
  onBudget: (v: string) => void;
  onTimeline: (v: string) => void;
}) {
  return (
    <div>
      <div style={{ marginBottom: '44px' }}>
        <h2 className="font-heading" style={{
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          color: 'var(--text)',
          lineHeight: 1.05,
          marginBottom: '10px',
        }}>
          Last details.
        </h2>
        <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          These help us prepare the right questions for your call. Both optional.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}>
            Budget range
          </div>
          <PillGrid options={BUDGET} value={budget} onChange={onBudget} />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}>
            Timeline
          </div>
          <PillGrid options={TIMELINE} value={timeline} onChange={onTimeline} />
        </div>
      </div>
    </div>
  );
}

/* ── Success state ────────────────────────────────────────── */
function SuccessState() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  const next = [
    'Your brief is in our inbox.',
    "We'll review it and be in touch within one hour.",
    'Expect a calendar invite for a 30-minute discovery call.',
  ];

  return (
    <div style={{
      maxWidth: '520px',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 600ms ease, transform 600ms ease',
    }}>
      {/* Check mark */}
      <div style={{
        width: '52px',
        height: '52px',
        border: '1px solid var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '36px',
      }}>
        <Check size={22} color="var(--accent)" strokeWidth={1.5} />
      </div>

      <h2 className="font-heading" style={{
        fontSize: 'clamp(36px, 4vw, 56px)',
        fontWeight: 500,
        letterSpacing: '-0.03em',
        color: 'var(--text)',
        lineHeight: 1.0,
        marginBottom: '16px',
      }}>
        Brief received.
      </h2>

      <p className="font-body" style={{
        fontSize: '15px',
        lineHeight: 1.8,
        color: 'var(--text-secondary)',
        marginBottom: '48px',
        maxWidth: '380px',
      }}>
        We&rsquo;ll read every word and come to the call prepared.
      </p>

      {/* What's next */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', marginBottom: '44px' }}>
        {next.map((text, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '18px',
              padding: '14px 0',
              borderBottom: i < next.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              flexShrink: 0,
              paddingTop: '2px',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: 'var(--text-secondary)',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '3px',
          transition: 'color 200ms ease, border-color 200ms ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = 'var(--accent)';
          el.style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = 'var(--text-secondary)';
          el.style.borderColor = 'var(--border)';
        }}
      >
        Back to home <ArrowRight size={11} />
      </Link>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────── */
export default function ContactPage() {
  const [step, setStep]         = useState(1);
  const [animKey, setAnimKey]   = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [leftVis, setLeftVis]   = useState(false);

  const [form, setForm] = useState({
    name: '', company: '', email: '', role: '',
    budget: '', timeline: '', description: '',
  });

  useEffect(() => {
    const t = setTimeout(() => setLeftVis(true), 120);
    return () => clearTimeout(t);
  }, []);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    set(e.target.name, e.target.value);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    set(e.target.name, e.target.value);

  const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;

  const canAdvance = () => {
    if (step === 1) return form.name.trim().length > 0 && form.email.trim().length > 0;
    if (step === 2) return wordCount >= 10;
    return true;
  };

  const advance = () => {
    if (!canAdvance()) return;
    setStep((s) => s + 1);
    setAnimKey((k) => k + 1);
  };

  const retreat = () => {
    setStep((s) => s - 1);
    setAnimKey((k) => k + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section
        style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '42% 58%', paddingTop: '68px' }}
        className="contact-grid"
      >
        {/* ── Left: info panel ─────────────────────────────── */}
        <div style={{
          backgroundColor: 'var(--dark-bg)',
          padding: '80px 56px 80px 40px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Dot grid */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, var(--dark-surface) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }} />
          {/* Crimson bloom */}
          <div aria-hidden style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(61,82,230,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          {/* Large step watermark — changes with each step */}
          <div aria-hidden style={{
            position: 'absolute',
            right: '-16px',
            bottom: '-16px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 'clamp(160px, 22vw, 260px)',
            fontWeight: 400,
            color: '#FFFFFF',
            opacity: submitted ? 0.04 : 0.028,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
            pointerEvents: 'none',
            transition: 'opacity 400ms ease',
          }}>
            {submitted ? '✓' : String(step).padStart(2, '0')}
          </div>

          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Label */}
            <div style={{
              marginBottom: '40px',
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 500ms ease 100ms, transform 500ms ease 100ms',
            }}>
              <div className="section-label">Start Here</div>
            </div>

            {/* Headline */}
            <h1 className="font-heading" style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: 'var(--dark-text)',
              lineHeight: 1.05,
              marginBottom: '24px',
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms ease 200ms, transform 600ms ease 200ms',
            }}>
              The conversation
              <br />
              starts here.
            </h1>

            {/* Body */}
            <p className="font-body" style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--dark-muted)',
              marginBottom: '56px',
              maxWidth: '340px',
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms ease 350ms, transform 600ms ease 350ms',
            }}>
              Describe your process, not your budget. We&rsquo;ll diagnose before we prescribe.
            </p>

            {/* What happens next */}
            <div style={{
              borderTop: '1px solid var(--dark-border)',
              paddingTop: '36px',
              marginBottom: 'auto',
              opacity: leftVis ? 1 : 0,
              transition: 'opacity 600ms ease 480ms',
            }}>
              <div style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--dark-muted)',
                marginBottom: '28px',
              }}>
                What happens next
              </div>

              {PROCESS.map((ps, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '16px 0',
                    borderBottom: i < PROCESS.length - 1 ? '1px solid var(--dark-border)' : 'none',
                    opacity: leftVis ? 1 : 0,
                    transition: `opacity 500ms ease ${560 + i * 100}ms`,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    color: 'var(--accent)',
                    flexShrink: 0,
                    paddingTop: '2px',
                  }}>
                    {ps.n}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--dark-text)',
                      marginBottom: '3px',
                    }}>
                      {ps.title}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      letterSpacing: '0.06em',
                      color: 'var(--dark-muted)',
                    }}>
                      {ps.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact footer */}
            <div style={{
              borderTop: '1px solid var(--dark-border)',
              paddingTop: '28px',
              marginTop: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: leftVis ? 1 : 0,
              transition: 'opacity 600ms ease 860ms',
            }}>
              <a
                href="mailto:hello@seeraflow.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '13px',
                  color: 'var(--dark-muted)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dark-text)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)'; }}
              >
                <Mail size={12} color="var(--accent)" strokeWidth={1.5} />
                hello@seeraflow.com
              </a>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px',
                letterSpacing: '0.04em',
                color: 'var(--dark-muted)',
              }}>
                <span style={{ color: 'var(--accent)', fontSize: '14px', lineHeight: 1 }}>—</span>
                No commitment required
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: form panel ─────────────────────────────── */}
        <div style={{
          backgroundColor: 'var(--bg)',
          padding: '80px 56px 80px 72px',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '520px', width: '100%' }}>
              <Progress step={step} />

              {/* Animated step content */}
              <div key={animKey} className="step-content">
                {step === 1 && (
                  <Step1
                    form={{ name: form.name, company: form.company, email: form.email, role: form.role }}
                    onChange={handleInputChange}
                  />
                )}
                {step === 2 && (
                  <Step2
                    value={form.description}
                    onChange={handleTextareaChange}
                  />
                )}
                {step === 3 && (
                  <Step3
                    budget={form.budget}
                    timeline={form.timeline}
                    onBudget={(v) => set('budget', v)}
                    onTimeline={(v) => set('timeline', v)}
                  />
                )}
              </div>

              {/* Navigation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: step > 1 ? 'space-between' : 'flex-end',
                marginTop: '44px',
                paddingTop: '28px',
                borderTop: '1px solid var(--border)',
              }}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={retreat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 200ms ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                  >
                    <ArrowLeft size={12} /> Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={advance}
                    disabled={!canAdvance()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: canAdvance() ? '#FFFFFF' : 'var(--text-muted)',
                      backgroundColor: canAdvance() ? 'var(--accent)' : 'var(--surface)',
                      border: `1px solid ${canAdvance() ? 'var(--accent)' : 'var(--border)'}`,
                      padding: '14px 36px',
                      cursor: canAdvance() ? 'pointer' : 'default',
                      transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
                    }}
                  >
                    Continue <ArrowRight size={12} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      backgroundColor: 'var(--accent)',
                      border: '1px solid var(--accent)',
                      padding: '14px 36px',
                      cursor: 'pointer',
                      transition: 'background-color 200ms ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
                  >
                    Send Brief <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        padding: '96px 32px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FAQAccordion dark heading="Still have questions?" label="FAQ" />
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-grid > div:first-child {
            padding: 64px 32px !important;
          }
          .contact-grid > div:last-child {
            padding: 64px 32px !important;
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
          }
        }
        @media (max-width: 600px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }

        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .step-content {
          animation: stepFadeIn 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Remove default input autofill background */
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          transition: background-color 0s 600000s, color 0s 600000s;
        }

        /* Placeholder color */
        ::placeholder { color: var(--text-muted); opacity: 0.55; }
      `}</style>
    </>
  );
}
