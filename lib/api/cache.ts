/**
 * Simple cache implementation for API responses
 */
export class ApiCache {
  private cache: Map<string, { data: any; timestamp: number }>
  private maxAge: number
  private maxSize: number

  constructor(config: { enabled: boolean; maxAge: number; maxSize: number }) {
    this.cache = new Map()
    this.maxAge = config.maxAge
    this.maxSize = config.maxSize
  }

  /**
   * Get an item from the cache
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // Check if the item has expired
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  /**
   * Set an item in the cache
   */
  set(key: string, data: any): void {
    // If the cache is full, remove the oldest item
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, { data, timestamp: Date.now() })
  }

  /**
   * Remove an item from the cache
   */
  remove(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get the number of items in the cache
   */
  size(): number {
    return this.cache.size
  }
}
