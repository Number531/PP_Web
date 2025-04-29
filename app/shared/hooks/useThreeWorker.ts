import { useRef, useState, useEffect, useCallback } from 'react'

interface VertexCalculationParams {
  radius: number
  detail: number
  explosionFactor: number
}

interface ParticleGenerationParams {
  count: number
  radius: number
  spread: number
}

interface PhysicsSimulationParams {
  vertices: number[]
  forces: number[]
  constraints: number[]
}

/**
 * Custom hook to interact with the THREE.js Web Worker
 * Offloads heavy computations from the main thread
 */
export function useThreeWorker() {
  const workerRef = useRef<Worker | null>(null)
  const [isReady, setIsReady] = useState(false)
  
  // Initialize the worker
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      workerRef.current = new Worker('/workers/three-worker.js')
      
      workerRef.current.onmessage = (event) => {
        const { type } = event.data
        
        if (type === 'ready') {
          setIsReady(true)
        }
      }
      
      // Send initialization message
      workerRef.current.postMessage({ type: 'init' })
      
      return () => {
        workerRef.current?.terminate()
      }
    } catch (error) {
      console.error('Failed to initialize THREE.js worker:', error)
    }
  }, [])
  
  // Calculate vertices in the worker thread
  const calculateVertices = useCallback((params: VertexCalculationParams) => {
    if (!workerRef.current || !isReady) return
    
    return new Promise<number[]>((resolve) => {
      const messageHandler = (event: MessageEvent) => {
        const { type, vertices } = event.data
        
        if (type === 'vertices_calculated') {
          workerRef.current?.removeEventListener('message', messageHandler)
          resolve(vertices)
        }
      }
      
      workerRef.current.addEventListener('message', messageHandler)
      workerRef.current.postMessage({
        type: 'calculate_vertices',
        params
      })
    })
  }, [isReady])
  
  // Generate particles in the worker thread
  const generateParticles = useCallback((params: ParticleGenerationParams) => {
    if (!workerRef.current || !isReady) return
    
    return new Promise<number[]>((resolve) => {
      const messageHandler = (event: MessageEvent) => {
        const { type, particles } = event.data
        
        if (type === 'particles_generated') {
          workerRef.current?.removeEventListener('message', messageHandler)
          resolve(particles)
        }
      }
      
      workerRef.current.addEventListener('message', messageHandler)
      workerRef.current.postMessage({
        type: 'generate_particles',
        params
      })
    })
  }, [isReady])
  
  // Simulate physics in the worker thread
  const simulatePhysics = useCallback((params: PhysicsSimulationParams) => {
    if (!workerRef.current || !isReady) return
    
    return new Promise<number[]>((resolve) => {
      const messageHandler = (event: MessageEvent) => {
        const { type, result } = event.data
        
        if (type === 'physics_simulated') {
          workerRef.current?.removeEventListener('message', messageHandler)
          resolve(result)
        }
      }
      
      workerRef.current.addEventListener('message', messageHandler)
      workerRef.current.postMessage({
        type: 'simulate_physics',
        params
      })
    })
  }, [isReady])
  
  return {
    isReady,
    calculateVertices,
    generateParticles,
    simulatePhysics
  }
}

export default useThreeWorker
