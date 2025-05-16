'use client'

import { motion } from "framer-motion"
import { FileCheck, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

export function FactualConsistencySection() {
  return (
    <section className="py-16 px-4 md:px-8" id="factual-consistency">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <FileCheck className="w-4 h-4" />
            <span className="text-sm font-medium">Core Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Understanding <span className="text-gradient">Factual Consistency</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Factual consistency is the cornerstone of reliable AI. Learn how PSQRD ensures every output is grounded in verifiable facts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">The Hallucination Problem</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              AI hallucinations occur when models generate content that appears plausible but is factually incorrect or entirely fabricated. This phenomenon poses significant risks for enterprise applications where accuracy is paramount.
            </p>
            
            <div className="bg-black/20 backdrop-blur-sm border border-red-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Hallucination Risks</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Misinformation propagation in critical documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Flawed decision-making based on fabricated data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Legal and compliance vulnerabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Erosion of trust in AI systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">PSQRD's Solution</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Continuous fact verification during generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Cross-referencing with verified knowledge bases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Automatic detection of logical inconsistencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70">Transparent source attribution for all claims</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">How Factual Consistency Works</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/20"></div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">1</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Claim Detection</h4>
                    <p className="text-white/70">
                      Our system identifies factual claims within generated content that require verification.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">2</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Source Retrieval</h4>
                    <p className="text-white/70">
                      For each claim, relevant sources are retrieved from verified knowledge bases.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">3</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Consistency Checking</h4>
                    <p className="text-white/70">
                      Claims are compared against source information to verify factual accuracy.
                    </p>
                  </div>
                  
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">4</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Correction & Citation</h4>
                    <p className="text-white/70">
                      Inconsistent information is corrected or filtered, and sources are linked to each verified claim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                alt="Factual consistency visualization" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Measurable Results</h4>
                  <p className="text-white/70 text-sm">
                    Our factual consistency technology has been independently verified to achieve 99.7% accuracy across diverse domains.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-900/30 to-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Factual Consistency in Action</h3>
              <p className="text-white/80 mb-6">
                See how PSQRD's factual consistency technology transforms AI outputs from potentially misleading to reliably accurate.
              </p>
              <a
                href="/request-demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Request Live Demo
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div className="bg-black/40 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-white/60 text-sm">Standard AI Output</span>
                </div>
                <div className="bg-black/30 p-3 rounded border border-red-500/20 text-white/80">
                  "The company reported a 15% increase in quarterly revenue, exceeding analyst expectations."
                  <div className="mt-2 text-red-400 text-xs">No source verification</div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/60 text-sm">PSQRD AI Output</span>
                </div>
                <div className="bg-black/30 p-3 rounded border border-green-500/20 text-white/80">
                  "The company reported a 12.7% increase in quarterly revenue, exceeding analyst expectations of 10.5%."
                  <div className="mt-2 text-green-400 text-xs">Source: Q2 2025 Earnings Report, Page 4</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
