"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Text } from "@/components/ui/text"

interface CompletionIndicatorProps {
  isVisible: boolean
}

export function CompletionIndicator({ isVisible }: CompletionIndicatorProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mb-4 shadow-glow"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Check className="w-8 h-8 text-white" />
      </motion.div>
      <Text
        variant="h3"
        className="text-white mb-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        glow
      >
        Expansion Complete
      </Text>
      <Text
        variant="caption"
        className="text-white/70"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Explore the full platform experience
      </Text>
    </motion.div>
  )
}

export default CompletionIndicator
