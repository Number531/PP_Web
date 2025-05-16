'use client'

import Script from 'next/script'
import { siteConfig } from '../seo/metadata-config'

export function FAQSchema() {
  const faqs = [
    {
      question: "What is zero-hallucination AI?",
      answer: "Zero-hallucination AI is artificial intelligence technology that guarantees factual accuracy by eliminating fabricated information. PSQRD's platform ensures every output is verified against reliable sources, preventing the AI from 'hallucinating' or generating false information."
    },
    {
      question: "How does PSQRD ensure information integrity?",
      answer: "PSQRD ensures information integrity through a proprietary verification system that cross-references all AI outputs with verified data sources. Every insight comes with linked sources, allowing instant verification and building trust in AI-generated information."
    },
    {
      question: "What industries can benefit from PSQRD's technology?",
      answer: "Any industry that relies on accurate information can benefit from PSQRD's technology, including finance, healthcare, legal, journalism, research, and government. Our zero-hallucination AI is particularly valuable in contexts where misinformation could lead to significant negative consequences."
    },
    {
      question: "How does PSQRD's technology compare to other AI solutions?",
      answer: "Unlike conventional AI systems that may generate plausible but incorrect information, PSQRD's technology guarantees factual accuracy with source verification. Our systems achieve over 99.9% accuracy while processing information 100x faster than traditional methods."
    },
    {
      question: "Can PSQRD's technology integrate with existing enterprise systems?",
      answer: "Yes, PSQRD's technology is designed to integrate seamlessly with existing enterprise systems through secure APIs and connectors. Our team works closely with clients to ensure smooth implementation and compatibility with current workflows."
    }
  ]

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <Script id="faq-schema" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(schemaData)}
    </Script>
  )
}
