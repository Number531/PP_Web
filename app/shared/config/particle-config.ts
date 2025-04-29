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
