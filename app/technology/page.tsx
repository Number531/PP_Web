import type { Metadata } from "next"
import { TechnologyHero } from "./components/TechnologyHero"
import { TechnologyApproach } from "./components/TechnologyApproach"
import { TechnologyInnovations } from "./components/TechnologyInnovations"
import { TechnologyArchitecture } from "./components/TechnologyArchitecture"
import { TechnologyCTA } from "./components/TechnologyCTA"

export const metadata: Metadata = {
  title: "Our Technology | PSQRD",
  description:
    "Discover the advanced technology behind PSQRD's platform for accurate, transparent, and reliable AI solutions.",
}

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <TechnologyHero />
      <TechnologyApproach />
      <TechnologyInnovations />
      <TechnologyArchitecture />
      <TechnologyCTA />
    </main>
  )
}
