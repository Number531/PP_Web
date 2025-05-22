"use client"

import { memo, useCallback, Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { ErrorBoundary } from "react-error-boundary"
import { CAMERA_CONFIG } from "@/app/shared/config/camera-config"
import { PRODUCT_FEATURES } from "@/app/shared/data/company-content"
import type { ProductFeature } from "@/app/shared/types"
import { useMobile } from "@/hooks/use-mobile"

// Dynamically import 3D components
const HollowSphere = dynamic(() => import("./HollowSphere").then((mod) => ({ default: mod.HollowSphere })), {
  ssr: false,
})

const NewGalaxy = dynamic(() => import("./NewGalaxy").then((mod) => ({ default: mod.NewGalaxy })), {
  ssr: false,
})

const FeatureMarkers = dynamic(
  () => import("../platform-explorer/FeatureMarkers").then((mod) => ({ default: mod.FeatureMarkers })),
  { ssr: false },
)

// Dynamically import the optimized particle system
const OptimizedParticleSystem = dynamic(
  () => import("./OptimizedParticleSystem").then((mod) => ({ default: mod.OptimizedParticleSystem })),
  { ssr: false },
)

interface SphereRendererProps {
  explosionProgress: number
  explorerMode: boolean
  scrollProgress: number
  onSelectFeature: (feature: ProductFeature) => void
  selectedFeatureId: string | null
}

export function SphereRenderer({
  explosionProgress,
  explorerMode,
  scrollProgress,
  onSelectFeature,
  selectedFeatureId,
}: SphereRendererProps) {
  const isMobile = useMobile()

  const [canRender, setCanRender] = useState(false)

  // Only render on client side after component has mounted
  useEffect(() => {
    setCanRender(true)
  }, [])

  // Fallback for errors
  const fallbackRender = () => (
    <div className="w-full h-full flex items-center justify-center text-white/70">
      <p>Unable to load 3D visualization</p>
    </div>
  )

  if (!canRender) {
    return null
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Canvas
        camera={{ position: CAMERA_CONFIG.INITIAL_POSITION, far: CAMERA_CONFIG.FAR }}
        dpr={[1, isMobile ? 1.5 : 2]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality if needed
      >
        <Suspense fallback={null}>
          <SceneContent
            explosionProgress={explosionProgress}
            explorerMode={explorerMode}
            scrollProgress={scrollProgress}
            onSelectFeature={onSelectFeature}
            selectedFeatureId={selectedFeatureId}
          />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  )
}

// Memoized scene content to prevent unnecessary re-renders
const SceneContent = memo(function SceneContent({
  explosionProgress,
  explorerMode,
  scrollProgress,
  onSelectFeature,
  selectedFeatureId,
}: SphereRendererProps) {
  const isMobile = useMobile()

  // Memoize the feature selection handler to prevent recreation on each render
  const handleFeatureSelect = useCallback(
    (feature: ProductFeature) => {
      onSelectFeature(feature)
    },
    [onSelectFeature],
  )

  // Disable OrbitControls on mobile for better performance
  const orbitControlsProps = {
    enableZoom: true,
    minDistance: CAMERA_CONFIG.MIN_DISTANCE,
    maxDistance: CAMERA_CONFIG.MAX_DISTANCE,
    enableDamping: true,
    dampingFactor: 0.05,
    enabled: !isMobile, // Disable on mobile
  }

  // Adjust bloom quality based on device
  const bloomProps = {
    luminanceThreshold: 0,
    luminanceSmoothing: 0.9,
    height: isMobile ? 200 : 300,
    intensity: isMobile ? 0.8 : 1,
  }

  return (
    <>
      <HollowSphere explosionProgress={explosionProgress} />
      <NewGalaxy explosionProgress={explosionProgress} />

      {explorerMode && (
        <FeatureMarkers
          isActive={true}
          features={PRODUCT_FEATURES}
          scrollProgress={scrollProgress}
          onSelectFeature={handleFeatureSelect}
          selectedFeatureId={selectedFeatureId}
        />
      )}

      <OrbitControls {...orbitControlsProps} />

      {/* Only use effects on non-mobile devices */}
      {!isMobile && (
        <EffectComposer>
          <Bloom {...bloomProps} />
        </EffectComposer>
      )}
    </>
  )
})

export default SphereRenderer
