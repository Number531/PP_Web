import type { Metadata } from "next"
import { generateEnhancedSEO } from "../components/SEOMetadata"

// Generate enhanced metadata for the blog page
export const metadata: Metadata = generateEnhancedSEO({
  title: "AI Hallucination Prevention Blog",
  description: "Insights on AI hallucination prevention, industry solutions, and best practices for enterprise AI with guaranteed accuracy.",
  path: "/blog",
  keywords: [
    "AI hallucinations", 
    "hallucination prevention", 
    "AI accuracy", 
    "enterprise AI solutions", 
    "AI best practices",
    "source-transparent AI"
  ],
  publishedTime: "2025-05-20T00:00:00Z",
  modifiedTime: "2025-05-20T00:00:00Z",
  section: "Blog",
  authors: ["PSQRD Team"]
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
