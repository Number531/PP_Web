"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Layers } from "lucide-react"

interface ExplorerModeIndicatorProps {
  isActive: boolean
}

export function ExplorerModeIndicator({ isActive }: ExplorerModeIndicatorProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed top-4 left-4 z-50 bg-purple-600/90 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <Layers className="w-3 h-3" />
          <span>Platform Explorer</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
