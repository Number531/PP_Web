import { create } from "zustand"
import { PRODUCT_FEATURES } from "../data/company-content"
import type { ProductFeature } from "../types"

interface ExplorerState {
  // State
  isActive: boolean
  selectedFeature: ProductFeature | null

  // Actions
  toggleExplorerMode: () => void
  selectFeature: (feature: ProductFeature) => void

  // Computed
  getVisibleFeatures: (scrollProgress: number) => ProductFeature[]
}

export const useExplorerStore = create<ExplorerState>((set, get) => ({
  // Initial state
  isActive: false,
  selectedFeature: null,

  // Actions
  toggleExplorerMode: () => {
    const newMode = !get().isActive
    set({ isActive: newMode })

    // Set initial feature when enabling if none is selected
    if (newMode && !get().selectedFeature) {
      // We'll use the first feature as default
      set({ selectedFeature: PRODUCT_FEATURES[0] })
    }
  },

  selectFeature: (feature: ProductFeature) => {
    set({ selectedFeature: feature })
  },

  // Computed values
  getVisibleFeatures: (scrollProgress: number) => {
    return PRODUCT_FEATURES.filter((feature) => feature.scrollTrigger <= scrollProgress)
  },
}))

// Create selector hooks for specific parts of the state
export const useExplorerActive = () => useExplorerStore((state) => state.isActive)
export const useSelectedFeature = () => useExplorerStore((state) => state.selectedFeature)
export const useToggleExplorer = () => useExplorerStore((state) => state.toggleExplorerMode)
export const useSelectFeature = () => useExplorerStore((state) => state.selectFeature)

// Create a hook that returns multiple values for components that need several state values
export const useExplorerValues = () => {
  const isActive = useExplorerStore((state) => state.isActive)
  const selectedFeature = useExplorerStore((state) => state.selectedFeature)
  const toggleExplorerMode = useExplorerStore((state) => state.toggleExplorerMode)
  const selectFeature = useExplorerStore((state) => state.selectFeature)

  return {
    isActive,
    selectedFeature,
    toggleExplorerMode,
    selectFeature,
  }
}

// Hook to get visible features based on scroll progress
export const useVisibleFeatures = (scrollProgress: number) => {
  const getVisibleFeatures = useExplorerStore((state) => state.getVisibleFeatures)
  return getVisibleFeatures(scrollProgress)
}
