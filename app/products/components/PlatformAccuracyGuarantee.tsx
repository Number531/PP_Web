"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export function PlatformAccuracyGuarantee() {
  return (
    <section className="py-16 px-4 md:px-8 bg-black/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Accuracy Guarantee</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                We stand behind the reliability of PSQRD. Our platform is built from the ground up to prevent
                hallucinations and is subjected to rigorous validation, providing an unparalleled level of assurance in
                the accuracy of AI-generated information for critical applications.
              </p>

              <div className="mt-6 pt-6 border-t border-purple-500/20 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">99.9%</div>
                  <div className="text-sm text-white/60">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">100%</div>
                  <div className="text-sm text-white/60">Source Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">0%</div>
                  <div className="text-sm text-white/60">Hallucinations</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
