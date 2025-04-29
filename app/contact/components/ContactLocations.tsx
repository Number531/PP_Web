"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactLocations() {
  const locations = [
    {
      city: "Your Headquarters",
      address: "Your actual headquarters address",
      phone: "Your actual phone number",
      email: "your-actual-email@yourcompany.com",
      hours: "Your actual business hours",
    },
    {
      city: "Your Secondary Office",
      address: "Your actual secondary office address",
      phone: "Your actual phone number",
      email: "your-secondary-email@yourcompany.com",
      hours: "Your actual business hours",
    },
    // Remove or add locations as needed
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
        <p className="text-white/80 mb-8">
          Visit our offices or reach out to our global team. We're here to help you implement AI you can trust.
        </p>
      </div>

      <div className="space-y-6">
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="bg-black/10 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-3">{location.city}</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{location.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{location.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{location.hours}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
