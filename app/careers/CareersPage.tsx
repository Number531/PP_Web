"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { CareerHero } from "./components/CareerHero"
import { JobListings } from "./components/JobListings"
import { CompanyValues } from "./components/CompanyValues"
import { TeamCulture } from "./components/TeamCulture"
import { BenefitsSection } from "./components/BenefitsSection"
import { CareerFAQ } from "./components/CareerFAQ"
import { ApplicationProcess } from "./components/ApplicationProcess"
import { jobListings } from "./data/job-listings"

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

export default function CareersPage() {
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

      {/* Main content */}
      <main className="relative z-10 pt-20">
        <CareerHero />
        <CompanyValues />
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Open Positions</h2>
          <JobListings jobs={jobListings} />
        </section>
        <TeamCulture />
        <BenefitsSection />
        <ApplicationProcess />
        <CareerFAQ />
      </main>
    </div>
  )
}
