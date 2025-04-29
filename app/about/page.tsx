import type { Metadata } from "next"
import { generateEnhancedSEO } from "../components/SEOMetadata"
import { Suspense } from "react"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { ClientAboutPage } from "./ClientAboutPage"

// Generate enhanced metadata for the About page
export const metadata: Metadata = generateEnhancedSEO({
  title: "About Us",
  description: "Learn about our mission, values, and the team behind our innovative AI solutions.",
  path: "/about",
  ogImage: "https://psqrd.ai/images/about-og.jpg",
  keywords: ["AI mission", "AI values", "AI team", "PSQRD team", "AI innovation", "AI solutions"],
  publishedTime: "2023-01-15T00:00:00Z",
  modifiedTime: "2025-04-22T00:00:00Z",
  section: "Company",
  authors: ["PSQRD Team"]
})

// Use the client component wrapper instead of dynamic import with ssr: false

export default function Page() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientAboutPage />
    </Suspense>
  )
}
