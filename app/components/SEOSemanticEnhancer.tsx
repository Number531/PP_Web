'use client'

import { useEffect } from 'react'

/**
 * Component to enhance semantic HTML and accessibility
 * - Improves heading hierarchy
 * - Adds ARIA attributes where missing
 * - Enhances semantic structure
 */
export function SEOSemanticEnhancer() {
  useEffect(() => {
    // Check and fix heading hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    
    // Ensure only one H1 per page
    const h1Elements = headings.filter(h => h.tagName === 'H1')
    if (h1Elements.length > 1) {
      console.warn('Multiple H1 elements detected. This may impact SEO.')
    }
    
    // Add missing alt text to images
    const images = document.querySelectorAll('img:not([alt])')
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        const fileName = img.src.split('/').pop()?.split('.')[0] || ''
        img.setAttribute('alt', fileName.replace(/[-_]/g, ' ') || 'PSQRD image')
      }
    })
    
    // Add ARIA labels to interactive elements without accessible names
    const buttons = document.querySelectorAll('button:not([aria-label]):not(:has(*)):empty')
    buttons.forEach(button => {
      button.setAttribute('aria-label', 'Button')
    })
    
    // Add role attributes to improve semantic structure
    const mainContent = document.querySelector('main:not([role])')
    if (mainContent) {
      mainContent.setAttribute('role', 'main')
    }
    
    const navElements = document.querySelectorAll('nav:not([aria-label])')
    navElements.forEach(nav => {
      nav.setAttribute('aria-label', 'Main Navigation')
    })
    
    // Add schema.org types to enhance semantic meaning
    const articles = document.querySelectorAll('article:not([itemscope])')
    articles.forEach(article => {
      article.setAttribute('itemscope', '')
      article.setAttribute('itemtype', 'https://schema.org/Article')
    })
    
  }, [])
  
  return null
}
