"use client"

import { useEffect, useLayoutEffect } from 'react'

// Use useLayoutEffect in browser environments and useEffect during SSR
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
