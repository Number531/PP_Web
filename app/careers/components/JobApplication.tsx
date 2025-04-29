"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Loader2 } from "lucide-react"

interface JobApplicationProps {
  jobTitle: string
}

export function JobApplication({ jobTitle }: JobApplicationProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-6 text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
        <p className="text-white/80">
          Thank you for applying to the {jobTitle} position. We'll review your application and get back to you soon.
        </p>
      </motion.div>
    )
  }

  return (
    <section className="border-t border-purple-500/20 pt-8">
      <h3 className="text-xl font-semibold mb-6">Apply for this Position</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-black/50 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/50 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium mb-2">
            Resume/CV
          </label>
          <div className="border border-dashed border-purple-500/20 rounded-md p-6 text-center bg-black/10 backdrop-blur-sm">
            <input
              id="resume"
              type="file"
              onChange={(e) => e.target.files && setResumeFile(e.target.files[0])}
              required
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="resume" className="cursor-pointer">
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-white/80 mb-1">
                {resumeFile ? resumeFile.name : "Drag and drop your resume, or click to browse"}
              </p>
              <p className="text-xs text-white/60">PDF, DOC, or DOCX (max 5MB)</p>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium mb-2">
            Cover Letter (Optional)
          </label>
          <div className="border border-dashed border-purple-500/20 rounded-md p-6 text-center bg-black/10 backdrop-blur-sm">
            <input
              id="coverLetter"
              type="file"
              onChange={(e) => e.target.files && setCoverLetterFile(e.target.files[0])}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="coverLetter" className="cursor-pointer">
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-white/80 mb-1">
                {coverLetterFile ? coverLetterFile.name : "Drag and drop your cover letter, or click to browse"}
              </p>
              <p className="text-xs text-white/60">PDF, DOC, or DOCX (max 5MB)</p>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
