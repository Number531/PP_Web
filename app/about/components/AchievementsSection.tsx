'use client'

import { motion } from "framer-motion"
import { Award, Users, Globe, TrendingUp } from "lucide-react"

export function AchievementsSection() {
  const achievements = [
    {
      icon: Award,
      metric: "99.7%",
      label: "Accuracy Rate",
      description: "Industry-leading factual accuracy in AI-generated content"
    },
    {
      icon: Users,
      metric: "500+",
      label: "Enterprise Clients",
      description: "Trusted by leading organizations across industries"
    },
    {
      icon: Globe,
      metric: "12+",
      label: "Countries",
      description: "Serving clients globally with multilingual support"
    },
    {
      icon: TrendingUp,
      metric: "95%",
      label: "Efficiency Gain",
      description: "Average research time reduction reported by clients"
    }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Transforming how organizations leverage information with accuracy and efficiency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 text-center"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{item.metric}</div>
              <div className="text-purple-400 font-medium mb-3">{item.label}</div>
              <p className="text-white/70 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
