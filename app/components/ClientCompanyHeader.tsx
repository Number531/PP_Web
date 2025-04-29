'use client'

import { Suspense } from 'react'
import { CompanyHeader } from './CompanyHeader'

export function ClientCompanyHeader() {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <CompanyHeader />
    </Suspense>
  )
}
