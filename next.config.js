/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['psqrd.ai'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    // Enable optimizations for improved performance
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
    ],
  },
  webpack: (config, { isServer }) => {
    // Optimize worker files
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: 'worker-loader',
      options: {
        filename: 'static/chunks/[name].[contenthash].js',
        publicPath: '/_next/',
      },
    })

    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        default: false,
        vendors: false,
        // Create a three.js specific chunk
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three-vendors',
          priority: 20,
          reuseExistingChunk: true,
        },
        // Create a chunk for large common dependencies
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
        // Create a chunk for shared utilities
        shared: {
          test: /[\\/]app[\\/]shared[\\/]/,
          name: 'app-shared',
          priority: 15,
          reuseExistingChunk: true,
        },
      },
    }

    // Ensure single module identity for 'three' to avoid WebGL context issues (notably in Safari)
    config.resolve = config.resolve || {}
    const path = require('path')
    const threeEntry = require.resolve('three')
    const postprocessingEntry = require.resolve('postprocessing')
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Use entry file locations and step up to package root to allow subpath imports
      three: path.dirname(path.dirname(threeEntry)),
      postprocessing: path.dirname(path.dirname(postprocessingEntry)),
      'three/examples/jsm/postprocessing/Pass.js': 'postprocessing',
    }

    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
