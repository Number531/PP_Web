"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { calculateDistanceBasedOpacity } from "@/app/shared/utils/animation"
import { ANIMATION_SPEEDS } from "@/app/shared/config/animation-config"
import { useMobile } from "@/hooks/use-mobile"

interface SphereGeometryProps {
  explosionProgress: number
}

const EXPLOSION_CONFIG = {
  EXPANSION_FACTOR: 2,
}

/**
 * SphereGeometry Component
 * 
 * Renders just the wireframe sphere geometry without particles
 * This is the lightest part of the HollowSphere and can be loaded first
 */
export function SphereGeometry({ explosionProgress }: SphereGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const isMobile = useMobile()

  // Memoize material to avoid recreating it on each render
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#a855f7",
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * ANIMATION_SPEEDS.MAIN_SPHERE_ROTATION

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.001
      const explosionScale = 1 + explosionProgress * EXPLOSION_CONFIG.EXPANSION_FACTOR
      meshRef.current.scale.set(scale * explosionScale, scale * explosionScale, scale * explosionScale)

      // Update opacity based on camera distance
      const distance = camera.position.length()
      const sphereOpacity = calculateDistanceBasedOpacity(distance, 10, 30, true)
      material.opacity = sphereOpacity * 0.3 * (1 - explosionProgress)
    }
  })

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
    </mesh>
  )
}

export default SphereGeometry
