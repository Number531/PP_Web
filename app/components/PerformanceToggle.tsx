"use client"

import { useState, useEffect } from "react"
import { Settings, Gauge } from "lucide-react"
import { getPerformanceMode, setPerformanceMode } from "@/app/utils/performance-monitoring"

export function PerformanceToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMode, setCurrentMode] = useState<"low" | "medium" | "high">("high")

  useEffect(() => {
    setCurrentMode(getPerformanceMode())
  }, [])

  const handleModeChange = (mode: "low" | "medium" | "high") => {
    setPerformanceMode(mode)
    setCurrentMode(mode)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-full text-white hover:bg-black/70 transition-colors"
        aria-label="Performance settings"
      >
        <Gauge className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-black/80 backdrop-blur-md border border-purple-500/20 rounded-lg p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Performance Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
              aria-label="Close performance settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleModeChange("low")}
              className={`w-full text-left px-3 py-2 rounded ${
                currentMode === "low" ? "bg-purple-500/20 text-purple-300" : "hover:bg-white/5 text-white/80"
              }`}
            >
              Low - Better performance
            </button>

            <button
              onClick={() => handleModeChange("medium")}
              className={`w-full text-left px-3 py-2 rounded ${
                currentMode === "medium" ? "bg-purple-500/20 text-purple-300" : "hover:bg-white/5 text-white/80"
              }`}
            >
              Medium - Balanced
            </button>

            <button
              onClick={() => handleModeChange("high")}
              className={`w-full text-left px-3 py-2 rounded ${
                currentMode === "high" ? "bg-purple-500/20 text-purple-300" : "hover:bg-white/5 text-white/80"
              }`}
            >
              High - Best visuals
            </button>
          </div>

          <p className="mt-3 text-xs text-white/60">Lower settings improve performance on less powerful devices.</p>
        </div>
      )}
    </div>
  )
}
