'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingPlaceholder } from '../components/ui/LoadingPlaceholder'
import { EnhancedOrganizationSchema, EnhancedWebsiteSchema } from '../components/EnhancedStructuredData'

// Dynamically import the client component with no SSR
// This prevents hydration issues with the 3D components
const AboutPage = dynamic(() => import("./AboutPage"), {
  ssr: false,
  loading: () => <LoadingPlaceholder text="Loading experience..." height="h-screen" />,
})

export function ClientAboutPage() {
  return (
    <>
      {/* Enhanced structured data for better SEO */}
      <EnhancedOrganizationSchema />
      <EnhancedWebsiteSchema />
      
      <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
        <AboutPage />
      </Suspense>
    </>
  )
}
