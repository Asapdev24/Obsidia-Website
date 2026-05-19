import type { NextConfig } from 'next';

const isStaticBuild = process.env.GITHUB_ACTIONS === 'true' || process.env.STATIC_BUILD === 'true';

const nextConfig: NextConfig = {
  ...(isStaticBuild && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
