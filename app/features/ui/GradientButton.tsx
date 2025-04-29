"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
  loading?: boolean
}

export function GradientButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  loading = false,
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative rounded-md font-medium transition-all duration-300 flex items-center justify-center",
        // Size variants
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        // Style variants
        variant === "primary" &&
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700",
        variant === "secondary" &&
          "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-300 hover:from-purple-500/20 hover:to-indigo-500/20",
        variant === "outline" && "border border-purple-500/30 bg-transparent text-purple-300 hover:bg-purple-500/10",
        variant === "ghost" && "bg-transparent text-purple-300 hover:bg-purple-500/10",
        // Disabled state
        props.disabled && "opacity-50 cursor-not-allowed",
        // Loading state
        loading && "cursor-wait",
        className,
      )}
      whileHover={{ scale: props.disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {icon && iconPosition === "left" && !loading && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && !loading && <span className="ml-2">{icon}</span>}

      {/* Gradient border effect for outline variant */}
      {variant === "outline" && (
        <span className="absolute inset-0 rounded-md overflow-hidden">
          <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/30 to-indigo-500/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </span>
      )}
    </motion.button>
  )
}
