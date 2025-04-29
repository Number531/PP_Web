"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { OrbitControls } from "@react-three/drei"
import { useMobile } from "@/hooks/use-mobile"

interface SpaceDustProps {
  explosionProgress: number
}

function SpaceDust({ explosionProgress }: SpaceDustProps) {
  const particlesRef = useRef<THREE.Points>(null)
  const { camera } = useThree()
  const isMobile = useMobile()

  // Reduce particle count on mobile
  // Reduce particle size significantly to match the fully zoomed out appearance
  const particleCount = isMobile ? 4000 : 12000
  const particleSize = isMobile ? 0.008 : 0.006 // Significantly reduced from 0.025/0.018

  // Also adjust the distribution to create a more expanded, zoomed-out feel
  const [positions, colors, scales, originalPositions] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const originalPositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      // Increase the radius range to create a more expanded galaxy appearance
      const r = 2.5 + Math.random() * 1.5 // Increased from 1.5 + 0.2

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      // Purple theme
      const intensity = Math.random()
      colors[i * 3] = 0.6 + intensity * 0.3 // Red component (purple tint)
      colors[i * 3 + 1] = 0.1 * intensity // Green component (low for purple)
      colors[i * 3 + 2] = 0.8 + intensity * 0.2 // Blue component (purple tint)

      scales[i] = Math.random() * 0.8 // Reduced scale variation
    }

    return [positions, colors, scales, originalPositions]
  }, [particleCount])

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05

      const scalesAttribute = particlesRef.current.geometry.attributes.scale
      const positionsAttribute = particlesRef.current.geometry.attributes.position
      const scales = scalesAttribute.array as Float32Array
      const positions = positionsAttribute.array as Float32Array

      // Only update a subset of particles each frame for better performance
      const updateCount = Math.min(particleCount, isMobile ? 200 : 500)
      const startIndex = Math.floor(Math.random() * (particleCount - updateCount))

      for (let i = startIndex; i < startIndex + updateCount; i++) {
        const idx = i % particleCount
        scales[idx] = 0.5 + Math.sin(state.clock.elapsedTime * 1.25 + idx) * 0.125

        const posIdx = idx * 3
        const x = positions[posIdx]
        const y = positions[posIdx + 1]
        const z = positions[posIdx + 2]
        const originalX = originalPositions[posIdx]
        const originalY = originalPositions[posIdx + 1]
        const originalZ = originalPositions[posIdx + 2]

        // Explosion effect
        const explosionFactor = explosionProgress * 2
        const targetX = originalX * (1 + explosionFactor)
        const targetY = originalY * (1 + explosionFactor)
        const targetZ = originalZ * (1 + explosionFactor)

        // Smooth interpolation
        positions[posIdx] = THREE.MathUtils.lerp(x, targetX, 0.01)
        positions[posIdx + 1] = THREE.MathUtils.lerp(y, targetY, 0.01)
        positions[posIdx + 2] = THREE.MathUtils.lerp(z, targetZ, 0.01)
      }

      scalesAttribute.needsUpdate = true
      positionsAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-scale" count={scales.length} array={scales} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        vertexColors
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9} // Increased from default
      />
    </points>
  )
}

export function SpaceDustBackground({ explosionProgress }: SpaceDustProps) {
  const isMobile = useMobile()

  return (
    <Canvas camera={{ position: [0, 0, 5], far: 10000 }}>
      <SpaceDust explosionProgress={explosionProgress} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        autoRotate={true}
        autoRotateSpeed={0.3}
        rotateSpeed={0.5}
      />
      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} intensity={0.8} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
