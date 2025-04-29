"use client"

import { motion } from "framer-motion"
import { LoadingSpinner } from "./LoadingSpinner"

interface LoadingPlaceholderProps {
  text?: string
  height?: string
  className?: string
}

export function LoadingPlaceholder({ text = "Loading...", height = "h-64", className = "" }: LoadingPlaceholderProps) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center ${height} bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LoadingSpinner size="md" color="purple" className="mb-4" />
      <p className="text-sm text-purple-300/80">{text}</p>
    </motion.div>
  )
}
