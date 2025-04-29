"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { FAQSchema } from "@/app/components/JsonLdSchema"

interface FAQItem {
  question: string
  answer: string
}

export function CareerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "What is the interview process like?",
      answer:
        "Our interview process typically consists of an initial screening call, a technical assessment, team interviews, and a final conversation with a senior leader. The entire process usually takes 2-3 weeks, and we strive to provide feedback at each stage.",
    },
    {
      question: "Do you offer remote work options?",
      answer:
        "Yes, we're a remote-first company with team members around the world. We believe in hiring the best talent regardless of location. We do have offices in San Francisco and New York for those who prefer to work in person.",
    },
    {
      question: "What's your approach to diversity and inclusion?",
      answer:
        "Diversity and inclusion are core to our values. We actively work to build a team with diverse backgrounds, experiences, and perspectives. We have partnerships with organizations focused on underrepresented groups in tech and maintain inclusive hiring practices.",
    },
    {
      question: "How do you support professional development?",
      answer:
        "We provide a $5,000 annual learning and development budget for each team member. This can be used for conferences, courses, books, or other educational resources. We also have internal mentorship programs and regular knowledge-sharing sessions.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "Our tech stack includes Python, TypeScript, React, Next.js, PyTorch, TensorFlow, and various AWS services. We're always evaluating and adopting new technologies that help us build better products.",
    },
    {
      question: "I don't see a role that matches my skills. Can I still apply?",
      answer:
        "We're always interested in connecting with talented individuals. Submit your resume through our general application, and we'll reach out if there's a potential fit for current or future roles.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-transparent">
      {/* Add structured data for FAQs */}
      <FAQSchema questions={faqs} />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-white/80">Have questions about working at PSQRD? We've got answers.</p>
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
                className="flex justify-between items-center w-full p-6 text-left bg-black/15 backdrop-blur-sm hover:bg-black/25 transition-colors"
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
