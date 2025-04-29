import { api } from "../index"
import { ApiError } from "../types"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

interface User {
  id: string
  name: string
  email: string
}

interface AuthResponse {
  user: User
  token: string
}

class AuthService {
  /**
   * Login a user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials)

      // Store the token in localStorage
      localStorage.setItem("auth_token", response.data.token)

      return response.data
    } catch (error) {
      // Handle specific login errors
      if (error instanceof ApiError) {
        if (error.status === 401) {
          throw new ApiError("Invalid email or password", 401)
        }
      }

      throw error
    }
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", data)

      // Store the token in localStorage
      localStorage.setItem("auth_token", response.data.token)

      return response.data
    } catch (error) {
      // Handle specific registration errors
      if (error instanceof ApiError) {
        if (error.status === 422) {
          throw new ApiError("Validation failed. Please check your input.", 422, error.data)
        }
      }

      throw error
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Always remove the token from localStorage
      localStorage.removeItem("auth_token")
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/auth/user")
    return response.data
  }

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return typeof window !== "undefined" && !!localStorage.getItem("auth_token")
  }

  /**
   * Get the auth token
   */
  getToken(): string | null {
    return typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  }
}

export const authService = new AuthService()
