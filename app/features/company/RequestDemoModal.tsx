"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Loader2 } from "lucide-react"

interface RequestDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  company: string
  jobTitle: string
  phone: string
  industry: string
  useCase: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  jobTitle: "",
  phone: "",
  industry: "",
  useCase: "",
}

export function RequestDemoModal({ isOpen, onClose }: RequestDemoModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.company.trim()) newErrors.company = "Company is required"
    if (!formData.industry) newErrors.industry = "Please select an industry"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

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
          company: formData.company,
          jobTitle: formData.jobTitle,
          phone: formData.phone,
          industry: formData.industry,
          useCase: formData.useCase
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit demo request')
      }

      // Reset form and show success
      setFormData(initialFormData)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      // Display error message in the useCase field as a general error
      setErrors({ useCase: 'There was an error submitting your request. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (isSubmitting) return

    onClose()

    // Reset form state after animation completes
    setTimeout(() => {
      setFormData(initialFormData)
      setErrors({})
      setIsSuccess(false)
    }, 300)
  }

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose()
  }

  if (!isOpen) return null

  const industries = [
    "Finance & Banking",
    "Healthcare",
    "Legal",
    "Media & Publishing",
    "Technology",
    "Education",
    "Government",
    "Manufacturing",
    "Retail",
    "Other",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-xl bg-black/80 border border-purple-500/30 backdrop-blur-md shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white/70 hover:text-white hover:bg-black/40 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Request a Demo</h2>
                    <p className="text-white/70">
                      Fill out the form below and our team will get in touch to schedule your personalized demo.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
                          Full Name <span className="text-purple-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 bg-black/40 border ${
                            errors.name ? "border-red-500" : "border-purple-500/30"
                          } rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                          placeholder="Your name"
                          disabled={isSubmitting}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                          Email <span className="text-purple-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 bg-black/40 border ${
                            errors.email ? "border-red-500" : "border-purple-500/30"
                          } rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                          placeholder="your.email@company.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-1">
                          Company <span className="text-purple-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 bg-black/40 border ${
                            errors.company ? "border-red-500" : "border-purple-500/30"
                          } rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                          placeholder="Your company"
                          disabled={isSubmitting}
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
                      </div>

                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-white/90 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Your position"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="+1 (555) 123-4567"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-white/90 mb-1">
                          Industry <span className="text-purple-400">*</span>
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 bg-black/40 border ${
                            errors.industry ? "border-red-500" : "border-purple-500/30"
                          } rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                          disabled={isSubmitting}
                        >
                          <option value="" disabled>
                            Select your industry
                          </option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                        {errors.industry && <p className="mt-1 text-sm text-red-400">{errors.industry}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="useCase" className="block text-sm font-medium text-white/90 mb-1">
                        How do you plan to use our platform?
                      </label>
                      <textarea
                        id="useCase"
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                        placeholder="Tell us about your use case and requirements..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-md shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Request Demo"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-6">
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Thank You!</h2>
                  <p className="text-white/70 mb-8 max-w-lg mx-auto">
                    Your demo request has been submitted successfully. One of our team members will contact you shortly
                    to schedule your personalized demo.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default RequestDemoModal
