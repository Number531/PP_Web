'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ChatMessage, Conversation, generateMockResponse } from '../data/mockMessages';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isTyping: boolean;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  deleteConversation: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Create a new conversation
  const createNewConversation = useCallback(() => {
    const newId = uuidv4();
    const newConversation: Conversation = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
  }, []);

  // Select an existing conversation
  const selectConversation = useCallback((id: string) => {
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  }, [conversations]);

  // Send a message in the current conversation
  const sendMessage = useCallback((content: string) => {
    if (!currentConversation) {
      createNewConversation();
    }

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Update the conversation with the user message
    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(conv => {
        if (conv.id === currentConversation?.id) {
          // Update conversation title based on first message if it's "New Conversation"
          const title = conv.title === 'New Conversation' && conv.messages.length === 0
            ? content.length > 30 ? `${content.substring(0, 30)}...` : content
            : conv.title;

          return {
            ...conv,
            title,
            messages: [...conv.messages, userMessage],
            updatedAt: new Date(),
          };
        }
        return conv;
      });
      return updatedConversations;
    });

    // Update current conversation
    setCurrentConversation(prev => {
      if (!prev) return null;
      
      const title = prev.title === 'New Conversation' && prev.messages.length === 0
        ? content.length > 30 ? `${content.substring(0, 30)}...` : content
        : prev.title;

      return {
        ...prev,
        title,
        messages: [...prev.messages, userMessage],
        updatedAt: new Date(),
      };
    });

    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: uuidv4(),
        content: generateMockResponse(content),
        role: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === currentConversation?.id) {
            return {
              ...conv,
              messages: [...conv.messages, aiResponse],
              updatedAt: new Date(),
            };
          }
          return conv;
        });
      });

      setCurrentConversation(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, aiResponse],
          updatedAt: new Date(),
        };
      });

      setIsTyping(false);
    }, 1500); // 1.5 second delay to simulate AI thinking
  }, [currentConversation, createNewConversation]);

  // Delete a conversation
  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    
    // If the deleted conversation was the current one, select the first available or set to null
    if (currentConversation?.id === id) {
      setCurrentConversation(conversations.length > 1 
        ? conversations.find(conv => conv.id !== id) || null 
        : null);
    }
  }, [conversations, currentConversation]);

  const value = {
    conversations,
    currentConversation,
    isTyping,
    createNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
