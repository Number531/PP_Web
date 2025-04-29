'use client'

import { usePathname } from 'next/navigation'
import Head from 'next/head'

/**
 * SEOCanonical Component
 * 
 * Client component that adds a canonical URL link to the page head
 * to prevent duplicate content issues and help search engines understand
 * the preferred version of a page
 */
export function SEOCanonical({
  url,
  path,
  visibleOnPage = true
}: {
  url: string
  path?: string
  visibleOnPage?: boolean
}) {
  const pathname = usePathname()
  const canonicalUrl = `${url}${path || pathname}`
  
  if (!visibleOnPage) {
    return null
  }
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}

export default SEOCanonical
