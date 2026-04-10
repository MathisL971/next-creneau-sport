import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import Script from 'next/script';
import { PostHogPageView } from '@/components/posthog-pageview';
import Providers from '@/components/providers';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('title'),
    description: t('description'),
    other: {
      google: 'notranslate',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning translate="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
        style={{
          fontFamily: geistSans.style.fontFamily,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Script src="https://canny.io/sdk.js" strategy="afterInteractive" />
            <PostHogPageView />
            <AppHeader />
            <main className="flex flex-col w-full grow">{children}</main>
            <AppFooter />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
