import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { calculateExplosionProgress } from '../utils/animation'

interface AnimationState {
  // Core animation state
  explosionProgress: number
  scrollProgress: number
  scrollPosition: number
  
  // UI visibility flags
  overlayVisible: boolean
  heroVisible: boolean
  animationComplete: boolean
  showContent: boolean
  showCompletionIndicator: boolean
  
  // Performance metrics
  lastFrameTime: number
  frameRate: number
  
  // Device capability flags
  isHighPerformanceDevice: boolean
  
  // User preference flags
  reducedMotion: boolean
  
  // Actions
  setAnimationComplete: (complete: boolean) => void
  updateScrollPosition: (position: number) => void
  setReducedMotion: (enabled: boolean) => void
  resetAnimation: () => void
}

/**
 * Enhanced Animation Store using Zustand
 * 
 * Provides a more efficient and predictable state management solution
 * with performance tracking, device capability detection, and user preferences
 */
export const useAnimationStore = create<AnimationState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        explosionProgress: 0,
        scrollProgress: 0,
        scrollPosition: 0,
        overlayVisible: true,
        heroVisible: true,
        animationComplete: false,
        showContent: false,
        showCompletionIndicator: false,
        lastFrameTime: performance.now(),
        frameRate: 60,
        isHighPerformanceDevice: true,
        reducedMotion: false,
        
        // Actions
        setAnimationComplete: (complete) => set({ animationComplete: complete }),
        
        updateScrollPosition: (position) => {
          const state = get()
          const now = performance.now()
          const frameTime = now - state.lastFrameTime
          const fps = frameTime > 0 ? 1000 / frameTime : 60
          
          // Calculate new progress values
          const maxScroll = document.body.scrollHeight - window.innerHeight
          const progress = Math.min(position / maxScroll, 1)
          const currentExplosionProgress = calculateExplosionProgress(position)
          
          // Skip update if changes are minimal (optimization)
          if (
            Math.abs(state.scrollPosition - position) < 5 &&
            Math.abs(state.scrollProgress - progress) < 0.01 &&
            Math.abs(state.explosionProgress - currentExplosionProgress) < 0.01
          ) {
            return
          }
          
          // Create new state
          const newState: Partial<AnimationState> = {
            scrollPosition: position,
            scrollProgress: progress,
            explosionProgress: currentExplosionProgress,
            lastFrameTime: now,
            frameRate: fps,
          }
          
          // Handle overlay visibility
          if (position > 100 && state.overlayVisible) {
            newState.overlayVisible = false
          } else if (position <= 100 && !state.overlayVisible) {
            newState.overlayVisible = true
          }
          
          // Handle hero visibility
          if (progress > 0.2 && state.heroVisible) {
            newState.heroVisible = false
          } else if (progress <= 0.2 && !state.heroVisible) {
            newState.heroVisible = true
          }
          
          // Check if animation is complete
          const completionThreshold = 0.95
          const isComplete = currentExplosionProgress >= completionThreshold && progress >= 0.98
          
          if (isComplete !== state.animationComplete) {
            newState.animationComplete = isComplete
            
            if (isComplete) {
              newState.showCompletionIndicator = true
              
              // Schedule content display with timeouts
              setTimeout(() => {
                set({ showCompletionIndicator: false })
                
                setTimeout(() => {
                  set({ showContent: true })
                }, 300)
              }, 1000)
            } else {
              newState.showCompletionIndicator = false
              newState.showContent = false
            }
          }
          
          set(newState)
        },
        
        setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
        
        resetAnimation: () => set({
          explosionProgress: 0,
          scrollProgress: 0,
          scrollPosition: 0,
          overlayVisible: true,
          heroVisible: true,
          animationComplete: false,
          showContent: false,
          showCompletionIndicator: false,
        }),
      }),
      {
        name: 'animation-storage',
        partialize: (state) => ({
          // Only persist user preferences, not animation state
          reducedMotion: state.reducedMotion,
        }),
      }
    )
  )
)

/**
 * Device capability detection
 * Determines if the device can handle high-performance animations
 */
export function detectDeviceCapabilities() {
  // Check for high-end device indicators
  const isHighEnd = 
    // More than 4 logical processors indicates a higher-end device
    (navigator.hardwareConcurrency || 0) >= 4 &&
    // Check if device has enough memory (if available)
    (navigator.deviceMemory || 4) >= 4 &&
    // Check if device reports high-end GPU
    !(/low|medium/.test(navigator.gpu?.getPreferredCanvasFormat?.() || ''))
  
  // Update the store with device capability
  useAnimationStore.setState({ isHighPerformanceDevice: isHighEnd })
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useAnimationStore.setState({ reducedMotion: prefersReducedMotion })
  
  // Listen for changes to reduced motion preference
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    useAnimationStore.setState({ reducedMotion: e.matches })
  })
  
  return { isHighEnd, prefersReducedMotion }
}
