"use client"

import { useEffect, useState } from "react"

export function ReadingProgressBar() {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    // Add scroll event listener
    const modalContent = document.querySelector('.blog-modal-content')
    if (modalContent) {
      modalContent.addEventListener('scroll', () => {
        const currentProgress = modalContent.scrollTop
        const scrollHeight = modalContent.scrollHeight - modalContent.clientHeight
        
        if (scrollHeight) {
          setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
        }
      })
    } else {
      window.addEventListener('scroll', updateReadingProgress)
    }

    // Call initially
    updateReadingProgress()

    return () => {
      if (modalContent) {
        modalContent.removeEventListener('scroll', updateReadingProgress)
      } else {
        window.removeEventListener('scroll', updateReadingProgress)
      }
    }
  }, [])

  return (
    <div className="h-1 bg-purple-900/30 w-full sticky top-0 z-20">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  )
}
