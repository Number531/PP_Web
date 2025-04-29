"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, MapPin, Clock, DollarSign, CheckCircle } from "lucide-react"
import { JobApplication } from "./JobApplication"
import type { Job } from "../types"

interface JobDetailProps {
  job: Job
  onClose: () => void
}

export function JobDetail({ job, onClose }: JobDetailProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-purple-500/20">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close job details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <span>{job.salary}</span>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4">About the Role</h3>
              <p className="text-white/80 leading-relaxed">{job.description}</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Nice to Have</h3>
              <ul className="space-y-3">
                {job.niceToHave.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-3">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <JobApplication jobTitle={job.title} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
