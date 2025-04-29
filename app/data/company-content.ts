export interface ProductFeature {
  id: string
  title: string
  description: string
  position: [number, number, number] // 3D coordinates
  scrollTrigger: number // Scroll percentage when this becomes relevant (0-1)
}

export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    id: "hallucination-free",
    title: "Hallucination-Free AI",
    description:
      "Our proprietary technology eliminates AI hallucinations, ensuring every output is factually accurate and reliable for high-stakes industries.",
    position: [0.5, 0.7, 1.2],
    scrollTrigger: 0.1,
  },
  {
    id: "validated-accuracy",
    title: "Validated Accuracy",
    description:
      "PSQRD delivers independently validated accuracy, giving you complete confidence in AI-generated content for critical business decisions.",
    position: [-1.2, 0.3, -0.6],
    scrollTrigger: 0.2,
  },
  {
    id: "source-transparency",
    title: "Radical Transparency",
    description:
      "Every insight comes with linked sources, allowing instant verification and building trust in AI-generated information.",
    position: [0.8, -0.9, 0.5],
    scrollTrigger: 0.3,
  },
  {
    id: "efficiency",
    title: "99% Efficiency Boost",
    description:
      "Transform your workflow with AI that delivers accurate results in seconds instead of hours, dramatically reducing research and verification time.",
    position: [-0.6, -0.5, -1.1],
    scrollTrigger: 0.4,
  },
  {
    id: "news-media",
    title: "For News Media",
    description:
      "Accelerate fact-checking, enhance research capabilities, and restore audience trust with AI that never fabricates information.",
    position: [1.3, 0.2, -0.8],
    scrollTrigger: 0.5,
  },
  {
    id: "legal-firms",
    title: "For Legal Firms",
    description:
      "Conduct due diligence, research precedents, and build case strategies with unprecedented speed and reliability.",
    position: [-0.9, 0.8, 0.7],
    scrollTrigger: 0.6,
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Built with rigorous security standards and compliance measures to protect sensitive data in regulated industries.",
    position: [0.4, -1.2, -0.3],
    scrollTrigger: 0.7,
  },
  {
    id: "integration",
    title: "Seamless Integration",
    description:
      "Easily integrate with your existing workflows through our API and pre-built connectors for popular enterprise tools.",
    position: [-1.1, -0.4, 1.0],
    scrollTrigger: 0.8,
  },
]

export const COMPANY_FACTS = [
  "PSQRD achieves over 99.9% accuracy in legal document analysis.",
  "Our platform processes information 100x faster than traditional research methods.",
  "News organizations using PSQRD have reported a 78% increase in audience trust metrics.",
  "Legal teams reduce research time by an average of 92% with our AI platform.",
  "Every output includes transparent source attribution with direct links to original documents.",
  "Our validation process ensures AI-generated content meets the highest standards of factual accuracy.",
  "PSQRD was founded by experts in machine learning, natural language processing, and information retrieval.",
  "Our platform handles millions of document references while maintaining sub-second response times.",
  "PSQRD's technology has been independently validated by leading industry experts.",
  "We're committed to ethical AI development with human oversight of our validation processes.",
]
