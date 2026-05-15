import type { ReactNode } from 'react';

// Root layout required by Next.js — actual locale-aware layout is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
