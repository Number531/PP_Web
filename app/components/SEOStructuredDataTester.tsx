'use client'

import { useState } from 'react'

/**
 * SEO Structured Data Tester Component
 * 
 * A development tool to test and validate structured data implementation
 * Only visible in development mode
 */
export function SEOStructuredDataTester() {
  const [testResults, setTestResults] = useState<null | {
    valid: boolean
    errors: string[]
    warnings: string[]
  }>(null)
  
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Function to test structured data
  const testStructuredData = async () => {
    setLoading(true)
    try {
      // This would normally call an API to validate the structured data
      // For demonstration, we're simulating the validation
      
      // Get all script elements with type application/ld+json
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      
      if (scripts.length === 0) {
        setTestResults({
          valid: false,
          errors: ['No structured data found on the page'],
          warnings: []
        })
        return
      }
      
      const errors: string[] = []
      const warnings: string[] = []
      
      // Validate each script
      scripts.forEach((script, index) => {
        try {
          const json = JSON.parse(script.textContent || '')
          
          // Check for required properties based on @type
          if (json['@type'] === 'Organization' && !json.name) {
            errors.push(`Organization schema missing required property 'name'`)
          }
          
          if (json['@type'] === 'Product' && !json.offers) {
            warnings.push(`Product schema missing recommended property 'offers'`)
          }
          
          if (json['@type'] === 'FAQPage' && (!json.mainEntity || json.mainEntity.length === 0)) {
            errors.push(`FAQPage schema missing required property 'mainEntity'`)
          }
          
          // Check for proper URL formatting
          if (json.url && !json.url.startsWith('http')) {
            errors.push(`Invalid URL format in schema #${index + 1}: ${json.url}`)
          }
        } catch (e) {
          errors.push(`Invalid JSON in schema #${index + 1}: ${e}`)
        }
      })
      
      setTestResults({
        valid: errors.length === 0,
        errors,
        warnings
      })
    } catch (e) {
      console.error('Error testing structured data:', e)
      setTestResults({
        valid: false,
        errors: [`Error testing structured data: ${e}`],
        warnings: []
      })
    } finally {
      setLoading(false)
    }
  }
  
  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }
  
  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 max-w-md">
      <h3 className="text-lg font-bold mb-2">Structured Data Tester</h3>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL or leave empty for current page"
          className="flex-1 px-3 py-2 border rounded-l-md"
        />
        <button
          onClick={testStructuredData}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test'}
        </button>
      </div>
      
      {testResults && (
        <div className="mt-4">
          <div className={`p-2 rounded-md mb-2 ${testResults.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {testResults.valid ? 'Structured data is valid!' : 'Structured data has errors'}
          </div>
          
          {testResults.errors.length > 0 && (
            <div className="mt-2">
              <h4 className="font-bold text-red-600">Errors:</h4>
              <ul className="list-disc pl-5">
                {testResults.errors.map((error, i) => (
                  <li key={i} className="text-sm">{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {testResults.warnings.length > 0 && (
            <div className="mt-2">
              <h4 className="font-bold text-yellow-600">Warnings:</h4>
              <ul className="list-disc pl-5">
                {testResults.warnings.map((warning, i) => (
                  <li key={i} className="text-sm">{warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500">
            For more comprehensive testing, use Google's{' '}
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Rich Results Test
            </a>
            {' '}or{' '}
            <a
              href="https://validator.schema.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Schema.org Validator
            </a>
          </div>
        </div>
      )}
      
      <button
        onClick={() => document.querySelector('.fixed.top-4.right-4')?.remove()}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  )
}

export default SEOStructuredDataTester
