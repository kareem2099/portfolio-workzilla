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
  images: {
    unoptimized: true, // Temporarily disable image optimization
  },
  modularizeImports: {
    '@components/*': {
      transform: '@components/{{member}}',
    },
  },
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || process.env.NEXT_PUBLIC_ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
  },
};

export default withNextIntl(nextConfig);
