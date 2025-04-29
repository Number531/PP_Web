"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"

export function useProtectedRoute() {
  const { state } = useAuth()
  const { isAuthenticated, isLoading } = state
  const router = useRouter()

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace("/")
    }
  }, [isLoading, isAuthenticated, router])

  return { isLoading }
}
