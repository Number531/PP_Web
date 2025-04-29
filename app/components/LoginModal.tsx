"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Apple, Facebook, Eye, EyeOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/auth-context"

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const { state, login, socialLogin, clearError } = useAuth()
  const { isLoading, error } = state

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
      // Clear any previous errors when opening modal
      if (error) clearError() // FIX: Only clear error if there is one
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose, clearError, error]) // FIX: Added error to dependency array

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setFormErrors({})

    // Validate form
    const errors: { [key: string]: string } = {}

    if (isSignUp) {
      if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters"
      }

      if (password.length < 8) {
        errors.password = "Password must be at least 8 characters"
      }

      if (password !== passwordConfirm) {
        errors.passwordConfirm = "Passwords do not match"
      }
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    // If there are errors, display them and stop submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    if (isSignUp) {
      console.log("Sign up with:", { name, email, password })
      // In a real app, you would register the user here
      // For now, just log them in
      await login(email, password)
    } else {
      await login(email, password)
    }
  }

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    socialLogin(provider)
  }

  // Toggle between login and signup
  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    // Reset form when switching modes
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
    setName("")
    setFormErrors({})
    // Clear any errors
    clearError()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md">
              <div className="bg-glass-purple rounded-xl border border-glass-purple p-6 shadow-glow">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                  <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Close modal"
                    disabled={isLoading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Name field (only for signup) */}
                  {isSignUp && (
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-purple-400" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                          className={`bg-black/30 border ${formErrors.name ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                          placeholder="John Doe"
                        />
                      </div>
                      {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
                    </div>
                  )}

                  {/* Email field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-purple-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className={`bg-black/30 border ${formErrors.email ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
                  </div>

                  {/* Password field */}
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-purple-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className={`bg-black/30 border ${formErrors.password ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        placeholder={isSignUp ? "Create a password" : "Enter your password"}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-purple-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-purple-400" />
                        )}
                      </button>
                    </div>
                    {formErrors.password && <p className="mt-1 text-sm text-red-400">{formErrors.password}</p>}
                  </div>

                  {/* Add password confirmation field (only for signup) */}
                  {isSignUp && (
                    <div className="mb-6">
                      <label htmlFor="passwordConfirm" className="block text-sm font-medium text-white/80 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-purple-400" />
                        </div>
                        <input
                          id="passwordConfirm"
                          type={showPasswordConfirm ? "text" : "password"}
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          required
                          disabled={isLoading}
                          className={`bg-black/30 border ${formErrors.passwordConfirm ? "border-red-500" : "border-purple-500/30"} text-white rounded-md block w-full pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                          aria-label={showPasswordConfirm ? "Hide password" : "Show password"}
                        >
                          {showPasswordConfirm ? (
                            <EyeOff className="h-5 w-5 text-purple-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-purple-400" />
                          )}
                        </button>
                      </div>
                      {formErrors.passwordConfirm && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.passwordConfirm}</p>
                      )}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-pulse">Processing...</span>
                      </>
                    ) : (
                      <>
                        {isSignUp ? "Create Account" : "Log In"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow h-px bg-white/10"></div>
                  <span className="px-3 text-sm text-white/50">or continue with</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>

                {/* Social Login Options */}
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => handleSocialLogin("Google")}
                    disabled={isLoading}
                    className="flex justify-center items-center p-2 bg-black/20 hover:bg-black/30 border border-white/10 rounded-md transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label="Sign in with Google"
                  >
                    <Chrome className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin("GitHub")}
                    disabled={isLoading}
                    className="flex justify-center items-center p-2 bg-black/20 hover:bg-black/30 border border-white/10 rounded-md transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label="Sign in with GitHub"
                  >
                    <Github className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin("Apple")}
                    disabled={isLoading}
                    className="flex justify-center items-center p-2 bg-black/20 hover:bg-black/30 border border-white/10 rounded-md transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label="Sign in with Apple"
                  >
                    <Apple className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin("Facebook")}
                    disabled={isLoading}
                    className="flex justify-center items-center p-2 bg-black/20 hover:bg-black/30 border border-white/10 rounded-md transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label="Sign in with Facebook"
                  >
                    <Facebook className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* Toggle between login and signup */}
                <div className="mt-6 text-center">
                  <p className="text-white/70">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button
                      onClick={toggleMode}
                      disabled={isLoading}
                      className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSignUp ? "Log In" : "Sign Up"}
                    </button>
                  </p>
                </div>

                {/* Forgot password (only for login) */}
                {!isSignUp && (
                  <div className="mt-2 text-center">
                    <button
                      className="text-purple-400/80 hover:text-purple-300 text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
