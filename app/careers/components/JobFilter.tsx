"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface JobFilterProps {
  label: string
  options: string[]
  selectedOption: string | null
  setSelectedOption: (option: string | null) => void
}

export function JobFilter({ label, options, selectedOption, setSelectedOption }: JobFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 bg-black/50 border border-purple-500/20 rounded-md px-4 py-2 min-w-[150px] text-left"
      >
        <span>{selectedOption || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-black/90 backdrop-blur-md border border-purple-500/20 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            <div className="py-1">
              <button
                onClick={() => {
                  setSelectedOption(null)
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-purple-500/10 transition-colors"
              >
                All {label}s
              </button>

              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedOption(option)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-purple-500/10 transition-colors ${
                    selectedOption === option ? "bg-purple-500/20 text-purple-300" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
