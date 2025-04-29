import type { Metadata } from "next"
import { generateMetadata as generateSeoMetadata } from "../../seo/metadata-config"
import { notFound } from "next/navigation"
import { products } from "../data/product-data"
import { ProductDetail } from "../components/ProductDetail"
import { ProductFeatures } from "../components/ProductFeatures"
import { ProductUseCases } from "../components/ProductUseCases"
import { ProductTestimonials } from "../components/ProductTestimonials"
import { ProductCTA } from "../components/ProductCTA"

// Generate dynamic metadata for each product page
export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const product = products.find((p) => p.id === params.productId)

  if (!product) {
    return generateSeoMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: `/products/${params.productId}`,
      noIndex: true,
    })
  }

  return generateSeoMetadata({
    title: product.name,
    description: product.longDescription.substring(0, 160),
    path: `/products/${product.id}`,
    ogImage: `https://psqrd.ai/images/products/${product.id}-og.jpg`,
  })
}

// Generate static paths for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }))
}

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = products.find((p) => p.id === params.productId)

  if (!product) {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <ProductDetail product={product} />
      <ProductFeatures features={product.features} benefits={product.benefits} />
      <ProductUseCases useCases={product.useCases} />
      <ProductTestimonials />
      <ProductCTA />
    </main>
  )
}
