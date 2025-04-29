"use client"

import { motion } from "framer-motion"
import { Search, FileText, Link, ShieldCheck } from "lucide-react"

export function TechnologyApproach() {
  const steps = [
    {
      icon: Search,
      title: "Focused Retrieval",
      description:
        "PSQRD begins by retrieving relevant information only from trusted, specified knowledge sources (like your internal documents, legal databases, or verified archives).",
      highlight: "Retrieval Augmented Generation (RAG)",
    },
    {
      icon: FileText,
      title: "Grounded Generation",
      description:
        "Our AI then generates summaries, answers, or reports based strictly on the facts within those retrieved documents, preventing deviation into fabricated content.",
      highlight: "Search Grounding",
    },
    {
      icon: Link,
      title: "Absolute Source Linking",
      description:
        "Crucially, every piece of information generated is automatically linked directly back to its precise origin in the source material, allowing instant user verification.",
      highlight: "Source Attribution",
    },
    {
      icon: ShieldCheck,
      title: "Rigorous Validation",
      description:
        "Outputs undergo validation processes benchmarked against leading independent methodologies to ensure they meet our stringent accuracy standards.",
      highlight: "Accuracy Verification",
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
            Our <span className="text-gradient">Approach</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Our technology is built on a foundation of four key principles that work together to deliver accurate,
            transparent, and reliable AI-powered solutions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-purple-500/20 transform md:translate-x-[-0.5px] hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Step number with icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center z-10 relative">
                  <step.icon className="w-6 h-6 text-purple-400" />
                </div>

                {/* Content */}
                <div className="md:w-5/6 bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/80 mb-3">{step.description}</p>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {step.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
