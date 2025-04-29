'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { siteConfig } from '../seo/metadata-config'

interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl: string
  embedUrl?: string
  duration?: string // Format: "PT1H30M" (ISO 8601 duration format)
  expires?: string
  interactionCount?: number
  regionsAllowed?: string[]
  tags?: string[]
}

/**
 * SEO Video Schema Component
 * 
 * Implements structured data for videos to improve visibility in video search results
 * and potentially generate rich snippets for video content
 */
export function SEOVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  expires,
  interactionCount,
  regionsAllowed = ['US', 'CA', 'EU'],
  tags = []
}: VideoSchemaProps) {
  const pathname = usePathname()
  const url = `${siteConfig.url}${pathname}`
  
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': name,
    'description': description,
    'thumbnailUrl': thumbnailUrl,
    'uploadDate': uploadDate,
    'contentUrl': contentUrl,
    'embedUrl': embedUrl || contentUrl,
    ...(duration && { 'duration': duration }),
    ...(expires && { 'expires': expires }),
    ...(interactionCount && { 'interactionCount': interactionCount }),
    ...(regionsAllowed.length > 0 && { 'regionsAllowed': regionsAllowed.join(' ') }),
    'publisher': {
      '@type': 'Organization',
      'name': siteConfig.name,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteConfig.url}/logo.png`,
        'width': 600,
        'height': 60
      }
    },
    ...(tags.length > 0 && { 'keywords': tags.join(', ') })
  }
  
  return (
    <Script id={`video-schema-${name.replace(/\s+/g, '-').toLowerCase()}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(videoSchema)}
    </Script>
  )
}

export default SEOVideoSchema
