"use client"

import { motion } from "framer-motion"
import { Code, Database, Link, Search } from "lucide-react"
import Image from "next/image"

export function TechnologySection() {
  const technologies = [
    {
      icon: Search,
      title: "Retrieval-Augmented Generation",
      description:
        "Our RAG system retrieves and verifies information from trusted sources before generating responses.",
    },
    {
      icon: Link,
      title: "Source Attribution",
      description: "Every fact is linked to its original source, allowing users to verify information instantly.",
    },
    {
      icon: Database,
      title: "Knowledge Graph Integration",
      description: "Our proprietary knowledge graph ensures consistency and accuracy across billions of facts.",
    },
    {
      icon: Code,
      title: "Continuous Validation",
      description: "Real-time fact-checking algorithms validate outputs against multiple trusted sources.",
    },
  ]

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
            How We Eliminate <span className="text-gradient">AI Hallucinations</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Our proprietary technology combines advanced retrieval-augmented generation, knowledge graphs, and
            continuous validation to ensure factual accuracy at every step.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Hallucination-Free Architecture</h3>
            <p className="text-white/80 text-lg">
              Our multi-layered verification system ensures every output is factually accurate and traceable to
              trusted sources. By combining advanced retrieval techniques with rigorous validation processes, we've created an AI system that eliminates hallucinations while maintaining exceptional efficiency.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <tech.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                      <p className="text-white/70">{tech.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
