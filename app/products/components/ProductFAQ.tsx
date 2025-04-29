"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "How does PSQRD eliminate AI hallucinations?",
      answer:
        "PSQRD uses a multi-layered verification system that combines retrieval-augmented generation, knowledge graph validation, and source verification to ensure every piece of information is factually accurate. Our system retrieves information from trusted sources, validates it against our knowledge graph, and provides source attribution for every claim.",
    },
    {
      question: "Can PSQRD integrate with our existing AI systems?",
      answer:
        "Yes, PSQRD is designed to integrate seamlessly with your existing AI infrastructure. We provide comprehensive APIs and SDKs that allow you to incorporate our verification technology into your current systems, whether they're based on OpenAI, Anthropic, or custom models.",
    },
    {
      question: "What industries does PSQRD serve?",
      answer:
        "PSQRD serves a wide range of industries where accuracy and trust are paramount, including legal, finance, healthcare, media, education, and government. Our platform is particularly valuable for organizations in regulated industries or those dealing with high-stakes information.",
    },
    {
      question: "How does the source verification feature work?",
      answer:
        "Our source verification system tracks the origin of every piece of information used to generate content. When you receive a response, each claim is linked to its original source, allowing you to verify the information instantly. This creates a transparent chain of evidence for all AI-generated content.",
    },
    {
      question: "Can PSQRD be trained on our proprietary data?",
      answer:
        "Yes, PSQRD can be trained on your proprietary data to enhance its domain-specific knowledge and accuracy. We offer custom training services that securely incorporate your data into a private knowledge graph, ensuring that sensitive information never leaves your environment.",
    },
    {
      question: "What security measures does PSQRD implement?",
      answer:
        "PSQRD implements enterprise-grade security measures including SOC 2 compliance, HIPAA compliance for healthcare applications, GDPR compliance for European users, end-to-end encryption, secure data handling protocols, and regular security audits. We can also deploy on-premises solutions for organizations with strict data sovereignty requirements.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-white/80">
            Find answers to common questions about the PSQRD platform and our approach to hallucination-free AI.
          </p>
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
                className="flex justify-between items-center w-full p-6 text-left bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
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
