// Performance monitoring utility

type PerformanceConfig = {
  preserveAnimations?: boolean
  throttleAnimations?: boolean
  sampleRate?: number
  reportingThreshold?: number
}

// Default configuration
const defaultConfig: PerformanceConfig = {
  preserveAnimations: true,
  throttleAnimations: false,
  sampleRate: 0.1, // Only sample 10% of users
  reportingThreshold: 30, // Only report if FPS drops below 30
}

// Initialize performance monitoring
export function initPerformanceMonitoring(config: PerformanceConfig = {}) {
  // Merge provided config with defaults
  const finalConfig = { ...defaultConfig, ...config }

  if (typeof window === "undefined") return

  // Don't run in development
  if (process.env.NODE_ENV !== "production") return

  // Sample users based on rate
  if (Math.random() > finalConfig.sampleRate) return

  let lastTime = performance.now()
  let frames = 0
  let totalFPS = 0
  let lowFPSCount = 0

  // Track FPS
  function measureFPS() {
    frames++
    const currentTime = performance.now()
    const elapsed = currentTime - lastTime

    if (elapsed >= 1000) {
      const fps = Math.round((frames * 1000) / elapsed)
      totalFPS += fps

      // Check if FPS is below threshold
      if (fps < finalConfig.reportingThreshold!) {
        lowFPSCount++

        // Log performance issue
        console.warn(`Low FPS detected: ${fps}`)

        // You could send this to your analytics or monitoring service
        if (lowFPSCount >= 3) {
          // reportPerformanceIssue({ fps, url: window.location.href })
          console.log("Would report performance issue in production")
        }
      }

      frames = 0
      lastTime = currentTime
    }

    // Don't throttle animations if preserveAnimations is true
    if (!finalConfig.throttleAnimations) {
      requestAnimationFrame(measureFPS)
    } else {
      // Use a slower rate for measurement to reduce overhead
      setTimeout(() => requestAnimationFrame(measureFPS), 500)
    }
  }

  // Start measuring
  requestAnimationFrame(measureFPS)

  // Monitor memory usage if available
  if (performance.memory) {
    setInterval(() => {
      const memoryInfo = performance.memory as any
      if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9) {
        console.warn("High memory usage detected")
        // reportMemoryIssue({ memory: memoryInfo, url: window.location.href })
      }
    }, 10000)
  }

  // Monitor long tasks
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only report tasks that block for more than 100ms
          if (entry.duration > 100) {
            console.warn(`Long task detected: ${entry.duration}ms`)
            // reportLongTask({ duration: entry.duration, url: window.location.href })
          }
        }
      })

      observer.observe({ entryTypes: ["longtask"] })
    } catch (e) {
      console.error("PerformanceObserver for longtask not supported", e)
    }
  }

  return {
    stop: () => {
      // Cleanup function if needed
    },
  }
}
