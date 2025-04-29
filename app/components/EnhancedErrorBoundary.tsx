'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: any[]
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Enhanced Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * Includes performance monitoring and error reporting capabilities.
 */
class EnhancedErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capture and log the error details
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Update state with error info for rendering
    this.setState({
      errorInfo
    })
    
    // Report to error monitoring service if callback provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    // Report to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportErrorToMonitoringService(error, errorInfo)
    }
  }
  
  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset the error state if any resetKeys have changed
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      this.props.resetKeys.some((key, index) => key !== prevProps.resetKeys?.[index])
    ) {
      this.resetErrorBoundary()
    }
  }
  
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }
  
  reportErrorToMonitoringService(error: Error, errorInfo: ErrorInfo): void {
    // This would be replaced with your actual error reporting service
    // Example: Sentry, LogRocket, etc.
    try {
      const errorData = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        // Add additional context that might be helpful
        performance: {
          memory: (performance as any).memory ? {
            jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize
          } : 'Not available',
          navigation: performance.getEntriesByType('navigation').length > 0 
            ? performance.getEntriesByType('navigation')[0] 
            : 'Not available',
          // Core Web Vitals if available
          LCP: (window as any).LCP || 'Not measured',
          FID: (window as any).FID || 'Not measured',
          CLS: (window as any).CLS || 'Not measured'
        }
      }
      
      // This would be an API call to your error reporting service
      console.log('Reporting error to monitoring service:', errorData)
      
      // Example implementation:
      // fetch('/api/error-reporting', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData)
      // })
    } catch (reportingError) {
      // Ensure error reporting doesn't cause additional errors
      console.error('Error while reporting error:', reportingError)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render default error UI
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <div className="error-boundary p-6 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-3xl mx-auto my-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We've encountered an error and our team has been notified.
          </p>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-auto text-left">
              <p className="font-mono text-sm text-red-600 dark:text-red-400 mb-2">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                    Component Stack
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto p-2 bg-gray-200 dark:bg-gray-700 rounded">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}
          <button
            onClick={this.resetErrorBoundary}
            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }

    // When there's no error, render children normally
    return this.props.children
  }
}

export default EnhancedErrorBoundary
