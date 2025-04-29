"use client"

import { motion } from "framer-motion"
import { Lightbulb, LightbulbOff } from "lucide-react"

interface EducationalToggleProps {
  isActive: boolean
  onToggle: () => void
}

export function EducationalToggle({ isActive, onToggle }: EducationalToggleProps) {
  return (
    <motion.button
      className="fixed bottom-4 right-4 z-50 rounded-full p-3 bg-black/70 backdrop-blur-md text-white border border-white/20 shadow-lg"
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={isActive ? "Disable educational mode" : "Enable educational mode"}
    >
      {isActive ? (
        <Lightbulb className="w-6 h-6 text-yellow-300" />
      ) : (
        <LightbulbOff className="w-6 h-6 text-gray-400" />
      )}
    </motion.button>
  )
}
