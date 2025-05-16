"use client"

import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"
import Image from "next/image"

export function PlatformSolution() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium">Our Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Introducing the <span className="text-gradient">PSQRD Platform</span>
          </h2>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">A Robust Solution for Trustworthy AI</h3>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              PSQRD provides a robust solution built on cutting-edge AI techniques specifically designed to deliver
              factual accuracy and complete transparency.
            </p>
            <p className="text-white/80 mb-8 leading-relaxed">
              Our platform empowers organizations to automate research, analysis, and content generation tasks with
              outputs they can fundamentally trust. By combining advanced retrieval techniques with rigorous validation
              processes, we've created an AI system that eliminates hallucinations while maintaining exceptional
              efficiency.
            </p>
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-3 text-purple-300">Core Purpose</h4>
              <p className="text-white/80 italic">
                "To provide organizations with AI-powered insights they can trust completely, backed by verifiable
                sources and validated for accuracy at every step."
              </p>
            </div>
          </motion.div>
      </div>
    </section>
  )
}
