export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Conversation {
  id: string
  name: string
  lastMessage: string
  lastMessageTime: string
  online: boolean
  unreadCount: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  timestamp: string
  status: "sending" | "sent" | "delivered" | "read"
}

// AI Chat types
export interface AIChat {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  modelId: string
}

export interface AIMessage {
  id: string
  chatId: string
  role: "system" | "user" | "assistant"
  content: string
  timestamp: string
}

export interface AIModel {
  id: string
  name: string
  description: string
  maxTokens: number
  temperature: number
}
