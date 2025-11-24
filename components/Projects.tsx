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
      title: "Dashboard AI",
      slug: "dashboard-ai",
      desc: "AI-powered warehouse safety monitoring system with real-time PPE detection, facial recognition for attendance, and automated violation alerts using computer vision",
      tech: ["YOLOv8", "OpenCV", "ArcFace", "DeepStream", "Python", "Flask", "MongoDB", "ByteTrack"],
      github: "https://github.com/hakoke/Dashboard_AI",
      gradient: "from-blue-500/30 via-cyan-500/30 to-teal-500/30",
      featured: true,
      image: "🤖",
    },
    {
      title: "Bespoke",
      slug: "bespoke",
      desc: "AI-powered talent onboarding platform with intelligent candidate matching, modern UI, and seamless user experience",
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      github: "https://github.com/hakoke/Bespoke",
      gradient: "from-purple-500/30 via-pink-500/30 to-red-500/30",
      featured: true,
      image: "💼",
    },
  ];

  const additionalProjects = [
    {
      title: "Discord AI",
      slug: "discord-ai",
      desc: "Intelligent Discord bot with AI-powered features, natural language processing, and interactive commands for enhanced server management",
      tech: ["Python", "Discord.py", "OpenAI API", "LangChain", "PostgreSQL"],
      github: "https://github.com/hakoke/Discord_AI",
      gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
      image: "🤖",
    },
    {
      title: "Monopoly Multiplayer",
      slug: "monopoly",
      desc: "Real-time multiplayer Monopoly game with WebSocket communication, persistent game state, live chat, and beautiful modern UI",
      tech: ["Socket.IO", "Node.js", "Express", "PostgreSQL", "JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/hakoke/MONOPOLY_working",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      image: "🎲",
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
            Showcasing my expertise in full-stack development, AI/ML integration, and real-time applications
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
                    <div className="group relative p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20 h-full overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-blue-400" size={24} />
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {project.image && (
                            <span className="text-3xl">{project.image}</span>
                          )}
                          <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                        </div>
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
            <div className="grid md:grid-cols-2 gap-6">
              {additionalProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="group relative p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20 h-full flex flex-col overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          {project.image && (
                            <span className="text-2xl">{project.image}</span>
                          )}
                          <h4 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h4>
                        </div>
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

        </motion.div>
      </div>
    </section>
  );
}
