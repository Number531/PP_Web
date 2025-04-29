"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users } from "lucide-react"
import Link from "next/link"

export function CareerSection() {
  const featuredJobs = [
    {
      title: "AI Research Scientist",
      department: "Research",
      location: "Remote (US/Europe)",
    },
    {
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "San Francisco, CA (Hybrid)",
    },
    {
      title: "Frontend Developer - AI Interfaces",
      department: "Engineering",
      location: "Remote (US/Canada)",
    },
  ]

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-black/95 to-black/90">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Join Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We're Growing Fast</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join our team of researchers, engineers, and innovators building the future of trustworthy AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-sm text-white/70">{job.department}</span>
                <span className="text-sm text-white/70">{job.location}</span>
              </div>
              <Link
                href="/careers"
                className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
