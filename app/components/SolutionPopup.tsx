'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SolutionPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function SolutionPopup({ isOpen, onClose, title, children }: SolutionPopupProps) {
  const [isClosing, setIsClosing] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    // Handle clicking outside the popup
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) && isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    document.addEventListener('mousedown', handleClickOutside)

    // Prevent scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // Match the animation duration
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup content */}
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 bg-black/90 border border-purple-500/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-purple-500/20 bg-black/90 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-purple-500/20 transition-colors"
                aria-label="Close popup"
              >
                <X className="w-6 h-6 text-purple-300" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
