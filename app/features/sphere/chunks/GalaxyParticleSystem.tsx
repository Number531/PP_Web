"use client"

import { useMemo } from "react"
import { ParticleSystem } from "../ParticleSystem"
import { PARTICLE_CONFIG } from "@/app/shared/config/particle-config"
import { ANIMATION_SPEEDS } from "@/app/shared/config/animation-config"
import { useMobile } from "@/hooks/use-mobile"

interface GalaxyParticleSystemProps {
  explosionProgress: number
}

/**
 * GalaxyParticleSystem Component
 * 
 * Renders the background galaxy particles
 * This is the lowest priority chunk and can be loaded last
 */
export function GalaxyParticleSystem({ explosionProgress }: GalaxyParticleSystemProps) {
  const isMobile = useMobile()

  // Adjust particle count based on device capability
  const galaxyParticleCount = useMemo(() => {
    return isMobile ? Math.floor(PARTICLE_CONFIG.GALAXY.COUNT * 0.3) : PARTICLE_CONFIG.GALAXY.COUNT
  }, [isMobile])

  return (
    <ParticleSystem
      count={galaxyParticleCount}
      radius={PARTICLE_CONFIG.GALAXY.RADIUS}
      spread={0}
      size={PARTICLE_CONFIG.GALAXY.SIZE}
      explosionProgress={explosionProgress * 0.1} // Less affected by explosion
      rotationSpeed={ANIMATION_SPEEDS.GALAXY_ROTATION}
      colorTheme="purple"
    />
  )
}

export default GalaxyParticleSystem
