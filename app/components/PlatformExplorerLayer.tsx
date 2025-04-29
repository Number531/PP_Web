"use client"

import { PlatformExplorer } from "./PlatformExplorer"
import { FeaturePanel } from "./FeaturePanel"
import { ExplorerModeIndicator } from "./ExplorerModeIndicator"
import type { ProductFeature } from "../data/company-content"

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
      <ExplorerModeIndicator isActive={isActive} />
      <PlatformExplorer isActive={isActive} onToggle={onToggle} />
      {selectedFeature && (
        <FeaturePanel isActive={isActive} title={selectedFeature.title} description={selectedFeature.description} />
      )}
      {/* The 3D markers are rendered in the Scene component */}
      {isActive && selectedFeature && (
        <span className="sr-only">Platform explorer is active, viewing information about {selectedFeature.title}</span>
      )}
    </>
  )
}
