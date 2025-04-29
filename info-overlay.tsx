"use client"

import { motion } from "framer-motion"

export function InfoOverlay({ scrollPosition }: { scrollPosition: number }) {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full p-4 text-white text-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: scrollPosition > 100 ? 0 : 1 }} // Changed from 300 to 100 for faster disappearance
      transition={{ duration: 0.5 }} // Reduced from 1.5 to 0.5 for quicker fade-out
    >
      <h1 className="text-2xl font-bold mb-2">Interactive Cosmic Sphere</h1>
      <p>Scroll to experience the extremely gradual expansion of the universe</p>
    </motion.div>
  )
}
