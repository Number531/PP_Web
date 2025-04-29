"use client"

import { useState } from "react"
import { AIChatSidebar } from "./AIChatSidebar"
import { AIChatWindow } from "./AIChatWindow"
import { useAIChatState } from "../hooks/useAIChatState"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"
import { AnimatePresence, motion } from "framer-motion"

export function AIChatLayout() {
  const { isLoading } = useAIChatState()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isLoading) {
    return <LoadingPlaceholder text="Loading AI assistant..." height="h-screen" />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar with animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "16rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full border-r border-zinc-800/50 bg-black z-20 overflow-hidden"
          >
            <AIChatSidebar onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat window */}
      <div className="flex-1 flex flex-col h-full">
        <AIChatWindow onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isMobileMenuOpen={isSidebarOpen} />
      </div>
    </div>
  )
}
