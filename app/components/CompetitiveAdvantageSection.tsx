'use client'

import { motion } from "framer-motion"
import { CheckCircle, XCircle, Zap, Shield, Eye } from "lucide-react"

export function CompetitiveAdvantageSection() {
  const comparisonPoints = [
    {
      feature: "Factual Accuracy",
      psqrd: { value: "99.7%", icon: CheckCircle },
      others: { value: "70-85%", icon: XCircle }
    },
    {
      feature: "Source Verification",
      psqrd: { value: "Real-time", icon: CheckCircle },
      others: { value: "Limited/None", icon: XCircle }
    },
    {
      feature: "Citation Generation",
      psqrd: { value: "Automatic", icon: CheckCircle },
      others: { value: "Manual/None", icon: XCircle }
    },
    {
      feature: "Implementation Time",
      psqrd: { value: "Days", icon: CheckCircle },
      others: { value: "Weeks/Months", icon: XCircle }
    },
    {
      feature: "Enterprise Integration",
      psqrd: { value: "Seamless API", icon: CheckCircle },
      others: { value: "Complex/Limited", icon: XCircle }
    }
  ]

  return (
    <section className="py-16 px-4 md:px-8" id="competitive-advantage">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Why Choose PSQRD</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Competitive Advantage</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            See how PSQRD's zero-hallucination AI technology compares to conventional AI solutions in the market.
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
            <h3 className="text-2xl font-bold mb-6">Why We're Different</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              While conventional AI systems focus primarily on generating plausible content, PSQRD's technology is built from the ground up with factual accuracy as the core principle.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Built-in Verification</h4>
                  <p className="text-white/70">
                    Unlike systems that generate content first and verify later (if at all), our technology integrates verification directly into the generation process.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Complete Transparency</h4>
                  <p className="text-white/70">
                    Every piece of information comes with its source, allowing users to verify facts instantly rather than having to trust a black-box system.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg mt-1">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Enterprise-Ready</h4>
                  <p className="text-white/70">
                    Designed specifically for enterprise needs with robust security, compliance features, and seamless integration capabilities.
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
            <h3 className="text-2xl font-bold mb-6">Competitive Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-2 text-white/90">Feature</th>
                    <th className="text-left py-3 px-2 text-purple-400">PSQRD</th>
                    <th className="text-left py-3 px-2 text-white/60">Other AI Solutions</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={index} className="border-b border-purple-500/10">
                      <td className="py-3 px-2 text-white/80">{point.feature}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <point.psqrd.icon className="w-4 h-4 text-green-400" />
                          <span className="text-purple-300">{point.psqrd.value}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <point.others.icon className="w-4 h-4 text-red-400" />
                          <span className="text-white/60">{point.others.value}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <h4 className="font-semibold mb-2 text-white">Industry Recognition</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  #1 in Accuracy
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Top Enterprise AI
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Innovation Award
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-900/30 to-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to experience the difference?</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Schedule a personalized demo to see how PSQRD's zero-hallucination AI technology compares to your current solutions.
          </p>
          <a
            href="/request-demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Request Demo
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
