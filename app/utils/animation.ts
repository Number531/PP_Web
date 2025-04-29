import * as THREE from "three"
import { EXPLOSION_CONFIG } from "../constants"

/**
 * Calculate explosion progress based on scroll position
 */
export function calculateExplosionProgress(scrollPosition: number): number {
  const rawProgress = Math.min(scrollPosition / EXPLOSION_CONFIG.MAX_SCROLL, 1)
  return Math.pow(rawProgress, EXPLOSION_CONFIG.EASING_POWER)
}

/**
 * Calculate particle position during explosion
 */
export function calculateExplosionPosition(
  currentPosition: number,
  originalPosition: number,
  velocity: number,
  explosionProgress: number,
  lerpFactor = 0.1,
): number {
  const explosionFactor = explosionProgress * EXPLOSION_CONFIG.EXPANSION_FACTOR
  const targetPosition =
    originalPosition * (1 + explosionFactor) + velocity * explosionFactor * EXPLOSION_CONFIG.VELOCITY_MULTIPLIER

  return THREE.MathUtils.lerp(currentPosition, targetPosition, lerpFactor)
}

/**
 * Calculate dynamic color shift for particles
 */
export function calculateColorShift(currentColor: number, targetColor: number, lerpFactor = 0.05): number {
  return THREE.MathUtils.lerp(currentColor, targetColor, lerpFactor)
}

/**
 * Calculate pulsating scale factor for objects
 */
export function calculatePulseFactor(time: number, frequency = 1, index = 0, minScale = 0.8, maxScale = 1.0): number {
  const amplitude = (maxScale - minScale) / 2
  const midpoint = (maxScale + minScale) / 2
  return midpoint + amplitude * Math.sin(time * frequency + index)
}

/**
 * Calculate opacity based on camera distance
 */
export function calculateDistanceBasedOpacity(
  distance: number,
  minDistance: number,
  maxDistance: number,
  invert = false,
): number {
  const normalizedDistance = (distance - minDistance) / (maxDistance - minDistance)
  const opacity = Math.max(0, Math.min(1, normalizedDistance))
  return invert ? 1 - opacity : opacity
}
