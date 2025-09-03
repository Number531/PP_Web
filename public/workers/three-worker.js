/* Minimal THREE-related worker stub used by useThreeWorker()
   Serves to offload simple computations and acknowledge readiness. */

self.addEventListener('message', (event) => {
  const data = event?.data || {}
  const { type, params = {} } = data

  try {
    if (type === 'init') {
      self.postMessage({ type: 'ready' })
      return
    }

    if (type === 'calculate_vertices') {
      const { radius = 1, detail = 32, explosionFactor = 0 } = params
      const vertices = []
      const steps = Math.max(8, Math.min(128, detail))
      for (let i = 0; i <= steps; i++) {
        const v = i / steps
        const theta = v * Math.PI
        for (let j = 0; j < steps * 2; j++) {
          const u = j / (steps * 2)
          const phi = u * 2 * Math.PI
          const r = radius * (1 + explosionFactor * 0.05)
          const x = r * Math.sin(theta) * Math.cos(phi)
          const y = r * Math.cos(theta)
          const z = r * Math.sin(theta) * Math.sin(phi)
          vertices.push(x, y, z)
        }
      }
      self.postMessage({ type: 'vertices_calculated', vertices })
      return
    }

    if (type === 'generate_particles') {
      const { count = 1000, radius = 1, spread = 1 } = params
      const particles = []
      for (let i = 0; i < count; i++) {
        const r = radius + (Math.random() - 0.5) * spread
        const theta = Math.acos(2 * Math.random() - 1)
        const phi = 2 * Math.PI * Math.random()
        const x = r * Math.sin(theta) * Math.cos(phi)
        const y = r * Math.cos(theta)
        const z = r * Math.sin(theta) * Math.sin(phi)
        particles.push(x, y, z)
      }
      self.postMessage({ type: 'particles_generated', particles })
      return
    }

    if (type === 'simulate_physics') {
      const { vertices = [] } = params
      // No-op physics stub; echo back
      self.postMessage({ type: 'physics_simulated', result: vertices })
      return
    }
  } catch (err) {
    self.postMessage({ type: 'worker_error', message: String(err) })
  }
})
