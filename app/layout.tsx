import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./context/auth-context"
import { generateEnhancedSEO } from "./components/SEOMetadata"
import { SEOStructuredData } from "./components/SEOStructuredData"
import { ProductSchema } from "./components/ProductSchema"
import { FAQSchema } from "./components/FAQSchema"
import { ImageOptimizer } from "./components/ImageOptimizer"
import { BreadcrumbSchema } from "./components/BreadcrumbSchema"
import { SEOSemanticEnhancer } from "./components/SEOSemanticEnhancer"
import { ContentOptimizer } from "./components/ContentOptimizer"
import { EntityOptimizer } from "./components/EntityOptimizer"
import { ContentGapAnalyzer } from "./components/ContentGapAnalyzer"
import { UserIntentOptimizer } from "./components/UserIntentOptimizer"
import { Suspense } from "react"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { CookieConsent } from "./components/CookieConsent"
import { AnimationProvider } from "./shared/state/AnimationContext"
import Script from "next/script"
import { PersistentHeader } from "./components/PersistentHeader"
import { ResponsiveTester } from "./components/ResponsiveTester"
import { WebGLErrorHandler } from "./components/WebGLErrorHandler"
import { SEOPerformanceOptimizer } from "./components/SEOPerformanceOptimizer"
import { PerformanceMonitoring } from "./components/PerformanceMonitoring"
import { CoreWebVitalsMonitor } from "./components/CoreWebVitalsMonitor"
import { SEOAuditTool } from "./components/SEOAuditTool"
import { SEOPerformanceMonitor } from "./components/SEOPerformanceMonitor"
import SEOCanonicalComponent from "./components/SEOCanonicalComponent"
import { siteConfig } from "./seo/metadata-config"

// Load Inter with specific subsets and weights for a premium look
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

// Generate enhanced metadata for the root layout
export const metadata = generateEnhancedSEO({
  title: "Enterprise AI Solutions",
  description:
    "Hallucination-free AI with guaranteed accuracy for enterprise applications. Transform your operations with source-transparent, reliable AI.",
  keywords: [
    "enterprise AI", 
    "accurate AI", 
    "AI solutions", 
    "transparent AI", 
    "reliable AI",
    "hallucination-free AI"
  ],
  publishedTime: "2023-01-01T00:00:00Z",
  modifiedTime: "2025-04-22T00:00:00Z",
  section: "Home"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-black`}>
        <AnimationProvider>
          <ErrorBoundary>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {/* Persistent header that doesn't reload during page transitions */}
                <PersistentHeader />
                <BreadcrumbSchema />
                <Suspense fallback={null}>{children}</Suspense>
                <CookieConsent />
                {process.env.NODE_ENV !== "production" && <ResponsiveTester />}
                <WebGLErrorHandler />
                {/* SEO Components */}
                {/* <SEOPerformanceOptimizer /> */}
                {/* Core Web Vitals monitoring temporarily hidden */}
                {/* <PerformanceMonitoring />
                <CoreWebVitalsMonitor /> */}
                <SEOStructuredData />
                <ProductSchema />
                <FAQSchema />
                <ImageOptimizer />
                <SEOSemanticEnhancer />
                <ContentOptimizer />
                <EntityOptimizer />
                <UserIntentOptimizer />
                {process.env.NODE_ENV !== "production" && <ContentGapAnalyzer />}
                {process.env.NODE_ENV !== "production" && <SEOAuditTool />}
                
                {/* SEO Performance Monitor temporarily hidden */}
                {/* <SEOPerformanceMonitor 
                  enableInProduction={true}
                  sendToAnalytics={process.env.NODE_ENV === "production"}
                  showDebugInfo={process.env.NODE_ENV !== "production"}
                /> */}
                
                {/* Ensure canonical URLs are properly set */}
                <SEOCanonicalComponent url={siteConfig.url} />
              </ThemeProvider>
            </AuthProvider>
          </ErrorBoundary>
        </AnimationProvider>

        {/* Performance monitoring script - only in production */}
        {process.env.NODE_ENV === "production" && (
          <Script id="performance-monitoring" strategy="afterInteractive">
            {`
              try {
                const { initPerformanceMonitoring } = require('@/app/utils/performance-monitoring');
                const { initializeErrorHandlers } = require('@/app/utils/error-reporting');
                
                // Initialize performance monitoring with animation-friendly settings
                initPerformanceMonitoring({ 
                  preserveAnimations: true,
                  throttleAnimations: false,
                  trackCoreWebVitals: true
                });
                
                // Initialize global error handlers
                initializeErrorHandlers();
                
                // Report Core Web Vitals to analytics
                if ('web-vitals' in window) {
                  import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
                    getCLS(sendToAnalytics);
                    getFID(sendToAnalytics);
                    getLCP(sendToAnalytics);
                    getFCP(sendToAnalytics);
                    getTTFB(sendToAnalytics);
                  });
                }
                
                function sendToAnalytics(metric) {
                  // Replace with your analytics provider's code
                  console.log('Core Web Vitals:', metric.name, metric.value);
                  
                  // Example for Google Analytics 4
                  if (window.gtag) {
                    window.gtag('event', 'web_vitals', {
                      metric_id: metric.name,
                      metric_value: metric.value,
                      metric_delta: metric.delta,
                      metric_rating: metric.rating
                    });
                  }
                }
              } catch (e) {
                console.error('Failed to initialize monitoring:', e);
              }
            `}
          </Script>
        )}
        
        {/* Structured Data for Organization */}
        <Script id="organization-schema" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "${siteConfig.name}",
              "url": "${siteConfig.url}",
              "logo": "${siteConfig.url}/logo.svg",
              "sameAs": [
                "${siteConfig.socialLinks.twitter}",
                "${siteConfig.socialLinks.linkedin}",
                "${siteConfig.socialLinks.github}"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "${siteConfig.contact.phone}",
                "contactType": "customer service",
                "availableLanguage": ["English"]
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
