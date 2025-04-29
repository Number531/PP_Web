"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"

export function ProductTestimonials() {
  const testimonials = [
    {
      quote:
        "PSQRD has transformed how our legal team conducts research. We've reduced research time by 92% while maintaining the highest standards of accuracy.",
      author: "Sarah Johnson",
      title: "Chief Legal Officer",
      company: "Global Law Partners",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a news organization, accuracy is everything. PSQRD's verification system has helped us restore audience trust and accelerate our fact-checking process.",
      author: "Michael Chen",
      title: "Executive Editor",
      company: "World News Network",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The source transparency feature is a game-changer. Our analysts can now trace every piece of information back to its original source with a single click.",
      author: "Emily Rodriguez",
      title: "Head of Research",
      company: "Insight Financial",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Hear from organizations that have transformed their operations with PSQRD's hallucination-free AI platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 relative"
            >
              <Quote className="w-10 h-10 text-purple-500/30 absolute top-6 right-6" />

              <p className="text-white/80 mb-6 relative z-10">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-white/60">
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60">
            Trusted by leading organizations in legal, media, finance, healthcare, and more.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
