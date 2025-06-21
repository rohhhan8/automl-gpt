/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'pexels.com']
  },
  transpilePackages: ['undici'],
  trailingSlash: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Ensure proper handling of dynamic routes
  async rewrites() {
    return [
      {
        source: '/result/:jobId',
        destination: '/result/[jobId]',
      },
      {
        source: '/status/:jobId',
        destination: '/status/[jobId]',
      },
    ];
  },
};

module.exports = nextConfig;