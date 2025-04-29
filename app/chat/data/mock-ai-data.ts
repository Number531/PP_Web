import type { AIChat, AIMessage, AIModel, User } from "../types"

// Mock user
export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
}

// Mock AI models
export const mockModels: AIModel[] = [
  {
    id: "model-1",
    name: "PSQRD-4",
    description: "Our most advanced AI model with hallucination-free technology",
    maxTokens: 8192,
    temperature: 0.7,
  },
  {
    id: "model-2",
    name: "PSQRD-3.5",
    description: "Fast and efficient AI model for general-purpose tasks",
    maxTokens: 4096,
    temperature: 0.7,
  },
  {
    id: "model-3",
    name: "PSQRD-Code",
    description: "Specialized model for programming and technical tasks",
    maxTokens: 8192,
    temperature: 0.5,
  },
]

// Mock AI chats
export const mockAIChats: AIChat[] = [
  {
    id: "chat-1",
    title: "Understanding Black Holes",
    createdAt: "2023-04-20T10:30:00Z",
    updatedAt: "2023-04-20T11:15:00Z",
    modelId: "model-1",
  },
  {
    id: "chat-2",
    title: "React Component Design",
    createdAt: "2023-04-19T14:20:00Z",
    updatedAt: "2023-04-19T15:05:00Z",
    modelId: "model-1",
  },
  {
    id: "chat-3",
    title: "Planning Summer Vacation",
    createdAt: "2023-04-18T09:10:00Z",
    updatedAt: "2023-04-18T09:45:00Z",
    modelId: "model-2",
  },
]

// Mock AI messages
export const mockAIMessages: Record<string, AIMessage[]> = {
  "chat-1": [
    {
      id: "msg-1-1",
      chatId: "chat-1",
      role: "system",
      content: "Hello! I'm PSQRD-4, an AI assistant. How can I help you today?",
      timestamp: "2023-04-20T10:30:00Z"
    },
    {
      id: "msg-1-2",
      chatId: "chat-1",
      role: "user",
      content: "Can you explain what black holes are?",
      timestamp: "2023-04-20T10:32:00Z"
    },
    {
      id: "msg-1-3",
      chatId: "chat-1",
      role: "assistant",
      content: `# Black Holes: Cosmic Phenomena

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

Would you like to know more about any specific aspect of black holes?`,
      timestamp: "2023-04-20T10:35:00Z"
    },
    {
      id: "msg-1-4",
      chatId: "chat-1",
      role: "user",
      content: "How do black holes form?",
      timestamp: "2023-04-20T10:40:00Z"
    },
    {
      id: "msg-1-5",
      chatId: "chat-1",
      role: "assistant",
      content: `# Black Hole Formation

Black holes form through several different processes, depending on their size:

## Stellar Black Holes

The most common black holes form from the remnants of a large star that dies in a supernova explosion. When a star with more than about 20 solar masses exhausts its nuclear fuel, it can no longer produce the energy needed to counteract gravitational forces.

The process follows these steps:

1. The star's core collapses under gravity
2. The outer layers are expelled in a supernova explosion
3. If the core's mass exceeds about 3 solar masses, no known force can prevent it from collapsing into a black hole

## Supermassive Black Holes

These giants, found at the centers of galaxies, form through different mechanisms:

- **Direct collapse**: Massive gas clouds in the early universe collapsed directly into black holes`,\
