'use client'

import { useProtectedRoute } from "@/app/hooks/useProtectedRoute"
import { ModernChatInterface } from "./components/ModernChatInterface"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"

export function ClientChatPage() {
  const { isLoading } = useProtectedRoute()

  if (isLoading) {
    return <LoadingPlaceholder text="Loading..." height="h-screen" />
  }

  return <ModernChatInterface />
}
