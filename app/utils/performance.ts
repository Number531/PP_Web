/**
 * Utility functions for performance optimization
 */

/**
 * Throttle function to limit how often a function can be called
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let inThrottle = false
  let lastResult: ReturnType<T> | undefined

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    if (!inThrottle) {
      lastResult = func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
    return lastResult
  }
}

/**
 * Debounce function to delay execution until after a period of inactivity
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
