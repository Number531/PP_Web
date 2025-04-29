"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { api } from "./index"
import { ApiError, type RequestOptions } from "./types"

interface UseApiState<T> {
  data: T | null
  isLoading: boolean
  isError: boolean
  error: ApiError | null
}

/**
 * Hook for making GET requests
 */
export function useGet<T>(url: string, options: RequestOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }))

    try {
      const response = await api.get<T>(url, options)
      setState({ data: response.data, isLoading: false, isError: false, error: null })
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        isError: true,
        error: error instanceof ApiError ? error : new ApiError("Unknown error", 0),
      })
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [state, fetchData] as const
}

/**
 * Hook for making POST requests
 */
export function usePost<T>(url: string, options: RequestOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  })

  const execute = useCallback(
    async (data?: any) => {
      setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }))

      try {
        const response = await api.post<T>(url, data, options)
        setState({ data: response.data, isLoading: false, isError: false, error: null })
        return response
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          isError: true,
          error: error instanceof ApiError ? error : new ApiError("Unknown error", 0),
        })
        throw error
      }
    },
    [url, options],
  )

  return [state, execute] as const
}

/**
 * Hook for making PUT requests
 */
export function usePut<T>(url: string, options: RequestOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  })

  const execute = useCallback(
    async (data?: any) => {
      setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }))

      try {
        const response = await api.put<T>(url, data, options)
        setState({ data: response.data, isLoading: false, isError: false, error: null })
        return response
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          isError: true,
          error: error instanceof ApiError ? error : new ApiError("Unknown error", 0),
        })
        throw error
      }
    },
    [url, options],
  )

  return [state, execute] as const
}

/**
 * Hook for making PATCH requests
 */
export function usePatch<T>(url: string, options: RequestOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  })

  const execute = useCallback(
    async (data?: any) => {
      setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }))

      try {
        const response = await api.patch<T>(url, data, options)
        setState({ data: response.data, isLoading: false, isError: false, error: null })
        return response
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          isError: true,
          error: error instanceof ApiError ? error : new ApiError("Unknown error", 0),
        })
        throw error
      }
    },
    [url, options],
  )

  return [state, execute] as const
}

/**
 * Hook for making DELETE requests
 */
export function useDelete<T>(url: string, options: RequestOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }))

    try {
      const response = await api.delete<T>(url, options)
      setState({ data: response.data, isLoading: false, isError: false, error: null })
      return response
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        isError: true,
        error: error instanceof ApiError ? error : new ApiError("Unknown error", 0),
      })
      throw error
    }
  }, [url, options])

  return [state, execute] as const
}

/**
 * Hook for infinite scrolling
 */
export function useInfiniteQuery<T>(
  getUrl: (page: number) => string,
  options: RequestOptions & { initialPage?: number } = {},
) {
  const { initialPage = 1, ...requestOptions } = options
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const isMounted = useRef(true)

  // Reset when the URL generator changes
  useEffect(() => {
    setData([])
    setPage(initialPage)
    setHasMore(true)
  }, [getUrl, initialPage])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Load initial data
  useEffect(() => {
    loadData()
  }, [getUrl, initialPage])

  const loadData = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const url = getUrl(page)
      const response = await api.get<T[]>(url, requestOptions)

      if (isMounted.current) {
        const newData = response.data

        if (newData.length === 0) {
          setHasMore(false)
        } else {
          setData((prevData) => [...prevData, ...newData])
          setPage((prevPage) => prevPage + 1)
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setError(error instanceof ApiError ? error : new ApiError("Unknown error", 0))
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }, [getUrl, page, isLoading, hasMore])

  return {
    data,
    isLoading,
    error,
    hasMore,
    loadMore: loadData,
  }
}
