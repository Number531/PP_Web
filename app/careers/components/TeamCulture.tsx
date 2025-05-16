"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function TeamCulture() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team & Culture</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We're a diverse team of researchers, engineers, and problem-solvers united by our mission to build AI that
            people can trust.
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">What Makes Us Different</h3>
            <div className="space-y-6">
              <p className="text-white/80 text-lg">
                At PSQRD, we're not just building another AI company. We're creating a new standard for accuracy and
                transparency in artificial intelligence.
              </p>
              <p className="text-white/80 text-lg">
                Our team combines deep expertise in machine learning, natural language processing, and information
                retrieval with a commitment to ethical AI development.
              </p>
              <p className="text-white/80 text-lg">
                We believe in a collaborative, inclusive environment where diverse perspectives lead to better
                solutions. We value curiosity, integrity, and a willingness to tackle hard problems.
              </p>
            </div>
          </motion.div>
      </div>
    </section>
  )
}
