"use client"

import { motion } from "framer-motion"
import { Heart, Globe, BookOpen, Calendar, Coffee, Zap } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Comprehensive Healthcare",
      description: "Full medical, dental, and vision coverage for you and your dependents.",
    },
    {
      icon: Globe,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and generous home office stipend.",
    },
    {
      icon: BookOpen,
      title: "Learning & Development",
      description: "$5,000 annual budget for conferences, courses, and educational resources.",
    },
    {
      icon: Calendar,
      title: "Unlimited PTO",
      description: "Take the time you need to rest, recharge, and bring your best self to work.",
    },
    {
      icon: Coffee,
      title: "Team Retreats",
      description: "Quarterly team gatherings in exciting locations around the world.",
    },
    {
      icon: Zap,
      title: "Equity Compensation",
      description: "Competitive equity packages so you can share in our success.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We believe in taking care of our team. Here are some of the benefits you'll enjoy when you join PSQRD.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/15 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/70">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
