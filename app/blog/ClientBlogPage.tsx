"use client"

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { BlogCard } from "@/app/blog/components/BlogCard"
import { BlogHeader } from "@/app/blog/components/BlogHeader"
import { BlogPostModal } from "@/app/blog/components/BlogPostModal"
import { blogPosts } from "@/app/blog/data/blog-posts"
import { BlogPost } from "@/app/blog/data/blog-posts-types"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"

// Dynamically import components that aren't needed immediately
const ParticleBackground = dynamic(
  () => import("@/app/components/ParticleBackground").then((mod) => ({ default: mod.ParticleBackground })),
  {
    loading: () => <LoadingPlaceholder text="Loading visualization..." height="h-screen" />,
    ssr: false, // Disable SSR for Three.js components
  },
)

export function ClientBlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Fixed background with particle animation */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Suspense fallback={<LoadingPlaceholder text="Loading background..." height="h-screen" />}>
          <ParticleBackground />
        </Suspense>
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <div className="pt-32 pb-16 px-4 md:px-8">
          <BlogHeader 
            title="PSQRD AI Blog" 
            subtitle="Insights on AI Hallucination Prevention, Industry Solutions, and Best Practices" 
          />
          
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard 
                  key={post.slug} 
                  post={post} 
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Blog post modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogPostModal 
            post={selectedPost} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}
