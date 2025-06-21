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
  output: 'export',
  distDir: 'out',
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // Add build timestamp to force cache invalidation
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  // Disable static optimization for auth-dependent pages
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Generate static params for dynamic routes
  async generateStaticParams() {
    return [];
  },
  // Add cache busting
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

module.exports = nextConfig;