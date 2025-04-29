"use client"

import { useState, useEffect } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatWindow } from "./ChatWindow"
import { useChatState } from "../hooks/useChatState"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"

export function ChatLayout() {
  const { activeConversation, isLoading } = useChatState()
  // Set sidebar closed by default on all devices
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when a conversation is selected on mobile
  useEffect(() => {
    if (activeConversation && isSidebarOpen) {
      setSidebarOpen(false)
    }
  }, [activeConversation, isSidebarOpen])

  if (isLoading) {
    return <LoadingPlaceholder text="Loading chat..." height="h-screen" />
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Sidebar with animation */}
      <div
        className={`${
          isSidebarOpen ? "w-80 opacity-100" : "w-0 opacity-0"
        } transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 border-r border-white/10 relative z-20`}
      >
        <div className="w-80">
          <ChatSidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col relative">
        <ChatWindow onMenuToggle={() => setSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  )
}
