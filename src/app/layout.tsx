import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CréneauSport',
  description:
    'Trouvez et réservez des créneaux disponibles pour vos activités sportives à Montréal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Canny SDK - Simple Setup */}
        <script async src="https://canny.io/sdk.js"></script>
      </head>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          <main className="flex flex-col w-full grow">{children}</main>
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
