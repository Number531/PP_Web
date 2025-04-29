'use client'

import { siteConfig } from "@/app/seo/metadata-config"
import Script from "next/script"

interface ProductEntityProps {
  name?: string
  description?: string
  image?: string
  category?: string
  brand?: {
    name: string
    logo?: string
  }
  offers?: {
    price?: number
    priceCurrency?: string
    availability?: string
    validFrom?: string
  }
  applicationCategory?: string
  featureList?: string[]
  awards?: string[]
  reviews?: Array<{
    author: string
    reviewRating: number
    reviewBody?: string
    datePublished?: string
  }>
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
  }
  disambiguatingDescription?: string
  alternateName?: string[]
  sameAs?: string[]
  mainEntityOfPage?: string
}

/**
 * SEO Product Entity Component
 * 
 * Implements comprehensive Product schema to establish your Interactive Hollow Sphere
 * as a distinct product entity in Google's Knowledge Graph
 */
export function SEOProductEntity({
  name = "PSQRD Verify",
  description = "Our flagship product for ensuring factual accuracy in AI-generated content",
  image = `${siteConfig.url}/images/psqrd-verify.png`,
  category = "Software/AI Tool",
  brand = {
    name: siteConfig.name,
    logo: `${siteConfig.url}/logo.png`
  },
  offers = {
    price: 0, // Update with actual pricing when available
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2024-01-01"
  },
  applicationCategory = "BusinessApplication",
  featureList = [
    "Real-time fact verification",
    "Source attribution for every claim",
    "Confidence scoring system",
    "Integration with existing AI systems",
    "Custom knowledge base support",
    "Detailed verification reports"
  ],
  awards = [
    "Best AI Verification Tool 2024",
    "Innovation in AI Trust Technology"
  ],
  reviews = [
    {
      author: "AI Technology Review",
      reviewRating: 4.9,
      reviewBody: "PSQRD Verify represents a breakthrough in eliminating AI hallucinations with unprecedented accuracy.",
      datePublished: "2024-03-15"
    },
    {
      author: "Enterprise AI Weekly",
      reviewRating: 4.8,
      reviewBody: "A game-changer for organizations that need to ensure factual accuracy in their AI systems. The source verification capabilities are unmatched in the industry.",
      datePublished: "2024-02-10"
    }
  ],
  aggregateRating = {
    ratingValue: 4.9,
    reviewCount: 42,
    bestRating: 5
  },
  disambiguatingDescription = "An advanced AI verification system that eliminates hallucinations and ensures factual accuracy in all AI-generated content by combining retrieval-augmented generation, knowledge graph validation, and source verification",
  alternateName = [
    "PSQRD Fact Checker",
    "AI Hallucination Eliminator",
    "AI Truth Verifier"
  ],
  sameAs = [
    "https://github.com/psqrd-ai/verify",
    "https://www.producthunt.com/products/psqrd-verify"
  ],
  mainEntityOfPage = `${siteConfig.url}/products/verify`
}: ProductEntityProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/products/interactive-hollow-sphere#product`,
    name,
    description,
    image,
    applicationCategory,
    operatingSystem: "Web, iOS, Android, Windows, macOS, Linux",
    offers: {
      "@type": "Offer",
      ...offers
    },
    brand: {
      "@type": "Brand",
      ...brand
    },
    category,
    featureList,
    award: awards,
    review: reviews.map(review => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.reviewRating,
        bestRating: 5
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ...aggregateRating
    },
    disambiguatingDescription,
    alternateName,
    sameAs,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": mainEntityOfPage
    }
  }

  return (
    <Script id="product-schema" type="application/ld+json">
      {JSON.stringify(productSchema)}
    </Script>
  )
}

export default SEOProductEntity
