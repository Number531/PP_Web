'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { ChevronRight } from 'lucide-react'
import { siteConfig } from '../seo/metadata-config'

export function BreadcrumbSchema() {
  const pathname = usePathname()
  
  // Skip on homepage
  if (pathname === '/') return null
  
  // Generate breadcrumb path segments
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`
      return {
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path
      }
    })
  ]
  
  // Generate structured data for breadcrumbs
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`
    }))
  }
  
  // Only return the structured data for SEO, no visible breadcrumbs
  return (
    <Script id="breadcrumb-schema" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(breadcrumbsSchema)}
    </Script>
  )
}
