"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  opacity?: boolean
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  opacity = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const upTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const downTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const leftTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const rightTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  // Calculate transform based on direction
  const getTransform = () => {
    switch (direction) {
      case "up":
        return upTransform
      case "down":
        return downTransform
      case "left":
        return leftTransform
      case "right":
        return rightTransform
      default:
        return upTransform
    }
  }

  const transform = getTransform()
  const opacityValue = opacity ? useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]) : 1

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{
          [direction === "left" || direction === "right" ? "x" : "y"]: transform,
          opacity: opacityValue,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
