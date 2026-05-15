'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale  = useLocale();
  const router  = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', next);
    }
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1px',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px',
        padding: '2px',
      }}
      aria-label="Language switcher"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          aria-label={`Switch to ${l === 'en' ? 'English' : 'العربية'}`}
          style={{
            background: locale === l ? 'rgba(61,82,230,0.85)' : 'none',
            border: 'none',
            borderRadius: '4px',
            cursor: locale === l ? 'default' : 'pointer',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: locale === l ? '#fff' : 'rgba(220,225,248,0.45)',
            padding: '5px 8px',
            lineHeight: 1,
            transition: 'color 200ms ease, background 200ms ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (locale !== l) {
              (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.75)';
            }
          }}
          onMouseLeave={(e) => {
            if (locale !== l) {
              (e.currentTarget as HTMLElement).style.color = 'rgba(220,225,248,0.45)';
            }
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
