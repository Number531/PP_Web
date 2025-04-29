'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'

interface SEOImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
}

/**
 * SEOImage component
 * 
 * Optimized image component for SEO that:
 * - Uses Next.js Image for automatic WebP/AVIF format conversion
 * - Provides proper alt text for accessibility and SEO
 * - Implements proper image sizing to prevent layout shifts
 * - Supports responsive images with sizes attribute
 */
export function SEOImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 85
}: SEOImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [dimensions, setDimensions] = useState({ width, height })
  
  // Automatically detect image dimensions if not provided
  useEffect(() => {
    if (typeof window !== 'undefined' && (width === 800 && height === 600)) {
      const img = new window.Image()
      img.src = typeof src === 'string' ? src : ''
      
      img.onload = () => {
        // Only update if using default dimensions
        if (width === 800 && height === 600) {
          setDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight
          })
        }
      }
    }
  }, [src, width, height])
  
  // Generate responsive sizes attribute based on image dimensions
  const responsiveSizes = useMemo(() => {
    if (sizes !== '100vw') return sizes
    
    // Create responsive sizes based on image dimensions and typical viewport breakpoints
    if (dimensions.width <= 640) return '100vw' // Small images always take full width on mobile
    if (dimensions.width <= 1024) return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw'
  }, [dimensions.width, sizes])
  
  return (
    <div className={`relative ${className} ${isLoading ? 'bg-gray-100 animate-pulse' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        quality={quality}
        sizes={responsiveSizes}
        loading={priority ? 'eager' : 'lazy'}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        // Add structured data attributes for better SEO
        itemProp="image"
        // Add decoding attribute for better performance
        decoding="async"
      />
    </div>
  )
}

export default SEOImage
