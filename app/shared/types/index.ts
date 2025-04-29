// Educational content types
export interface EducationalPoint {
  id: string
  title: string
  description: string
  position: [number, number, number] // 3D coordinates
  scrollTrigger: number // Scroll percentage when this becomes relevant (0-1)
}

// Company/product feature types
export interface ProductFeature {
  id: string
  title: string
  description: string
  position: [number, number, number] // 3D coordinates
  scrollTrigger: number // Scroll percentage when this becomes relevant (0-1)
}

// Animation state types
export interface AnimationState {
  explosionProgress: number
  scrollProgress: number
  scrollPosition: number
  overlayVisible: boolean
  heroVisible: boolean
  animationComplete: boolean
  showContent: boolean
  showCompletionIndicator: boolean
}

// 3D particle data types
export interface ParticleData {
  positions: Float32Array
  colors: Float32Array
  scales: Float32Array
  originalPositions?: Float32Array
  velocities?: Float32Array
}
