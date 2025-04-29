'use client'

import { useEffect, useCallback } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'

interface MetricReport {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
}

/**
 * CoreWebVitalsMonitor
 * 
 * Monitors and reports Core Web Vitals metrics for better SEO performance tracking
 * Integrates with Google Analytics or other analytics platforms if configured
 */
export function CoreWebVitalsMonitor() {
  // Function to determine performance rating based on metric values
  const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    // Thresholds based on Google's Core Web Vitals guidelines
    switch (name) {
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor'
      case 'FID':
      case 'INP':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
      case 'FCP':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor'
      case 'TTFB':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor'
      default:
        return 'needs-improvement'
    }
  }

  // Report metrics to analytics or console
  const reportMetric = useCallback((metric: any) => {
    // Determine the rating
    const rating = getRating(metric.name, metric.value)
    
    // Create a standardized report
    const report: MetricReport = {
      name: metric.name,
      value: Math.round(metric.value),
      rating,
      navigationType: metric.navigationType || 'unknown'
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Core Web Vitals] ${report.name}: ${report.value}ms (${report.rating})`)
    }
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore - gtag might not be typed
      window.gtag?.('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: report.name,
        value: report.value,
        non_interaction: true,
        metric_rating: report.rating,
        metric_delta: metric.delta,
        metric_id: metric.id
      })
    }
    
    // You could also send to your own analytics endpoint
    // fetch('/api/vitals', {
    //   method: 'POST',
    //   body: JSON.stringify(report),
    //   headers: { 'Content-Type': 'application/json' }
    // })
  }, [])

  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return
    
    // Register all Core Web Vitals metrics
    onCLS(reportMetric)
    onFID(reportMetric)
    onLCP(reportMetric)
    onFCP(reportMetric)
    onTTFB(reportMetric)
    onINP(reportMetric)
    
    // Implement automatic performance optimizations
    
    // 1. Preconnect to critical origins
    const preconnectOrigins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]
    
    preconnectOrigins.forEach(origin => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = origin
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
    
    // 2. Lazy load non-critical resources
    const lazyLoadElements = () => {
      const lazyImages = Array.from(document.querySelectorAll('img.lazy-load'))
      const lazyIframes = Array.from(document.querySelectorAll('iframe.lazy-load'))
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.classList.remove('lazy-load')
                imageObserver.unobserve(img)
              }
            }
          })
        })
        
        lazyImages.forEach(img => imageObserver.observe(img))
        
        const iframeObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const iframe = entry.target as HTMLIFrameElement
              if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src
                iframe.classList.remove('lazy-load')
                iframeObserver.unobserve(iframe)
              }
            }
          })
        })
        
        lazyIframes.forEach(iframe => iframeObserver.observe(iframe))
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
          const imgEl = img as HTMLImageElement
          if (imgEl.dataset.src) {
            imgEl.src = imgEl.dataset.src
            imgEl.classList.remove('lazy-load')
          }
        })
        
        lazyIframes.forEach(iframe => {
          const iframeEl = iframe as HTMLIFrameElement
          if (iframeEl.dataset.src) {
            iframeEl.src = iframeEl.dataset.src
            iframeEl.classList.remove('lazy-load')
          }
        })
      }
    }
    
    // Run lazy loading after initial load
    if (document.readyState === 'complete') {
      lazyLoadElements()
    } else {
      window.addEventListener('load', lazyLoadElements)
      return () => window.removeEventListener('load', lazyLoadElements)
    }
  }, [reportMetric])

  // This component doesn't render anything visible
  return null
}

export default CoreWebVitalsMonitor
