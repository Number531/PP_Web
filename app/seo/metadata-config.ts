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
  // Social media links for the organization
  socialLinks: {
    twitter: "https://twitter.com/psqrd_ai",
    linkedin: "https://linkedin.com/company/psqrd-ai",
    github: "https://github.com/psqrd-ai",
    instagram: "https://instagram.com/psqrd_ai",
    youtube: "https://youtube.com/c/psqrdai"
  },
  // Contact information
  contact: {
    email: "info@psqrd.ai",
    phone: "+1 (555) 123-4567",
    hours: "Monday - Friday, 9:00 AM - 5:00 PM PST",
    support: {
      email: "support@psqrd.ai",
      phone: "+1 (555) 987-6543"
    }
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

// Helper function to generate metadata for each page
export function generateMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  ogImage,
}: {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  ogImage?: string
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path}`

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
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
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: siteConfig.twitter.cardType,
      title: fullTitle,
      description: fullDescription,
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.handle,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    } as const,
  }
}
