"use client"

import { useState, useEffect } from "react"
import type { Conversation, Message, User } from "../types"
import { mockConversations, mockMessages, mockUser } from "../data/mock-conversations"

export function useChatState() {
  // State
  const [user, setUser] = useState<User | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  // Get active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null

  // Initialize data
  useEffect(() => {
    // Simulate loading data from API
    const loadData = async () => {
      setIsLoading(true)

      try {
        // In a real app, you would fetch this data from your API
        // For demo purposes, we're using mock data with a delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get user data from localStorage or use mock data
        const storedUser = localStorage.getItem("chat_user_data")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(mockUser)
          localStorage.setItem("chat_user_data", JSON.stringify(mockUser))
        }

        // Set conversations
        setConversations(mockConversations)

        // Set default active conversation
        if (mockConversations.length > 0 && !activeConversationId) {
          setActiveConversationId(mockConversations[0].id)
        }
      } catch (error) {
        console.error("Error loading chat data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [activeConversationId])

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversationId) {
      // In a real app, you would fetch messages from your API
      const conversationMessages = mockMessages[activeConversationId] || []
      setMessages(conversationMessages)

      // Mark messages as read
      if (conversationMessages.length > 0) {
        // Update unread count in conversations
        setConversations((prev) => prev.map((c) => (c.id === activeConversationId ? { ...c, unreadCount: 0 } : c)))
      }
    } else {
      setMessages([])
    }
  }, [activeConversationId])

  // Create new conversation function
  const createNewConversation = () => {
    // Generate a unique ID for the new conversation
    const newConversationId = `conv-new-${Date.now()}`
    
    // Create a new conversation object
    const newConversation: Conversation = {
      id: newConversationId,
      name: "New Conversation",
      lastMessage: "",
      lastMessageTime: "Just now",
      online: false,
      unreadCount: 0,
    }
    
    // Add the new conversation to the state
    setConversations((prev) => [newConversation, ...prev])
    
    // Set it as the active conversation
    setActiveConversationId(newConversationId)
    
    // Clear messages for the new conversation
    setMessages([])
    
    return newConversationId
  }

  // Send message function
  const sendMessage = (text: string) => {
    // If no active conversation, create a new one
    if (!activeConversationId) {
      const newConvId = createNewConversation()
      if (!newConvId || !user) return
    } else if (!user) {
      return
    }

    // Create new message
    const newMessage: Message = {
      id: `msg-new-${Date.now()}`,
      conversationId: activeConversationId as string, // We know it's not null at this point
      senderId: user.id,
      text,
      timestamp: new Date().toISOString(),
      status: "sending",
    }

    // Add message to state
    setMessages((prev) => [...prev, newMessage])

    // Update conversation last message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: "Just now",
            }
          : c,
      ),
    )

    // Simulate message sending process
    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m.id === newMessage.id ? { ...m, status: "sent" } : m)))

      // Simulate message delivery
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => (m.id === newMessage.id ? { ...m, status: "delivered" } : m)))

        // Simulate typing indicator
        setIsTyping(true)

        // Simulate reply after typing
        setTimeout(
          () => {
            setIsTyping(false)

            // Create reply message
            const replyText = getAutoReply(text)
            const replyMessage: Message = {
              id: `msg-reply-${Date.now()}`,
              conversationId: activeConversationId,
              senderId: activeConversation!.id,
              text: replyText,
              timestamp: new Date().toISOString(),
              status: "read",
            }

            // Add reply to messages
            setMessages((prev) => [...prev, replyMessage])

            // Update conversation last message
            setConversations((prev) =>
              prev.map((c) =>
                c.id === activeConversationId
                  ? {
                      ...c,
                      lastMessage: replyText,
                      lastMessageTime: "Just now",
                    }
                  : c,
              ),
            )

            // Mark original message as read
            setMessages((prev) => prev.map((m) => (m.id === newMessage.id ? { ...m, status: "read" } : m)))
          },
          2000 + Math.random() * 1000,
        )
      }, 1000)
    }, 1000)
  }

  // Helper function to generate auto replies
  const getAutoReply = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I help you today?"
    }

    if (lowerMessage.includes("meeting") || lowerMessage.includes("schedule")) {
      return "I'm available for a meeting tomorrow afternoon. Does 2 PM work for you?"
    }

    if (lowerMessage.includes("project") || lowerMessage.includes("status")) {
      return "The project is progressing well. We're currently at 70% completion and on track to meet the deadline."
    }

    if (lowerMessage.includes("thanks") || lowerMessage.includes("thank you")) {
      return "You're welcome! Let me know if you need anything else."
    }

    return "Thanks for your message. I'll get back to you as soon as possible."
  }

  return {
    user,
    conversations,
    activeConversationId,
    setActiveConversationId,
    activeConversation,
    messages,
    sendMessage,
    createNewConversation,
    isLoading,
    isTyping,
  }
}
