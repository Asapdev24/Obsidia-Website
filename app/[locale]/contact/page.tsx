'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FAQAccordion from '../../components/FAQAccordion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EMAIL = 'sales@obsidia.space';

const EMAIL_CLIENTS = [
  { label: 'Gmail',            icon: 'G', url: () => `https://mail.google.com/mail/?view=cm&to=${EMAIL}`, platforms: ['all'] },
  { label: 'Outlook',          icon: 'O', url: () => `https://outlook.office.com/mail/deeplink/compose?to=${EMAIL}`, platforms: ['all'] },
  { label: 'Apple Mail',       icon: 'A', url: () => `mailto:${EMAIL}`, platforms: ['ios', 'mac'] },
  { label: 'Default mail app', icon: 'D', url: () => `mailto:${EMAIL}`, platforms: ['android', 'other'] },
];

function detectPlatform(): 'ios' | 'mac' | 'android' | 'other' {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  if (/Macintosh/.test(ua)) return 'mac';
  if (/Android/.test(ua)) return 'android';
  return 'other';
}

function EmailChooser({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [platform, setPlatform] = useState<'ios' | 'mac' | 'android' | 'other'>('other');

  useEffect(() => { setPlatform(detectPlatform()); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const visibleClients = EMAIL_CLIENTS.filter(c => c.platforms.includes('all') || c.platforms.includes(platform));

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button" onClick={() => setOpen(v => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'rgba(13,17,71,0.5)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'color 200ms ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(13,17,71,0.5)'; }}
        aria-haspopup="listbox" aria-expanded={open}
      >
        <Mail size={12} color="var(--accent)" strokeWidth={1.5} />
        {email}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: 0, backgroundColor: '#1A1A18', border: '1px solid rgba(255,255,255,0.1)', padding: '6px', minWidth: '210px', zIndex: 200, boxShadow: '0 16px 48px rgba(0,0,0,0.38)' }}
          >
            <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(220,225,248,0.25)', padding: '6px 10px 8px' }}>Open with</p>
            {visibleClients.map(client => (
              <a
                key={client.label} href={client.url()}
                target={client.label !== 'Apple Mail' && client.label !== 'Default mail app' ? '_blank' : undefined}
                rel="noreferrer noopener" onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 10px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'rgba(220,225,248,0.7)', textDecoration: 'none', transition: 'background 150ms ease, color 150ms ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.color = '#DCE1F5'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(220,225,248,0.7)'; }}
              >
                <span style={{ width: '22px', height: '22px', backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: 'rgba(220,225,248,0.4)', flexShrink: 0 }}>{client.icon}</span>
                {client.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps { label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string; autoFocus?: boolean; }
function Field({ label, name, type = 'text', value, onChange, required, placeholder, autoFocus }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: focused ? 'var(--accent)' : 'rgba(13,17,71,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} autoFocus={autoFocus} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: '100%', padding: '10px 0', fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', color: '#0D1147', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(13,17,71,0.1)', outline: 'none', boxSizing: 'border-box' }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px', backgroundColor: 'var(--accent)', transform: focused ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left center', transition: focused ? 'transform 320ms cubic-bezier(0.22,1,0.36,1)' : 'transform 240ms cubic-bezier(0.76,0,0.24,1)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

function CustomSelect({ label, options, value, onChange, required, multi }: { label: string; options: string[]; value: string | string[]; onChange: (v: string | string[]) => void; required?: boolean; multi?: boolean; }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  const selected: string[] = Array.isArray(value) ? value : (value ? [value] : []);
  const toggle = (opt: string) => {
    if (multi) { const next = selected.includes(opt) ? selected.filter(v => v !== opt) : [...selected, opt]; (onChange as (v: string[]) => void)(next); }
    else { (onChange as (v: string) => void)(selected[0] === opt ? '' : opt); setOpen(false); }
  };
  const displayText = selected.length === 0 ? null : multi && selected.length > 1 ? `${selected.length} selected` : selected[0];
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: open ? 'var(--accent)' : 'rgba(13,17,71,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <button type="button" onClick={() => setOpen(v => !v)}
          style={{ width: '100%', padding: '10px 28px 10px 0', display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(13,17,71,0.1)', cursor: 'pointer', textAlign: 'left', outline: 'none', fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', color: displayText ? '#0D1147' : 'rgba(13,17,71,0.28)' }}>
          <span style={{ flex: 1 }}>{displayText ?? 'Select'}</span>
        </button>
        <ChevronDown size={12} style={{ position: 'absolute', right: 0, top: '50%', transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, color: open ? 'var(--accent)' : 'rgba(13,17,71,0.28)', transition: 'transform 240ms cubic-bezier(0.22,1,0.36,1), color 220ms ease', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px', backgroundColor: 'var(--accent)', transform: open ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left center', transition: open ? 'transform 320ms cubic-bezier(0.22,1,0.36,1)' : 'transform 240ms cubic-bezier(0.76,0,0.24,1)', pointerEvents: 'none' }} />
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, scaleY: 0.9, y: -4 }} animate={{ opacity: 1, scaleY: 1, y: 0 }} exit={{ opacity: 0, scaleY: 0.9, y: -4 }} transition={{ duration: 0.2, ease: EASE }}
              style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, backgroundColor: '#FFFFFF', border: '1px solid rgba(13,17,71,0.08)', borderRadius: '12px', boxShadow: '0 12px 48px rgba(13,17,71,0.12), 0 2px 8px rgba(13,17,71,0.06)', zIndex: 300, transformOrigin: 'top center', padding: '6px', overflow: 'hidden' }}>
              {options.map(opt => {
                const checked = selected.includes(opt);
                return (
                  <button key={opt} type="button" onClick={() => toggle(opt)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '7px', fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: '#0D1147', transition: 'background 130ms ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(61,82,230,0.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}>
                    <span style={{ width: '15px', height: '15px', flexShrink: 0, borderRadius: '3px', border: `1.5px solid ${checked ? 'var(--accent)' : 'rgba(13,17,71,0.18)'}`, backgroundColor: checked ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 140ms ease, background-color 140ms ease' }}>
                      {checked && <Check size={9} color="white" strokeWidth={2.5} />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepNavigator({ step, onBack }: { step: number; onBack: () => void }) {
  const steps = [{ n: '01', label: 'About you' }, { n: '02', label: 'Your challenge' }];
  return (
    <div style={{ marginBottom: '44px', borderBottom: '1px solid rgba(13,17,71,0.08)' }}>
      <div style={{ display: 'flex' }}>
        {steps.map((s, i) => {
          const sNum = i + 1; const isActive = step === sNum; const isDone = step > sNum;
          return (
            <div key={s.n} onClick={() => { if (isDone) onBack(); }}
              style={{ flex: 1, paddingBottom: '18px', paddingRight: i === 0 ? '24px' : '0', borderBottom: isActive ? '2.5px solid var(--accent)' : isDone ? '2.5px solid rgba(61,82,230,0.2)' : '2.5px solid transparent', marginBottom: '-1px', cursor: isDone ? 'pointer' : 'default', transition: 'border-color 380ms cubic-bezier(0.22,1,0.36,1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: isActive ? 'var(--accent)' : isDone ? 'rgba(61,82,230,0.35)' : 'rgba(13,17,71,0.18)', transition: 'color 380ms ease', flexShrink: 0 }}>{s.n}</span>
                <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: isActive ? 500 : 400, color: isActive ? '#0D1147' : isDone ? 'rgba(13,17,71,0.32)' : 'rgba(13,17,71,0.22)', transition: 'color 380ms ease' }}>{s.label}</span>
                {isDone && <Check size={11} strokeWidth={2.5} style={{ color: 'rgba(61,82,230,0.42)', flexShrink: 0 }} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FieldGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '8.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(13,17,71,0.18)', marginBottom: '18px' }}>{legend}</div>
      {children}
    </div>
  );
}

function Step1({ form, onChange, onService, error }: { form: { firstName: string; lastName: string; company: string; email: string; service: string[] }; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onService: (v: string[]) => void; error: string; }) {
  const serviceOpts = ['Workflow Automation', 'Website Development', 'Application Development', 'Not sure yet', 'Other'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      <FieldGroup legend="Name">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
          <Field label="First name" name="firstName" value={form.firstName} onChange={onChange} required autoFocus />
          <Field label="Last name"  name="lastName"  value={form.lastName}  onChange={onChange} required />
        </div>
      </FieldGroup>
      <FieldGroup legend="Contact">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
          <Field label="Email address" name="email"   type="email" value={form.email}   onChange={onChange} required />
          <Field label="Company"       name="company"             value={form.company} onChange={onChange} />
        </div>
      </FieldGroup>
      <FieldGroup legend="Service needed">
        <CustomSelect label="Service needed" options={serviceOpts} value={form.service} onChange={v => onService(v as string[])} required multi />
      </FieldGroup>
      {error && <p role="alert" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--error)', letterSpacing: '0.02em' }}>{error}</p>}
    </div>
  );
}

function Step2({ description, budget, timeline, error, onDescription, onBudget, onTimeline }: { description: string; budget: string; timeline: string; error: string; onDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBudget: (v: string) => void; onTimeline: (v: string) => void; }) {
  const [focused, setFocused] = useState(false);
  const words = description.trim().split(/\s+/).filter(Boolean).length;
  const ready = words >= 10;
  const budgetOpts   = ['Under $2k', '$2k – $5k', '$5k – $10k', '$10k+', 'Not sure yet'];
  const timelineOpts = ['As soon as possible', 'Within 1 month', '1–3 months', 'Just exploring'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      <FieldGroup legend="Brief">
        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.03em', marginBottom: '8px', color: focused ? 'var(--accent)' : 'rgba(13,17,71,0.38)', transition: 'color 220ms ease', userSelect: 'none' }}>
            Describe your challenge<span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <textarea name="description" value={description} onChange={onDescription} required rows={5} autoFocus placeholder="What's slowing you down? What does success look like?" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={{ width: '100%', padding: '10px 0', fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', lineHeight: 1.8, color: '#0D1147', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(13,17,71,0.1)', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px', backgroundColor: 'var(--accent)', transform: focused ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left center', transition: focused ? 'transform 320ms cubic-bezier(0.22,1,0.36,1)' : 'transform 240ms cubic-bezier(0.76,0,0.24,1)', pointerEvents: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ready ? 'var(--accent)' : 'rgba(13,17,71,0.18)', transition: 'color 300ms ease' }}>
              {words} {words === 1 ? 'word' : 'words'}{ready ? ' — ready' : ' — 10 min'}
            </span>
          </div>
        </div>
      </FieldGroup>
      <FieldGroup legend="Scope">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="form-two-col">
          <CustomSelect label="Estimated budget" options={budgetOpts}   value={budget}   onChange={v => onBudget(v as string)} />
          <CustomSelect label="Timeline"         options={timelineOpts} value={timeline} onChange={v => onTimeline(v as string)} />
        </div>
      </FieldGroup>
      {error && <p role="alert" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: 'var(--error)', letterSpacing: '0.02em' }}>{error}</p>}
    </div>
  );
}

function SuccessState() {
  const next = ['Brief reviewed', 'Discovery call', 'Scope document'];
  const subs = ['Within one hour', 'Scheduled in 24 hours', 'Delivered within 3 days'];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
          style={{ width: '56px', height: '56px', flexShrink: 0, border: '1px solid rgba(61,82,230,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(61,82,230,0.05)' }}>
          <Check size={22} color="var(--accent)" strokeWidth={1.5} />
        </motion.div>
        <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em', color: '#0D1147', lineHeight: 0.95, margin: 0 }}>Inquiry sent.</h2>
      </div>
      <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(13,17,71,0.46)', maxWidth: '400px' }}>We&apos;ll be in touch within one hour.</p>
      <div style={{ borderTop: '1px solid rgba(13,17,71,0.08)', paddingTop: '32px' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(13,17,71,0.2)', display: 'block', marginBottom: '24px' }}>What happens next</span>
        {next.map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.1 }}
            style={{ display: 'flex', gap: '20px', paddingBottom: i < next.length - 1 ? '20px' : '0', marginBottom: i < next.length - 1 ? '20px' : '0', borderBottom: i < next.length - 1 ? '1px solid rgba(13,17,71,0.07)' : 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'var(--accent)', flexShrink: 0, paddingTop: '2px', opacity: 0.55 }}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: '#0D1147', fontWeight: 500, marginBottom: '2px' }}>{text}</div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(13,17,71,0.28)' }}>{subs[i]}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <Link href="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'rgba(13,17,71,0.28)', borderBottom: '1px solid rgba(13,17,71,0.1)', paddingBottom: '3px', transition: 'color 200ms ease, border-color 200ms ease' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'var(--accent)'; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(13,17,71,0.28)'; el.style.borderColor = 'rgba(13,17,71,0.1)'; }}>
        Back to home <ArrowRight size={11} />
      </Link>
    </motion.div>
  );
}

function CTAButton({ onClick, type = 'button', disabled = false, children }: { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; children: React.ReactNode; }) {
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} whileHover={disabled ? {} : { y: -2 }} whileTap={disabled ? {} : { y: 0, scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: 'var(--accent)', border: 'none', padding: '16px 40px', borderRadius: '50px', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.55 : 1, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 22px rgba(61,82,230,0.32)', transition: 'opacity 200ms ease, box-shadow 260ms ease' }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 38px rgba(61,82,230,0.52)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 22px rgba(61,82,230,0.32)'; }}>
      <span aria-hidden className="btn-shine" />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '12px' }}>{children}</span>
    </motion.button>
  );
}

export default function ContactPage() {
  const [step, setStep]           = useState(1);
  const [animKey, setAnimKey]     = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed]   = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', service: [] as string[], budget: '', timeline: '', description: '', _hp: '' });
  const [stepError, setStepError]       = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { const id = setTimeout(() => setRevealed(true), 80); return () => clearTimeout(id); }, []);

  const set = (k: string, v: string | string[]) => setForm(p => ({ ...p, [k]: v }));
  const handleInputChange    = (e: React.ChangeEvent<HTMLInputElement>)    => { set(e.target.name, e.target.value); setStepError(''); };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { set(e.target.name, e.target.value); setStepError(''); };

  const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
  const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const advance = () => {
    if (form.firstName.trim().length < 1) { setStepError('First name is required'); return; }
    if (form.lastName.trim().length < 1)  { setStepError('Last name is required');  return; }
    if (!form.email.trim())               { setStepError('Email address is required'); return; }
    if (!EMAIL_RE.test(form.email.trim())) { setStepError('Please enter a valid email address'); return; }
    if (form.service.length === 0)        { setStepError('Please select a service'); return; }
    setStepError(''); setStep(2); setAnimKey(k => k + 1);
  };

  const retreat = () => { setStepError(''); setStep(s => s - 1); setAnimKey(k => k + 1); };

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (step === 1) { advance(); return; }
    if (wordCount < 10) { setStepError('Please describe your challenge (at least 10 words)'); return; }
    if (form._hp) return;
    setIsSubmitting(true);
    setTimeout(() => { setSubmitted(true); setIsSubmitting(false); }, 600);
  };

  return (
    <>
      <div data-nav-theme="light" style={{ backgroundColor: 'var(--bg)', minHeight: '100dvh', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div className="contact-split" style={{ display: 'grid', gridTemplateColumns: '42% 1fr', minHeight: '100dvh' }}>

            <div className="contact-left" style={{ position: 'sticky', top: 0, height: '100dvh', display: 'flex', flexDirection: 'column', paddingTop: '148px', paddingRight: '56px', paddingBottom: '56px', paddingLeft: 'calc(max(0px, (100vw - 1200px) / 2) + 32px)', marginLeft: 'calc(-1 * max(0px, (100vw - 1200px) / 2) - 32px)', width: 'calc(100% + max(0px, (100vw - 1200px) / 2) + 32px)', borderRight: '1px solid rgba(61,82,230,0.09)', overflow: 'hidden', backgroundImage: 'radial-gradient(circle, rgba(128,128,128,0.3) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(61,82,230,0.024) 0%, transparent 55%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <motion.h1 className="font-heading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }} transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                  style={{ fontSize: 'clamp(52px, 6.4vw, 88px)', fontWeight: 500, letterSpacing: '-0.045em', color: '#0D1147', lineHeight: 0.95, marginBottom: '24px' }}>
                  Tell us what you&apos;re building.
                </motion.h1>
                <motion.p className="font-body" initial={{ opacity: 0, y: 12 }} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }} transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
                  style={{ fontSize: '14px', lineHeight: 1.75, color: '#3D52E6', maxWidth: '340px', marginBottom: '28px' }}>
                  Every brief gets a real response. No templates. No auto-replies.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }} transition={{ duration: 0.5, ease: EASE, delay: 0.24 }}
                  style={{ padding: '14px 18px', border: '1px solid rgba(61,82,230,0.15)', backgroundColor: 'var(--bg)' }}>
                  <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(13,17,71,0.7)', margin: 0 }}>
                    We review every brief and respond within 3 business days with a preliminary assessment, not a sales call.
                  </p>
                </motion.div>
                <div style={{ flex: 1, minHeight: '32px' }} />
                <div style={{ borderTop: '1px solid rgba(61,82,230,0.08)', paddingTop: '22px', opacity: revealed ? 1 : 0, transition: 'opacity 500ms ease 960ms' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D52E6', marginBottom: '8px' }}>Or email us directly</div>
                    <EmailChooser email={EMAIL} />
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-right" style={{ padding: '148px 0 96px 64px', display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '520px' }}>
                {submitted ? <SuccessState /> : (
                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <button type="submit" aria-hidden tabIndex={-1} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, border: 'none', padding: 0 }} />
                    <input name="_hp" value={form._hp} onChange={handleInputChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, border: 'none', padding: 0 }} />
                    <StepNavigator step={step} onBack={retreat} />
                    <AnimatePresence mode="wait">
                      <motion.div key={`heading-${animKey}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: EASE }} style={{ marginBottom: '44px' }}>
                        <h2 className="font-heading" style={{ fontSize: 'clamp(30px, 3.2vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', color: '#0D1147', lineHeight: 1.0, margin: '0 0 10px' }}>
                          {step === 1 ? 'About you' : 'Your challenge'}
                        </h2>
                        <p className="font-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(13,17,71,0.36)', margin: 0 }}>
                          {step === 1 ? 'Who we are speaking with and what you need.' : 'Describe the challenge, budget, and ideal timeline.'}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.div key={`step-${animKey}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: EASE }} aria-live="polite" aria-atomic="true">
                        {step === 1 && <Step1 form={{ firstName: form.firstName, lastName: form.lastName, company: form.company, email: form.email, service: form.service }} onChange={handleInputChange} onService={v => set('service', v)} error={stepError} />}
                        {step === 2 && <Step2 description={form.description} budget={form.budget} timeline={form.timeline} error={stepError} onDescription={handleTextareaChange} onBudget={v => set('budget', v)} onTimeline={v => set('timeline', v)} />}
                      </motion.div>
                    </AnimatePresence>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: step > 1 ? 'space-between' : 'flex-end', marginTop: '52px', paddingTop: '28px', borderTop: '1px solid rgba(13,17,71,0.08)' }}>
                      {step > 1 && (
                        <button type="button" onClick={retreat}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(13,17,71,0.3)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0, borderRadius: '50px', transition: 'color 200ms ease' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0D1147'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(13,17,71,0.3)'; }}>
                          <ArrowLeft size={11} /> Back
                        </button>
                      )}
                      {step < 2 ? (
                        <CTAButton onClick={advance}>Next <ArrowRight size={12} /></CTAButton>
                      ) : (
                        <CTAButton type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'} <ArrowRight size={12} />
                        </CTAButton>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="contact-faq" data-section-label="FAQ" style={{ backgroundColor: '#F2F3FC', borderTop: '1px solid rgba(61,82,230,0.09)', padding: '96px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FAQAccordion heading="Common questions." label="FAQ" />
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .contact-split { grid-template-columns: 1fr !important; min-height: auto !important; }
          .contact-left { position: relative !important; top: auto !important; height: auto !important; margin-left: 0 !important; width: 100% !important; padding: 72px 0 48px !important; border-right: none !important; border-bottom: 1px solid rgba(61,82,230,0.08) !important; }
          .contact-right { padding: 56px 0 80px !important; }
        }
        @media (max-width: 600px) {
          .form-two-col { grid-template-columns: 1fr !important; }
          .contact-left { padding: 48px 0 40px !important; }
          .contact-right { padding: 40px 0 64px !important; }
        }
        input:-webkit-autofill, input:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0 1000px #FFFFFF inset !important; -webkit-text-fill-color: #0D1147 !important; transition: background-color 0s 600000s; }
        ::placeholder { color: rgba(13,17,71,0.16); opacity: 1; }
        textarea::placeholder { color: rgba(13,17,71,0.16); }
        .btn-shine { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .btn-shine::after { content: ''; position: absolute; top: 0; bottom: 0; left: -80%; width: 50%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); animation: btnShine 3s cubic-bezier(0.4,0,0.6,1) infinite; animation-delay: 1.2s; }
        @keyframes btnShine { 0% { left: -80%; opacity: 0; } 10% { opacity: 1; } 50% { left: 150%; opacity: 0; } 100% { left: 150%; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .btn-shine::after { animation: none; } }
      `}</style>
    </>
  );
}
