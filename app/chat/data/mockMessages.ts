// Define chat message types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Generate a mock conversation
export const generateMockConversation = (id: string, title: string): Conversation => {
  return {
    id,
    title,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Sample responses for the mock AI
export const mockResponses = [
  "I've analyzed the data and found several interesting patterns that might be relevant to your question.",
  "Based on the latest research in this field, there are multiple perspectives to consider.",
  "That's an interesting question. Let me break this down into manageable parts for you.",
  "According to verified sources, the information you're looking for suggests several key insights.",
  "I can help with that. Here's what the current understanding of this topic reveals.",
  "Looking at this from multiple angles, I can provide you with a comprehensive overview.",
  "This is a complex topic with several important considerations. Let me explain.",
  "I've gathered information from reliable sources to address your question accurately.",
  "There are several approaches to this problem. Let me walk you through the most effective ones.",
  "Based on my analysis, I can offer you both theoretical and practical insights on this matter."
];

// Generate a mock AI response
export const generateMockResponse = (userMessage: string): string => {
  // For a more realistic experience, we could implement logic to make responses
  // somewhat relevant to the user's message, but for now we'll just select random responses
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[randomIndex];
};
