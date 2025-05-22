"use client"

import { Clock } from "lucide-react"

interface ReadingTimeIndicatorProps {
  minutes: number
}

export function ReadingTimeIndicator({ minutes }: ReadingTimeIndicatorProps) {
  // Calculate approximate word count based on average reading speed (200-250 words per minute)
  const wordCount = Math.round(minutes * 225)
  
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
      <Clock className="w-4 h-4" />
      <div className="flex flex-col">
        <span className="text-xs font-medium">{minutes} min read</span>
        <span className="text-[10px] text-purple-300/70">~{wordCount} words</span>
      </div>
    </div>
  )
}
