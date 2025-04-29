// Ensure animation utilities are properly exported and optimized

// Calculate explosion progress based on scroll position with improved performance
export function calculateExplosionProgress(scrollPosition: number): number {
  // Use a more efficient calculation for better performance
  // Increased from 10000 to 20000 for even slower progression
  const maxScroll = 20000
  const rawProgress = Math.min(scrollPosition / maxScroll, 1)

  // Use a lookup table for common values to improve performance
  if (rawProgress <= 0) return 0
  if (rawProgress >= 1) return 1

  // Use an even more gradual easing function for slower explosion
  // Changed from octic (8) to power of 12 for extremely slow progression
  // Use a more efficient calculation for powers
  return Math.pow(rawProgress, 12)
}

// Calculate particle position during explosion
export function calculateExplosionPosition(
  currentPosition: number,
  originalPosition: number,
  velocity: number,
  explosionProgress: number,
  lerpFactor = 0.1,
): number {
  const explosionFactor = explosionProgress * 5
  const targetPosition = originalPosition * (1 + explosionFactor) + velocity * explosionFactor * 100

  // Linear interpolation for smoother movement
  return currentPosition + (targetPosition - currentPosition) * lerpFactor
}

// Calculate dynamic color shift for particles
export function calculateColorShift(currentColor: number, targetColor: number, lerpFactor = 0.05): number {
  return currentColor + (targetColor - currentColor) * lerpFactor
}

// Calculate pulsating scale factor for objects
export function calculatePulseFactor(time: number, frequency = 1, index = 0, minScale = 0.8, maxScale = 1.0): number {
  const amplitude = (maxScale - minScale) / 2
  const midpoint = (maxScale + minScale) / 2
  return midpoint + amplitude * Math.sin(time * frequency + index)
}

// Calculate opacity based on camera distance
export function calculateDistanceBasedOpacity(
  distance: number,
  minDistance: number,
  maxDistance: number,
  invert = false,
): number {
  const normalizedDistance = (distance - minDistance) / (maxDistance - minDistance)
  const opacity = Math.max(0, Math.min(1, normalizedDistance))
  return invert ? 1 - opacity : opacity
}

// Ensure animations are properly throttled for performance
export function throttleAnimation(callback: Function, limit = 16): Function {
  let waiting = false
  return function (this: any, ...args: any[]) {
    if (!waiting) {
      callback.apply(this, args)
      waiting = true
      requestAnimationFrame(() => {
        waiting = false
      })
    }
  }
}

// Helper to determine if animations should run based on device performance
export function shouldRunAnimation(): boolean {
  // Check if user has requested reduced motion
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false
    }
  }

  // Check for low-end devices
  const isLowEndDevice = () => {
    if (typeof navigator === "undefined") return false

    // Check for low memory devices
    if ("deviceMemory" in navigator && (navigator as any).deviceMemory < 4) {
      return true
    }

    // Check for slow CPU
    if ("hardwareConcurrency" in navigator && navigator.hardwareConcurrency < 4) {
      return true
    }

    return false
  }

  return !isLowEndDevice()
}

// Export animation utilities
export const animationUtils = {
  calculateExplosionProgress,
  calculateExplosionPosition,
  calculateColorShift,
  calculatePulseFactor,
  calculateDistanceBasedOpacity,
  throttleAnimation,
  shouldRunAnimation,
}
