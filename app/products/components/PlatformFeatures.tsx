"use client"

import { motion } from "framer-motion"
import { Shield, Link, Zap, Database } from "lucide-react"

export function PlatformFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Uncompromising Accuracy",
      description: "Hallucination-free outputs that have been independently validated for factual correctness.",
      benefits: ["Eliminate errors", "Mitigate risk", "Make decisions with confidence"],
    },
    {
      icon: Link,
      title: "Radical Transparency",
      description: "Every claim is linked directly to its source, allowing instant verification of all information.",
      benefits: ["Build trust", "Enable easy verification", "Foster accountability"],
    },
    {
      icon: Zap,
      title: "Transformative Efficiency",
      description: "Rapid synthesis and analysis that automates time-consuming research tasks.",
      benefits: ["Reduce research time by >99%", "Cut operational costs", "Free experts for strategic work"],
    },
    {
      icon: Database,
      title: "Domain Specialization",
      description: "Tailored understanding for specific industries with contextually relevant insights.",
      benefits: ["Industry-specific knowledge", "Precise domain insights", "Specialized terminology handling"],
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Core <span className="text-gradient">Pillars</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Our platform is built on four fundamental pillars that deliver unprecedented value to organizations seeking
            trustworthy AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/80 mb-4">{feature.description}</p>

              <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Benefits:</h4>
              <ul className="space-y-1">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
