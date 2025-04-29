'use client'

import { useEffect } from 'react'

/**
 * SEO Security Headers Component
 * 
 * Implements security headers in a way that's compatible with search engine crawlers
 * while maintaining strong security posture
 */
export function SEOSecurityHeaders({
  enableCSP = true,
  enableReferrerPolicy = true,
  enablePermissionsPolicy = true
}: {
  enableCSP?: boolean
  enableReferrerPolicy?: boolean
  enablePermissionsPolicy?: boolean
}) {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return
    
    // Only implement in production to avoid development issues
    if (process.env.NODE_ENV !== 'production') return
    
    // Create a meta element for CSP
    if (enableCSP) {
      const cspMeta = document.createElement('meta')
      cspMeta.httpEquiv = 'Content-Security-Policy'
      
      // Define a CSP that allows search engine crawlers but restricts other content
      cspMeta.content = [
        // Allow scripts from same origin and specific CDNs
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
        
        // Allow styles from same origin and inline styles (needed for many frameworks)
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        
        // Allow images from same origin and common image CDNs
        "img-src 'self' data: https://www.google-analytics.com https://*.googleusercontent.com https://i.ytimg.com",
        
        // Allow fonts from Google Fonts and same origin
        "font-src 'self' https://fonts.gstatic.com",
        
        // Allow connections to analytics and other necessary services
        "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
        
        // Frame ancestors - restrict embedding of your site
        "frame-ancestors 'self'",
        
        // Base URI restriction
        "base-uri 'self'",
        
        // Form action restriction
        "form-action 'self'",
        
        // Object security policy
        "object-src 'none'",
        
        // Default fallback
        "default-src 'self'"
      ].join('; ')
      
      document.head.appendChild(cspMeta)
    }
    
    // Referrer Policy - control what information is sent in the Referer header
    if (enableReferrerPolicy) {
      const referrerMeta = document.createElement('meta')
      referrerMeta.name = 'referrer'
      // 'strict-origin-when-cross-origin' is a good balance between security and analytics
      referrerMeta.content = 'strict-origin-when-cross-origin'
      document.head.appendChild(referrerMeta)
    }
    
    // Permissions Policy - control which browser features can be used
    if (enablePermissionsPolicy) {
      const permissionsMeta = document.createElement('meta')
      permissionsMeta.httpEquiv = 'Permissions-Policy'
      permissionsMeta.content = [
        // Allow camera and microphone only from same origin
        "camera=self",
        "microphone=self",
        
        // Disable geolocation
        "geolocation=()",
        
        // Disable payment API
        "payment=()",
        
        // Allow fullscreen from same origin
        "fullscreen=self"
      ].join(', ')
      document.head.appendChild(permissionsMeta)
    }
    
    // Clean up function
    return () => {
      if (enableCSP) {
        document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.remove()
      }
      if (enableReferrerPolicy) {
        document.querySelector('meta[name="referrer"]')?.remove()
      }
      if (enablePermissionsPolicy) {
        document.querySelector('meta[http-equiv="Permissions-Policy"]')?.remove()
      }
    }
  }, [enableCSP, enableReferrerPolicy, enablePermissionsPolicy])
  
  // This component doesn't render anything visible
  return null
}

export default SEOSecurityHeaders
