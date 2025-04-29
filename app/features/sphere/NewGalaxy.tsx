"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { calculatePulseFactor } from "../../shared/utils/animation"
import { ANIMATION_SPEEDS } from "../../shared/config/animation-config"
import { PARTICLE_CONFIG } from "../../shared/config/particle-config"
import { EXPLOSION_CONFIG } from "../../shared/config/animation-config"

interface NewGalaxyProps {
  explosionProgress: number
}

export function NewGalaxy({ explosionProgress }: NewGalaxyProps) {
  const groupRef = useRef<THREE.Group>(null)

  const galaxy = useMemo(() => {
    const group = new THREE.Group()
    const planetCount = PARTICLE_CONFIG.NEW_GALAXY.PLANET_COUNT
    const galaxyRadius = PARTICLE_CONFIG.NEW_GALAXY.RADIUS

    for (let i = 0; i < planetCount; i++) {
      const planetRadius =
        Math.random() * (PARTICLE_CONFIG.NEW_GALAXY.MAX_PLANET_SIZE - PARTICLE_CONFIG.NEW_GALAXY.MIN_PLANET_SIZE) +
        PARTICLE_CONFIG.NEW_GALAXY.MIN_PLANET_SIZE

      const distance = Math.random() * galaxyRadius
      const angle = Math.random() * Math.PI * 2

      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(planetRadius, 32, 32),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(Math.random(), Math.random(), Math.random()),
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        }),
      )

      planet.position.set(Math.cos(angle) * distance, (Math.random() - 0.5) * 10, Math.sin(angle) * distance)
      group.add(planet)
    }

    return group
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ANIMATION_SPEEDS.NEW_GALAXY_ROTATION

      groupRef.current.children.forEach((planet, index) => {
        planet.rotation.y +=
          delta * (ANIMATION_SPEEDS.PLANET_BASE_ROTATION + index * ANIMATION_SPEEDS.PLANET_ROTATION_VARIANCE)
        planet.position.y = Math.sin(state.clock.elapsedTime * (0.2 + index * 0.05)) * 5

        // Pulsating effect for new galaxy planets
        const pulseFactor = calculatePulseFactor(state.clock.elapsedTime, 1 + index * 0.1, index, 0.8, 1.2)
        planet.scale.setScalar(pulseFactor)
      })

      groupRef.current.scale.setScalar(Math.min(1, explosionProgress * EXPLOSION_CONFIG.NEW_GALAXY_SCALE_FACTOR))
    }
  })

  return <primitive object={galaxy} ref={groupRef} />
}
