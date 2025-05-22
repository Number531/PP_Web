"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, User } from "lucide-react"
import { BlogPost } from "@/app/blog/data/blog-posts"
import { ReadingProgressBar } from "./ReadingProgressBar"
import { ShareButtons } from "./ShareButtons"
import { ReadingTimeIndicator } from "./ReadingTimeIndicator"

interface BlogPostModalProps {
  post: BlogPost
  onClose: () => void
}

export function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-black/50 backdrop-blur-sm rounded-lg border border-purple-500/20 w-full max-w-5xl max-h-[90vh] overflow-y-auto blog-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <ReadingProgressBar />
        <div className="sticky top-1 z-10 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-purple-500/20">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close blog post"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span 
                key={category} 
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm text-white/70 mb-8">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-purple-400" />
              <span>{post.author}</span>
            </div>
            <ReadingTimeIndicator minutes={post.readTime} />
          </div>
          
          <div 
            className="prose prose-invert prose-purple max-w-none"
          >
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              className="space-y-8 
                [&>p]:text-white [&>p]:leading-loose [&>p]:text-lg [&>p]:my-6 [&>p]:tracking-wide [&>p]:max-w-3xl
                [&>h2]:text-purple-200 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-purple-500/30
                [&>h3]:text-purple-100 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-4
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-white/95
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol>li]:text-white/95
                [&>blockquote]:border-l-4 [&>blockquote]:border-purple-400 [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:my-6 [&>blockquote]:bg-purple-500/10 [&>blockquote]:rounded-r-md [&>blockquote]:italic
                [&>a]:text-purple-300 [&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-purple-200
                [&>code]:bg-purple-900/30 [&>code]:text-purple-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-sm
                [&>pre]:bg-black/60 [&>pre]:p-4 [&>pre]:rounded-md [&>pre]:overflow-x-auto
              "
            />
            
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
