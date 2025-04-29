/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['psqrd.ai'],
  },
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
  // Enable SWC minification for improved performance
  swcMinify: true,
}

export default nextConfig
