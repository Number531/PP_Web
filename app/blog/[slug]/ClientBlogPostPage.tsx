"use client"

import { useParams } from "next/navigation"
import { ArrowLeft, Clock, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { blogPosts, BlogPost } from "@/app/blog/data/blog-posts"

export function ClientBlogPostPage() {
  const params = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  
  useEffect(() => {
    if (params.slug) {
      const foundPost = blogPosts.find(post => post.slug === params.slug)
      setPost(foundPost || null)
    }
  }, [params.slug])

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-purple-400 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blog</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6">
      <Link href="/blog" className="text-purple-400 flex items-center gap-2 mb-8 hover:underline font-medium">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to blog</span>
      </Link>
      
      <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/10 shadow-xl">
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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
        
        <div className="flex flex-wrap gap-6 text-sm text-white/70 mb-8">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-purple-400" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <div className="prose prose-invert prose-purple max-w-none prose-headings:text-purple-300 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-p:text-white/90 prose-p:leading-relaxed prose-p:my-6 prose-p:text-lg prose-h2:text-2xl prose-h3:text-xl">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="space-y-6 [&>p]:text-white/90 [&>p]:leading-relaxed [&>p]:text-lg [&>h2]:text-purple-300 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-purple-200 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3"
          />
        </div>
      </div>
    </div>
  )
}
