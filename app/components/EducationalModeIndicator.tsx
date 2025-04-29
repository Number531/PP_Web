"use client"

import { motion, AnimatePresence } from "framer-motion"

interface EducationalModeIndicatorProps {
  isActive: boolean
}

export function EducationalModeIndicator({ isActive }: EducationalModeIndicatorProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed top-4 left-4 z-50 bg-yellow-500/90 text-black text-xs font-medium px-3 py-1 rounded-full shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: "spring", damping: 20 }}
        >
          Educational Mode
        </motion.div>
      )}
    </AnimatePresence>
  )
}
