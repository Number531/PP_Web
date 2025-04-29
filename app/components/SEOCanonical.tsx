// This is a Server Component - no 'use client' directive needed

import { Metadata } from 'next'
import { siteConfig } from '../seo/metadata-config'

/**
 * Generate canonical URL metadata for a page
 * 
 * Ensures proper canonical URL implementation to prevent duplicate content issues
 * and help search engines understand the preferred version of a page
 * 
 * @param path - Optional path to use instead of the current pathname
 * @param overrideUrl - Optional complete URL to use as canonical
 */
export function generateCanonicalUrl({
  path = '',
  overrideUrl
}: {
  path?: string
  overrideUrl?: string
}): Metadata {
  // Use provided override URL or construct from site config and path
  const canonicalUrl = overrideUrl || 
    `${siteConfig.url}${path}${path === '/' ? '' : '/'}`
  
  return {
    alternates: {
      canonical: canonicalUrl,
    }
  }
}

export default generateCanonicalUrl
