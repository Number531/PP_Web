'use client'

interface GeoCoordinates {
  latitude: number
  longitude: number
}

interface BusinessHours {
  dayOfWeek: string
  opens: string
  closes: string
}

interface SEOLocalBusinessSchemaProps {
  name: string
  description: string
  image?: string
  telephone?: string
  email?: string
  url?: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: GeoCoordinates
  priceRange?: string
  openingHours?: BusinessHours[]
  sameAs?: string[]
}

/**
 * SEOLocalBusinessSchema Component
 * 
 * Implements structured data for local businesses to improve local search visibility
 * and potentially get enhanced listings in Google Maps and local search results
 */
export function SEOLocalBusinessSchema({
  name,
  description,
  image,
  telephone,
  email,
  url,
  address,
  geo,
  priceRange,
  openingHours,
  sameAs
}: SEOLocalBusinessSchemaProps) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': name,
    'description': description,
    ...(image && { 'image': image }),
    ...(telephone && { 'telephone': telephone }),
    ...(email && { 'email': email }),
    ...(url && { 'url': url }),
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': address.streetAddress,
      'addressLocality': address.addressLocality,
      'addressRegion': address.addressRegion,
      'postalCode': address.postalCode,
      'addressCountry': address.addressCountry
    },
    ...(geo && {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': geo.latitude,
        'longitude': geo.longitude
      }
    }),
    ...(priceRange && { 'priceRange': priceRange }),
    ...(openingHours && {
      'openingHoursSpecification': openingHours.map(hours => ({
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': hours.dayOfWeek,
        'opens': hours.opens,
        'closes': hours.closes
      }))
    }),
    ...(sameAs && { 'sameAs': sameAs })
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  )
}

export default SEOLocalBusinessSchema
