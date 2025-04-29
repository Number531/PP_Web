import type { RequestInterceptor } from "../types"

/**
 * Create an auth interceptor that adds the auth token to requests
 */
export function createAuthInterceptor(): RequestInterceptor {
  return (url, options, data) => {
    // Get the auth token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    // If we have a token, add it to the headers
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return { url, options, data }
  }
}
