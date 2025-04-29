"use client"

import { PlusCircle, MessageSquare, Search, X } from "lucide-react"
import { useAIChatState } from "../hooks/useAIChatState"
import { useMobile } from "@/app/shared/hooks/use-mobile"

type AIChatSidebarProps = {
  onClose: () => void
}

export function AIChatSidebar({ onClose }: AIChatSidebarProps) {
  const { chats, activeChat, setActiveChat, createNewChat } = useAIChatState()
  const isMobile = useMobile()

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId)
    if (isMobile) {
      onClose()
    }
  }

  const handleNewChat = () => {
    createNewChat()
    if (isMobile) {
      onClose()
    }
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <h2 className="text-lg font-medium">Chats</h2>
        {isMobile && (
          <button onClick={onClose} className="p-1 rounded-md hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
        </div>
      </div>

      {/* New chat button */}
      <button
        onClick={handleNewChat}
        className="flex items-center gap-2 mx-3 px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        <span>New chat</span>
      </button>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${
              activeChat?.id === chat.id ? "bg-purple-600/20 text-purple-200" : "hover:bg-zinc-800 text-zinc-300"
            }`}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{chat.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
