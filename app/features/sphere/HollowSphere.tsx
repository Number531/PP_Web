"use client"

import { Suspense, useEffect, memo } from "react"
import dynamic from "next/dynamic"
import { useThreeWorker } from "@/app/shared/hooks/useThreeWorker"
import { useMobile } from "@/hooks/use-mobile"
import { LoadPriority, preloadComponent, getDeviceCapabilityLevel } from "@/app/shared/utils/bundle-optimizer"

interface HollowSphereProps {
  explosionProgress: number
}

// Dynamically import chunked components with different loading priorities
const SphereGeometry = dynamic(
  () => import('./chunks/SphereGeometry'),
  { ssr: false, loading: () => null }
)

const MainParticleSystem = dynamic(
  () => import('./chunks/MainParticleSystem'),
  { ssr: false, loading: () => null }
)

const GalaxyParticleSystem = dynamic(
  () => import('./chunks/GalaxyParticleSystem'),
  { ssr: false, loading: () => null }
)

// Using memo to prevent unnecessary re-renders
export const HollowSphere = memo(function HollowSphere({ explosionProgress }: HollowSphereProps) {
  const isMobile = useMobile()
  const { isReady, calculateVertices } = useThreeWorker()
  const deviceCapability = getDeviceCapabilityLevel()
  
  // Preload components based on priority and device capability
  useEffect(() => {
    // Always preload the base geometry with highest priority
    preloadComponent(
      () => import('./chunks/SphereGeometry'),
      { priority: LoadPriority.CRITICAL }
    )
    
    // Preload main particle system with high priority
    preloadComponent(
      () => import('./chunks/MainParticleSystem'),
      { 
        priority: deviceCapability === 'low' ? LoadPriority.MEDIUM : LoadPriority.HIGH,
        delay: deviceCapability === 'low' ? 1000 : 200
      }
    )
    
    // Preload galaxy particles with lower priority
    preloadComponent(
      () => import('./chunks/GalaxyParticleSystem'),
      { 
        priority: deviceCapability === 'low' ? LoadPriority.IDLE : LoadPriority.MEDIUM,
        delay: deviceCapability === 'low' ? 2000 : 500
      }
    )
    
    // Use Web Worker to calculate vertices if available
    if (isReady) {
      calculateVertices({
        radius: 1,
        detail: isMobile ? 32 : 64,
        explosionFactor: explosionProgress * 2
      })
    }
  }, [isReady, isMobile, deviceCapability, explosionProgress, calculateVertices])
  
  return (
    <group>
      {/* Progressive loading of sphere components */}
      <Suspense fallback={null}>
        <SphereGeometry explosionProgress={explosionProgress} />
      </Suspense>
      
      {/* Main particle system - loaded after base geometry */}
      <Suspense fallback={null}>
        <MainParticleSystem explosionProgress={explosionProgress} />
      </Suspense>
      
      {/* Galaxy particles - lowest priority, loaded last */}
      {deviceCapability !== 'low' && (
        <Suspense fallback={null}>
          <GalaxyParticleSystem explosionProgress={explosionProgress} />
        </Suspense>
      )}
    </group>
  )
})
