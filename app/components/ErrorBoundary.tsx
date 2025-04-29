"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    // You could send this to your error reporting service
    if (typeof window !== "undefined" && window.location) {
      const errorData = {
        error: error.toString(),
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }

      // Don't actually send in development to avoid console noise
      if (process.env.NODE_ENV === "production") {
        // Example: send to your error reporting service
        // reportError(errorData);
        console.log("Would report error in production:", errorData)
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p className="mb-6">
                We apologize for the inconvenience. Please try refreshing the page or contact support if the problem
                persists.
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false })
                  window.location.href = "/"
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        )
      )
    }

    // Important: preserve all props and refs to ensure animations work
    return this.props.children
  }
}
