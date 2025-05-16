'use client'

import { motion } from "framer-motion"
import { Shield, CheckCircle, FileText, Database } from "lucide-react"

export function TechnicalApproachSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-black/5" id="technical-approach">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Our Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Achieve <span className="text-gradient">Zero Hallucinations</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our proprietary technology ensures factual consistency through a multi-layered verification approach that eliminates AI hallucinations at their source.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Our Technical Approach</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              PSQRD's zero-hallucination technology operates on a three-tier verification system that ensures factual accuracy at every step of the AI generation process.
            </p>
            <p className="text-white/80 mb-6 leading-relaxed">
              Unlike conventional AI systems that may generate plausible but incorrect information, our approach integrates source verification directly into the generation pipeline, preventing hallucinations before they occur.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <Database className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Source Verification Layer</h4>
                  <p className="text-white/70">
                    Every piece of information is cross-referenced against verified data sources in real-time, ensuring factual accuracy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Factual Consistency Checking</h4>
                  <p className="text-white/70">
                    Our proprietary algorithms detect and eliminate inconsistencies between generated content and verified facts.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Citation Generation</h4>
                  <p className="text-white/70">
                    Every insight is automatically linked to its source, providing transparent verification for users.
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
          >
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-white/80">99.7% factual accuracy rate</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-white/80">10M+ verified data sources</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-white/80">Real-time verification (200ms latency)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-white/80">Enterprise-grade security & compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-white/80">Multilingual support (12+ languages)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Implementation Process</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">1</span>
                  <div>
                    <h4 className="font-medium text-white">System Integration</h4>
                    <p className="text-white/70 text-sm">Seamless API integration with your existing infrastructure</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">2</span>
                  <div>
                    <h4 className="font-medium text-white">Data Source Configuration</h4>
                    <p className="text-white/70 text-sm">Connect your trusted data sources and knowledge bases</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">3</span>
                  <div>
                    <h4 className="font-medium text-white">Verification Rules</h4>
                    <p className="text-white/70 text-sm">Customize verification parameters to your requirements</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">4</span>
                  <div>
                    <h4 className="font-medium text-white">Deployment & Testing</h4>
                    <p className="text-white/70 text-sm">Rigorous testing ensures accuracy in your environment</p>
                  </div>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
