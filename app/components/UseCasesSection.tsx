'use client'

import { motion } from "framer-motion"
import { Briefcase, Stethoscope, Scale, LineChart, FileText, Building } from "lucide-react"
import Image from "next/image"

export function UseCasesSection() {
  const useCases = [
    {
      icon: Briefcase,
      title: "Financial Services",
      description: "Ensure accurate financial reporting and analysis with zero-hallucination AI that prevents costly errors in investment decisions and regulatory compliance.",
      benefits: ["Accurate market analysis", "Reliable financial forecasting", "Compliant documentation"]
    },
    {
      icon: Stethoscope,
      title: "Healthcare",
      description: "Provide healthcare professionals with factually accurate information for patient care, medical research, and clinical documentation.",
      benefits: ["Evidence-based insights", "Accurate medical summaries", "Reliable research assistance"]
    },
    {
      icon: Scale,
      title: "Legal",
      description: "Support legal professionals with factual case research, document analysis, and precedent identification without fabricated information.",
      benefits: ["Accurate case research", "Reliable document analysis", "Factual legal summaries"]
    },
    {
      icon: LineChart,
      title: "Market Research",
      description: "Deliver accurate market intelligence and competitor analysis with verifiable sources for strategic business decisions.",
      benefits: ["Verified market data", "Source-backed insights", "Reliable trend analysis"]
    },
    {
      icon: FileText,
      title: "Content Creation",
      description: "Generate factually accurate content with automatic source verification for marketing, education, and publishing.",
      benefits: ["Fact-checked content", "Verifiable sources", "Trustworthy publications"]
    },
    {
      icon: Building,
      title: "Government",
      description: "Support policy development and public communications with accurate, verifiable information that builds public trust.",
      benefits: ["Accurate policy analysis", "Verified public information", "Trustworthy communications"]
    }
  ]

  return (
    <section className="py-16 px-4 md:px-8" id="use-cases">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Industry Applications</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real-World <span className="text-gradient">Use Cases</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            See how organizations across industries are using PSQRD's zero-hallucination AI to ensure information integrity and make confident decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
              <p className="text-white/70 mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Featured Case Study</h3>
              <h4 className="text-purple-400 font-medium mb-2">Global Financial Institution</h4>
              <p className="text-white/80 mb-4">
                A leading financial services firm implemented PSQRD's zero-hallucination AI to ensure accuracy in their market analysis reports and client communications.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs mt-0.5">✓</span>
                  <p className="text-white/70"><span className="font-medium text-white">99.8% accuracy</span> in financial reporting</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs mt-0.5">✓</span>
                  <p className="text-white/70"><span className="font-medium text-white">87% reduction</span> in information verification time</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs mt-0.5">✓</span>
                  <p className="text-white/70"><span className="font-medium text-white">$2.4M annual savings</span> in compliance costs</p>
                </div>
              </div>
              <div className="inline-block">
                <a href="/case-studies/finance" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Read full case study
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                alt="Financial case study visualization" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
