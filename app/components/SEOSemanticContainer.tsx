'use client'

import React from 'react'

interface SEOSemanticContainerProps {
  children: React.ReactNode
  type: 'main' | 'section' | 'article' | 'aside' | 'nav' | 'header' | 'footer'
  id?: string
  className?: string
  ariaLabel?: string
  ariaLabelledby?: string
  role?: string
  itemScope?: boolean
  itemType?: string
}

/**
 * SEOSemanticContainer Component
 * 
 * Enhances content with proper semantic HTML elements and ARIA attributes
 * to improve accessibility and SEO
 */
export function SEOSemanticContainer({
  children,
  type,
  id,
  className = '',
  ariaLabel,
  ariaLabelledby,
  role,
  itemScope = false,
  itemType
}: SEOSemanticContainerProps) {
  const semanticProps = {
    id,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    role,
    ...(itemScope && { itemScope: true }),
    ...(itemType && { itemType: `https://schema.org/${itemType}` })
  }
  
  switch (type) {
    case 'main':
      return <main {...semanticProps}>{children}</main>
    case 'section':
      return <section {...semanticProps}>{children}</section>
    case 'article':
      return <article {...semanticProps}>{children}</article>
    case 'aside':
      return <aside {...semanticProps}>{children}</aside>
    case 'nav':
      return <nav {...semanticProps}>{children}</nav>
    case 'header':
      return <header {...semanticProps}>{children}</header>
    case 'footer':
      return <footer {...semanticProps}>{children}</footer>
    default:
      return <div {...semanticProps}>{children}</div>
  }
}

export default SEOSemanticContainer
