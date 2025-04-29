// Export all configuration from a single entry point
export * from "./particle-config"
export * from "./animation-config"
export * from "./camera-config"
export * from "./ui-config"

// Re-export all configs for backward compatibility
export { PARTICLE_CONFIG } from "./particle-config"
export { ANIMATION_SPEEDS, EXPLOSION_CONFIG } from "./animation-config"
export { CAMERA_CONFIG } from "./camera-config"
export { UI_CONFIG } from "./ui-config"
