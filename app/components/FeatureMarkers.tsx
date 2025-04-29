"use client"

import { useRef, useCallback, memo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import type * as THREE from "three"
import { Html } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type { ProductFeature } from "../data/company-content"

interface FeatureMarkersProps {
  isActive: boolean
  features: ProductFeature[]
  scrollProgress: number
  onSelectFeature: (feature: ProductFeature) => void
  selectedFeatureId: string | null
}

// Using memo to prevent unnecessary re-renders
export const FeatureMarkers = memo(function FeatureMarkers({
  isActive,
  features,
  scrollProgress,
  onSelectFeature,
  selectedFeatureId,
}: FeatureMarkersProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  // Filter features based on scroll progress
  const visibleFeatures = features.filter((feature) => feature.scrollTrigger <= scrollProgress)

  // Memoize the feature selection handler
  const handleFeatureClick = useCallback(
    (feature: ProductFeature) => {
      onSelectFeature(feature)
    },
    [onSelectFeature],
  )

  useFrame(() => {
    if (groupRef.current) {
      // Make markers always face the camera
      groupRef.current.children.forEach((child) => {
        child.lookAt(camera.position)
      })
    }
  })

  if (!isActive || visibleFeatures.length === 0) {
    return null
  }

  return (
    <group ref={groupRef}>
      <AnimatePresence>
        {visibleFeatures.map((feature) => (
          <group key={feature.id} position={[feature.position[0], feature.position[1], feature.position[2]]}>
            <mesh
              onClick={() => handleFeatureClick(feature)}
              onPointerOver={(e) => {
                document.body.style.cursor = "pointer"
                e.stopPropagation()
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto"
              }}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial
                color={selectedFeatureId === feature.id ? "#9333EA" : "#FFFFFF"}
                transparent
                opacity={0.8}
              />
            </mesh>
            <Html distanceFactor={10}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                  selectedFeatureId === feature.id
                    ? "bg-purple-600 text-white font-bold"
                    : "bg-black/70 text-white border border-purple-500/30"
                }`}
                style={{ transform: "translate3d(-50%, -50%, 0)" }}
                aria-label={feature.title}
              >
                {feature.title}
              </motion.div>
            </Html>
          </group>
        ))}
      </AnimatePresence>
    </group>
  )
})
