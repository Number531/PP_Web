'use client'

import React from 'react'
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface HowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

interface SEOAIReadyContentProps {
  title: string
  summary?: string
  faqs?: FAQItem[]
  howToSteps?: HowToStep[]
  relatedQuestions?: string[]
  className?: string
  children?: React.ReactNode
}

/**
 * SEO AI-Ready Content Component
 * 
 * Structures content in a way that's optimized for AI-driven search experiences
 * like Google's SGE (Search Generative Experience)
 */
export function SEOAIReadyContent({
  title,
  summary,
  faqs = [],
  howToSteps = [],
  relatedQuestions = [],
  className,
  children
}: SEOAIReadyContentProps) {
  // Generate structured data for FAQs
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  // Generate structured data for HowTo
  const howToSchema = howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": summary,
    "step": howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "url": step.url || `#step-${index + 1}`,
      "name": step.name,
      "text": step.text,
      "image": step.image ? {
        "@type": "ImageObject",
        "url": step.image
      } : undefined
    }))
  } : null

  return (
    <div className={cn("ai-ready-content", className)}>
      {/* Main content with semantic HTML structure */}
      <article>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        
        {summary && (
          <div className="summary text-xl mb-6">
            <p>{summary}</p>
          </div>
        )}
        
        {/* Main content */}
        <div className="content mb-8">
          {children}
        </div>
        
        {/* FAQ Section - Optimized for featured snippets and SGE */}
        {faqs.length > 0 && (
          <section className="faqs mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <div className="prose max-w-none">{faq.answer}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* How-To Section - Optimized for featured snippets and SGE */}
        {howToSteps.length > 0 && (
          <section className="how-to mb-8">
            <h2 className="text-2xl font-semibold mb-4">How To Use Interactive Hollow Sphere</h2>
            <div className="steps space-y-4">
              {howToSteps.map((step, index) => (
                <div 
                  id={`step-${index + 1}`}
                  key={index} 
                  className="step-item flex border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="step-number mr-4 font-bold text-blue-500">
                    {index + 1}
                  </div>
                  <div className="step-content">
                    <h3 className="text-lg font-medium mb-1">{step.name}</h3>
                    <p>{step.text}</p>
                    {step.image && (
                      <img 
                        src={step.image} 
                        alt={step.name} 
                        className="mt-2 rounded-lg max-w-md"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* People Also Ask - Optimized for SGE */}
        {relatedQuestions.length > 0 && (
          <section className="related-questions mb-8">
            <h2 className="text-2xl font-semibold mb-4">People Also Ask</h2>
            <ul className="space-y-2">
              {relatedQuestions.map((question, index) => (
                <li key={index} className="border-b pb-2">
                  <a href={`#${question.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
                    {question}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      
      {/* Structured data for search engines */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
    </div>
  )
}

export default SEOAIReadyContent
