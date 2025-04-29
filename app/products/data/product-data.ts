export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  features: string[]
  benefits: string[]
  useCases: UseCase[]
  image: string
}

export interface UseCase {
  title: string
  description: string
  industry: string
}

export const products: Product[] = [
  {
    id: "verify",
    name: "PSQRD Verify",
    description: "Our flagship product for ensuring factual accuracy in AI-generated content.",
    longDescription:
      "PSQRD Verify is our flagship product designed to eliminate AI hallucinations and ensure factual accuracy in all AI-generated content. By combining advanced retrieval-augmented generation, knowledge graph validation, and source verification, Verify ensures that every piece of information is factually accurate and traceable to trusted sources.",
    features: [
      "Real-time fact verification",
      "Source attribution for every claim",
      "Confidence scoring system",
      "Integration with existing AI systems",
      "Custom knowledge base support",
      "Detailed verification reports",
    ],
    benefits: [
      "Eliminate AI hallucinations completely",
      "Build trust with accurate, verifiable information",
      "Reduce risk of misinformation",
      "Save time on manual fact-checking",
      "Enhance decision-making with reliable data",
    ],
    useCases: [
      {
        title: "Content Creation",
        description: "Ensure all AI-generated content is factually accurate and properly sourced.",
        industry: "Media",
      },
      {
        title: "Customer Support",
        description: "Provide accurate information to customers with confidence and transparency.",
        industry: "Service",
      },
      {
        title: "Research Assistance",
        description: "Accelerate research with verified information from trusted sources.",
        industry: "Academic",
      },
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "research",
    name: "PSQRD Research",
    description: "Advanced research assistant that delivers verified information from trusted sources.",
    longDescription:
      "PSQRD Research is an advanced research assistant that helps professionals find, verify, and synthesize information from trusted sources. It combines the power of AI with rigorous verification to deliver accurate research results in a fraction of the time it would take using traditional methods.",
    features: [
      "Deep research capabilities",
      "Multi-source verification",
      "Academic and professional source prioritization",
      "Citation generation",
      "Research summaries with source links",
      "Domain-specific knowledge graphs",
    ],
    benefits: [
      "Reduce research time by up to 92%",
      "Ensure accuracy with multi-source verification",
      "Access information from trusted academic and professional sources",
      "Generate properly formatted citations automatically",
      "Synthesize complex information into clear summaries",
    ],
    useCases: [
      {
        title: "Academic Research",
        description: "Accelerate literature reviews and research projects with verified information.",
        industry: "Education",
      },
      {
        title: "Market Analysis",
        description: "Gather and verify market data from multiple trusted sources.",
        industry: "Business",
      },
      {
        title: "Competitive Intelligence",
        description: "Research competitors with accurate, up-to-date information.",
        industry: "Strategy",
      },
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "legal",
    name: "PSQRD Legal",
    description: "Specialized solution for legal research, precedent analysis, and document review.",
    longDescription:
      "PSQRD Legal is a specialized solution designed specifically for the legal industry. It combines our hallucination-free AI technology with legal-specific knowledge graphs and verification systems to assist with legal research, precedent analysis, document review, and more.",
    features: [
      "Case law and precedent analysis",
      "Legal document verification",
      "Jurisdiction-specific knowledge",
      "Compliance checking",
      "Legal citation validation",
      "Contract analysis with source verification",
    ],
    benefits: [
      "Reduce legal research time by up to 90%",
      "Ensure accuracy in legal document preparation",
      "Minimize risk with verified legal information",
      "Streamline document review processes",
      "Enhance compliance with accurate regulatory information",
    ],
    useCases: [
      {
        title: "Legal Research",
        description: "Find relevant cases, statutes, and regulations with verified accuracy.",
        industry: "Legal",
      },
      {
        title: "Contract Review",
        description: "Analyze contracts for potential issues with AI-powered verification.",
        industry: "Legal",
      },
      {
        title: "Compliance Checking",
        description: "Ensure documents comply with relevant laws and regulations.",
        industry: "Legal",
      },
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "media",
    name: "PSQRD Media",
    description: "Fact-checking and content verification tools for media organizations.",
    longDescription:
      "PSQRD Media provides media organizations with powerful fact-checking and content verification tools to ensure the accuracy of their reporting. In an era of misinformation, our platform helps journalists and editors verify facts, check sources, and build trust with their audience.",
    features: [
      "Real-time fact-checking",
      "Source credibility assessment",
      "Misinformation detection",
      "Content verification workflows",
      "Attribution tracking",
      "Audience trust metrics",
    ],
    benefits: [
      "Increase audience trust with verified reporting",
      "Reduce fact-checking time by up to 78%",
      "Minimize the risk of publishing inaccurate information",
      "Track sources and attribution throughout the content lifecycle",
      "Measure and improve audience trust metrics",
    ],
    useCases: [
      {
        title: "News Verification",
        description: "Verify facts and sources before publishing news articles.",
        industry: "Media",
      },
      {
        title: "Content Fact-Checking",
        description: "Check facts in existing content for accuracy and completeness.",
        industry: "Media",
      },
      {
        title: "Source Verification",
        description: "Assess the credibility and reliability of information sources.",
        industry: "Media",
      },
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export const pricingPlans = [
  {
    name: "Starter",
    description: "For small teams and individual professionals",
    price: "$499",
    period: "per month",
    features: [
      "Up to 1,000 queries per month",
      "Basic source verification",
      "Standard knowledge graph access",
      "Email support",
      "Single user license",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing teams with advanced needs",
    price: "$1,499",
    period: "per month",
    features: [
      "Up to 10,000 queries per month",
      "Advanced source verification",
      "Full knowledge graph access",
      "API access",
      "Priority support",
      "Up to 10 user licenses",
      "Custom training (5 hours)",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with complex requirements",
    price: "Custom",
    period: "tailored pricing",
    features: [
      "Unlimited queries",
      "Premium source verification",
      "Custom knowledge graph integration",
      "Full API access",
      "24/7 dedicated support",
      "Unlimited user licenses",
      "Custom training (20+ hours)",
      "On-premises deployment option",
      "Custom SLAs",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]
