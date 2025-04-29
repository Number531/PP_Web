"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { UseCase } from "../data/product-data"

interface ProductUseCasesProps {
  useCases: UseCase[]
}

export function ProductUseCases({ useCases }: ProductUseCasesProps) {
  return (
    <section id="use-cases" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Use Cases</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Discover how organizations are using our platform to transform their operations and build trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
                {useCase.industry}
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-white/70 mb-6">{useCase.description}</p>

              <Link
                href="/contact"
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors"
              >
                Learn more
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
          className="mt-12 text-center"
        >
          <p className="text-white/60">
            Have a specific use case in mind?{" "}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300">
              Contact us
            </Link>{" "}
            to discuss how we can help.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
