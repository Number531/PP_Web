"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Add text shadow for better readability on translucent background
const textShadowStyle = {
  textShadow: "0px 1px 2px rgba(0, 0, 0, 0.7)",
}

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true")
    setShowConsent(false)

    // Initialize analytics/tracking scripts
    if (typeof window !== "undefined" && window.gtag) {
      console.log("Analytics enabled")
      // Enable analytics tracking
    }
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "false")
    setShowConsent(false)

    // Disable tracking cookies
    if (typeof window !== "undefined") {
      // Disable analytics tracking
      console.log("Analytics disabled")
    }
  }

  const handleCustomize = () => {
    // You could open a modal with more detailed cookie preferences here
    // For now, we'll just use the same behavior as Accept
    handleAccept()
  }

  if (!showConsent) return null

  return (
    <motion.div
      className="fixed bottom-3 left-0 right-0 z-50 mx-auto max-w-4xl px-3"
      initial={{ y: 70, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 70, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/10 to-black/5 backdrop-blur-[2px] shadow-xl border border-white/10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="p-3 bg-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="text-white text-xs md:text-sm space-y-0.5">
              <h3
                className="text-sm font-medium text-white mb-0.5"
                style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.8)" }}
              >
                Cookie Preferences
              </h3>
              <p
                className="text-white/90 leading-relaxed max-w-3xl text-xs"
                style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.8)" }}
              >
                We use cookies to enhance your experience. By continuing, you consent to our use of cookies.
              </p>
              <div className="pt-0.5">
                <Link
                  href="/legal/privacy-policy"
                  className="text-purple-400 hover:text-purple-300 text-xs inline-flex items-center"
                  style={textShadowStyle}
                >
                  Privacy
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <span className="mx-1.5 text-white/30">|</span>
                <Link
                  href="/legal/terms-of-service"
                  className="text-purple-400 hover:text-purple-300 text-xs inline-flex items-center"
                  style={textShadowStyle}
                >
                  Terms
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 self-end md:self-center">
              <button
                onClick={handleReject}
                className="px-3 py-1.5 text-xs font-medium text-white bg-black/10 hover:bg-black/20 border border-white/10 rounded transition-colors"
                aria-label="Reject all cookies"
                style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.8)" }}
              >
                Reject
              </button>

              <button
                onClick={handleCustomize}
                className="px-3 py-1.5 text-xs font-medium text-white bg-black/10 hover:bg-black/20 border border-white/10 rounded transition-colors"
                aria-label="Customize cookie preferences"
                style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.8)" }}
              >
                Customize
              </button>

              <button
                onClick={handleAccept}
                className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-600/50 to-indigo-600/50 hover:from-purple-700/60 hover:to-indigo-700/60 rounded transition-all shadow-md shadow-purple-500/10"
                aria-label="Accept all cookies"
                style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.8)" }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
