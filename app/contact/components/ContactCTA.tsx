"use client"

import { motion } from "framer-motion"
import { ArrowRight, Linkedin } from "lucide-react"
import Link from "next/link"

export function ContactCTA() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black/15 backdrop-blur-md border border-purple-500/20 rounded-lg p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect With Us</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, insights, and announcements about our AI solutions.
          </p>

          <div className="flex justify-center gap-6 mb-10">
            <motion.a
              href="https://linkedin.com/company/psqrd-ai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black/20 p-4 rounded-full border border-purple-500/20 hover:border-purple-500/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-purple-400" />
            </motion.a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/careers"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
            >
              Join Our Team
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-md font-medium transition-colors w-full sm:w-auto justify-center flex items-center"
            >
              Learn About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
