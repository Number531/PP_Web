import { MetadataRoute } from 'next'

/**
 * Generate a robots.txt file with optimized crawling directives
 * This helps search engines understand which pages to index and which to ignore
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/admin/',
        '/_next/',
        '/private/',
        '/temp/',
        '/drafts/',
      ],
    },
    sitemap: 'https://psqrd.ai/sitemap.xml',
    host: 'https://psqrd.ai',
  }
}
