"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Smile, Paperclip, Mic, Send } from "lucide-react"

type ChatInputProps = {
  onSendMessage: (text: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px"
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + "px"
    }
  }, [message])

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="flex items-end space-x-2 max-w-3xl mx-auto">
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white resize-none max-h-32 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            rows={1}
          />
        </div>

        {message.trim() ? (
          <button
            onClick={handleSendMessage}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-md"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="p-3 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Voice message"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
