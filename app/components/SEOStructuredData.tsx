'use client'

import { usePathname } from 'next/navigation'
import { siteConfig } from '../seo/metadata-config'

/**
 * SEOStructuredData component
 * 
 * Provides structured data (JSON-LD) for better search engine understanding
 * and rich snippet opportunities in search results.
 */
export function SEOStructuredData() {
  const pathname = usePathname()
  const currentUrl = `${siteConfig.url}${pathname}`
  
  // Generate breadcrumb items based on the current path
  const breadcrumbItems = generateBreadcrumbItems(pathname)
  
  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url,
            "logo": `${siteConfig.url}/logo.png`,
            "sameAs": [
              "https://twitter.com/psqrd_ai",
              "https://linkedin.com/company/psqrd-ai",
              "https://github.com/psqrd-ai",
            ],
            "description": "PSQRD provides hallucination-free AI with guaranteed accuracy for enterprise applications.",
            "foundingDate": "2023",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Francisco",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "contact@psqrd.ai"
            }
          })
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteConfig.name,
            "url": siteConfig.url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            },
            "inLanguage": "en-US",
            "copyrightYear": 2025,
            "dateModified": "2025-04-22T00:00:00Z"
          })
        }}
      />
      
      {/* Breadcrumb Schema */}
      {breadcrumbItems.length > 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
              }))
            })
          }}
        />
      )}
      
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": currentUrl,
            "name": getPageTitle(pathname),
            "description": getPageDescription(pathname),
            "isPartOf": {
              "@type": "WebSite",
              "name": siteConfig.name,
              "url": siteConfig.url
            },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["article", "h1", ".main-content"]
            },
            "datePublished": "2023-01-01T00:00:00Z",
            "dateModified": "2025-04-22T00:00:00Z"
          })
        }}
      />
    </>
  )
}

/**
 * Generate breadcrumb items based on the current path
 */
function generateBreadcrumbItems(pathname: string) {
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ name: 'Home', url: siteConfig.url }]
  
  let currentPath = ''
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      name: formatBreadcrumbName(segment),
      url: `${siteConfig.url}${currentPath}`
    })
  })
  
  return breadcrumbs
}

/**
 * Format breadcrumb name from URL segment
 */
function formatBreadcrumbName(segment: string) {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get page title based on pathname
 */
function getPageTitle(pathname: string) {
  const path = pathname.split('/').filter(Boolean)[0] || 'home'
  
  const titles: Record<string, string> = {
    'home': 'Enterprise AI Solutions',
    'about': 'About Us',
    'products': 'Our Platform',
    'careers': 'Join Our Team',
    'contact': 'Contact Us',
    'chat': 'Interactive Chat'
  }
  
  return titles[path] || siteConfig.name
}

/**
 * Get page description based on pathname
 */
function getPageDescription(pathname: string) {
  const path = pathname.split('/').filter(Boolean)[0] || 'home'
  
  const descriptions: Record<string, string> = {
    'home': 'Hallucination-free AI with guaranteed accuracy for enterprise applications.',
    'about': 'Learn about our mission, values, and the team behind our innovative AI solutions.',
    'products': 'Explore our AI platform and solutions designed to transform your business.',
    'careers': 'Join our team of innovators building the future of enterprise AI.',
    'contact': 'Get in touch with our team to learn how we can help your business.',
    'chat': 'Experience our interactive AI chat interface.'
  }
  
  return descriptions[path] || siteConfig.description
}

export default SEOStructuredData
