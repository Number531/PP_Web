/**
 * Request deduplicator to prevent duplicate requests
 */
export class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<any>>

  constructor() {
    this.pendingRequests = new Map()
  }

  /**
   * Register a request to be deduplicated
   * @param key The request key
   * @param requestFn The function that makes the request
   * @returns The response from the request
   */
  async register<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // If there's already a pending request with this key, return it
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key) as Promise<T>
    }

    // Otherwise, make the request and store it
    const requestPromise = requestFn().finally(() => {
      // Remove the request from the pending requests map when it completes
      this.pendingRequests.delete(key)
    })

    this.pendingRequests.set(key, requestPromise)
    return requestPromise
  }

  /**
   * Check if a request is pending
   * @param key The request key
   * @returns Whether the request is pending
   */
  isPending(key: string): boolean {
    return this.pendingRequests.has(key)
  }

  /**
   * Clear all pending requests
   */
  clear(): void {
    this.pendingRequests.clear()
  }
}
