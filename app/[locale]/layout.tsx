import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  DM_Sans,
  JetBrains_Mono,
  Tajawal,
} from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import '../globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import SideNav from '../components/ui/SideNav';
import BackToTop from '../components/ui/BackToTop';

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

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  const messages = await getMessages();
  const isArabic = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${tajawal.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="grain-overlay" aria-hidden />
          <CustomCursor />
          <Navigation />
          <SideNav />
          <BackToTop />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Script src="http://localhost:8400/live.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
