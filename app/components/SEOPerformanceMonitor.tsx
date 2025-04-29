'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PerformanceMetrics {
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  fcp: number | null
}

/**
 * SEO Performance Monitor Component
 * 
 * Tracks Core Web Vitals and other performance metrics that impact SEO
 * Only runs in development or when explicitly enabled in production
 */
export function SEOPerformanceMonitor({
  enableInProduction = false,
  sendToAnalytics = false,
  showDebugInfo = false
}: {
  enableInProduction?: boolean
  sendToAnalytics?: boolean
  showDebugInfo?: boolean
}) {
  const pathname = usePathname()
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null, // Cumulative Layout Shift
    ttfb: null, // Time to First Byte
    fcp: null  // First Contentful Paint
  })
  
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV !== 'development' && !enableInProduction) {
      return
    }
    
    // Reset metrics when pathname changes
    setMetrics({
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      fcp: null
    })
    
    // Measure Time to First Byte
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    if (navigationEntries.length > 0) {
      const ttfb = navigationEntries[0].responseStart
      setMetrics(prev => ({ ...prev, ttfb }))
    }
    
    // Create a PerformanceObserver for LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      const lcp = lastEntry.startTime
      setMetrics(prev => ({ ...prev, lcp }))
      
      if (sendToAnalytics) {
        sendMetricToAnalytics('LCP', lcp)
      }
    })
    
    // Create a PerformanceObserver for FID
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0] as any; // Type assertion to access processingStart
      const fid = firstEntry.processingStart - firstEntry.startTime;
      setMetrics(prev => ({ ...prev, fid }));
      
      if (sendToAnalytics) {
        sendMetricToAnalytics('FID', fid);
      }
    });
    
    // Create a PerformanceObserver for CLS
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0
      for (const entry of entryList.getEntries()) {
        // @ts-ignore - LayoutShiftAttribution is not in the types
        if (!entry.hadRecentInput) {
          // @ts-ignore - value is not in the types
          clsValue += entry.value
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }))
      
      if (sendToAnalytics) {
        sendMetricToAnalytics('CLS', clsValue)
      }
    })
    
    // Create a PerformanceObserver for FCP
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const firstEntry = entries[0]
      const fcp = firstEntry.startTime
      setMetrics(prev => ({ ...prev, fcp }))
      
      if (sendToAnalytics) {
        sendMetricToAnalytics('FCP', fcp)
      }
    })
    
    // Start observing
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      fidObserver.observe({ type: 'first-input', buffered: true })
      clsObserver.observe({ type: 'layout-shift', buffered: true })
      fcpObserver.observe({ type: 'paint', buffered: true })
    } catch (e) {
      console.error('Performance observer error:', e)
    }
    
    // Clean up observers
    return () => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      fcpObserver.disconnect()
    }
  }, [pathname, enableInProduction, sendToAnalytics])
  
  // Helper function to send metrics to analytics
  const sendMetricToAnalytics = (metricName: string, value: number) => {
    // This would connect to your analytics provider
    // Example: Google Analytics 4, Adobe Analytics, etc.
    console.log(`[Analytics] ${metricName}: ${value}`)
    
    // You would implement actual analytics sending here
    // Example for GA4:
    // window.gtag('event', 'web_vitals', {
    //   metric_id: metricName,
    //   metric_value: value,
    //   metric_delta: 0,
    //   metric_rating: getRating(metricName, value)
    // })
  }
  
  // Get rating (Good, Needs Improvement, Poor) based on Core Web Vitals thresholds
  const getRating = (metric: keyof PerformanceMetrics) => {
    if (metrics[metric] === null) return 'Measuring...'
    
    const value = metrics[metric] as number
    
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'Good' : value <= 4000 ? 'Needs Improvement' : 'Poor'
      case 'fid':
        return value <= 100 ? 'Good' : value <= 300 ? 'Needs Improvement' : 'Poor'
      case 'cls':
        return value <= 0.1 ? 'Good' : value <= 0.25 ? 'Needs Improvement' : 'Poor'
      case 'ttfb':
        return value <= 800 ? 'Good' : value <= 1800 ? 'Needs Improvement' : 'Poor'
      case 'fcp':
        return value <= 1800 ? 'Good' : value <= 3000 ? 'Needs Improvement' : 'Poor'
      default:
        return 'Unknown'
    }
  }
  
  // Only render debug UI if showDebugInfo is true
  if (!showDebugInfo) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-4 rounded-tl-lg text-xs z-50 font-mono">
      <h3 className="font-bold mb-2">Core Web Vitals</h3>
      <ul>
        <li className={`mb-1 ${getRating('lcp') === 'Good' ? 'text-green-400' : getRating('lcp') === 'Needs Improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
          LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'Measuring...'} ({getRating('lcp')})
          {!metrics.lcp && <span className="text-xs ml-1 text-gray-400">(Waiting for largest element to render)</span>}
        </li>
        <li className={`mb-1 ${getRating('fid') === 'Good' ? 'text-green-400' : getRating('fid') === 'Needs Improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
          FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'Measuring...'} ({getRating('fid')})
          {!metrics.fid && <span className="text-xs ml-1 text-gray-400">(Interact with page to measure)</span>}
        </li>
        <li className={`mb-1 ${getRating('cls') === 'Good' ? 'text-green-400' : getRating('cls') === 'Needs Improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
          CLS: {metrics.cls !== null ? metrics.cls.toFixed(3) : 'Measuring...'} ({getRating('cls')})
          {metrics.cls === null && <span className="text-xs ml-1 text-gray-400">(Accumulates as layout shifts occur)</span>}
        </li>
        <li className={`mb-1 ${getRating('ttfb') === 'Good' ? 'text-green-400' : getRating('ttfb') === 'Needs Improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
          TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'Measuring...'} ({getRating('ttfb')})
        </li>
        <li className={`mb-1 ${getRating('fcp') === 'Good' ? 'text-green-400' : getRating('fcp') === 'Needs Improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
          FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'Measuring...'} ({getRating('fcp')})
        </li>
      </ul>
      <div className="text-xs mt-2 opacity-70">
        Path: {pathname}
      </div>
      <div className="text-xs mt-2 text-gray-400">
        <span className="font-bold">Note:</span> Dev mode metrics are less accurate. Run production build for true values.
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 px-2 py-1 bg-purple-600 rounded text-xs hover:bg-purple-700"
      >
        Refresh Metrics
      </button>
    </div>
  )
}

export default SEOPerformanceMonitor
