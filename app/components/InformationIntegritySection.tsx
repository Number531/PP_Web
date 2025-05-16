'use client'

import { motion } from "framer-motion"
import { ShieldCheck, Lock, Server, Zap, ArrowRight } from "lucide-react"
import Image from "next/image"

export function InformationIntegritySection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-purple-950/10 to-black" id="information-integrity">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-medium">Core Value</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Information Integrity</span> Framework
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our comprehensive approach to maintaining information integrity throughout the entire AI lifecycle, from data ingestion to output verification.
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
              <h3 className="text-2xl font-bold mb-6">What is Information Integrity?</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Information integrity refers to the accuracy, consistency, and reliability of data throughout its lifecycle. In the context of AI, it means ensuring that information remains unaltered, uncompromised, and factually correct from input to output.
              </p>
              
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 mb-6">
                <h4 className="text-lg font-medium text-white mb-2">The Four Pillars of Information Integrity</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-300 font-medium">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Accuracy</h5>
                      <p className="text-white/70 text-sm">
                        Information correctly represents reality without distortion or fabrication.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-300 font-medium">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Consistency</h5>
                      <p className="text-white/70 text-sm">
                        Information remains logically coherent across different contexts and applications.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-300 font-medium">3</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Traceability</h5>
                      <p className="text-white/70 text-sm">
                        Information can be traced back to its original sources for verification.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-300 font-medium">4</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Security</h5>
                      <p className="text-white/70 text-sm">
                        Information is protected from unauthorized access, manipulation, or corruption.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                alt="Information integrity visualization" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Industry Recognition</h4>
                  <p className="text-white/70 text-sm">
                    PSQRD's Information Integrity Framework has been recognized by leading industry analysts as setting a new standard for AI reliability.
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
              <h3 className="text-xl font-bold mb-6">The PSQRD Information Integrity Framework</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Server className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Data Ingestion Integrity</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Source verification and validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Data quality assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Metadata preservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Provenance tracking</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Processing Integrity</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Secure computation environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Transformation validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Logical consistency checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Audit logging</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Generation Integrity</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Real-time fact verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Hallucination detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Contextual awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Confidence scoring</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Output Integrity</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Citation generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Verification links</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Confidence indicators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                      <span>Tamper-proof delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Information Integrity Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Accuracy Rate</h4>
                    <span className="text-green-400 font-bold">99.7%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full" style={{ width: '99.7%' }}></div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Source Verification</h4>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Hallucination Rate</h4>
                    <span className="text-green-400 font-bold">0.01%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-purple-500 h-2 rounded-full" style={{ width: '0.01%' }}></div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Consistency Score</h4>
                    <span className="text-green-400 font-bold">98.5%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="/technical-whitepaper"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium rounded-lg transition-colors border border-purple-500/20"
                >
                  Download Technical Whitepaper
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
              <h3 className="text-2xl font-bold mb-4">Information Integrity for Your Industry</h3>
              <p className="text-white/80 mb-6">
                Discover how PSQRD's Information Integrity Framework can be tailored to meet the specific requirements of your industry.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                  href="/industries/finance"
                  className="px-4 py-2 bg-black/30 hover:bg-purple-600/20 text-white text-center font-medium rounded-lg transition-colors border border-purple-500/10"
                >
                  Finance
                </a>
                <a
                  href="/industries/healthcare"
                  className="px-4 py-2 bg-black/30 hover:bg-purple-600/20 text-white text-center font-medium rounded-lg transition-colors border border-purple-500/10"
                >
                  Healthcare
                </a>
                <a
                  href="/industries/legal"
                  className="px-4 py-2 bg-black/30 hover:bg-purple-600/20 text-white text-center font-medium rounded-lg transition-colors border border-purple-500/10"
                >
                  Legal
                </a>
                <a
                  href="/industries/government"
                  className="px-4 py-2 bg-black/30 hover:bg-purple-600/20 text-white text-center font-medium rounded-lg transition-colors border border-purple-500/10"
                >
                  Government
                </a>
              </div>
              <a
                href="/request-demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Request Industry-Specific Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-black/40 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">Regulatory Compliance</h4>
              <p className="text-white/80 mb-4">
                PSQRD's Information Integrity Framework helps organizations meet regulatory requirements across multiple jurisdictions:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/20 p-3 rounded border border-purple-500/10">
                  <h5 className="font-medium text-white mb-1">GDPR</h5>
                  <p className="text-white/60 text-sm">Data accuracy & transparency requirements</p>
                </div>
                <div className="bg-black/20 p-3 rounded border border-purple-500/10">
                  <h5 className="font-medium text-white mb-1">HIPAA</h5>
                  <p className="text-white/60 text-sm">Healthcare information integrity standards</p>
                </div>
                <div className="bg-black/20 p-3 rounded border border-purple-500/10">
                  <h5 className="font-medium text-white mb-1">SOX</h5>
                  <p className="text-white/60 text-sm">Financial reporting accuracy requirements</p>
                </div>
                <div className="bg-black/20 p-3 rounded border border-purple-500/10">
                  <h5 className="font-medium text-white mb-1">FINRA</h5>
                  <p className="text-white/60 text-sm">Financial information integrity guidelines</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
