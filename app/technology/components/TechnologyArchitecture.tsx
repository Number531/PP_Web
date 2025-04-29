"use client"

import { motion } from "framer-motion"

export function TechnologyArchitecture() {
  return (
    <section className="py-16 px-4 md:px-8 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            System <span className="text-gradient">Architecture</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Our platform is built on a robust, scalable architecture designed for enterprise-grade performance and
            security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[16/9] max-w-5xl mx-auto rounded-xl overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-sm p-8">
            <div className="w-full h-full flex flex-col">
              {/* Top Layer - User Interface */}
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold mb-2">User Interface Layer</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Web Application</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">API Integration</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">SDK</div>
                </div>
              </div>

              {/* Middle Layer - Core Processing */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 mb-4 border border-blue-500/20">
                <h3 className="text-lg font-semibold mb-2">Core Processing Layer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-black/30 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">Query Processing</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Intent Analysis</div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Context Extraction</div>
                    </div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">Knowledge Retrieval</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Vector Search</div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Semantic Matching</div>
                    </div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">Response Generation</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Fact Verification</div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Source Attribution</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Layer - Data & Infrastructure */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/20">
                <h3 className="text-lg font-semibold mb-2">Data & Infrastructure Layer</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Secure Cloud Infrastructure</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Knowledge Base Connectors</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Encryption</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Audit Logging</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 text-sm">
            Our architecture is designed for seamless integration with your existing systems while maintaining the
            highest standards of security and performance.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
