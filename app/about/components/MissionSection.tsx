"use client"

import { motion } from "framer-motion"
import { Target, Zap, Shield } from "lucide-react"

export function MissionSection() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Eliminating AI Hallucinations, <br />
              <span className="text-gradient">One Fact at a Time</span>
            </h2>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              At PSQRD, we're on a mission to transform how businesses and organizations use AI by ensuring every output
              is factually accurate, transparent, and trustworthy.
            </p>
            <p className="text-white/80 mb-8 leading-relaxed">
              We believe that for AI to reach its full potential, users must be able to trust the information it
              provides. That's why we've developed proprietary technology that eliminates hallucinations and provides
              source verification for every insight.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Accuracy at Scale</h3>
                  <p className="text-white/70">
                    Our systems achieve over 99.9% accuracy while processing information 100x faster than traditional
                    methods.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Radical Transparency</h3>
                  <p className="text-white/70">
                    Every insight comes with linked sources, allowing instant verification and building trust in
                    AI-generated information.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              We envision a world where AI is a trusted partner in decision-making across every industry, from
              journalism and law to healthcare and finance.
            </p>
            <p className="text-white/80 mb-6 leading-relaxed">
              By 2030, we aim to make hallucination-free AI the standard, not the exception, empowering organizations to
              make faster, better decisions with complete confidence in the information they receive.
            </p>
            <div className="border-t border-purple-500/20 pt-6 mt-6">
              <blockquote className="text-xl italic text-white/70">
                "The true potential of AI will only be realized when people can trust it implicitly. That's the future
                we're building at PSQRD."
              </blockquote>
              <p className="text-right mt-4 text-purple-300 font-medium">— Dr. Elena Chen, Founder & CEO</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
