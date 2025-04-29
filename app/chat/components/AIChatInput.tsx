"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Sparkles, RotateCcw, Settings, ChevronUp } from "lucide-react"

type AIChatInputProps = {
  onSendMessage: (text: string) => void
  isGenerating: boolean
  onRegenerate?: () => void
}

export function AIChatInput({ onSendMessage, isGenerating, onRegenerate }: AIChatInputProps) {
  const [message, setMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px"
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px"
    }
  }, [message])

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim() && !isGenerating) {
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
    <div className="p-3 md:p-4 border-t border-zinc-800/50 bg-black">
      <div className="max-w-3xl mx-auto">
        {onRegenerate && (
          <div className="flex justify-center mb-3">
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Regenerate response
            </button>
          </div>
        )}

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question..."
            disabled={isGenerating}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-4 pr-12 py-3 text-white resize-none max-h-[200px] focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 min-h-[56px]"
            rows={1}
          />

          {/* Model selector */}
          <div className="absolute bottom-0 left-0 flex items-center p-3 gap-3">
            <button className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
              <Settings className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="text-purple-400">AI Assistant</span>
              </button>

              {isExpanded && (
                <button className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-xs">
                  <span className="text-zinc-400">Advanced</span>
                </button>
              )}
            </div>
          </div>

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isGenerating}
            className="absolute right-3 bottom-3 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {isGenerating ? <Sparkles className="w-4 h-4 animate-pulse" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
        <div className="text-xs text-zinc-500 mt-2 text-center">
          AI assistant can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  )
}
