import { type ErrorInterceptor, UnauthorizedError } from "../types"

/**
 * Create an error interceptor that handles common error scenarios
 */
export function createErrorInterceptor(): ErrorInterceptor {
  return (error) => {
    // Handle unauthorized errors (e.g., redirect to login)
    if (error instanceof UnauthorizedError) {
      // In a real app, you might want to redirect to the login page
      console.log("Unauthorized error, redirecting to login...")

      // Example: If you're using Next.js, you could redirect to the login page
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/login'
      // }
    }

    // Re-throw the error to be handled by the caller
    throw error
  }
}
