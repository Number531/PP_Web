"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "white" | "purple"
  className?: string
}

export function LoadingSpinner({ size = "md", color = "purple", className = "" }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const colorMap = {
    white: "text-white",
    purple: "text-purple-500",
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        className={`${sizeMap[size]} ${colorMap[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </motion.div>
    </div>
  )
}
