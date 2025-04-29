"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingPlaceholder } from "../components/ui/LoadingPlaceholder"
import { AboutHero } from "./components/AboutHero"
import { MissionSection } from "./components/MissionSection"
import { TeamSection } from "./components/TeamSection"
import { AchievementsSection } from "./components/AchievementsSection"
import { TechnologySection } from "./components/TechnologySection"
import { ValuesSection } from "./components/ValuesSection"
import { AboutCTA } from "./components/AboutCTA"

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

export default function AboutPage() {
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
        <AboutHero />
        <MissionSection />
        <TeamSection />
        <AchievementsSection />
        <TechnologySection />
        <ValuesSection />
        <AboutCTA />
      </main>
    </div>
  )
}
