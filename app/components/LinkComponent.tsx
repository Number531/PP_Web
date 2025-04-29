'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SolutionPopup } from './SolutionPopup'
import { NewsMediaContent } from '../solutions/NewsMediaContent'
import { LegalContent } from '../solutions/LegalContent'

interface LinkComponentProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkComponent({ href, children, className = '' }: LinkComponentProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  
  // Check if this is a solution link that should trigger a popup
  const isSolutionLink = href.startsWith('/solutions/')
  const solutionType = isSolutionLink ? href.split('/').pop() : ''
  
  const handleClick = (e: React.MouseEvent) => {
    if (isSolutionLink) {
      e.preventDefault()
      setIsPopupOpen(true)
    }
  }
  
  const getPopupTitle = () => {
    switch (solutionType) {
      case 'news':
        return 'News Media Solutions'
      case 'legal':
        return 'Legal Solutions'
      default:
        return 'Solution Details'
    }
  }
  
  const getPopupContent = () => {
    switch (solutionType) {
      case 'news':
        return <NewsMediaContent />
      case 'legal':
        return <LegalContent />
      default:
        return <div>Solution details not available</div>
    }
  }
  
  return (
    <>
      <Link 
        href={href} 
        className={`text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors ${className}`}
        onClick={handleClick}
        data-component-name="LinkComponent"
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </Link>
      
      {isSolutionLink && (
        <SolutionPopup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)}
          title={getPopupTitle()}
        >
          {getPopupContent()}
        </SolutionPopup>
      )}
    </>
  )
}
