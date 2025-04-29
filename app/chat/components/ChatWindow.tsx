"use client"

import { useRef, useEffect } from "react"
import { Menu } from "lucide-react"
import { useChatState } from "../hooks/useChatState"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"

type ChatWindowProps = {
  onMenuToggle: () => void
  isSidebarOpen: boolean
}

export function ChatWindow({ onMenuToggle, isSidebarOpen }: ChatWindowProps) {
  const { activeConversation, messages, sendMessage, isTyping } = useChatState()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors mr-3"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="w-5 h-5" />
          </button>
          {activeConversation ? (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
                {activeConversation.name.charAt(0)}
              </div>
              <div className="ml-3">
                <h2 className="text-white font-medium">{activeConversation.name}</h2>
                <p className="text-xs text-white/50">{activeConversation.online ? "Online" : "Last seen recently"}</p>
              </div>
            </div>
          ) : (
            <h2 className="text-white font-medium">Select a conversation</h2>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {activeConversation ? (
          messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-white/50 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    {activeConversation.name.charAt(0)}
                  </div>
                  <div className="bg-white/10 rounded-2xl px-4 py-2 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/50 p-4 text-center">
              <p>No messages yet</p>
              <p className="text-sm mt-1">Send a message to start the conversation</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50 p-4 text-center">
            <p>Select a conversation to start chatting</p>
            <p className="text-sm mt-1">Or create a new conversation</p>
          </div>
        )}
      </div>

      {/* Input area */}
      {activeConversation && (
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
          <ChatInput onSend={sendMessage} />
        </div>
      )}
    </div>
  )
}
