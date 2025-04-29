export function createSphereParticles(count: number, radius: number, spread: number, purpleTheme = false) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const originalPositions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = radius + Math.pow(Math.random(), 0.5) * spread
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    originalPositions[i * 3] = x
    originalPositions[i * 3 + 1] = y
    originalPositions[i * 3 + 2] = z

    // Add color variation - purple theme if enabled
    if (purpleTheme) {
      const intensity = Math.random()
      colors[i * 3] = 0.6 + intensity * 0.3 // Red component (purple tint)
      colors[i * 3 + 1] = 0.1 * intensity // Green component (low for purple)
      colors[i * 3 + 2] = 0.8 + intensity * 0.2 // Blue component (purple tint)
    } else {
      const colorAngle = Math.random() * Math.PI * 2
      colors[i * 3] = (Math.cos(colorAngle) + 1) / 2
      colors[i * 3 + 1] = (Math.sin(colorAngle) + 1) / 2
      colors[i * 3 + 2] = (Math.sin(colorAngle * 2) + 1) / 2
    }

    scales[i] = Math.random() * 0.5 + 0.5

    // Add initial velocities for more dynamic movement
    velocities[i * 3] = (Math.random() - 0.5) * 0.01
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
  }

  return { positions, colors, scales, originalPositions, velocities }
}

export function createGalaxyParticles(count: number, radius: number, purpleTheme = false) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = Math.pow(Math.random(), 0.5) * radius

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    if (purpleTheme) {
      const intensity = Math.random()
      colors[i * 3] = 0.4 + intensity * 0.3 // Red component (purple tint)
      colors[i * 3 + 1] = 0.1 * intensity // Green component (low for purple)
      colors[i * 3 + 2] = 0.6 + intensity * 0.4 // Blue component (purple tint)
    } else {
      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 0.5 + Math.random() * 0.5
    }

    scales[i] = Math.random() * 0.5 + 0.5
  }

  return { positions, colors, scales }
}
