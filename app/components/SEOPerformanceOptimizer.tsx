'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

/**
 * SEOPerformanceOptimizer component to improve Core Web Vitals
 * - Implements resource hints (preconnect, preload)
 * - Adds font optimization
 * - Manages layout stability
 * - Tracks performance metrics
 */
export function SEOPerformanceOptimizer() {
  const pathname = usePathname()

  // Handle route changes to report performance metrics
  useEffect(() => {
    // Report Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Use web-vitals library when available
      // This is a simplified version for demonstration
      const reportWebVitals = () => {
        const metrics = performance.getEntriesByType('navigation')
        if (metrics.length > 0) {
          const navigationEntry = metrics[0] as PerformanceNavigationTiming
          
          // Calculate LCP (approximation)
          const lcpEntry = performance.getEntriesByType('paint')
            .find(entry => entry.name === 'largest-contentful-paint')
          
          // Log metrics (in production, send to analytics)
          console.log('Performance metrics:', {
            url: pathname,
            FCP: navigationEntry.responseStart,
            LCP: lcpEntry ? lcpEntry.startTime : null,
            CLS: 0, // Would need web-vitals library for accurate CLS
            FID: navigationEntry.domInteractive - navigationEntry.domContentLoadedEventStart,
            TTFB: navigationEntry.responseStart - navigationEntry.requestStart,
          })
        }
      }
      
      // Report after page load
      window.addEventListener('load', reportWebVitals)
      
      return () => {
        window.removeEventListener('load', reportWebVitals)
      }
    }
  }, [pathname])

  return (
    <>
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      
      {/* Preload critical assets */}
      <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="/logo.png" 
        as="image" 
      />
      
      {/* DNS prefetch for third-party services */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Add web-vitals script for accurate measurement */}
      <Script
        id="web-vitals"
        strategy="afterInteractive"
        src="https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js"
      />
      
      {/* Add structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": "https://psqrd.ai" + pathname,
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["article", "h1", ".main-content"]
            },
            "isAccessibleForFree": "True"
          })
        }}
      />
    </>
  )
}

/**
 * Optimized image component for SEO
 * - Adds structured data for images
 * - Ensures proper alt text
 * - Implements lazy loading appropriately
 */
export function SEOImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  caption,
  className
}: { 
  src: string; 
  alt: string; 
  width: number; 
  height: number; 
  priority?: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        loading={priority ? "eager" : "lazy"} 
        decoding={priority ? "sync" : "async"}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {caption && <figcaption>{caption}</figcaption>}
      
      {/* Add image structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": src,
            "description": alt,
            "caption": caption || alt,
            "width": width,
            "height": height
          })
        }}
      />
    </figure>
  )
}
