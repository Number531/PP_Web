// This is a Server Component - no 'use client' directive needed

import { Metadata } from 'next'
import { siteConfig } from '../seo/metadata-config'

/**
 * Generate enhanced social media tags for better sharing experience
 * 
 * @param title - Page title
 * @param description - Page description
 * @param path - Page path
 * @param image - OG image URL
 * @param type - Content type (website, article, product)
 * @param twitterCard - Twitter card type
 * @returns Metadata object with social media tags
 */
export function generateSocialTags({
  title,
  description,
  path = '',
  image,
  type = 'website',
  twitterCard = 'summary_large_image'
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path}`
  const imageUrl = image || siteConfig.ogImage
  
  return {
    // Open Graph / Facebook
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ],
      locale: 'en_US',
    },
    
    // Twitter
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description: fullDescription,
      site: siteConfig.twitter.handle,
      creator: siteConfig.twitter.handle,
      images: [imageUrl],
    },
    
    // Other social platforms
    other: {
      'pinterest:pinit:media': imageUrl,
      'pinterest:pinit:description': fullDescription,
      'linkedin:title': fullTitle,
      'linkedin:description': fullDescription,
      'linkedin:image': imageUrl,
    }
  }
}

export default generateSocialTags
