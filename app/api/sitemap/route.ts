import { products } from "@/app/products/data/product-data"
import { jobListings } from "@/app/careers/data/job-listings"
import { siteConfig } from "@/app/seo/metadata-config"

// Dynamic sitemap generation
export async function GET() {
  const baseUrl = siteConfig.url

  // Define static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Generate product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Generate job listing routes
  const jobRoutes = jobListings.map((job) => ({
    url: `${baseUrl}/careers/${job.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  // Combine all routes
  const allRoutes = [...staticRoutes, ...productRoutes, ...jobRoutes]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("")}
</urlset>`

  // Return the XML with appropriate headers
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
