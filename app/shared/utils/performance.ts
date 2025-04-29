/**
 * Utility functions for performance optimization
 */

/**
 * Throttle function to limit how often a function can be called
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0
  let lastResult: ReturnType<T> | undefined

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastResult = func.apply(this, args)
      lastCall = now
    }
    return lastResult
  }
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Batch updates to DOM or state to reduce render cycles
 * @param items The items to process
 * @param processFn The function to process each item
 * @param batchSize The number of items to process in each batch
 * @param interval The interval between batches in milliseconds
 */
export function batchProcessing<T>(
  items: T[],
  processFn: (item: T) => void,
  batchSize = 100,
  interval = 16, // ~1 frame at 60fps
): void {
  let index = 0

  function processNextBatch() {
    const end = Math.min(index + batchSize, items.length)

    for (let i = index; i < end; i++) {
      processFn(items[i])
    }

    index = end

    if (index < items.length) {
      setTimeout(processNextBatch, interval)
    }
  }

  processNextBatch()
}

/**
 * Memoize a function to cache its results
 * @param fn The function to memoize
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  } as T
}

/**
 * Create a function that runs at most once per animation frame
 * @param callback The function to call
 */
export function rafThrottle<T extends (...args: any[]) => any>(callback: T): (...args: Parameters<T>) => void {
  let requestId: number | null = null
  let lastArgs: Parameters<T> | null = null

  const later = () => {
    requestId = null
    if (lastArgs) {
      callback(...lastArgs)
      lastArgs = null
    }
  }

  return function throttled(...args: Parameters<T>): void {
    lastArgs = args

    if (requestId === null) {
      requestId = requestAnimationFrame(later)
    }
  }
}

/**
 * Measure the execution time of a function
 * @param fn The function to measure
 * @param label A label for the console output
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  label = "Function execution time",
): (...args: Parameters<T>) => ReturnType<T> {
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const start = performance.now()
    const result = fn.apply(this, args)
    const end = performance.now()
    console.log(`${label}: ${end - start}ms`)
    return result
  }
}

/**
 * Optimized scroll handler using requestAnimationFrame
 * @param callback The function to call on scroll
 */
export function createOptimizedScrollHandler<T extends (...args: any[]) => any>(callback: T): () => void {
  let ticking = false
  let lastScrollY = window.scrollY

  const handleScroll = () => {
    lastScrollY = window.scrollY

    if (!ticking) {
      requestAnimationFrame(() => {
        callback(lastScrollY)
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })

  return () => window.removeEventListener("scroll", handleScroll)
}

/**
 * Batch update for particle systems
 * @param particleCount Total number of particles
 * @param batchSize Number of particles to update per frame
 * @param updateFn Function to update a single particle
 */
export function batchUpdateParticles(
  particleCount: number,
  batchSize: number,
  updateFn: (index: number) => void,
): void {
  // Randomly select a starting point to distribute updates more evenly
  const startIndex = Math.floor(Math.random() * (particleCount - batchSize))

  for (let i = startIndex; i < startIndex + batchSize; i++) {
    const idx = i % particleCount // Wrap around if needed
    updateFn(idx)
  }
}
