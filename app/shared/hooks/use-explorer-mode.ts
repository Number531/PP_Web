"use client"

import { useState } from "react"
import { PRODUCT_FEATURES } from "../data/company-content"
import type { ProductFeature } from "../types"

interface ExplorerModeState {
  isActive: boolean
  selectedFeature: ProductFeature | null
  toggleExplorerMode: () => void
  selectFeature: (feature: ProductFeature) => void
}

export function useExplorerMode(scrollProgress: number): ExplorerModeState {
  const [explorerMode, setExplorerMode] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<ProductFeature | null>(null)

  const toggleExplorerMode = () => {
    const newMode = !explorerMode
    setExplorerMode(newMode)

    // Set initial feature when enabling
    if (newMode && !selectedFeature) {
      const relevantFeatures = PRODUCT_FEATURES.filter((feature) => feature.scrollTrigger <= scrollProgress)

      if (relevantFeatures.length > 0) {
        setSelectedFeature(relevantFeatures[relevantFeatures.length - 1])
      } else {
        setSelectedFeature(PRODUCT_FEATURES[0])
      }
    }
  }

  const selectFeature = (feature: ProductFeature) => {
    setSelectedFeature(feature)
  }

  return {
    isActive: explorerMode,
    selectedFeature,
    toggleExplorerMode,
    selectFeature,
  }
}
