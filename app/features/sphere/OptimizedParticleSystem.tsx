"use client"

import { useRef, useMemo, memo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMobile } from "@/hooks/use-mobile"
import { batchUpdateParticles } from "@/app/shared/utils/performance"

interface OptimizedParticleSystemProps {
  count: number
  radius: number
  spread: number
  size: number
  explosionProgress: number
  rotationSpeed: number
  colorTheme?: "default" | "purple"
}

// Particle pool for object reuse
interface Particle {
  position: THREE.Vector3
  originalPosition: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  scale: number
  active: boolean
}

// Memoize the component to prevent unnecessary re-renders
export const OptimizedParticleSystem = memo(function OptimizedParticleSystem({
  count,
  radius,
  spread,
  size,
  explosionProgress,
  rotationSpeed,
  colorTheme = "default",
}: OptimizedParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()
  const isMobile = useMobile()

  // Adjust batch size based on device capability
  const batchSize = useMemo(() => (isMobile ? 150 : 400), [isMobile])

  // Create particle pool for object reuse
  const particlePool = useMemo(() => {
    const pool: Particle[] = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = radius + Math.pow(Math.random(), 0.5) * spread

      const position = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )

      // Create color based on theme
      const color = new THREE.Color()
      if (colorTheme === "purple") {
        const intensity = Math.random()
        color.setRGB(
          0.6 + intensity * 0.3, // Red component (purple tint)
          0.1 * intensity, // Green component (low for purple)
          0.8 + intensity * 0.2, // Blue component (purple tint)
        )
      } else {
        const colorAngle = Math.random() * Math.PI * 2
        color.setRGB((Math.cos(colorAngle) + 1) / 2, (Math.sin(colorAngle) + 1) / 2, (Math.sin(colorAngle * 2) + 1) / 2)
      }

      pool.push({
        position: position.clone(),
        originalPosition: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ),
        color: color,
        scale: Math.random() * 0.5 + 0.5,
        active: true,
      })
    }
    return pool
  }, [count, radius, spread, colorTheme])

  // Create geometry and attributes
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    // Initialize attributes from particle pool
    for (let i = 0; i < count; i++) {
      const particle = particlePool[i]

      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z

      colors[i * 3] = particle.color.r
      colors[i * 3 + 1] = particle.color.g
      colors[i * 3 + 2] = particle.color.b

      scales[i] = particle.scale
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

    return geometry
  }, [count, particlePool])

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

        const positionsAttribute = pointsRef.current.geometry.attributes.position
        const colorsAttribute = pointsRef.current.geometry.attributes.color
        const scalesAttribute = pointsRef.current.geometry.attributes.scale

        const positions = positionsAttribute.array as Float32Array
        const colors = colorsAttribute.array as Float32Array
        const scales = scalesAttribute.array as Float32Array

        // Batch update particles for better performance
        batchUpdateParticles(count, batchSize, (idx) => {
          const particle = particlePool[idx]

          // Update scale with pulsating effect
          scales[idx] = 0.5 + Math.sin(state.clock.elapsedTime * 1.25 + idx) * 0.125 * particle.scale

          // Calculate explosion effect
          const posIdx = idx * 3
          const explosionFactor = explosionProgress * 0.5

          // Target position with explosion effect
          const targetX =
            particle.originalPosition.x * (1 + explosionFactor) + particle.velocity.x * explosionFactor * 100
          const targetY =
            particle.originalPosition.y * (1 + explosionFactor) + particle.velocity.y * explosionFactor * 100
          const targetZ =
            particle.originalPosition.z * (1 + explosionFactor) + particle.velocity.z * explosionFactor * 100

          // Smooth interpolation for position updates
          positions[posIdx] = THREE.MathUtils.lerp(positions[posIdx], targetX, 0.05)
          positions[posIdx + 1] = THREE.MathUtils.lerp(positions[posIdx + 1], targetY, 0.05)
          positions[posIdx + 2] = THREE.MathUtils.lerp(positions[posIdx + 2], targetZ, 0.05)

          // Only update colors occasionally for better performance
          if (colorTheme === "purple" && frameCountRef.current % 3 === 0) {
            const x = positions[posIdx]
            const y = positions[posIdx + 1]
            const z = positions[posIdx + 2]

            const colorShift = Math.sin(state.clock.elapsedTime + (x + y + z) * 0.1) * 0.5 + 0.5
            colors[posIdx] = THREE.MathUtils.lerp(colors[posIdx], 0.5 + colorShift * 0.3, 0.05)
            colors[posIdx + 1] = THREE.MathUtils.lerp(colors[posIdx + 1], 0.1 * colorShift, 0.05)
            colors[posIdx + 2] = THREE.MathUtils.lerp(colors[posIdx + 2], 0.8 - colorShift * 0.3, 0.05)
          }
        })

        // Update buffer attributes
        positionsAttribute.needsUpdate = true
        scalesAttribute.needsUpdate = true

        // Only update colors when needed
        if (frameCountRef.current % 3 === 0) {
          colorsAttribute.needsUpdate = true
        }
      }
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={true}>
      {/* No children needed as we're using pre-configured geometry and material */}
    </points>
  )
})

export default OptimizedParticleSystem
