import type { Metadata } from "next"
import { generateEnhancedSEO } from "../components/SEOMetadata"
import { Suspense } from "react"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { ClientProductsPage } from "./ClientProductsPage"

// Generate enhanced metadata for the Products page
export const metadata: Metadata = generateEnhancedSEO({
  title: "Our Platform",
  description:
    "Explore our AI platform and solutions designed to transform your business with trustworthy artificial intelligence.",
  path: "/products",
  ogImage: "https://psqrd.ai/images/products-og.jpg",
  keywords: ["AI platform", "enterprise AI", "AI solutions", "trustworthy AI", "business AI", "AI transformation"],
  publishedTime: "2023-01-10T00:00:00Z",
  modifiedTime: "2025-04-22T00:00:00Z",
  section: "Products",
  authors: ["PSQRD Product Team"]
})

// Use the client component wrapper instead of dynamic import with ssr: false

export default function Page() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientProductsPage />
    </Suspense>
  )
}
