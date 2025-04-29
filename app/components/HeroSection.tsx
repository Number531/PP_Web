"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function HeroSection() {
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            AI You Can <span className="text-purple-500">Trust</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Guaranteed accuracy. Hallucination-free. Source-transparent.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>99.9% Accuracy</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>Source Verification</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>Enterprise Security</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
