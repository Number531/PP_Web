"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export function ProductComparison() {
  const features = [
    { name: "Factual Accuracy", description: "Guaranteed factual accuracy in AI outputs" },
    { name: "Source Attribution", description: "Links to original sources for every claim" },
    { name: "Hallucination Prevention", description: "Proactive prevention of AI hallucinations" },
    { name: "Enterprise Security", description: "SOC 2, HIPAA, and GDPR compliant" },
    { name: "Custom Training", description: "Custom training on your proprietary data" },
    { name: "API Access", description: "Full API access for integration with existing systems" },
    { name: "Confidence Scoring", description: "Confidence scores for all generated content" },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose <span className="text-gradient">PSQRD</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            See how our platform compares to traditional AI solutions when it comes to accuracy, transparency, and
            reliability.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="py-4 px-6 text-left">Feature</th>
                <th className="py-4 px-6 text-center bg-purple-500/10 backdrop-blur-sm rounded-t-lg">
                  <span className="text-xl font-bold text-purple-300">PSQRD Platform</span>
                </th>
                <th className="py-4 px-6 text-center">
                  <span className="text-xl font-bold text-white/70">Traditional AI</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={index % 2 === 0 ? "bg-black/5" : ""}
                >
                  <td className="py-4 px-6 border-b border-purple-500/10">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-white/60">{feature.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center border-b border-purple-500/10 bg-purple-500/5">
                    <Check className="w-6 h-6 text-purple-400 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center border-b border-purple-500/10">
                    {["Factual Accuracy", "Source Attribution", "Hallucination Prevention"].includes(feature.name) ? (
                      <X className="w-6 h-6 text-red-400 mx-auto" />
                    ) : (
                      <div className="text-white/40 text-sm">Limited</div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
