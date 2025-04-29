"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import type { AIChat, AIMessage, AIModel, User } from "../types"
import { mockAIChats, mockAIMessages, mockUser, mockModels } from "../data/mock-ai-data"

export function useAIChatState() {
  // State
  const [user, setUser] = useState<User | null>(null)
  const [chats, setChats] = useState<AIChat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState<AIModel>(mockModels[0])
  const [models] = useState<AIModel[]>(mockModels)

  // Get active chat
  const activeChat = chats.find((c) => c.id === activeChatId) || null

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

        // Set chats
        setChats(mockAIChats)

        // Set default active chat
        if (mockAIChats.length > 0 && !activeChatId) {
          setActiveChatId(mockAIChats[0].id)
        }
      } catch (error) {
        console.error("Error loading chat data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [activeChatId])

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChatId) {
      // In a real app, you would fetch messages from your API
      const chatMessages = mockAIMessages[activeChatId] || []
      setMessages(chatMessages)
    } else {
      setMessages([])
    }
  }, [activeChatId])

  // Create a new chat
  const createNewChat = () => {
    const newChatId = uuidv4()
    const newChat: AIChat = {
      id: newChatId,
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      modelId: selectedModel.id,
    }

    // Add welcome message
    const welcomeMessage: AIMessage = {
      id: uuidv4(),
      chatId: newChatId,
      role: "system",
      content: `Hello! I'm ${selectedModel.name}, an AI assistant. How can I help you today?`,
      timestamp: new Date().toISOString(),
    }

    // Update state
    setChats((prev) => [newChat, ...prev])
    mockAIMessages[newChatId] = [welcomeMessage]
    setActiveChatId(newChatId)
    setMessages([welcomeMessage])

    return newChatId
  }

  // Send message function
  const sendMessage = async (content: string) => {
    if (!activeChatId || !user) return

    // Create new chat if none is active
    let chatId = activeChatId
    if (!chatId) {
      chatId = createNewChat()
    }

    // Create user message
    const userMessage: AIMessage = {
      id: uuidv4(),
      chatId,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    }

    // Add message to state
    setMessages((prev) => [...prev, userMessage])

    // Update chat title if it's the first user message
    if (messages.filter((m) => m.role === "user").length === 0) {
      const newTitle = content.length > 30 ? content.substring(0, 30) + "..." : content
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, title: newTitle, updatedAt: new Date().toISOString() } : c)),
      )
    }

    // Update chat's updatedAt
    setChats((prev) => prev.map((c) => (c.id === chatId ? { ...c, updatedAt: new Date().toISOString() } : c)))

    // Generate AI response
    setIsGenerating(true)

    try {
      // Simulate AI thinking time
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      // Generate response based on the message
      const responseContent = generateAIResponse(content, selectedModel)

      // Create AI message
      const aiMessage: AIMessage = {
        id: uuidv4(),
        chatId,
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toISOString(),
      }

      // Add AI message to state
      setMessages((prev) => [...prev, aiMessage])

      // Update mock data
      if (!mockAIMessages[chatId]) {
        mockAIMessages[chatId] = []
      }
      mockAIMessages[chatId].push(userMessage, aiMessage)
    } catch (error) {
      console.error("Error generating AI response:", error)

      // Add error message
      const errorMessage: AIMessage = {
        id: uuidv4(),
        chatId,
        role: "system",
        content: "I'm sorry, I encountered an error while generating a response. Please try again.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  // Regenerate the last AI response
  const regenerateResponse = async () => {
    if (!activeChatId || !user || messages.length === 0) return

    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex((m) => m.role === "user")
    if (lastUserMessageIndex === -1) return

    const lastUserMessage = [...messages].reverse()[lastUserMessageIndex]

    // Remove all messages after the last user message
    const messagesToKeep = messages.slice(0, messages.length - lastUserMessageIndex)
    setMessages(messagesToKeep)

    // Generate new response
    await sendMessage(lastUserMessage.content)
  }

  // Change the selected model
  const changeModel = (modelId: string) => {
    const model = models.find((m) => m.id === modelId)
    if (model) {
      setSelectedModel(model)
    }
  }

  // Helper function to generate AI responses
  const generateAIResponse = (message: string, model: AIModel): string => {
    const lowerMessage = message.toLowerCase()

    // Simple response generation based on keywords
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return `Hello! I'm ${model.name}, an AI assistant. How can I help you today?`
    }

    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
      return `I'm ${model.name}, an AI assistant developed by PSQRD. I'm designed to be helpful, harmless, and honest in my interactions. I can assist with a wide range of tasks including answering questions, providing information, and helping with various problems. How can I assist you today?`
    }

    if (lowerMessage.includes("how do you work")) {
      return `As an AI assistant, I work by processing your input using a large language model trained on a diverse dataset of text. I analyze patterns in your query and generate responses based on my training. Unlike traditional AI systems, I'm designed with PSQRD's hallucination-free technology that ensures factual accuracy and source transparency. This means my responses are grounded in verified information rather than fabricated content.`
    }

    if (lowerMessage.includes("black hole") || lowerMessage.includes("space")) {
      return `# Black Holes: Cosmic Phenomena

Black holes are regions of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it once it passes the event horizon.

## Types of Black Holes

There are several types of black holes:
- **Stellar black holes**: Formed by the gravitational collapse of massive stars
- **Intermediate black holes**: These are between stellar and supermassive black holes in size
- **Supermassive black holes**: Found at the center of most galaxies, including our Milky Way

## Recent Discoveries

In 2019, the Event Horizon Telescope collaboration released the first direct image of a black hole's event horizon, specifically the supermassive black hole at the center of galaxy M87.

\`\`\`python
# Simple calculation of the Schwarzschild radius
def schwarzschild_radius(mass):
    G = 6.67430e-11  # Gravitational constant
    c = 299792458    # Speed of light
    return (2 * G * mass) / (c ** 2)

# Mass of the Sun in kg
solar_mass = 1.989e30

# Calculate radius for a 10 solar mass black hole
radius = schwarzschild_radius(10 * solar_mass)
print(f"Event horizon radius: {radius/1000:.2f} km")
\`\`\`

Would you like to know more about any specific aspect of black holes?`
    }

    if (lowerMessage.includes("code") || lowerMessage.includes("programming")) {
      return `# Programming Concepts

Here's a simple example of a React component that demonstrates state management:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;
\`\`\`

This component uses React's useState hook to maintain a count state. The buttons allow users to increment or decrement the counter.

Would you like me to explain any specific programming concept or language?`
    }

    // Default response
    return `Thank you for your message. I'm here to help with any questions or tasks you might have. Feel free to ask about any topic, and I'll do my best to provide accurate and helpful information.

Is there something specific you'd like to know more about?`
  }

  return {
    user,
    chats,
    activeChatId,
    setActiveChatId,
    activeChat,
    messages,
    sendMessage,
    isLoading,
    isGenerating,
    createNewChat,
    regenerateResponse,
    models,
    selectedModel,
    changeModel,
  }
}
