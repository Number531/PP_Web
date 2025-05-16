"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Mail, User, Phone, Building, MessageSquare, ArrowRight, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type RequestDemoModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function RequestDemoModal({ isOpen, onClose }: RequestDemoModalProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Reset form when opening modal
  useEffect(() => {
    if (isOpen) {
      setFullName("")
      setEmail("")
      setCompany("")
      setPhone("")
      setMessage("")
      setFormErrors({})
      setSubmitSuccess(false)
      setSubmitError(null)
    }
  }, [isOpen])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setFormErrors({})
    setSubmitError(null)

    // Validate form
    const errors: { [key: string]: string } = {}

    if (fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters"
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (company.trim().length < 1) {
      errors.company = "Please enter your company name"
    }

    if (message.trim().length < 10) {
      errors.message = "Please provide more details about your request"
    }

    // If there are errors, display them and stop submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Submit the form
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send this data to your backend
      console.log("Demo request submitted:", { fullName, email, company, phone, message })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitSuccess(true)
      // Auto-close after success
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      setSubmitError("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md">
              <div className="bg-glass-purple rounded-xl border border-glass-purple p-6 shadow-glow">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">
                    {submitSuccess ? "Request Submitted!" : "Request a Demo"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Close modal"
                    disabled={isSubmitting}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Success message */}
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-white text-lg mb-2">Thank you for your interest!</p>
                    <p className="text-white/80">
                      We've received your request and will contact you shortly to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Error message */}
                    {submitError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm">
                        {submitError}
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                      {/* Full Name field */}
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-400" />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            disabled={isSubmitting}
                            className={`bg-black/30 border ${formErrors.fullName ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                            placeholder="John Doe"
                          />
                        </div>
                        {formErrors.fullName && <p className="mt-1 text-sm text-red-400">{formErrors.fullName}</p>}
                      </div>

                      {/* Email field */}
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purple-400" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                            className={`bg-black/30 border ${formErrors.email ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                            placeholder="you@example.com"
                          />
                        </div>
                        {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
                      </div>

                      {/* Company field */}
                      <div className="mb-4">
                        <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
                          Company
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-purple-400" />
                          </div>
                          <input
                            id="company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            disabled={isSubmitting}
                            className={`bg-black/30 border ${formErrors.company ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                            placeholder="Acme Inc."
                          />
                        </div>
                        {formErrors.company && <p className="mt-1 text-sm text-red-400">{formErrors.company}</p>}
                      </div>

                      {/* Phone field (optional) */}
                      <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">
                          Phone Number (optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-purple-400" />
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={isSubmitting}
                            className="bg-black/30 border border-purple-500/30 text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Message field */}
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                          How can we help you?
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-purple-400" />
                          </div>
                          <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={isSubmitting}
                            rows={4}
                            className={`bg-black/30 border ${formErrors.message ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                            placeholder="Tell us about your needs and what you're looking for in a demo..."
                          />
                        </div>
                        {formErrors.message && <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>}
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-pulse">Submitting...</span>
                          </>
                        ) : (
                          <>
                            Request Demo
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}

                {/* Privacy note */}
                <div className="mt-4 text-center text-xs text-white/50">
                  By submitting this form, you agree to our
                  <button className="text-purple-400 hover:text-purple-300 ml-1">
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
