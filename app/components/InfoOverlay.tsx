"use client"

import { motion } from "framer-motion"

interface InfoOverlayProps {
  scrollPosition: number
  animationComplete: boolean
}

export function InfoOverlay({ scrollPosition, animationComplete }: InfoOverlayProps) {
  // Hide this component when animation is complete or we've scrolled past the threshold
  if (animationComplete) return null

  const scrollProgress = Math.min(scrollPosition / (document.body.scrollHeight - window.innerHeight), 1) || 0
  const isNearlyComplete = scrollProgress > 0.9

  // Only show the progress bar when nearly complete, otherwise show nothing
  if (!isNearlyComplete) return null

  return (
    <motion.div
      className="fixed bottom-8 left-0 w-full p-4 text-center pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {isNearlyComplete && (
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
            <motion.div className="h-full bg-purple-500" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
