'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CompanyHeader } from './CompanyHeader'

export function PersistentHeader() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  // Only render the header client-side to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render anything during SSR or on the chat page
  if (!mounted || pathname === '/chat') {
    return null
  }
  
  return <CompanyHeader />
}
