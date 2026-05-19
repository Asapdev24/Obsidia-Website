import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import {
  Cormorant_Garamond,
  DM_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SideNav from './components/ui/SideNav';
import BackToTop from './components/ui/BackToTop';
import CustomCursor from './components/CustomCursor';
import StyledComponentsRegistry from './lib/StyledComponentsRegistry';
import PageLoader from './components/ui/PageLoader';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#06080F',
};

export const metadata: Metadata = {
  title: {
    default: 'Obsidia | Automation, Websites & Applications',
    template: '%s | Obsidia',
  },
  description:
    'Obsidia builds custom automations, websites, and applications for businesses that are serious about how they operate.',
  keywords: ['workflow automation', 'web development', 'app development', 'business automation', 'Obsidia'],
  openGraph: {
    title: 'Obsidia: Three disciplines. One partner.',
    description: 'Custom automations, websites, and applications built for businesses that mean business.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obsidia: Three disciplines. One partner.',
    description: 'Custom automations, websites, and applications built for businesses that mean business.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <PageLoader />
          <CustomCursor />
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="grain-overlay" aria-hidden />
          <Navigation />
          <SideNav />
          <BackToTop />
          <main id="main-content">{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
