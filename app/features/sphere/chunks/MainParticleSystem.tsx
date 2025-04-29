"use client"

import { useMemo } from "react"
import { ParticleSystem } from "../ParticleSystem"
import { PARTICLE_CONFIG } from "@/app/shared/config/particle-config"
import { ANIMATION_SPEEDS } from "@/app/shared/config/animation-config"
import { useMobile } from "@/hooks/use-mobile"

interface MainParticleSystemProps {
  explosionProgress: number
}

/**
 * MainParticleSystem Component
 * 
 * Renders the main sphere particles
 * This is loaded after the base sphere geometry for a progressive enhancement approach
 */
export function MainParticleSystem({ explosionProgress }: MainParticleSystemProps) {
  const isMobile = useMobile()

  // Adjust particle count based on device capability
  const particleCount = useMemo(() => {
    return isMobile ? Math.floor(PARTICLE_CONFIG.SPHERE.COUNT * 0.4) : PARTICLE_CONFIG.SPHERE.COUNT
  }, [isMobile])

  return (
    <ParticleSystem
      count={particleCount}
      radius={PARTICLE_CONFIG.SPHERE.RADIUS}
      spread={PARTICLE_CONFIG.SPHERE.SPREAD}
      size={PARTICLE_CONFIG.SPHERE.SIZE}
      explosionProgress={explosionProgress}
      rotationSpeed={ANIMATION_SPEEDS.PARTICLES_ROTATION}
      colorTheme="purple"
    />
  )
}

export default MainParticleSystem
