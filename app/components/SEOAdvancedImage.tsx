'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface SEOAdvancedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  className?: string
  sizes?: string
  caption?: string
  credit?: string
  keywords?: string[]
  objectPosition?: string
  quality?: number
  lazyBoundary?: string
}

/**
 * SEO Advanced Image Component
 * 
 * Enhanced image component with advanced SEO attributes and optimizations
 * including structured data, accessibility features, and performance optimizations
 */
export function SEOAdvancedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  loading = 'lazy',
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  caption,
  credit,
  keywords = [],
  objectPosition = 'center',
  quality = 85,
  lazyBoundary = '200px'
}: SEOAdvancedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: width || 800, height: height || 600 })
  const imgRef = useRef<HTMLImageElement>(null)
  
  // Automatically detect image dimensions if not provided
  useEffect(() => {
    if (!width || !height) {
      const img = new window.Image()
      img.src = typeof src === 'string' ? src : ''
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight
        })
      }
    }
  }, [src, width, height])
  
  // Add structured data for the image
  useEffect(() => {
    if (!loaded) return
    
    const imageStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      'contentUrl': src,
      'description': alt,
      'name': alt,
      ...(caption && { 'caption': caption }),
      ...(credit && { 'creditText': credit }),
      ...(keywords.length > 0 && { 'keywords': keywords.join(', ') }),
      'width': dimensions.width,
      'height': dimensions.height
    }
    
    // Add structured data to the page
    let script = document.querySelector(`script[data-image-id="${src}"]`)
    if (!script) {
      script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-image-id', src)
      document.head.appendChild(script)
    }
    
    script.textContent = JSON.stringify(imageStructuredData)
    
    // Clean up function
    return () => {
      document.querySelector(`script[data-image-id="${src}"]`)?.remove()
    }
  }, [src, alt, caption, credit, keywords, dimensions, loaded])
  
  return (
    <figure className={`relative ${className}`}>
      <div className="relative overflow-hidden">
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
          loading={loading}
          sizes={sizes}
          quality={quality}
          className={`w-full h-auto transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectPosition }}
          onLoad={() => setLoaded(true)}
          lazyBoundary={lazyBoundary}
          // Add accessibility attributes
          aria-describedby={caption ? `caption-${src.replace(/\W+/g, '-')}` : undefined}
          // Add data attributes for SEO
          data-keywords={keywords.join(',')}
        />
        
        {/* Low-quality image placeholder */}
        {!loaded && (
          <div 
            className="absolute inset-0 bg-gray-200 animate-pulse" 
            style={{ aspectRatio: `${dimensions.width} / ${dimensions.height}` }}
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* Image caption with structured data support */}
      {(caption || credit) && (
        <figcaption 
          id={`caption-${src.replace(/\W+/g, '-')}`}
          className="text-sm text-gray-600 mt-2"
        >
          {caption && <p className="mb-1">{caption}</p>}
          {credit && <p className="text-xs italic">Credit: {credit}</p>}
        </figcaption>
      )}
    </figure>
  )
}

export default SEOAdvancedImage
