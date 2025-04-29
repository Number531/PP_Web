'use client'

import { useEffect } from 'react'

/**
 * Performance Monitoring Component
 * 
 * Implements real user monitoring for Core Web Vitals using the web-vitals library.
 * This helps track actual user experience metrics and identify performance issues.
 */
export function PerformanceMonitoring() {
  useEffect(() => {
    // Only run in production and on client side
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Dynamic import to avoid bundling with the main app
      import('web-vitals').then(({ getCLS, getFID, getLCP, getTTFB, getFCP }) => {
        // Function to send metrics to analytics
        const sendToAnalytics = ({ name, delta, id, value }: { name: string, delta: number, id: string, value: number }) => {
          // In a real app, send to your analytics service
          // For now, just log to console in development
          console.log(`Web Vitals: ${name}`, {
            value: Math.round(value * 100) / 100,
            delta: Math.round(delta * 100) / 100,
            id
          })
          
          // Example of sending to Google Analytics
          // window.gtag?.('event', name, {
          //   event_category: 'Web Vitals',
          //   event_label: id,
          //   value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          //   non_interaction: true,
          // })
        }
        
        // Monitor Core Web Vitals
        getCLS(sendToAnalytics)  // Cumulative Layout Shift
        getFID(sendToAnalytics)  // First Input Delay
        getLCP(sendToAnalytics)  // Largest Contentful Paint
        getTTFB(sendToAnalytics) // Time to First Byte
        getFCP(sendToAnalytics)  // First Contentful Paint
      })
    }
  }, [])
  
  // This component doesn't render anything
  return null
}

export default PerformanceMonitoring
