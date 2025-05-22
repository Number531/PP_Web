'use client'

import { useEffect } from 'react'

/**
 * Blog-specific content optimizer that doesn't add data attributes
 * to prevent hydration mismatches between server and client rendering
 */
export function BlogContentOptimizer() {
  useEffect(() => {
    // Add semantic HTML5 elements to improve content structure
    const mainContent = document.querySelector('main')
    if (mainContent) {
      // Find large text blocks
      const paragraphs = mainContent.querySelectorAll('p')
      
      paragraphs.forEach(p => {
        // Remove any data attributes that might cause hydration issues
        if (p.hasAttribute('data-entity')) {
          p.removeAttribute('data-entity')
        }
        
        if (p.hasAttribute('data-topic')) {
          p.removeAttribute('data-topic')
        }
        
        // Enhance content with semantic markup without adding schema.org attributes
        if (p.textContent && p.textContent.length > 100) {
          // Look for definition-like content
          if (p.textContent.match(/\b(is|are|refers to|defined as)\b/)) {
            const parent = p.parentElement
            if (parent && !parent.matches('section, article, aside')) {
              // Wrap in semantic elements without schema.org attributes
              const section = document.createElement('section')
              section.className = p.className
              p.parentNode?.insertBefore(section, p)
              section.appendChild(p)
            }
          }
        }
      })
    }
  }, [])
  
  return null
}
