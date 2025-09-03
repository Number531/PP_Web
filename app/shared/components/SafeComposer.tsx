"use client"

import React from "react"
import { useThree } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"

type ComposerChildren = { children: JSX.Element | JSX.Element[] }

class ComposerErrorBoundary extends React.Component<ComposerChildren, { hasError: boolean }> {
  constructor(props: ComposerChildren) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    // Swallow composer errors (e.g., shader compilation issues) and render nothing
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export function SafeComposer({ children }: ComposerChildren) {
  const { gl } = useThree()
  // Guard: only enable postprocessing when WebGL2 is available to prevent Safari runtime errors
  const isWebGL2 = (gl as any)?.capabilities?.isWebGL2 === true
  if (!isWebGL2) return null

  return (
    <ComposerErrorBoundary>
      <EffectComposer>{children}</EffectComposer>
    </ComposerErrorBoundary>
  )
}

export default SafeComposer
