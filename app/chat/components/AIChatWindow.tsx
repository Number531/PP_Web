"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, Plus, Clock, Calendar, Info, Moon } from "lucide-react"
import { format } from "date-fns"
import { AIChatMessage } from "./AIChatMessage"
import { AIChatInput } from "./AIChatInput"
import { useAIChatState } from "../hooks/useAIChatState"
import { AnimatePresence, motion } from "framer-motion"

type AIChatWindowProps = {
  onMenuToggle: () => void
  isMobileMenuOpen: boolean
}

export function AIChatWindow({ onMenuToggle, isMobileMenuOpen }: AIChatWindowProps) {
  const { activeChat, messages, sendMessage, isGenerating } = useAIChatState()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentDate = new Date()
  const [hasMessages, setHasMessages] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // Check if there are any messages
    setHasMessages(messages.length > 0)
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-medium">{activeChat?.title || "New Chat"}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <Info className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence>
          {!hasMessages ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-center">What do you want to explore?</h2>

              {/* Time and date indicators */}
              <div className="flex justify-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{format(currentDate, "h:mm a")}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{format(currentDate, "EEE, MMM d")}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AIChatMessage message={message} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <AIChatInput onSendMessage={sendMessage} isGenerating={isGenerating} onRegenerate={() => {}} />
    </div>
  )
}
