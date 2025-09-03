import { createRequire } from 'module'
import path from 'path'
const require = createRequire(import.meta.url)

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
    optimizePackageImports: [
      'framer-motion',
    ],
  },
  // Enable SWC minification for improved performance
  swcMinify: true,
  webpack: (config) => {
    config.resolve = config.resolve || {}
    const threeEntry = require.resolve('three')
    const postprocessingEntry = require.resolve('postprocessing')
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      three: path.dirname(path.dirname(threeEntry)),
      postprocessing: path.dirname(path.dirname(postprocessingEntry)),
      'three/examples/jsm/postprocessing/Pass.js': 'postprocessing',
    }
    return config
  },
}

export default nextConfig
