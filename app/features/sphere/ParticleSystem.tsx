"use client"

import { useRef, useMemo, memo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { createSphereParticles } from "@/app/shared/utils/particles"
import { calculateExplosionPosition, calculateColorShift, calculatePulseFactor } from "@/app/shared/utils/animation"
import type { ParticleData } from "@/app/shared/types"
import { useMobile } from "@/hooks/use-mobile"

interface ParticleSystemProps {
  count: number
  radius: number
  spread: number
  size: number
  explosionProgress: number
  rotationSpeed: number
  colorTheme?: "default" | "purple"
}

// Memoize the component to prevent unnecessary re-renders
export const ParticleSystem = memo(function ParticleSystem({
  count,
  radius,
  spread,
  size,
  explosionProgress,
  rotationSpeed,
  colorTheme = "default",
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()
  const isMobile = useMobile()

  // Adjust batch size based on device capability
  const batchSize = useMemo(() => (isMobile ? 200 : 500), [isMobile])

  // Create particles data once and reuse
  const particleData: ParticleData = useMemo(
    () => createSphereParticles(count, radius, spread, colorTheme === "purple"),
    [count, radius, spread, colorTheme],
  )

  // Create material once and reuse
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      // Optimize rendering
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [size])

  // Track the last update time to optimize updates
  const lastUpdateRef = useRef(0)
  const updateIntervalRef = useRef(1000 / (isMobile ? 20 : 30)) // Target 30 updates per second, 20 on mobile
  const frameCountRef = useRef(0)

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * rotationSpeed

      // Only update particles at a controlled rate
      frameCountRef.current++
      if (state.clock.elapsedTime - lastUpdateRef.current > updateIntervalRef.current) {
        lastUpdateRef.current = state.clock.elapsedTime

        const scalesAttribute = pointsRef.current.geometry.attributes.scale
        const positionsAttribute = pointsRef.current.geometry.attributes.position
        const colorsAttribute = pointsRef.current.geometry.attributes.color
        const scales = scalesAttribute.array as Float32Array
        const positions = positionsAttribute.array as Float32Array
        const colors = colorsAttribute.array as Float32Array

        // Optimize by only updating a subset of particles each frame
        const particleCount = scales.length
        const startIndex = Math.floor(Math.random() * (particleCount - batchSize))

        for (let i = startIndex; i < startIndex + batchSize; i++) {
          const idx = i % particleCount // Wrap around if needed

          scales[idx] =
            calculatePulseFactor(state.clock.elapsedTime * 1.25 + idx, 1, idx, 0.5, 1) * (Math.random() * 0.5 + 0.5)

          if (particleData.originalPositions && particleData.velocities) {
            const posIdx = idx * 3
            const x = positions[posIdx]
            const y = positions[posIdx + 1]
            const z = positions[posIdx + 2]

            positions[posIdx] = calculateExplosionPosition(
              x,
              particleData.originalPositions[posIdx],
              particleData.velocities[posIdx],
              explosionProgress,
              0.05, // Reduced lerp factor for smoother movement
            )
            positions[posIdx + 1] = calculateExplosionPosition(
              y,
              particleData.originalPositions[posIdx + 1],
              particleData.velocities[posIdx + 1],
              explosionProgress,
              0.05,
            )
            positions[posIdx + 2] = calculateExplosionPosition(
              z,
              particleData.originalPositions[posIdx + 2],
              particleData.velocities[posIdx + 2],
              explosionProgress,
              0.05,
            )

            // Dynamic color change based on position and time
            if (colorTheme === "purple" && frameCountRef.current % 3 === 0) {
              // Only update colors every 3 frames
              const colorShift = Math.sin(state.clock.elapsedTime + (x + y + z) * 0.1) * 0.5 + 0.5
              colors[posIdx] = calculateColorShift(colors[posIdx], 0.5 + colorShift * 0.3) // Red component (purple tint)
              colors[posIdx + 1] = calculateColorShift(colors[posIdx + 1], 0.1 * colorShift) // Green component (low for purple)
              colors[posIdx + 2] = calculateColorShift(colors[posIdx + 2], 0.8 - colorShift * 0.3) // Blue component (purple tint)
            }
          }
        }

        scalesAttribute.needsUpdate = true
        positionsAttribute.needsUpdate = true

        // Only update colors when needed
        if (frameCountRef.current % 3 === 0) {
          colorsAttribute.needsUpdate = true
        }
      }
    }
  })

  return (
    <points ref={pointsRef} material={material} frustumCulled={true}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleData.colors.length / 3}
          array={particleData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particleData.scales.length}
          array={particleData.scales}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  )
})
