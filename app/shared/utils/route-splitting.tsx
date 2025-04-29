import React, { Suspense, lazy, ComponentType, LazyExoticComponent } from 'react'
import { LoadingPlaceholder } from '@/app/components/ui/LoadingPlaceholder'
import { preloadComponent, LoadPriority } from './bundle-optimizer'

/**
 * Interface for route configuration
 */
interface RouteConfig {
  path: string
  component: LazyExoticComponent<ComponentType<any>>
  preloadCondition?: () => boolean
  preloadPriority?: LoadPriority
  preloadDelay?: number
}

/**
 * Create a route configuration with optimized loading patterns
 * 
 * @param path - Route path
 * @param importFn - Dynamic import function
 * @param options - Preload options
 */
export function createOptimizedRoute(
  path: string,
  importFn: () => Promise<{ default: ComponentType<any> }>,
  options: {
    preloadCondition?: () => boolean
    preloadPriority?: LoadPriority
    preloadDelay?: number
  } = {}
): RouteConfig {
  return {
    path,
    component: lazy(importFn),
    ...options
  }
}

/**
 * Preload routes based on user navigation patterns or other triggers
 * 
 * @param routes - Array of route configurations
 */
export function preloadRoutes(routes: RouteConfig[]): void {
  if (typeof window === 'undefined') return

  routes.forEach(route => {
    const shouldPreload = route.preloadCondition ? route.preloadCondition() : false
    
    if (shouldPreload) {
      preloadComponent(
        // @ts-ignore - TypeScript doesn't understand that this is a valid import
        () => route.component['_payload']['_result'](),
        {
          priority: route.preloadPriority || LoadPriority.MEDIUM,
          delay: route.preloadDelay || 0
        }
      )
    }
  })
}

/**
 * Create a route component with Suspense boundary
 * 
 * @param Component - Lazy-loaded component
 * @param loadingText - Text to display while loading
 */
export function RouteComponent({
  Component,
  loadingText = 'Loading...'
}: {
  Component: LazyExoticComponent<ComponentType<any>>
  loadingText?: string
}) {
  return (
    <Suspense fallback={<LoadingPlaceholder text={loadingText} height="h-screen" />}>
      <Component />
    </Suspense>
  )
}

/**
 * Preload a route when hovering over a link
 * 
 * @param path - Route path to preload
 * @param routes - Array of route configurations
 */
export function useLinkPreload(path: string, routes: RouteConfig[]) {
  const handleMouseEnter = React.useCallback(() => {
    const route = routes.find(r => r.path === path)
    if (route) {
      preloadComponent(
        // @ts-ignore - TypeScript doesn't understand that this is a valid import
        () => route.component['_payload']['_result'](),
        { priority: LoadPriority.HIGH }
      )
    }
  }, [path, routes])

  return {
    onMouseEnter: handleMouseEnter,
    onFocus: handleMouseEnter,
    onTouchStart: handleMouseEnter
  }
}

/**
 * Example usage:
 * 
 * const routes = [
 *   createOptimizedRoute('/about', () => import('@/app/about/ClientAboutPage'), {
 *     preloadCondition: () => window.location.pathname === '/',
 *     preloadPriority: LoadPriority.LOW,
 *     preloadDelay: 2000
 *   }),
 *   createOptimizedRoute('/products', () => import('@/app/products/ClientProductsPage'), {
 *     preloadCondition: () => window.location.pathname === '/about',
 *     preloadPriority: LoadPriority.MEDIUM
 *   })
 * ]
 * 
 * // Preload routes based on current conditions
 * useEffect(() => {
 *   preloadRoutes(routes)
 * }, [])
 * 
 * // In a Link component:
 * <Link href="/about" {...useLinkPreload('/about', routes)}>About</Link>
 */
