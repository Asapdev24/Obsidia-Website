import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isStaticBuild = process.env.GITHUB_ACTIONS === 'true' || process.env.STATIC_BUILD === 'true';

const nextConfig: NextConfig = {
  ...(isStaticBuild && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default withNextIntl(nextConfig);
