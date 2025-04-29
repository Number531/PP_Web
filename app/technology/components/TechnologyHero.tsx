"use client"

import { motion } from "framer-motion"
import { GradientButton } from "@/app/features/ui/GradientButton"

export function TechnologyHero() {
  return (
    <section className="relative pt-24 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Technology</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl">
            Engineered for accuracy and transparency, our platform combines advanced technologies to ensure reliable,
            verifiable results in every interaction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <GradientButton href="/contact" className="px-8 py-3">
            Schedule a Demo
          </GradientButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">Technology Overview Video</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
