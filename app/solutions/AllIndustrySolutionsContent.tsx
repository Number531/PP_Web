'use client'

import { motion } from 'framer-motion'
import { 
  Newspaper, Scale, BarChart, Stethoscope, 
  Briefcase, Lightbulb, GraduationCap, Building,
  Zap, FileCheck, Database, Shield 
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AllIndustrySolutionsContent() {
  const router = useRouter()
  const coreIndustries = [
    {
      icon: <Newspaper className="w-6 h-6 text-purple-400" />,
      title: "News Media",
      description: "Accelerate research for content creation, fact-checking, and audience trust restoration with source-transparent AI."
    },
    {
      icon: <Scale className="w-6 h-6 text-purple-400" />,
      title: "Legal Services",
      description: "Transform case research, precedent analysis, and due diligence with guaranteed citation accuracy and comprehensive coverage."
    },
    {
      icon: <BarChart className="w-6 h-6 text-purple-400" />,
      title: "Financial Services",
      description: "Enhance investment research, compliance verification, and market analysis with verifiable data sources and transparent methodology."
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-purple-400" />,
      title: "Healthcare & Life Sciences",
      description: "Accelerate literature reviews, regulatory documentation, and clinical trial analysis with validated medical research."
    }
  ]

  const emergingIndustries = [
    {
      icon: <Briefcase className="w-6 h-6 text-purple-400" />,
      title: "Management Consulting",
      description: "Deliver deeper insights and comprehensive market analysis with validated research across industries and geographies."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-purple-400" />,
      title: "Research & Development",
      description: "Accelerate innovation by analyzing vast scientific literature with complete source transparency and cross-discipline connections."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
      title: "Education",
      description: "Transform academic research and curriculum development with verified information and comprehensive source attribution."
    },
    {
      icon: <Building className="w-6 h-6 text-purple-400" />,
      title: "Government & Public Sector",
      description: "Enhance policy research, regulatory compliance, and public information management with guaranteed accuracy."
    }
  ]

  const keyCapabilities = [
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Research Acceleration",
      description: "Reduce research time by up to 95% across all industries while improving thoroughness and accuracy."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-purple-400" />,
      title: "Source Transparency",
      description: "Every insight comes with complete citation tracking and source verification, building trust in AI-generated content."
    },
    {
      icon: <Database className="w-6 h-6 text-purple-400" />,
      title: "Knowledge Integration",
      description: "Connect information across sources and domains to reveal insights that would be impossible to discover manually."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Enterprise Security",
      description: "Industry-leading security and compliance measures protect sensitive data across all implementations."
    }
  ]

  const customizationOptions = [
    {
      title: "Knowledge Source Integration",
      description: "Connect PSQRD to your proprietary databases, document repositories, and trusted external sources."
    },
    {
      title: "Domain-Specific Tuning",
      description: "Customize the platform for your industry's terminology, standards, and regulatory requirements."
    },
    {
      title: "Workflow Integration",
      description: "Seamlessly integrate with your existing tools and processes through our comprehensive API."
    },
    {
      title: "Custom UI Development",
      description: "Create tailored user experiences for different roles and use cases within your organization."
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
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Industry Solutions Overview</h3>
        <p className="text-white/80 leading-relaxed">
          PSQRD's AI platform is designed to transform research and information workflows across all industries. By eliminating AI hallucinations and providing complete source transparency, we enable organizations to make critical decisions with unprecedented efficiency and confidence.
        </p>
      </motion.div>

      {/* Cross-Industry Approach */}
      <motion.div variants={itemVariants} className="mb-8 bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Our Cross-Industry Approach</h3>
        <p className="text-white/80 leading-relaxed">
          While each industry has unique challenges and requirements, our core technology provides universal benefits: dramatically accelerated research, guaranteed accuracy, and complete source transparency. This foundation is then tailored to address specific industry needs through customized knowledge sources, domain-specific tuning, and workflow integration.
        </p>
      </motion.div>

      {/* Core Industries */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Core Industries
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {coreIndustries.map((industry, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 border border-purple-500/20 rounded-lg p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{industry.icon}</div>
              <div>
                <h4 className="font-medium text-white mb-2">{industry.title}</h4>
                <p className="text-white/70 text-sm">{industry.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Emerging Industries */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Emerging Applications
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {emergingIndustries.map((industry, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 border border-purple-500/20 rounded-lg p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{industry.icon}</div>
              <div>
                <h4 className="font-medium text-white mb-2">{industry.title}</h4>
                <p className="text-white/70 text-sm">{industry.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Capabilities */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Key Capabilities Across Industries
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {keyCapabilities.map((capability, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 border border-purple-500/20 rounded-lg p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{capability.icon}</div>
              <div>
                <h4 className="font-medium text-white mb-2">{capability.title}</h4>
                <p className="text-white/70 text-sm">{capability.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Customization Options */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Industry Customization</h3>
        <div className="bg-black/30 border border-purple-500/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              {customizationOptions.map((option, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-black/20" : "bg-black/40"}>
                  <td className="px-4 py-3 border-r border-purple-500/10 font-medium text-purple-300 w-1/3">
                    {option.title}
                  </td>
                  <td className="px-4 py-3 text-white/70 text-sm">
                    {option.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Implementation Approach */}
      <motion.div variants={itemVariants} className="mb-8 bg-gradient-to-r from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Implementation Approach</h3>
        <p className="text-white/80 leading-relaxed">
          Our team works closely with each organization to understand their specific industry challenges, information workflows, and strategic objectives. This collaborative approach ensures that PSQRD's platform is optimized for your unique requirements, delivering maximum value and ROI.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="text-center mt-8">
        <button 
          onClick={() => {
            router.push('/contact');
            // Close the popup when navigating
            const closeButton = document.querySelector('[aria-label="Close popup"]');
            if (closeButton) {
              (closeButton as HTMLButtonElement).click();
            }
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Schedule a Consultation
        </button>
        <p className="text-white/60 text-sm mt-2">
          Discover how PSQRD can transform research and information workflows in your industry.
        </p>
      </motion.div>
    </motion.div>
  )
}
