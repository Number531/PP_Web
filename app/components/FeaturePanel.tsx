"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { COMPANY_FACTS } from "../data/company-content"

interface FeaturePanelProps {
  isActive: boolean
  title: string
  description: string
}

export function FeaturePanel({ isActive, title, description }: FeaturePanelProps) {
  const [fact, setFact] = useState("")

  useEffect(() => {
    if (isActive) {
      const randomFact = COMPANY_FACTS[Math.floor(Math.random() * COMPANY_FACTS.length)]
      setFact(randomFact)
    }
  }, [isActive, title])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed bottom-16 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-black/80 backdrop-blur-md rounded-lg border border-purple-500/30 text-white z-40 overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 text-purple-300">{title}</h2>
            <p className="text-sm text-gray-300 mb-4">{description}</p>
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <h3 className="text-sm font-semibold text-purple-300 mb-1">Key Insight</h3>
              <p className="text-xs text-gray-400">{fact}</p>
            </div>
            <motion.button
              className="mt-4 flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200 transition-colors"
              whileHover={{ x: 5 }}
            >
              Request a demo <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
