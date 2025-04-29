"use client"

import { EducationalToggle } from "./EducationalToggle"
import { EducationalPanel } from "./EducationalPanel"
import { EducationalModeIndicator } from "./EducationalModeIndicator"
import type { EducationalPoint } from "../data/educational-content"

interface EducationalLayerProps {
  scrollProgress: number
  isVisible: boolean
  isActive: boolean
  onToggle: () => void
  selectedPoint: EducationalPoint | null
  onSelectPoint: (point: EducationalPoint) => void
}

export function EducationalLayer({
  scrollProgress,
  isVisible,
  isActive,
  onToggle,
  selectedPoint,
  onSelectPoint,
}: EducationalLayerProps) {
  // Only render when the main UI is visible
  if (!isVisible) return null

  return (
    <>
      <EducationalModeIndicator isActive={isActive} />
      <EducationalToggle isActive={isActive} onToggle={onToggle} />
      {selectedPoint && (
        <EducationalPanel isActive={isActive} title={selectedPoint.title} description={selectedPoint.description} />
      )}
      {/* The 3D markers are rendered in the Scene component */}
      {isActive && selectedPoint && (
        <span className="sr-only">Educational mode is active, viewing information about {selectedPoint.title}</span>
      )}
    </>
  )
}
