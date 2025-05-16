"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactLocations() {
  const contactInfo = {
    email: "contact@psqrd.ai",
    phone: "(555) 123-4567",
    hours: "Monday - Friday: 9AM - 6PM EST"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <p className="text-white/80 mb-8">
          Reach out to our team. We're here to help you implement AI you can trust.
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-black/10 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
          <div className="space-y-3 text-white/80">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>{contactInfo.hours}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
