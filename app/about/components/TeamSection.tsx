"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter, Github, Info, X } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export function TeamSection() {
  const [showModal, setShowModal] = useState(false)
  
  const founder: TeamMember = {
    name: "Edwin Gordon",
    role: "Founder & CEO",
    bio: "Former Quantitative Researcher with expertise in optimized system development. Pioneering the first guaranteed zero hallucination AI for enterprise applications to uphold information integrity.",
    image: "/images/team/edwin-gordon.jpg",
    social: {
      linkedin: "https://linkedin.com/in/edwin-gordon",
      twitter: "https://twitter.com/edwingordon",
    },
  }
  
  const founderDetailedBio = (
    <>
      <h3 className="text-2xl font-bold mb-4">About Edwin Gordon</h3>
      <p className="mb-4">
        With a background in Computational Philosophy and Computational Social Science, Edwin specialized in modeling how misinformation compromises integral components of a functional democracy.
      </p>
      <p className="mb-4">
        Edwin's frustration with compromised information proliferating through media platforms facilitated the initial development of Project Puritas. Information is integral to informed decision whether constructing quantitative trading models or accessing information.
      </p>
      <p>
        Compromised information deteriorates all aspects of how an individual, enterprise, government will function without all the information present. This understanding drives PSQRD's mission to deliver guaranteed zero-hallucination AI technology.
      </p>
    </>
  )

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founder</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            With a background in Computational Philosophy and Social Science, our founder is dedicated to combating misinformation
            through guaranteed zero-hallucination AI technology that ensures information integrity for enterprises worldwide.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden max-w-md"
          >
            <div className="aspect-square relative">
              <Image
                src={founder.image || "/placeholder.svg"}
                alt={founder.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-purple-400 font-medium mb-3">{founder.role}</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-white/60 hover:text-purple-400 transition-colors bg-black/20 rounded-full p-1"
                  aria-label="View more information about Edwin Gordon"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/70 mb-4">{founder.bio}</p>
              <div className="flex gap-3">
                {founder.social.linkedin && (
                  <a
                    href={founder.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                    aria-label={`${founder.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {founder.social.twitter && (
                  <a
                    href={founder.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                    aria-label={`${founder.name}'s Twitter profile`}
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {founder.social.github && (
                  <a
                    href={founder.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                    aria-label={`${founder.name}'s GitHub profile`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/80">
            We're building a team of talented researchers and engineers who share our vision for
            creating trustworthy AI systems.
          </p>
          <a
            href="/careers"
            className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Join our team →
          </a>
        </motion.div>
      </div>

      {/* Modal for detailed bio */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />
            
            {/* Modal container for perfect centering */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-black/90 border border-purple-500/30 rounded-xl text-white shadow-xl overflow-auto max-h-[90vh] p-6 md:p-8"
              >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{founder.name}</h4>
                    <p className="text-purple-400">{founder.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="text-white/90 space-y-4">
                {founderDetailedBio}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex gap-3">
                  {founder.social.linkedin && (
                    <a
                      href={founder.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-purple-400 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {founder.social.twitter && (
                    <a
                      href={founder.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-purple-400 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
