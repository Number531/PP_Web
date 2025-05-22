"use client"

import { motion } from "framer-motion"
import { ClientOnly } from "@/app/shared/components/ClientOnly"

interface BlogHeaderProps {
  title: string
  subtitle: string
}

export function BlogHeader({ title, subtitle }: BlogHeaderProps) {
  return (
    <ClientOnly fallback={
      <div className="max-w-4xl mx-auto text-center px-4 py-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 px-2 md:px-0 overflow-visible leading-relaxed pb-2">{title}</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    }>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center px-4 py-6"
      >
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 px-2 md:px-0 overflow-visible leading-relaxed pb-2">
        {title}
      </h1>
      <p className="text-xl text-white/80 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
    </motion.div>
    </ClientOnly>
  )
}
