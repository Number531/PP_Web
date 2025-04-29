'use client'

import { useEffect } from 'react'
import { patchWebGLBufferWarnings } from '@/app/shared/utils/webgl-error-handler'

export function WebGLErrorHandler() {
  useEffect(() => {
    // Apply WebGL error handling patches when the component mounts
    patchWebGLBufferWarnings()
  }, [])

  // This component doesn't render anything
  return null
}
