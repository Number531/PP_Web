'use client'

interface ProductReview {
  author: string
  datePublished: string
  reviewBody: string
  reviewRating: {
    ratingValue: number
    bestRating?: number
    worstRating?: number
  }
}

interface ProductOffer {
  price: number
  priceCurrency: string
  priceValidUntil?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  url?: string
  seller?: {
    name: string
    url?: string
  }
}

interface SEOProductSchemaProps {
  name: string
  description: string
  image: string
  brand: string
  offers?: ProductOffer[]
  reviews?: ProductReview[]
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  sku?: string
  mpn?: string
  category?: string
  productionDate?: string
  releaseDate?: string
}

/**
 * SEOProductSchema Component
 * 
 * Implements structured data for products to improve search visibility
 * and potentially get rich snippets in search results with pricing, availability, and reviews
 */
export function SEOProductSchema({
  name,
  description,
  image,
  brand,
  offers,
  reviews,
  aggregateRating,
  sku,
  mpn,
  category,
  productionDate,
  releaseDate
}: SEOProductSchemaProps) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': name,
    'description': description,
    'image': image,
    'brand': {
      '@type': 'Brand',
      'name': brand
    },
    ...(sku && { 'sku': sku }),
    ...(mpn && { 'mpn': mpn }),
    ...(category && { 'category': category }),
    ...(productionDate && { 'productionDate': productionDate }),
    ...(releaseDate && { 'releaseDate': releaseDate }),
    
    // Add offers if available
    ...(offers && offers.length > 0 && {
      'offers': offers.length === 1
        ? {
            '@type': 'Offer',
            'price': offers[0].price,
            'priceCurrency': offers[0].priceCurrency,
            ...(offers[0].priceValidUntil && { 'priceValidUntil': offers[0].priceValidUntil }),
            ...(offers[0].availability && { 'availability': `https://schema.org/${offers[0].availability}` }),
            ...(offers[0].url && { 'url': offers[0].url }),
            ...(offers[0].seller && {
              'seller': {
                '@type': 'Organization',
                'name': offers[0].seller.name,
                ...(offers[0].seller.url && { 'url': offers[0].seller.url })
              }
            })
          }
        : offers.map(offer => ({
            '@type': 'Offer',
            'price': offer.price,
            'priceCurrency': offer.priceCurrency,
            ...(offer.priceValidUntil && { 'priceValidUntil': offer.priceValidUntil }),
            ...(offer.availability && { 'availability': `https://schema.org/${offer.availability}` }),
            ...(offer.url && { 'url': offer.url }),
            ...(offer.seller && {
              'seller': {
                '@type': 'Organization',
                'name': offer.seller.name,
                ...(offer.seller.url && { 'url': offer.seller.url })
              }
            })
          }))
    }),
    
    // Add reviews if available
    ...(reviews && reviews.length > 0 && {
      'review': reviews.map(review => ({
        '@type': 'Review',
        'author': {
          '@type': 'Person',
          'name': review.author
        },
        'datePublished': review.datePublished,
        'reviewBody': review.reviewBody,
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': review.reviewRating.ratingValue,
          ...(review.reviewRating.bestRating && { 'bestRating': review.reviewRating.bestRating }),
          ...(review.reviewRating.worstRating && { 'worstRating': review.reviewRating.worstRating })
        }
      }))
    }),
    
    // Add aggregate rating if available
    ...(aggregateRating && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': aggregateRating.ratingValue,
        'reviewCount': aggregateRating.reviewCount,
        ...(aggregateRating.bestRating && { 'bestRating': aggregateRating.bestRating }),
        ...(aggregateRating.worstRating && { 'worstRating': aggregateRating.worstRating })
      }
    })
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  )
}

export default SEOProductSchema
