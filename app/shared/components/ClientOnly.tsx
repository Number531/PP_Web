"use client"

import { useEffect, useState, ReactNode } from "react"

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Component that only renders its children on the client side
 * Useful for components that use browser APIs or cause hydration mismatches
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? children : fallback
}
