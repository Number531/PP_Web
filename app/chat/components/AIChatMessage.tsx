"use client"

import { useState } from "react"
import { Copy, Check, User } from "lucide-react"
import type { AIMessage } from "../types"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"

type AIChatMessageProps = {
  message: AIMessage
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const [copied, setCopied] = useState(false)

  // Copy message content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Determine if message is from AI or user
  const isAI = message.role === "assistant"
  const isSystem = message.role === "system"

  // Render system message
  if (isSystem) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-zinc-800/50 text-zinc-400 px-4 py-2 rounded-lg text-sm max-w-[80%]">{message.content}</div>
      </div>
    )
  }

  return (
    <div className={`flex items-start ${isAI ? "ai-message" : "user-message"}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3 flex-shrink-0 ${
          isAI ? "bg-gradient-to-br from-purple-400 to-purple-600" : "bg-zinc-700"
        }`}
      >
        {isAI ? "AI" : <User className="w-4 h-4" />}
      </div>

      {/* Message content */}
      <div className={`flex-1 overflow-hidden ${isAI ? "prose prose-invert max-w-none" : ""}`}>
        {isAI ? (
          <div className="relative group">
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-700/50 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Copy message"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">{message.content}</div>
        )}
      </div>
    </div>
  )
}
