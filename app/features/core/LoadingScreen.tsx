"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  onLoadComplete: () => void
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100)
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onLoadComplete, 500) // Slight delay before removing loading screen
        }
        return newProgress
      })
    }, 400)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-4xl font-bold text-purple-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        PSQRD
      </motion.div>

      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-4 text-white/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Loading experience...
      </motion.p>
    </motion.div>
  )
}
