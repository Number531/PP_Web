"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "../data/product-data"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
              <span className="text-sm font-medium">PSQRD Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>

            <p className="text-xl text-white/80">{product.longDescription}</p>

            <div className="flex flex-wrap gap-4 pt-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="#use-cases"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Explore Use Cases
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-lg overflow-hidden"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
