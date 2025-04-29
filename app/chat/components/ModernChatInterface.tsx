"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Plus,
  Clock,
  Calendar,
  ChevronUp,
  Settings,
  ChevronDown,
  Youtube,
  Globe,
  FileText,
  MessageSquare,
  BarChart,
  X,
  Search,
  LogOut,
  Menu,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"
import { useMobile } from "@/app/shared/hooks/use-mobile"
import { AnimatePresence, motion } from "framer-motion"
import { useAuth } from "@/app/context/auth-context"
import { useChatState } from "../hooks/useChatState"
import { ChatMessage } from "./ChatMessage"

export function ModernChatInterface() {
  const [message, setMessage] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState({
    name: "AI Assistant",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
  })
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [currentDate, setCurrentDate] = useState(new Date())
  const { logout } = useAuth()
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    messages, 
    sendMessage,
    createNewConversation,
    isTyping,
    isLoading 
  } = useChatState()

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    // Clean up the interval on component unmount
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Close sidebar with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSidebarOpen) {
        console.log("ESC key pressed, closing sidebar")
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [isSidebarOpen])

  const analysisOptions = [
    { name: "AI Assistant", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { name: "YouTube Analysis", icon: <Youtube className="w-3.5 h-3.5" /> },
    { name: "Web Page Analysis", icon: <Globe className="w-3.5 h-3.5" /> },
    { name: "Claim Verification", icon: <FileText className="w-3.5 h-3.5" /> },
    { name: "Data Analysis", icon: <BarChart className="w-3.5 h-3.5" /> },
  ]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px"
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px"
    }
  }, [message])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleOptionSelect = (option: (typeof analysisOptions)[0]) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }
  
  // Handle Enter key in textarea to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (message.trim()) {
        sendMessage(message.trim())
        setMessage('')
      }
    }
  }

  const openSidebar = useCallback(() => {
    console.log("Opening sidebar")
    setIsSidebarOpen(true)
  }, [])

  const closeSidebar = useCallback(() => {
    console.log("Closing sidebar")
    setIsSidebarOpen(false)
  }, [setIsSidebarOpen])

  const handleLogout = useCallback(() => {
    console.log("Logout called")
    logout()
  }, [logout])

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden fixed inset-0">
      {/* Sidebar for previous conversations */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeSidebar} />

          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h2 className="text-lg font-medium">Previous Conversations</h2>

              {/* Close button - completely simplified */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeSidebar();
                }}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                aria-label="Close sidebar"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 border-b border-zinc-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full bg-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="p-4">
              <button
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 px-4 transition-colors"
                type="button"
                onClick={() => {
                  createNewConversation();
                  closeSidebar();
                }}
              >
                <Plus size={16} />
                <span>New conversation</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="flex flex-col items-center space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                    <p className="text-sm text-white/70">Loading conversations...</p>
                  </div>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`w-full text-left p-3 rounded-md hover:bg-zinc-800 transition-colors ${activeConversationId === conversation.id ? 'bg-zinc-800' : ''}`}
                      type="button"
                      onClick={() => {
                        setActiveConversationId(conversation.id);
                        closeSidebar();
                      }}
                    >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-white/70 flex-shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <p className="text-white font-medium truncate">{conversation.name}</p>
                          {conversation.unreadCount > 0 && (
                            <span className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/50 truncate">{conversation.lastMessageTime}</p>
                      </div>
                    </div>
                  </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex flex-col w-full h-full relative">
        {/* Header */}
        <div className="flex items-center p-4 relative z-[60]">
          <div className="absolute left-4">
            {!isSidebarOpen && (
              <button
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                onClick={openSidebar}
                aria-label="Open sidebar"
                type="button"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="ml-auto">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-xs"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-purple-400">Logout</span>
            </button>
          </div>
        </div>

        {/* Main content area - fixed layout with only chat messages scrollable */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                <p className="text-white/70">Loading conversations...</p>
              </div>
            </div>
          ) : activeConversationId && messages.length > 0 ? (
            <div className="absolute inset-x-4 top-16 bottom-16 overflow-y-auto space-y-4 pr-2 pt-2" id="chat-messages">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="max-w-[75%] order-1">
                    <div className="rounded-2xl px-4 py-3 shadow-sm bg-white/10 backdrop-blur-sm text-white rounded-tl-none">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                        <span>AI is typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-2xl md:text-3xl font-light mb-8 text-center">What do you want to explore?</h1>
            </div>
          )}

          {/* Chat input - fixed at bottom */}
          <div className="w-full max-w-2xl mx-auto absolute bottom-4 left-0 right-0">
            <div className="flex flex-col gap-2">
              {/* Text input area */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 min-h-[56px]"
                  rows={1}
                />

                {/* Send button */}
                <button
                  className="absolute right-3 bottom-3 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  aria-label="Send message"
                  type="button"
                  onClick={() => {
                    if (message.trim()) {
                      sendMessage(message.trim());
                      setMessage('');
                    }
                  }}
                  disabled={!message.trim()}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>

              {/* Model selector - now with dropdown */}
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  type="button"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-xs"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                  >
                    <div className="flex items-center gap-1.5">
                      {selectedOption.icon}
                      <span className="text-purple-400">{selectedOption.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{ maxHeight: '50vh', overflowY: 'auto' }}
                        className="absolute left-0 bottom-full mb-1 sm:bottom-auto sm:top-full sm:mt-1 w-56 rounded-md bg-zinc-800 border border-zinc-700 shadow-lg z-50"
                      >
                        <div className="py-1">
                          {analysisOptions.map((option) => (
                            <button
                              key={option.name}
                              className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs hover:bg-zinc-700 transition-colors"
                              onClick={() => handleOptionSelect(option)}
                              type="button"
                            >
                              <div className="flex-shrink-0 text-purple-400">{option.icon}</div>
                              <span className={selectedOption.name === option.name ? "text-purple-400" : "text-white"}>
                                {option.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-3 pb-8">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{format(currentDate, "h:mm:ss a")}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{format(currentDate, "EEE, MMM d")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
