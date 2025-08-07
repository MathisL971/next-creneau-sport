import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
    browserDebugInfoInTerminal: true,
    reactCompiler: true,
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      // Handle locale-prefixed routes for PostHog
      {
        source: '/:locale(en|fr)/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/:locale(en|fr)/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com https://canny.io https://vercel.live https://va.vercel-scripts.com;
              connect-src 'self' https://us.i.posthog.com https://vitals.vercel-insights.com https://canny.io https://va.vercel-scripts.com;
              img-src 'self' data: blob: https:;
              style-src 'self' 'unsafe-inline';
              font-src 'self' data:;
              frame-src 'self' https://canny.io https://vercel.live;
            `
              .replace(/\s+/g, ' ')
              .trim(),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
