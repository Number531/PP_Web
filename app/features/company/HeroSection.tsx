"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

// Memoize the component to prevent unnecessary re-renders
export const HeroSection = memo(function HeroSection() {
  // Pre-define animation variants to reduce object creation on each render
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8 },
    }),
  }

  // Pre-define feature items to avoid recreating them on each render
  const featureItems = [
    { id: "accuracy", text: "99.9% Accuracy" },
    { id: "verification", text: "Source Verification" },
    { id: "security", text: "Enterprise Security" },
  ]

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="display text-balance mb-6"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={1.2}
          >
            AI You Can <span className="text-gradient-bright text-glow">Trust</span>
          </motion.h1>

          <motion.p
            className="subtitle text-white/80 mb-8 max-w-2xl mx-auto"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={1.4}
          >
            Guaranteed accuracy. Hallucination-free. Source-transparent.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-8"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={1.6}
          >
            {featureItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-sm font-medium text-white/90">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

export default HeroSection
