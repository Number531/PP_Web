'use client'

interface FAQItem {
  question: string
  answer: string
}

interface SEOFAQSchemaProps {
  faqs: FAQItem[]
  headline?: string
}

/**
 * SEOFAQSchema Component
 * 
 * Implements structured data for FAQs to improve search visibility
 * and potentially get rich snippets in search results
 */
export function SEOFAQSchema({ faqs, headline }: SEOFAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(headline && { 'headline': headline }),
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

export default SEOFAQSchema
