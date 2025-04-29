"use client"

import { useState } from "react"
import { Check, CheckCheck, Clock } from "lucide-react"
import type { Message } from "../types"
import { useChatState } from "../hooks/useChatState"

type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { user } = useChatState()
  const [showTime, setShowTime] = useState(false)

  const isOwnMessage = message.senderId === user?.id

  // Format timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  // Determine status icon
  const getStatusIcon = () => {
    if (message.status === "sending") return <Clock className="w-3 h-3 text-white/50" />
    if (message.status === "sent") return <Check className="w-3 h-3 text-white/50" />
    if (message.status === "delivered") return <CheckCheck className="w-3 h-3 text-white/50" />
    if (message.status === "read") return <CheckCheck className="w-3 h-3 text-purple-400" />
    return null
  }

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} animate-fadeIn`}
      onClick={() => setShowTime(!showTime)}
    >
      <div className={`max-w-[75%] ${isOwnMessage ? "order-2" : "order-1"}`}>
        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isOwnMessage
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-tr-none"
              : "bg-white/10 backdrop-blur-sm text-white rounded-tl-none"
          }`}
        >
          {message.text}
        </div>

        {/* Time and status */}
        <div className={`flex items-center text-xs mt-1 space-x-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
          {showTime && <span className="text-white/50">{formattedTime}</span>}
          {isOwnMessage && getStatusIcon()}
        </div>
      </div>
    </div>
  )
}
