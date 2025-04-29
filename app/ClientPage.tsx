"use client"
import { useRef, memo, useMemo, Suspense, useEffect } from "react"
import dynamic from "next/dynamic"
import { LoadingPlaceholder } from "./components/ui/LoadingPlaceholder"
import { useAnimationValues, useOptimizedScrollHandler } from "./shared/store/animation-store"
import { useExplorerValues } from "./shared/store/explorer-store"
import { OrganizationSchema, WebsiteSchema } from "./components/JsonLdSchema"

// Dynamically import components that aren't needed immediately
const SphereRenderer = dynamic(
  () => import("./features/sphere/SphereRenderer").then((mod) => ({ default: mod.SphereRenderer })),
  {
    loading: () => <LoadingPlaceholder text="Loading visualization..." height="h-screen" />,
    ssr: false, // Disable SSR for Three.js components
  },
)

// Lazy load components that are not immediately visible
const InfoOverlay = dynamic(() => import("./features/core/InfoOverlay").then((mod) => ({ default: mod.InfoOverlay })), {
  ssr: false,
})

const CompletionIndicator = dynamic(
  () => import("./features/core/CompletionIndicator").then((mod) => ({ default: mod.CompletionIndicator })),
  {
    ssr: false,
  },
)

const CompanyHeader = dynamic(
  () => import("./components/CompanyHeader").then((mod) => ({ default: mod.CompanyHeader })),
  {
    loading: () => <div className="h-16" />, // Reserve space for header
  },
)

const HeroSection = dynamic(
  () => import("./features/company/HeroSection").then((mod) => ({ default: mod.HeroSection })),
  {
    ssr: false,
  },
)

// Lazy load below-the-fold content
const CompanyContent = dynamic(
  () => import("./features/company/CompanyContent").then((mod) => ({ default: mod.CompanyContent })),
  {
    loading: () => <LoadingPlaceholder text="Loading content..." height="h-screen" />,
    ssr: false,
  },
)

const CareerSection = dynamic(
  () => import("./components/CareerSection").then((mod) => ({ default: mod.CareerSection })),
  {
    loading: () => <LoadingPlaceholder text="Loading careers..." height="h-screen" />,
    ssr: false,
  },
)

// Memoize the AppContent component to prevent unnecessary re-renders
const AppContent = memo(function AppContent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollHandlerRef = useRef<() => void>()
  const handleScroll = useOptimizedScrollHandler()

  // Get animation state values using the selector hooks
  const {
    explosionProgress,
    scrollProgress,
    scrollPosition,
    heroVisible,
    animationComplete,
    showContent,
    showCompletionIndicator,
  } = useAnimationValues()

  // Get explorer state values using the selector hooks
  const { isActive: explorerMode, selectedFeature, toggleExplorerMode, selectFeature } = useExplorerValues()

  // Setup scroll event listener with optimized handler
  useEffect(() => {
    // Setup the scrollable area height
    document.body.style.height = "400vh"

    // Add scroll event listener with RAF-based handler for smoother performance
    scrollHandlerRef.current = handleScroll
    window.addEventListener("scroll", scrollHandlerRef.current, { passive: true })

    return () => {
      document.body.style.height = ""
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current)
      }
    }
  }, [handleScroll])

  // Memoize the scroll handler to prevent recreation on each render
  const scrollToContent = useMemo(() => {
    if (showContent && contentRef.current) {
      return () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }
    return undefined
  }, [showContent])

  // Scroll to content when it becomes visible
  useEffect(() => {
    if (showContent && contentRef.current && scrollToContent) {
      // Use setTimeout to ensure DOM is ready
      const timeoutId = setTimeout(scrollToContent, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [showContent, scrollToContent])

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Fixed background with 3D animation */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Suspense fallback={<LoadingPlaceholder text="Loading 3D experience..." height="h-screen" />}>
          <SphereRenderer
            explosionProgress={explosionProgress}
            explorerMode={explorerMode}
            scrollProgress={scrollProgress}
            onSelectFeature={selectFeature}
            selectedFeatureId={selectedFeature?.id || null}
          />
        </Suspense>
      </div>

      {/* Header (always visible) */}
      <CompanyHeader />

      {/* Hero section visible during animation phase */}
      {heroVisible && !showContent && <HeroSection />}

      {/* Completion indicator */}
      <Suspense fallback={null}>{showCompletionIndicator && <CompletionIndicator isVisible={true} />}</Suspense>

      {/* Progress indicator (only shows near completion) */}
      <Suspense fallback={null}>
        <InfoOverlay scrollPosition={scrollPosition} animationComplete={animationComplete} />
      </Suspense>

      {/* Platform explorer UI removed */}

      {/* Scrollable area for animation phase */}
      <div className="h-[400vh]" aria-hidden="true" />

      {/* Company content shown after animation completes */}
      {showContent && (
        <div ref={contentRef}>
          <Suspense fallback={<LoadingPlaceholder text="Loading content..." height="h-screen" />}>
            <CompanyContent isVisible={true} />
          </Suspense>

          {/* Career section - only loaded when needed */}
          <Suspense fallback={<LoadingPlaceholder text="Loading careers..." height="h-screen" />}>
            <CareerSection />
          </Suspense>
        </div>
      )}
    </div>
  )
})

export default function ClientPage() {
  return (
    <>
      {/* Add structured data for better SEO */}
      <OrganizationSchema />
      <WebsiteSchema />

      {/* Rest of the page content */}
      <AppContent />
    </>
  )
}
