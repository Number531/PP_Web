'use client'

import { siteConfig } from "@/app/seo/metadata-config"
import Script from "next/script"

interface CompanyEntityProps {
  name?: string
  description?: string
  logo?: string
  foundingDate?: string
  founders?: Array<{
    name: string
    jobTitle: string
    image?: string
    sameAs?: string[]
  }>
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: Array<{
    telephone: string
    contactType: string
    email?: string
    areaServed?: string
    availableLanguage?: string[]
  }>
  sameAs?: string[]
  awards?: string[]
  knowsAbout?: string[]
}

/**
 * SEO Company Entity Component
 * 
 * Implements comprehensive Organization schema to establish your company
 * as a distinct entity in Google's Knowledge Graph
 */
export function SEOCompanyEntity({
  name = siteConfig.name,
  description = siteConfig.description,
  logo = `${siteConfig.url}/logo.png`,
  foundingDate = "2022-01-01", // Update with actual founding date when available
  founders = [
    {
      name: "Dr. Elena Chen",
      jobTitle: "Founder & CEO",
      sameAs: ["https://linkedin.com/in/elena-chen", "https://twitter.com/elenachen"]
    }
  ],
  address = {
    streetAddress: "123 AI Innovation Center",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94105",
    addressCountry: "US"
  },
  contactPoint = [
    {
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "info@psqrd.ai",
      areaServed: "Worldwide",
      availableLanguage: ["English"]
    }
  ],
  sameAs = [
    "https://twitter.com/psqrdai",
    "https://linkedin.com/company/psqrd-ai",
    "https://github.com/psqrd-ai"
  ],
  awards = [
    "Pioneer in AI Factual Verification",
    "Excellence in AI Hallucination Prevention"
  ],
  knowsAbout = [
    "AI Hallucination Prevention",
    "Factual Verification in AI",
    "Retrieval-Augmented Generation",
    "Knowledge Graph Validation",
    "Source Attribution for AI",
    "Trustworthy AI Systems",
    "AI for Legal Research",
    "AI for Media Fact-checking"
  ]
}: CompanyEntityProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name,
    description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: logo,
      width: 512,
      height: 512
    },
    foundingDate,
    founders: founders.map(founder => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.jobTitle,
      image: founder.image,
      sameAs: founder.sameAs
    })),
    address: {
      "@type": "PostalAddress",
      ...address
    },
    contactPoint: contactPoint.map(point => ({
      "@type": "ContactPoint",
      ...point
    })),
    sameAs,
    award: awards,
    knowsAbout
  }

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(organizationSchema)}
    </Script>
  )
}

export default SEOCompanyEntity
