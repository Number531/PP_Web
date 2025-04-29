"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("verify")

  const products = [
    {
      id: "verify",
      name: "PSQRD Verify",
      description: "Our flagship product for ensuring factual accuracy in AI-generated content.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Real-time fact verification",
        "Source attribution for every claim",
        "Confidence scoring system",
        "Integration with existing AI systems",
        "Custom knowledge base support",
        "Detailed verification reports",
      ],
    },
    {
      id: "research",
      name: "PSQRD Research",
      description: "Advanced research assistant that delivers verified information from trusted sources.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Deep research capabilities",
        "Multi-source verification",
        "Academic and professional source prioritization",
        "Citation generation",
        "Research summaries with source links",
        "Domain-specific knowledge graphs",
      ],
    },
    {
      id: "legal",
      name: "PSQRD Legal",
      description: "Specialized solution for legal research, precedent analysis, and document review.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Case law and precedent analysis",
        "Legal document verification",
        "Jurisdiction-specific knowledge",
        "Compliance checking",
        "Legal citation validation",
        "Contract analysis with source verification",
      ],
    },
    {
      id: "media",
      name: "PSQRD Media",
      description: "Fact-checking and content verification tools for media organizations.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Real-time fact-checking",
        "Source credibility assessment",
        "Misinformation detection",
        "Content verification workflows",
        "Attribution tracking",
        "Audience trust metrics",
      ],
    },
  ]

  return (
    <section id="product-showcase" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="text-gradient">Product Suite</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Explore our range of specialized products designed to meet the unique needs of different industries and use
            cases.
          </p>
        </motion.div>

        <Tabs defaultValue="verify" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent mb-8">
            {products.map((product) => (
              <TabsTrigger
                key={product.id}
                value={product.id}
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50 border border-purple-500/20 bg-black/20 backdrop-blur-sm"
              >
                {product.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-white/80 mb-6">{product.description}</p>

                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
