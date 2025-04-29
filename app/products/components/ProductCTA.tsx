"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProductCTA() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience AI You Can Trust?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today and see how PSQRD can transform your operations with guaranteed accuracy,
            source transparency, and unprecedented efficiency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-md font-medium transition-colors w-full sm:w-auto justify-center flex items-center"
            >
              Schedule Demo
            </Link>
          </div>

          <p className="mt-6 text-white/60 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}
