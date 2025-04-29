import { create } from "zustand"
import { calculateExplosionProgress } from "../utils/animation"
import { throttle, rafThrottle } from "../utils/performance"

interface AnimationState {
  // Core animation state
  explosionProgress: number
  scrollProgress: number
  scrollPosition: number
  overlayVisible: boolean
  heroVisible: boolean
  animationComplete: boolean
  showContent: boolean
  showCompletionIndicator: boolean

  // Actions
  setScrollPosition: (position: number) => void
  setAnimationComplete: (complete: boolean) => void
  hideOverlay: () => void
  showHero: () => void
  hideHero: () => void
  setShowContent: (show: boolean) => void
  setShowCompletionIndicator: (show: boolean) => void

  // Computed values
  getExplosionProgress: () => number
}

// Create the store with Zustand
export const useAnimationStore = create<AnimationState>((set, get) => ({
  // Initial state
  explosionProgress: 0,
  scrollProgress: 0,
  scrollPosition: 0,
  overlayVisible: true,
  heroVisible: true,
  animationComplete: false,
  showContent: false,
  showCompletionIndicator: false,

  // Actions - using functions to update state
  setScrollPosition: (position: number) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = Math.min(position / maxScroll, 1)
    const currentExplosionProgress = calculateExplosionProgress(position)

    // Only update state if values have changed significantly
    const currentState = get()
    const shouldUpdate =
      Math.abs(currentState.scrollPosition - position) > 5 ||
      Math.abs(currentState.scrollProgress - progress) > 0.01 ||
      Math.abs(currentState.explosionProgress - currentExplosionProgress) > 0.01

    if (!shouldUpdate) return

    set({
      scrollPosition: position,
      scrollProgress: progress,
      explosionProgress: currentExplosionProgress,
    })

    // Handle overlay visibility
    if (position > 100 && get().overlayVisible) {
      set({ overlayVisible: false })
    }

    // Handle hero visibility
    if (progress > 0.2 && get().heroVisible) {
      set({ heroVisible: false })
    } else if (progress <= 0.2 && !get().heroVisible) {
      set({ heroVisible: true })
    }

    // Check if animation is complete (very close to 1)
    const isComplete = currentExplosionProgress >= 0.95 && progress >= 0.98

    if (isComplete && !get().animationComplete) {
      set({
        animationComplete: true,
        showCompletionIndicator: true,
      })

      // Show completion indicator briefly
      setTimeout(() => {
        set({ showCompletionIndicator: false })

        // Add the content section after indicator disappears
        setTimeout(() => {
          set({ showContent: true })
        }, 300)
      }, 1000)
    } else if (!isComplete && get().animationComplete) {
      set({
        animationComplete: false,
        showCompletionIndicator: false,
        showContent: false,
      })
    }
  },

  setAnimationComplete: (complete: boolean) => set({ animationComplete: complete }),
  hideOverlay: () => set({ overlayVisible: false }),
  showHero: () => set({ heroVisible: true }),
  hideHero: () => set({ heroVisible: false }),
  setShowContent: (show: boolean) => set({ showContent: show }),
  setShowCompletionIndicator: (show: boolean) => set({ showCompletionIndicator: show }),

  // Computed values
  getExplosionProgress: () => get().explosionProgress,
}))

// Create an optimized scroll handler using requestAnimationFrame
export const useOptimizedScrollHandler = () => {
  const setScrollPosition = useAnimationStore((state) => state.setScrollPosition)

  return rafThrottle((scrollY?: number) => {
    const position = scrollY !== undefined ? scrollY : window.pageYOffset
    setScrollPosition(position)
  })
}

// Create a throttled scroll handler that can be used in components
export const useThrottledScrollHandler = () => {
  const setScrollPosition = useAnimationStore((state) => state.setScrollPosition)

  return throttle(() => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }, 16) // Throttle to roughly match 60fps
}

// Create selector hooks for specific parts of the state
export const useExplosionProgress = () => useAnimationStore((state) => state.explosionProgress)
export const useScrollProgress = () => useAnimationStore((state) => state.scrollProgress)
export const useScrollPosition = () => useAnimationStore((state) => state.scrollPosition)
export const useOverlayVisible = () => useAnimationStore((state) => state.overlayVisible)
export const useHeroVisible = () => useAnimationStore((state) => state.heroVisible)
export const useAnimationComplete = () => useAnimationStore((state) => state.animationComplete)
export const useShowContent = () => useAnimationStore((state) => state.showContent)
export const useShowCompletionIndicator = () => useAnimationStore((state) => state.showCompletionIndicator)

// Create a hook that returns multiple values for components that need several state values
export const useAnimationValues = () => {
  const explosionProgress = useAnimationStore((state) => state.explosionProgress)
  const scrollProgress = useAnimationStore((state) => state.scrollProgress)
  const scrollPosition = useAnimationStore((state) => state.scrollPosition)
  const heroVisible = useAnimationStore((state) => state.heroVisible)
  const animationComplete = useAnimationStore((state) => state.animationComplete)
  const showContent = useAnimationStore((state) => state.showContent)
  const showCompletionIndicator = useAnimationStore((state) => state.showCompletionIndicator)

  return {
    explosionProgress,
    scrollProgress,
    scrollPosition,
    heroVisible,
    animationComplete,
    showContent,
    showCompletionIndicator,
  }
}
