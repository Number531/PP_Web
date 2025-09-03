"use client"

import { Suspense, useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Bloom } from "@react-three/postprocessing"
import { SafeComposer } from "@/app/shared/components/SafeComposer"
import { useMobile } from "@/hooks/use-mobile"
import * as THREE from "three"
import { ClientOnly } from "@/app/shared/components/ClientOnly"

// Define constants directly in the component to avoid import issues
const CAMERA_CONFIG = {
  FOV: 75,
  NEAR: 0.1,
  FAR: 1000,
  INITIAL_POSITION: { x: 0, y: 0, z: 30 },
}

const GALAXY_CONFIG = {
  COUNT: 5000,
  SIZE: 0.02,
  RADIUS: 10,
  BRANCHES: 5,
  SPIN: 1,
  RANDOMNESS: 0.2,
  RANDOMNESS_POWER: 3,
  INSIDE_COLOR: new THREE.Color("#ff6030"),
  OUTSIDE_COLOR: new THREE.Color("#1b3984"),
}

// Dynamic galaxy component with swirling animation
function GalaxyParticles({
  count = GALAXY_CONFIG.COUNT,
  size = GALAXY_CONFIG.SIZE,
  radius = GALAXY_CONFIG.RADIUS,
  branches = GALAXY_CONFIG.BRANCHES,
  spin = GALAXY_CONFIG.SPIN,
  randomness = GALAXY_CONFIG.RANDOMNESS,
  randomnessPower = GALAXY_CONFIG.RANDOMNESS_POWER,
  insideColor = GALAXY_CONFIG.INSIDE_COLOR,
  outsideColor = GALAXY_CONFIG.OUTSIDE_COLOR,
}) {
  const points = useRef()

  // Generate galaxy geometry
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Position
      const currentRadius = Math.random() * radius
      const spinAngle = currentRadius * spin
      const branchAngle = ((i % branches) / branches) * Math.PI * 2

      const randomX =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * currentRadius
      const randomY =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * currentRadius
      const randomZ =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * currentRadius

      positions[i3] = Math.cos(branchAngle + spinAngle) * currentRadius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * currentRadius + randomZ

      // Color
      const mixedColor = insideColor.clone()
      mixedColor.lerp(outsideColor, currentRadius / radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [count, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor])

  // Animation
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} itemSize={3} array={positions} />
        <bufferAttribute attach="attributes-color" count={count} itemSize={3} array={colors} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.8}
      />
    </points>
  )
}

// Additional particle field for depth and dimension
function ParticleField({ count = 2000 }) {
  const points = useRef()

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Random position in a sphere
      const radius = 30 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Purple-blue color palette
      colors[i3] = 0.5 + Math.random() * 0.5 // R
      colors[i3 + 1] = 0.2 + Math.random() * 0.3 // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2 // B
    }

    return { positions, colors }
  }, [count])

  // Subtle rotation animation
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} itemSize={3} array={particlePositions.positions} />
        <bufferAttribute attach="attributes-color" count={count} itemSize={3} array={particlePositions.colors} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        transparent
        opacity={0.6}
      />
    </points>
  )
}

// Scene component to combine all elements
function GalaxyScene() {
  const isMobile = useMobile()

  // Adjust particle counts based on device capability
  const galaxyParticleCount = isMobile ? 2500 : 5000
  const fieldParticleCount = isMobile ? 1000 : 2000

  return (
    <>
      <ambientLight intensity={0.1} />
      <GalaxyParticles
        count={galaxyParticleCount}
        size={isMobile ? 0.03 : 0.02}
        insideColor={new THREE.Color("#9c4dff")} // Purple
        outsideColor={new THREE.Color("#2d1b84")} // Deep blue
      />
      <ParticleField count={fieldParticleCount} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.3}
        autoRotate={true}
        autoRotateSpeed={0.1}
      />
    </>
  )
}

export function ParticleBackground() {
  const canvasRef = useRef(null)

  return (
    <div className="fixed inset-0 z-0">
      <ClientOnly fallback={
        <div className="w-full h-full bg-black" />
      }>
        <Canvas
          ref={canvasRef}
          camera={{
            position: [0, 5, 30],
            fov: CAMERA_CONFIG.FOV,
            near: CAMERA_CONFIG.NEAR,
            far: CAMERA_CONFIG.FAR,
          }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
          dpr={[1, 1.5]} // Limit DPR for better performance
          suppressHydrationWarning
        >
          <Suspense fallback={null}>
            <GalaxyScene />
            <SafeComposer>
              <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} intensity={0.5} />
            </SafeComposer>
          </Suspense>
        </Canvas>
      </ClientOnly>
    </div>
  )
}
