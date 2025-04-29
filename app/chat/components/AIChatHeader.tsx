"use client"

import { Menu, ChevronLeft, Share, MoreHorizontal } from "lucide-react"
import type { AIChat } from "../types"
import { useAIChatState } from "../hooks/useAIChatState"

type AIChatHeaderProps = {
  chat: AIChat
  onMenuToggle: () => void
  isSidebarOpen: boolean
}

export function AIChatHeader({ chat, onMenuToggle, isSidebarOpen }: AIChatHeaderProps) {
  const { models } = useAIChatState()
  const model = models.find((m) => m.id === chat.modelId)

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

        <div>
          <p className="text-white font-medium">{chat.title}</p>
          <p className="text-xs text-white/50">{model?.name || "AI Assistant"}</p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Share chat"
        >
          <Share className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
