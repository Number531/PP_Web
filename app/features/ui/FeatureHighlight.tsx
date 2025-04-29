"use client"

import { motion } from "framer-motion"
import { GlassCard } from "./GlassCard"
import type { LucideIcon } from "lucide-react"

interface FeatureHighlightProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureHighlight({ icon: Icon, title, description, className = "", delay = 0 }: FeatureHighlightProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <GlassCard className={`h-full ${className}`} variant="gradient">
        <div className="flex flex-col h-full">
          <div className="mb-4 p-3 rounded-lg bg-purple-500/10 w-fit">
            <Icon className="w-6 h-6 text-purple-400" />
          </div>

          <h3 className="text-xl font-medium text-white mb-2">{title}</h3>

          <p className="text-white/70 text-sm leading-relaxed flex-grow">{description}</p>

          <div className="mt-4 pt-4 border-t border-purple-500/10">
            <motion.a
              href="#"
              className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1 transition-colors"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
