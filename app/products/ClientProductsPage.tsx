'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingPlaceholder } from '../components/ui/LoadingPlaceholder'
import { SEOProductSchema } from '../components/SEOProductSchema'
import { SEOBreadcrumbs } from '../components/SEOBreadcrumbs'
import { SEOFAQSchema } from '../components/SEOFAQSchema'

// Dynamically import the client component with no SSR
// This prevents hydration issues with the 3D components
const ProductsPage = dynamic(() => import("./ProductsPage"), {
  ssr: false,
  loading: () => <LoadingPlaceholder text="Loading experience..." height="h-screen" />,
})

// Product-specific FAQ data
const productFAQs = [
  {
    question: "What features does the PSQRD Enterprise AI Platform include?",
    answer: "Our platform includes natural language processing, document analysis, predictive analytics, custom model training, and seamless integration with existing enterprise systems. All features come with guaranteed accuracy through our source-transparent approach."
  },
  {
    question: "How does PSQRD ensure AI accuracy?",
    answer: "We use a proprietary source-verification system that validates all AI outputs against trusted knowledge bases. Every response includes citations to its sources, eliminating hallucinations and ensuring reliability for critical business decisions."
  },
  {
    question: "What industries can benefit from PSQRD's AI solutions?",
    answer: "Our solutions are designed for finance, healthcare, legal, manufacturing, and retail industries. Each implementation is customized to address industry-specific challenges and compliance requirements."
  },
  {
    question: "How does pricing work for the Enterprise AI Platform?",
    answer: "We offer tiered subscription plans based on usage volume and required features. Enterprise plans include dedicated support, custom model training, and integration services. Contact our sales team for a customized quote."
  }
]

export function ClientProductsPage() {
  return (
    <>
      {/* SEO-optimized breadcrumbs - invisible but present for search engines */}
      <SEOBreadcrumbs 
        visibleOnPage={false}
        customSegments={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' }
        ]}
      />
      
      {/* Enhanced product schema for rich results */}
      <SEOProductSchema 
        name="PSQRD Enterprise AI Platform"
        description="Hallucination-free AI with guaranteed accuracy for enterprise applications. Our platform ensures every response is traceable to verified sources."
        image="https://psqrd.ai/images/products/ai-platform.jpg"
        brand="PSQRD"
        category="Enterprise Software/Artificial Intelligence"
        releaseDate="2023-06-15"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 120,
          bestRating: 5,
          worstRating: 1
        }}
        offers={[
          {
            price: 2499,
            priceCurrency: "USD",
            priceValidUntil: "2025-12-31",
            availability: "InStock",
            seller: {
              name: "PSQRD AI",
              url: "https://psqrd.ai"
            }
          }
        ]}
        reviews={[
          {
            author: "Enterprise Customer",
            datePublished: "2024-03-15",
            reviewBody: "The accuracy guarantees have transformed how we use AI in our decision-making processes. No more hallucinations means we can trust the outputs.",
            reviewRating: {
              ratingValue: 5,
              bestRating: 5
            }
          },
          {
            author: "Financial Services Client",
            datePublished: "2024-02-22",
            reviewBody: "The source transparency feature is a game-changer for regulatory compliance. We can verify every AI response against trusted sources.",
            reviewRating: {
              ratingValue: 5,
              bestRating: 5
            }
          }
        ]}
      />
      
      <Suspense fallback={<LoadingPlaceholder text="Loading experience..." height="h-screen" />}>
        <ProductsPage />
      </Suspense>
      
      {/* Product FAQ schema for rich results */}
      <SEOFAQSchema 
        faqs={productFAQs}
        headline="Frequently Asked Questions About Our Enterprise AI Platform"
      />
    </>
  )
}
