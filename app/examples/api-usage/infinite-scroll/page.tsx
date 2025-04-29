"use client"

import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@/lib/api/hooks"

interface Post {
  id: number
  title: string
  body: string
}

export default function InfiniteScrollExample() {
  const loaderRef = useRef<HTMLDivElement>(null)

  const {
    data: posts,
    isLoading,
    error,
    hasMore,
    loadMore,
  } = useInfiniteQuery<Post>((page) => `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`, {
    initialPage: 1,
  })

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 1.0 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [hasMore, isLoading, loadMore])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Infinite Scroll Example</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error.message}
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2">{post.body}</p>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="py-4 text-center">
        {isLoading && <p>Loading more posts...</p>}
        {!hasMore && <p>No more posts to load</p>}
      </div>
    </div>
  )
}
