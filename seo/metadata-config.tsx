import type { Metadata } from "next"

export const siteConfig = {
  name: "PSQRD",
  url: "https://psqrd.ai",
  ogImage: "https://psqrd.ai/og-image.jpg",
  description: "Hallucination-free AI with guaranteed accuracy for enterprise applications.",
  twitter: {
    handle: "@psqrd_ai",
    site: "@psqrd_ai",
    cardType: "summary_large_image",
  },
}

interface GenerateMetadataParams {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  ogImage?: string
}

export function generateMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  ogImage,
}: GenerateMetadataParams): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const fullDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path}`
  const image = ogImage || siteConfig.ogImage

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
          url: image,
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
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}
