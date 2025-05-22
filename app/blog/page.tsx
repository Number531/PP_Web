import { Suspense } from "react"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"
import { ClientBlogPage } from "@/app/blog/ClientBlogPage"

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientBlogPage />
    </Suspense>
  )
}
