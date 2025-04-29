'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingPlaceholder } from '../components/ui/LoadingPlaceholder'

// Dynamically import the client component with no SSR
// This prevents hydration issues with the 3D components
const CareersPage = dynamic(() => import("./CareersPage"), {
  ssr: false,
  loading: () => <LoadingPlaceholder text="Loading experience..." height="h-screen" />,
})

export function ClientCareersPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <CareersPage />
    </Suspense>
  )
}
