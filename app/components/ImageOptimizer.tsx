'use client'

import { useEffect } from 'react'

/**
 * Component to optimize images for Core Web Vitals
 * - Implements lazy loading with proper sizing
 * - Adds priority loading for above-the-fold images
 * - Prevents layout shifts with proper dimensions
 */
export function ImageOptimizer() {
  useEffect(() => {
    // Find all images without explicit width/height
    const images = document.querySelectorAll('img:not([width]):not([height])');
    
    // Add dimensions to prevent CLS (Cumulative Layout Shift)
    images.forEach(img => {
      if (!img.hasAttribute('data-optimized')) {
        // Set default dimensions to prevent layout shift
        img.setAttribute('width', '100%');
        img.setAttribute('height', 'auto');
        img.setAttribute('data-optimized', 'true');
        
        // Add loading="lazy" for images below the fold
        if (!img.hasAttribute('loading') && 
            !img.hasAttribute('priority') && 
            img.getBoundingClientRect().top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      }
    });
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[priority="true"]');
    criticalImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
      }
    });
    
  }, []);
  
  return null;
}
