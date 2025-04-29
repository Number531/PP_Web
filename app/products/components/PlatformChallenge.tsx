"use client"

import { motion } from "framer-motion"

export function PlatformChallenge() {
  return (
    <section className="py-16 px-4 md:px-8 bg-black/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Standard AI Falls <span className="text-gradient">Short</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
        >
          <p className="text-xl text-white/80 leading-relaxed">
            While generative AI offers tremendous potential, its tendency to 'hallucinate' creates significant risks in
            high-stakes environments. Inaccurate information erodes trust, leads to costly errors, and hinders reliable
            adoption for critical tasks in fields like news and law.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 text-red-400">Factual Inaccuracies</h3>
              <p className="text-white/70 text-sm">
                Standard AI models frequently generate plausible-sounding but entirely fabricated information.
              </p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 text-red-400">Lack of Transparency</h3>
              <p className="text-white/70 text-sm">
                Most AI systems provide no way to verify the sources of their information or validate their claims.
              </p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 text-red-400">Eroded Trust</h3>
              <p className="text-white/70 text-sm">
                Without reliability guarantees, organizations cannot confidently deploy AI for mission-critical
                applications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
