"use client"

import { Clock, User } from "lucide-react"
import { BlogPost } from "@/app/blog/data/blog-posts"

interface BlogCardProps {
  post: BlogPost
  onClick: () => void
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <div 
      onClick={onClick}
      className="block bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category: string) => (
              <span 
                key={category} 
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          
          <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-purple-400" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <p className="text-white/70 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </div>
      </div>
    </div>
  )
}
