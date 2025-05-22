"use client"

import { Twitter, Linkedin, Facebook, Link as LinkIcon, Copy } from "lucide-react"
import { useState } from "react"

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  // Base URL for the blog
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}/blog` 
    : 'https://example.com/blog'
  
  const url = `${baseUrl}/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  
  return (
    <div className="flex flex-col items-start space-y-4 mt-10 pt-6 border-t border-purple-500/20">
      <h3 className="text-lg font-medium text-white/90">Share this article</h3>
      <div className="flex space-x-3">
        <a 
          href={shareLinks.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={20} />
        </a>
        <a 
          href={shareLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors relative"
          aria-label="Copy link"
        >
          {copied ? <Copy size={20} /> : <LinkIcon size={20} />}
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
