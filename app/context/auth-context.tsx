"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"

// Define user type
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Define authentication state
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Define authentication actions
type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading to check for existing session
  error: null,
}

// Create context
const AuthContext = createContext<
  | {
      state: AuthState
      login: (email: string, password: string) => Promise<void>
      socialLogin: (provider: string) => Promise<void>
      logout: () => void
      clearError: () => void
    }
  | undefined
>(undefined)

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const router = useRouter()

  // Check for existing session on mount - FIX: Added empty dependency array
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("chat_user_token")

        if (token) {
          // In a real app, you would validate the token with your backend
          const userData = localStorage.getItem("chat_user_data")

          if (userData) {
            const user = JSON.parse(userData)
            dispatch({ type: "LOGIN_SUCCESS", payload: user })
          } else {
            // Token exists but no user data
            dispatch({ type: "LOGIN_FAILURE", payload: "Session expired" })
            localStorage.removeItem("chat_user_token")
          }
        } else {
          // No token found
          dispatch({ type: "LOGOUT" })
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        dispatch({ type: "LOGIN_FAILURE", payload: "Authentication failed" })
      }
    }

    // FIX: Removed async to prevent potential issues with useEffect
    checkAuth()
  }, []) // Empty dependency array ensures this only runs once on mount

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      dispatch({ type: "LOGIN_START" })

      try {
        // In a real app, you would make an API call to your backend
        // Simulating API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, create a mock user
        const user: User = {
          id: "user-1",
          name: "John Doe",
          email: email,
        }

        // Store auth data
        localStorage.setItem("chat_user_token", "mock-token-" + Date.now())
        localStorage.setItem("chat_user_data", JSON.stringify(user))

        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        router.push("/chat")
      } catch (error) {
        console.error("Login error:", error)
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Invalid email or password",
        })
      }
    },
    [router],
  )

  // Social login function
  const socialLogin = useCallback(
    async (provider: string) => {
      dispatch({ type: "LOGIN_START" })

      try {
        // In a real app, you would initiate OAuth flow
        // Simulating API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, create a mock user
        const user: User = {
          id: "user-1",
          name: `${provider} User`,
          email: `user@${provider.toLowerCase()}.example.com`,
        }

        // Store auth data
        localStorage.setItem("chat_user_token", "mock-token-" + Date.now())
        localStorage.setItem("chat_user_data", JSON.stringify(user))

        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        router.push("/chat")
      } catch (error) {
        console.error(`${provider} login error:`, error)
        dispatch({
          type: "LOGIN_FAILURE",
          payload: `${provider} login failed`,
        })
      }
    },
    [router],
  )

  // Logout function
  const logout = useCallback(() => {
    // Clear auth data
    localStorage.removeItem("chat_user_token")
    localStorage.removeItem("chat_user_data")

    dispatch({ type: "LOGOUT" })
    router.push("/")
  }, [router])

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" })
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      login,
      socialLogin,
      logout,
      clearError,
    }),
    [state, login, socialLogin, logout, clearError],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
