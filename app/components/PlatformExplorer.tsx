"use client"

import { motion } from "framer-motion"
import { Layers, X } from "lucide-react"

interface PlatformExplorerProps {
  isActive: boolean
  onToggle: () => void
}

export function PlatformExplorer({ isActive, onToggle }: PlatformExplorerProps) {
  return (
    <motion.button
      className={`fixed bottom-8 right-8 z-50 rounded-full py-3 px-5 backdrop-blur-md text-white shadow-lg flex items-center gap-2 ${
        isActive ? "bg-purple-900/90 border border-purple-500/50" : "bg-purple-900/40 border border-purple-500/30"
      }`}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={isActive ? "Hide platform features" : "Explore our platform"}
      aria-expanded={isActive}
      aria-controls="platform-features"
    >
      {isActive ? (
        <>
          <X className="w-5 h-5 text-purple-300" aria-hidden="true" />
          <span className="text-sm font-medium">Close</span>
        </>
      ) : (
        <>
          <Layers className="w-5 h-5 text-purple-300" aria-hidden="true" />
          <span className="text-sm font-medium">Explore Platform</span>
        </>
      )}
    </motion.button>
  )
}
