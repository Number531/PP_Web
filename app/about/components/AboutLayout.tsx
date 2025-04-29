"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AboutLayoutProps {
  children: ReactNode
  className?: string
}

export function AboutLayout({ children, className = "" }: AboutLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  )
}
