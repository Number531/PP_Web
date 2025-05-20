"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Newspaper, Scale, BarChart, Stethoscope, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SolutionPopup } from "@/app/components/SolutionPopup"
import { NewsMediaContent } from "@/app/solutions/NewsMediaContent"
import { LegalContent } from "@/app/solutions/LegalContent"
import { FinanceContent } from "@/app/solutions/FinanceContent"
import { HealthcareContent } from "@/app/solutions/HealthcareContent"
import { AllIndustrySolutionsContent } from "@/app/solutions/AllIndustrySolutionsContent"

export function PlatformUseCases() {
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [isAllSolutionsPopupOpen, setIsAllSolutionsPopupOpen] = useState(false)
  const useCases = [
    {
      icon: Newspaper,
      title: "News Media",
      description: "Accelerating research, ensuring fact-checking integrity, and restoring audience trust.",
      link: "/solutions/news",
    },
    {
      icon: Scale,
      title: "Legal Services",
      description: "Revolutionizing due diligence, precedent analysis, and legal research workflows.",
      link: "/solutions/legal",
    },
    {
      icon: BarChart,
      title: "Financial Services",
      description: "Powering accurate investment research, compliance checks, and market analysis.",
      link: "/solutions/finance",
      future: true,
    },
    {
      icon: Stethoscope,
      title: "Healthcare & Life Sciences",
      description: "Speeding up literature reviews, supporting regulatory processes, and enhancing research.",
      link: "/solutions/healthcare",
      future: true,
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Applications & <span className="text-gradient">Use Cases</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            PSQRD is transforming information workflows across industries, delivering trusted AI solutions for critical
            applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 flex flex-col h-full"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {useCase.title}
                {useCase.future && (
                  <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-300">
                    Coming Soon
                  </span>
                )}
              </h3>
              <p className="text-white/70 mb-4 flex-grow">{useCase.description}</p>

              <button
                onClick={() => setActivePopup(useCase.link.split('/').pop() || null)}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors bg-transparent border-0 p-0 cursor-pointer mt-auto"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setIsAllSolutionsPopupOpen(true)}
            className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer"
            data-component-name="LinkComponent"
          >
            Explore all industry solutions
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Popup for News Media */}
      <SolutionPopup
        isOpen={activePopup === 'news'}
        onClose={() => setActivePopup(null)}
        title="News Media Solutions"
      >
        <NewsMediaContent />
      </SolutionPopup>

      {/* Popup for Legal Services */}
      <SolutionPopup
        isOpen={activePopup === 'legal'}
        onClose={() => setActivePopup(null)}
        title="Legal Solutions"
      >
        <LegalContent />
      </SolutionPopup>

      {/* Popup for Financial Services */}
      <SolutionPopup
        isOpen={activePopup === 'finance'}
        onClose={() => setActivePopup(null)}
        title="Financial Services Solutions"
      >
        <FinanceContent />
      </SolutionPopup>

      {/* Popup for Healthcare & Life Sciences */}
      <SolutionPopup
        isOpen={activePopup === 'healthcare'}
        onClose={() => setActivePopup(null)}
        title="Healthcare & Life Sciences Solutions"
      >
        <HealthcareContent />
      </SolutionPopup>

      {/* Popup for All Industry Solutions */}
      <SolutionPopup
        isOpen={isAllSolutionsPopupOpen}
        onClose={() => setIsAllSolutionsPopupOpen(false)}
        title="Industry Solutions"
      >
        <AllIndustrySolutionsContent />
      </SolutionPopup>
    </section>
  )
}
