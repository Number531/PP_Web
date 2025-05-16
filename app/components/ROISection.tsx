'use client'

import { motion } from "framer-motion"
import { DollarSign, Clock, BadgeCheck, TrendingUp } from "lucide-react"

export function ROISection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-black/5" id="roi-benefits">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Business Value</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Return on <span className="text-gradient">Investment</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Discover how PSQRD's zero-hallucination AI delivers measurable business value through improved accuracy, efficiency, and reduced risk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Quantifiable Benefits</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Organizations implementing PSQRD's zero-hallucination AI technology typically see significant returns across multiple business dimensions:
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Time Savings</h4>
                  <p className="text-white/70 mb-3">
                    Reduce fact-checking and verification time by up to 85% with automated source verification.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Manual verification</span>
                      <span className="text-white/80">4.5 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">With PSQRD</span>
                      <span className="text-purple-400 font-medium">40 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Cost Reduction</h4>
                  <p className="text-white/70 mb-3">
                    Lower costs associated with misinformation, errors, and compliance issues.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Average error cost</span>
                      <span className="text-white/80">$270K/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">With PSQRD</span>
                      <span className="text-purple-400 font-medium">$32K/year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <BadgeCheck className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Quality Improvements</h4>
                  <p className="text-white/70">
                    Enhance the quality and reliability of AI-generated content and insights.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Accuracy Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '99.7%' }}></div>
                    </div>
                    <span className="text-purple-400 font-medium">99.7%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/80">User Trust Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-purple-400 font-medium">94%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Content Reliability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '98%' }}></div>
                    </div>
                    <span className="text-purple-400 font-medium">98%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">ROI Timeline</h4>
                  <p className="text-white/70">
                    Typical return on investment timeline for PSQRD implementation.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative pt-6">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-black/30"></div>
                  <div className="absolute top-0 left-0 w-1/4 h-0.5 bg-purple-500"></div>
                  
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto -mt-1.5 mb-2"></div>
                      <p className="text-sm text-white/80">Implementation</p>
                      <p className="text-xs text-white/60">Week 1</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto -mt-1.5 mb-2"></div>
                      <p className="text-sm text-white/80">Initial ROI</p>
                      <p className="text-xs text-white/60">Month 3</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-black/30 rounded-full mx-auto -mt-1.5 mb-2"></div>
                      <p className="text-sm text-white/80">Break-even</p>
                      <p className="text-xs text-white/60">Month 6</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-black/30 rounded-full mx-auto -mt-1.5 mb-2"></div>
                      <p className="text-sm text-white/80">Full ROI</p>
                      <p className="text-xs text-white/60">Year 1</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Average ROI</span>
                    <span className="text-purple-400 font-medium">327%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Payback period</span>
                    <span className="text-purple-400 font-medium">6 months</span>
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
          className="text-center"
        >
          <a
            href="/roi-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Calculate your potential ROI
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <p className="text-white/60 text-sm mt-2">
            Get a personalized ROI analysis based on your organization's specific needs
          </p>
        </motion.div>
      </div>
    </section>
  )
}
