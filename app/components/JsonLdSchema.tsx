"use client"

import { siteConfig } from "../seo/metadata-config"
import { usePathname } from "next/navigation"

// Organization schema for the company
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.png`,
          sameAs: [
            "https://twitter.com/psqrd_ai",
            "https://linkedin.com/company/psqrd-ai",
            "https://github.com/psqrd-ai",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-800-555-0123",
            contactType: "customer service",
            email: "contact@psqrd.ai",
            availableLanguage: ["English"],
          },
        }),
      }}
    />
  )
}

// Website schema for the website
export function WebsiteSchema() {
  const pathname = usePathname()
  const currentUrl = `${siteConfig.url}${pathname}`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  )
}

// Product schema for product pages
export function ProductSchema({ product }: { product: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image || `${siteConfig.url}/product-placeholder.jpg`,
          offers: {
            "@type": "Offer",
            price: "Custom",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}/products/${product.id}`,
          },
        }),
      }}
    />
  )
}

// FAQ schema for FAQ sections
export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        }),
      }}
    />
  )
}

// Job posting schema for career pages
export function JobPostingSchema({ job }: { job: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          datePosted: new Date().toISOString(),
          validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          employmentType: job.type,
          hiringOrganization: {
            "@type": "Organization",
            name: siteConfig.name,
            sameAs: siteConfig.url,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location.split(",")[0],
              addressRegion: job.location.includes(",") ? job.location.split(",")[1].trim() : "",
              addressCountry: "US",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              value: job.salary,
              unitText: "YEAR",
            },
          },
        }),
      }}
    />
  )
}
