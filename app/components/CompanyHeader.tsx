"use client"

import type React from "react"
import { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RequestDemoModal } from "@/app/components/RequestDemoModal"
import { MobileNavigation } from "./MobileNavigation"
import { useMobile } from "@/app/shared/hooks/use-mobile"
import { useAuth } from "@/app/context/auth-context"

// Navigation links data structure
const navigationLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Platform" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

// Reusable NavLink component
const NavLink = memo(({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-all duration-300 ${
        isActive ? "text-white" : "text-white/80 hover:text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  )
})

NavLink.displayName = "NavLink"

// Memoized CompanyHeader component
export const CompanyHeader = memo(function CompanyHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const isMobile = useMobile()
  const { state, logout } = useAuth()
  const { isAuthenticated } = state
  const pathname = usePathname()

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    // Use a threshold value to prevent frequent state updates
    const shouldBeScrolled = window.scrollY > 50
    if (scrolled !== shouldBeScrolled) {
      setScrolled(shouldBeScrolled)
    }
  }, [scrolled])

  // Add scroll detection for header styling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Don't render the header on the chat page to avoid conflicts with the chat interface header
  if (pathname === "/chat") return null;
  
  // Optimize for page transitions by using a persistent header
  
  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-full z-40 p-3 md:p-6 transition-all duration-300 pointer-events-auto ${
          scrolled ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-black/30"
        }`}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto relative">
          {pathname !== "/chat" && (
            <>
              {/* Three-column layout for mobile */}
              <div className="grid grid-cols-3 items-center md:flex md:justify-between">
                {/* Logo - Left column */}
                <div className="col-span-1 flex items-center">
                  <Link href="/" className="text-xl md:text-2xl font-semibold text-white flex items-center tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                      PSQRD
                    </span>
                  </Link>
                </div>
                
                {/* Mobile Navigation - Center column, only on mobile */}
                <div className="col-span-1 flex justify-center md:hidden">
                  <MobileNavigation />
                </div>

                {/* Login/Logout Button - Right column */}
                <div className="col-span-1 flex justify-end items-center relative z-50 pointer-events-auto">
                  {isAuthenticated ? (
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors pointer-events-auto relative z-50"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      className="px-3 py-2 text-base md:text-lg font-semibold tracking-tight transition-all pointer-events-auto relative z-50 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-300 hover:to-purple-500"
                      aria-label="Request a demo"
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      Request Demo
                    </button>
                  )}
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav
                className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                aria-label="Main navigation"
              >
                <div className="flex items-center gap-8">
                  {navigationLinks.map((link) => (
                    <NavLink key={link.href} href={link.href}>
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </nav>
            </>
          )}
        </div>
      </motion.div>

      {/* Request Demo Modal */}
      <RequestDemoModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
})
