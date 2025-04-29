import {
  type ApiClientConfig,
  ApiError,
  type ApiResponse,
  type ErrorInterceptor,
  ForbiddenError,
  NetworkError,
  NotFoundError,
  type RequestInterceptor,
  type RequestOptions,
  type ResponseInterceptor,
  ServerError,
  TimeoutError,
  UnauthorizedError,
  ValidationError,
} from "./types"
import { ApiCache } from "./cache"
import { RequestDeduplicator } from "./deduplication"

export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number
  private cache: ApiCache | null
  private deduplicator: RequestDeduplicator
  private defaultRetry: { count: number; delay: number; shouldRetry?: (error: ApiError) => boolean }
  private requestInterceptors: RequestInterceptor[]
  private responseInterceptors: ResponseInterceptor[]
  private errorInterceptors: ErrorInterceptor[]

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config.defaultHeaders,
    }
    this.defaultTimeout = config.timeout || 30000 // Default 30 seconds
    this.cache = config.cache ? new ApiCache(config.cache) : null
    this.deduplicator = new RequestDeduplicator()
    this.defaultRetry = config.retry || { count: 0, delay: 1000 }
    this.requestInterceptors = []
    this.responseInterceptors = []
    this.errorInterceptors = []
  }

  /**
   * Add a request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  /**
   * Add a response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  /**
   * Add an error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor)
  }

  /**
   * Apply request interceptors
   */
  private applyRequestInterceptors(
    url: string,
    options: RequestOptions,
    data?: any,
  ): { url: string; options: RequestOptions; data?: any } {
    let result = { url, options, data }

    for (const interceptor of this.requestInterceptors) {
      result = interceptor(result.url, result.options, result.data)
    }

    return result
  }

  /**
   * Apply response interceptors
   */
  private applyResponseInterceptors(response: ApiResponse): ApiResponse {
    let result = response

    for (const interceptor of this.responseInterceptors) {
      result = interceptor(result)
    }

    return result
  }

  /**
   * Apply error interceptors
   */
  private async applyErrorInterceptors(error: ApiError): Promise<ApiResponse> {
    let currentError = error

    for (const interceptor of this.errorInterceptors) {
      try {
        const result = interceptor(currentError)

        if (result instanceof Promise) {
          return await result
        } else if (result instanceof ApiError) {
          currentError = result
        } else {
          return result
        }
      } catch (e) {
        if (e instanceof ApiError) {
          currentError = e
        } else {
          throw e
        }
      }
    }

    throw currentError
  }

  /**
   * Generate a cache key for a request
   */
  private generateCacheKey(method: string, url: string, data?: any): string {
    return `${method}:${url}:${data ? JSON.stringify(data) : ""}`
  }

  /**
   * Generate a full URL from a path
   */
  private getFullUrl(path: string): string {
    // Remove trailing slash from baseURL if it exists
    const base = this.baseURL.endsWith("/") ? this.baseURL.slice(0, -1) : this.baseURL

    // Remove leading slash from path if it exists
    const cleanPath = path.startsWith("/") ? path.slice(1) : path

    return `${base}/${cleanPath}`
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): never {
    if (error instanceof ApiError) {
      throw error
    }

    if (error.name === "AbortError") {
      throw new TimeoutError("Request aborted")
    }

    if (!navigator.onLine) {
      throw new NetworkError("No internet connection")
    }

    if (error.response) {
      const { status, data } = error.response
      const message = data?.message || "An error occurred"

      switch (status) {
        case 401:
          throw new UnauthorizedError(message, data)
        case 403:
          throw new ForbiddenError(message, data)
        case 404:
          throw new NotFoundError(message, data)
        case 422:
          throw new ValidationError(message, data)
        case 500:
        case 502:
        case 503:
        case 504:
          throw new ServerError(message, data)
        default:
          throw new ApiError(message, status, data)
      }
    }

    if (error.request) {
      throw new NetworkError("No response received from server")
    }

    throw new ApiError(error.message || "Unknown error", 0)
  }

  /**
   * Execute a request with retries
   */
  private async executeWithRetry<T>(
    method: string,
    url: string,
    options: RequestOptions,
    data?: any,
  ): Promise<ApiResponse<T>> {
    const retryConfig = options.retry || this.defaultRetry
    let lastError: ApiError | null = null

    for (let attempt = 0; attempt <= retryConfig.count; attempt++) {
      try {
        return await this.executeRequest<T>(method, url, options, data)
      } catch (error) {
        if (error instanceof ApiError) {
          lastError = error

          // Check if we should retry
          const shouldRetry = retryConfig.shouldRetry
            ? retryConfig.shouldRetry(error)
            : error instanceof NetworkError || error instanceof TimeoutError || error instanceof ServerError

          if (attempt < retryConfig.count && shouldRetry) {
            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, retryConfig.delay))
            continue
          }
        }

        throw error
      }
    }

    // If we get here, all retries failed
    throw lastError || new ApiError("All retry attempts failed", 0)
  }

  /**
   * Execute a request
   */
  private async executeRequest<T>(
    method: string,
    url: string,
    options: RequestOptions,
    data?: any,
  ): Promise<ApiResponse<T>> {
    const fullUrl = this.getFullUrl(url)
    const headers = { ...this.defaultHeaders, ...options.headers }
    const timeout = options.timeout || this.defaultTimeout

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: options.signal || controller.signal,
      })

      // Parse response
      let responseData: T
      const contentType = response.headers.get("content-type")

      if (contentType?.includes("application/json")) {
        responseData = await response.json()
      } else {
        responseData = (await response.text()) as unknown as T
      }

      // Convert headers to a plain object
      const responseHeaders: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      // Create response object
      const apiResponse: ApiResponse<T> = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      }

      // Check if response is an error
      if (!response.ok) {
        this.handleError({
          response: {
            status: response.status,
            data: responseData,
          },
        })
      }

      // Apply response interceptors
      return this.applyResponseInterceptors(apiResponse) as ApiResponse<T>
    } catch (error) {
      return this.handleError(error)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * Make a request
   */
  private async request<T>(
    method: string,
    url: string,
    options: RequestOptions = {},
    data?: any,
  ): Promise<ApiResponse<T>> {
    try {
      // Apply request interceptors
      const intercepted = this.applyRequestInterceptors(url, options, data)
      url = intercepted.url
      options = intercepted.options
      data = intercepted.data

      // Check cache if enabled
      const cacheKey = this.generateCacheKey(method, url, data)
      if (options.cache !== false && this.cache && method === "GET") {
        const cachedResponse = this.cache.get<ApiResponse<T>>(cacheKey)
        if (cachedResponse) {
          return cachedResponse
        }
      }

      // Handle request deduplication if enabled
      if (options.deduplicate !== false && method === "GET") {
        const response = await this.deduplicator.register<ApiResponse<T>>(cacheKey, () =>
          this.executeWithRetry<T>(method, url, options, data),
        )

        // Cache the response if caching is enabled
        if (options.cache !== false && this.cache && method === "GET") {
          this.cache.set(cacheKey, response)
        }

        return response
      }

      // Execute the request normally
      const response = await this.executeWithRetry<T>(method, url, options, data)

      // Cache the response if caching is enabled
      if (options.cache !== false && this.cache && method === "GET") {
        this.cache.set(cacheKey, response)
      }

      return response
    } catch (error) {
      if (error instanceof ApiError) {
        return this.applyErrorInterceptors(error)
      }
      throw error
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, options)
  }

  /**
   * Make a POST request
   */
  async post<T>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, options, data)
  }

  /**
   * Make a PUT request
   */
  async put<T>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, options, data)
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(url: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", url, options, data)
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, options)
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    if (this.cache) {
      this.cache.clear()
    }
  }
}
