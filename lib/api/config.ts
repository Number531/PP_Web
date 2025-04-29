/**
 * API configuration
 */
export const API_CONFIG = {
  // Default base URL for API requests (can be overridden with environment variables)
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",

  // For demo purposes, we can use JSONPlaceholder
  demoBaseURL: "https://jsonplaceholder.typicode.com",

  // Default timeout in milliseconds
  timeout: 30000,

  // Default headers
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Cache configuration
  cache: {
    enabled: true,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxSize: 100, // Maximum number of cached items
  },

  // Retry configuration
  retry: {
    count: 3,
    delay: 1000,
    shouldRetry: (error: any) => {
      // Retry on network errors, timeouts, and 5xx server errors
      return (
        error.name === "NetworkError" ||
        error.name === "TimeoutError" ||
        (error.status && error.status >= 500 && error.status < 600)
      )
    },
  },
}

/**
 * Create a configured API client for a specific API
 * @param type The type of API client to create
 * @returns The API client configuration
 */
export function getApiConfig(type: "default" | "demo" = "default") {
  return {
    baseURL: type === "demo" ? API_CONFIG.demoBaseURL : API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    defaultHeaders: API_CONFIG.defaultHeaders,
    cache: API_CONFIG.cache,
    retry: API_CONFIG.retry,
  }
}
