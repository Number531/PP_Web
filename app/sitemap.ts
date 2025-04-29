import { MetadataRoute } from 'next'
import { siteConfig } from './seo/metadata-config'

// Define page metadata for better sitemap organization
interface PageMetadata {
  path: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  images?: Array<{
    url: string
    title?: string
    caption?: string
  }>
}

/**
 * Generate a comprehensive XML sitemap for search engines
 * This improves crawling efficiency and indexing with enhanced metadata
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  
  // Define all pages with detailed metadata
  const pagesMetadata: PageMetadata[] = [
    {
      path: '',
      lastModified: new Date('2025-04-22'),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        {
          url: `${baseUrl}/images/hero-image.jpg`,
          title: 'Enterprise AI Solutions',
          caption: 'Hallucination-free AI with guaranteed accuracy'
        },
        {
          url: `${baseUrl}/images/platform-preview.jpg`,
          title: 'AI Platform Preview',
          caption: 'Interactive visualization of our AI platform'
        }
      ]
    },
    {
      path: '/about',
      lastModified: new Date('2025-04-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [
        {
          url: `${baseUrl}/images/team.jpg`,
          title: 'Our Team',
          caption: 'The experts behind our AI technology'
        }
      ]
    },
    {
      path: '/products',
      lastModified: new Date('2025-04-15'),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        {
          url: `${baseUrl}/images/products/ai-platform.jpg`,
          title: 'Enterprise AI Platform',
          caption: 'Our flagship AI solution for enterprises'
        },
        {
          url: `${baseUrl}/images/products/analytics-dashboard.jpg`,
          title: 'Analytics Dashboard',
          caption: 'Real-time insights from your AI implementation'
        }
      ]
    },
    {
      path: '/careers',
      lastModified: new Date('2025-04-05'),
      changeFrequency: 'weekly',
      priority: 0.7,
      images: [
        {
          url: `${baseUrl}/images/office.jpg`,
          title: 'Our Office',
          caption: 'Join our team in our modern workspace'
        }
      ]
    },
    {
      path: '/contact',
      lastModified: new Date('2025-03-30'),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      path: '/chat',
      lastModified: new Date('2025-04-20'),
      changeFrequency: 'daily',
      priority: 0.8,
      images: [
        {
          url: `${baseUrl}/images/chat-interface.jpg`,
          title: 'Interactive Chat Interface',
          caption: 'Experience our AI through our interactive chat'
        }
      ]
    },
  ]
  
  // Blog posts with enhanced metadata
  const blogMetadata: PageMetadata[] = [
    {
      path: '/blog/enterprise-ai-trends-2025',
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        {
          url: `${baseUrl}/images/blog/ai-trends-2025.jpg`,
          title: 'Enterprise AI Trends 2025',
          caption: 'The future of AI in enterprise environments'
        }
      ]
    },
    {
      path: '/blog/implementing-transparent-ai',
      lastModified: new Date('2025-02-20'),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        {
          url: `${baseUrl}/images/blog/transparent-ai.jpg`,
          title: 'Implementing Transparent AI',
          caption: 'Best practices for transparent AI implementation'
        }
      ]
    },
    {
      path: '/blog/ai-accuracy-case-study',
      lastModified: new Date('2025-03-10'),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        {
          url: `${baseUrl}/images/blog/case-study.jpg`,
          title: 'AI Accuracy Case Study',
          caption: 'How our client achieved 99.8% accuracy with our AI platform'
        }
      ]
    },
  ]
  
  // Product documentation pages
  const docsMetadata: PageMetadata[] = [
    {
      path: '/docs/getting-started',
      lastModified: new Date('2025-04-01'),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      path: '/docs/api-reference',
      lastModified: new Date('2025-04-10'),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      path: '/docs/tutorials',
      lastModified: new Date('2025-04-15'),
      changeFrequency: 'weekly',
      priority: 0.6
    }
  ]
  
  // Example for product pages:
  const productSlugs = [
    'enterprise-ai-platform',
    'data-analytics-suite',
    'ai-accuracy-monitor',
    'transparent-ai-toolkit',
  ]
  
  const productRoutes: PageMetadata[] = productSlugs.map(slug => ({
    path: `/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
    images: [
      {
        url: `${baseUrl}/images/products/${slug}.jpg`,
        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        caption: `Learn more about our ${slug.replace(/-/g, ' ')} solution`
      }
    ]
  }))
  
  // Combine all metadata and convert to sitemap format
  const allPages = [...pagesMetadata, ...blogMetadata, ...docsMetadata, ...productRoutes]
  
  // Convert to sitemap format that matches the Next.js MetadataRoute.Sitemap type
  return allPages.map(page => {
    // Basic sitemap entry that Next.js expects
    const sitemapEntry = {
      url: `${baseUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority
    }
    
    // We don't include images in the sitemap since Next.js doesn't support the extended format
    // Instead, we'll ensure images are properly marked up with structured data on the pages themselves
    
    return sitemapEntry
  })
}
