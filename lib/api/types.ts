/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseURL: string
  defaultHeaders?: Record<string, string>
  timeout?: number
  cache?: {
    enabled: boolean
    maxAge: number
    maxSize: number
  }
  retry?: {
    count: number
    delay: number
    shouldRetry?: (error: ApiError) => boolean
  }
}

/**
 * Request options
 */
export interface RequestOptions {
  headers?: Record<string, string>
  timeout?: number
  signal?: AbortSignal
  cache?: boolean
  deduplicate?: boolean
  retry?: {
    count: number
    delay: number
    shouldRetry?: (error: ApiError) => boolean
  }
}

/**
 * API response
 */
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

/**
 * Request interceptor
 */
export type RequestInterceptor = (
  url: string,
  options: RequestOptions,
  data?: any,
) => { url: string; options: RequestOptions; data?: any }

/**
 * Response interceptor
 */
export type ResponseInterceptor = (response: ApiResponse) => ApiResponse

/**
 * Error interceptor
 */
export type ErrorInterceptor = (error: ApiError) => ApiResponse | Promise<ApiResponse> | ApiError

/**
 * Base API error
 */
export class ApiError extends Error {
  status: number
  data?: any

  constructor(message: string, status: number, data?: any) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

/**
 * Network error
 */
export class NetworkError extends ApiError {
  constructor(message: string) {
    super(message, 0)
    this.name = "NetworkError"
  }
}

/**
 * Timeout error
 */
export class TimeoutError extends ApiError {
  constructor(message: string) {
    super(message, 0)
    this.name = "TimeoutError"
  }
}

/**
 * Unauthorized error (401)
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string, data?: any) {
    super(message, 401, data)
    this.name = "UnauthorizedError"
  }
}

/**
 * Forbidden error (403)
 */
export class ForbiddenError extends ApiError {
  constructor(message: string, data?: any) {
    super(message, 403, data)
    this.name = "ForbiddenError"
  }
}

/**
 * Not found error (404)
 */
export class NotFoundError extends ApiError {
  constructor(message: string, data?: any) {
    super(message, 404, data)
    this.name = "NotFoundError"
  }
}

/**
 * Validation error (422)
 */
export class ValidationError extends ApiError {
  constructor(message: string, data?: any) {
    super(message, 422, data)
    this.name = "ValidationError"
  }
}

/**
 * Server error (500, 502, 503, 504)
 */
export class ServerError extends ApiError {
  constructor(message: string, data?: any) {
    super(message, 500, data)
    this.name = "ServerError"
  }
}
