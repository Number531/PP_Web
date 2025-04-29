import type { Metadata } from "next"
import { generateMetadata } from "../seo/metadata-config"
import { ClientChatPage } from "./ClientChatPage"
import { Suspense } from "react"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"

// Generate metadata for the Chat page - mark as noIndex since it's a private area
export const metadata: Metadata = generateMetadata({
  title: "AI Chat Interface",
  description:
    "Interact with our hallucination-free AI assistant. Get accurate, source-verified responses to your questions.",
  path: "/chat",
  noIndex: true, // Don't index private/authenticated pages
})

export default function ChatPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder text="Loading..." height="h-screen" />}>
      <ClientChatPage />
    </Suspense>
  )
}
