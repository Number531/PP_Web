"use client"

import { motion } from "framer-motion"
import { Shield, Link, Database, Search, Zap, Lock } from "lucide-react"

export function ProductFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Hallucination-Free AI",
      description:
        "Our proprietary technology eliminates AI hallucinations, ensuring every output is factually accurate and reliable for high-stakes industries.",
    },
    {
      icon: Link,
      title: "Source Transparency",
      description:
        "Every insight comes with linked sources, allowing instant verification and building trust in AI-generated information.",
    },
    {
      icon: Database,
      title: "Knowledge Graph Integration",
      description:
        "Our proprietary knowledge graph ensures consistency and accuracy across billions of facts and relationships.",
    },
    {
      icon: Search,
      title: "Retrieval-Augmented Generation",
      description:
        "Advanced RAG system retrieves and verifies information from trusted sources before generating responses.",
    },
    {
      icon: Zap,
      title: "99% Efficiency Boost",
      description:
        "Transform your workflow with AI that delivers accurate results in seconds instead of hours, dramatically reducing research and verification time.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Built with rigorous security standards and compliance measures to protect sensitive data in regulated industries.",
    },
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
            Key Platform <span className="text-gradient">Features</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Our platform combines advanced AI capabilities with rigorous verification systems to deliver unparalleled
            accuracy and transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
