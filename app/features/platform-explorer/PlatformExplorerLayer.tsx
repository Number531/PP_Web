"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"
import type { ProductFeature } from "../../shared/types"

// Dynamically import components
const PlatformExplorer = dynamic(
  () => import("./PlatformExplorer").then((mod) => ({ default: mod.PlatformExplorer })),
  {
    ssr: false,
  },
)

const FeaturePanel = dynamic(() => import("./FeaturePanel").then((mod) => ({ default: mod.FeaturePanel })), {
  ssr: false,
})

const ExplorerModeIndicator = dynamic(
  () => import("./ExplorerModeIndicator").then((mod) => ({ default: mod.ExplorerModeIndicator })),
  { ssr: false },
)

interface PlatformExplorerLayerProps {
  scrollProgress: number
  isVisible: boolean
  isActive: boolean
  onToggle: () => void
  selectedFeature: ProductFeature | null
  onSelectFeature: (feature: ProductFeature) => void
}

export function PlatformExplorerLayer({
  scrollProgress,
  isVisible,
  isActive,
  onToggle,
  selectedFeature,
  onSelectFeature,
}: PlatformExplorerLayerProps) {
  // Only render when the main UI is visible
  if (!isVisible) return null

  return (
    <>
      <Suspense fallback={null}>
        <ExplorerModeIndicator isActive={isActive} />
      </Suspense>

      <Suspense fallback={null}>
        <PlatformExplorer isActive={isActive} onToggle={onToggle} />
      </Suspense>

      {selectedFeature && (
        <Suspense
          fallback={<LoadingPlaceholder text="Loading feature details..." className="fixed bottom-16 right-4 w-96" />}
        >
          <FeaturePanel isActive={isActive} title={selectedFeature.title} description={selectedFeature.description} />
        </Suspense>
      )}

      {/* The 3D markers are rendered in the Scene component */}
      {isActive && selectedFeature && (
        <span className="sr-only">Platform explorer is active, viewing information about {selectedFeature.title}</span>
      )}
    </>
  )
}

export default PlatformExplorerLayer
