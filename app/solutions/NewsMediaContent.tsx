'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, FileCheck, BookOpen, CheckCircle, Loader } from 'lucide-react'

export function NewsMediaContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const features = [
    {
      icon: <Search className="w-6 h-6 text-purple-400" />,
      title: "Accelerated Research",
      description: "Consolidate hundreds of hours of research into minutes with our AI-powered research assistant, allowing journalists to focus on crafting compelling narratives."
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      title: "Real-time Fact Checking",
      description: "Cross-examine claims against thousands of verified sources instantly, ensuring the highest standards of journalistic integrity."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-purple-400" />,
      title: "Source Transparency",
      description: "Every insight comes with full citations and references, allowing for complete verification and editorial confidence."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      title: "Expert Consultation",
      description: "Generate content as if speaking directly with subject matter experts, accessing deep domain knowledge without scheduling interviews."
    }
  ]

  const benefits = [
    "Reduce research time by up to 92% while improving accuracy",
    "Instantly verify facts across multiple reliable sources",
    "Generate comprehensive background information on any topic",
    "Identify emerging trends and story angles that might be missed",
    "Maintain the highest standards of journalistic integrity",
    "Scale content production without sacrificing quality"
  ]

  const testimonial = {
    quote: "PSQRD's AI research tool has transformed our newsroom. We're producing more in-depth stories with fewer resources while maintaining our commitment to factual reporting.",
    author: "Editorial Director, Major News Publication"
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle demo request submission
  const handleDemoRequest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    // Validate form
    if (!formData.name.trim()) {
      setSubmitError('Please enter your name')
      return
    }
    
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setSubmitError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Send data to the API endpoint
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: localStorage.getItem('userCompany') || 'Not provided',
          useCase: formData.message || 'News Media AI Solutions - Demo Request',
          industry: 'Media'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit demo request')
      }
      
      setSubmitSuccess(true)
      
      // Store the email for future use
      if (!localStorage.getItem('userEmail')) {
        localStorage.setItem('userEmail', formData.email)
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
        <h3 className="text-xl font-semibold text-purple-400 mb-4">News Media Overview</h3>
        <p className="text-white/80 leading-relaxed">
          PSQRD's News Media solution accelerates research for content creation, enabling journalists to consolidate hundreds of hours of research into minutes with complete source transparency and citation tracking.
        </p>
      </motion.div>

      {/* Use Case */}
      <motion.div variants={itemVariants} className="mb-8 bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Key Use Case</h3>
        <p className="text-white/80 leading-relaxed">
          When a journalist needs to research a topic for an upcoming article, our platform provides comprehensive information gathering with full source transparency. The system consolidates vast amounts of research into concise, actionable insights, as if you're speaking directly with experts or the authors of source materials.
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

      {/* Fact Checking Highlight */}
      <motion.div variants={itemVariants} className="mb-8 bg-gradient-to-r from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Advanced Fact Checking</h3>
        <p className="text-white/80 leading-relaxed">
          Our platform enables thorough fact checking of any claim with cross-examination against thousands of pages of verified literature. This ensures that every piece of content meets the highest standards of accuracy and credibility, protecting your publication's reputation.
        </p>
      </motion.div>

      {/* Testimonial */}
      <motion.div variants={itemVariants} className="mb-8">
        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-white/80">
          "{testimonial.quote}"
          <footer className="mt-2 text-sm text-purple-400 not-italic">— {testimonial.author}</footer>
        </blockquote>
      </motion.div>

      {/* Demo Request Form */}
      <motion.div variants={itemVariants} className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">Request a Demo</h3>
        
        {submitSuccess ? (
          <div className="flex flex-col items-center justify-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
            <p className="text-white/70 mb-4">We'll contact you shortly to schedule your demo.</p>
          </div>
        ) : (
          <form onSubmit={handleDemoRequest} className="space-y-4">
            {submitError && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm">
                {submitError}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Tell us about your specific media needs"
                rows={3}
              />
            </div>
            
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Demo"
                )}
              </button>
              <p className="text-white/60 text-sm mt-2 text-center">
                See how PSQRD can transform your content verification and fact-checking processes.
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )

}
