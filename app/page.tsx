import type { Metadata } from "next"
import { generateEnhancedSEO } from "./components/SEOMetadata"
import { Suspense } from "react"
import { LoadingPlaceholder } from "./components/ui/LoadingPlaceholder"
import { ClientHomePage } from "./home/ClientHomePage"

// Generate enhanced metadata for the home page
export const metadata: Metadata = generateEnhancedSEO({
  title: "Enterprise AI Solutions",
  description: "Hallucination-free AI with guaranteed accuracy for enterprise applications. Transform your operations with source-transparent, reliable AI.",
  path: "/",
  keywords: [
    "enterprise AI", 
    "accurate AI", 
    "hallucination-free AI", 
    "AI solutions", 
    "transparent AI", 
    "reliable AI"
  ],
  publishedTime: "2023-01-01T00:00:00Z",
  modifiedTime: "2025-04-22T00:00:00Z",
  section: "Home",
  authors: ["PSQRD Team"]
})

export default function Page() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientHomePage />
    </Suspense>
  )
}
