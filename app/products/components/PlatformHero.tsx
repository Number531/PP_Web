"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function PlatformHero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
              <span className="text-sm font-medium">Hallucination-Free AI</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                PSQRD
              </span>{" "}
              Platform
            </h1>

            <p className="text-xl text-white/80 max-w-xl">
              Advanced AI engineered to eliminate hallucinations and deliver independently validated, source-transparent
              information, enabling organizations to leverage AI with unprecedented confidence and efficiency.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>99.9% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Source Verification</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Enterprise Security</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Request a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-lg p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-700"></div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Input Your Query</h3>
                  <p className="text-white/70 text-sm">Ask complex questions or request information on any topic.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">PSQRD Verification</h3>
                  <p className="text-white/70 text-sm">
                    Our system retrieves, verifies, and validates information from trusted sources.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Accurate Results</h3>
                  <p className="text-white/70 text-sm">
                    Receive factually accurate information with source attribution and confidence scores.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-500/10">
                <div className="text-center">
                  <span className="text-xs text-white/50">
                    Trusted by leading organizations in legal, media, and finance
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
