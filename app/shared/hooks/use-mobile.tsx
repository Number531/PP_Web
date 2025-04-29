"use client"

import { useState, useEffect } from "react"

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

export function useMobile(breakpoint: Breakpoint | number = "md"): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const breakpointMap: Record<Breakpoint, number> = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    }

    const breakpointValue = typeof breakpoint === "number" ? breakpoint : breakpointMap[breakpoint]

    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpointValue)
    }

    // Initial check
    checkMobile()

    // Add event listener with debounce for performance
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isMobile
}
