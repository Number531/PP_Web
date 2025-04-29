"use client"

import { useState, useEffect } from "react"
import { calculateExplosionProgress } from "../utils/animation"

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

export function useAnimationState(completionThreshold = 0.95) {
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

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(position / maxScroll, 1)
      const currentExplosionProgress = calculateExplosionProgress(position)

      // Update basic scroll state
      setState((prev) => ({
        ...prev,
        scrollPosition: position,
        scrollProgress: progress,
        explosionProgress: currentExplosionProgress,
      }))

      // Hide overlay after scrolling a bit
      if (position > 100 && state.overlayVisible) {
        setState((prev) => ({ ...prev, overlayVisible: false }))
      }

      // Fade out hero section once we're 20% through the scroll
      if (progress > 0.2 && state.heroVisible) {
        setState((prev) => ({ ...prev, heroVisible: false }))
      } else if (progress <= 0.2 && !state.heroVisible) {
        setState((prev) => ({ ...prev, heroVisible: true }))
      }

      // Check if animation is complete (very close to 1)
      const isComplete = currentExplosionProgress >= completionThreshold && progress >= 0.98

      if (isComplete && !state.animationComplete) {
        setState((prev) => ({
          ...prev,
          animationComplete: true,
          showCompletionIndicator: true,
        }))

        // Show completion indicator briefly
        setTimeout(() => {
          setState((prev) => ({ ...prev, showCompletionIndicator: false }))

          // Add the content section after indicator disappears
          setTimeout(() => {
            setState((prev) => ({ ...prev, showContent: true }))
          }, 300)
        }, 1000)
      } else if (!isComplete && state.animationComplete) {
        setState((prev) => ({
          ...prev,
          animationComplete: false,
          showCompletionIndicator: false,
          showContent: false,
        }))
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [state.overlayVisible, state.heroVisible, state.animationComplete, completionThreshold])

  return state
}
