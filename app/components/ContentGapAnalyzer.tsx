'use client'

import { useEffect, useState } from 'react'

/**
 * Component to analyze content gaps and provide recommendations
 * - Identifies missing subtopics in your content
 * - Suggests related topics to improve topical authority
 * - Analyzes semantic coverage of key concepts
 */
export function ContentGapAnalyzer() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{
    missingTopics: string[],
    weakTopics: string[],
    recommendations: string[]
  }>({
    missingTopics: [],
    weakTopics: [],
    recommendations: []
  })
  
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') return
    
    // Analyze the content for gaps
    const content = document.querySelector('main')?.textContent?.toLowerCase() || ''
    
    // Key topics that should be covered for zero-hallucination AI
    const keyTopics = [
      { name: 'factual consistency', keywords: ['factual', 'consistency', 'accurate', 'accuracy'] },
      { name: 'source verification', keywords: ['source', 'verification', 'verify', 'evidence', 'proof'] },
      { name: 'information integrity', keywords: ['integrity', 'reliable', 'trustworthy', 'trust'] },
      { name: 'enterprise applications', keywords: ['enterprise', 'business', 'organization', 'company'] },
      { name: 'AI hallucinations', keywords: ['hallucination', 'fabrication', 'false', 'incorrect'] },
      { name: 'technical approach', keywords: ['technology', 'algorithm', 'method', 'approach', 'system'] },
      { name: 'competitive advantage', keywords: ['advantage', 'better', 'superior', 'compared', 'versus'] },
      { name: 'use cases', keywords: ['case', 'example', 'scenario', 'application'] },
      { name: 'implementation', keywords: ['implement', 'integrate', 'setup', 'deploy'] },
      { name: 'ROI', keywords: ['roi', 'return', 'investment', 'value', 'benefit', 'cost'] }
    ]
    
    // Check coverage of each topic
    const missingTopics: string[] = []
    const weakTopics: string[] = []
    
    keyTopics.forEach(topic => {
      const keywordMatches = topic.keywords.filter(kw => content.includes(kw)).length
      const coverage = keywordMatches / topic.keywords.length
      
      if (coverage === 0) {
        missingTopics.push(topic.name)
      } else if (coverage < 0.5) {
        weakTopics.push(topic.name)
      }
    })
    
    // Generate recommendations
    const recommendations = [
      ...missingTopics.map(topic => `Add content about "${topic}"`),
      ...weakTopics.map(topic => `Expand content on "${topic}"`)
    ]
    
    // Add specific recommendations based on gaps
    if (missingTopics.includes('use cases') || weakTopics.includes('use cases')) {
      recommendations.push('Add specific industry use cases (finance, healthcare, legal)')
    }
    
    if (missingTopics.includes('technical approach') || weakTopics.includes('technical approach')) {
      recommendations.push('Explain the technical approach to achieving zero hallucinations')
    }
    
    if (missingTopics.includes('ROI') || weakTopics.includes('ROI')) {
      recommendations.push('Include ROI metrics or case studies with business outcomes')
    }
    
    setAnalysisResults({
      missingTopics,
      weakTopics,
      recommendations
    })
    
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setShowAnalysis(true)
    }
  }, [])
  
  if (!showAnalysis) return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 border border-purple-500/30 rounded-lg p-4 max-w-md shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-bold">Content Gap Analysis</h3>
        <button 
          onClick={() => setShowAnalysis(false)}
          className="text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      {analysisResults.missingTopics.length > 0 && (
        <div className="mb-2">
          <h4 className="text-red-400 text-sm font-medium">Missing Topics:</h4>
          <ul className="text-white/80 text-xs list-disc pl-4">
            {analysisResults.missingTopics.map(topic => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
      
      {analysisResults.weakTopics.length > 0 && (
        <div className="mb-2">
          <h4 className="text-yellow-400 text-sm font-medium">Weak Coverage:</h4>
          <ul className="text-white/80 text-xs list-disc pl-4">
            {analysisResults.weakTopics.map(topic => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
      
      {analysisResults.recommendations.length > 0 && (
        <div>
          <h4 className="text-green-400 text-sm font-medium">Recommendations:</h4>
          <ul className="text-white/80 text-xs list-disc pl-4">
            {analysisResults.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
