"use client"

import { useEffect, memo } from "react"
import { useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Bloom } from "@react-three/postprocessing"
import { SafeComposer } from "@/app/shared/components/SafeComposer"
import { HollowSphere } from "./HollowSphere"
import { NewGalaxy } from "./NewGalaxy"
import { FeatureMarkers } from "./FeatureMarkers"
import { CAMERA_CONFIG } from "../constants"
import { PRODUCT_FEATURES } from "../data/company-content"
import type { ProductFeature } from "../data/company-content"

interface SceneProps {
  explosionProgress: number
  explorerMode: boolean
  scrollProgress: number
  onSelectFeature: (feature: ProductFeature) => void
  selectedFeatureId: string | null
}

// Using memo to prevent unnecessary re-renders of the entire scene
export const Scene = memo(function Scene({
  explosionProgress,
  explorerMode,
  scrollProgress,
  onSelectFeature,
  selectedFeatureId,
}: SceneProps) {
  const { camera } = useThree()

  useEffect(() => {
    camera.far = CAMERA_CONFIG.FAR
    camera.updateProjectionMatrix()
  }, [camera])

  return (
    <>
      <HollowSphere explosionProgress={explosionProgress} />
      <NewGalaxy explosionProgress={explosionProgress} />
      <FeatureMarkers
        isActive={explorerMode}
        features={PRODUCT_FEATURES}
        scrollProgress={scrollProgress}
        onSelectFeature={onSelectFeature}
        selectedFeatureId={selectedFeatureId}
      />
      <OrbitControls
        enableZoom={true}
        minDistance={CAMERA_CONFIG.MIN_DISTANCE}
        maxDistance={CAMERA_CONFIG.MAX_DISTANCE}
        enableDamping={true}
        dampingFactor={0.05}
      />
      <SafeComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </SafeComposer>
    </>
  )
})
