"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Layers, Shield, Zap } from "lucide-react"
import { useInView } from "react-intersection-observer"

interface CompanyContentProps {
  isVisible: boolean
  onExploreClick: () => void
}

export function CompanyContent({ isVisible, onExploreClick }: CompanyContentProps) {
  // Use intersection observer to trigger animations when content comes into view
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  if (!isVisible) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className="relative z-30 bg-gradient-to-b from-black/95 to-black/90 min-h-screen">
      <motion.div
        ref={ref}
        className="container mx-auto px-4 py-24"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="max-w-4xl mx-auto" variants={containerVariants}>
          <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-6" variants={itemVariants}>
            Eliminate <span className="text-purple-500">AI Hallucinations</span>
            <br />
            Forever
          </motion.h2>

          <motion.p className="text-xl text-white/80 mb-10" variants={itemVariants}>
            PSQRD delivers independently validated accuracy, giving you complete confidence in AI-generated content for
            critical business decisions.
          </motion.p>

          {/* Features grid */}
          <motion.div className="grid md:grid-cols-2 gap-8 mb-16" variants={containerVariants}>
            <motion.div className="bg-black/40 border border-purple-500/20 rounded-lg p-6" variants={itemVariants}>
              <Layers className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Validated Accuracy</h3>
              <p className="text-white/70">
                Our proprietary technology eliminates AI hallucinations, ensuring every output is factually accurate and
                reliable for high-stakes industries.
              </p>
            </motion.div>

            <motion.div className="bg-black/40 border border-purple-500/20 rounded-lg p-6" variants={itemVariants}>
              <Shield className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Source Transparency</h3>
              <p className="text-white/70">
                Every insight comes with linked sources, allowing instant verification and building trust in
                AI-generated information.
              </p>
            </motion.div>

            <motion.div className="bg-black/40 border border-purple-500/20 rounded-lg p-6" variants={itemVariants}>
              <Zap className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">99% Efficiency Boost</h3>
              <p className="text-white/70">
                Transform your workflow with AI that delivers accurate results in seconds instead of hours, dramatically
                reducing research and verification time.
              </p>
            </motion.div>

            <motion.div className="bg-black/40 border border-purple-500/20 rounded-lg p-6" variants={itemVariants}>
              <CheckCircle className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Enterprise Security</h3>
              <p className="text-white/70">
                Built with rigorous security standards and compliance measures to protect sensitive data in regulated
                industries.
              </p>
            </motion.div>
          </motion.div>

          {/* Industries section */}
          <motion.h3 className="text-2xl font-bold text-white mb-6" variants={itemVariants}>
            Trusted By Industry Leaders
          </motion.h3>

          <motion.div className="grid md:grid-cols-2 gap-6 mb-12" variants={containerVariants}>
            <motion.div className="border border-purple-500/20 rounded-lg p-6" variants={itemVariants}>
              <h4 className="text-lg font-bold text-purple-400 mb-2">News Media</h4>
              <p className="text-white/70 mb-3">
                Accelerate fact-checking, enhance research capabilities, and restore audience trust with AI that never
                fabricates information.
              </p>
              <p className="text-white/50 text-sm italic">
                "Reduced fact-checking time by 78% while improving accuracy."
              </p>
            </motion.div>

            <motion.div className="border border-purple-500/20 rounded-lg p-6" variants={itemVariants}>
              <h4 className="text-lg font-bold text-purple-400 mb-2">Legal Firms</h4>
              <p className="text-white/70 mb-3">
                Conduct due diligence, research precedents, and build case strategies with unprecedented speed and
                reliability.
              </p>
              <p className="text-white/50 text-sm italic">
                "Over 99.9% accuracy in precedent identification with 92% time savings."
              </p>
            </motion.div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            className="bg-black/60 border border-purple-500/30 rounded-lg p-8 text-center"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to experience AI you can trust?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              See how PSQRD can transform your operations with guaranteed accuracy, source transparency, and
              unprecedented efficiency.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                aria-label="Request a product demonstration"
              >
                Request Demo <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
                onClick={onExploreClick}
                aria-label="Explore the platform features"
              >
                Explore Platform
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
