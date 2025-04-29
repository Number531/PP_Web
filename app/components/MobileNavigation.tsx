"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/app/shared/hooks/use-mobile"

// Navigation links data structure
const navigationLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Platform" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  // Don't render anything on desktop
  if (!isMobile) return null

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        onClick={(e) => {
          e.stopPropagation() // Prevent event bubbling
          setIsOpen(!isOpen)
        }}
        aria-expanded={isOpen}
        aria-label="Toggle mobile menu"
      >
        <Menu className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`} />
        <X className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`} />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center gap-8 p-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xl font-medium transition-all duration-300 ${
                      pathname === link.href ? "text-purple-400" : "text-white/90 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation() // Prevent event bubbling
                      setIsOpen(false)
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
