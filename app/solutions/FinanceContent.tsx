'use client'

import { motion } from 'framer-motion'
import { BarChart, Shield, FileText, TrendingUp } from 'lucide-react'

export function FinanceContent() {
  const features = [
    {
      icon: <BarChart className="w-6 h-6 text-purple-400" />,
      title: "Investment Research Acceleration",
      description: "Analyze thousands of financial documents, earnings reports, and market data in minutes instead of days with guaranteed accuracy."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Compliance Verification",
      description: "Automatically cross-reference regulatory requirements against documentation with complete audit trails and source transparency."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: "Risk Assessment",
      description: "Identify potential risks across vast portfolios by analyzing patterns and correlations that would be impossible to detect manually."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "Market Intelligence",
      description: "Generate comprehensive market analyses with verified data sources and transparent methodology for confident decision-making."
    }
  ]

  const benefits = [
    "Reduce financial analysis time by up to 94% while improving accuracy",
    "Eliminate data entry errors and ensure compliance with regulatory requirements",
    "Identify market trends and investment opportunities with greater precision",
    "Generate comprehensive reports with complete source transparency",
    "Enhance due diligence processes for mergers and acquisitions",
    "Improve risk management through comprehensive data analysis"
  ]

  const testimonial = {
    quote: "PSQRD's financial intelligence platform has transformed our investment research process. We're able to analyze more data with greater confidence in the results, giving us a significant edge in the market.",
    author: "Chief Investment Officer, Global Asset Management Firm"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-white"
    >
      {/* Introduction */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Financial Services Overview</h3>
        <p className="text-white/80 leading-relaxed">
          PSQRD's Financial Services solution transforms investment research, compliance verification, and market analysis with AI that guarantees accuracy through source transparency and eliminates the risk of hallucinations in critical financial decisions.
        </p>
      </motion.div>

      {/* Use Case */}
      <motion.div variants={itemVariants} className="mb-8 bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Key Use Case</h3>
        <p className="text-white/80 leading-relaxed">
          Financial analysts can process thousands of earnings reports, market data points, and regulatory filings in minutes instead of days, with complete confidence in the accuracy of the results. Every insight is backed by verifiable sources, eliminating the risk of making investment decisions based on incorrect information.
        </p>
      </motion.div>

      {/* Features */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Key Features
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 border border-purple-500/20 rounded-lg p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h4 className="font-medium text-white mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Benefits */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Benefits</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-start gap-2"
            >
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-white/80 text-sm">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Market Intelligence Highlight */}
      <motion.div variants={itemVariants} className="mb-8 bg-gradient-to-r from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Advanced Market Intelligence</h3>
        <p className="text-white/80 leading-relaxed">
          Our platform enables comprehensive analysis of market trends, competitor activities, and economic indicators with unprecedented speed and accuracy. This allows financial institutions to identify opportunities and risks that would be impossible to detect through traditional research methods.
        </p>
      </motion.div>

      {/* Testimonial */}
      <motion.div variants={itemVariants} className="mb-8">
        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-white/80">
          "{testimonial.quote}"
          <footer className="mt-2 text-sm text-purple-400 not-italic">— {testimonial.author}</footer>
        </blockquote>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="text-center mt-8">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
          Request a Demo
        </button>
        <p className="text-white/60 text-sm mt-2">
          See how PSQRD can transform your financial research and analysis capabilities.
        </p>
      </motion.div>
    </motion.div>
  )
}
