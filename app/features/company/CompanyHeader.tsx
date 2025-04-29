"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import UI components
const GradientButton = dynamic(() => import("../ui/GradientButton").then((mod) => ({ default: mod.GradientButton })), {
  ssr: true,
  loading: () => (
    <button className="bg-purple-600 text-white px-6 py-3 rounded-md text-sm font-medium">Request Demo</button>
  ),
})

export function CompanyHeader() {
  const [scrolled, setScrolled] = useState(false)

  // Add scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className={`fixed top-0 left-0 w-full z-40 p-4 md:p-6 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-lg" : "backdrop-blur-sm"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <motion.div
            className="text-2xl font-semibold text-white flex items-center tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="animate-shimmer">PSQRD</span>
          </motion.div>
        </div>
        <div className="flex items-center gap-8">
          <motion.a
            href="#solutions"
            className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
            whileHover={{ x: 3 }}
          >
            Solutions
          </motion.a>
          <motion.a
            href="#technology"
            className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
            whileHover={{ x: 3 }}
          >
            Technology
          </motion.a>
          <motion.a
            href="#about"
            className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
            whileHover={{ x: 3 }}
          >
            About
          </motion.a>
          <Suspense
            fallback={
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Request Demo
              </button>
            }
          >
            <GradientButton variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Request Demo
            </GradientButton>
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}

export default CompanyHeader
