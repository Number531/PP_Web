'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { siteConfig } from '../seo/metadata-config'

interface TechArticleProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
  keywords?: string[]
  images?: string[]
  videoUrl?: string
  dependencies?: string[]
}

/**
 * SEO TechArticle Schema Component
 * 
 * Implements structured data for technical articles and documentation
 * to improve visibility in search results for technical content
 */
export function SEOTechArticleSchema({
  title,
  description,
  datePublished,
  dateModified = new Date().toISOString(),
  author = { name: 'PSQRD Team' },
  keywords = [],
  images = [],
  videoUrl,
  dependencies = []
}: TechArticleProps) {
  const pathname = usePathname()
  const url = `${siteConfig.url}${pathname}`
  
  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': title,
    'description': description,
    'image': images.length > 0 ? images : [siteConfig.ogImage],
    'datePublished': datePublished,
    'dateModified': dateModified,
    'author': {
      '@type': 'Person',
      'name': author.name,
      'url': author.url
    },
    'publisher': {
      '@type': 'Organization',
      'name': siteConfig.name,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteConfig.url}/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'keywords': keywords.join(', '),
    ...(videoUrl && {
      'video': {
        '@type': 'VideoObject',
        'name': title,
        'description': description,
        'thumbnailUrl': images[0] || siteConfig.ogImage,
        'uploadDate': datePublished,
        'contentUrl': videoUrl,
        'embedUrl': videoUrl
      }
    }),
    ...(dependencies.length > 0 && {
      'dependencies': dependencies.join(', ')
    })
  }
  
  return (
    <Script id="tech-article-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(techArticleSchema)}
    </Script>
  )
}

export default SEOTechArticleSchema
