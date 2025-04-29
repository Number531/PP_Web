import { api } from "../index"
import type { ApiResponse } from "../types"

interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface UpdateProfileData {
  name?: string
  email?: string
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

class UserService {
  /**
   * Get the user profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get<User>("/user/profile")
    return response.data
  }

  /**
   * Update the user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await api.put<User>("/user/profile", data)
    return response.data
  }

  /**
   * Change the user password
   */
  async changePassword(data: ChangePasswordData): Promise<ApiResponse<void>> {
    return api.put<void>("/user/password", data)
  }

  /**
   * Delete the user account
   */
  async deleteAccount(): Promise<ApiResponse<void>> {
    return api.delete<void>("/user/account")
  }
}

export const userService = new UserService()
