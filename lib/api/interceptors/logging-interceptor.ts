import type { RequestInterceptor, ResponseInterceptor } from "../types"

/**
 * Create a logging interceptor that logs requests and responses
 */
export function createLoggingInterceptor(): RequestInterceptor & ResponseInterceptor {
  return (urlOrResponse, options?, data?) => {
    // If this is a request interceptor
    if (options) {
      console.log(`🚀 Request: ${options.method || "GET"} ${urlOrResponse}`, { options, data })
      return { url: urlOrResponse, options, data }
    }

    // If this is a response interceptor
    console.log(`📥 Response:`, urlOrResponse)
    return urlOrResponse
  }
}
