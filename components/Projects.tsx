"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const featuredProjects = [
    {
      title: "Bespoke",
      slug: "bespoke",
      desc: "AI-powered talent onboarding platform with modern tech stack and intelligent matching",
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Prisma"],
      github: "https://github.com/hakoke/Bespoke",
      gradient: "from-purple-500/30 via-pink-500/30 to-red-500/30",
      featured: true,
    },
    {
      title: "Poordown.io",
      slug: "poordown",
      desc: "Real-time multiplayer Monopoly game with beautiful UI, live chat, and persistent game state",
      tech: ["Socket.IO", "PostgreSQL", "Express", "JavaScript"],
      github: "https://github.com/hakoke/MONOPOLY_working",
      gradient: "from-green-500/30 via-emerald-500/30 to-teal-500/30",
      featured: true,
    },
  ];

  const additionalProjects = [
    {
      title: "SafetyVision AI",
      slug: "safetyvision-ai",
      desc: "Advanced computer vision system for PPE detection, unauthorized access monitoring, and safety compliance using YOLOv8 and DeepStream",
      tech: ["YOLOv8", "OpenCV", "ByteTrack", "DeepStream", "AWS"],
      github: "https://github.com/hakoke/AI_Model_Training",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Capital Clash",
      slug: "capital-clash",
      desc: "Interactive multiplayer strategy game built with real-time mechanics",
      tech: ["JavaScript", "Multiplayer", "Web Games"],
      github: "https://github.com/hakoke/Capital-Clash",
      gradient: "from-orange-500/20 to-amber-500/20",
    },
    {
      title: "LLaMA Research",
      slug: "llama-research",
      desc: "Language model experimentation and fine-tuning research project",
      tech: ["Python", "AI/ML", "NLP", "LLaMA"],
      github: "https://github.com/hakoke/llama4",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  const personalProjects = [
    {
      title: "DevOps Automation Suite",
      slug: "devops-automation",
      desc: "Collection of automation tools and scripts to streamline development workflows",
      tech: ["Python", "Automation", "CI/CD", "Scripts"],
      github: "https://github.com/hakoke/Automatic",
      gradient: "from-rose-500/20 to-pink-500/20",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white/[0.02]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A collection of my work spanning full-stack development, AI/ML, and game design
          </p>

          {/* Featured Projects */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-yellow-500 fill-yellow-500" size={24} />
              <h3 className="text-2xl font-semibold">Featured Projects</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="group relative p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20 h-full">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`}
                      />
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-blue-400" size={24} />
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                      </div>

                      <p className="text-gray-400 mb-6 leading-relaxed">{project.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-sm bg-white/10 rounded-full border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">Additional Projects</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {additionalProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="group relative p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20 h-full flex flex-col">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`}
                      />

                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h4>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 flex-grow">{project.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 text-xs bg-white/10 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Personal Projects */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Personal Projects</h3>
            <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
              {personalProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="group relative p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`}
                      />

                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h4>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                      </div>

                      <p className="text-gray-400 mb-4">{project.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-sm bg-white/10 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
