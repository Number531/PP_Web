"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import type * as THREE from "three"
import { Html } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type { EducationalPoint } from "../data/educational-content"

interface EducationalMarkersProps {
  isActive: boolean
  points: EducationalPoint[]
  scrollProgress: number
  onSelectPoint: (point: EducationalPoint) => void
  selectedPointId: string | null
}

export function EducationalMarkers({
  isActive,
  points,
  scrollProgress,
  onSelectPoint,
  selectedPointId,
}: EducationalMarkersProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      // Make markers always face the camera
      groupRef.current.children.forEach((child) => {
        child.lookAt(camera.position)
      })
    }
  })

  // Filter points based on scroll progress
  const visiblePoints = points.filter((point) => point.scrollTrigger <= scrollProgress)

  return (
    <group ref={groupRef}>
      <AnimatePresence>
        {isActive &&
          visiblePoints.map((point) => (
            <group key={point.id} position={[point.position[0], point.position[1], point.position[2]]}>
              <mesh
                onClick={() => onSelectPoint(point)}
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
                  color={selectedPointId === point.id ? "#FFD700" : "#FFFFFF"}
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
                  className={`px-2 py-1 bg-black/70 text-white text-xs rounded-full whitespace-nowrap ${
                    selectedPointId === point.id ? "bg-yellow-500/70 text-black font-bold" : ""
                  }`}
                  style={{ transform: "translate3d(-50%, -50%, 0)" }}
                >
                  {point.title}
                </motion.div>
              </Html>
            </group>
          ))}
      </AnimatePresence>
    </group>
  )
}
