'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CustomSelectProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  required = false,
  options,
  placeholder = 'Select an option',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const selectRef = useRef<HTMLDivElement>(null)

  // Update the selected label when value changes
  useEffect(() => {
    const selected = options.find(option => option.value === value)
    setSelectedLabel(selected?.label || '')
  }, [value, options])

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle option selection
  const handleOptionSelect = (optionValue: string) => {
    // Create a synthetic event to mimic the select onChange
    const syntheticEvent = {
      target: {
        name,
        value: optionValue
      }
    } as React.ChangeEvent<HTMLSelectElement>
    
    onChange(syntheticEvent)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className="relative">
      {/* Hidden native select for form submission */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="opacity-0 absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom select trigger */}
      <div
        className={`flex items-center justify-between w-full bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-md px-4 py-2 cursor-pointer hover:border-purple-500/40 transition-colors ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id}
      >
        <span className={`${!value ? 'text-white/50' : 'text-white'}`}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-md shadow-lg overflow-hidden"
            role="listbox"
          >
            <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
              {options.map(option => (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-purple-500/10 transition-colors ${
                    value === option.value ? 'bg-purple-500/20 text-purple-300' : 'text-white/80'
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
