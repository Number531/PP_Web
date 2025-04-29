"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { CustomSelect } from "@/app/components/ui/CustomSelect"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Send data to your API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit form")
      }

      // Success
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "There was an error submitting your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-black/10 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

      {isSubmitted ? (
        <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-white/80">Thank you for reaching out. Our team will get back to you shortly.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name <span className="text-purple-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address <span className="text-purple-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-black/30 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="Your company name"
            />
          </div>

          <div data-component-name="ContactForm">
            <label htmlFor="subject" className="block text-sm font-medium mb-2" data-component-name="ContactForm">
              Subject <span className="text-purple-400">*</span>
            </label>
            <CustomSelect
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Select a subject"
              options={[
                { value: "Demo Request", label: "Request a Demo" },
                { value: "Product Inquiry", label: "Product Inquiry" },
                { value: "Partnership", label: "Partnership Opportunity" },
                { value: "Support", label: "Technical Support" },
                { value: "Other", label: "Other" }
              ]}
              data-component-name="ContactForm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message <span className="text-purple-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-black/30 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="How can we help you?"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-sm text-red-300">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  )
}
