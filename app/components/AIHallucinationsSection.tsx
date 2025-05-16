'use client'

import { motion } from "framer-motion"
import { AlertTriangle, ShieldCheck, Brain, BarChart, ArrowRight } from "lucide-react"
import Image from "next/image"

export function AIHallucinationsSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-purple-950/10 to-black" id="ai-hallucinations">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Critical Challenge</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Understanding <span className="text-gradient">AI Hallucinations</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            AI hallucinations represent one of the most significant challenges in enterprise AI adoption. Learn how PSQRD eliminates this critical issue.
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
              <h3 className="text-2xl font-bold mb-6">What Are AI Hallucinations?</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                AI hallucinations occur when language models generate content that appears plausible but is factually incorrect, fabricated, or nonsensical. These hallucinations can take several forms:
              </p>
              
              <div className="space-y-6">
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <h4 className="text-lg font-medium text-white">Factual Fabrications</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    The AI generates entirely false information that has no basis in reality, such as inventing statistics, events, or quotes that don't exist.
                  </p>
                </div>
                
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <h4 className="text-lg font-medium text-white">Misattributions</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    The AI correctly states a fact but incorrectly attributes it to the wrong source, time period, or context.
                  </p>
                </div>
                
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <h4 className="text-lg font-medium text-white">Temporal Confusion</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    The AI mixes up timeframes, presenting outdated information as current or future events as if they've already occurred.
                  </p>
                </div>
                
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <h4 className="text-lg font-medium text-white">Logical Inconsistencies</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    The AI generates content that contains internal contradictions or violates basic principles of logic.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                alt="AI hallucination visualization" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">The Business Impact</h4>
                  <p className="text-white/70 text-sm">
                    AI hallucinations cost enterprises an estimated $7.5M annually in verification costs, compliance risks, and reputational damage.
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
              <h3 className="text-xl font-bold mb-6">Why Do AI Hallucinations Occur?</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/20"></div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-300" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Training Data Limitations</h4>
                    <p className="text-white/70">
                      AI models are trained on vast but finite datasets, which may contain inaccuracies, biases, or outdated information. When asked about topics outside their training data, models attempt to generate plausible-sounding responses rather than admitting ignorance.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-300" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Pattern Completion</h4>
                    <p className="text-white/70">
                      Language models work by predicting the most likely next word or phrase based on patterns they've learned. This can lead to generating content that follows familiar patterns but isn't factually accurate.
                    </p>
                  </div>
                  
                  <div className="relative pl-12 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-300" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Lack of Real-World Grounding</h4>
                    <p className="text-white/70">
                      Traditional AI models have no mechanism to verify information against real-world sources or to distinguish between fact and fiction. They operate purely on statistical patterns in text.
                    </p>
                  </div>
                  
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-300" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Overconfidence</h4>
                    <p className="text-white/70">
                      AI models typically provide responses with high confidence even when uncertain, lacking the human ability to express doubt or qualify statements appropriately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6">PSQRD's Hallucination Prevention System</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/20 p-4 rounded-lg border border-green-500/10">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-green-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Real-time Fact Verification</h4>
                  <p className="text-white/70 text-sm">
                    Our system continuously verifies every generated statement against trusted knowledge bases and authoritative sources in real-time.
                  </p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-green-500/10">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-green-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Source Triangulation</h4>
                  <p className="text-white/70 text-sm">
                    Critical information is verified against multiple independent sources to ensure consistency and accuracy.
                  </p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-green-500/10">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-green-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Logical Consistency Checking</h4>
                  <p className="text-white/70 text-sm">
                    Our proprietary algorithms detect and correct logical inconsistencies and contradictions in generated content.
                  </p>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-green-500/10">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-green-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Confidence Scoring</h4>
                  <p className="text-white/70 text-sm">
                    Every piece of information is assigned a confidence score based on source reliability and verification level.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-white mb-4">Hallucination Elimination Results</h4>
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <BarChart className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">99.7%</div>
                      <p className="text-white/60 text-xs">Accuracy Rate</p>
                    </div>
                    
                    <div className="text-center">
                      <BarChart className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">0.01%</div>
                      <p className="text-white/60 text-xs">Hallucination Rate</p>
                    </div>
                    
                    <div className="text-center">
                      <BarChart className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">100%</div>
                      <p className="text-white/60 text-xs">Source Verification</p>
                    </div>
                    
                    <div className="text-center">
                      <BarChart className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">92%</div>
                      <p className="text-white/60 text-xs">Time Savings</p>
                    </div>
                  </div>
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
              <h3 className="text-2xl font-bold mb-4">Real-World Hallucination Examples</h3>
              <p className="text-white/80 mb-6">
                See how PSQRD's technology identifies and eliminates hallucinations that other AI systems would present as facts.
              </p>
              
              <div className="space-y-6">
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <h4 className="text-lg font-medium text-white">Standard AI Output</h4>
                  </div>
                  <p className="text-white/70 mb-2">
                    "In 2022, Company X released their groundbreaking quantum computing chip with 512 qubits, doubling the capacity of their nearest competitor."
                  </p>
                  <p className="text-red-400 text-sm">
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    Hallucination: No such chip was released in 2022. The most advanced chip had 127 qubits.
                  </p>
                </div>
                
                <div className="bg-black/40 p-4 rounded-lg border border-green-500/20">
                  <div className="flex items-start gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <h4 className="text-lg font-medium text-white">PSQRD AI Output</h4>
                  </div>
                  <p className="text-white/70 mb-2">
                    "As of 2022, the most advanced quantum computing chip commercially available featured 127 qubits, released by Company Y in November 2021."
                  </p>
                  <p className="text-green-400 text-sm">
                    <ShieldCheck className="w-3 h-3 inline mr-1" />
                    Verified: Company Y Press Release (Nov 2021), Quantum Computing Industry Report (Jan 2022)
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="/request-demo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  See Hallucination Prevention in Action
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                <h4 className="text-lg font-medium text-white mb-3">Industry-Specific Hallucination Risks</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Financial Services</h5>
                      <p className="text-white/70 text-sm">
                        Hallucinated financial data leading to investment losses and compliance violations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Healthcare</h5>
                      <p className="text-white/70 text-sm">
                        Fabricated medical information potentially impacting patient care and safety
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Legal</h5>
                      <p className="text-white/70 text-sm">
                        Hallucinated case law or statutes leading to flawed legal advice and liability
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Government</h5>
                      <p className="text-white/70 text-sm">
                        Fabricated policy information affecting public trust and decision-making
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="/hallucination-whitepaper"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium rounded-lg transition-colors border border-purple-500/20"
                >
                  Download AI Hallucination Risk Report
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
