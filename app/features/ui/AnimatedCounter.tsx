"use client"

import { useState, useEffect, useRef } from "react"
import { useSpring, useMotionValue } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  formatValue = (val) => val.toFixed(0),
  className = "",
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const [displayValue, setDisplayValue] = useState(0)
  const prevValueRef = useRef(0)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      motionValue.set(value)
      prevValueRef.current = value
    }
  }, [value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [springValue])

  return <span className={className}>{formatValue(displayValue)}</span>
}
