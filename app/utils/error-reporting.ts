/**
 * Error reporting utility for monitoring and tracking errors
 */

type ErrorContext = {
  componentStack?: string
  url?: string
  userId?: string
  timestamp?: string
  [key: string]: any
}

/**
 * Report an error to the monitoring service
 * @param error The error object
 * @param context Additional context about the error
 */
export function reportError(error: Error, context: ErrorContext = {}) {
  // In development, just log to console
  if (process.env.NODE_ENV !== "production") {
    console.group("Error Report")
    console.error(error)
    console.info("Context:", context)
    console.groupEnd()
    return
  }

  // In production, send to error monitoring service
  try {
    // Add user information if available
    const userId = typeof localStorage !== "undefined" ? localStorage.getItem("userId") : null
    if (userId) {
      context.userId = userId
    }

    // Add browser information
    if (typeof navigator !== "undefined") {
      context.userAgent = navigator.userAgent
      context.language = navigator.language
    }

    // Add application version
    context.appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "unknown"

    // Here you would send the error to your monitoring service
    // Example with a fetch request:
    /*
    fetch('/api/error-reporting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        name: error.name,
        context
      }),
    }).catch(sendError => {
      // If reporting fails, log to console as fallback
      console.error('Failed to report error:', sendError)
    })
    */

    // For now, log to console in production too
    console.error("[Error Report]", error, context)
  } catch (reportingError) {
    // If anything goes wrong with reporting, log to console
    console.error("Error reporting failed:", reportingError)
    console.error("Original error:", error)
  }
}

/**
 * Initialize global error handlers
 */
export function initializeErrorHandlers() {
  if (typeof window === "undefined") return

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), {
      type: "unhandledRejection",
      timestamp: new Date().toISOString(),
      url: window.location.href,
    })
  })

  // Handle uncaught errors
  window.addEventListener("error", (event) => {
    // Prevent reporting error twice if it's already handled by React error boundary
    if (event.error && event.error._isReactError) return

    reportError(event.error || new Error(event.message), {
      type: "uncaughtError",
      timestamp: new Date().toISOString(),
      url: window.location.href,
      lineNumber: event.lineno,
      columnNumber: event.colno,
      filename: event.filename,
    })
  })
}
