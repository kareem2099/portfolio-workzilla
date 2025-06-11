import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  experimental: {
    // Add any needed experimental features here
  },
  reactStrictMode: true,
  modularizeImports: {
    '@components/*': {
      transform: '@components/{{member}}',
    },
  },
};

export default withNextIntl(nextConfig);
