'use client'

import { usePathname } from "next/navigation"
import { siteConfig } from "../seo/metadata-config"

// Enhanced Organization schema with more detailed information
export function EnhancedOrganizationSchema() {
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
          description: "PSQRD provides hallucination-free AI with guaranteed accuracy for enterprise applications.",
          foundingDate: "2023",
          founders: [
            {
              "@type": "Person",
              name: "PSQRD Founder",
              url: "https://psqrd.ai/team/founder"
            }
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 AI Street",
            addressLocality: "Tech City",
            addressRegion: "CA",
            postalCode: "94000",
            addressCountry: "US"
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+1-800-555-0123",
              contactType: "customer service",
              email: "contact@psqrd.ai",
              availableLanguage: ["English"],
            },
            {
              "@type": "ContactPoint",
              telephone: "+1-800-555-0124",
              contactType: "technical support",
              email: "support@psqrd.ai",
              availableLanguage: ["English"],
            }
          ],
        }),
      }}
    />
  )
}

// Enhanced Website schema with breadcrumbs
export function EnhancedWebsiteSchema() {
  const pathname = usePathname()
  const currentUrl = `${siteConfig.url}${pathname}`
  
  // Generate breadcrumbs based on the current path
  const breadcrumbItems = generateBreadcrumbItems(pathname)

  return (
    <>
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
            inLanguage: "en-US",
            copyrightYear: 2025, // Use static year instead of dynamic Date.now()
            dateModified: "2025-04-22T00:00:00Z", // Use static date instead of dynamic Date
          }),
        }}
      />
      {breadcrumbItems.length > 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
              })),
            }),
          }}
        />
      )}
    </>
  )
}

// Enhanced Product schema for AI products
export function EnhancedProductSchema({ product }: { product: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          description: product.description,
          image: product.image || `${siteConfig.url}/product-placeholder.jpg`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "All",
          offers: {
            "@type": "Offer",
            price: "Custom",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}/products/${product.slug}`,
            seller: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url
            }
          },
          aggregateRating: product.rating ? {
            "@type": "AggregateRating",
            ratingValue: product.rating.value,
            ratingCount: product.rating.count,
            bestRating: "5",
            worstRating: "1"
          } : undefined,
          review: product.reviews ? product.reviews.map((review: any) => ({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: review.author
            },
            datePublished: review.date,
            reviewBody: review.content,
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: "5",
              worstRating: "1"
            }
          })) : undefined
        }),
      }}
    />
  )
}

// Add FAQ schema for FAQ sections
export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          }))
        }),
      }}
    />
  )
}

// Add Article schema for blog posts
export function ArticleSchema({ 
  title, 
  description, 
  image, 
  publishedTime, 
  modifiedTime, 
  authors,
  tags
}: { 
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  authors: Array<{ name: string; url?: string }>;
  tags?: string[];
}) {
  const pathname = usePathname()
  const url = `${siteConfig.url}${pathname}`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          image: image || siteConfig.ogImage,
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          author: authors.map(author => ({
            "@type": "Person",
            name: author.name,
            url: author.url
          })),
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/logo.png`
            }
          },
          url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url
          },
          keywords: tags?.join(", ")
        }),
      }}
    />
  )
}

// Helper function to generate breadcrumb items from pathname
function generateBreadcrumbItems(pathname: string) {
  if (pathname === '/') {
    return [{ name: 'Home', url: siteConfig.url }]
  }

  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ name: 'Home', url: siteConfig.url }]

  let currentPath = ''
  segments.forEach(segment => {
    currentPath += `/${segment}`
    
    // Convert path segments to readable names
    const readableName = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name: readableName,
      url: `${siteConfig.url}${currentPath}`
    })
  })

  return breadcrumbs
}
