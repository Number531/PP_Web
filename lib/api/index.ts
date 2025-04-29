import { ApiClient } from "./client"
import { getApiConfig } from "./config"
import { createAuthInterceptor } from "./interceptors/auth-interceptor"
import { createLoggingInterceptor } from "./interceptors/logging-interceptor"
import { createErrorInterceptor } from "./interceptors/error-interceptor"

// Create the default API client
const apiClient = new ApiClient(getApiConfig())

// Create the demo API client (for JSONPlaceholder)
const demoApiClient = new ApiClient(getApiConfig("demo"))

// Add interceptors to the default API client
if (process.env.NODE_ENV === "development") {
  apiClient.addRequestInterceptor(createLoggingInterceptor())
  apiClient.addResponseInterceptor(createLoggingInterceptor())
}

apiClient.addRequestInterceptor(createAuthInterceptor())
apiClient.addErrorInterceptor(createErrorInterceptor())

// Add interceptors to the demo API client
if (process.env.NODE_ENV === "development") {
  demoApiClient.addRequestInterceptor(createLoggingInterceptor())
  demoApiClient.addResponseInterceptor(createLoggingInterceptor())
}

// Export the API clients
export const api = apiClient
export const demoApi = demoApiClient

// Export types and errors
export * from "./types"
