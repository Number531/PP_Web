"use client"

import { motion } from "framer-motion"
import { Shield, Lightbulb, Users, Sparkles } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Accuracy & Trust",
      description: "We're committed to building AI systems that are accurate, reliable, and worthy of trust.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We push the boundaries of what's possible, constantly seeking new solutions to complex problems.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of diverse perspectives and collaborative problem-solving.",
    },
    {
      icon: Sparkles,
      title: "Impact",
      description: "We're driven by the positive impact our technology can have on businesses and society.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            At PSQRD, our values guide everything we do. They shape our culture, inform our decisions, and drive our
            mission to build trustworthy AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-white/70">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
