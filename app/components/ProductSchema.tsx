'use client'

import Script from 'next/script'
import { siteConfig } from '../seo/metadata-config'

export function ProductSchema() {
  const products = [
    {
      name: 'Zero-Hallucination AI Platform',
      description: 'Enterprise-grade AI platform with guaranteed factual accuracy and source verification.',
      image: `${siteConfig.url}/images/products/zero-hallucination-platform.jpg`,
      brand: siteConfig.name,
      offers: {
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      category: 'Enterprise Software > Artificial Intelligence',
    },
    {
      name: 'Information Integrity Verification',
      description: 'Automated system for verifying information integrity across enterprise data sources.',
      image: `${siteConfig.url}/images/products/information-verification.jpg`,
      brand: siteConfig.name,
      offers: {
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      category: 'Enterprise Software > Data Verification',
    }
  ]

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        brand: {
          '@type': 'Brand',
          name: product.brand
        },
        offers: {
          '@type': 'Offer',
          ...product.offers
        },
        category: product.category
      }
    }))
  }

  return (
    <Script id="product-schema" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(schemaData)}
    </Script>
  )
}
