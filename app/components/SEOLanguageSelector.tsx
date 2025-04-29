'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { siteConfig } from '../seo/metadata-config'

/**
 * SEO Language Selector Component
 * 
 * Provides language selection with proper hreflang implementation
 * for improved international SEO
 */
export function SEOLanguageSelector({
  className = '',
  showLabel = true,
  compact = false
}: {
  className?: string
  showLabel?: boolean
  compact?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState('en-US')
  
  // Get the current locale from the pathname
  useEffect(() => {
    const locale = pathname.startsWith('/es') 
      ? 'es-ES' 
      : pathname.startsWith('/fr')
        ? 'fr-FR'
        : 'en-US'
    
    setCurrentLocale(locale)
  }, [pathname])
  
  // Handle language change
  const handleLanguageChange = (locale: string) => {
    // Get the path without the locale prefix
    let newPath = pathname
    if (pathname.startsWith('/es') || pathname.startsWith('/fr')) {
      newPath = pathname.substring(3)
    }
    
    // Add the new locale prefix
    if (locale === 'en-US') {
      router.push(newPath)
    } else if (locale === 'es-ES') {
      router.push(`/es${newPath}`)
    } else if (locale === 'fr-FR') {
      router.push(`/fr${newPath}`)
    }
  }
  
  // Generate hreflang links for SEO
  useEffect(() => {
    // Get the path without the locale prefix
    let basePath = pathname
    if (pathname.startsWith('/es') || pathname.startsWith('/fr')) {
      basePath = pathname.substring(3)
    }
    
    // Add hreflang links to head
    const head = document.head
    
    // Remove any existing hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())
    
    // Add new hreflang links
    const locales = ['en-US', 'es-ES', 'fr-FR']
    locales.forEach(locale => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = locale.split('-')[0]
      
      if (locale === 'en-US') {
        link.href = `${siteConfig.url}${basePath}`
      } else if (locale === 'es-ES') {
        link.href = `${siteConfig.url}/es${basePath}`
      } else if (locale === 'fr-FR') {
        link.href = `${siteConfig.url}/fr${basePath}`
      }
      
      head.appendChild(link)
    })
    
    // Add x-default hreflang
    const defaultLink = document.createElement('link')
    defaultLink.rel = 'alternate'
    defaultLink.hreflang = 'x-default'
    defaultLink.href = `${siteConfig.url}${basePath}`
    head.appendChild(defaultLink)
  }, [pathname])
  
  if (compact) {
    return (
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={`p-1 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-sm ${className}`}
        aria-label="Select language"
      >
        <option value="en-US">EN</option>
        <option value="es-ES">ES</option>
        <option value="fr-FR">FR</option>
      </select>
    )
  }
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && <span className="text-sm">Language:</span>}
      <div className="flex space-x-1">
        <button
          onClick={() => handleLanguageChange('en-US')}
          className={`px-2 py-1 text-sm rounded ${currentLocale === 'en-US' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          aria-current={currentLocale === 'en-US' ? 'page' : undefined}
        >
          English
        </button>
        <button
          onClick={() => handleLanguageChange('es-ES')}
          className={`px-2 py-1 text-sm rounded ${currentLocale === 'es-ES' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          aria-current={currentLocale === 'es-ES' ? 'page' : undefined}
        >
          Español
        </button>
        <button
          onClick={() => handleLanguageChange('fr-FR')}
          className={`px-2 py-1 text-sm rounded ${currentLocale === 'fr-FR' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          aria-current={currentLocale === 'fr-FR' ? 'page' : undefined}
        >
          Français
        </button>
      </div>
    </div>
  )
}

export default SEOLanguageSelector
