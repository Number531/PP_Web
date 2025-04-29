// Particle system configuration
export const PARTICLE_CONFIG = {
  // Main sphere particles
  SPHERE: {
    COUNT: 12000, // Increased from 10000 for more density
    RADIUS: 1.5,
    SPREAD: 5,
    SIZE: 0.018, // Slightly smaller particles
  },

  // Background galaxy particles
  GALAXY: {
    COUNT: 25000, // Increased from 20000 for more stars
    RADIUS: 100,
    SIZE: 0.04, // Slightly smaller for better performance
  },

  // New galaxy planets
  NEW_GALAXY: {
    PLANET_COUNT: 20,
    RADIUS: 50,
    MIN_PLANET_SIZE: 0.1,
    MAX_PLANET_SIZE: 0.4,
  },
}

// Animation speeds
export const ANIMATION_SPEEDS = {
  MAIN_SPHERE_ROTATION: 0.008, // Slightly slower for more elegance
  PARTICLES_ROTATION: 0.008, // Matched with main sphere
  GALAXY_ROTATION: 0.0015, // Slower background movement
  NEW_GALAXY_ROTATION: 0.04, // Slightly slower
  PLANET_BASE_ROTATION: 0.4, // Slightly slower
  PLANET_ROTATION_VARIANCE: 0.08, // Slightly reduced variance
}

// Explosion configuration
export const EXPLOSION_CONFIG = {
  MAX_SCROLL: 20000,
  EASING_POWER: 12,
  EXPANSION_FACTOR: 5,
  VELOCITY_MULTIPLIER: 100,
  NEW_GALAXY_SCALE_FACTOR: 2,
}

// Camera configuration
export const CAMERA_CONFIG = {
  INITIAL_POSITION: [0, 0, 3],
  FAR: 1000,
  MIN_DISTANCE: 2,
  MAX_DISTANCE: 100,
}

// UI configuration
export const UI_CONFIG = {
  OVERLAY_FADE_SCROLL_THRESHOLD: 100,
  OVERLAY_FADE_DURATION: 0.5,
  ANIMATION_COMPLETION_THRESHOLD: 0.95,
  CONTENT_APPEARANCE_DELAY: 500,
}
