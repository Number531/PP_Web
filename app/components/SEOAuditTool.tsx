'use client'

import { useState, useEffect } from 'react'

interface SEOIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  recommendation: string
  impact: 'high' | 'medium' | 'low'
}

/**
 * SEOAuditTool Component
 * 
 * Performs client-side SEO audits to identify common issues
 * Only used in development mode to help improve SEO
 */
export function SEOAuditTool() {
  const [issues, setIssues] = useState<SEOIssue[]>([])
  const [isVisible, setIsVisible] = useState(false)
  
  // Only run in development mode
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    
    // Run SEO audit
    const runAudit = () => {
      const newIssues: SEOIssue[] = []
      
      // Check for title tag
      const titleElement = document.querySelector('title')
      if (!titleElement) {
        newIssues.push({
          id: 'missing-title',
          type: 'error',
          message: 'Missing page title',
          recommendation: 'Add a title tag with 50-60 characters',
          impact: 'high'
        })
      } else if (titleElement.textContent && (
        titleElement.textContent.length < 10 || 
        titleElement.textContent.length > 60
      )) {
        newIssues.push({
          id: 'title-length',
          type: 'warning',
          message: `Title length (${titleElement.textContent.length} chars) outside recommended range`,
          element: titleElement.textContent,
          recommendation: 'Adjust title length to 50-60 characters',
          impact: 'medium'
        })
      }
      
      // Check for meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        newIssues.push({
          id: 'missing-description',
          type: 'error',
          message: 'Missing meta description',
          recommendation: 'Add a meta description with 150-160 characters',
          impact: 'high'
        })
      } else {
        const content = metaDescription.getAttribute('content')
        if (content && (content.length < 50 || content.length > 160)) {
          newIssues.push({
            id: 'description-length',
            type: 'warning',
            message: `Meta description length (${content.length} chars) outside recommended range`,
            element: content,
            recommendation: 'Adjust description length to 150-160 characters',
            impact: 'medium'
          })
        }
      }
      
      // Check for heading structure
      const h1Elements = document.querySelectorAll('h1')
      if (h1Elements.length === 0) {
        newIssues.push({
          id: 'missing-h1',
          type: 'error',
          message: 'Missing H1 heading',
          recommendation: 'Add a single H1 heading that includes your primary keyword',
          impact: 'high'
        })
      } else if (h1Elements.length > 1) {
        newIssues.push({
          id: 'multiple-h1',
          type: 'warning',
          message: `Multiple H1 headings found (${h1Elements.length})`,
          recommendation: 'Use only one H1 heading per page',
          impact: 'medium'
        })
      }
      
      // Check for canonical URL
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        newIssues.push({
          id: 'missing-canonical',
          type: 'warning',
          message: 'Missing canonical URL',
          recommendation: 'Add a canonical URL to prevent duplicate content issues',
          impact: 'medium'
        })
      }
      
      // Check for structured data
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]')
      if (structuredData.length === 0) {
        newIssues.push({
          id: 'missing-structured-data',
          type: 'warning',
          message: 'No structured data found',
          recommendation: 'Add relevant structured data (Organization, Product, FAQ, etc.)',
          impact: 'medium'
        })
      }
      
      // Check for alt attributes on images
      const images = document.querySelectorAll('img')
      const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'))
      if (imagesWithoutAlt.length > 0) {
        newIssues.push({
          id: 'images-missing-alt',
          type: 'error',
          message: `${imagesWithoutAlt.length} images missing alt attributes`,
          recommendation: 'Add descriptive alt text to all images',
          impact: 'high'
        })
      }
      
      // Check for mobile viewport
      const viewport = document.querySelector('meta[name="viewport"]')
      if (!viewport) {
        newIssues.push({
          id: 'missing-viewport',
          type: 'error',
          message: 'Missing viewport meta tag',
          recommendation: 'Add viewport meta tag for mobile optimization',
          impact: 'high'
        })
      }
      
      // Check for robots meta tag
      const robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        newIssues.push({
          id: 'missing-robots',
          type: 'info',
          message: 'Missing robots meta tag',
          recommendation: 'Consider adding robots meta tag to control indexing',
          impact: 'low'
        })
      }
      
      setIssues(newIssues)
    }
    
    // Run audit after page load
    if (document.readyState === 'complete') {
      setTimeout(runAudit, 1000) // Delay to ensure all content is loaded
    } else {
      window.addEventListener('load', () => setTimeout(runAudit, 1000))
    }
    
    // Add keyboard shortcut to toggle visibility (Ctrl+Shift+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development' || !isVisible || issues.length === 0) {
    return null
  }
  
  return (
    <div className="fixed bottom-0 right-0 z-50 w-96 max-h-[80vh] overflow-auto bg-white shadow-lg border border-gray-200 rounded-tl-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">SEO Audit Results</h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      
      <div className="space-y-4">
        {issues.map(issue => (
          <div
            key={issue.id}
            className={`p-3 rounded ${
              issue.type === 'error' ? 'bg-red-50 border-l-4 border-red-500' :
              issue.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
              'bg-blue-50 border-l-4 border-blue-500'
            }`}
          >
            <div className="flex items-start">
              <span
                className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${
                  issue.type === 'error' ? 'bg-red-500' :
                  issue.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}
              />
              <div>
                <p className="font-medium">{issue.message}</p>
                {issue.element && (
                  <p className="text-sm mt-1 text-gray-600 truncate">
                    {issue.element}
                  </p>
                )}
                <p className="text-sm mt-2">
                  <span className="font-medium">Recommendation:</span> {issue.recommendation}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Impact:</span> {issue.impact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Press Ctrl+Shift+S to toggle this panel
      </div>
    </div>
  )
}

export default SEOAuditTool
