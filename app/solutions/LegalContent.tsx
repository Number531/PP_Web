'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Clock, FileText, BookOpen, CheckCircle, Loader } from 'lucide-react'

export function LegalContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const features = [
    {
      icon: <Scale className="w-6 h-6 text-purple-400" />,
      title: "Case Law Analysis",
      description: "Cross-reference client cases with district, state, and federal case law precedents to build stronger legal arguments with comprehensive support."
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      title: "Accelerated Due Diligence",
      description: "Reduce hundreds of hours of legal research into minutes with AI that processes thousands of documents while maintaining perfect citation accuracy."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: "Citation Guarantee",
      description: "Every legal reference is properly cited with pinpoint accuracy, eliminating the risk of improper citations or missed precedents."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      title: "Comprehensive Coverage",
      description: "Access the full spectrum of relevant case law across jurisdictions to ensure no valuable precedent is overlooked."
    }
  ]

  const benefits = [
    "Reduce legal research time by up to 95% while improving thoroughness",
    "Identify relevant case law that might be missed through traditional research",
    "Ensure proper citation format for all jurisdictions automatically",
    "Process client case claims with unprecedented efficiency",
    "Maintain the highest standards of legal due diligence",
    "Scale legal research capabilities without adding staff"
  ]

  const testimonial = {
    quote: "PSQRD's legal research platform has revolutionized our practice. We're able to provide more thorough case analysis in a fraction of the time, giving us a significant competitive advantage.",
    author: "Managing Partner, AmLaw 100 Firm"
  }

  // Handle demo request submission
  const handleDemoRequest = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Get user email from localStorage if available (for logged-in users)
      // or prompt for email if not available
      let userEmail = localStorage.getItem('userEmail')
      
      if (!userEmail) {
        userEmail = window.prompt('Please enter your email to request a demo:')
        if (!userEmail) {
          setIsSubmitting(false)
          return // User cancelled the prompt
        }
        
        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
          setSubmitError('Please enter a valid email address')
          setIsSubmitting(false)
          return
        }
      }
      
      // Send data to the API endpoint
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: localStorage.getItem('userName') || 'Prospective Client',
          email: userEmail,
          company: localStorage.getItem('userCompany') || 'Not provided',
          useCase: 'Legal AI Solutions - Demo Request',
          industry: 'Legal'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit demo request')
      }
      
      setSubmitSuccess(true)
      
      // Store the email for future use
      if (!localStorage.getItem('userEmail')) {
        localStorage.setItem('userEmail', userEmail)
      }
      
    } catch (error) {
      console.error('Error submitting demo request:', error)
      setSubmitError("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Legal Solutions Overview</h3>
        <p className="text-white/80 leading-relaxed">
          PSQRD's Legal solution transforms legal research and case analysis, enabling law firms to process client case claims with cross-reference to district, state, and federal case law precedents for an accelerated, accurate, and efficient workflow.
        </p>
      </motion.div>

      {/* Use Case */}
      <motion.div variants={itemVariants} className="mb-8 bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Key Use Case</h3>
        <p className="text-white/80 leading-relaxed">
          When processing client case claims, our platform cross-references against relevant case law precedents across all jurisdictions, reducing hundreds of hours of due diligence into minutes. Every response is guaranteed to properly cite and reference relevant case law, ensuring complete accuracy and reliability.
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

      {/* Case Analysis Highlight */}
      <motion.div variants={itemVariants} className="mb-8 bg-gradient-to-r from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Advanced Case Analysis</h3>
        <p className="text-white/80 leading-relaxed">
          Our platform enables comprehensive analysis of case law across all relevant jurisdictions, identifying patterns, contradictions, and opportunities that might be missed through traditional research methods. This gives your firm a significant advantage in case preparation and strategy development.
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
        <button 
          onClick={handleDemoRequest}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Request a Demo
        </button>
        <p className="text-white/60 text-sm mt-2">
          See how PSQRD can transform your legal research capabilities.
        </p>
      </motion.div>
    </motion.div>
  )
  
  return (
    <>
      <motion.div
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-bold text-center text-white mb-8">
          Legal AI Solutions
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl text-center text-white/80 mb-12 max-w-3xl mx-auto">
          Transform your legal research and due diligence with AI that guarantees citation accuracy and comprehensive case law analysis.
        </motion.p>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-glass-purple p-6 rounded-lg border border-purple-500/20">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Key Benefits</h2>
          <div className="bg-glass-purple p-6 rounded-lg border border-purple-500/20">
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-white/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div variants={itemVariants} className="bg-glass-purple p-6 rounded-lg border border-purple-500/20 mb-12">
          <blockquote className="border-l-4 border-purple-500 pl-4 italic text-white/80">
            "{testimonial.quote}"
            <footer className="mt-2 text-sm text-purple-400 not-italic">— {testimonial.author}</footer>
          </blockquote>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center p-4">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
              <p className="text-white/70 mb-4">We'll contact you shortly to schedule your demo.</p>
            </div>
          ) : submitError ? (
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-red-400 mb-4">{submitError}</p>
              <button 
                onClick={handleDemoRequest}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                disabled={isSubmitting}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={handleDemoRequest}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request a Demo"
                )}
              </button>
              <p className="text-white/60 text-sm mt-2">
                See how PSQRD can transform your legal research capabilities.
              </p>
            </>
          )}
        </motion.div>
      </motion.div>

    </>
  )
}
