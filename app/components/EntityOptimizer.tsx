'use client'

import { useEffect } from 'react'

/**
 * Component to optimize content for Google's Knowledge Graph and entity recognition
 * - Implements entity markup with schema.org
 * - Enhances topical relevance through entity relationships
 * - Improves semantic connections between entities
 */
export function EntityOptimizer() {
  useEffect(() => {
    // Find key entities in the content
    const content = document.querySelector('main')
    if (!content) return
    
    // AI Technology entity
    const aiTechMentions = findTextNodes(content, ['zero-hallucination', 'AI technology', 'artificial intelligence'])
    aiTechMentions.forEach(node => {
      if (node.parentElement && !node.parentElement.hasAttribute('itemscope')) {
        wrapWithEntity(node, 'TechArticle', {
          'about': {
            '@type': 'Thing',
            'name': 'Zero-Hallucination AI Technology'
          }
        })
      }
    })
    
    // Founder entity
    const founderMentions = findTextNodes(content, ['Edwin Gordon', 'founder'])
    founderMentions.forEach(node => {
      if (node.parentElement && !node.parentElement.hasAttribute('itemscope')) {
        wrapWithEntity(node, 'Person', {
          'name': 'Edwin Gordon',
          'jobTitle': 'Founder & CEO',
          'worksFor': {
            '@type': 'Organization',
            'name': 'PSQRD AI'
          }
        })
      }
    })
    
    // Enterprise applications entity
    const enterpriseMentions = findTextNodes(content, ['enterprise', 'business', 'organization'])
    enterpriseMentions.forEach(node => {
      if (node.parentElement && !node.parentElement.hasAttribute('itemscope')) {
        wrapWithEntity(node, 'BusinessAudience', {
          'audienceType': 'Enterprise Organizations'
        })
      }
    })
  }, [])
  
  // Helper function to find text nodes containing specific phrases
  function findTextNodes(element: Element, phrases: string[]): Text[] {
    const texts: Text[] = []
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    
    let node
    while (node = walker.nextNode()) {
      const textContent = node.textContent?.toLowerCase() || ''
      if (phrases.some(phrase => textContent.includes(phrase.toLowerCase()))) {
        texts.push(node as Text)
      }
    }
    
    return texts
  }
  
  // Helper function to wrap text with schema.org entity markup
  function wrapWithEntity(textNode: Text, entityType: string, properties: Record<string, any>) {
    const span = document.createElement('span')
    span.setAttribute('itemscope', '')
    span.setAttribute('itemtype', `https://schema.org/${entityType}`)
    
    // Add properties as meta tags
    Object.entries(properties).forEach(([key, value]) => {
      if (typeof value === 'object') {
        const meta = document.createElement('meta')
        meta.setAttribute('itemprop', key)
        meta.setAttribute('content', JSON.stringify(value))
        span.appendChild(meta)
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute('itemprop', key)
        meta.setAttribute('content', String(value))
        span.appendChild(meta)
      }
    })
    
    // Replace the text node with our enhanced span
    const parent = textNode.parentNode
    if (parent) {
      span.appendChild(textNode)
      parent.appendChild(span)
    }
  }
  
  return null
}
