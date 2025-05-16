'use client'

import { motion } from "framer-motion"
import { Database, Shield, FileCheck, Link, ExternalLink } from "lucide-react"
import Image from "next/image"

export function SourceVerificationSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-purple-950/20" id="source-verification">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Database className="w-4 h-4" />
            <span className="text-sm font-medium">Core Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Source Verification</span> Technology
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            PSQRD's proprietary source verification system ensures every piece of information is traced back to reliable, authoritative sources.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 space-y-8"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Why Source Verification Matters</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                In an era of information overload, the ability to verify sources is critical for maintaining trust and accuracy. PSQRD's source verification technology addresses this challenge by:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Ensuring Information Integrity</h4>
                    <p className="text-white/70 text-sm">
                      Every piece of information is traced back to its original source, ensuring nothing is fabricated.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <FileCheck className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Building Trust Through Transparency</h4>
                    <p className="text-white/70 text-sm">
                      Users can verify any information by accessing the linked sources, creating complete transparency.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Link className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Enabling Compliance</h4>
                    <p className="text-white/70 text-sm">
                      For regulated industries, source verification provides an audit trail that meets compliance requirements.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                alt="Source verification process" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Enterprise-Grade Verification</h4>
                  <p className="text-white/70 text-sm">
                    Our source verification system is trusted by Fortune 500 companies in highly regulated industries.
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
              <h3 className="text-xl font-bold mb-6">The PSQRD Source Verification Process</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/20"></div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">1</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Source Identification</h4>
                    <p className="text-white/70 mb-3">
                      Our system identifies potential sources for every piece of information generated.
                    </p>
                    <div className="bg-black/20 p-3 rounded text-white/60 text-sm">
                      <code>Analyzing claim: "Company X reported 12.7% revenue growth in Q2 2025"</code>
                    </div>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">2</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Source Evaluation</h4>
                    <p className="text-white/70 mb-3">
                      Sources are evaluated for reliability, recency, and authority using our proprietary scoring system.
                    </p>
                    <div className="bg-black/20 p-3 rounded text-white/60 text-sm">
                      <code>Source found: Company X Q2 2025 Earnings Report (Official Document)<br/>
                      Reliability Score: 98/100 | Authority Score: 100/100 | Recency: Current</code>
                    </div>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">3</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Content Verification</h4>
                    <p className="text-white/70 mb-3">
                      The specific claim is verified against the source content using semantic matching.
                    </p>
                    <div className="bg-black/20 p-3 rounded text-white/60 text-sm">
                      <code>Verifying claim against source content...<br/>
                      Match found on page 4: "We are pleased to report a 12.7% increase in revenue compared to Q2 2024."</code>
                    </div>
                  </div>
                  
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-medium">4</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Citation Generation</h4>
                    <p className="text-white/70 mb-3">
                      A verifiable citation is generated and attached to the content, allowing users to trace information back to its source.
                    </p>
                    <div className="bg-black/20 p-3 rounded text-white/60 text-sm">
                      <code>Citation generated: Company X (2025). Q2 2025 Earnings Report, p.4.<br/>
                      Verification Status: VERIFIED ✓</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Supported Source Types</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-medium text-white mb-2">Academic Sources</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Peer-reviewed journals</li>
                    <li>• Research papers</li>
                    <li>• Academic databases</li>
                    <li>• Conference proceedings</li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-medium text-white mb-2">Business Sources</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Financial reports</li>
                    <li>• SEC filings</li>
                    <li>• Press releases</li>
                    <li>• Annual reports</li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-medium text-white mb-2">Government Sources</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Official publications</li>
                    <li>• Regulatory documents</li>
                    <li>• Public records</li>
                    <li>• Legislative texts</li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-medium text-white mb-2">Industry Sources</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Industry reports</li>
                    <li>• White papers</li>
                    <li>• Technical documentation</li>
                    <li>• Standards documents</li>
                  </ul>
                </div>
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
              <h3 className="text-2xl font-bold mb-4">See Source Verification in Action</h3>
              <p className="text-white/80 mb-6">
                Experience how PSQRD's source verification technology transforms the way your organization handles information.
              </p>
              <a
                href="/request-demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Schedule a Demo
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-black/40 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">Client Testimonial</h4>
              <blockquote className="text-white/80 italic mb-4">
                "PSQRD's source verification technology has transformed our research process. We've reduced verification time by 82% while increasing our confidence in the accuracy of our reports."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-300 font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium text-white">James Donovan</p>
                  <p className="text-white/60 text-sm">Chief Research Officer, Global Financial Services</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
