"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  glowEffect?: boolean
  variant?: "default" | "dark" | "purple" | "gradient"
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  glowEffect = false,
  variant = "default",
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl backdrop-blur-md border p-6",
        variant === "default" && "bg-white/5 border-white/10",
        variant === "dark" && "bg-black/40 border-white/5",
        variant === "purple" && "bg-purple-950/20 border-purple-500/20",
        variant === "gradient" && "bg-gradient-to-br from-purple-950/30 to-black/40 border-purple-500/10",
        glowEffect && "shadow-glow",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
