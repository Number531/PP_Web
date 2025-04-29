/**
 * Bundle Optimizer Utilities
 * 
 * Provides utilities for optimizing bundle loading and code-splitting
 * to improve initial load time and overall performance.
 */

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * Priority levels for component loading
 */
export enum LoadPriority {
  CRITICAL = 'critical',   // Load immediately, blocking
  HIGH = 'high',           // Load immediately, non-blocking
  MEDIUM = 'medium',       // Load when viewport is approaching
  LOW = 'low',             // Load when in viewport or on user interaction
  IDLE = 'idle'            // Load during browser idle time
}

/**
 * Options for preloading components
 */
export interface PreloadOptions {
  priority: LoadPriority
  viewportThreshold?: number  // Distance from viewport to trigger loading (0-1)
  delay?: number              // Delay in ms before loading
  onLoad?: () => void         // Callback when component is loaded
}

/**
 * Preload a dynamically imported component based on priority
 * 
 * @param importFn - Dynamic import function
 * @param options - Preload options
 */
export function preloadComponent(
  importFn: () => Promise<any>,
  options: PreloadOptions
): void {
  const { priority, delay = 0, onLoad } = options

  const loadComponent = () => {
    setTimeout(() => {
      // Execute the import
      importFn().then(() => {
        if (onLoad) onLoad()
      }).catch(err => {
        console.error('Failed to preload component:', err)
      })
    }, delay)
  }

  switch (priority) {
    case LoadPriority.CRITICAL:
      // Load immediately
      loadComponent()
      break
      
    case LoadPriority.HIGH:
      // Load after first paint
      if (typeof window !== 'undefined') {
        if (document.readyState === 'complete') {
          loadComponent()
        } else {
          window.addEventListener('load', loadComponent, { once: true })
        }
      }
      break
      
    case LoadPriority.MEDIUM:
      // Load after critical resources
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        // @ts-ignore - requestIdleCallback may not be in types
        window.requestIdleCallback(loadComponent, { timeout: 2000 })
      } else {
        setTimeout(loadComponent, 1000)
      }
      break
      
    case LoadPriority.LOW:
    case LoadPriority.IDLE:
      // Load during idle time with longer timeout
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        // @ts-ignore - requestIdleCallback may not be in types
        window.requestIdleCallback(loadComponent, { timeout: 4000 })
      } else {
        setTimeout(loadComponent, 2000)
      }
      break
  }
}

/**
 * Hook to preload a component when element is about to enter viewport
 * 
 * @param importFn - Dynamic import function
 * @param threshold - How far from the viewport to trigger loading (0-1)
 * @returns [ref, isLoaded] - Ref to attach to container and loading state
 */
export function useViewportPreload(
  importFn: () => Promise<any>,
  threshold = 0.5
): [any, boolean] {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '200px 0px',
  })

  useEffect(() => {
    if (inView && !isLoaded) {
      importFn()
        .then(() => setIsLoaded(true))
        .catch(err => {
          console.error('Failed to load component in viewport:', err)
        })
    }
  }, [inView, isLoaded, importFn])

  return [ref, isLoaded]
}

/**
 * Utility to split a component into smaller chunks based on functionality
 * This helps create more granular code-splitting boundaries
 * 
 * @param baseImportPath - Base path for the component
 * @param chunks - List of chunk names to import
 * @returns Object with imports for each chunk
 */
export function createChunkedImports(
  baseImportPath: string,
  chunks: string[]
) {
  const imports: Record<string, () => Promise<any>> = {}
  
  chunks.forEach(chunk => {
    imports[chunk] = () => import(`${baseImportPath}/${chunk}`)
  })
  
  return imports
}

/**
 * Determine if the current device is capable of running complex features
 * Used to conditionally load heavy components
 */
/**
 * Interface to extend Navigator with deviceMemory property
 * which is not in the standard TypeScript definitions
 */
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
}

/**
 * Determine if the current device is capable of running complex features
 * Used to conditionally load heavy components
 */
export function getDeviceCapabilityLevel(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium' // Default for SSR
  
  // Cast navigator to extended type
  const extendedNavigator = navigator as ExtendedNavigator;
  
  // Check for low-end devices
  if (
    navigator.hardwareConcurrency <= 2 ||
    (extendedNavigator.deviceMemory && extendedNavigator.deviceMemory < 4)
  ) {
    return 'low'
  }
  
  // Check for high-end devices
  if (
    navigator.hardwareConcurrency >= 6 &&
    (extendedNavigator.deviceMemory && extendedNavigator.deviceMemory >= 8)
  ) {
    return 'high'
  }
  
  return 'medium'
}
