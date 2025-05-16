'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Component to optimize content based on user intent signals
 * - Adapts content based on search query parameters
 * - Highlights relevant sections based on user journey
 * - Enhances content for different stages of awareness
 */
// Inner component that uses useSearchParams
function UserIntentOptimizerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [userIntent, setUserIntent] = useState<string>('discovery')
  
  useEffect(() => {
    // Analyze URL and search parameters to determine user intent
    const referrer = document.referrer.toLowerCase()
    const query = searchParams?.get('q') || searchParams?.get('query') || ''
    const utm_source = searchParams?.get('utm_source') || ''
    const utm_medium = searchParams?.get('utm_medium') || ''
    const utm_campaign = searchParams?.get('utm_campaign') || ''
    
    // Determine user intent based on signals
    let detectedIntent = 'discovery' // Default intent
    
    // Intent: Research - User is researching solutions
    if (
      query.includes('what is') || 
      query.includes('how does') || 
      query.includes('compare') ||
      utm_campaign.includes('research') ||
      pathname.includes('/learn') ||
      pathname.includes('/blog')
    ) {
      detectedIntent = 'research'
    }
    
    // Intent: Evaluation - User is evaluating solutions
    else if (
      query.includes('vs') || 
      query.includes('review') || 
      query.includes('compare') ||
      utm_campaign.includes('comparison') ||
      pathname.includes('/products') ||
      pathname.includes('/features')
    ) {
      detectedIntent = 'evaluation'
    }
    
    // Intent: Purchase - User is ready to purchase
    else if (
      query.includes('buy') || 
      query.includes('price') || 
      query.includes('demo') ||
      utm_campaign.includes('purchase') ||
      pathname.includes('/pricing') ||
      pathname.includes('/demo')
    ) {
      detectedIntent = 'purchase'
    }
    
    // Intent: Support - User needs help
    else if (
      query.includes('help') || 
      query.includes('support') || 
      query.includes('how to') ||
      utm_campaign.includes('support') ||
      pathname.includes('/support') ||
      pathname.includes('/help')
    ) {
      detectedIntent = 'support'
    }
    
    setUserIntent(detectedIntent)
    
    // Optimize page content based on detected intent
    optimizeForIntent(detectedIntent)
  }, [pathname, searchParams])
  
  // Function to optimize content based on user intent
  function optimizeForIntent(intent: string) {
    // Find sections that match the user intent
    const allSections = document.querySelectorAll('section, article, div[data-section]')
    
    // Map intents to relevant keywords
    const intentKeywords: Record<string, string[]> = {
      'discovery': ['overview', 'introduction', 'about', 'learn'],
      'research': ['how it works', 'technology', 'approach', 'methodology'],
      'evaluation': ['features', 'benefits', 'comparison', 'vs', 'pricing'],
      'purchase': ['pricing', 'plans', 'demo', 'contact', 'get started'],
      'support': ['help', 'support', 'faq', 'documentation', 'guide']
    }
    
    // Get keywords for the current intent
    const keywords = intentKeywords[intent] || []
    
    // Find sections that match the intent
    allSections.forEach(section => {
      const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const sectionText = section.textContent?.toLowerCase() || ''
      
      // Check if section matches the current intent
      const matchesIntent = keywords.some(keyword => 
        sectionText.includes(keyword.toLowerCase()) ||
        Array.from(headings).some(h => h.textContent?.toLowerCase().includes(keyword.toLowerCase()))
      )
      
      if (matchesIntent) {
        // Highlight sections that match the intent
        section.setAttribute('data-intent-match', 'true')
        
        // Add subtle visual enhancement
        if (!section.classList.contains('intent-optimized')) {
          section.classList.add('intent-optimized')
          
          // Add a subtle border or background based on the theme
          const currentStyle = window.getComputedStyle(section)
          const backgroundColor = currentStyle.backgroundColor
          
          // Only add styling if it doesn't already have a distinct background
          if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
            if (section instanceof HTMLElement) {
              section.style.boxShadow = 'inset 0 0 0 1px rgba(124, 58, 237, 0.1)'
              section.style.background = 'linear-gradient(rgba(124, 58, 237, 0.02), rgba(124, 58, 237, 0))'
            }
          }
        }
      }
    })
    
    // Add intent-specific meta tags for better analytics
    let metaIntent = document.querySelector('meta[name="detected-intent"]')
    if (!metaIntent) {
      metaIntent = document.createElement('meta')
      metaIntent.setAttribute('name', 'detected-intent')
      document.head.appendChild(metaIntent)
    }
    metaIntent.setAttribute('content', intent)
  }
  
  return null
}

// Main component wrapped in Suspense
export function UserIntentOptimizer() {
  return (
    <Suspense fallback={null}>
      <UserIntentOptimizerInner />
    </Suspense>
  )
}
