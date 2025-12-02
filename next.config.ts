import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/**')],
  },
  reactCompiler: true,
  output: 'standalone',
};

export default nextConfig;
