"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "How quickly can I expect a response?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please indicate this in your message subject, and we'll prioritize your request.",
    },
    {
      question: "Can I schedule a demo of your AI solutions?",
      answer:
        "Select 'Request a Demo' in the subject dropdown of our contact form, and our team will reach out to schedule a personalized demonstration tailored to your specific needs and use cases.",
    },
    {
      question: "Do you offer custom solutions for specific industries?",
      answer:
        "Yes, we specialize in creating custom AI solutions for various industries, including legal, finance, healthcare, and media. Our team will work with you to understand your specific requirements and develop a solution that addresses your unique challenges.",
    },
    {
      question: "What information should I include in my inquiry?",
      answer:
        "To help us provide the most relevant response, please include details about your organization, the specific challenges you're looking to address, your timeline, and any technical requirements. The more context you provide, the better we can tailor our response.",
    },
    {
      question: "Do you offer technical support for existing customers?",
      answer:
        "Yes, existing customers can reach our dedicated support team through the contact form by selecting 'Technical Support' in the subject dropdown. For urgent issues, existing customers should use the support portal accessible through your account dashboard for faster assistance.",
    },
    {
      question: "Are you open to partnership opportunities?",
      answer:
        "We're always interested in exploring strategic partnerships that align with our mission of building trustworthy AI. Please select 'Partnership Opportunity' in the subject dropdown and provide details about your organization and partnership vision.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-black/10 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-white/80">Find quick answers to common questions about contacting us.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-purple-500/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full p-6 text-left bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/80">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
