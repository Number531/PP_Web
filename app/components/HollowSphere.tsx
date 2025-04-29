"use client"

import { useRef, useMemo, memo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import type * as THREE from "three"
import { createSphereParticles, createGalaxyParticles } from "../utils/particles"
import {
  calculateExplosionPosition,
  calculateColorShift,
  calculateDistanceBasedOpacity,
  calculatePulseFactor,
} from "../utils/animation"
import { PARTICLE_CONFIG, ANIMATION_SPEEDS } from "../constants"

interface HollowSphereProps {
  explosionProgress: number
}

const EXPLOSION_CONFIG = {
  EXPANSION_FACTOR: 2,
}

// Using memo to prevent unnecessary re-renders
export const HollowSphere = memo(function HollowSphere({ explosionProgress }: HollowSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const galaxyParticlesRef = useRef<THREE.Points>(null)
  const { mouse, camera } = useThree()

  // Using useMemo to avoid recreating particles on every render
  const { positions, colors, scales, originalPositions, velocities } = useMemo(
    () =>
      createSphereParticles(
        PARTICLE_CONFIG.SPHERE.COUNT,
        PARTICLE_CONFIG.SPHERE.RADIUS,
        PARTICLE_CONFIG.SPHERE.SPREAD,
        true, // Use purple theme
      ),
    [],
  )

  const {
    positions: galaxyPositions,
    colors: galaxyColors,
    scales: galaxyScales,
  } = useMemo(() => createGalaxyParticles(PARTICLE_CONFIG.GALAXY.COUNT, PARTICLE_CONFIG.GALAXY.RADIUS, true), [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * ANIMATION_SPEEDS.MAIN_SPHERE_ROTATION

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.001
      const explosionScale = 1 + explosionProgress * EXPLOSION_CONFIG.EXPANSION_FACTOR
      meshRef.current.scale.set(scale * explosionScale, scale * explosionScale, scale * explosionScale)

      const opacity = (mouse.x * 0.5 + 0.5) * 0.3 + 0.1
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      material.opacity = opacity * (1 - explosionProgress)
    }

    if (particlesRef.current && galaxyParticlesRef.current) {
      particlesRef.current.rotation.y += delta * ANIMATION_SPEEDS.PARTICLES_ROTATION * 0.8
      galaxyParticlesRef.current.rotation.y += delta * ANIMATION_SPEEDS.GALAXY_ROTATION

      const scalesAttribute = particlesRef.current.geometry.attributes.scale
      const positionsAttribute = particlesRef.current.geometry.attributes.position
      const colorsAttribute = particlesRef.current.geometry.attributes.color
      const scales = scalesAttribute.array as Float32Array
      const positions = positionsAttribute.array as Float32Array
      const colors = colorsAttribute.array as Float32Array

      // Optimize by only updating a subset of particles each frame
      const particleCount = scales.length
      const updateCount = Math.min(particleCount, 1000) // Update max 1000 particles per frame
      const startIndex = Math.floor(Math.random() * (particleCount - updateCount))

      for (let i = startIndex; i < startIndex + updateCount; i++) {
        const idx = i % particleCount // Wrap around if needed

        scales[idx] =
          calculatePulseFactor(state.clock.elapsedTime * 1.25 + idx, 1, idx, 0.5, 1) * (Math.random() * 0.5 + 0.5)

        const posIdx = idx * 3
        const x = positions[posIdx]
        const y = positions[posIdx + 1]
        const z = positions[posIdx + 2]

        positions[posIdx] = calculateExplosionPosition(
          x,
          originalPositions[posIdx],
          velocities[posIdx],
          explosionProgress,
        )
        positions[posIdx + 1] = calculateExplosionPosition(
          y,
          originalPositions[posIdx + 1],
          velocities[posIdx + 1],
          explosionProgress,
        )
        positions[posIdx + 2] = calculateExplosionPosition(
          z,
          originalPositions[posIdx + 2],
          velocities[posIdx + 2],
          explosionProgress,
        )

        // Dynamic color change based on position and time - using purple theme
        const colorShift = Math.sin(state.clock.elapsedTime + (x + y + z) * 0.1) * 0.5 + 0.5
        colors[posIdx] = calculateColorShift(colors[posIdx], 0.5 + colorShift * 0.3) // Red component (purple tint)
        colors[posIdx + 1] = calculateColorShift(colors[posIdx + 1], 0.1 * colorShift) // Green component (low for purple)
        colors[posIdx + 2] = calculateColorShift(colors[posIdx + 2], 0.8 - colorShift * 0.3) // Blue component (purple tint)
      }

      scalesAttribute.needsUpdate = true
      positionsAttribute.needsUpdate = true
      colorsAttribute.needsUpdate = true

      const distance = camera.position.length()
      const galaxyOpacity = calculateDistanceBasedOpacity(distance, 10, 100)
      const sphereOpacity = calculateDistanceBasedOpacity(distance, 10, 30, true)
      ;(meshRef.current!.material as THREE.MeshBasicMaterial).opacity = sphereOpacity * 0.3 * (1 - explosionProgress)
      ;(particlesRef.current.material as THREE.PointsMaterial).opacity = sphereOpacity
      ;(galaxyParticlesRef.current.material as THREE.PointsMaterial).opacity = galaxyOpacity
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.3} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-scale" count={scales.length} array={scales} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={PARTICLE_CONFIG.SPHERE.SIZE} vertexColors sizeAttenuation transparent />
      </points>
      <points ref={galaxyParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxyPositions.length / 3}
            array={galaxyPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={galaxyColors.length / 3}
            array={galaxyColors}
            itemSize={3}
          />
          <bufferAttribute attach="attributes-scale" count={galaxyScales.length} array={galaxyScales} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={PARTICLE_CONFIG.GALAXY.SIZE} vertexColors sizeAttenuation transparent />
      </points>
    </group>
  )
})
