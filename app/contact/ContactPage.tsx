"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { ContactHero } from "./components/ContactHero"
import { ContactForm } from "./components/ContactForm"
import { ContactLocations } from "./components/ContactLocations"
import { ContactFAQ } from "./components/ContactFAQ"
import { ContactCTA } from "./components/ContactCTA"

// Dynamically import components that aren't needed immediately
const ParticleBackground = dynamic(
  () => import("../components/ParticleBackground").then((mod) => ({ default: mod.ParticleBackground })),
  {
    loading: () => <LoadingPlaceholder text="Loading visualization..." height="h-screen" />,
    ssr: false, // Disable SSR for Three.js components
  },
)

// Lazy load components that are not immediately visible
const CompanyHeader = dynamic(
  () => import("../components/CompanyHeader").then((mod) => ({ default: mod.CompanyHeader })),
  {
    loading: () => <div className="h-16" />, // Reserve space for header
  },
)

export default function ContactPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Fixed background with particle animation */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Suspense fallback={<LoadingPlaceholder text="Loading background..." height="h-screen" />}>
          <ParticleBackground />
        </Suspense>
      </div>

      {/* Header (always visible) */}
      <CompanyHeader />

      {/* Main content - with max height constraint to prevent excessive scrolling */}
      <main className="relative z-10 pt-20">
        <ContactHero />
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <ContactForm />
            <ContactLocations />
          </div>
        </section>
        <ContactFAQ />
        <ContactCTA />
      </main>
    </div>
  )
}
