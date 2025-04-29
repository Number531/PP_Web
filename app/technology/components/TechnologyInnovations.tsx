"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/app/features/ui/GlassCard"
import { Brain, Shield, Zap, Database } from "lucide-react"

export function TechnologyInnovations() {
  const innovations = [
    {
      icon: Brain,
      title: "Advanced Neural Networks",
      description:
        "Our proprietary neural network architecture is specifically designed for factual accuracy and source fidelity.",
    },
    {
      icon: Shield,
      title: "Hallucination Prevention",
      description:
        "Multi-layered verification systems actively prevent AI hallucinations and fabrications in generated content.",
    },
    {
      icon: Zap,
      title: "Real-time Verification",
      description:
        "Every piece of information is verified against source material in real-time before being presented to users.",
    },
    {
      icon: Database,
      title: "Secure Knowledge Integration",
      description:
        "Seamlessly integrate with your existing knowledge bases while maintaining the highest security standards.",
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
            Key <span className="text-gradient">Innovations</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Our platform incorporates several groundbreaking technologies that set us apart from conventional AI
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <innovation.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{innovation.title}</h3>
                    <p className="text-white/80">{innovation.description}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
