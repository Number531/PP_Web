"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Shield, FileCheck, ArrowRight } from "lucide-react"
import { SolutionPopup } from "@/app/components/SolutionPopup"
import { SecurityPracticesContent } from "@/app/security/SecurityPracticesContent"

export function PlatformSecurity() {
  const [isSecurityPopupOpen, setIsSecurityPopupOpen] = useState(false)
  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "SOC 2 compliant infrastructure with end-to-end encryption for all data.",
    },
    {
      icon: FileCheck,
      title: "Regulatory Compliance",
      description: "HIPAA compliance for healthcare and GDPR compliance for European users.",
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Strict data handling protocols with optional on-premises deployment.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-black/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Security & <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Built with enterprise-grade security and data privacy principles at its core.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => setIsSecurityPopupOpen(true)}
            className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer"
            data-component-name="LinkComponent"
          >
            Learn more about our security practices
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
        
        {/* Security Practices Popup */}
        <SolutionPopup
          isOpen={isSecurityPopupOpen}
          onClose={() => setIsSecurityPopupOpen(false)}
          title="Security Practices"
        >
          <SecurityPracticesContent />
        </SolutionPopup>
      </div>
    </section>
  )
}
