// This is a Server Component - no 'use client' directive needed

import { Metadata } from 'next'
import { siteConfig } from '../seo/metadata-config'

/**
 * Generate enhanced metadata for better SEO
 * 
 * This function should be used in page.tsx files to generate metadata
 * compatible with Next.js App Router
 */

/**
 * SEOMetadata component
 * 
 * Provides comprehensive metadata for SEO including:
 * - Title and description
 * - Open Graph tags for social sharing
 * - Twitter Card metadata
 * - Canonical URLs
 * - Robots directives
 */
export function generateEnhancedSEO({
  title,
  description,
  path = '',
  ogImage,
  keywords = [],
  publishedTime,
  modifiedTime = '2025-04-22T00:00:00Z',
  authors = [],
  section,
  noIndex = false
}: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  noIndex?: boolean
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path}`
  const allKeywords = [...siteConfig.keywords, ...keywords].join(', ')
  
  return {
    // Basic metadata
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    metadataBase: new URL(siteConfig.url),
    
    // Canonical URL and alternates
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${siteConfig.url}/en-us${path}`,
        'en-GB': `${siteConfig.url}/en-gb${path}`,
      },
    },
    
    // Open Graph metadata (for social sharing)
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors?.length > 0 && { authors }),
      ...(section && { section }),
    },
    
    // Twitter card metadata
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      site: '@psqrd_ai',
      creator: '@psqrd_ai',
      images: [ogImage || siteConfig.ogImage],
    },
    
    // Robots directives
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    
    // Verification tokens for search engines
    verification: {
      google: 'google-site-verification-code', // Replace with actual code when available
      other: {
        yandex: 'yandex-verification-code',      // Replace with actual code when available
        bing: 'bing-verification-code',          // Replace with actual code when available
      }
    },
    
    // Other metadata
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    themeColor: '#6D28D9', // Purple theme color
    category: section || 'Technology',
  }
}

export default generateEnhancedSEO
