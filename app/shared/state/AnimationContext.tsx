"use client"

import { createContext, useContext, type ReactNode, useState, useEffect, useCallback } from "react"
import { calculateExplosionProgress } from "../utils/animation"
import { throttle } from "../utils/performance"

interface AnimationState {
  explosionProgress: number
  scrollProgress: number
  scrollPosition: number
  overlayVisible: boolean
  heroVisible: boolean
  animationComplete: boolean
  showContent: boolean
  showCompletionIndicator: boolean
}

interface AnimationContextType extends AnimationState {
  setAnimationComplete: (complete: boolean) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({
  children,
  completionThreshold = 0.95,
}: { children: ReactNode; completionThreshold?: number }) {
  const [state, setState] = useState<AnimationState>({
    explosionProgress: 0,
    scrollProgress: 0,
    scrollPosition: 0,
    overlayVisible: true,
    heroVisible: true,
    animationComplete: false,
    showContent: false,
    showCompletionIndicator: false,
  })

  // Setup the scrollable area height
  useEffect(() => {
    // Make scrollable area 400vh for the animation phase
    document.body.style.height = "400vh"

    return () => {
      document.body.style.height = ""
    }
  }, [])

  // Memoize and throttle the scroll handler for better performance
  const handleScroll = useCallback(
    throttle(() => {
      const position = window.pageYOffset
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(position / maxScroll, 1)
      const currentExplosionProgress = calculateExplosionProgress(position)

      // Use functional updates to avoid stale state references
      setState((prev) => {
        // Only update if values have changed significantly to reduce state updates
        if (
          Math.abs(prev.scrollPosition - position) < 5 &&
          Math.abs(prev.scrollProgress - progress) < 0.01 &&
          Math.abs(prev.explosionProgress - currentExplosionProgress) < 0.01
        ) {
          return prev
        }

        // Create the new state
        const newState = {
          ...prev,
          scrollPosition: position,
          scrollProgress: progress,
          explosionProgress: currentExplosionProgress,
        }

        // Handle overlay visibility
        if (position > 100 && prev.overlayVisible) {
          newState.overlayVisible = false
        }

        // Handle hero visibility
        if (progress > 0.2 && prev.heroVisible) {
          newState.heroVisible = false
        } else if (progress <= 0.2 && !prev.heroVisible) {
          newState.heroVisible = true
        }

        // Check if animation is complete
        const isComplete = currentExplosionProgress >= completionThreshold && progress >= 0.98
        if (isComplete !== prev.animationComplete) {
          newState.animationComplete = isComplete

          if (isComplete) {
            newState.showCompletionIndicator = true
          } else {
            newState.showCompletionIndicator = false
            newState.showContent = false
          }
        }

        return newState
      })

      // Handle completion indicator and content display with timeouts
      const isComplete = currentExplosionProgress >= completionThreshold && progress >= 0.98
      if (isComplete && state.animationComplete && state.showCompletionIndicator) {
        // Show completion indicator briefly
        setTimeout(() => {
          setState((prev) => ({ ...prev, showCompletionIndicator: false }))

          // Add the content section after indicator disappears
          setTimeout(() => {
            setState((prev) => ({ ...prev, showContent: true }))
          }, 300)
        }, 1000)
      }
    }, 16), // Throttle to roughly match 60fps
    [state.animationComplete, state.showCompletionIndicator, completionThreshold],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const setAnimationComplete = useCallback((complete: boolean) => {
    setState((prev) => ({ ...prev, animationComplete: complete }))
  }, [])

  return <AnimationContext.Provider value={{ ...state, setAnimationComplete }}>{children}</AnimationContext.Provider>
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider")
  }
  return context
}
