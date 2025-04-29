"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProductPricing() {
  const plans = [
    {
      name: "Starter",
      description: "For small teams and individual professionals",
      price: "$499",
      period: "per month",
      features: [
        "Basic source verification",
        "Standard knowledge graph access",
        "Email support",
        "Single user license",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "For growing teams with advanced needs",
      price: "$1,499",
      period: "per month",
      features: [
        "Advanced source verification",
        "Full knowledge graph access",
        "API access",
        "Priority support",
        "Up to 10 user licenses",
        "Custom training (5 hours)",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For organizations with complex requirements",
      price: "Custom",
      period: "tailored pricing",
      features: [
        "Premium source verification",
        "Custom knowledge graph integration",
        "Full API access",
        "24/7 dedicated support",
        "Unlimited user licenses",
        "Custom training (20+ hours)",
        "On-premises deployment option",
        "Custom SLAs",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Choose the plan that's right for your organization. All plans include our core hallucination-free AI
            technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-black/20 backdrop-blur-sm border ${plan.popular ? "border-purple-500/50" : "border-purple-500/20"} rounded-lg p-6 relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                <div className="text-3xl font-bold">{plan.price}</div>
                <div className="text-white/60 text-sm">{plan.period}</div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "#"}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-medium transition-colors ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-black/30 hover:bg-black/40 text-white border border-purple-500/20"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60">
            All plans include a 14-day free trial. No credit card required.
            <br />
            Need a custom solution?{" "}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300">
              Contact our sales team
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
