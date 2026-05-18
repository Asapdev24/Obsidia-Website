import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SideNav from '../components/ui/SideNav';
import BackToTop from '../components/ui/BackToTop';
import CustomCursor from '../components/CustomCursor';
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry';
import PageLoader from '../components/ui/PageLoader';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <StyledComponentsRegistry>
      <NextIntlClientProvider messages={messages}>
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
      </NextIntlClientProvider>
    </StyledComponentsRegistry>
  );
}
