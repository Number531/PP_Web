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

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
            <div className="space-y-4">
              <p className="text-white/80">
                At PSQRD, we're not just building another AI company. We're creating a new standard for accuracy and
                transparency in artificial intelligence.
              </p>
              <p className="text-white/80">
                Our team combines deep expertise in machine learning, natural language processing, and information
                retrieval with a commitment to ethical AI development.
              </p>
              <p className="text-white/80">
                We believe in a collaborative, inclusive environment where diverse perspectives lead to better
                solutions. We value curiosity, integrity, and a willingness to tackle hard problems.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden h-40 bg-purple-500/20">
                <Image
                  src="/placeholder.svg?height=160&width=300"
                  alt="Team collaboration"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-40 bg-purple-500/20">
                <Image
                  src="/placeholder.svg?height=160&width=300"
                  alt="Office space"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-lg overflow-hidden h-40 bg-purple-500/20">
                <Image
                  src="/placeholder.svg?height=160&width=300"
                  alt="Team event"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-40 bg-purple-500/20">
                <Image
                  src="/placeholder.svg?height=160&width=300"
                  alt="Team working"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
