"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Bloom } from "@react-three/postprocessing"
import { SafeComposer } from "@/app/shared/components/SafeComposer"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { InfoOverlay } from "./info-overlay"

interface Product {
  name: string
  description: string
}

const products: Product[] = [
  { name: "Cosmic Voyager", description: "Embark on interstellar journeys with our advanced spacecraft technology." },
  { name: "Nebula Harvester", description: "Collect rare elements from distant nebulae with unparalleled efficiency." },
  { name: "Quantum Shields", description: "Protect your fleet with our state-of-the-art quantum shielding systems." },
  { name: "Gravity Manipulator", description: "Bend space-time to your will with our gravity manipulation devices." },
  {
    name: "Stellar Cartographer",
    description: "Map the cosmos with precision using our advanced stellar cartography tools.",
  },
]

function ProductInfo({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="bg-white text-black p-6 rounded-lg max-w-md mx-auto shadow-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-200 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h2>
        <p className="mb-6 text-gray-600">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Click for details</span>
          <button
            onClick={onClose}
            className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            aria-label="Close product information"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function HollowSphere({
  onProductSelect,
  explosionProgress,
}: { onProductSelect: (product: Product | null) => void; explosionProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const galaxyParticlesRef = useRef<THREE.Points>(null)
  const { mouse, viewport, camera } = useThree()

  const particleRadius = 1.5
  const particleSpread = 0.2
  const galaxyRadius = 100

  const [positions, colors, scales, originalPositions] = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)
    const scales = new Float32Array(1000)
    const originalPositions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = particleRadius + Math.random() * particleSpread
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 0.5 + Math.random() * 0.5
      scales[i] = Math.random()
    }
    return [positions, colors, scales, originalPositions]
  }, [])

  const [galaxyPositions, galaxyColors, galaxyScales] = useMemo(() => {
    const positions = new Float32Array(10000 * 3)
    const colors = new Float32Array(10000 * 3)
    const scales = new Float32Array(10000)
    for (let i = 0; i < 10000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = galaxyRadius * Math.random()
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 0.5 + Math.random() * 0.5
      scales[i] = Math.random()
    }
    return [positions, colors, scales]
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.01 // Reduced from 0.025 to 0.01

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.001 // Reduced pulsing
      const explosionScale = 1 + explosionProgress * 0.01 // Further reduced from 0.025 to 0.01 for even slower expansion
      meshRef.current.scale.set(scale * explosionScale, scale * explosionScale, scale * explosionScale)

      const opacity = (mouse.x * 0.5 + 0.5) * 0.3 + 0.1
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      material.opacity = opacity * (1 - explosionProgress * 0.05)
    }

    if (particlesRef.current && galaxyParticlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.01 // Reduced from 0.025 to 0.01
      galaxyParticlesRef.current.rotation.y += delta * 0.002 // Reduced from 0.005 to 0.002

      const scalesAttribute = particlesRef.current.geometry.attributes.scale
      const positionsAttribute = particlesRef.current.geometry.attributes.position
      const scales = scalesAttribute.array as Float32Array
      const positions = positionsAttribute.array as Float32Array

      for (let i = 0; i < scales.length; i++) {
        scales[i] = 0.5 + Math.sin(state.clock.elapsedTime * 1.25 + i) * 0.125 // Slower scale animation

        const idx = i * 3
        const x = positions[idx]
        const y = positions[idx + 1]
        const z = positions[idx + 2]
        const originalX = originalPositions[idx]
        const originalY = originalPositions[idx + 1]
        const originalZ = originalPositions[idx + 2]

        // Subtle explosion effect
        const explosionFactor = explosionProgress * 0.005 // Further reduced from 0.01 to 0.005 for an even more subtle effect
        const targetX = originalX * (1 + explosionFactor)
        const targetY = originalY * (1 + explosionFactor)
        const targetZ = originalZ * (1 + explosionFactor)

        // Even smoother interpolation
        positions[idx] = THREE.MathUtils.lerp(x, targetX, 0.005) // Reduced from 0.01 to 0.005 for smoother movement
        positions[idx + 1] = THREE.MathUtils.lerp(y, targetY, 0.005)
        positions[idx + 2] = THREE.MathUtils.lerp(z, targetZ, 0.005)
      }
      scalesAttribute.needsUpdate = true
      positionsAttribute.needsUpdate = true

      // Adjust visibility based on camera distance
      const distance = camera.position.length()
      const galaxyOpacity = Math.max(0, Math.min(1, (distance - 10) / 90))
      const sphereOpacity = Math.max(0, Math.min(1, 1 - (distance - 10) / 20))
      ;(meshRef.current!.material as THREE.MeshBasicMaterial).opacity = sphereOpacity * 0.3
      ;(particlesRef.current.material as THREE.PointsMaterial).opacity = sphereOpacity
      ;(galaxyParticlesRef.current.material as THREE.PointsMaterial).opacity = galaxyOpacity
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-scale" count={scales.length} array={scales} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={0.01} vertexColors sizeAttenuation transparent />
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
        <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent />
      </points>
    </group>
  )
}

function Scene({
  onProductSelect,
  explosionProgress,
}: { onProductSelect: (product: Product | null) => void; explosionProgress: number }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.far = 1000
    camera.updateProjectionMatrix()
  }, [camera])

  return (
    <>
      <HollowSphere onProductSelect={onProductSelect} explosionProgress={explosionProgress} />
      <OrbitControls enableZoom={true} minDistance={2} maxDistance={100} />
      <SafeComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </SafeComposer>
    </>
  )
}

export default function Component() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [explosionProgress, setExplosionProgress] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)

      // Calculate explosion progress based on scroll position
      const maxScroll = 20000 // Increased from 10000 to 20000 for even slower progression
      const rawProgress = Math.min(position / maxScroll, 1)

      // Use an even more gradual easing function for slower explosion
      const easedProgress = Math.pow(rawProgress, 12) // Changed from octic (8) to power of 12 for extremely slow progression
      setExplosionProgress(easedProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="h-screen sticky top-0">
        <Canvas camera={{ position: [0, 0, 3], far: 1000 }}>
          <Scene onProductSelect={setSelectedProduct} explosionProgress={explosionProgress} />
        </Canvas>
      </div>
      <div className="h-screen bg-transparent" /> {/* Scrollable area */}
      <div className="h-screen flex items-center justify-center p-4 bg-black bg-opacity-50">
        <AnimatePresence>
          {selectedProduct && <ProductInfo product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </AnimatePresence>
      </div>
      <InfoOverlay scrollPosition={scrollPosition} />
    </div>
  )
}
