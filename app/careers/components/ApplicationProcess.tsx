"use client"

import { motion } from "framer-motion"

export function ApplicationProcess() {
  const steps = [
    {
      number: "01",
      title: "Application Review",
      description: "Our team reviews your application to assess your qualifications and experience.",
    },
    {
      number: "02",
      title: "Initial Screening",
      description: "A 30-minute call with our recruiting team to discuss your background and interest in the role.",
    },
    {
      number: "03",
      title: "Technical Assessment",
      description: "A take-home assignment or live coding session relevant to the position you're applying for.",
    },
    {
      number: "04",
      title: "Team Interviews",
      description: "Meet with potential teammates and cross-functional partners to assess technical and cultural fit.",
    },
    {
      number: "05",
      title: "Final Interview",
      description: "A conversation with a senior leader to discuss your career goals and alignment with our mission.",
    },
    {
      number: "06",
      title: "Offer & Onboarding",
      description: "We extend an offer and work with you to ensure a smooth transition to your new role.",
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Application Process</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We've designed our hiring process to be thorough yet efficient, typically taking 2-3 weeks from application
            to offer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/15 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="text-4xl font-bold text-purple-500/50 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-white/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
