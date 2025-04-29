"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function InvestorsSection() {
  const investors = [
    {
      name: "Sequoia Capital",
      logo: "/placeholder.svg?height=80&width=200",
    },
    {
      name: "Andreessen Horowitz",
      logo: "/placeholder.svg?height=80&width=200",
    },
    {
      name: "Benchmark",
      logo: "/placeholder.svg?height=80&width=200",
    },
    {
      name: "Accel",
      logo: "/placeholder.svg?height=80&width=200",
    },
    {
      name: "Greylock Partners",
      logo: "/placeholder.svg?height=80&width=200",
    },
    {
      name: "Kleiner Perkins",
      logo: "/placeholder.svg?height=80&width=200",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Backed by the Best</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We're proud to be supported by leading investors who share our vision for trustworthy AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {investors.map((investor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <Image
                src={investor.logo || "/placeholder.svg"}
                alt={investor.name}
                width={200}
                height={80}
                className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
