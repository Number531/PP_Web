// Enhanced SEO configuration with expanded metadata support
export const siteConfig = {
  name: "PSQRD",
  url: "https://psqrd.ai",
  ogImage: "https://psqrd.ai/og-image.jpg",
  description: "Hallucination-free AI with guaranteed accuracy for enterprise applications.",
  keywords: [
    "AI solutions", 
    "enterprise AI", 
    "accurate AI", 
    "hallucination-free AI", 
    "transparent AI",
    "AI platform",
    "machine learning",
    "business intelligence"
  ],
  twitter: {
    handle: "@psqrd_ai",
    site: "@psqrd_ai",
    cardType: "summary_large_image",
  },
  facebook: {
    appId: "123456789012345", // Replace with actual Facebook App ID if available
  },
  organization: {
    name: "PSQRD AI",
    logo: "https://psqrd.ai/logo.png",
    foundingDate: "2023",
    founders: [
      {
        name: "PSQRD Founder",
        url: "https://psqrd.ai/team/founder"
      }
    ],
    address: {
      streetAddress: "123 AI Street",
      addressLocality: "Tech City",
      addressRegion: "CA",
      postalCode: "94000",
      addressCountry: "US"
    }
  },
  // Add localization support
  locales: {
    default: "en-US",
    supported: ["en-US", "en-GB"]
  }
}

// Enhanced metadata generator with additional SEO features
export function generateEnhancedMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  ogImage,
  keywords = [],
  publishedTime,
  modifiedTime,
  authors = [],
  section,
  locale = "en-US"
}: {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  ogImage?: string
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  locale?: string
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path}`
  const allKeywords = [...siteConfig.keywords, ...keywords].join(", ")

  return {
    // Basic metadata
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    metadataBase: new URL(siteConfig.url),
    
    // Canonical URL and alternates
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${siteConfig.url}/en-us${path}`,
        'en-GB': `${siteConfig.url}/en-gb${path}`,
      },
    },
    
    // Open Graph metadata (for social sharing)
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale,
      type: "website",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors?.length > 0 && { authors }),
      ...(section && { section }),
    },
    
    // Twitter card metadata
    twitter: {
      card: siteConfig.twitter.cardType,
      title: fullTitle,
      description: fullDescription,
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.handle,
      images: [ogImage || siteConfig.ogImage],
    },
    
    // Facebook metadata
    facebook: {
      appId: siteConfig.facebook.appId,
    },
    
    // Robots directives
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    } as const,
    
    // Verification tokens for search engines
    verification: {
      google: "google-site-verification-code", // Replace with actual verification code
      yandex: "yandex-verification-code",      // Replace with actual verification code if needed
      bing: "bing-verification-code",          // Replace with actual verification code if needed
    },
    
    // Other metadata
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    themeColor: "#6D28D9", // Purple theme color
    category: section || "Technology",
  }
}
