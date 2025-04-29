import { MetadataRoute } from 'next'
import { siteConfig } from './seo/metadata-config'

/**
 * Web App Manifest
 * 
 * Provides metadata for Progressive Web App (PWA) features
 * and improves mobile experience when added to home screen
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'PSQRD',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6D28D9',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    orientation: 'portrait',
    categories: ['business', 'productivity', 'technology'],
    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        label: 'Desktop View of PSQRD AI Platform'
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '720x1280',
        type: 'image/png',
        label: 'Mobile View of PSQRD AI Platform'
      }
    ],
    shortcuts: [
      {
        name: 'Chat',
        url: '/chat',
        description: 'Start a conversation with our AI'
      },
      {
        name: 'Products',
        url: '/products',
        description: 'View our AI solutions'
      }
    ],
    related_applications: [
      {
        platform: 'web',
        url: siteConfig.url
      }
    ],
    prefer_related_applications: false,
    lang: 'en-US'
  }
}
