'use client'

import { motion } from 'framer-motion'
import { Database, Cpu, Link, ShieldCheck, Search, FileText, Zap, Code } from 'lucide-react'

export function TechnologyContent() {
  const coreTechnologies = [
    {
      icon: <Database className="w-6 h-6 text-purple-400" />,
      title: "Knowledge Graph Architecture",
      description: "Our proprietary knowledge graph connects information across sources, enabling contextual understanding and relationship mapping for more accurate insights."
    },
    {
      icon: <Search className="w-6 h-6 text-purple-400" />,
      title: "Advanced Retrieval Augmented Generation",
      description: "Enhanced RAG technology that goes beyond basic retrieval to include multi-hop reasoning and cross-document verification for comprehensive accuracy."
    },
    {
      icon: <Link className="w-6 h-6 text-purple-400" />,
      title: "Source Attribution Engine",
      description: "Proprietary citation tracking that maintains links to original sources throughout the generation process, ensuring every output is verifiable."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: "Accuracy Verification Framework",
      description: "Multi-layered validation system that checks generated content against source materials to eliminate hallucinations and factual errors."
    }
  ]

  const advancedFeatures = [
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Neural Reasoning",
      description: "Our system employs advanced neural networks to reason across multiple documents and knowledge sources, identifying connections human researchers might miss."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: "Semantic Understanding",
      description: "Deep semantic processing allows our AI to understand context, nuance, and domain-specific terminology across specialized fields."
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Real-time Processing",
      description: "Optimized architecture enables processing of massive document collections in seconds rather than hours, without sacrificing accuracy."
    },
    {
      icon: <Code className="w-6 h-6 text-purple-400" />,
      title: "Extensible API Framework",
      description: "Enterprise-grade APIs allow seamless integration with existing workflows and systems while maintaining security and performance."
    }
  ]

  const technicalSpecs = [
    {
      category: "Model Architecture",
      details: "Custom-trained large language models with domain-specific fine-tuning and knowledge graph integration"
    },
    {
      category: "Processing Capacity",
      details: "Capable of analyzing 100,000+ pages of text in under 60 seconds with distributed processing"
    },
    {
      category: "Accuracy Metrics",
      details: "99.7% factual accuracy on benchmark tests, with comprehensive citation tracking"
    },
    {
      category: "Integration Capabilities",
      details: "REST API, GraphQL, webhook support, and custom connectors for enterprise systems"
    },
    {
      category: "Deployment Options",
      details: "Cloud, private cloud, and on-premises solutions with containerized architecture"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-white"
    >
      {/* Introduction */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Our Technology Platform</h3>
        <p className="text-white/80 leading-relaxed">
          PSQRD's platform represents a breakthrough in AI accuracy and transparency. By combining advanced retrieval techniques with proprietary validation systems, we've created an AI solution that guarantees factual reliability while maintaining complete source transparency.
        </p>
      </motion.div>

      {/* Technology Approach */}
      <motion.div variants={itemVariants} className="mb-8 bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Our Technological Approach</h3>
        <p className="text-white/80 leading-relaxed">
          Our platform is built on the fundamental principle that AI should never hallucinate or fabricate information. We've engineered a system that ensures every output is grounded in verifiable sources through a multi-stage process of retrieval, verification, and attribution.
        </p>
      </motion.div>

      {/* Core Technologies */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Core Technologies
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {coreTechnologies.map((tech, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 border border-purple-500/20 rounded-lg p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{tech.icon}</div>
              <div>
                <h4 className="font-medium text-white mb-2">{tech.title}</h4>
                <p className="text-white/70 text-sm">{tech.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Technical Process Diagram */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Technical Process</h3>
        <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="bg-purple-500/20 px-4 py-2 rounded-lg text-center w-full md:w-1/4">
                <p className="text-purple-300 font-medium">Document Ingestion</p>
              </div>
              <div className="hidden md:block">→</div>
              <div className="bg-purple-500/20 px-4 py-2 rounded-lg text-center w-full md:w-1/4">
                <p className="text-purple-300 font-medium">Knowledge Extraction</p>
              </div>
              <div className="hidden md:block">→</div>
              <div className="bg-purple-500/20 px-4 py-2 rounded-lg text-center w-full md:w-1/4">
                <p className="text-purple-300 font-medium">Verification</p>
              </div>
              <div className="hidden md:block">→</div>
              <div className="bg-purple-500/20 px-4 py-2 rounded-lg text-center w-full md:w-1/4">
                <p className="text-purple-300 font-medium">Attribution</p>
              </div>
            </div>
            <p className="text-white/70 text-sm text-center">
              Our end-to-end pipeline ensures information integrity from ingestion to final output
            </p>
          </div>
        </div>
      </motion.div>

      {/* Advanced Features */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Advanced Features
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {advancedFeatures.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 border border-purple-500/20 rounded-lg p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h4 className="font-medium text-white mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Technical Specifications */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Technical Specifications</h3>
        <div className="bg-black/30 border border-purple-500/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              {technicalSpecs.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-black/20" : "bg-black/40"}>
                  <td className="px-4 py-3 border-r border-purple-500/10 font-medium text-purple-300 w-1/3">
                    {spec.category}
                  </td>
                  <td className="px-4 py-3 text-white/70 text-sm">
                    {spec.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Research Foundation */}
      <motion.div variants={itemVariants} className="mb-8 bg-gradient-to-r from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Research Foundation</h3>
        <p className="text-white/80 leading-relaxed">
          Our technology is built on cutting-edge research in retrieval augmented generation, knowledge graphs, and natural language processing. Our team of AI researchers continuously refines our models and algorithms to push the boundaries of what's possible in AI accuracy and transparency.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="text-center mt-8">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
          Request Technical Whitepaper
        </button>
        <p className="text-white/60 text-sm mt-2">
          For in-depth technical specifications and architecture details.
        </p>
      </motion.div>
    </motion.div>
  )
}
