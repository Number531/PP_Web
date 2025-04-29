import type { Metadata } from "next"
import { generateEnhancedSEO } from "../components/SEOMetadata"
import { Suspense } from "react"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { ClientContactPage } from "./ClientContactPage"

// Generate enhanced metadata for the Contact page
export const metadata: Metadata = generateEnhancedSEO({
  title: "Contact Us",
  description: "Get in touch with our team to learn more about our AI solutions or to request a demo.",
  path: "/contact",
  ogImage: "https://psqrd.ai/images/contact-og.jpg",
  keywords: ["AI contact", "AI demo", "enterprise AI solutions", "AI consultation"],
  publishedTime: "2023-01-20T00:00:00Z",
  modifiedTime: "2025-04-22T00:00:00Z",
  section: "Contact",
  authors: ["PSQRD Team"]
})

// Use the client component wrapper instead of dynamic import with ssr: false

export default function Page() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientContactPage />
    </Suspense>
  )
}
