"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { COMPANY_FACTS } from "../../shared/data/company-content"
import { GlassCard } from "../ui/GlassCard"

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
          className="fixed bottom-16 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <GlassCard variant="gradient" glowEffect>
            <p className="overline text-purple-300 mb-1">Feature Highlight</p>
            <h2 className="text-xl font-medium mb-3 text-white tracking-tight">{title}</h2>
            <p className="text-sm text-gray-300 mb-5 leading-relaxed">{description}</p>
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <h3 className="text-sm font-medium text-purple-300 mb-2">Key Insight</h3>
              <p className="caption text-gray-400 leading-relaxed">{fact}</p>
            </div>
            <motion.button
              className="mt-5 flex items-center gap-1.5 text-sm text-purple-300 hover:text-purple-200 transition-all duration-300 font-medium group"
              whileHover={{ x: 5 }}
            >
              Request a demo{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
