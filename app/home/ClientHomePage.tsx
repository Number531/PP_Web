'use client'

import { Suspense } from 'react'
import HomePage from './HomePage'
import { LoadingPlaceholder } from '../components/ui/LoadingPlaceholder'
import { SEOFAQSchema } from '../components/SEOFAQSchema'
import { SEOBreadcrumbs } from '../components/SEOBreadcrumbs'

// FAQ data for the home page
const homeFAQs = [
  {
    question: "What makes PSQRD's AI solutions different?",
    answer: "Our AI solutions guarantee accuracy through source transparency, eliminating hallucinations that plague conventional AI systems. Every response is traceable to verified sources."
  },
  {
    question: "How can enterprise AI improve business operations?",
    answer: "Enterprise AI automates complex tasks, provides data-driven insights, and enables predictive analytics. Our solutions integrate seamlessly with existing workflows to enhance productivity and decision-making."
  },
  {
    question: "Is PSQRD's AI platform secure for enterprise use?",
    answer: "Yes, security is our priority. Our platform implements enterprise-grade encryption, role-based access controls, and complies with industry standards including SOC 2, GDPR, and HIPAA requirements."
  },
  {
    question: "How quickly can we implement PSQRD's AI solutions?",
    answer: "Most implementations are completed within 4-6 weeks, including integration, customization, and training. Our team works closely with yours to ensure a smooth transition."
  }
]

export function ClientHomePage() {
  return (
    <>
      {/* SEO-optimized breadcrumbs - invisible but present for search engines */}
      <SEOBreadcrumbs visibleOnPage={false} />
      
      <Suspense fallback={<LoadingPlaceholder text="Loading experience..." height="h-screen" />}>
        <HomePage />
      </Suspense>
      
      {/* Structured data for FAQs to improve search visibility */}
      <SEOFAQSchema 
        faqs={homeFAQs}
        headline="Frequently Asked Questions About Enterprise AI Solutions"
      />
    </>
  )
}
