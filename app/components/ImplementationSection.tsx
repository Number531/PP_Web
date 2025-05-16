'use client'

import { motion } from "framer-motion"
import { Settings, Code, Server, Users, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

export function ImplementationSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-purple-950/10" id="implementation">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Enterprise Integration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Seamless <span className="text-gradient">Implementation</span> Process
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            PSQRD's zero-hallucination AI technology integrates smoothly with your existing systems and workflows, with minimal disruption and maximum impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold mb-6">Implementation Approach</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Our structured implementation methodology ensures a smooth transition to PSQRD's AI technology, with minimal disruption to your operations and maximum value delivery.
              </p>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/20"></div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">1</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Discovery & Assessment</h4>
                    <p className="text-white/70">
                      We analyze your current systems, workflows, and data sources to create a tailored implementation plan.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">2</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Integration Design</h4>
                    <p className="text-white/70">
                      Our engineers design integration points with your existing systems, ensuring seamless data flow.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">3</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Pilot Deployment</h4>
                    <p className="text-white/70">
                      We deploy a controlled pilot to validate the integration and gather feedback for optimization.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">4</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Full Deployment</h4>
                    <p className="text-white/70">
                      Rollout across your organization with comprehensive training and support.
                    </p>
                  </div>
                  
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">5</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Continuous Optimization</h4>
                    <p className="text-white/70">
                      Ongoing monitoring, feedback collection, and performance optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                alt="Implementation timeline" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Typical Timeline</h4>
                  <p className="text-white/70 text-sm">
                    Most enterprise implementations are completed within 4-6 weeks, with initial value delivered in as little as 2 weeks.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Integration Options</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Code className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">API Integration</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Connect to our secure REST APIs to access PSQRD's zero-hallucination capabilities from your applications.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Comprehensive API documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>SDKs for major programming languages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Webhook support for event-driven architecture</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Server className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">On-Premises Deployment</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Deploy PSQRD's technology within your own infrastructure for maximum security and compliance.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Containerized deployment options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Air-gapped environments supported</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Hardware requirements optimization</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Enterprise SaaS</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Access PSQRD's technology through our secure, scalable cloud platform with enterprise-grade security.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>SOC 2 Type II compliant infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>99.99% uptime SLA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Dedicated tenant options available</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Hybrid Solutions</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Combine on-premises and cloud components for the optimal balance of security and scalability.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Keep sensitive data on-premises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Leverage cloud for scalable processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Secure VPN connectivity options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Enterprise Readiness</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-white mb-1">SOC 2</h4>
                  <p className="text-white/60 text-xs">Type II Compliant</p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-white mb-1">HIPAA</h4>
                  <p className="text-white/60 text-xs">Compliant</p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-white mb-1">GDPR</h4>
                  <p className="text-white/60 text-xs">Compliant</p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-white mb-1">SSO</h4>
                  <p className="text-white/60 text-xs">SAML, OIDC</p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-white mb-1">Encryption</h4>
                  <p className="text-white/60 text-xs">AES-256</p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-white mb-1">SLA</h4>
                  <p className="text-white/60 text-xs">99.99% Uptime</p>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="/security-whitepaper"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium rounded-lg transition-colors border border-purple-500/20"
                >
                  Download Security Whitepaper
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-900/30 to-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Implementation Success Stories</h3>
              <p className="text-white/80 mb-6">
                Our implementation team has successfully deployed PSQRD's technology across diverse enterprise environments.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-300 font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Global Financial Institution</h4>
                    <p className="text-white/70 text-sm">
                      Implemented across 12 departments in 6 weeks, reducing research time by 78%.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-300 font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Healthcare Provider Network</h4>
                    <p className="text-white/70 text-sm">
                      HIPAA-compliant deployment across 8 hospitals in 4 weeks, improving clinical documentation accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-300 font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Legal Services Firm</h4>
                    <p className="text-white/70 text-sm">
                      API integration with existing legal research platform completed in 3 weeks, reducing case preparation time by 62%.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                View All Case Studies
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-black/40 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">Implementation Support</h4>
              <p className="text-white/80 mb-4">
                Our dedicated implementation team provides comprehensive support throughout the process:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/70">Dedicated implementation manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/70">Technical integration specialists</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/70">Comprehensive documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/70">User training programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/70">24/7 support during implementation</span>
                </li>
              </ul>
              <div className="text-center">
                <a
                  href="/implementation-guide"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium rounded-lg transition-colors border border-purple-500/20"
                >
                  Download Implementation Guide
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
