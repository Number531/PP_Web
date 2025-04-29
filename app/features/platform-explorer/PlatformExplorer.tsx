"use client"

import { motion } from "framer-motion"
import { Layers, X } from "lucide-react"
import { Text } from "@/components/ui/text"
import { GlassCard } from "../ui/GlassCard"
import { useMobile } from "@/app/shared/hooks/use-mobile"

interface PlatformExplorerProps {
  isActive: boolean
  onToggle: () => void
}

export function PlatformExplorer({ isActive, onToggle }: PlatformExplorerProps) {
  const isMobile = useMobile()

  return (
    <motion.button
      className={`fixed ${isMobile ? "bottom-4 right-4" : "bottom-8 right-8"} z-50`}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      whileHover={isMobile ? {} : { scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={isActive ? "Hide platform features" : "Explore our platform"}
      aria-expanded={isActive}
      aria-controls="platform-features"
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <GlassCard
        variant={isActive ? "purple" : "default"}
        className={`${isMobile ? "py-2 px-4" : "py-3 px-5"} flex items-center gap-2`}
        glowEffect={isActive}
      >
        {isActive ? (
          <>
            <X className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-purple-300`} aria-hidden="true" />
            <Text variant="caption" className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-white`}>
              Close
            </Text>
          </>
        ) : (
          <>
            <Layers className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-purple-300`} aria-hidden="true" />
            <Text
              variant="caption"
              className={`${isMobile ? "text-xs" : "text-sm"} font-medium tracking-wide text-white`}
            >
              {isMobile ? "Explore" : "Explore Platform"}
            </Text>
          </>
        )}
      </GlassCard>
    </motion.button>
  )
}
