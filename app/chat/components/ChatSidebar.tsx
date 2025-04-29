"use client"

import { useState } from "react"
import { Search, X, Plus, Settings, LogOut } from "lucide-react"
import { useChatState } from "../hooks/useChatState"
import { useRouter } from "next/navigation"

type ChatSidebarProps = {
  onClose: () => void
}

export function ChatSidebar({ onClose }: ChatSidebarProps) {
  const { conversations, activeConversationId, setActiveConversationId, user } = useChatState()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle logout
  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem("chat_user_token")
    localStorage.removeItem("chat_user_data")
    // Redirect to home
    router.push("/")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Messages</h2>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="New conversation"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/50" />
          </div>
          <input
            type="text"
            placeholder="Search conversations"
            className="bg-white/5 border border-white/10 text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {filteredConversations.length > 0 ? (
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                  activeConversationId === conversation.id
                    ? "bg-purple-600/20 border border-purple-500/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
                onClick={() => setActiveConversationId(conversation.id)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
                      {conversation.name.charAt(0)}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <p className="text-white font-medium truncate">{conversation.name}</p>
                      <p className="text-xs text-white/50">{conversation.lastMessageTime}</p>
                    </div>
                    <p className="text-sm text-white/70 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50 p-4 text-center">
            <p>No conversations found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
              {user?.name.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-white/50">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
