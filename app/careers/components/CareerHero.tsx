"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CareerHero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 md:px-8 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Join the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">Future</span>{" "}
            of AI
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Help us build AI systems that are accurate, transparent, and trustworthy. Be part of a team that's
            redefining what's possible.
          </p>

          <div className="pt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#open-positions"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-md font-medium transition-colors duration-300"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
