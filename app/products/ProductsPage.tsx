"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { PlatformHero } from "./components/PlatformHero"
import { PlatformChallenge } from "./components/PlatformChallenge"
import { PlatformSolution } from "./components/PlatformSolution"
import { PlatformHowItWorks } from "./components/PlatformHowItWorks"
import { PlatformFeatures } from "./components/PlatformFeatures"
import { PlatformAccuracyGuarantee } from "./components/PlatformAccuracyGuarantee"
import { PlatformUseCases } from "./components/PlatformUseCases"
import { PlatformSecurity } from "./components/PlatformSecurity"
import { PlatformCTA } from "./components/PlatformCTA"

// Dynamically import components that aren't needed immediately
const ParticleBackground = dynamic(
  () => import("../components/ParticleBackground").then((mod) => ({ default: mod.ParticleBackground })),
  {
    loading: () => <div className="fixed inset-0 bg-black" />,
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

export default function ProductsPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Fixed background with particle animation */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
          <ParticleBackground />
        </Suspense>
      </div>

      {/* Header (always visible) */}
      <CompanyHeader />

      {/* Main content */}
      <main className="relative z-10 pt-20">
        <PlatformHero />
        <PlatformChallenge />
        <PlatformSolution />
        <PlatformHowItWorks />
        <PlatformFeatures />
        <PlatformAccuracyGuarantee />
        <PlatformUseCases />
        <PlatformSecurity />
        <PlatformCTA />
      </main>
    </div>
  )
}
