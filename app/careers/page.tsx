import type { Metadata } from "next"
import { generateMetadata } from "../seo/metadata-config"
import { Suspense } from "react"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { ClientCareersPage } from "./ClientCareersPage"

// Generate metadata for the Careers page
export const metadata: Metadata = generateMetadata({
  title: "Careers",
  description:
    "Join our team of researchers, engineers, and innovators building the future of trustworthy AI. Explore open positions and learn about our company culture.",
  path: "/careers",
  ogImage: "https://psqrd.ai/images/careers-og.jpg",
})

// Use the client component wrapper instead of dynamic import with ssr: false

export default function Page() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientCareersPage />
    </Suspense>
  )
}
