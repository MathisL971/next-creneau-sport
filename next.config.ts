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
};

export default withNextIntl(nextConfig);
