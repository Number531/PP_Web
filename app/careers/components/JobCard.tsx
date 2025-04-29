"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react"
import type { Job } from "../types"

interface JobCardProps {
  job: Job
  onClick: () => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(168, 85, 247, 0.3)" }}
      className="bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6 cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
            {job.department}
          </span>
          <h3 className="text-xl font-bold mb-2">{job.title}</h3>

          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-purple-400" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-purple-400 group">
          <span className="font-medium">View Details</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  )
}
