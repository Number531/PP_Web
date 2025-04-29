'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createOptimizedRoute, preloadRoutes, useLinkPreload } from '@/app/shared/utils/route-splitting'
import { LoadPriority } from '@/app/shared/utils/bundle-optimizer'

// Define optimized routes with preloading strategies
const routes = [
  createOptimizedRoute('/about', () => import('@/app/about/ClientAboutPage'), {
    preloadCondition: () => window.location.pathname === '/',
    preloadPriority: LoadPriority.LOW,
    preloadDelay: 2000
  }),
  createOptimizedRoute('/products', () => import('@/app/products/ClientProductsPage'), {
    preloadCondition: () => window.location.pathname === '/' || window.location.pathname === '/about',
    preloadPriority: LoadPriority.MEDIUM
  }),
  createOptimizedRoute('/careers', () => import('@/app/careers/ClientCareersPage'), {
    preloadCondition: () => window.location.pathname === '/products',
    preloadPriority: LoadPriority.LOW
  }),
  createOptimizedRoute('/contact', () => import('@/app/contact/ClientContactPage'), {
    preloadCondition: () => 
      window.location.pathname === '/careers' || 
      window.location.pathname === '/products',
    preloadPriority: LoadPriority.LOW
  })
]

/**
 * OptimizedNavigation Component
 * 
 * Implements intelligent route preloading based on:
 * 1. Current route (preloading likely next destinations)
 * 2. User hover/focus behavior (just-in-time preloading)
 * 3. Scroll position (preloading when user approaches bottom of page)
 */
export function OptimizedNavigation() {
  const pathname = usePathname()
  const [hasScrolledNearBottom, setHasScrolledNearBottom] = useState(false)
  
  // Preload routes based on current route and scroll position
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Initial preload based on current route - wrapped in try/catch for safety
    try {
      preloadRoutes(routes)
    } catch (error) {
      console.error('Error preloading routes:', error)
    }
    
    // Setup scroll listener to preload routes when user scrolls near bottom
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.body.scrollHeight
      const scrollThreshold = documentHeight * 0.8 // 80% of the page
      
      if (scrollPosition >= scrollThreshold && !hasScrolledNearBottom) {
        setHasScrolledNearBottom(true)
        
        // Safer approach to preload the contact page
        try {
          // Import the contact page directly instead of accessing internal properties
          // This is more reliable and less likely to break
          import('@/app/contact/ClientContactPage')
            .catch(err => console.warn('Contact page preload failed, but this is non-critical', err))
        } catch (error) {
          // Non-critical error, just log it
          console.warn('Failed to preload contact page:', error)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, hasScrolledNearBottom])
  
  // Navigation items with optimized preloading
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' }
  ]
  
  return (
    <nav className="flex space-x-4 px-4 py-2">
      {navItems.map(item => {
        // Use a safer approach for link preloading
        // Instead of relying on complex route objects, use direct imports
        const handlePreload = () => {
          try {
            // Simple direct import of the page based on path
            if (item.path === '/about') import('@/app/about/ClientAboutPage')
            else if (item.path === '/products') import('@/app/products/ClientProductsPage')
            else if (item.path === '/careers') import('@/app/careers/ClientCareersPage')
            else if (item.path === '/contact') import('@/app/contact/ClientContactPage')
            // Home page doesn't need preloading as it's already loaded
          } catch (error) {
            console.warn(`Failed to preload ${item.path}, but this is non-critical`, error)
          }
        }
        
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`px-3 py-2 rounded-md transition-colors ${
              pathname === item.path
                ? 'bg-purple-700 text-white'
                : 'text-gray-700 hover:bg-purple-100'
            }`}
            onMouseEnter={handlePreload}
            onFocus={handlePreload}
            onTouchStart={handlePreload}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default OptimizedNavigation
