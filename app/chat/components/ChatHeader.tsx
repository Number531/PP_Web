"use client"

import { Menu, ChevronLeft, Phone, Video, Info } from "lucide-react"
import type { Conversation } from "../types"

type ChatHeaderProps = {
  conversation: Conversation
  onMenuToggle: () => void
  isSidebarOpen: boolean
}

export function ChatHeader({ conversation, onMenuToggle, isSidebarOpen }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="mr-3 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          onClick={onMenuToggle}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
              {conversation.name.charAt(0)}
            </div>
            {conversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-white font-medium">{conversation.name}</p>
            <p className="text-xs text-white/50">{conversation.online ? "Online" : "Last seen recently"}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Voice call"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Video call"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Conversation info"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
