"use client"

import { motion } from "framer-motion"

export function ContactHero() {
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
            Let's Start a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Conversation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Have questions about our AI solutions? Ready to transform your operations with hallucination-free AI? Our
            team is here to help.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
