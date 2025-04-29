"use client"

import { motion } from "framer-motion"
import { GradientButton } from "@/app/features/ui/GradientButton"

export function TechnologyCTA() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience <span className="text-gradient">The Difference</span>?
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Schedule a personalized demo to see how our technology can transform your organization's approach to
            AI-powered solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href="/contact" className="px-8 py-3">
              Schedule a Demo
            </GradientButton>
            <GradientButton href="/products" variant="outline" className="px-8 py-3">
              Explore Products
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
