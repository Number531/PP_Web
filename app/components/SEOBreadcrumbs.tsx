'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '../seo/metadata-config'

interface SEOBreadcrumbsProps {
  className?: string
  showHomeIcon?: boolean
  customSegments?: { label: string; href: string }[]
}

/**
 * SEOBreadcrumbs Component
 * 
 * Implements breadcrumb navigation for better user experience and SEO
 * Also includes structured data for breadcrumbs to improve search visibility
 */
export function SEOBreadcrumbs({
  className = '',
  showHomeIcon = true,
  customSegments,
  visibleOnPage = false // New prop to control visibility
}: SEOBreadcrumbsProps & { visibleOnPage?: boolean }) {
  const pathname = usePathname()
  
  // Generate breadcrumb items based on the current path or use custom segments
  const breadcrumbs = customSegments || generateBreadcrumbItems(pathname)
  
  // Create structured data for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href
    }))
  }
  
  return (
    <>
      {/* Breadcrumb navigation - only visible if visibleOnPage is true */}
      {visibleOnPage && (
        <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <svg className="h-4 w-4 text-gray-500 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                
                {index === 0 && showHomeIcon ? (
                  <Link
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="sr-only">{breadcrumb.label}</span>
                  </Link>
                ) : index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      {/* Structured data for breadcrumbs - always included for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

/**
 * Generate breadcrumb items based on the current path
 */
function generateBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Home', href: '/' }]
  
  let currentPath = ''
  segments.forEach(segment => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      label: formatBreadcrumbLabel(segment),
      href: currentPath
    })
  })
  
  return breadcrumbs
}

/**
 * Format breadcrumb label from URL segment
 */
function formatBreadcrumbLabel(segment: string) {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default SEOBreadcrumbs
