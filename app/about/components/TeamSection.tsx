"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter, Github } from "lucide-react"

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
  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Elena Chen",
      role: "Founder & CEO",
      bio: "Former AI research lead at Stanford NLP. Pioneered work in factual consistency for large language models.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "https://linkedin.com/in/elena-chen",
        twitter: "https://twitter.com/elenachen",
      },
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Previously led engineering at OpenAI. Expert in retrieval-augmented generation and knowledge graphs.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "https://linkedin.com/in/michael-rodriguez",
        github: "https://github.com/mrodriguez",
      },
    },
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Research Officer",
      bio: "PhD in Machine Learning from MIT. Published over 30 papers on factual verification in AI systems.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "https://linkedin.com/in/sarah-johnson",
        twitter: "https://twitter.com/sarahjohnson",
        github: "https://github.com/sjohnson",
      },
    },
    {
      name: "David Kim",
      role: "VP of Product",
      bio: "Former product leader at Google AI. Passionate about building AI products that people can trust.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "https://linkedin.com/in/david-kim",
        twitter: "https://twitter.com/davidkim",
      },
    },
  ]

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We've assembled a world-class team of researchers, engineers, and industry experts united by our mission to
            build AI that people can trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                <p className="text-white/70 mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-purple-400 transition-colors"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-purple-400 transition-colors"
                      aria-label={`${member.name}'s Twitter profile`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-purple-400 transition-colors"
                      aria-label={`${member.name}'s GitHub profile`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/80">
            Our team also includes 50+ researchers, engineers, and AI specialists working together to build the future
            of trustworthy AI.
          </p>
          <a
            href="/careers"
            className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Join our team →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
