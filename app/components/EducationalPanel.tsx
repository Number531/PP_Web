"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { COSMIC_FACTS } from "../data/educational-content"

interface EducationalPanelProps {
  isActive: boolean
  title: string
  description: string
}

export function EducationalPanel({ isActive, title, description }: EducationalPanelProps) {
  const [fact, setFact] = useState("")

  useEffect(() => {
    if (isActive) {
      const randomFact = COSMIC_FACTS[Math.floor(Math.random() * COSMIC_FACTS.length)]
      setFact(randomFact)
    }
  }, [isActive, title])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed bottom-16 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-white z-40 overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-300 mb-4">{description}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-yellow-300 mb-1">Did You Know?</h3>
              <p className="text-xs text-gray-400">{fact}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
