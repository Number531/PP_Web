"use client"

import { Search } from "lucide-react"

interface JobSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function JobSearch({ searchQuery, setSearchQuery }: JobSearchProps) {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-white/50" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for jobs..."
        className="w-full pl-10 pr-4 py-2 bg-black/50 border border-purple-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      />
    </div>
  )
}
