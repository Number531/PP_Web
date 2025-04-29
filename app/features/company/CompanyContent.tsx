"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Layers, Shield, Zap } from "lucide-react"
import { useInView } from "react-intersection-observer"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { LinkComponent } from "@/app/components/LinkComponent"
import { LoadingPlaceholder } from "@/app/components/ui/LoadingPlaceholder"

// Dynamically import UI components
const GlassCard = dynamic(() => import("../ui/GlassCard").then((mod) => ({ default: mod.GlassCard })), {
  ssr: true,
})

const FeatureHighlight = dynamic(
  () => import("../ui/FeatureHighlight").then((mod) => ({ default: mod.FeatureHighlight })),
  {
    ssr: true,
  },
)

const GradientButton = dynamic(() => import("../ui/GradientButton").then((mod) => ({ default: mod.GradientButton })), {
  ssr: true,
})

const ParallaxSection = dynamic(
  () => import("../ui/ParallaxSection").then((mod) => ({ default: mod.ParallaxSection })),
  {
    ssr: false,
  },
)

const AnimatedCounter = dynamic(
  () => import("../ui/AnimatedCounter").then((mod) => ({ default: mod.AnimatedCounter })),
  {
    ssr: false,
  },
)

interface CompanyContentProps {
  isVisible: boolean
}

export function CompanyContent({ isVisible }: CompanyContentProps) {
  // Use intersection observer to trigger animations when content comes into view
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Explorer functionality removed

  if (!isVisible) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const features = [
    {
      icon: Layers,
      title: "Validated Accuracy",
      description:
        "Our proprietary technology eliminates AI hallucinations, ensuring every output is factually accurate and reliable for high-stakes industries.",
    },
    {
      icon: Shield,
      title: "Source Transparency",
      description:
        "Every insight comes with linked sources, allowing instant verification and building trust in AI-generated information.",
    },
    {
      icon: Zap,
      title: "99% Efficiency Boost",
      description:
        "Transform your workflow with AI that delivers accurate results in seconds instead of hours, dramatically reducing research and verification time.",
    },
    {
      icon: CheckCircle,
      title: "Enterprise Security",
      description:
        "Built with rigorous security standards and compliance measures to protect sensitive data in regulated industries.",
    },
  ]

  return (
    <div className="relative z-30 bg-gradient-to-b from-black/95 to-black/90 min-h-screen">
      <motion.div
        ref={ref}
        className="premium-container py-24"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Suspense fallback={<LoadingPlaceholder text="Loading content..." />}>
          <ParallaxSection speed={0.2} direction="up">
            <motion.div className="max-w-4xl mx-auto" variants={containerVariants}>
              <motion.p className="overline text-purple-400 mb-3" variants={itemVariants}>
                Enterprise AI Solution
              </motion.p>

              <motion.h2 className="display text-balance mb-8" variants={itemVariants}>
                Eliminate <span className="text-gradient">AI Hallucinations</span>
                <br />
                Forever
              </motion.h2>

              <motion.p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl" variants={itemVariants}>
                PSQRD delivers independently validated accuracy, giving you complete confidence in AI-generated content
                for critical business decisions.
              </motion.p>

              {/* Stats section */}
              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" variants={containerVariants}>
                <Suspense fallback={<div className="h-24 bg-black/20 rounded-lg animate-pulse" />}>
                  <GlassCard variant="dark" className="text-center py-8" glowEffect>
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                      <AnimatedCounter value={99.9} formatValue={(val) => `${val.toFixed(1)}%`} />
                    </div>
                    <p className="text-sm text-white/70">Accuracy Rate</p>
                  </GlassCard>
                </Suspense>

                <Suspense fallback={<div className="h-24 bg-black/20 rounded-lg animate-pulse" />}>
                  <GlassCard variant="dark" className="text-center py-8">
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                      <AnimatedCounter value={100} formatValue={(val) => `${val.toFixed(0)}x`} />
                    </div>
                    <p className="text-sm text-white/70">Faster Research</p>
                  </GlassCard>
                </Suspense>

                <Suspense fallback={<div className="h-24 bg-black/20 rounded-lg animate-pulse" />}>
                  <GlassCard variant="dark" className="text-center py-8">
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                      <AnimatedCounter value={78} formatValue={(val) => `${val.toFixed(0)}%`} />
                    </div>
                    <p className="text-sm text-white/70">Trust Increase</p>
                  </GlassCard>
                </Suspense>

                <Suspense fallback={<div className="h-24 bg-black/20 rounded-lg animate-pulse" />}>
                  <GlassCard variant="dark" className="text-center py-8">
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                      <AnimatedCounter value={92} formatValue={(val) => `${val.toFixed(0)}%`} />
                    </div>
                    <p className="text-sm text-white/70">Time Savings</p>
                  </GlassCard>
                </Suspense>
              </motion.div>

              {/* Features grid */}
              <motion.div className="grid md:grid-cols-2 gap-8 mb-16" variants={containerVariants}>
                {features.map((feature, index) => (
                  <Suspense key={index} fallback={<div className="h-64 bg-black/20 rounded-lg animate-pulse" />}>
                    <FeatureHighlight
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      delay={index * 0.1}
                    />
                  </Suspense>
                ))}
              </motion.div>

              {/* Industries section */}
              <motion.p className="overline text-purple-400 mb-2" variants={itemVariants}>
                Industry Impact
              </motion.p>

              <motion.h3 className="text-2xl font-medium text-white mb-6" variants={itemVariants}>
                Trusted By Industry Leaders
              </motion.h3>

              <motion.div className="grid md:grid-cols-2 gap-6 mb-16" variants={containerVariants}>
                <Suspense fallback={<div className="h-48 bg-black/20 rounded-lg animate-pulse" />}>
                  <GlassCard variant="purple">
                    <h4 className="text-lg font-medium text-purple-400 mb-2">News Media</h4>
                    <p className="text-white/70 mb-4">
                      Accelerate fact-checking, enhance research capabilities, and restore audience trust with AI that
                      never fabricates information.
                    </p>
                    <p className="quote text-white/50 text-base italic mb-4">
                      "Reduced fact-checking time by 78% while improving accuracy."
                    </p>
                    <div className="flex justify-end">
                      <LinkComponent href="/solutions/news">Learn more</LinkComponent>
                    </div>
                  </GlassCard>
                </Suspense>

                <Suspense fallback={<div className="h-48 bg-black/20 rounded-lg animate-pulse" />}>
                  <GlassCard variant="purple">
                    <h4 className="text-lg font-medium text-purple-400 mb-2">Legal Firms</h4>
                    <p className="text-white/70 mb-4">
                      Conduct due diligence, research precedents, and build case strategies with unprecedented speed and
                      reliability.
                    </p>
                    <p className="quote text-white/50 text-base italic mb-4">
                      "Over 99.9% accuracy in precedent identification with 92% time savings."
                    </p>
                    <div className="flex justify-end">
                      <LinkComponent href="/solutions/legal">Learn more</LinkComponent>
                    </div>
                  </GlassCard>
                </Suspense>
              </motion.div>

              {/* Call to action */}
              <Suspense fallback={<div className="h-64 bg-black/20 rounded-lg animate-pulse" />}>
                <motion.div
                  className="premium-card bg-black/60 border border-purple-500/30 p-10 text-center"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-medium text-white mb-4">Ready to experience AI you can trust?</h3>
                  <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                    See how PSQRD can transform your operations with guaranteed accuracy, source transparency, and
                    unprecedented efficiency.
                  </p>

                  <div className="flex items-center justify-center">
                    <GradientButton
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="w-5 h-5" />}
                      iconPosition="right"
                      className="w-full sm:w-auto max-w-xs"
                    >
                      Request Demo
                    </GradientButton>
                  </div>
                </motion.div>
              </Suspense>
            </motion.div>
          </ParallaxSection>
        </Suspense>
      </motion.div>
    </div>
  )
}

export default CompanyContent
