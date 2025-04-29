"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { JobCard } from "./JobCard"
import { JobDetail } from "./JobDetail"
import { JobFilter } from "./JobFilter"
import { JobSearch } from "./JobSearch"
import type { Job } from "../types"

interface JobListingsProps {
  jobs: Job[]
}

export function JobListings({ jobs }: JobListingsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // Extract unique departments and locations for filters
  const departments = Array.from(new Set(jobs.map((job) => job.department)))
  const locations = Array.from(new Set(jobs.map((job) => job.location)))

  // Filter jobs based on search query and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment ? job.department === selectedDepartment : true
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true

    return matchesSearch && matchesDepartment && matchesLocation
  })

  return (
    <div id="open-positions">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <JobSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex gap-4">
          <JobFilter
            label="Department"
            options={departments}
            selectedOption={selectedDepartment}
            setSelectedOption={setSelectedDepartment}
          />
          <JobFilter
            label="Location"
            options={locations}
            selectedOption={selectedLocation}
            setSelectedOption={setSelectedLocation}
          />
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-black/40 backdrop-blur-md rounded-lg border border-purple-500/20">
          <p className="text-white/70">No jobs match your search criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedJob && <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </div>
  )
}
