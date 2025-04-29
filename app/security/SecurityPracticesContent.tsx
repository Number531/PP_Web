'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, FileCheck, Server, Users, AlertTriangle } from 'lucide-react'

export function SecurityPracticesContent() {
  const securityFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Enterprise-Grade Encryption",
      description: "All data is protected with AES-256 encryption both in transit and at rest, ensuring your sensitive information remains secure."
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: "Access Controls",
      description: "Role-based access control (RBAC) with multi-factor authentication and single sign-on integration for secure access management."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-purple-400" />,
      title: "Compliance Certifications",
      description: "SOC 2 Type II, HIPAA, GDPR, and ISO 27001 compliant infrastructure with regular third-party audits and penetration testing."
    },
    {
      icon: <Server className="w-6 h-6 text-purple-400" />,
      title: "Secure Infrastructure",
      description: "Hosted on enterprise cloud infrastructure with redundant systems, DDoS protection, and continuous security monitoring."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Security Team",
      description: "Dedicated security professionals monitoring our systems 24/7 with incident response protocols and regular security training."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-purple-400" />,
      title: "Vulnerability Management",
      description: "Continuous vulnerability scanning, regular penetration testing, and a responsible disclosure program for identifying and addressing security issues."
    }
  ]

  const complianceStandards = [
    {
      name: "SOC 2 Type II",
      description: "Audited annually against the Trust Services Criteria for Security, Availability, and Confidentiality."
    },
    {
      name: "HIPAA",
      description: "Compliant with healthcare data protection standards, including signed Business Associate Agreements (BAAs)."
    },
    {
      name: "GDPR",
      description: "Full compliance with EU data protection regulations, including data processing agreements and data subject rights."
    },
    {
      name: "ISO 27001",
      description: "Certified information security management system (ISMS) with comprehensive security controls."
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
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Security Practices Overview</h3>
        <p className="text-white/80 leading-relaxed">
          At PSQRD, security is foundational to everything we do. Our platform is built with enterprise-grade security measures to protect your most sensitive data and ensure compliance with industry standards and regulations.
        </p>
      </motion.div>

      {/* Security Approach */}
      <motion.div variants={itemVariants} className="mb-8 bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Our Security Approach</h3>
        <p className="text-white/80 leading-relaxed">
          We implement a defense-in-depth strategy with multiple layers of security controls. From secure development practices to continuous monitoring, every aspect of our platform is designed with security as a priority. We conduct regular security assessments and maintain a dedicated security team to protect your data.
        </p>
      </motion.div>

      {/* Security Features */}
      <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white mb-4">
        Key Security Features
      </motion.h3>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {securityFeatures.map((feature, index) => (
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

      {/* Compliance Standards */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Standards</h3>
        <div className="space-y-4">
          {complianceStandards.map((standard, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-black/40 border border-purple-500/20 rounded-lg p-4"
            >
              <h4 className="font-medium text-purple-400 mb-1">{standard.name}</h4>
              <p className="text-white/70 text-sm">{standard.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Privacy */}
      <motion.div variants={itemVariants} className="mb-8 bg-gradient-to-r from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Data Privacy Commitment</h3>
        <p className="text-white/80 leading-relaxed">
          We are committed to protecting your data privacy. Our platform includes features for data minimization, retention controls, and secure deletion. We provide transparency about our data practices and offer options for data residency to meet your compliance requirements.
        </p>
      </motion.div>

      {/* Deployment Options */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-3">Deployment Options</h3>
        <p className="text-white/80 leading-relaxed mb-4">
          We offer flexible deployment options to meet your security requirements:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span className="text-white/80 text-sm"><span className="font-medium text-white">Cloud:</span> Secure multi-tenant environment with logical separation of customer data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span className="text-white/80 text-sm"><span className="font-medium text-white">Private Cloud:</span> Dedicated instance within our secure infrastructure</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span className="text-white/80 text-sm"><span className="font-medium text-white">On-Premises:</span> Deploy within your own infrastructure for maximum control</span>
          </li>
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="text-center mt-8">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
          Request Security Whitepaper
        </button>
        <p className="text-white/60 text-sm mt-2">
          For detailed information about our security practices and compliance certifications.
        </p>
      </motion.div>
    </motion.div>
  )
}
