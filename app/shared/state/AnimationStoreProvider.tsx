'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { useAnimationStore, detectDeviceCapabilities } from './EnhancedAnimationStore'
import { throttle } from '../utils/performance'

/**
 * Animation Store Provider Component
 * 
 * Provides global animation state management with optimized scroll handling
 * and device capability detection
 */
export function AnimationStoreProvider({ 
  children,
  scrollableHeight = '400vh'
}: { 
  children: ReactNode
  scrollableHeight?: string
}) {
  const scrollHandlerRef = useRef<() => void>()
  const updateScrollPosition = useAnimationStore(state => state.updateScrollPosition)
  const reducedMotion = useAnimationStore(state => state.reducedMotion)
  
  // Initialize device capability detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      detectDeviceCapabilities()
    }
  }, [])
  
  // Setup the scrollable area height
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Make scrollable area configurable for the animation phase
      document.body.style.height = reducedMotion ? '100vh' : scrollableHeight
      
      return () => {
        document.body.style.height = ''
      }
    }
  }, [scrollableHeight, reducedMotion])
  
  // Setup scroll handler with throttling for performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create a throttled scroll handler
      scrollHandlerRef.current = throttle(() => {
        const position = window.pageYOffset
        updateScrollPosition(position)
      }, 16) // Throttle to roughly match 60fps
      
      // Add event listener
      const handler = scrollHandlerRef.current
      window.addEventListener('scroll', handler, { passive: true })
      
      // Initial call to set starting position
      handler()
      
      // Cleanup
      return () => {
        if (handler) {
          window.removeEventListener('scroll', handler)
        }
      }
    }
  }, [updateScrollPosition])
  
  return <>{children}</>
}

/**
 * Compatibility hook for legacy code
 * 
 * Provides the same interface as the old useAnimation hook
 * but uses the new Zustand store underneath
 */
export function useAnimation() {
  const state = useAnimationStore()
  
  return {
    explosionProgress: state.explosionProgress,
    scrollProgress: state.scrollProgress,
    scrollPosition: state.scrollPosition,
    overlayVisible: state.overlayVisible,
    heroVisible: state.heroVisible,
    animationComplete: state.animationComplete,
    showContent: state.showContent,
    showCompletionIndicator: state.showCompletionIndicator,
    setAnimationComplete: state.setAnimationComplete,
    isHighPerformanceDevice: state.isHighPerformanceDevice,
    reducedMotion: state.reducedMotion,
    setReducedMotion: state.setReducedMotion,
    resetAnimation: state.resetAnimation
  }
}

export default AnimationStoreProvider
